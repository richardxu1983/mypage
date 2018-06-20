<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted:function() 
  {
    if (this._isMobile()) {
      //alert("手机端");
      this.$router.replace('/m_index');
    } else {
      //alert("pc端");
      this.$router.replace('/pc_index');
    }
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
  
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    padding: 45px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }

</style>