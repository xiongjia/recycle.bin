/**
 * The sample library
 */

#include <boost/format.hpp>
#include "my_lib.h"

namespace mylib {

int my_test_num(int src1, int src2) {
  return src1 + src2;
}

std::string my_test_str(const std::string &src1,
                        const std::string &src2) {
  boost::format fmt("%s%s");
  return boost::str(fmt % src1 % src2);
}

}
