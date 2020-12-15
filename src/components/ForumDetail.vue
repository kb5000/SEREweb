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
      <el-col span="2" class="paddingCommon">
        <a :href="i.userLink" class="stressFontColor" style="text-decoration: none"><p class="marginCommon handCursor">{{i.user}}</p></a>
      </el-col>
      <el-col span="22" class="paddingCommon" style="border-left: 1px solid #D3D3D3">
        <p class="marginCommon normalFont">{{i.content}}</p>
        <div class="smallFont unimportantFontColor" style="height: 20px;">
          <p class="stressFontColor handCursor" 
            style="position: absolute; right: 143px; bottom: -1px; text-decoration: underline;"
          >删除</p>
          <p class="stressFontColor handCursor" 
            style="position: absolute; right: 110px; bottom: -1px; text-decoration: underline;"
          >回复</p>
          <p style="position: absolute; right: 10px; ">{{i.date}}</p>
        </div>
      </el-col>
    </el-row>
    
    <div class="marginCommon normalFont gridCommon">
      <textarea class="marginCommon postContentTextBox" v-model="replyContent"/>
      <div style="height: 24px; position: relative;">
        <div class="commonButton" style="position: absolute; right: 2px;" v-on:click="onPostButtonClick">发帖</div>
      </div>
    </div>
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
      replyContent: "",
    }
  },

  mounted() {
    this.title = "Main函数为什么不能调用";
    this.replies = [
      {id: 1, user: "李华", content: "重装VS重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试", userLink: "/", date: "2020/12/12 12:33"},
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
.postContentTextBox {
  width: calc(100% - 6px);
  height: 100px;
  border: 1px solid;
  border-radius: 3px;
  border-color: #006b6d;
  padding: 2px;
  font-size: 1.2em;
  resize: vertical;
}
</style>