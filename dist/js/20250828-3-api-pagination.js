import { Api } from "./components/Api.js";

const dom = {
    // 建立連線
    apiUrl: document.querySelector("#api-url"),
    connectBtn: document.querySelector("#connect-btn"),
    disconnectBtn: document.querySelector("#disconnect-btn"),
    connectWrap: document.querySelector("#connect-wrap"),

    // 連線模式
    connectMode: document.querySelector("#connect-mode"),

    // 接收資料
    // getUid: document.querySelector("#get-uid"),
    // getBtn: document.querySelector("#get-btn"),
    // responseTable: document.querySelector("#response-table"),

    // 發送資料
    userName: document.querySelector("#user-name"),
    userAge: document.querySelector("#user-age"),
    sendBtn: document.querySelector("#send-btn"),

    // 資料列表
    dataListWrap: document.querySelector("#data-list-wrap"),
    dataList: document.querySelector("#data-list"),
    editorWrap: document.querySelector("#editor-wrap"),
    editorUid: document.querySelector("#editor-uid"),
    editorName: document.querySelector("#edit-name"),
    editorAge: document.querySelector("#edit-age"),
    updateBtn: document.querySelector("#update-btn"),
    cancelBtn: document.querySelector("#cancel-btn"),

    // 切換頁籤
    tabApp: document.querySelector("#tab-app"),
    tabList: document.querySelector("#tab-list"),
    tabAdd: document.querySelector("#tab-add"),
};
// console.log(dom);

let api = null;

dom.tabApp.addEventListener("click", function (e) {
    e.preventDefault();

    pageToggle(e);
});

const pageToggle = function (e) {
    let target = e.target;
    // 頁籤切換
    if (target.dataset.tab) {
        dom.tabApp.querySelectorAll("a").forEach(function (tab) {
            tab.classList.remove("active");
        });
        target.classList.add("active");
    }

    // 內容切換
    document.querySelectorAll(".tab-content").forEach(function (content) {
        content.classList.remove("active");
    });
    document.querySelector(`#${target.dataset.tab}`).classList.add("active");
};

dom.connectBtn.addEventListener("click", async function () {
    // 重置狀態
    dom.connectWrap.classList.remove("connected");

    let url = dom.apiUrl.value;
    if (!url) {
        // alert("請輸入 API URL");
        Swal.fire({
            title: "連線錯誤",
            html: "請輸入 API URL",
            icon: "error",
            confirmButtonText: "確認",
        });
        return;
    }

    try {
        api = new Api(url);
        let response = await api.get({ uid: 1 });
        if (response.code === 200) {
            // alert("連線成功");
            Swal.fire({
                title: "連線成功",
                html: "API 已連線",
                icon: "success",
                confirmButtonText: "確認",
            });
            // 添加狀態
            dom.connectWrap.classList.add("connected");
            dom.connectMode.classList.add("active");
            // 鎖定輸入框(不能更動)
            dom.apiUrl.disabled = true;
        } else {
            Swal.fire({
                title: "發送訊息",
                html: response.message,
                icon: "warring",
                confirmButtonText: "確認",
            });
        }
    } catch (error) {
        Swal.fire({
            title: "發送訊息",
            html: error.message,
            icon: "warring",
            confirmButtonText: "確認",
        });
    }
});

dom.disconnectBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    let confirm = await Swal.fire({
        title: "確定要斷線嗎？",
        html: "斷線後將無法使用 API，請確認是否要斷線？",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "確認",
        cancelButtonText: "取消",
    });
    // console.log(confirm);
    if (!confirm.isConfirmed) return;

    // 移除狀態
    dom.connectWrap.classList.remove("connected");
    dom.connectMode.classList.remove("active");
    // 清空輸入框
    dom.apiUrl.value = "";
    // 解除鎖定
    dom.apiUrl.disabled = false;
    // 清除 api
    api = null;

    Swal.fire({
        title: "已斷線",
        html: "API 已斷線",
        icon: "success",
        confirmButtonText: "確認",
    });
});

// dom.getBtn.addEventListener("click", async function (e) {
//     // 終止事件原本的行為
//     e.preventDefault();

//     let tbody = "";
//     dom.responseTable.querySelector("tbody").innerHTML = tbody;

//     if (!api) {
//         Swal.fire({
//             title: "未連線",
//             html: "請先建立連線",
//             icon: "error",
//             confirmButtonText: "確認",
//         });
//         return;
//     }

//     let uid = dom.getUid.value;
//     // console.log("getBtn", uid);

//     if (!uid) {
//         Swal.fire({
//             title: "取得資料失敗",
//             html: "請輸入 UID",
//             icon: "error",
//             confirmButtonText: "確認",
//         });
//         return;
//     }

//     // 發送資料到 API
//     let response = await api.get({ uid });
//     console.log("response", response);
//     if (response.code === 200) {
//         for (let field in response.data) {
//             let value = response.data[field];
//             // console.log(value);
//             tbody += `<tr>
//                 <td>${field}</td>
//                 <td>${value}</td>
//             </tr>
//             `;
//         }
//         dom.responseTable.querySelector("tbody").innerHTML = tbody;
//     }
// });

