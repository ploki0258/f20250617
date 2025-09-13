import { Alert } from "./components/Alert.js";

const options = {
    data() {
        return {
            form: {
                name: "",
                email: "",
                phone: "",
                submit: "",
                message: "",
            },
            requires: {
                name: "姓名",
                email: "信箱",
                phone: "電話",
                subject: "主旨",
                message: "訊息",
            },
        };
    },
    methods: {
        async submit() {
            // 檢查是否填寫完整
            for (let key in this.requires) {
                if (!this.form[key]) {
                    // await Alert.alert("欄位未填寫", `請輸入 ${this.requires[key]}`, "error");
                    // alert(`請輸入${this.requires[key]}`);
                    Swal.fire({
                        icon: "error",
                        title: "欄位未填寫",
                        text: `請輸入 ${this.requires[key]}`,
                        confirmButtonText: "確定",
                    });
                    if (this.$refs[key]) {
                        setTimeout(() => {
                            this.$refs[key].focus();
                        }, 400);
                    }
                    return;
                }
            }

            // 發送資料到後端
            console.log("Form submitted");
            console.log(this.form);
        },
    },
    mounted() {
        console.log("Vue app mounted");
    },
};

const { createApp } = Vue;

// 初始化 Vue App
createApp(options).mount("#app");
