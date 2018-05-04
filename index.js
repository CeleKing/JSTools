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

// 复杂的reduce应用
const items = [{price: 10}, {price: 120}, {price: 1000}];
const reducers = {
    totalInDollar: function(state, item) {
        state.dollars += item.price;
        return state;
    },
    totalInEuros : function(state, item) {
        state.euros += item.price * 0.897424392;
        return state;
    },
    totalInPounds : function(state, item) {
        state.pounds += item.price * 0.692688671;
        return state;
    },
    totalInYen : function(state, item) {
        state.yens += item.price * 113.852;
        return state;
    }
    // more...
};

const combineTotalPriceReducers = function(reducers) {
    return function(state, item) {
        return Object.keys(reducers).reduce(
            function(nextState, key) {
                reducers[key](state, item);
                return state;
            },
            {}
        );
    }
};

const bigTotalPriceReducer = combineTotalPriceReducers(reducers);

const initialState = {dollars: 0, euros:0, yens: 0, pounds: 0};

const totals = items.reduce(bigTotalPriceReducer, initialState);

console.log(totals);
