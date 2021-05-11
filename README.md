# 魔改 flutter_js

### 专注改善 [flutter_js](https://github.com/abner/flutter_js) 的Promise和网络请求方面的运行效率和开发体验。

改动:

1. 开发了新的 [evaluateWithAsync](/lib/extension/promise.dart#L46) 方法代替原来的 evaluateAsync
   + [handlePromise](https://github.com/abner/flutter_js/blob/0dbf4138da63d1cfdd5ad4d53b9bdd974c4dfcfd/lib/extensions/handle_promises.dart#L96)
   组合方法；
1. 创建QuickJS后自动执行`dispatch()`建立事件循环，[代码文件](./lib/flutter_js.dart#L28)
   ，[dispatch的说明](https://github.com/ekibun/flutter_qjs/blob/master/README-CN.md#%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8)
1. 第一点和第二点结合起来解决了：原 flutter_js
   的 [handlerPromise方法](https://github.com/abner/flutter_js/blob/0dbf4138da63d1cfdd5ad4d53b9bdd974c4dfcfd/example/lib/main.dart#L128)
   每次都要调用一次dispatch()，导致报`Bad state: Stream has already been listened to`错误的问题，从此忘了handleProse方法吧；
1. 修复了js的`console.log('第一', '第二', '第三')`只能在dart console输出第一个参数的问题，[代码文件](./lib/javascript_runtime.dart#L110)；
1. 删除了XMLHttpRequest、fetch、Promise js和dart相关的实现代码；
1. 重写了JavaScriptCore和QuickJS的Promise机制，更精简更高效；
1. 使用fetch而弃用XMLHttpRequest，所以没有实现XMLHttpRequest功能；
1. fetch和promise的js代码在js文件编写，再写了个服务自动写入到promise.dart和fetch.js

    * js代码自动写入到dart文件避免异步读取资源文件；
    * 自动写入服务使用Node.js实现，不改动这两个js文件的话不需要安装和运行Node.js；
1. example只保留Promise相关例子代码，其它使用范例请浏览原仓库的example；