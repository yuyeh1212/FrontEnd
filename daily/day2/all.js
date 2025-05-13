// 第一題
function square(num) {
  return Math.pow(num, 2);
}

const nums = [3, 9, 20];
const results1 = nums.map(square);

document.getElementById("aOne").innerHTML = results1.join(", ");

// 第二題
function calculate(num1, num2, num3) {
  return num1 + num2 - num3;
}

const inputs = [
  [5, 7, 3],
  [9, 8, 7],
  [5, 2, 0],
  [9, 9, 33]
];

const results2 = inputs.map(args => calculate(...args));
document.getElementById("aTwo").innerHTML = results2.join(", ");

// 第三題
function rounding(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

const nums2 = [3.9988, 3984.222, 77.777];
const results3 = nums2.map(rounding);

document.getElementById("aThree").innerHTML = results3.join(", ");

// 第四題
function parseNumber(str) {
  return parseFloat(str);
}

const strings = ["2.33", "Hello!!", "30000"];
const results4 = strings.map(parseNumber);

document.getElementById("aFour").innerHTML = results4.join(", ");

// 第五題
function divisible(num) {
  return num % 2;
}

const nums3 = [2, 3, 77, 88];
const results5 = nums3.map(divisible);

document.getElementById("aFive").innerHTML = results5.join(", ");