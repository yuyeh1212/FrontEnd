document.addEventListener("DOMContentLoaded", function () {
  const timeElements = document.querySelectorAll("time.blogDate");

  timeElements.forEach(function (timeElement) {
    // 檢查是否已有 datetime 屬性，若有則跳過
    if (timeElement.hasAttribute("datetime")) return;

    const dateText = timeElement.textContent.trim();
    const datetimeValue = dateText.replace(/\//g, "-");

    timeElement.setAttribute("datetime", datetimeValue);
  });
});
