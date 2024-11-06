window.onload = function () {
    imgLocation('container', 'box')
}

// 获取到当前有多少张图片要摆放
function imgLocation(parent, content) {
    debugger
    // 将parent下所有的内容全部取出
    const cparent = document.getElementById(parent)
    const ccontent = getChildElemnt(cparent, content)
    const imgWidth = ccontent[0].offsetWidth
    const num = Math.floor(document.documentElement.clientWidth / imgWidth)
    cparent.style.cssText = `width: ${imgWidth * num} px`

    const BoxHeightArr = []
    for (let i = 0; i < ccontent.length; i++) {
        if (i < num) {
            BoxHeightArr[i] = ccontent[i].offsetHeight
        } else {
            const minHeight = Math.min.apply(null, BoxHeightArr)
            const minIndex = getMinHeightLocation(BoxHeightArr, minHeight)
            ccontent[i].style.position = 'absolute'
            ccontent[i].style.top = `${minHeight}px`
            ccontent[i].style.left = `${ccontent[minIndex].offsetLeft}px`
            BoxHeightArr[minIndex] = BoxHeightArr[minIndex] + ccontent[i].offsetHeight
        }
    }
    // console.log(BoxHeightArr);
}

function getChildElemnt(parent, content) {
    const contentArr = []
    const allContent = parent.getElementsByTagName('*')
    // console.log(allContent);
    for (let i = 0; i < allContent.length; i++) {
        if (allContent[i].className == content) {
            contentArr.push(allContent[i])
        }
    }
    // console.log(contentArr);
    return contentArr
}

function getMinHeightLocation(BoxHeightArr, minHeight) {
    for (const i in BoxHeightArr) {
        if (BoxHeightArr[i] === minHeight) {
            return i
        }
    }
}
