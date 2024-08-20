# 玄武通云开放平台接口
## 版本 1.4
作者：Peter.Tian
更新日期：2024-8-17

## 1 概述

### 1.1平台介绍
&emsp; &emsp; 玄武通云是基于视频+AI设计，是支持跨平台部署的基础资源平台。主要提供视频接入、AI分析预警、标准视频协议提供（支持对外提供HLS、RTSP），平台提供接口包括：实时视频预览、录像查询、录像回放、预览图片抓取并上传、定时录像捕获并上传。

### 1.2 约定
smu：玄武通云平台的简写<br/>
third：三方平台<br/>
http/https：超文本传输协议，SMU对两种都支持<br>
sn：设备序列号，每一个设备都有自己独立的序列号<br>
ch/channel：通道号，所有设备的通道号均从0开始计数<br>
stream：流号，0为主码流，通常是摄像机的高清码流（设备通常用于存储）。1为次码流，通常是摄像头的标清码流（通常用于预览）<br>
json：请求结果均采用json格式对数据进行封装返回<br>
时间格式：datetime采用(YYYYMMDDThhmmss)格式，如：20230704T115500<br>
认证：三方在平台通过请求URL上增加token参数的方式实现安全验证。Token由本平台提供。<br>

### 1.3 协议规范
|        传输方式        |   采用HTTP/HTTPS实现请求   |
| :--------------------: | :------------------------: |
| 采用HTTP/HTTPS实现请求 | 提交和返回值都采用JSON格式 |
|        字符编码        |     统一采用UTF-8编码      |
|        安全规范        |    开放接口暂不使用认证    |

## 2 Web视频接入
&emsp; &emsp; 三方平台通过web集成播放功能时采用玄武提供的的播放插件接入，插件是基于webrtc协议实现。提供源码，可自由更改。<br>
&emsp; &emsp; <a herf="#" style="cursor:pointer;" >详情见示例源码（xuanwuplayer.7z）。</a>

## 3 接口指令

### 3.1 认证
&emsp; &emsp;采用token认证，在所有api请求中添加token参数。如：
```js
https://{{smu}}/api/v1/device/list?type=smartBox&_r=0.21170003233771073&page=1&limit=15&token=xxxxx
```

### 3.2 查询设备清单
<ul>
  <li>
    接口方向<br>
    thrid --> smu
  </li>
  <li>
    接口路径<br>
    [GET] /api/v1/previewDevices
  </li>
  <li>
    接口参数:  
  </li>  
</ul>

| 参数名称 | 数据类型 | 是否必须 |   说明   |
| :------: | :------: | :------: | :------: |
|  limit   |   Int    |    是    | 单页数量 |
|   page   |   Int    |    是    |  第N页   |

<ul>
  <li>
    请求示例:
  </li>
</ul>

``` js
 https://{{smu}}/api/v1/streaminfo?sn=ZQ2024051470000000010039
```

<ul>
  <li>
    响应说明：
  </li>
</ul>

| 参数名称 | 数据类型 | 是否必须 |          说明          |
| :------: | :------: | :------: | :--------------------: |
|   code   |   Int    |    是    |       返回响应码       |
|   msg    |  String  |    是    |      返回响应信息      |
|   data   |  Object  |    否    | 成功时返回有效设备信息 |
|  count   |   Int    |    是    |        总的条数        |

data响应参数如下：

|    参数名称    | 数据类型 | 是否必须 |         说明         |
| :------------: | :------: | :------: | :------------------: |
|      chs       |   Int    |    是    |       总通道数       |
|     chInfo     |  Object  |    是    |     实时视频对象     |
|    isOnline    |   Int    |    是    |     设备是否在线     |
|       sn       |  String  |    是    |      设备序列号      |
|     index      |   Int    |    是    |        索引号        |
| lastUpdateTime |  String  |    是    | 最后一次更新状态时间 |
|      name      |  String  |    是    |       设备名称       |
|    latitude    |  String  |    是    |     设备安装维度     |
|   longitude    |  String  |    是    |     设备安装经度     |

