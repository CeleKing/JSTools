const _ = require('lodash');
const arr = [1, 2, 3];
const r = _.max(arr);
console.log(r);

// 生成自然数数组
const temp = Array.apply(null, {length: 9}).map(function(value, index){
    return index + 1;
});

// 将短数组从长数组的某个位置插入进行覆盖
const targetArray = [1, 2, 3, 4, 5, 6, 7];
const partArray = ['a', 'b', 'c'];
Array.prototype.splice.apply(targetArray, [3, partArray.length].concat(partArray));