// ==UserScript==
// @name         在线学习 2.0！
// @namespace    http://tampermonkey.net/
// @version      2.6.3
// @description  哔哔哔
// @author       是谁呢
// @icon         https://www.google.com/s2/favicons?domain=jsnu.edu.cn
// @match        *://cgjx.jsnu.edu.cn/learnspace/learn/learn/blue/*
// @updateURL       https://hsnico.github.io/files/studyol.meta.js
// @downloadURL  https://hsnico.github.io/files/studyol.user.js
// @grant        none
// ==/UserScript==

(function () {
  let menu = 0;
  // 获取上次进度
  if (window.location.href.indexOf('courseware_index.action') != -1) {
    //
    let timer = setInterval(() => {
      let isChange = window.localStorage.getItem('isChange');
      let schedule = parseInt(window.localStorage.getItem('schedule'));
      if (schedule == NaN) {
        schedule = 0;
      }
      // 是否更换课程
      if (isChange != 'true' && isChange != null) {
        // 获取标题
        if (window.localStorage.getItem('theLast') == '') {
          let chapter_title = $($('[id^=childItem]')[schedule]).parent().parent().prev()[0].innerText;
          let theLast = chapter_title + '\n\t- ' + $('[id^=childItem] a')[schedule].innerText;
          window.localStorage.setItem('theLast', theLast);
        }
      } else {
        window.localStorage.setItem('theLast', '不知道捏~');
        schedule = 0;
      }

      jump(schedule);
      run(schedule);
      clearInterval(timer);
    }, 10000);

    console.clear();
    console.log('%c哔哔哔，小火车发车咯 ~ ~ ~', 'color:#42A0FB;font-weight:bold');
    console.log('%c上次看到：\n%s', 'color:#F9CA44;font-weight:bold', window.localStorage.getItem('theLast'));
  } else {
    try {
      // 记录课程名
      let className = window.localStorage.getItem('className');
      if (className != $('.courseTit h1')[0].innerText) {
        window.localStorage.setItem('isChange', 'true');
      }
      window.localStorage.setItem('className', $('.courseTit h1')[0].innerText);
    } catch (error) {
      return;
    }
    // 30 分钟自动确定
    setInterval(() => {
      if ($('.layui-layer-btn0').length) {
        $('.layui-layer-btn0')[0].click();
      }
    }, 5000);
  }

  function jump(schedule) {
    if (schedule < $('[id^=childItem] a').length) {
      $('[id^=childItem] a')[schedule].click();
      menu = 0;
    }
  }

  function run(schedule) {
    let timer = setInterval(() => {
      // 校正 schedule
      for (let i = 0; i < $('[id^=childItem]').length; i++) {
        if (!$('[id^=childItem]')[i].className.indexOf('select')) {
          schedule = i;
          break;
        }
      }
      // 校正 menu
      for (let i = 0; i < $('.menuct>.menub').length; i++) {
        if ($('.menuct>.menub')[i].className.indexOf('menubu') != -1) {
          menu = i;
          break;
        }
      }
      // 如果本节课已完成则跳转到下一节课
      if ($('[id^=childItem] span')[schedule].className == 'done') {
        jump(schedule);
      }
      // 获取视频对象
      let vid = window.frames.mainFrame.document.querySelector('video');
      // 如果当前页面为视频
      if (vid) {
        // 如果视频播放完毕
        if (vid.ended) {
          // 下一节课
          $('#rtarr')[0].click();
        } else {
          // 绕过 Chrome 视频播放限制
          vid.muted = true;
          // 播放视频
          vid.play();
          // 开启二倍数
          vid.playbackRate = 2;
          vid.muted = false;
        }
      } else {
        // 菜单轮询
        $('.menuct>.menub').length <= ++menu ? jump(++schedule) : $('#rtarr')[0].click();
        if (schedule >= $('[id^=childItem]').length) {
          clearInterval(timer);
          console.clear();
          console.log('%c哔哔哔，小火车到站咯 ~ ~ ~ 请乘客们有序下车', 'color:#42A0FB;font-weight:bold');
          return;
        }
      }
      // 保存记录
      let chapter_title = $($('[id^=childItem]')[schedule]).parent().parent().prev()[0].innerText;
      let theLast = chapter_title + '\n\t- ' + $('[id^=childItem] a')[schedule].innerText;
      window.localStorage.setItem('schedule', schedule);
      window.localStorage.setItem('theLast', theLast);

      console.clear();
      console.log('%c当前进度 %s\n\t%c- %s', 'color:#F9CA44;font-weight:bold', chapter_title, 'color:#F9CA44', $('[id^=childItem] a')[schedule].innerText);
    }, 15000);
  }
})();