chInfo具体参数如下：
| 参数名称 | 数据类型 | 是否必须 |       说明       |
| :------: | :------: | :------: | :--------------: |
|    ch    |   Int    |    是    |    视频通道号    |
| isOnline |   Int    |    是    | 视频通道是否在线 |
|   name   |  String  |          |   视频通道名称   |

<ul>
  <li>
    响应示例：
  </li>
</ul>

``` json
{
    "code": 0,
    "count": 9,
    "data": [
        {
            "chInfo": [
                {
                    "ch": 0,
                    "isOnline": 0,
                    "name": "tiandy"
                },
                {
                    "ch": 1,
                    "isOnline": 0,
                    "name": "hm"
                },
                {
                    "ch": 2,
                    "isOnline": 0,
                    "name": "GB-265"
                },
                {
                    "ch": 3,
                    "isOnline": 0,
                    "name": "GB-264"
                },
                {
                    "ch": 4,
                    "isOnline": 0,
                    "name": "hik-264"
                }
            ],
            "chs": 5,
            "index": 0,
            "isOnline": 0,
            "lastUpdateTime": "2024-03-08 01:07:11",
            "latitude": "38.026283615",
            "longitude": "114.450328625",
            "name": "成都测试朱雀",
            "sn": "ZQ700020230302000000011"
        }
    ],
    "msg": "success"
}
```

### 3.3 获取设备通道状态和播放地址
<ul>
  <li>
    接口方向<br>
    thrid --> smu
  </li>
  <li>
    接口路径<br>
    [GET] /api/v1/streaminfo
  </li>
  <li>
    接口参数:  
  </li>  
</ul>

| 参数名称 | 参数类型 | 是否必须 |    说明    |
| :------: | :------: | :------: | :--------: |
|    sn    |  String  |    是    | 设备序列号 |

<ul>
  <li>
    请求示例:
  </li>
</ul>

``` js
 https://{{smu}}/api/v1/streaminfo?sn=ZQ2024051470000000010039
```

<ul>
  <li>
    响应说明：
  </li>
</ul>

| 参数名称 | 数据类型 | 是否必须 |          说明          |
| :------: | :------: | :------: | :--------------------: |
|   code   |   Int    |    是    |       设备响应码       |
|   msg    |  String  |    是    |      返回响应信息      |
|   data   |  Object  |    否    | 成功时返回有效通道信息 |

data响应参数如下：

| 参数名称 | 数据类型 | 是否必须 |                             说明                              |
| :------: | :------: | :------: | :-----------------------------------------------------------: |
| channel  |   Int    |    是    |                            通道号                             |
|   live   |  Object  |    是    |                         实时视频对象                          |
|  status  |   Int    |    是    |                           在线状态                            |
|  title   |  String  |    是    |                           通道名称                            |
|   hls    |  Object  |    是    |            HLS播放地址，推荐用于小程序、公众号使用            |
|   rtsp   |  Object  |    是    |        RTSP播放地址，推荐在三方ai平台拉取视频流时使用         |
|  webrtc  |  Object  |    是    |             Webrtc播放地址，推荐在web页面播放使用             |
| httpflv  |  Object  |    是    | httpflv播放地址，基于http传输，推荐在网络策略限制多的时候使用 |
|    hd    |  String  |    是    |                         高清视频地址                          |
|    sd    |  String  |    是    |                         标清视频地址                          |

<ul>
  <li>
    响应示例：
  </li>
</ul>

