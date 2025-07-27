const numbers = [45, 4, 9, 16, 25];
let someOver18 = numbers.some(myFunction);

function myFunction(value) {
    return value > 6;
}
console.log(someOver18)