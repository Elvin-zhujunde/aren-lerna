const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

class Crawler {
    /**
     * 获取HTML文件中所有图片的src属性
     * @param {string} htmlPath HTML文件路径
     * @returns {Promise<string[]>} 图片src数组
     */
    static async getImageSrcs(htmlPath) {
        try {
            const html = await fs.promises.readFile(htmlPath, 'utf-8');
            const $ = cheerio.load(html);
            const srcs = [];
            
            $('img').each((_, element) => {
                const src = $(element).attr('src');
                if (src) {
                    srcs.push(src);
                }
            });
            
            return srcs;
        } catch (error) {
            console.error('读取HTML文件失败:', error);
            throw error;
        }
    }
}

module.exports = Crawler; 