``` json
{
    "data": [
        {
            "channel": 0,
            "live": {
                "hls": {
                    "hd": "http://test.xuanwutongyun.com/hls/live.m3u8?sn=ZQ2024051470000000010039&ch=0&stream=00",
                    "sd": "http://test.xuanwutongyun.com/hls/live.m3u8?sn=ZQ2024051470000000010039&ch=0&stream=01"
                },
                "rtsp": {
                    "hd": "rtsp://test.xuanwutongyun.com:5544/ZQ2024051470000000010039/0000",
                    "sd": "rtsp://test.xuanwutongyun.com:5544/ZQ2024051470000000010039/0001"
                }
                "httpflv": {
                    "hd": "http://test.xuanwutongyun.com/live/ZQ2024051470000000010039/0000",
                    "sd": "rtsp://test.xuanwutongyun.com/live/ZQ2024051470000000010039/0001"
                }
                "webrtc": {
                    "hd": "http://test.xuanwutongyun.com/live/ZQ2024051470000000010039_00_00",
                    "sd": "rtsp://test.xuanwutongyun.com/live/ZQ2024051470000000010039_00_01"
                }


            },
            "status": 1,
            "title": "tiandy"
        },
        {
            "channel": 1,
            "live": {
                "hls": {
                    "hd": "http://test.xuanwutongyun.com/hls/live.m3u8?sn=ZQ2024051470000000010039&ch=1&stream=00",
                    "sd": "http://test.xuanwutongyun.com/hls/live.m3u8?sn=ZQ2024051470000000010039&ch=1&stream=01"
                },
                "rtsp": {
                    "hd": "rtsp://test.xuanwutongyun.com:5544/ZQ2024051470000000010039/0100",
                    "sd": "rtsp://test.xuanwutongyun.com:5544/ZQ2024051470000000010039/0101"
                }                "httpflv": {
                    "hd": "http://test.xuanwutongyun.com/live/ZQ2024051470000000010039/0100",
                    "sd": "rtsp://test.xuanwutongyun.com/live/ZQ2024051470000000010039/0101"
                }
                "webrtc": {
                    "hd": "http://test.xuanwutongyun.com/live/ZQ2024051470000000010039_01_00",
                    "sd": "rtsp://test.xuanwutongyun.com/live/ZQ2024051470000000010039_01_01"
                }
            },
            "status": 0,
            "title": "hm"
        }
    ],
    "code": 0,
    "msg": "success"
}
```

::: warning 注意
微信播放建议使用hls协议，其他场景可以选择httpflv和webrtc
:::


### 3.4 截图并上传

<ul>
  <li>
    接口方向<br>
    thrid --> smu
  </li>
  <li>
    接口路径<br>
    [GET] /api/v1/snapshot
  </li>
  <li>
    接口参数:  
  </li>  
</ul>

| 参数名称 | 参数类型 | 是否必须 |                说明                 |
| :------: | :------: | :------: | :---------------------------------: |
|    sn    |  String  |    是    |             设备序列号              |
|    ch    |   Int    |    是    |             视频通道号              |
| callback |  String  |    是    | 截图结果回调地址，使用urlencode编码 |

<ul>
  <li>
    请求示例:
  </li>
</ul>

``` js
https://{{smu}}/api/v1/snapshot?sn=ZQ2024051470000000010039&ch=0&callback=https%3A%2F%2Fimage.111.cn%2Fnvr%2Fsnapshot%3Fsn%3DID06021
```

<ul>
  <li>
    响应说明：
  </li>
</ul>

| 参数名称 | 数据类型 | 是否必须 |     说明     |
| :------: | :------: | :------: | :----------: |
|   code   |   Int    |    是    |  设备响应码  |
|   msg    |  String  |    是    | 返回响应信息 |

<ul>
  <li>
    响应示例：
  </li>
</ul>

``` json
{
  "code": 0,
    "msg": "success"
}
```
<ul>
  <li>
    上传方式：<br>
    参见： curl --location --request POST www.baidu.com --form image=@\"/mnt/a.jpeg\"'
  </li>
</ul>

### 3.5 截取录像并上传

<ul>
  <li>
    接口方向<br>
    thrid --> smu
  </li>
  <li>
    接口路径<br>
    [GET] /api/v1/cacheVideo
  </li>
  <li>
    接口参数:  
  </li>  
</ul>

| 参数名称  | 参数类型 | 是否必须 |                说明                 |
| :-------: | :------: | :------: | :---------------------------------: |
|    sn     |  String  |    是    |             设备序列号              |
|    ch     |   Int    |    是    |             视频通道号              |
| startTime |  String  |    是    |  截取录像起始时间(YYYYMMDDThhmmss)  |
|  endTime  |  String  |    是    |  截取录像结束时间(YYYYMMDDThhmmss)  |
| callback  |  String  |    是    | 截图结果回调地址，使用urlencode编码 |

