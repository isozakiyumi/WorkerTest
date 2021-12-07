self.addEventListener('fetch', function(e) {
    // ここは空でもOK
})

self.addEventListener("message", (e) => {
    console.log("Receive message on Service Worker");
    const param = e.data;  // これでメインスレッドからの情報を受け取れる
    console.log(param);
})
