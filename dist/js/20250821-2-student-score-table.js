/**
 * 隨機產生學生資料
 * @returns 學生資料陣列
 */
const generateStudentData = function () {
    let students = [];

    students.push({ name: "David", chinese: 0, english: 0, math: 0 });
    students.push({ name: "John", chinese: 0, english: 0, math: 0 });
    students.push({ name: "Mary", chinese: 0, english: 0, math: 0 });
    students.push({ name: "Tom", chinese: 0, english: 0, math: 0 });
    students.push({ name: "Jane", chinese: 0, english: 0, math: 0 });
    students.push({ name: "Jim", chinese: 0, english: 0, math: 0 });
    students.push({ name: "Rose", chinese: 0, english: 0, math: 0 });
    students.push({ name: "Alex", chinese: 0, english: 0, math: 0 });
    students.push({ name: "Sam", chinese: 0, english: 0, math: 0 });
    students.push({ name: "Helen", chinese: 0, english: 0, math: 0 });

    // 填充分數
    students.forEach(function (studnet, index) {
        // floor 無條件捨去
        // round 四捨五入
        // ceil 無條件進位
        // random 0 ~ 1 之間的隨機數
        studnet.chinese = Math.floor(Math.random() * 100);
        studnet.english = Math.floor(Math.random() * 100);
        studnet.math = Math.floor(Math.random() * 100);
        studnet.total = studnet.chinese + studnet.english + studnet.math;
        studnet.avg = studnet.total / 3;
    });

    return students;
};

/**
 * 匯出 CSV 格式的檔案
 * @param {*} students
 * @returns 字串
 */
const exportCSV = function (students) {
    let csv = "";
    // \n:換行
    csv += " ,學生姓名,國文,英文,數學,總分,平均\n";
    students.forEach(function (student, index) {
        csv += `${index + 1},${student.name},${student.chinese},${student.english},${student.math},${student.total},${Math.round(student.avg)}\n`;
    });
    return csv;
};

/**
 * 下載 CSV 檔案
 * @param {*} csv
 */
const downloadCSV = function (csv) {
    let a = document.createElement("a");
    const bom = "\uFEFF";
    const csvWithBom = bom + csv;

    // 宣告 csv 檔案表頭，編碼為 utf-8，並將 csv 內容進行編碼
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvWithBom);
    // 下載檔案名稱
    a.download = "students score table.csv";
    a.click();
};

// 取得 html 元素
let dom = {
    studentsTable: document.querySelector("#students-table"),
    generateStudentBtn: document.querySelector("#generate-student-btn"),
    exportCSVBtn: document.querySelector("#export-csv-btn"),
};
console.log(dom);

let students = null;

dom.generateStudentBtn.addEventListener("click", function () {
    students = generateStudentData();
    let tbody = "";
    students.forEach(function (student, index) {
        // 如果分數小於 60 分，則顯示紅色
        let chineseClass = student.chinese < 60 ? "lose" : "";
        let englishClass = student.english < 60 ? "lose" : "";
        let mathClass = student.math < 60 ? "lose" : "";

        // 總分大於 180 分，顯示綠色
        let totalClass = student.total >= 180 ? "great" : "";

        tbody += `<tr>
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td class="${chineseClass}">${student.chinese}</td>
        <td class="${englishClass}">${student.english}</td>
        <td class="${mathClass}">${student.math}</td>
        <td class="${totalClass}">${student.total}</td>
        <td>${Math.round(student.avg)}</td>
        </tr>
    `;
    });

    dom.studentsTable.querySelector("tbody").innerHTML = tbody;

    // 如果使用 textContent 會將內容當作文字顯示，不會解析 html 標籤
    // dom.studentsTable.querySelector('tbody').textContent = tbody
});

dom.exportCSVBtn.addEventListener("click", function () {
    // 如果 學生資料不存在 就不執行 並跳出提示視窗
    if (!students) {
        Swal.fire({
            title: "產生 CSV 失敗",
            text: "請先產生學生資料",
            icon: "warning",
            confirmButtonText: "確定",
        });
        return;
    }

    let csv = exportCSV(students);
    // console.log(csv);
    downloadCSV(csv);
});
