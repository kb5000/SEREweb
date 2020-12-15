论坛板块页
创建班级时会自动创建一个板块，班级和板块的成员共享
其它情况没有板块，手动设置是二期工程

<template>
  <div class="page">
    <el-row :gutter="10">
      <el-col :span="16">
        <div class="bigFont gridCommon">
          加入的板块
          <div v-for="i in forums" :key="i.id" class="marginCommon normalFont gridCommon handCursor">
            <el-row>
              <el-col :span="14">{{i.name}}</el-col>
              <el-col :span="4" class="unimportantFontColor">主题数：{{i.posts}}</el-col>
              <el-col :span="6" class="unimportantFontColor">最后回复日期：{{i.date}}</el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="bigFont gridCommon titleGrid">
          回复你的消息
          <div v-for="i in replies" :key="i.id" class="marginCommon normalFont gridCommon">
            <a class="stressFontColor" :href="i.userLink" style="text-decoration: none">{{i.user}}</a> 在帖子
            <a class="stressFontColor" :href="i.postLink" style="text-decoration: none">{{i.post}}</a> 回复你：
            <p>{{i.content}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'ForumList',
  data() {
    return {
      forums: [],
      replies: [],
    }
  },

  mounted() {
    this.forums = [
      {id: 1, name: "软工需1班", posts: 10000, date: "2020/12/11"},
      {id: 2, name: "软工需2班", posts: 10, date: "2020/12/11"},
    ];
    this.replies = [
      {id: 1, user: "MgSO4", post: "Main函数为什么不能调用", content: "栈指针乱飞，把内存都搞乱了吧", userLink: "/", postLink: "/"},
      {id: 2, user: "Ksssss", post: "Main函数为什么不能调用", content: "可能是第9行错了", userLink: "/", postLink: "/"},
    ];
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