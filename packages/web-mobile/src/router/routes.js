const routes = [
    {
        path: "/",
        meta: {
            isFunc: false,
            name: "根",
        },
        redirect: "/home",
    },
    {
        path: "/Home",
        meta: {
            isFunc: false,
            name: "主页",
        },
        component: () =>
            import("@/views/Home/HomeView.vue"),
    },
    {
        path: "/ChatRoom",
        meta: {
            icon: "friends-o",
            isFunc: true,
            name: "聊天室",
        },
        component: () =>
            import(
                "@/views/ChatRoom/ChatRoom.vue"
            ),
    },

    {
        path: "/product-detail",
        meta: {
            icon: "shopping-cart-o",
            isFunc: true,
            name: "商品详情",
        },
        component: () =>
            import(
                "@/views/ProductDetail/ProductDetail.vue"
            ),
    },
    {
        path: "/photo-cut",
        meta: {
            icon: "photo-o",
            isFunc: true,
            name: "图片剪切",
        },
        component: () =>
            import(
                "@/views/PhotoCut/PhotoCut.vue"
            ),
    },
    {
        path: "/ClickEvent",
        meta: {
            icon: "eye-o",
            isFunc: true,
            name: "点击事件",
        },
        component: () =>
            import(
                "@/views/ClickEvent/ClickEvent.vue"
            ),
    },
    {
        path: "/WeakUpApp",
        meta: {
            icon: "link-o",
            isFunc: true,
            name: "唤醒App",
        },
        component: () =>
            import(
                "@/views/WeakUpApp/WeakUpApp.vue"
            ),
    },
    {
        path: "/InputComposition",
        meta: {
            icon: "link-o",
            isFunc: true,
            name: "拼音合成事件",
        },
        component: () =>
            import(
                "@/views/InputComposition/InputComposition.vue"
            ),
    },
    {
        path: "/LazyLoad",
        meta: {
            icon: "photo-o",
            isFunc: true,
            name: "懒加载",
        },
        component: () =>
            import(
                "@/views/LazyLoad/LazyLoad.vue"
            ),
    },

    {
        path: "/Camera",
        meta: {
            icon: "video-o",
            isFunc: true,
            name: "Camera",
        },
        component: () =>
            import("@/views/Camera/Camera.vue"),
    },
    {
        path: "/large-file-upload",
        meta: {
            icon: "upgrade",
            isFunc: true,
            name: "大文件上传",
        },
        component: () =>
            import(
                "@/views/LargeFileUpload/LargeFileUpload.vue"
            ),
    },
    {
        path: "/suspense",
        meta: {
            icon: "upgrade",
            isFunc: true,
            name: "异步组件",
        },
        component: () =>
            import(
                "@/views/T-Suspense/T-Suspense.vue"
            ),
    },
]
export default routes
