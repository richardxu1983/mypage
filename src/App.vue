<template>
  <div id="app">
    <LeftLayout/>
    <router-view  class="main-container"/>
  </div>
</template>

<script>

import LeftLayout from './components/LeftLayout.vue'

export default {
  name: 'App',
  components: 
  {
      LeftLayout
  },
  mounted:function() 
  {
    /*
    if (this._isMobile()) {
      //alert("手机端");
      this.$router.replace('/m_index');
    } else {
      //alert("pc端");
      this.$router.replace('/pc_index');
    }*/
  },
  created:function()
  {
  },
  methods:
  {
    _isMobile:function() 
    {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
    }
  }
}
</script>

<style type="text/css">

  body{
    margin: 0;
    padding: 0;
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
    background: #f6f6f6;
  }

  .main-container {
    position: relative;
    width:1000px;
    margin:0 auto;
    padding: 25px 45px 45px 45px;
    background-color: white;
  }

  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }

</style>