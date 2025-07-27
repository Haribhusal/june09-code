const numbers = [45, 4, 9, 16, 25];
let someOver18 = numbers.every(myFunction);

function myFunction(value) {
    return value > 3;
}
console.log(someOver18)