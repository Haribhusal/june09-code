
class Car {
    constructor(brand) {
        this.carname = brand;
    }
    get cnam() {
        return this.carname;
    }
    set cnam(x) {
        this.carname = x;
    }
}

const myCar = new Car("Ford");

myCar.cnam = "Suzuki"

console.log(myCar.cnam)

// document.getElementById("demo").innerHTML = myCar.cnam;


// class Car {
//     constructor(brand) {
//         this.carname = brand;
//     }
//     present() {
//         return 'I have a ' + this.carname;
//     }
// }

// // let car1 = new Car('Suzuki')

// class Model extends Car {
//     constructor(brand, mod) {
//         super(brand);
//         this.model = mod;
//     }
//     show() {
//         return this.present() + ', it is a ' + this.model;
//     }
// }

// let myCar = new Model("Ford", "Mustang");

// let presented = myCar.present()

// console.log(presented)


// // // class ClassName {
// // //     constructor() { ... }
// // // }

// // // eg

// // class Car {
// //     constructor(name, year) {
// //         this.name = name;
// //         this.year = year;
// //     }

// //     findAge() {

// //         let date = new Date();
// //         let currentYear = date.getFullYear();
// //         return currentYear - this.year

// //     }
// // }

// // let car1 = new Car("BMW", 1992);
// // let car2 = new Car("Volvo", 1982);
// // let car3 = new Car("Maruti", 1990)

// // let car1Age = car1.findAge();
// // let car2Age = car2.findAge();
// // let car3Age = car3.findAge();
// // console.log(car1Age, car2Age, car3Age)



// // // console.log(car1, car2)

// // // console.log(typeof car1)