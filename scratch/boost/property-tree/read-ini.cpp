/**
 * Parse the UTF8 ".ini" file via the Boost property_tree
 */

#include <string>
#include <fstream>
#include <iostream>

#if defined(__APPLE__)
#include <codecvt>
#endif /* defined(__APPLE__) */

#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/ini_parser.hpp>
#include <boost/program_options/detail/convert.hpp>
#include <boost/program_options/detail/utf8_codecvt_facet.hpp>
#include <boost/program_options.hpp>

/* namespace alias */
namespace po = boost::program_options;
namespace pt = boost::property_tree;

static void read_ini_file(const char *filename, const char *locale) {
  /* udpate locale */
  setlocale(LC_ALL, locale);

  /* Open the UTF8 .ini file */
  std::locale oldLocale;
  std::locale utf8Locale(oldLocale, new po::detail::utf8_codecvt_facet());
  std::wifstream iniStream(filename);
  iniStream.imbue(utf8Locale);

  /* Parse the .ini file via boost::property_tree::ini_parser */
  pt::wptree iniWPTree;
  pt::ini_parser::read_ini(iniStream, iniWPTree);

  /* Test INI File:
    * [app]
    * string=test string
    * number=99
    */

  /* Read the string */
  boost::optional<std::wstring> strVal = 
      iniWPTree.get_optional<std::wstring>(L"app.string");
  std::wstring ret = strVal.get_value_or(std::wstring(L"defaultStrVal"));

#if defined(__APPLE__)
  /* coodecvt for OSX terminate */
  std::wstring_convert<std::codecvt_utf8<wchar_t>, wchar_t> convert;
  std::cout << "app.string=" << convert.to_bytes(ret) << std::endl;
#else
  /* NOTE: must update the correct locale setting 
    *       before you print the string 
    * For instance: 
    *      Chinese  -> "zh-CN"
    *      EN-US    -> "en-US.UTF8"
    */
  wprintf(L"app.string=%s\n", ret.c_str());
#endif /* defined(__APPLE__) */

  /* Read the number */
  boost::optional<uint32_t> numVal = iniWPTree
    .get_optional<uint32_t>(L"app.number");
  const uint32_t numValDefault = 100;
  std::cout << "app.number="
    << numVal.get_value_or(numValDefault)
    << std::endl;
}

int main(int argc, char **argv) {
  po::options_description desc("MainOptions");
  desc.add_options()
    ("help,h", "Print help message")
    ("locale,l", po::value<std::string>()->default_value("C"),
      "Locale settings (e.g. en-US.UTF8, zh-CN) ")
    ("file,f", po::value<std::string>()->default_value("test.ini"),
      "The test .ini file");

  po::variables_map vm;
  try {
    po::store(po::parse_command_line(argc, argv, desc), vm);
  } catch (po::error &e) {
    /* Invalid options */
    std::cerr << "ERROR: " << e.what() << std::endl << std::endl;
    std::cout << "Boost property_tree tester:" << std::endl
      << desc << std::endl;
    return 0;
  }

  if (vm.count("help")) {
    /* print usage */
    std::cout << "Boost property_tree tester:" << std::endl
      << desc << std::endl;
    return 0;
  }

  std::string iniFile = vm["file"].as<std::string>().c_str();
  std::cout << "Read ini file: " << iniFile << std::endl;
  read_ini_file(iniFile.c_str(), vm["locale"].as<std::string>().c_str());
  return 0;
}
