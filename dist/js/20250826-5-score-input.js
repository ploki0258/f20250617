const dom = {
    name: document.querySelector("#name"),
    chinese: document.querySelector("#chinese"),
    english: document.querySelector("#english"),
    math: document.querySelector("#math"),
    btn: document.querySelector("#btn"),
    table: document.querySelector("#table"),
};

console.log(dom);

let students = [];

/**
 * 新增分數
 * @returns
 */
const addScore = function () {
    let name = dom.name.value;
    let chinese = dom.chinese.value;
    let english = dom.english.value;
    let math = dom.math.value;

    if (!name || !chinese || !english || !math) {
        return;
    }

    let total = +chinese + +english + +math;
    // console.log(name, chinese, english, math, total);
    let uid = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    let classChinese = scorePass(chinese);
    let classEnglish = scorePass(english);
    let classMath = scorePass(math);

    let tr = `<tr date-uid=${uid}>
                <td>${name}</td>
                <td class="${classChinese}">${chinese}</td>
                <td class="${classEnglish}">${english}</td>
                <td class="${classMath}">${math}</td>
                <td>${total}</td>
    </tr>`;

    dom.table.querySelector("tbody").insertAdjacentHTML("beforeend", tr);

    students.push({
        uid,
        name,
        chinese,
        english,
        math,
        total,
    });

    // JSON.stringify 將物件轉換成字串
    // localStorage.setItem -> 將資料存取到瀏覽器的本地端
    localStorage.setItem("students", JSON.stringify(students));

    dom.name.value = "";
    dom.chinese.value = "";
    dom.english.value = "";
    dom.math.value = "";
};

/**
 * 檢查成績是否有及格
 * @param {*} score 分數
 * @returns 類別名稱
 */
const scorePass = function (score) {
    score = +score;
    // console.log(typeof score);
    let className = +score < 60 ? "no-pass" : "";

    return className;
};

/**
 * 檢查分數
 * @param {*} score 分數
 * @returns
 */
const checkScore = function (score) {
    if (score < 0) {
        return 0;
    }

    if (score > 100) {
        return 100;
    }

    return score;
};

dom.btn.addEventListener("click", addScore);

dom.name.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        addScore();
    }
});
dom.chinese.addEventListener("keyup", function (e) {
    let value = dom.chinese.value;
    dom.chinese.value = checkScore(value);
    if (e.key === "Enter") {
        addScore();
    }
});
dom.english.addEventListener("keyup", function (e) {
    let value = dom.english.value;
    dom.english.value = checkScore(value);
    if (e.key === "Enter") {
        addScore();
    }
});
dom.math.addEventListener("keyup", function (e) {
    let value = dom.math.value;
    dom.math.value = checkScore(value);
    if (e.key === "Enter") {
        addScore();
    }
});

/**
 * 初始化資料，並載入
 */
const init = function () {
    // 從瀏覽器的 localStorage 取得本地端資料
    let jsonStr = localStorage.getItem("students");
    // JSON.parse 將字串轉換成物件
    students = jsonStr ? JSON.parse(jsonStr) : [];

    students.forEach((student) => {
        let classChinese = scorePass(student.chinese);
        let classEnglish = scorePass(student.english);
        let classMath = scorePass(student.math);

        let tr = `<tr data-uid="${student.uid}">
                <td>${student.name}</td>
                <td class="${classChinese}">${student.chinese}</td>
                <td class="${classEnglish}">${student.english}</td>
                <td class="${classMath}">${student.math}</td>
                <td>${student.total}</td>
        </tr>`;

        dom.table.querySelector("tbody").insertAdjacentHTML("beforeend", tr);
    });
};

init();

// 使用 forEach 來為每一個 tr 添加 click 事件
// 但如果後續又新增 tr，則不會觸發 click 事件
// trs.forEach(function (tr) {
//     tr.addEventListener("click", function (e) {
//         console.log(e.target);
//     });
// });

