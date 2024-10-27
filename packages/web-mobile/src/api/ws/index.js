
import config from '../../config/index.js'
export function initWebSocket () {
    let ws = {};
    //判断页面有没有存在websocket连接
    if (window.WebSocket) {
        // 192.168.0.115 是我本地IP地址 此处的 :3000 端口号 要与后端配置的一致
        ws = new WebSocket(config.wsUrl);
    }
    return ws
}


