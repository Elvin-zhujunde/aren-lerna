const path = require('path');
const Downloader = require('./utils/downloader');

async function main() {
    try {
        // 下载目录
        const downloadDir = path.join(__dirname, 'download');

        // 准备下载配置
        const downloads = [
            {
                url: 'http://www.jqueryfuns.com/d/load/2a5a291f7046e5cae485d9cfe516454058d8e09c706c2506_1_0',
                filename: 'file1.rar'  // 可以自定义文件名
            },
            {
                url: 'http://www.jqueryfuns.com/d/load/2a5a291f7046e5ca5f0c452aeeb0cf57cdb6193c04f5083e_1_0',
                filename: 'file2.rar'
            },
            {
                url: 'http://www.jqueryfuns.com/d/load/2a5a291f7046e5ca1914192c83fab42bc7e96584de1cde85_1_0',
                filename: 'file3.rar'
            }
        ];

        // 开始批量下载
        const downloadedFiles = await Downloader.batchDownload(downloads, downloadDir, 3);
        
        console.log('下载完成的文件:', downloadedFiles);
    } catch (error) {
        console.error('程序执行失败:', error.message);
        process.exit(1);
    }
}

main();

