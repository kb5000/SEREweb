导航栏页

<template>
  <div class="mainNav">
    <a class="navButton" :href="index">ZJUTA</a>
    <a class="navButtonSmall" :href="courseList">班级</a>
    <a class="navButtonSmall" :href="forum">社区</a>
    <a class="navButtonSmall" :href="login">登录</a>
    <a class="navButtonSmall positionRight" :href="user">个人中心</a>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  data() {
    return {
      index: "/",
      courseList: "/StudentCourseList",
      forum: "/ForumList",
      user: "/UserInfo",
      register:"/UserRegister",
      login:"/UserLogin"
    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style scoped>
.mainNav {
  background-color: #3A445C;
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

</style>