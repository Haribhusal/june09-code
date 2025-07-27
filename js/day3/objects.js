
// let studentName = "Ramesh";
// let studentAge = 23;
// let studentAddress = "Kathmandu";
// let studentCollege = "Oxford College";
// const studentDOB = (studentAge) => 2025 - studentAge
// let student = {
//     name: "Ramesh",
//     age: 23,
//     address: "Kathmandu",
//     college: "Oxford College",
//     // here name, age, address, and college are properties
//     dob: function () {
//         return 2025 - this.age
//     }
//     // here dob is a method
// }
// console.log(student.dob()) 
// console.log(student.address)
// Using DOT notation
// console.log(`Student's age is ${student.age}`)
// console.log(student['age'])
// console.log(student["dob"]())
// using Bracket Notation


// let student = {
//     name: "Ramesh",
//     age: 23,
//     address: "Kathmandu",
//     college: "Oxford College",
//     // here name, age, address, and college are properties
//     dob: function () {
//         return 2025 - this.age
//     }
//     // here dob is a method
// }

// let student2 = {
//     name: "Hari",
//     age: 24,
//     address: "Lalitpur",
//     college: "Patan College",
//     // here name, age, address, and college are properties
//     dob: function () {
//         return 2025 - this.age
//     }
//     // here dob is a method
// }


// let user = {
//     name: "Hari"
// }

// user.name = "Shyam"

// console.log(user.name)


// let user = {}

// user.name = "Hari"
// user.age = 23;
// console.log(user.name, user.age)


// let user = {};

// user.name = "Hari";
// user.age = 23;

// // Create a Symbol
// const id = Symbol("userId");

// // Add Symbol as a property
// user[id] = 101;

// console.log(user.name, user.age);     // Hari 23
// console.log(user[id]);                // 101


// console.log(Object.keys(user));



// // Create an Object
// const person = new Object();
// const person2 = new Object();

// // Add Properties
// person.firstName = "John";
// person.lastName = "Doe";
// person.age = 50;
// person.eyeColor = "blue";

// console.log(person)


// let user = {
//     name: "Hari",
//     address: {
//         country: "Nepal",
//         city: "Kathmandu",
//         coordinates: {
//             lattitude: "80.85",
//             logitude: "27.00"
//         }
//     }
// }
// console.log(user.address.coordinates.logitude)


// let name = "Hari"

// let person = {
//     name: "Hari",
//     age: 20
// }

// let x = person;

// x.name = "Shyam"

// console.log(person.name)

// let person = {
    //     name: "Hari",
    //     age: 20
// }
// delete person.age
// console.log(person)




// Make a todo list app that uses localStorage, take input from user, store it to localstorage, display all tasks in ul> li, also make edit and delete, which updates the list.