// let date = new Date();

// console.log(date)

const date = new Date();

const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kathmandu', // Set your desired time zone
    dateStyle: 'full',
    timeStyle: 'long',
});

// console.log(formatter.format(date.getDay));
console.log(date.getMilliseconds())