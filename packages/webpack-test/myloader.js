const loaderUtils = require('loader-utils')
const Minimize = require('minimize')

function loader(content) {
    console.log('进入到了loader内部,以下可以对代码做些什么')
    console.log('---------------------------------')
    console.log(content)
    console.log('---------------------------------')
    const options = this.getOptions();
    console.log(options);
    return content 
}

module.exports = loader
