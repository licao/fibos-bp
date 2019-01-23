## fibos-bp

提供bp的基本工具

## 功能

	1. 启动节点生成更新p2p地址

	2. 自动领取工资，设定领取时间到时间自动领取

## 启动
	
	1.安装fibos 

		curl -s https://fibos.io/download/installer.sh | sh

	2.安装fibos.js

		fibos --install

	3.启动节点

		fibos index.js


## 其他
	
	启动自动领取工资(config 配置领取时间 的小时和分钟 为北京时间)

		fibos claimrewards.js

	手动更新p2p文件

		fibos updatep2p.js