<ul>
  <li>
    请求示例:
  </li>
</ul>

``` js
http://{{smu}}/api/v1/cacheVideo?sn=ZQ2024051470000000010039&ch=0&startTime=20230531T101020&endTime=20230531T101250&callback=https%3A%2F%2Fimage21.xxx.cn%2Fvideo%3Fid%3D50ef80f2-126f-464b-b7b0-0546a
```

<ul>
  <li>
    响应说明：
  </li>
</ul>

| 参数名称 | 数据类型 | 是否必须 |     说明     |
| :------: | :------: | :------: | :----------: |
|   code   |   Int    |    是    |  设备响应码  |
|   msg    |  String  |    是    | 返回响应信息 |

<ul>
  <li>
    响应示例：
  </li>
</ul>

``` json
{
  "code": 0,
    "msg": "success"
}
```
<ul>
  <li>
    上传方式：<br>
    参见： curl --location --request POST www.baidu.com --form 'video=@\"/mnt/a.mp4\"'
  </li>
</ul>

### 3.6 录像查询

<ul>
  <li>
    接口方向<br>
    thrid --> smu
  </li>
  <li>
    接口路径<br>
    [GET] /api/v1/recordList
  </li>
  <li>
    接口参数:  
  </li>  
</ul>

| 参数名称  | 参数类型 | 是否必须 |               说明                |
| :-------: | :------: | :------: | :-------------------------------: |
|    sn     |  String  |    是    |            设备序列号             |
|    ch     |   Int    |    是    |            视频通道号             |
| startTime |  String  |    是    | 截取录像起始时间(YYYYMMDDThhmmss) |
|  endTime  |  String  |    是    | 截取录像结束时间(YYYYMMDDThhmmss) |
|   page    |   Int    |    是    |              查询页               |
|   limit   |   Int    |    是    |         查询单页限制大小          |

<ul>
  <li>
    请求示例:
  </li>
</ul>

``` js
https://{{smu}}/api/v1/recordList?sn=ZQ2024051470000000010039&ch=1&startTime=20230615T070000&endTime=20230615T220000&page=0&limit=5
```

<ul>
  <li>
    响应说明：
  </li>
</ul>

| 参数名称 | 数据类型 | 是否必须 |         说明         |
| :------: | :------: | :------: | :------------------: |
|   code   |   Int    |    是    |      设备响应码      |
|   msg    |  String  |    是    |     返回响应信息     |
|   data   |  Object  |    否    |     录像片段信息     |
|  total   |   Int    |    是    | 该时间段有效录像数量 |

data响应参数如下：

| 参数名称  | 数据类型 | 是否必须 |             说明              |
| :-------: | :------: | :------: | :---------------------------: |
| fileName  |  String  |    否    |          录像文件名           |
|   size    |   Int    |    否    |         录像文件大小          |
| startTime |  String  |    是    | 录像起始时间(YYYYMMDDThhmmss) |
|  endTime  |  String  |    是    | 录像起始时间(YYYYMMDDThhmmss) |

<ul>
  <li>
    响应示例：
  </li>
</ul>

``` json
{
  "total": 498,
    "data": [
  {
    "fileName": "H00002A2003113A70000C00.sdv",
            "size": 7282501,
            "startTime": "20230615T065948",
            "endTime": "20230615T070015"
        },
        {
  "fileName": "H00002A200320EDB0000C00.sdv",
            "size": 26234603,
            "startTime": "20230615T070015",
            "endTime": "20230615T070151"
        },
        {
  "fileName": "H00002A2003340AD0000C00.sdv",
            "size": 12692412,
            "startTime": "20230615T070151",
            "endTime": "20230615T070239"
        }
    ],
    "code": 0,
    "msg": "success"
}
```

