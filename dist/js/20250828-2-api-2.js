import { Api } from "./components/Api.js";

const dom = {
    apiUrl: document.querySelector("#api-url"),
    connectBtn: document.querySelector("#connect-btn"),
};

let api = null;

dom.connectBtn.addEventListener("click", async function () {
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
                // html: html,
                icon: "success",
                confirmButtonText: "確認",
            });
        } else {
            alert(response.message);
        }
    } catch (error) {
        alert(error.message);
    }
});
