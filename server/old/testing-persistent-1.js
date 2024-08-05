let arrayString = ["abc", "pqr", "xyz"];

// Array.prototype.toUpperCase = function () {
//     for (var i=0; i < this.length; i++) {
//         this[i] = this[i].toUpperCase();
//     }
//     return this;
// }

//Cannot work in array functions
// Array.prototype.toUpperCase = () => {
//     console.log("this :: ", this);
//     for (var i=0; i < this.length; i++) {
//         this[i] = this[i].toUpperCase();
//     }
// }

// let response = arrayString.toUpperCase();
// console.log(response, arrayString);

let user = {
    name: "Mohini",
    age: 10,
    address: {
        city: "Airoli",
        pincodeList: [400708, 400605]
    }
}
const { name, address : { pincodeList } } = user;
// const {city } = address;


let user1 = {...user, surname: "Thorat", address : {...user.address, state: "Maharashtra"} };

console.log("user1 :: ",  name, pincodeList);

// let numbers = [1, 3, 5, 6, 5, 6, 3, 6, 3];
// let data = {};
// numbers.reduce(function (data, item) {
//     data[item] = data[item] ? data[item] + 1 : 1;
//     return data;
// }, data);

// console.log("Data ::", data);
