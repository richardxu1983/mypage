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

  .nosel{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  
  .main-container {
    position: relative;
    width:800px;
    margin:0 auto;
    padding: 25px 45px 45px 45px;
    background-color:white;
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

  .map
  {
    position: absolute;
    width: 60px;
    height: 60px;
    box-sizing: border-box;
  }

  .tilePos
  {
    position: absolute;
    left: 0;
    top:0;
    color: black;
    font-size: xx-small;
  }

  .mapTile
  {
    position: absolute;
    width: 60px;
    height: 60px;

    box-sizing: border-box;

  }
  .border
  {
    position: absolute;
    width: 60px;
    height: 60px;
    box-sizing: border-box;
  }
  .mapTileNo
  {
    position: absolute;
    width: 60px;
    height: 60px;

    box-sizing: border-box;
    visibility: hidden;
  }
  .mapActBtn
  {
    float: right;
    margin:0 .2em 0 .2em;
    height: 2em;
    padding-left: .7em;
    padding-right: .7em;
    background-color:white;
    border:1px solid gray;
  }

  .mapActBtn:hover
  {
    background-color:yellow;
  }

  .mapActBtn:active
  {
    background-color:brown;
  }
  .mapActBtn:disabled
  {
    background-color:#333;
    border:1px solid #333;
    height: 2em;
    color:black;
  }

</style>