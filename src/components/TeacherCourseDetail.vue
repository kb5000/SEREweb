教师班级详情页
管理课程，管理学生，上传课件，添加作业，添加小测（可另开一页）
添加作业可以选择是个人还是分组，是否支持互评

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
  name: 'TeacherCourseDetail',
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