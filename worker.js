// メインスレッドからのメッセージを受信
let limit, left = 0;
let timers = [];
self.addEventListener("message", (e) => {
    console.log("Receive message on Web Worker");
    const param = e.data;  // これでメインスレッドからの情報を受け取れる
    console.log(param);
    switch (param.proc) {
        case "start":
        case "resume":
        case "restart":
            limit = param.limit * 1;
            left = param.left * 1;
            console.log(left);
            if (left > 0) {
                timers.push(setInterval(self.countdown, 1000));
            }
            break;
        case "pause":
            for (const ti of timers) {
                clearInterval(ti);
            }
            timers = [];
            self.getLeft();
            break;
    }
});

self.countdown = () => {
    // 簡易カウントダウン。ちゃんとやるなら時間計測
    left -= 1;
    console.log("left=" + left);
    if (left <= 0) {
        for (const ti of timers) {
            clearInterval(ti);
        }
        timers = [];
    }
    self.postMessage({
        left: left
    });
}

self.getLeft = () => {
    self.postMessage({
        left: left
    });
}
