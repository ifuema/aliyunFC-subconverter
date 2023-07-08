<div align="center">
  <h1> aliyunFC-subconverter </h1>
  将 <a href="https://github.com/tindy2013/subconverter">subconverter</a> 订阅转换服务部署至阿里云函数
</div>


## 优点
- 避免使用第三方在线订阅转换可能的订阅泄露
- 低成本，函数调用计费0.01元/万次，自用其他资源计费也可忽略不计
- 无需维护，自动扩容


## 部署
1. 首先 [下载](https://github.com/ifuema/aliyunFC-subconverter/releases) 最新压缩包
2. 进入阿里云函数，切换地区，尽量选择非大陆地区，建议选择日本或香港

![](/img/1.png)

3. 创建服务`subconverter`（注意禁用日志功能，开启可能会导致额外计费）

![](/img/2.png)

6. 创建函数`base`
   - 请求处理程序类型：处理 HTTP 请求
   - 代码上传方式：通过 ZIP 包上传代码
   - 代码包：（上传下载的压缩包）
   
   ![](/img/3.png)
   
   - 实例并发度：1-200根据需求设置（设置并发可以降低冷启动概率，节省资源）
   - 执行超时时间：20秒（最低设置20秒）
   
   ![](/img/4.png)

7. 进入函数配置，编辑实例生命周期回调
   - Initializer 回调程序：`index.initializer`
   
   ![](/img/5.png)
   
   ![](/img/6.png)


## 用法
### 域名

![](/img/7.png)

### 调用地址（将域名修改为自己的公网访问地址）
```
https://XXXXXX.fcapp.run/sub?target=%TARGET%&url=%URL%&config=%CONFIG%
```

### 具体用法参阅 [subconverter](https://github.com/tindy2013/subconverter)
