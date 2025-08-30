const dom = {
    input: document.querySelector("#input"),
    currentInput: document.querySelector("#current-input"),
    currentLength: document.querySelector("#current-length"),
};

console.log(dom);

// 放開鍵盤時，資料為即時（比較準確）
dom.input.addEventListener("keyup", function () {
    let value = dom.input.value;

    // 限制字數長度為 10 字，超過自動截斷不顯示
    // 使用 slice 方法，如果 value 的長度大於 10，則將 value 的長度設為 10
    // if (value.length > 10) {
    //     value = value.slice(0, 10);
    // }

    // 使用 for 迴圈，如果 value 的長度小於 10，則將 value 的長度設為 10
    let str = "";
    for (let i = 0; i < 10; i++) {
        str += value[i] || "";
    }
    value = str;

    // 將新的輸入值 賦值回去
    dom.input.value = value;
    dom.currentInput.textContent = value;
    dom.currentLength.textContent = value.length;
});
