// const numbers = [45, 4, 9, 16, 25];


// let txt = "";
// numbers.forEach(myFunction);

// function myFunction(value) {
//     txt += value + "<br>";
// }

// document.getElementById('display').innerHTML = txt




// const numbers = [45, 4, 9, 16, 25, 34, 14, 12];

// function addOne(num) {
//     return num = num + 1;
// }

// let addedArray = numbers.map(addOne)
// console.log(addedArray)



const cartItems = [
    { id: 1, name: 'Laptop', price: 700 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 45 },
    { id: 4, name: "Joystick", price: 100 }
];


let total = 100;

cartItems.forEach(item => {
    // console.log(`Product: ${item.name}, Price: Rs. ${item.price}`);
    total += item.price;
});

console.log("Total Price before discount:", total);


const discountedCart = cartItems.map(item => {
    return {
        ...item,
        price: item.price * 0.9  // 10% discount
    };
});

// console.log(discountedCart);
let finalAmountAfterDiscount = 0

discountedCart.forEach((item) => {
    finalAmountAfterDiscount += item.price
})

console.log("finalAmountAfterDiscount", finalAmountAfterDiscount)