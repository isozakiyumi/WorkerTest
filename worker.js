// メインスレッドからのメッセージを受信
let limit, left = 0;
let timer;
self.addEventListener("message", (e) => {
    const param = e.data;  // これでメインスレッドからの情報を受け取れる
    console.log(param);
    switch (param.proc) {
        case "start":
            left = limit = param.limit;
            timer = setInterval(self.countdown, 1000);
            break;
        case "pause":
            clearInterval(timer);
            timer = null;
            break;
        case "resume":
            if (left > 0) {
                timer = setInterval(self.countdown, 1000);
            }
            break;
    }
    //----------------------------------
    // このあたりにWorkerにさせたい処理を書く
    // (途中経過のメッセージを送信するのもあり)
    //----------------------------------

    // メインスレッドへメッセージを送信
    // self.postMessage("Nice to meet you");
});

self.countdown = () => {
    left -= 1000;
    console.log("left=" + left);
    if (left <= 0) {
        clearInterval(timer);
        timer = null;
    }
    self.postMessage(left);
}
