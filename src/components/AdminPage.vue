管理员页
增加用户（以及教师身份），删除用户，添加班级，班级批量导入学生、删除学生，班级设置教师助教，发布通知
教师身份可以创建课程和班级，课程是班级的容器，仅此而已
课程：{name: "", classIDs: [1, 2, 3]}
班级：{ID: 1, studentIDs: [], ...}

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
  name: 'AdminPage',
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