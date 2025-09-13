class Alert {
    /**
     * 初始化 動態加載組件
     * @returns
     */
    static init() {
        return new Promise((resolve, reject) => {
            if (typeof Window.Swal === "undefined") {
                let script = document.createElement("script");
                script.src = "js/lib/sweetalert2@11";
                script.onload = () => {
                    console.log("Swal loaded.");
                    resolve();
                };
                document.head.appendChild(script);
                // document.head.append(script);
            } else {
                resolve();
            }
        });
    }

    static async alert(title, content, iconType = "success", btnText = "確定") {
        await this.init();
        let result = await Swal.fire({
            icon: iconType,
            title: title,
            text: content,
            confirmButtonText: btnText,
        });
        return result;
    }
}

export { Alert };
