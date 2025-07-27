// let numbers = [34, 64, 12, 84, 26, 89]

// function checkIfGreaterThanFifty(num) {
//     return num < 50
// }


// let filtered = numbers.filter(checkIfGreaterThanFifty)
// console.log(filtered)

let students = [
    {
        id: 1,
        name: "Ram",
        marks: 65
    },
    {
        id: 2,
        name: "Shyam",
        marks: 87
    },
    {
        id: 3,
        name: "Ramesh",
        marks: 23
    },
    {
        id: 4,
        name: "Kiran",
        marks: 63
    },
    {
        id: 5,
        name: "Bikash",
        marks: 29
    }
]
let passedStudents = students.filter((stu) => stu.marks > 35)
let failedStudents = students.filter((stu) => stu.marks < 35)

console.log(failedStudents)