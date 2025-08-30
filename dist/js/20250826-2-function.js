// 函數宣告，具名函數
function add(a, b) {
    return a + b;
}

// 宣告常數，賦予匿名函數（沒有名字的函數）-> 推薦使用
const sum = function (a, b) {
    return a + b;
};

// 具名函數本身就是一個變數名稱

// 呼叫函數
let addResult = add(1, 2);
console.log(addResult);

let sumResult = sum(1, 2);
console.log(sumResult);

// 印出函數
console.log(add);

console.log(sum);

add = 123;

console.log(add);
// runtime error 有錯誤需要往上查詢發生點
// let someAdd = add(10, 10)
// console.log(someAdd)

// syntax error (compile error) 可以幫助快速找到錯誤
sum = 456;
console.log(sum);
let someSum = sum(10, 10);
console.log(someSum);
