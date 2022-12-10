/**
* The sample library
*/

#ifndef _MY_LIB_HXX_
#define _MY_LIB_HXX_ 1

#include <string>

namespace mylib {

/**
 * return = src1 + src2
 */
int my_test_num(int src1, int src2);

/**
 * return = src1 + src2
 */
std::string my_test_str(const std::string &src1, const std::string &src2);

}

#endif /* !defined(_MY_LIB_HXX_)*/