const bindTr = function () {
    // 取得 tbody tr 元素
    let trs = dom.table.querySelectorAll("tbody tr");
    console.log(trs);

    // trs 並非 DOM 元素，所以無法使用 addEventListener
    trs.addEventListener("click", function (e) {
        console.log(e.target);
    });
    // 寫成 function 每次異動時，重新執行一次
    // 會有 n+1 的效能問題
};

const bindTbody = function () {
    let tbody = dom.table.querySelector("tbody");
    tbody.addEventListener("click", async function (e) {
        // console.log(e.target);
        if (e.target.tagName === "TD") {
            // console.log("TD");
            // 找到上一層的 tr
            let tr = e.target.closest("tr");
            // 如果有找到 tr
            if (tr) {
                // console.log(tr.dataset.uid);
                let result = await Swal.fire({
                    title: "確定要刪除嗎？",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "確定",
                    cancelButtonText: "取消",
                });

                // 確認是否有接收到 result
                // console.log(result);

                if (result.isConfirmed === true) {
                    // 刪除 tr
                    tr.remove();

                    // 抓取 tr 的 data-uid
                    let uid = tr.dataset.uid;

                    // 更新 students 陣列
                    students = students.filter(function (student) {
                        return uid !== student.uid;
                    });

                    // 更新 localStorage
                    localStorage.setItem("students", JSON.stringify(students));
                }

                // 更新 students 陣列
                // dataset => data-
                // dataset.index => 取得 data-index 的值
                // let index = tr.dataset.index
                // 使用 index 會有順序問題
                // 刪除完畢後，在使用 init 重新綁定 (OK，但有效能問題)
            }
        }
    });
};

// bindTbody();

/**
 * 一般條件判斷的寫法
 * @param {*} e 事件氣泡
 */
const normalIf = async function (e) {
    if (e.target.tagName == "TD") {
        // 找到上一層的 tr
        let tr = e.target.closest("tr");
        if (tr) {
            let result = await Swal.fire({
                title: "確定要刪除嗎？",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
            });

            console.log(result);
            if (result.isConfirmed) {
                // 抓取 tr 的 data-uid
                let uid = tr.dataset.uid;

                // 刪除 tr
                tr.remove();

                // 更新 students 陣列
                students = students.filter(function (student) {
                    return student.uid !== uid;
                });

                // 更新 localStorage
                localStorage.setItem("students", JSON.stringify(students));
            }

            // 更新 students 陣列
            // dataset => data-
            // dataset.index => 取得 data-index 的值
            // let index = tr.dataset.index
            // 使用 index 會有順序問題
            // 刪除完畢後，在使用 init 重新綁定 (OK，但有效能問題)
        }
    }
};

/**
 * 簡化判斷式的寫法
 * @param {*} e 事件起泡
 * @returns
 */
const notIf = async function (e) {
    // 判斷點到的是否為 td
    if (e.target.tagName != "TD") {
        return;
    }

    // 找到上一層的 tr
    let tr = e.target.closest("tr");
    // 如果沒有 tr 就不執行
    if (!tr) {
        return;
    }

    let result = await Swal.fire({
        title: "確定要刪除嗎？",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消",
    });

    // 如果沒有按下確認 就不執行
    if (!result.isConfirmed) {
        return;
    }

    // 刪除 tr
    tr.remove();

    // 抓取 tr 的 data-uid
    let uid = tr.dataset.uid;

    // 更新 students 陣列
    students = students.filter(function (student) {
        return student.uid !== uid;
    });

    // 更新 localStorage
    localStorage.setItem("students", JSON.stringify(students));
};

// 綁定 tbody 統一接收 click 事件
// 1. 抓取點擊的 tr
const bindTbody2 = function () {
    let tbody = dom.table.querySelector("tbody");
    tbody.addEventListener("click", async function (e) {
        normalIf(e);
        // notIf(e);
    });
};

bindTbody2();

/** TODO
 * 點選特定 tr 時，可刪除該 tr
 * 1. 抓取點擊的 tr
 * 2. 確認刪除
 * 3. 刪除 tr
 * 4. 更新 localStorage
 */
