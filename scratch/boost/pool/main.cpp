/**
 * A simple sample of Boost Pool
 */

#include <iostream>
#include <vector>

#include <boost/pool/pool.hpp>
#include <boost/pool/object_pool.hpp>
#include <boost/pool/singleton_pool.hpp>
#include <boost/pool/pool_alloc.hpp>
#include <boost/foreach.hpp>
#include <boost/array.hpp>

typedef std::size_t size_type;
typedef std::ptrdiff_t difference_type;

  /* the test data */
  struct TestData {
    int num;
  };

/* Memory allocator */
class TestAllocator {
public:
  typedef std::size_t size_type;
  typedef std::ptrdiff_t difference_type;

  static char * malloc(const size_type bytes) {
    std::cout << "Alloc (" << bytes << ")" << std::endl;
    return reinterpret_cast<char *>(std::malloc(bytes));
  }

  static void free(char * const block) {
    std::cout << "Free block" << std::endl;
    std::free(block);
  }
};

static void mem_pool_tests(void) {
  /* pool tests */
  boost::pool<TestAllocator> mpool(sizeof(struct TestData));
  boost::array<struct TestData*, 128> allData = { NULL };

  /* mpool.malloc */
  for (std::size_t idx = 0; idx < allData.size(); ++idx) {
    allData[idx] = reinterpret_cast<struct TestData*>(mpool.malloc());
    (allData[idx])->num = idx;
  }

  /* print all data and free these memory */
  std::cout << "All Pool Data: ";
  BOOST_FOREACH(struct TestData *item, allData) {
    std::cout << "[" << item->num << "] ";
    mpool.free(item);
  }

  std::cout << std::endl;
  /* To allocate it again.
   * The mpool should find the 'free' items and needn't the real malloc()
   */
  for (std::size_t idx = 0; idx < allData.size(); ++idx) {
    allData[idx] = reinterpret_cast<struct TestData*>(mpool.malloc());
    (allData[idx])->num = idx;
  }
  /* free the unused chunk all items still available */
  mpool.release_memory();
  std::cout << "All Pool Data: ";
  BOOST_FOREACH(struct TestData *item, allData) {
    std::cout << "[" << item->num << "] ";
  }
  std::cout << std::endl;
  /* purge all memory */
  mpool.purge_memory();
}

static void obj_pool_tests(void) {
  /* the test object */
  class TestObj {
  private:
    int m_num;

  public:
    TestObj(void) : m_num(0) {
      std::cout << "Create TestObj" << std::endl;
    }

    ~TestObj(void) {
      std::cout << "Delete TestObj, Num: " << m_num << std::endl;
    }

    void Set(int num) {
        m_num = num;
    }

    void Print(void) {
      std::cout << "TestObj(" << m_num << ")" << std::endl;
    }
  };

  boost::object_pool<TestObj, TestAllocator> mpool;
  boost::array<TestObj*, 32> allData = { NULL };
  for (std::size_t idx = 0; idx < allData.size(); ++idx) {
    allData[idx] = mpool.malloc();
    allData[idx]->Set(idx);
  }
  /* print all data and free these objects */
  std::cout << "All Pool Data: " << std::endl;
  BOOST_FOREACH(TestObj *item, allData) {
    item->Print();
    mpool.destroy(item);
  }
  std::cout << std::endl;
}

static void singleton_pool(void) {
  struct MPoolTag {};
  typedef boost::singleton_pool<MPoolTag, sizeof(struct TestData), TestAllocator> mm_pool;
  boost::array<struct TestData*, 128> allData = { NULL };
  /* mpool.malloc */
  for (std::size_t idx = 0; idx < allData.size(); ++idx) {
    allData[idx] = reinterpret_cast<struct TestData*>(mm_pool::malloc());
    (allData[idx])->num = idx;
  }
  mm_pool::purge_memory();
}

int main(int argc, char **argv) {
  /* memory pool */
  mem_pool_tests();
  /* object pool */
  obj_pool_tests();
  /* singleton pool */
  singleton_pool();
  return 0;
}
