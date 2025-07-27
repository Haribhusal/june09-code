// // Create a Map
// const fruits = new Map([
//     ["apples", 500],
//     ["bananas", 300],
//     ["oranges", 200]
// ]);

// fruits.set('Mango', 400)
// // fruits.delete("apples");
// // fruits.clear();
// console.log(fruits)


// console.log(fruits.has("apples"))



// // console.log(fruits.get('Mango'))

// // let fruits1 = [
// //     ["apples", 500],
// //     ["bananas", 300],
// //     ["oranges", 200]
// // ]


// Create an Array
const fruits = [
    { name: "apples", quantity: 300 },
    { name: "bananas", quantity: 500 },
    { name: "oranges", quantity: 200 },
    { name: "kiwi", quantity: 150 }
];

// Callback function to Group Elements
function myCallback({ quantity }) {
    return quantity > 200 ? "ok" : "low";
}

// Group by Quantity
const result = Map.groupBy(fruits, myCallback);

console.log(result)