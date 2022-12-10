/**
 * A simple sample of Boost Serialization
 */

#include <iostream>
#include <fstream>
#include <string>
#include <vector>

#pragma warning(push)
#pragma warning(disable:4308)
#  include <boost/archive/text_oarchive.hpp>
#  include <boost/archive/text_iarchive.hpp>
#  include <boost/serialization/vector.hpp>
#  include <boost/serialization/string.hpp>
#  include <boost/serialization/version.hpp>
#  include <boost/serialization/split_member.hpp>
#  include <boost/foreach.hpp>
#pragma warning(pop)

const unsigned int MYDATA_VERSION = 1;

class MyData {
private:
  /* All the Datum */
  unsigned int     m_num;
  std::vector<int> m_nums;

  std::string              m_str;
  std::vector<std::string> m_strs;

private:
  /* serialization */
  friend class boost::serialization::access;
  BOOST_SERIALIZATION_SPLIT_MEMBER();

  /* serialization save */
  template<class Archive> 
  void save(Archive &ar, const unsigned int version) const {
    ar & m_num;
    ar & m_nums;
    ar & m_str;
    ar & m_strs;
  }

  /* serialization load */
  template<class Archive>
  void load(Archive &ar, const unsigned int version) {
    ar & m_num;
    ar & m_nums;
    ar & m_str;
    ar & m_strs;
  }

public:
  MyData(void) : m_num(0) {
    /* NOP */
  }

  void PrintData(void) {
    std::cout << "Number      : " << m_num  << std::endl;
    std::cout << "Number List : ";
    BOOST_FOREACH(int item, m_nums) {
      std::cout << "[" << item << "] ";
    }
    std::cout << std::endl;

    std::cout << "String      : " << m_str << std::endl;
    std::cout << "String List : ";
    BOOST_FOREACH(std::string item, m_strs) {
      std::cout << "[" << item << "] ";
    }
    std::cout << std::endl;
  }

  MyData& SetNum(const int num) {
    m_num = num;
    return *this;
  }

  MyData& AddNum(const int num) {
    m_nums.push_back(num);
    return *this;
  }

  MyData& SetStr(const char *str) {
    m_str = str;
    return *this;
  }

  MyData& AddStr(const char *str) {
    m_strs.push_back(str);
    return *this;
  }

  void SaveToFile(const char *filename) {
    std::ofstream ofs(filename);
    boost::archive::text_oarchive oa(ofs);
    oa << *this;
  }

  void LoadFromFile(const char *filename) {
    std::ifstream ifs(filename);
    boost::archive::text_iarchive ia(ifs);
    ia >> *this;
  }
};

/* The class version for serialization */
BOOST_CLASS_VERSION(MyData, MYDATA_VERSION)

int main(int argc, char **argv) {
  /* create src data */
  MyData srcData;
  srcData.SetNum(100);
  srcData.AddNum(1).AddNum(2).AddNum(3);
  srcData.SetStr("TestStr");
  srcData.AddStr("TestStr1").AddStr("TestStr2").AddStr("TestStr3");

  /* print srcData */
  std::cout << "SrcData  " << std::endl;
  std::cout << "======== " << std::endl;
  srcData.PrintData();

  /* save srcData to "mydata.dat" file */
  srcData.SaveToFile("mydata.dat");

  /* load mydata.dat to destData */
  MyData destData;
  destData.LoadFromFile("mydata.dat");
  std::cout << "DestData  " << std::endl;
  std::cout << "======== " << std::endl;
  destData.PrintData();

  return 0;
}
