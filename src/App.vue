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

  .main-container {
    position: relative;
    left: 250px;
    right: 0px;
    bottom: 0px;
    top: 0px;
  }

  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    padding: 45px 45px 20px 45px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }

</style>