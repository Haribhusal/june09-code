// 1. forEach - Executes a function for each array element
const numbers = [1, 2, 3, 4];
numbers.forEach(function (num) {
    console.log('forEach:', num);
});

// 2. map - Creates a new array with the results of calling a function on every element
const doubled = numbers.map(function (num) {
    return num * 2;
});
console.log('map:', doubled); // [2, 4, 6, 8]

// 3. filter - Creates a new array with all elements that pass the test
const even = numbers.filter(function (num) {
    return num % 2 === 0;
});
console.log('filter:', even); // [2, 4]

// 4. reduce - Reduces the array to a single value
const sum = numbers.reduce(function (acc, num) {
    return acc + num;
}, 0);
console.log('reduce:', sum); // 10

// 5. find - Returns the first element that satisfies the condition
const found = numbers.find(function (num) {
    return num > 2;
});
console.log('find:', found); // 3

// 6. some - Checks if at least one element passes the test
const hasEven = numbers.some(function (num) {
    return num % 2 === 0;
});
console.log('some:', hasEven); // true

// 7. every - Checks if all elements pass the test
const allPositive = numbers.every(function (num) {
    return num > 0;
});
console.log('every:', allPositive); // true

// 8. includes - Checks if array contains a value
console.log('includes:', numbers.includes(3)); // true

// 9. push - Adds an element to the end
numbers.push(5);
console.log('push:', numbers); // [1, 2, 3, 4, 5]

// 10. pop - Removes the last element
numbers.pop();
console.log('pop:', numbers); // [1, 2, 3, 4]
