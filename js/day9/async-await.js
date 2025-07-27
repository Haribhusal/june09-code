
async function fetchNews() {
    try {
        let res = await fetch('https://jsonplaceholder.typicode.com/posts');
        let resData = await res.json();
        // Print each title in the #demo element
        let demoDiv = document.getElementById("demo");
        resData.forEach(post => {
            let div = document.createElement("div");
            p.textContent = post.title;
            demoDiv.appendChild(p);
        });
    } catch (error) {
        console.log(error);
    }
}

fetchNews();

