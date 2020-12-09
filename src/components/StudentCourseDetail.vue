学生班级详情，
显示标题，课程简介，课程大纲（分节），每节下面有课件、作业、小测
可以用选项卡<!-- <el-tabs> -->控件

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
  name: 'StudentCourseDetail',
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