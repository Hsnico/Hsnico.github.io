---
layout:     post
title:      "Waifu2x"
subtitle:   "Waifu2x版本对比"
date:       2020-01-27
author:     "Hsnico"
header-img: "img/post-bg-2020.jpg"
tags:
    - Photo
    - Tools
---

# Waifu2x
Waifu2x 是使用深度卷积神经网路的图片超分辨率算法系统(大概没说错)

好像是机器学习的产物,我从16年左右就开始用了，对于插图的拉伸放大有奇效

~~也可以算是人工智能了吧，这东西非常的吃算力~~

[Waifu2x-Caffe][WFC] 是由 lltcggie 制作的第三方版本，基于 Caffe 平台，也是目前流传最广的第三方版本

因为是 Caffe 平台，所以是 NVIDIA 独享的（A卡没有 CUDA ），当然不用显卡加速也可以，只不过速度感人。

为什么要写这个呢，因为几天前在酷安看到有人在发 [Waifu2x-Extension-GUI][WFE] ，对比 Caffe 的优势就是基于 Vulkan ，所以理论上几乎能做到全平台通吃，并且支持 GIF 和视频。

我对视频没什么兴趣，因为 Caffe 版也能做到，只不过稍微麻烦了一点，需要手动导出帧序列。

~~看了一下，貌似视频是用 [Anime4k][A4] 实现的，并不是机器学习，那就没意思了。~~

Anime4k 的优点就是速度快，能做到实时，搭配 MPV 看视频还是很棒的

![Anime4K](https://raw.githubusercontent.com/bloc97/Anime4K/master/results/Comparisons/1_time.png)

不过 Anime4K 的涂抹感还是挺严重的，容易把字幕也给弄糊。

### 对比
直接上 Caffe 和 Extension 的对比

测试环境：
+ CPU i7-8750H
+ 显卡 GTX 1060

#### Caffe 版设置：
+ 降噪3倍
+ 放大3倍
+ cunet模型
+ 拆分256
####Extension 版设置：
+ 降噪3倍
+ 放大3倍
+ 默认模型
+ 拆分256

#### 原图
![](/img/posts/20200127/DXqemzIW0AANHGK.jpg)

#### 处理后局部放大

![](/img/posts/20200127/140305.jpg)

Photoshop 自带的算法耗时最短，但是效果也最差

Waifu2X-Caffe 处理后头发保留了更多的细节，开启 TTA 模式后耗时大幅增加但是几乎和不开启没有区别

    TTA（Test-Time Augmentation）模式 转换时间较未选中时增加八倍，提高0.15的峰值信噪比（PSNR），效果可能不明显


Waifu2x-Extension-GUI 处理后，头发的细节有部分被涂抹了，耗时略长于 Waifu2X-Caffe ，可以算在误差以内

### 总结
如果你是 NVIDIA 用户，并且对画质有一定追求的话，强烈建议使用 Waifu2x-Caffe ，虽然项目已经很久没有更新了，但是软件本身已经相当完善了。

如果你不是 NVIDIA 用户 Waifu2x-Extension-GUI 也是个不错的选择，项目本身也在更新，并且处理速度也还可以。希望某一天能追上并赶超 Waifu2x-Caffe 吧，我还是很看好的。

  [WFC]: https://github.com/lltcggie/waifu2x-caffe
  [WFE]: https://github.com/AaronFeng753/Waifu2x-Extension-GUI
  [A4]: https://github.com/bloc97/Anime4K