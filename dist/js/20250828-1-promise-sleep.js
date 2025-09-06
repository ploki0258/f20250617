const dom = {
    sleep1: document.querySelector("#sleep1"),
    sleep2: document.querySelector("#sleep2"),
};
// console.log(dom);

const sleep = function (second = 3) {
    // reslove：成功, reject：失敗
    return new Promise(function (reslove, reject) {
        // setTimeout 瀏覽器提供的函數，second單位：毫秒(ms)
        setTimeout(function () {
            if (second > 10) {
                reject(400);
            }

            reslove(200);
        }, second * 1000);
    });
};

// sleep(3)
//     .then(function (data) {
//         console.log("sleep 3 秒後成功", data);
//         dom.sleep1.style.display = "block";
//     })
//     .catch(function (data) {
//         console.log("sleep 3 秒後失敗", data);
//     })
//     .finally(function (data) {
//         console.log("sleep 3 秒後完成", data);
//     });

// sleep(6)
//     .then(function (data) {
//         console.log("sleep 6 秒後成功", data);
//         dom.sleep2.style.display = "block";
//     })
//     .catch(function (data) {
//         console.log("sleep 6 秒後失敗", data);
//     })
//     .finally(function (data) {
//         console.log("sleep 6 秒後完成", data);
//     });

// console.log("Done.");

// IIFE 立即執行函數
(async function () {
    const run = async () => {
        // try 功用等同 Promise 的 then 方法
        try {
            let result = await sleep(3);
            console.log("result", result);
        } catch (error) {
            // 當錯誤發生時，會跳到 catch 區塊
            console.log("error", error);
        } finally {
            // 無論成功或失敗，都會執行 finally 區塊
            console.log("finally");
        }
    };

    console.log("Start");
    run();
    console.log("End");
})();

const delayDisplay = async function (second1, second2) {
    try {
        let result = await sleep(second1);
        dom.sleep1.style.display = "block";
        console.log("result", result);

        let result2 = await sleep(second2);
        dom.sleep2.style.display = "block";
        console.log("result2", result2);
    } catch (error) {
        // 當錯誤發生時，會跳到 catch 區塊
        console.log("error", error);
    } finally {
        // 無論成功或失敗，都會執行 finally 區塊
        console.log("finally");
    }
};

delayDisplay(3, 6);
