
function openApp (appConfig, cb) {
    let u = navigator.userAgent;
    let t0 = new Date().getTime();
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('iPhone') > -1) {
        window.location.href = appConfig.schemeUrl;
        let delay = setInterval(function () {
            console.log(1231231);
            let t1 = new Date().getTime();
            if (t1 - t0 < 3000 && t1 - t0 > 2000) {
                // 两秒到三秒内
                alert('请下载APP');
                window.location.href = appConfig.downloadUrl;
            }
            if (t1 - t0 >= 3000) {
                clearInterval(delay);
            }
        }, 1000);
    }
}


export default {
    install: function (Vue) {
        Vue.prototype.$openApp = openApp;
        // Vue.goShare = openApp;
    },
    openApp
};