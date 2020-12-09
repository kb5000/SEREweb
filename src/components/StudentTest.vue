学生进行小测页
显示各题目，题目通过后端获取
三种题目：选择，填空，简答

<template>
  <div class="page">
    <div class="head">

    </div>
    <div class="content">
    </div>
    <div class="tail">

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StudentTest',
  data() {
    return {
    }
  },

  mounted() {
  },

  methods: {
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
              var pair = vars[i].split("=");
              if(pair[0] == variable){return pair[1];}
      }
      return false;
    },

    onPostButtonClick() {
      axios({
        method: 'get',
        url: '/api?method=add'
      });
    },

  }
}
</script>

<style scoped>
.page {
  position: relative;
  width: 80%;
  left: 10%;
  background-color: white;
}


</style>