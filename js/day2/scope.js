
// Hoisting


// console.log(collegeName)

// var collegeName = "Oxford"



// function calculateSquare() {
//     let number = 10;
//     console.log(number)
//     return number * number
// }

// // local scope / function / block scope

// calculateSquare();
// // console.log(number)



// var number = 10;

// if (number > 8) {
//     number = 12
// }
// console.log(number)
// let name = "Hari"; // Global variable
// function greet() {
//     console.log("Hello " + name); // Accessible here
// }
// greet(); // Hello Hari
// console.log(name); // Hari
// function sayHi() {
//     let message = "Hi there!";
//     console.log(message); // Hi there!
// }
// sayHi();
// console.log(message); // ❌ Error: message is not defined
// {
//     let age = 25;
//     const city = "Kathmandu";
//     console.log(age, city); // 25, Kathmandu
// }
// console.log(age); // ❌ Error: age is not defined
// console.log(city); // ❌ Error: city is not defined
// if (true) {
//     var language = "JavaScript";
// }
// console.log(language); // ✅ JavaScript (still accessible)
// function outer() {
//     let outerVar = "I’m outside";
//     function inner() {
//         console.log(outerVar); // ✅ Can access outerVar
//     }
//     inner();
// }
// outer(); // I’m outside
