const myPromise = new Promise((resolve, reject) => {
    // async operation
    let success = false;

    if (success) {
        resolve("Task completed!");
    } else {
        reject("Something went wrong.");
    }
});

// Using the promise
myPromise
    .then(result => {
        console.log(result); // "Task completed!"
    })
    .catch(error => {
        console.error(error); // "Something went wrong."
    });

