/**
 * 產生乘法表的內容
 * @param {*} a 被乘數
 * @param {*} b 乘數
 * @returns
 */
const mulTable = function (a, b) {
    // 表格物件
    let nums = {
        thead: [],
        tbody: [],
    };

    // thead 陣列的第一個須給 ""，以給 tbody 使用
    // 將乘數的值，依序放入 thead 中
    let thead = [""];

    let j = 1;
    while (j <= b) {
        thead.push(j);
        j++;
    }

    // for (let j = 1; j <= b; j++) {
    //     thead.push(j);
    // }
    // 賦值回去
    nums.thead = thead;

    let i = 1;
    while (i <= a) {
        let tr = [i];

        let j = 1;
        while (j <= b) {
            tr.push(i * j);
            j++;
        }
        nums.tbody.push(tr);
        i++;
    }

    // for (let i = 1; i <= a; i++) {
    //     let tr = [i];
    //     // console.log(`tr:`, tr);

    //     for (let j = 1; j <= b; j++) {
    //         tr.push(i * j);
    //     }
    //     // console.log(`tr:`, tr);
    //     nums.tbody.push(tr);
    // }

    return nums;
};

/**
 * 產生乘法表的表格
 * @param {*} nums
 */
const generateTable = function (nums) {
    let thead = "<tr>";
    nums.thead.forEach((item, index) => {
        thead += `<th>${item}</th>`;
    });
    thead += "</tr>";

    let tbody = "<tr>";
    nums.tbody.forEach((item, index) => {
        // tbody += `<tr>`;
        item.forEach((item, index) => {
            tbody += `<td>${item}</td>`;
        });
        tbody += "</tr>";
    });

    dom.mulTable.querySelector("thead").innerHTML = thead;
    dom.mulTable.querySelector("tbody").innerHTML = tbody;
};

let dom = {
    num1: document.querySelector("#num1"),
    num2: document.querySelector("#num2"),
    generateBtn: document.querySelector("#generate-btn"),
    mulTable: document.querySelector("#mul-table"),
};

console.log(dom);

dom.generateBtn.addEventListener("click", () => {
    let num1 = dom.num1.value;
    let num2 = dom.num2.value;
    if (!num1 || !num2 || num1 < 1 || num2 < 1) {
        Swal.fire({
            title: "產生錯誤",
            html: "請輸入數字",
            icon: "warning",
            confirmButtonText: "確定",
        });
        return;
    }
    let nums = mulTable(num1, num2);
    generateTable(nums);
});
