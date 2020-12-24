导航栏页

<template>
  <div class="mainNav">
    <a class="navButton" :href="index">ZJUTA</a>
    <a class="navButtonSmall" :href="courseList">班级</a>
    <a class="navButtonSmall" :href="forum">社区</a>
    <a class="navButtonSmall positionRight" :href="login" v-if="logged === false">登录</a>
    <a class="navButtonSmall positionRight" :href="user" v-else>个人中心</a>
  </div>
</template>

<script>
import cookies from 'js-cookie'
import axios from 'axios'

export default {
  name: 'navigation',
  stores: {
    logged: 'state.logged'
  },
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
    // console.log(this.logged)
    let user = cookies.get('user');
    if (typeof(user) !== 'undefined') {
      this.logged = true;
      axios.post('/api', "method=get&key=user." + user).then(res => {
        this.loggedUser = res.data;
        // console.log(this.loggedUser)
      })
    } else {
      this.logged = false;
    }
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