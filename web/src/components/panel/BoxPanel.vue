<template>
    <div
        ref="updateDetailPopup"
        class="updateDetail theme-updateDetail"
        :style="style"
        @mousedown="titleMousedown"
    >
        <div
            class="updateDetail-header"
            v-if="title !== false"
        >
            <div class="title-container">
                <div class="title">
                    <span>{{ title }}</span>
                </div>
                <div>
                    <slot name="head"></slot>

                    <CloseOutlined
                        @click="onClose"
                        v-show="showIcon"
                    />
                </div>
            </div>
            <div class="title-under-line"></div>
            <div class="under-line">
                <div class="left-line"></div>
                <div class="right-line"></div>
            </div>
        </div>
        <div class="updateDetail-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { CloseOutlined } from "@ant-design/icons-vue"
export default {
    name: "ComPanel",
    components: {
        CloseOutlined,
    },
    props: {
        title: {},
        position: {},
        showIcon: {
            type: Boolean,
            default: false,
        },
    },
    beforeDestroy() {
        // this.onClose()
    },
    computed: {
        style: function () {
            let style
            switch (this.position) {
                case "lb":
                    style = { left: "20px", bottom: "84px" }
                    break
                case "lt":
                    style = { left: "20px", top: "84px" }
                    break
                case "rt":
                    style = { right: "20px", top: "84px" }
                    break
                case "rb":
                    style = { right: "20px", bottom: "84px" }
                    break
                default:
                    style = { left: 0, top: 0 }
            }
            return style
        },
    },
    methods: {
        onClose() {
            this.$emit("onClose")
        },
        titleMousedown() {
            this.$emit("titleMousedown")
        },
    },
}
</script>

<style lang="less" scoped>
.updateDetail {
    // transition: left 0.2s;
    z-index: 1001;
    width: 100%;
    max-height: 500px;
    padding: 14px;
    color: #ffffff;
    font-size: 14px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    // background-image: linear-gradient(
    //   180deg,
    //   rgba(8, 20, 49, 1) 0%,
    //   rgba(3, 13, 42, 1) 100%
    // );
    border-radius: 4px;
    // border: 1px solid;
    // border-image: linear-gradient(
    //     135deg,
    //     rgba(25, 71, 255, 0.8) 0%,
    //     rgba(255, 255, 255, 0) 25%,
    //     rgba(255, 255, 255, 0) 50%,
    //     rgba(0, 255, 248, 0.8) 100%
    //   )
    //   1;
    .updateDetail-header {
        position: relative;
        padding-bottom: 14px;

        .title-container {
            height: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                font-size: 16px;
                flex-shrink: 0;
                color: currentColor;
                font-weight: 600;
                // font-family: YouSheBiaoTiYuan;

                letter-spacing: 1px;
                z-index: 10;
            }
        }

        .title-under-line {
            width: 190px;
            height: 12px;
            background-image: linear-gradient(270deg, rgba(114, 250, 255, 0) 0%, rgba(0, 101, 248, 0.38) 100%);
            position: absolute;
            bottom: 12px;
        }

        .under-line {
            position: absolute;
            bottom: 0;
            width: 100%;
            border-bottom: 1px solid rgba(0, 207, 255, 0.19);
            display: flex;
            justify-content: space-between;
            align-items: flex-end;

            .left-line {
                width: 17px;
                border-bottom: 2px solid #00cfff;
            }
            .right-line {
                width: 12.5px;
                border-bottom: 1px solid #f5a623;
            }
        }
    }
    .updateDetail-content {
        flex: 1;
        padding-top: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: #e0e0e0;
        box-shadow: none;
    }
}
</style>