## 4 AI报警推送
&emsp; &emsp; 平台收到来自前端设备的AI报警后，需先通过接收平台接口查询获取该设备的接收地址（主要为了解决当报警信息多了，对方平台需要将不同设备报警信息存储到不同路径下的需求）

### 4.1 获取AI报警上传地址

<ul>
  <li>
    接口方向<br>
    smu-->third
  </li>
  <li>
    接口路径<br>
    [GET] 第三方提供
  </li>
  <li>
    接口参数:  
  </li>  
</ul>

| 参数名称 | 参数类型 | 是否必须 |     说明      |
| :------: | :------: | :------: | :-----------: |
|  hwcode  |  String  |    是    | 设备序列号 sn |

<ul>
  <li>
    请求示例:
  </li>
</ul>

``` js
http://{{third}}?hwcode=ZQ2024051470000000010039
```

<ul>
  <li>
    响应说明：
  </li>
</ul>

| 参数名称 | 数据类型 | 是否必须 |     说明     |
| :------: | :------: | :------: | :----------: |
|   code   |   Int    |    是    |  设备响应码  |
|   msg    |  String  |    是    | 返回响应信息 |
|   data   |  Object  |    否    | 录像片段信息 |

data响应参数如下：

| 参数名称 | 数据类型 | 是否必须 |         说明         |
| :------: | :------: | :------: | :------------------: |
| baseUrl  |  String  |    否    | 报警事件上包基础地址 |

<ul>
  <li>
    响应示例：
  </li>
</ul>

``` json
{
  "code": 0,
    "msg": "success",
    "data":{
    "baseUrl":"www.baidu.com"
    }
}
```
### 4.2 AI报警数据上传

<ul>
  <li>
    接口方向<br>
    smu-->third
  </li>
  <li>
    接口路径<br>
    [POST] baseUrl?hwcode=sn<br>
    baseUrl为三方接收数据地址，hwcode是硬件代码（设备sn）
  </li>
  <li>
    接口参数:  
  </li>  
</ul>

| 参数名称 | 参数类型 | 是否必须 |     说明     |
| :------: | :------: | :------: | :----------: |
|    sn    |  String  |    是    |  设备序列号  |
|    ch    |  String  |    是    |    通道号    |
|  result  |  Object  |    是    | 报警消息内容 |

result 示例：

|  参数名称  | 数据类型 | 是否必须 |             说明             |
| :--------: | :------: | :------: | :--------------------------: |
| alarmType  |  String  |    是    |           报警类型           |
|  alarmId   |  String  |    否    |      报警id，具有唯一性      |
| alarmTime  |  String  |    是    |           报警时间           |
|    topX    |   Int    |    否    |   报警目标定位的左上角顶点   |
|    topY    |   Int    |    否    |   报警目标定位的右上角顶点   |
|  bottomX   |   Int    |    否    |   报警目标定位的左下角顶点   |
|  bottomY   |   Int    |    否    |   报警目标定位的右下角顶点   |
|  bigImage  |  String  |    是    | 报警图片背景大图，base64编码 |
| smallImage |  String  |    否    | 报警图片背景小图，base64编码 |

<ul>
  <li>
    请求消息体示例:
  </li>
</ul>

``` js
{
    "sn":string,
    "ch":int,
    "result":{
        "alarmType":string,     //phone,smoking,withoutHat,noFacemask,mouse,noChef
        "alarmId":string,       //only number
        "alarmTime":string,     //20220930T111400
        "topX":int,
        "topY":int,
        "bottomX":int,
        "bottomY":int,
        "bigImage":string,      //jpeg data, base64 encode 
        "smallImage":string     //jpeg data, base64 encode
    }
}
```

<ul>
  <li>
    响应说明：
  </li>
</ul>

| 参数名称 | 数据类型 | 是否必须 |     说明     |
| :------: | :------: | :------: | :----------: |
|   code   |   Int    |    是    |  设备响应码  |
|   msg    |  String  |    是    | 返回响应信息 |

<ul>
  <li>
    响应示例：
  </li>
</ul>

``` json
{
    "code": 0,
    "msg": "success"
}
```
