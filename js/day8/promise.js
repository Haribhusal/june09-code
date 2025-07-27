// const myPromise = new Promise(function (success, failure) {
//     // "Producing Code" (May take some time)

//     success(); // when successful
//     failure();  // when error
// });

// // "Consuming Code" (Must wait for a fulfilled Promise).
// myPromise.then(
//     function (value) { /* code if successful */ },
//     function (error) { /* code if some error */ }
// );



setTimeout(() => {
    console.log("hi")
}, 2000)

console.log("Hello")


// const myPromise = new Promise(function (myResolve, myReject) {
//     setTimeout(function () { myResolve("I love You !!"); }, 3000);
// });

// myPromise.then(function (value) {
//     document.getElementById("demo").innerHTML = value;
// });