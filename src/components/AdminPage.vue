管理员页
增加用户（以及教师身份），删除用户，添加班级，班级批量导入学生、删除学生，班级设置教师助教，发布通知
教师身份可以创建课程和班级，课程是班级的容器，仅此而已
课程：{name: "", classIDs: [1, 2, 3]}
班级：{ID: 1, studentIDs: [], ...}

<template>
  <div class="page">
    <div class="head"></div>
    <div class="gridCommon" style="background-color: white">
      <!-- <el-row>
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
</el-row> -->
      <el-row gutter:="20">
        <el-col span:="4">
          <el-button type="text" @click="clickButton(1)">添加课程</el-button>
        </el-col>
        <el-col span:="4">
          <el-button type="text" @click="clickButton(2)">删除课程</el-button>
        </el-col>
        <el-col span:="4">
          <el-button type="text" @click="clickButton(3)">学生管理</el-button>
        </el-col>
        <el-col span:="4">
          <el-button type="text" @click="clickButton(4)">设置教师角色</el-button>
        </el-col>
        <el-col span:="4">
          <el-button type="text" @click="clickButton(5)">设置助教角色</el-button>
        </el-col>
        <el-col span:="4">
          <el-button type="text" @click="clickButton(6)">发布通知</el-button>
        </el-col>
        <!-- <el-col span:="4">
          <el-button type="text" @click="clickButton(7)">用户管理</el-button>
        </el-col> -->
      </el-row>      
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
      addCourse: "/AdminAddCourse",
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

    clickButton(num) {
      switch (num) {
        case 1: this.$router.push("/AdminAddCourse"); break;
        case 2: this.$router.push("/AdminDeleteCourse"); break;
        case 3: this.$router.push("/TeacherAddClass"); break;
        case 4: this.$router.push("/AdminSetTeacherRole"); break;
        case 5: this.$router.push("/AdminSetTARole"); break;
        case 6: this.$router.push("/AdminReleaseNotice"); break;
        case 7: this.$router.push("/AdminUserManagementPage"); break;
      }
    }

  }
}
</script>

<style scoped>



</style>