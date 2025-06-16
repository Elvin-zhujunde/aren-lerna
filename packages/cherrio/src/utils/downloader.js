const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

class Downloader {
    /**
     * 通用文件下载函数
     * @param {string} url 完整的下载地址
     * @param {string} downloadDir 下载目录
     * @param {string} [filename] 可选的文件名，如果不提供则从URL中提取
     * @returns {Promise<string>} 返回下载文件的完整路径
     */
    static async download(url, downloadDir, filename) {
        try {
            // 确保下载目录存在
            if (!fs.existsSync(downloadDir)) {
                fs.mkdirSync(downloadDir, { recursive: true });
            }

            // 如果没有提供文件名，从URL中提取
            const actualFilename = filename || path.basename(new URL(url).pathname) || 'downloaded_file';
            const fullPath = path.join(downloadDir, actualFilename);
            
            // 检查文件是否已存在
            if (fs.existsSync(fullPath)) {
                console.log(`文件已存在，跳过下载: ${fullPath}`);
                return fullPath;
            }

            // 下载文件
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`下载失败: ${response.statusText}`);
            }

            // 写入文件
            const buffer = await response.buffer();
            fs.writeFileSync(fullPath, buffer);
            
            console.log(`成功下载: ${fullPath}`);
            return fullPath;
        } catch (error) {
            console.error(`下载文件失败 ${url}:`, error.message);
            throw error;
        }
    }

    /**
     * 批量下载文件
     * @param {Array<{url: string, filename?: string}>} downloads 下载配置数组
     * @param {string} downloadDir 下载目录
     * @param {number} [concurrency=5] 并发下载数
     * @returns {Promise<string[]>} 返回下载文件路径数组
     */
    static async batchDownload(downloads, downloadDir, concurrency = 5) {
        console.log(`开始下载 ${downloads.length} 个文件到 ${downloadDir} ...`);
        
        const results = [];
        for (let i = 0; i < downloads.length; i += concurrency) {
            const batch = downloads.slice(i, i + concurrency);
            const batchResults = await Promise.all(
                batch.map(({ url, filename }) => 
                    this.download(url, downloadDir, filename)
                        .catch(error => {
                            console.error(`批量下载失败 ${url}:`, error.message);
                            return null;
                        })
                )
            );
            results.push(...batchResults.filter(Boolean));
        }
        
        console.log('所有文件下载完成');
        return results;
    }
}

module.exports = Downloader; 