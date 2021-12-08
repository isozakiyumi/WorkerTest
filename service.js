// self.addEventListener('fetch', function(e) {
//     // ここは空でもOK
// })
//
// // メインスレッドからのメッセージを受信
// let limit, left = 0;
// let timers = [];
// let source;
// self.addEventListener("message", (e) => {
//     console.log("Receive message on Service Worker");
//     const param = e.data;  // これでメインスレッドからの情報を受け取れる
//     console.log(param);
//     source = e.source;
//     switch (param.proc) {
//         case "start":
//         case "resume":
//         case "restart":
//             limit = param.limit * 1;
//             left = param.left * 1;
//             console.log(left);
//             if (left > 0) {
//                 timers.push(setInterval(self.countdown, 1000));
//             }
//             break;
//         case "pause":
//             for (const ti of timers) {
//                 clearInterval(ti);
//             }
//             timers = [];
//             self.getLeft();
//             break;
//     }
// });
//
// self.countdown = () => {
//     // 簡易カウントダウン。ちゃんとやるなら時間計測
//     left -= 1;
//     console.log("left=" + left);
//     if (left <= 0) {
//         for (const ti of timers) {
//             clearInterval(ti);
//         }
//         timers = [];
//     }
//     source.postMessage({
//         left: left
//     });
// }
//
// self.getLeft = () => {
//     source.postMessage({
//         left: left
//     });
// }
