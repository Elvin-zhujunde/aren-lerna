<template>
    <div class="wrapper">
        <div class="header">
            <slot name="header"></slot>
        </div>

        <div class="auto-content">
            <div class="content-wrapper">
                <slot></slot>
            </div>
        </div>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup></script>

<style scoped lang="less">
.wrapper {
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    .header {
    }
    .auto-content {
        flex-grow: 1;
        height: 0;
        overflow-y: overlay;
        position: relative;
        display: flex;
        flex-direction: column;
        .content-header {
            border: 1px solid #000;
            width: 100%;
            overflow-wrap: break-word;
            .content-wrapper {
                flex: 1;
                height: 0px;
                overflow-wrap: break-word;
            }
        }
    }
    .footer {
        overflow-wrap: break-word;
    }
}
</style>
