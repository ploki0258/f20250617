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

    let tr = `<tr>
                <td>${name}</td>
                <td>${chinese}</td>
                <td>${english}</td>
                <td>${math}</td>
                <td>${total}</td>
    </tr>`;

    dom.table.querySelector("tbody").insertAdjacentHTML("beforeend", tr);

    students.push({
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

const init = function () {
    // 從瀏覽器的 localStorage 取得本地端資料
    let jsonStr = localStorage.getItem("students");
    // JSON.parse 將字串轉換成物件
    students = jsonStr ? JSON.parse(jsonStr) : [];

    students.forEach((student) => {
        let tr = `<tr>
                <td>${student.name}</td>
                <td>${student.chinese}</td>
                <td>${student.english}</td>
                <td>${student.math}</td>
                <td>${student.total}</td>
        </tr>`;

        dom.table.querySelector("tbody").insertAdjacentHTML("beforeend", tr);
    });
};

init();

const bindTr = function () {
    let trs = table.querySelectorAll("tbody tr");
    console.log(trs);

    trs.forEach(function (tr) {
        tr.addEventListener("click", function (e) {
            console.log(e.target);
        });
    });
};

const normalIf = async function (e) {
    if (e.target.tagName == "TD") {
        // 找到上一層的 tr
        let tr = e.target.closest("tr");
        if (tr) {
            let result = await wal.fire({
                title: "確定要刪除嗎？",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
            });

            if (result.isConfirmed) {
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

const notIf = async function (e) {
    // 判斷點到的是否為 td
    if (e.target.tagName != "TD") {
        return;
    }

    let tr = e.target.closest("tr");
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
const bindTbody = function () {
    let tbody = dom.table.querySelector("tbody");
    tbody.addEventListener("click", async function (e) {
        // normalIf(e)
        notIf(e);
    });
};

bindTbody();

/**
 * 點選特定 tr 時，可刪除該 tr
 * 1. 抓取點擊的 tr
 * 2. 確認刪除
 * 3. 刪除 tr
 * 4. 更新 localStorage
 */
