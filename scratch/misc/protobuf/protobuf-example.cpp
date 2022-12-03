/**
 * protobuf example
 */

#include <ctime>
#include <iostream>
#include <fstream>
#include <iostream>
#include <string>

#include <google/protobuf/util/time_util.h>
#include "addressbook.pb.h"

namespace pbu = google::protobuf::util;
namespace pb = google::protobuf;

static bool SaveToFile(const char *filename) {
  tutorial::AddressBook address_book;
  tutorial::Person *person = address_book.add_people();
  person->set_id(1);
  person->set_name("Test Name 1");
  person->set_email("test@mail.com");
  tutorial::Person::PhoneNumber *phone_number = person->add_phones();
  phone_number->set_type(tutorial::Person::WORK);
  phone_number->set_number("12345678");
  *(person->mutable_last_updated()) = pbu::TimeUtil::SecondsToTimestamp(time(NULL));

  std::fstream output(filename, std::ios::out | std::ios::trunc | std::ios::binary);
  if (!address_book.SerializeToOstream(&output)) {
    std::cerr << "Failed to write address book." << std::endl;
    return false;
  }
  return true;
}

static void loadFromFile(const char *filename) {
  tutorial::AddressBook address_book;
  std::fstream input(filename, std::ios::in | std::ios::binary);
  if (!address_book.ParseFromIstream(&input)) {
    std::cerr << "Failed to parse address book." << std::endl;
    return;
  }
  for (int i = 0; i < address_book.people_size(); i++) {
    const tutorial::Person& person = address_book.people(i);
    
    std::cout << "Person ID: " << person.id() << std::endl;
    std::cout << "  Name: " << person.name() << std::endl;
    if (!person.email().empty()) {
      std::cout << "  E-mail address: " << person.email() << std::endl;
    }
    for (int j = 0; j < person.phones_size(); j++) {
      const tutorial::Person::PhoneNumber& phone_number = person.phones(j);
      switch (phone_number.type()) {
        case tutorial::Person::MOBILE:
          std::cout << "  Mobile phone #: ";
          break;
        case tutorial::Person::HOME:
          std::cout << "  Home phone #: ";
          break;
        case tutorial::Person::WORK:
          std::cout << "  Work phone #: ";
          break;
        default:
          std::cout << "  Unknown phone #: ";
          break;
      }
      std::cout << phone_number.number() << std::endl;
    }
    if (person.has_last_updated()) {
      std::cout << "  Updated: " 
        << pbu::TimeUtil::ToString(person.last_updated()) << std::endl;
    }
  }
}

int main(int argc, char **argv) {
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  if (argc != 2) {
    std::cerr << "Usage:  " << argv[0] << " ADDRESS_BOOK_FILE" << std::endl;
    return -1;
  }

  // Save to file
  if (!SaveToFile(argv[1])) {
    std::cerr << "IO error" << std::endl;
    return -1;
  }

  // Load from file
  loadFromFile(argv[1]);

  pb::ShutdownProtobufLibrary();
  return 0;
}