// "1757170187_380"
dom.sendBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    if (!api) {
        Swal.fire({
            title: "未連線",
            html: "請先建立連線",
            icon: "error",
            confirmButtonText: "確認",
        });
        return;
    }

    let name = dom.userName.value;
    let age = dom.userAge.value;

    if (!name || !age) {
        Swal.fire({
            title: "發送失敗",
            html: "請輸入名稱和年齡",
            icon: "error",
            confirmButtonText: "確認",
        });
        return;
    }

    let response = await api.create({ name, age });
    console.log(response);
    if (response.code === 200) {
        Swal.fire({
            title: "發送成功",
            html: "資料已成功送出",
            icon: "success",
            confirmButtonText: "確認",
        });

        dom.userName.value = "";
        dom.userAge.value = "";

        // 將 uid 記錄到 localStorage
        let uids = getUids();
        uids[response.uid] = { name, age };
        setUids(uids);
        initDataList();
    } else {
        Swal.fire({
            title: "發送訊息",
            html: response.message,
            icon: "warring",
            confirmButtonText: "確認",
        });
    }
});

// 初始化資料列表
const initDataList = function () {
    let tbody = "";
    let uids = getUids();

    for (let uid in uids) {
        tbody += `<tr>
            <td>
                <div class="wrap">
                    <a href=# class="edit" data-uid=${uid}>編輯</a>
                    <a href=# class="delete" data-uid="${uid}">刪除</a>
                </div>                
            </td>
            <td>
                ${uid}
            </td>
            <td>
                ${uids[uid].name}
            </td>
            <td>
                ${uids[uid].age}
            </td>
        </tr>`;
    }
    dom.dataList.querySelector("tbody").innerHTML = tbody;
};

dom.dataList.addEventListener("click", async function (e) {
    e.preventDefault();

    let target = e.target;
    if (target.classList.contains("delete")) {
        if (!api) {
            Swal.fire({
                title: "未連線",
                html: "請先建立連線",
                icon: "error",
                confirmButtonText: "確認",
            });
            return;
        }

        let confirm = await Swal.fire({
            title: "確定要刪除嗎？",
            html: "刪除後無法恢復，請確認是否要刪除？",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "確認",
            cancelButtonText: "取消",
        });

        // console.log(confirm.isConfirmed);
        // 若 confirm.isConfirmed 是取消 則不執行 反之確認 則刪除
        if (!confirm.isConfirmed) return;

        let uid = target.dataset.uid;
        // console.log(uid);
        let response = await api.delete(uid);
        if (response.code === 200) {
            Swal.fire({
                title: "刪除資料成功",
                html: "資料已成功刪除",
                icon: "success",
                confirmButtonText: "確認",
            });
            let uids = getUids();
            delete uids[uid];
            uids = setUids(uids);
            initDataList();
        } else {
            Swal.fire({
                title: "發送訊息",
                html: response.message,
                icon: "warring",
                confirmButtonText: "確認",
            });
        }
    }

    if (target.classList.contains("edit")) {
        let uid = target.dataset.uid;
        // console.log(uid);
        let uids = getUids();
        if (!uids[uid]) return;

        let data = uids[uid];
        dom.editorAge.value = data.age;
        dom.editorName.value = data.name;
        dom.editorUid.value = uid;

        dom.dataListWrap.classList.add("editor-mode");
    }
});

dom.cancelBtn.addEventListener("click", function (e) {
    e.preventDefault();
    dom.dataListWrap.classList.remove("editor-mode");
});

dom.updateBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    if (!api) {
        Swal.fire({
            title: "未連線",
            html: "請先建立連線",
            icon: "error",
            confirmButtonText: "確認",
        });
        return;
    }

    let uid = dom.editorUid.value;
    let name = dom.editorName.value;
    let age = dom.editorAge.value;

    if (!uid || !name || !age) {
        Swal.fire({
            title: "更新失敗",
            html: "請輸入完整資料",
            icon: "error",
            confirmButtonText: "確認",
        });
        return;
    }
    let response = await api.update(uid, { name, age });
    if (response.code === 200) {
        Swal.fire({
            title: "更新資料成功",
            html: "資料已成功更新",
            icon: "success",
            confirmButtonText: "確認",
        });
        let uids = getUids();
        uids[uid] = { name, age };
        setUids(uids);
        initDataList();
        dom.dataListWrap.classList.remove("editor-mode");
    }
});

/**
 * 取得UIDS
 * @returns {object} 資料物件
 */
const getUids = function () {
    let uids = localStorage.getItem("uids");
    if (!uids) {
        uids = {};
    } else {
        uids = JSON.parse(uids);
    }

    return uids;
};

/**
 * 設定UIDS
 * @param {*} uids 資料物件
 */
const setUids = function (uids) {
    localStorage.setItem("uids", JSON.stringify(uids));
};

initDataList();
