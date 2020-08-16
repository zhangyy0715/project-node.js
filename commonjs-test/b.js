//require 引用文件，a后面不用写.js，会自动去找
//解构
const {add,mul} = require('./a')
const _ = require('lodash')
const sum = add(10,20)
const result = mul(10,20)

console.log(sum)
console.log(result)
const arr = _.concat([1,2],3)
console.log('arr:',arr)