
class myPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        console.log(compiler.hooks.run);

        // compiler 是 webpack 编译器的实例
        compiler.hooks.run.tap('myPlugin', (compilation) => {
            // compilation 对象包含了当前的 compilation 实例
            // 你可以在这里添加你的逻辑
            console.log('SimplePlugin is running with options:', this.options);
            return
            // 想办法让自己的plugin能在HtmlWebpackPlugin 执行的某个时间点上执行
            HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tap(
                'myPlugin',
                (htmlPluginData, cb) => {
                    //   console.log(htmlPluginData);
                    const jsSrc = htmlPluginData.assets.js[0]
                    htmlPluginData.assets.js[0] = `${jsSrc}?${new Date().getTime()}`
                },
            )

            //  compilation.hooks.buildModule.tap('myPlugin',
            //  (data,cb) => {
            //      console.log(data.source);
            //  })
        });
    }

}

module.exports = myPlugin
