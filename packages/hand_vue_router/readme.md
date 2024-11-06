# 路由

    描述的是URL和处理函数之间的一种映射

    在前端单页应用中，路由描述的是URL和UI的映射关系

## 实现前端路由要解决的两个问题

1. 改变URL页面不刷新
2. 如何检测到URL变了

# hash

在URL后面#的部分，会让页面不刷新 => 解决问题1 JS 中的api window.addEventListener('hashchange',onHashChange) => 解决问题2

## 原理（描述给面试官听的）:

    因为hash的改变天生就不会引起页面刷新，所以在URL后面拼接#哈希值，再通过hashchange事件监听到URL的变化，从而去显示不同的dom结构

<ul>
    <li><a href="#/home">首页</a></li>
    <li><a href="#/about">关于</a></li>
</ul>

<div id="routerView"></div>

<script>
    //监听路由变化
    let routerView = document.querySelector('#routerView')
    window.addEventListener('hashchange', onHashChange);

    // 页面初次加载就要执行一次hash监听 
    // 法一
    // window.onload = function() {
    //     onHashChange();
    // }
    // 法二
    // window.addEventListener('DOMContentLoaded',onHashChange)

    function onHashChange() {
        console.log(location.hash);
        switch (location.hash) {
            case '#/home':
                routerView.innerHTML = '这是首页页面'
                break;
            case '#/about':
                routerView.innerHTML = '这是关于页面'

                break;
            default:

                break;
        }
    }
</script>

# history模式

html 提供了一个history对象，该对象提供了pushstate 和 replacestate 两个方法 => 解决问题1 history提供了类似于hashchange的
事件popState，通过a标签/replaceState/pushState改变URL是不会触发popstate,
