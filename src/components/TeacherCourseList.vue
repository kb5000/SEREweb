教师班级列表页
显示所有可管理的班级和所属课程

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
  name: 'TeacherCourseList',
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