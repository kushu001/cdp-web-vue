

<p align="center">
  <a href="https://github.com/kushu001/cdp">
    <img width="100" src="https://user-images.githubusercontent.com/3797320/185794835-8fed3b7d-c401-4b8b-a7d4-ecba007d2d09.png">
  </a>
</p>


<h1 align="center">Chomolungma Development Platform</h1>

<div align="center">
  
  [![Chomolungma Deveopment Platform](https://img.shields.io/badge/Chomolungma%20Development%20Platform-2.0-orange)](https://github.com/kushu001/cdp)
  [![cdp-web-vue](https://img.shields.io/badge/cdp--web--vue-1.0-orange)](https://github.com/kushu001/cdp-web-vue)
  [![SpringBoot](https://img.shields.io/badge/SpringBoot-2.1.17.RELEASE-green)](https://spring.io/)
  [![MySQL](https://img.shields.io/badge/MySQL-8.0.31-green)](https://www.mysql.com/)
  [![Mybatis-Plus](https://img.shields.io/badge/Mybatis--Plus-3.5.2-green)](https://baomidou.com/pages/24112f/)
  [![OpenJDK](https://img.shields.io/badge/OpenJDK-1.8.0__312-green)](https://www.azul.com/downloads/)
  [![PageHelper](https://img.shields.io/badge/PageHelper-1.4.6-green)](https://pagehelper.github.io/)
  [![EasyExcel](https://img.shields.io/badge/EasyExcel-3.1.3-green)](https://easyexcel.opensource.alibaba.com/)
  [![jwt](https://img.shields.io/badge/jwt-4.2.1-green)](https://jwt.io/)
  [![fastjson](https://img.shields.io/badge/fastjson-2.0.20-green)](https://alibaba.github.io/fastjson2/)
  [![mapstruct](https://img.shields.io/badge/mapstruct-1.5.3.Final-green)](https://mapstruct.org/)
  [![lombok](https://img.shields.io/badge/lombok-1.18.24-green)](https://projectlombok.org/)
  [![vue-element-admin](https://img.shields.io/badge/vue--element--admin-4.4.0-green)](https://github.com/PanJiaChen/vue-element-admin)
  [![Apache License 2.0](https://img.shields.io/badge/License-Apache2.0-brightgreen)](https://github.com/kushu001/cdp/blob/main/LICENSE)
  [![kushu001](https://img.shields.io/badge/author-kushu001-orange)](https://github.com/kushu001)
  
</div>

## 介绍
CDP是Chomolungma Development Platform（珠峰开发平台）的缩写

本项目开发平台是以DDD为指导思想，努力以DDD驱动框架的设计开发，争取使业务代码和技术代码做到高内聚，低耦合

以Springboot开发框架为地基，集成Spring Security, Mybatis, Mybatis-plus等开源项目为钢材，自己的基础开发代码为砖瓦，用于学习整个开发流程，提高自己整合相关技术的能力和DDD的实践能力

大家可以拿个这项目练手，学习基本的框架和领域开发知识

争取做一个可以用来开发简单私活的框架，方便大家使用

## 软件架构
1. 前端： 目前是使用vue-element-admin为基础，加上自己研发的部分组件，开发的一套前端框架 cdp-web-vue
2. 后端： 

   以SpringBoot为基础，利用mybatis持久框架进行后端服务的实现，开发的一套后端框架 cdp
   
   目前已经完成初版后端代码的领域驱动设计的改造，将业务代码和技术代码进行分离，使之更好的适应将来技术的变更，而不影响业务代码的改变
   
   成果：
   
   <img width="279" alt="image" src="https://user-images.githubusercontent.com/3797320/191653532-a6cdcda0-b23a-46c8-9cd1-d42df52848a7.png">
   <img width="221" alt="image" src="https://user-images.githubusercontent.com/3797320/191653665-46686166-0e64-4909-b1b8-fbdf5985de34.png">

## 安装教程
目前已经在语雀中编码教程 [《CDP开发教程》](https://www.yuque.com/books/share/ce75a160-0070-440d-b754-349ab087bb50?#) 我会不定期更新教程

### 安装环境

jdk版本：java 8

mysql: mysql 8以上

maven: 3.8.5

vue: 2以上


前端
  ```
    npm install
    npm run dev
  ```
后端：
1. 装个Mysql数据库，将cdp项目中resources目录下的sql文件导入到数据库中
  <img width="385" alt="image" src="https://user-images.githubusercontent.com/3797320/187810047-ef8a5c7c-db71-403d-90fe-cb5c8a3c40d9.png">

2. application.properties中配置一下相关的路径即可
3. 启动ChomolungmaApplication.java

## 界面截图

<img width="1460" alt="image" src="https://user-images.githubusercontent.com/3797320/201058664-75dc738f-c3ab-4033-a989-07c7c919a000.png">
<img width="1464" alt="image" src="https://user-images.githubusercontent.com/3797320/201058740-bb76030a-d81f-4e83-9f5d-6c116b7f1a38.png">
<img width="1507" alt="image" src="https://user-images.githubusercontent.com/3797320/185793597-fb79f67c-84b0-4df3-aa03-e53053522982.png">
<img width="1509" alt="image" src="https://user-images.githubusercontent.com/3797320/185793610-68853393-5d56-4546-b14b-b51467875399.png">
<img width="1462" alt="image" src="https://user-images.githubusercontent.com/3797320/195744141-73aad171-3172-48a8-85f7-a50c0b97c3c4.png">
<img width="1463" alt="image" src="https://user-images.githubusercontent.com/3797320/195744286-39242b81-9d70-488c-bf0a-428c7ab675e7.png">
<img width="1511" alt="image" src="https://user-images.githubusercontent.com/3797320/185793625-219d8143-bf21-4c3e-9532-3f4c935ebf59.png">
<img width="1508" alt="image" src="https://user-images.githubusercontent.com/3797320/185793637-d6011d8f-fcd7-4417-99bf-89a576007422.png">
<img width="1507" alt="image" src="https://user-images.githubusercontent.com/3797320/185793649-0767d03d-8f78-4996-806a-f33586d71b95.png">
<img width="1509" alt="image" src="https://user-images.githubusercontent.com/3797320/185793657-23c1ec61-bd59-4088-84f3-57732db6e7c8.png">
<img width="1509" alt="image" src="https://user-images.githubusercontent.com/3797320/185793666-33241540-9986-42a7-9982-f0e652029a21.png">
<img width="1508" alt="image" src="https://user-images.githubusercontent.com/3797320/185793682-71c46204-cc20-4a57-ad01-8af88e7d97af.png">
<img width="1054" alt="image" src="https://user-images.githubusercontent.com/3797320/196834748-4ebd38dd-2226-4511-add5-882b392b44a3.png">
<img width="1026" alt="image" src="https://user-images.githubusercontent.com/3797320/196834773-e1ae76a5-28c6-48e8-b310-925a7d820720.png">


本项目已经全部开源，如果您觉得帮到了你，请给 本项目 一个Star

前端：

github: https://github.com/kushu001/cdp-web-vue

gitee: https://gitee.com/kushu001/cdp-web-vue

后端：

github: https://github.com/kushu001/cdp

gitee: https://gitee.com/kushu001/cdp

如果发现Bug，请到GITHUB提交Issue。
友情提示：提问前Star是很礼貌和友善的行为，被问者也会更开心回答您的问题。
## 加我好友（麻烦备注: cdp）进群交流（微信群二维码只有7天有效期）
<img src="https://user-images.githubusercontent.com/3797320/188090198-ba38ae69-eacf-4824-b158-4d0ad23bb97b.png" width = "200" height = "230" alt="" align="center" />
