const doGet = async function (url, params = {}) {
    url = new URL(url);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
    });
    let response = await fetch(url);
    let data = await response.json();
    return data;
};

const doPost = async function (url, data = {}) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    let response = await fetch(url, options);
    let resultData = await response.json();
    return resultData;
};

const apiUrl = "https://book.niceinfos.com/api/form/io.php";

let data = await doGet(apiUrl, { uid: "1757149796374" });
console.log(data);

// uid: 1757149796_374
// 新增或更新
let result = await doPost(apiUrl, {
    uid: 1757149796_374,
    data: {
        name: "John",
        email: "john@example.com",
        age: 30,
    },
});
console.log(result);

// 刪除
// let result = await doPost(apiUrl, {
//     uid: "1757149796_374",
//     action: "delete",
// });
// console.log(result);

// ---
const dom = {
    apiUrl: document.querySelector("#api-url"),
    connectBtn: document.querySelector("#connect-btn"),
};

let api = null;

dom.connectBtn.addEventListener("click", async function () {
    let url = dom.apiUrl.value;
    if (!url) {
        alert("請輸入 API URL");
        return;
    }

    try {
        api = new Api(url);
        let response = await api.get({ uid: 1 });
        if (response.code === 200) {
            alert("連線成功");
        } else {
            alert(response.message);
        }
    } catch (error) {
        alert(error.message);
    }
});
