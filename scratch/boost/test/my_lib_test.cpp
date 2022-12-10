/**
 * A simple sample of Boost unit test
 */

#define BOOST_TEST_DYN_LINK
#define BOOST_TEST_MAIN
#include <boost/test/unit_test.hpp>
#include <string>

#include "my_lib.h"

BOOST_AUTO_TEST_CASE(test_my_test_num) {
  /* test the mylib::my_test_num() function */
  int src1 = 1;
  int src2 = 3;
  BOOST_CHECK((src1 + src2) == mylib::my_test_num(src1, src2));
}

BOOST_AUTO_TEST_CASE(test2) {
  std::string ret = mylib::my_test_str(std::string("123"), std::string("456"));
  BOOST_CHECK_EQUAL(ret, std::string("123456"));
}
