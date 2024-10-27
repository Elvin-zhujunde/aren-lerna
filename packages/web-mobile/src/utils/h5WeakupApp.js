
const isAndroid = (ua) => { return /android/i.test(ua); }
const isIos = (ua) => { return /iphone|ipad|ipod/i.test(ua); }
const isWeixin = (ua) => { return /micromessenger\/([\d.]+)/i.test(ua); }
const isWeibo = (ua) => { return /(weibo).*weibo__([\d.]+)/i.test(ua); }
const isBaidu = (ua) => { return /(baiduboxapp)\/([\d.]+)/i.test(ua); }
const isQQ = (ua) => { return /qq\/([\d.]+)/i.test(ua); }
const isQQBrowser = (ua) => { return /(qqbrowser)\/([\d.]+)/i.test(ua); }
const isQzone = (ua) => { return /qzone\/.*_qz_([\d.]+)/i.test(ua); }

function openByIFrame (url) {
    let weakUpIframe;
    weakUpIframe = document.createElement('iframe');
    weakUpIframe.style.cssText = 'display:none;border:0;width:0;height:0;';
    document.body.appendChild(weakUpIframe);
    weakUpIframe.src = url;
}
function openByLocation (url) {
    window.location.href = url
}
function openByTagA (url) {
    // append 在 android 6 系统中有兼容性问题
    // eslint-disable-next-line unicorn/prefer-node-append  
    const tagA = document.createElement('a');
    tagA.setAttribute('href', url);
    tagA.style.display = 'none';
    document.body.appendChild(tagA);
    tagA.click();
}
function openApp (opt, callback) {
    /*
        要考虑的兼容点 [手机类型 IOS/Andriod/Linux, 浏览器版本, 浏览器类型]
        ios qq 禁止了 universalLink 唤起app，安卓不受影响 - 18年12月23日
        ios qq 浏览器禁止了 universalLink - 19年5月1日
        ios 微信自 7.0.5 版本放开了 Universal Link 的限制
        ios 微博禁止了 universalLink
        1. 摒弃拉起应用宝链接
        2. 
    */
    let { urlScheme, downLoadUrl, universalLink, delay } = opt;
    let timer = null;
    let ua = navigator.userAgent.toLowerCase();

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState == 'hidden') timer && clearTimeout(timer);
    });
    // 百度不允许用urlScheme唤醒
    if (isBaidu(ua)) return (alert(`请使用其他浏览器打开该页面`), false);
    if (isWeixin(ua)) return (alert(`请使用浏览器打开该页面`), false);
    if (isIos(ua)) {
        if (universalLink) return (openByLocation(universalLink), false);
        (isQQ(ua) || isQQBrowser(ua) || isQzone(ua)) ? openByTagA(urlScheme) : openByLocation(urlScheme);
        timer = setTimeout(function () {
            !document.hidden && openByLocation(downLoadUrl);
        }, delay || 2500);
    } else if (isAndroid(ua)) {
        if (isQQ(ua) || isQQBrowser(ua) || isQzone(ua)) return (alert(`请使用浏览器打开该页面`), false);
        openByLocation(urlScheme);
        timer = setTimeout(function () {
            !document.hidden && openByLocation(downLoadUrl);
        }, delay || 2500);
    }
}

export default {
    install: function (Vue) {
        Vue.prototype.$openApp = openApp;
    },
    openApp
};

