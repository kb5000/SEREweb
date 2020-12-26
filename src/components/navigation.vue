导航栏页

<template>
  <div class="mainNav" style="position: relative">
    <a class="navButton" :href="index">ZJUTA</a>
    <a class="navButtonSmall" :href="courseList">班级</a>
    <a class="navButtonSmall" :href="forum">社区</a>
    <a
      class="navButtonSmall"
      style="position: absolute; right: 240px; top: 15px"
      href="/TeacherCourseList"
      >教师版</a
    >
    <a
      class="navButtonSmall"
      style="position: absolute; right: 300px; top: 15px"
      href="/AdminPage"
      >管理员</a
    >
    <a
      class="navButtonSmall positionRight"
      :href="login"
      v-if="logged === false"
      >登录</a
    >
    <a class="positionRight" v-else>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          个人中心<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link :to="user" class="bigFont" style="text-decoration: none">
            <el-dropdown-item style="text-decoration: none">用户信息</el-dropdown-item>
          </router-link>
          <el-dropdown-item command="f">文件管理</el-dropdown-item>
          <el-dropdown-item command="e">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </a>
    <el-dialog title="资源管理" :visible.sync="dialogVisibleFile">
      <el-row class="gridCommon">
        <span class="normalFont">为 {{ courseName }} 添加文件</span>
        <el-row>
          <el-table :data="files" height="200" border style="width: 100%">
            <el-table-column prop="" label="选择" width="50" type="selection">
            </el-table-column>
            <el-table-column prop="name" label="文件名" width="180">
            </el-table-column>
            <el-table-column prop="size" label="大小"> </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <el-upload action="/data">
            <el-button type="text" icon="el-icon-plus">上传本地文件</el-button>
          </el-upload>
        </el-row>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleFile = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleFile = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import cookies from "js-cookie";
import axios from "axios";

export default {
  name: "navigation",
  stores: {
    logged: "state.logged",
    loggedUser: 'state.currentUser',
  },
  data() {
    return {
      index: "/",
      courseList: "/StudentCourseList",
      forum: "/ForumList",
      user: "/UserInfo",
      register: "/UserRegister",
      login: "/UserLogin",
      files: [],
      dialogVisibleFile: false,
    };
  },

  mounted() {
    // console.log(this.logged)
    let user = cookies.get("user");
    this.loggedUser = user;
    if (typeof user !== "undefined") {
      this.logged = true;
      axios.post("/api", "method=get&key=user." + user).then((res) => {
        this.loggedUser = res.data;
        // console.log(this.loggedUser)
      });
    } else {
      this.logged = false;
    }

    this.files = [
      { id: 0, name: "ch1.pdf", size: "1MB", checked: false },
      { id: 1, name: "ch2.pdf", size: "2KB", checked: false },
      { id: 2, name: "ch3.pdf", size: "1MB", checked: false },
      { id: 3, name: "ch4.pdf", size: "2KB", checked: false },
    ];
  },

  methods: {
    handleCommand(command) {
      if(command == "f")
        this.dialogVisibleFile = true;
      else if(command == "e")
        this.exitLogin();
    },

    exitLogin() {
      this.loggedUser = null;
      this.logged = false;
      cookies.remove('user');
      this.$router.push('/UserLogin');
    },
  },
};
</script>

<style scoped>
.mainNav {
  background-color: #3a445c;
  height: 50px;
  padding: 0 160px;
  font-size: 16px;
  font-family: 微软雅黑;
  color: white;
  /* width: 100%; */
  /* border: 1px solid black; */
}

.navButton {
  font-size: 20px;
  color: white;
  text-decoration: none;
  position: relative;
  top: 11px;
  margin: 0 10px;
}

.navButton :visited {
  color: white;
  text-decoration: none;
}

.navButtonSmall {
  font-size: 16px;
  color: white;
  text-decoration: none;
  position: relative;
  top: 10px;
  margin: 0 10px;
}

.navButtonSmall :visited {
  color: white;
  text-decoration: none;
}

.positionRight {
  position: absolute;
  right: 160px;
  top: 14px;
}

.el-dropdown-link {
  cursor: pointer;
  color: white;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>