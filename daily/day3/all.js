// 第一題
function checkStringLength(str) {
  return str.length;
}

const strings1 = ["Hello", "my name is Tom！"];
const results1 = strings1.map(checkStringLength);
document.getElementById("aOne").innerHTML = results1.join(" , ");

// 第二題
function lowerCase(str) {
  return `"${str.toLowerCase()}"`;
}

const strings2 = ["FOKFF@gmail.com", "gonSakpm@gmail.com"];

const results2 = strings2.map(lowerCase);
document.getElementById("aTwo").innerHTML = results2.join(" , ");

// 第三題
function trimString(str) {
  return `"${str.trim()}"`;
}

const strings3 = ["    hi, mom!  ", " aa@gmail.com  "];
const results3 = strings3.map(trimString);
document.getElementById("aThree").innerHTML = results3.join(" , ");

// 第四題
function splitString(str) {
  return str.split(",");
}

const strings4 = ["black,red,white", "coffee,tea"];
const results4 = strings4.map(splitString);

const formattedResults = results4.map((arr) => JSON.stringify(arr));

document.getElementById("aFour").innerHTML = formattedResults.join(" , ");

// 第五題
function getArea(address) {
  const match = address.match(/.+區/);
  const area = match ? match[0].replace(/^.+市/, "") : "";
  return `"${area}"`;
}

const addresses = ["高雄市前鎮區一心二路33號", "高雄市新興區新興路66號"];

const results = addresses.map(getArea);
document.getElementById("aFive").innerHTML = results.join(" , ");

// 新增視覺和互動效果
document.addEventListener("DOMContentLoaded", function () {
  // 為box1和box2添加懸停時的動畫效果
  const boxElements = document.querySelectorAll(".box1, .box2");

  boxElements.forEach((box) => {
    box.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.transition = "transform 0.3s ease";
    });

    box.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

  // 為答案區塊添加淡入效果
  const answerElements = document.querySelectorAll(
    ".ans1w, .ans1h, .ans2w, .ans2h"
  );

  // 設置初始透明度為0
  answerElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transition = "opacity 0.5s ease";
  });

  // 監聽滾動事件，實現滾動時淡入效果
  function checkIfInView() {
    answerElements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150; // 元素在視窗中可見的閾值

      if (elementTop < window.innerHeight - elementVisible) {
        setTimeout(() => {
          element.style.opacity = "1";
        }, 200 * (index + 1));
      }
    });
  }

  // 頁面加載時檢查一次
  checkIfInView();

  // 滾動時檢查
  window.addEventListener("scroll", checkIfInView);

  // 為JS練習題卡片添加動畫效果
  const jsBoxes = document.querySelectorAll(".box");
  jsBoxes.forEach((box) => {
    box.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
      this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });

    box.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.08)";
    });
  });

  // 為題目標題添加動畫效果
  const titleElements = document.querySelectorAll(".title");
  titleElements.forEach((title) => {
    title.addEventListener("mouseenter", function () {
      this.style.paddingLeft = "8px";
      this.style.transition = "padding-left 0.3s ease";
    });

    title.addEventListener("mouseleave", function () {
      this.style.paddingLeft = "0";
    });
  });
});
