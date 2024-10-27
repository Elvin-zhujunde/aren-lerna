function openApp (opt) {
    console.log(opt)
    let urlScheme = opt.urlScheme
    let downLoadUrl = opt.downLoadUrl
    let universalLink = opt.universalLink
    let ua = navigator.userAgent.toLowerCase()
    let timer = null

    if (isWeixin() || isQQ() || isWeibo()) {
        //逻辑处理
        alert('请使用浏览器打开页面')
        return false
    }
    if (isAndroid()) {
        watchVisibility()
        window.location.href = urlScheme
        timer = setTimeout(() => {
            window.location.href = downLoadUrl;
        }, 3000);
        return
    }
    if (isIOS()) {
        if (universalLink) {
            window.location.href = universalLink
            return
        }
        watchVisibility()
        window.location.href = urlScheme
        timer = setTimeout(() => {
            window.location.href = downLoadUrl;
            clearTimeout(timer)
        }, 3000);
        return
    }
}
function isIOS () {
    return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || ua.includes("mac os x")
}
function isAndroid () {
    return ua.includes("android") || ua.includes("Android") || ua.includes("Adr")
}
function isWeixin () {
    return ua.match(/MicroMessenger/i) == "micromessenger"
}
function isQQ () {
    return ua.match(/QQ/i) == "qq"
}
function isWeibo () {
    return ua.match(/WeiBo/i) == "weibo"
}
function watchVisibility () {
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState == 'hidden') {
            timer && clearTimeout(timer)
        }
    })
}
