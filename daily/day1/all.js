// 題目一：hello world！
function hello() {
  return "Hello World!";
}

document.getElementById("itemOne").textContent = hello();

// 題目二：參數+字串練習
function sayHi(name) {
  return `${name}，Hello world！`;
}

document.getElementById("itemTwo").textContent = sayHi("John");

// 題目三：參數加法產生器
function add(a) {
  return a + a;
}

document.getElementById("itemThree").textContent = add(8);

// 題目四：兩個參數相加器
function addTwo(x, y) {
  return x + y;
}

document.getElementById("itemFour").textContent = addTwo(5, 10);

// 題目五：參數+字串相加
function addNumberAndString(e, f, g){
    return `第一加第二個參數加總為 ${e + f}，第三個參數為 ${g}。`;
}

document.getElementById("itemFive").textContent = addNumberAndString(9, 100, 44);