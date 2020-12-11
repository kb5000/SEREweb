论坛帖子内容页
帖子详情，显示标题、各楼层
楼层：用户头像（固定），用户名字，内容，时间，回复/删除按钮
楼层下面有回帖框

<template>
  <div class="page">
    <div class="gridCommon bigFont">{{title}}</div>
    <el-row class="gridCommon marginCommon normalFont" v-for="i in replies" :key="i.id"
      style="padding: 0px"
    >
      <el-col span="2" class="paddingCommon" style="border-right: 1px solid #D3D3D3">
        {{i.user}}
      </el-col>
      <el-col span="22" class="paddingCommon">
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ForumDetail',
  data() {
    return {
      title: "",
      replies: [],
    }
  },

  mounted() {
    this.title = "Main函数为什么不能调用";
    this.replies = [
      {id: 1, user: "ABC", content: "重装VS试试", userLink: "/", date: "2020/12/12 12:33"},
      {id: 2, user: "ABC", content: "重装VS试试", userLink: "/", date: "2020/12/12 12:33"},
      {id: 3, user: "ABC", content: "重装VS试试", userLink: "/", date: "2020/12/12 12:33"},
    ]
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

</style>