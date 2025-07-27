// let userRoles = ADMIN, STAFF, SELLER, BUYER, VENDOR, GUEST

let user = {
    name: "Hari",
    role: "STAFF"
}

switch (user.role) {
    case "ADMIN":
        console.log("Welcome ADMIN");
        break;
    case "STAFF":
        console.log("Welcome STAFF")
        break;
    case "SELLER":
        console.log("Welcome SELLER")
        break;
    case "BUYER":
        console.log("Welcome BUYER")
        break;
    case "VENDOR":
        console.log("Welcome VENDOR")
        break;
    default:
        console.log("Welcome GUEST User")
}



// switch (cases) {
//     case 1:
//         break;
//     // statement
//     case 2:
//         break;
//     //statement
//     default:
//     //statement
// }