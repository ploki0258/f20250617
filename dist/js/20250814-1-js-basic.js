let num = 123;
console.log(num);
num = 100;
console.log(num);

// 不能先使用在宣告
// console.log(PI);
const PI = 3.14;
console.log(PI);
// 常數，不能修改
// PI = 999;
// 不能重複宣告
// const PI = 999;

let firstName = "Lin";
let lastName = "David";

let fullName = `${firstName} ${lastName}`;
console.log(fullName);

let male = true;
console.log(`male is ${male}`);

function Add(num1, num2) {
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    return num1 + num2;
}
console.log(Add(1, 5));
console.log(Add("50", 35));

let num1 = 10;
let num2 = "9";
console.log(num1 - num2);
let sub = num1 - "a";
console.log(sub, typeof sub);

let student = {
    name: "David Lin",
    age: 18,
    gender: "male",
    SayHello: function () {
        console.log(`Hello I am ${this.name}`);
    },
};
console.log(student.name);
student.SayHello();
