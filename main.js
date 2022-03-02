// console.log("Hello welcome to backend, This is a first assignment in backend. In this we learn how to use node and how modules can work.");


const add = require('./addition')
const sub = require('./substraction')
const mult = require('./multiplication')
const divide = require('./division')

let addition = add(21, 32);
console.log('addition:', addition)


let substraction = sub(58, 39);
console.log('substraction:', substraction)


let multiplication = mult(23, 6);
console.log('multiplication:', multiplication)

let division = divide(72, 8);
console.log('division:', division)
