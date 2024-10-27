//统计在线人员
let onlineNumber = [];
//记录聊天记录
let chatList = [
    {
        sender: {
            headImg:
                'http://118.178.235.143:3000/upload_09aa61e7d7372605853afaee9d3e4698.jpg',
            username: 'a',

        },
        message: '你好啊',
    },
    {
        sender: {
            headImg:
                'http://118.178.235.143:3000/upload_0e66fe332c15bb28373fb783d8ae9702.jpg',
            username: 'a',

        },
        message: 'zjd',
    },
    {
        sender: {
            headImg:
                'http://118.178.235.143:3000/upload_189f3a0b9ab7b609dde4026fe5006e98.jpg',
            username: 'a',

        },
        message: 'zjd',
    },
    {
        sender: {
            headImg:
                'http://118.178.235.143:3000/upload_5b83f42cdfe65dbb528f2d3554886bec.jpg',
            username: 'a',

        },
        message: 'zjd',
    },
    {
        sender: {
            headImg:
                'http://118.178.235.143:3000/upload_8eac1a7241a53c35ef419d697ddfb9d8.jpg',
            username: 'a',

        },
        message: 'zjdend',
    },
];

let WebSocketServer = require('ws').Server;

//  与前端相对应
wss = new WebSocketServer({ port: 3000 });

//  调用 broadcast 广播，实现数据互通和实时更新
wss.broadcast = function (msg) {
    wss.clients.forEach(function each(client) {
        client.send(msg);
    });
};

//  
wss.on('connection', function (ws) {
    //  建立连接成功广播一次当前在线人数
    wss.broadcast(JSON.stringify({ onlineNumber, chat: chatList }));
    ws.emit('hello', '后端hello')
    //  接收前端发送过来的数据
    ws.on('message', function (e) {
        let resData = JSON.parse(e);

        if (resData.type === 'connect') {
            onlineNumber.push(resData.userinfo)
        }
        //  
        if (resData.type === 'message') {
            //  
            console.log(`接收到来自 ${resData.message.sender.username} 的消息：` + resData.message.message)
            //  每次发送信息，都会把信息存起来，然后通过广播传递出去，这样此每次进来的用户就能看到之前的数据
            chatList.push(resData.message);
        }
        //  每次发送都相当于广播一次消息
        wss.broadcast(JSON.stringify({ onlineNumber, chat: chatList }));
    });

    ws.on('close', function (e) {
        console.log(`长连接已关闭`, e)
        //  建立连接关闭广播一次当前在线人数
        wss.broadcast(JSON.stringify({ onlineNumber, chat: chatList }));
    })
})


console.log('服务器创建成功啦');