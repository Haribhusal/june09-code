import { useState, useEffect } from "react";
function Counter() {



    const [greeting, setGreeting] = useState('Namaste')
    const [count, setCount] = useState(15)
    const handleClick = () => {
        if (count > 10) {
            setCount(count - 1)
        }
        return;
    }
    useEffect(() => {
        console.log("I am executed")
    }, [])

    return (
        <div className="min-h-[50vh] flex-col bg-green-300 flex items-center justify-center">
            <h3 className="text-4xl font-black">Greeting: {count}</h3>
            <div className="buttons flex gap-3 mt-5">
                <button onClick={() => setGreeting("Hello")} className="bg-white text-green-500 px-5 py-2 rounded-md">Change Greeting</button>
                <button onClick={() => setCount(count + 1)} className="bg-white text-green-500 px-5 py-2 rounded-md">Increment</button>
                <button onClick={handleClick} className="bg-white text-red-500 px-5 py-2 rounded-md">Decrement</button>
            </div>
        </div>
    )
}

export default Counter;