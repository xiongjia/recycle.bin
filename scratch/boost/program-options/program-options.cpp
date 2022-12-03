/**
 * Parse the "argv" via the Boost.program_options
 * (get the number, string and array from command line)
 */

#include <iostream>
#include <string>
#include <vector>

#include <boost/program_options.hpp>

/* namespace alias */
namespace po = boost::program_options;

int main(int argc, char **argv) {
  /* examples:
   *   app  -h     : print help message
   *   app  --help : print help message
   *
   *   app -f "test"    : set the test filename
   *   app -file "test" : set the test filename
   *
   *   app -n 100       : set the test number
   *   app --number 100 : set the test number
   *
   *   app -F "1.cpp" "2.cpp"      : set test files
   *   app --files "1.cpp" "2.cpp" : set test files
   */
  po::options_description desc("MainOptions");
  desc.add_options()
    ("help,h", "Print help messages")
      ("file,f",
        po::value<std::string>()->default_value("defaultName"),
        "A test filename")
      ("number,n",
        po::value<int>()->default_value(0), "A test Number")
      ("files,F", 
        po::value< std::vector<std::string> >()->multitoken(),
        "Test files");

  po::variables_map vm;
  try {
    po::store(po::parse_command_line(argc, argv, desc), vm);
  } catch (po::error &e) {
    /* Invalid options */
    std::cerr << "ERROR: " << e.what() << std::endl << std::endl;
    std::cout << "Boost program_options tester:" << std::endl
      << desc << std::endl;
    return 0;
  }

  if (vm.count("help")) {
    /* print usage */
    std::cout << "Boost program_options tester:" << std::endl
      << desc << std::endl;
    return 0;
  }

  std::cout << "Test filename: " << vm["file"].as<std::string>() << std::endl;
  std::cout << "Test number: " << vm["number"].as<int>() << std::endl;

  if (vm.count("files")) {
    std::vector<std::string> files = vm["files"].as< std::vector<std::string> >();
    for (std::vector<std::string>::iterator itr = files.begin(); itr != files.end(); ++itr) {
      std::cout << "Filename: " << *itr << std::endl;
    }
  }
  return 0;
}
