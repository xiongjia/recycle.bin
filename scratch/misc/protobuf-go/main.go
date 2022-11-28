package main

import (
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"

	pb "github.com/xiongjia/recycle.bin/scratch/misc/protobuf-go/tutorialpb"
	"google.golang.org/protobuf/proto"
)

func writePerson(w io.Writer, p *pb.Person) {
	fmt.Fprintln(w, "Person ID:", p.Id)
	fmt.Fprintln(w, "  Name:", p.Name)
	if p.Email != "" {
		fmt.Fprintln(w, "  E-mail address:", p.Email)
	}

	for _, pn := range p.Phones {
		switch pn.Type {
		case pb.Person_MOBILE:
			fmt.Fprint(w, "  Mobile phone #: ")
		case pb.Person_HOME:
			fmt.Fprint(w, "  Home phone #: ")
		case pb.Person_WORK:
			fmt.Fprint(w, "  Work phone #: ")
		}
		fmt.Fprintln(w, pn.Number)
	}
}

func listPeople(w io.Writer, book *pb.AddressBook) {
	for _, p := range book.People {
		writePerson(w, p)
	}
}

func saveToFile(filename string) {
	p := &pb.Person{}
	p.Id = 1
	p.Name = "test"
	p.Email = "test@test.com"
	pn := &pb.Person_PhoneNumber{
		Number: "123456789",
		Type:   pb.Person_HOME,
	}
	p.Phones = append(p.Phones, pn)
	book := &pb.AddressBook{}
	book.People = append(book.People, p)

	out, err := proto.Marshal(book)
	if err != nil {
		fmt.Println("Failed to encode address book:", err)
	}

	if err := ioutil.WriteFile(filename, out, 0644); err != nil {
		fmt.Println("Failed to write address book:", err)
	}
}

func loadFromFile(filename string) {
	in, err := ioutil.ReadFile(filename)
	if err != nil {
		log.Fatalln("Error reading file:", err)
	}
	book := &pb.AddressBook{}
	if err := proto.Unmarshal(in, book); err != nil {
		log.Fatalln("Failed to parse address book:", err)
	}
	listPeople(os.Stdout, book)
}

func main() {
	if len(os.Args) != 2 {
		log.Fatalf("Usage:  %s ADDRESS_BOOK_FILE\n", os.Args[0])
	}
	filename := os.Args[1]

	log.Println("protobuf tests")
	saveToFile(filename)
	log.Printf("Saved addressbook to : %s\n", filename)

	log.Println("loading")
	loadFromFile(filename)
}
