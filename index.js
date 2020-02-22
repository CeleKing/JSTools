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


// 截取汉字后的内容
function getRealFileName(filename) {
  var tag=-1;//第一个汉字开头前面有几个 符号的标识
  var r="";//最终结果
  for(var i =0;i<filename.length;i++){//原来字符串长度
    if(((filename.charAt(i)).charCodeAt(0))<255){//从第一个字符开始,是 标点 就 tag++;
      
      tag++;
    }else{//碰到一个汉字的时候 直接break 跳出for循环
      break;
    }
  }
  if(tag>-1){//falg>-1 说明++过了,字符串肯定不是汉字开头
  tag++;
  for(tag;tag<=filename.length;tag++){//如果最开始的字符串 有3个逗号,那么flag应为2,那么 我们需要截取的 就应该是源字符串 下标 3开始,所以上面一行flag++;
    r+=filename.charAt(tag);
    }
  }else{
  r=filename;
  }

  return r
}
