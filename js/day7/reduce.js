// const numbers = [45, 4, 9, 16, 25];
// let sum = numbers.reduce(myFunction);

// function myFunction(total, value) {
//     return total + value;
// }

// console.log(sum)


const cartItems = [
    { id: 1, name: 'Laptop', price: 700 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 45 },
    { id: 4, name: "Joystick", price: 100 }
];


const totalPrice = cartItems.reduce((accumulator, item) => {
    return accumulator + item.price;
}, 100);
// Initial value of accumulator is 0

console.log("Total Price:", totalPrice);

// cartItems.reduce((item) =>)