let dom = {
    num1: document.querySelector("#num1"),
    num2: document.querySelector("#num2"),
    operator: document.querySelector("#operator"),
    btnCalculate: document.querySelector("#btn-calculate"),
    result: document.querySelector("#result .result"),
    tip: document.querySelector("#result .tip"),
};

// 檢查 dom 是否存在
console.log(dom);

dom.btnCalculate.addEventListener("click", () => {
    // 測試事件是否正常觸發
    console.log("click btn");

    let num1 = dom.num1.value;
    let num2 = dom.num2.value;
    let operator = dom.operator.value;

    // 檢查是否有輸入數字與計算方式 (布林值)
    if (!num1 || !num2 || !operator) {
        alert("請輸入數字與計算方式");
        // 看到 return 表示程式結束
        return false;
    }

    // 從 DOM 中取得的數值，一定都是字串
    // num1 = parseInt(num1, 10);   // 將字串轉為整數(傳統作法)
    num1 = +num1; // 將字串轉為數字
    num2 = +num2;

    // 加法
    if (operator === "add") {
        console.log("run add.");
        let result = num1 + num2;
        dom.result.textContent = result;
        dom.tip.textContent = "加法結果：";
    }

    // 減法
    if (operator === "sub") {
        console.log("run sub.");
        let result = num1 - num2;
        dom.result.textContent = result;
        dom.tip.textContent = "減法結果：";
    }

    // 乘法
    if (operator === "mul") {
        console.log("run mul.");
        let result = num1 * num2;
        dom.result.textContent = result;
        dom.tip.textContent = "乘法結果：";
    }

    // 除法
    if (operator === "div") {
        console.log("run div.");
        if (num2 === 0) {
            alert("除數不能為零");
            return false;
        }
        let result = num1 / num2;
        dom.result.textContent = result;
        dom.tip.textContent = "除法結果：";
    }
});
