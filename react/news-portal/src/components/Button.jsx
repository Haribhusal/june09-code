function Button({ title, bgColor }) {
    return (
        <button style={{ backgroundColor: bgColor }} className="bg-orange-400 text-white rounded-md px-5 py-3">{title}</button>
    )
}

export default Button;


// function Button(props) {
//     console.log(props.title)
//     return (
//         <button className="bg-orange-400 text-white rounded-md px-5 py-3">{props.title}</button>
//     )
// }

// export default Button;