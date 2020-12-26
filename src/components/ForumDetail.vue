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
        <p class="marginCommon normalFont" style="white-space: pre-wrap;">{{i.content}}</p>
        <div class="smallFont unimportantFontColor" style="height: 20px;">
          <p class="stressFontColor handCursor" 
            style="position: absolute; right: 183px; bottom: -3px; text-decoration: underline;"
            v-if="user === i.uid || user == postUser"
          >删除</p>
          <p class="stressFontColor handCursor" 
            style="position: absolute; right: 151px; bottom: -3px; text-decoration: underline;"
            @click="onReply(i.user, i.content)"
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
import cookies from 'js-cookie'

export default {
  name: 'ForumDetail',
  data() {
    return {
      user: cookies.get('user'),
      title: "",
      replies: [],
      replyContent: "",
      postUser: 0
    }
  },

  mounted() {
    // this.title = "Main函数为什么不能调用";
    // this.replies = [
    //   {id: 1, user: "李华", content: "重装VS重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试重装VS试", userLink: "/", date: "2020/12/12 12:33"},
    //   {id: 2, user: "ABC", content: "重装VS试试", userLink: "/", date: "2020/12/12 12:33"},
    //   {id: 3, user: "ABC", content: "重装VS试试", userLink: "/", date: "2020/12/12 12:33"},
    // ]

    axios.post('/api', 'method=get&key=class.' + this.getQueryVariable('class') + '.post.' + this.getQueryVariable('post')).then(res => {
      this.title = res.data.title;
      this.postUser = res.data.user;
      axios.post('/api', 'method=get&key=user').then(user => {
        for (let i of res.data.reply) {
          this.replies.push({
            id: i.id,
            user: user.data[i.user].name,
            uid: i.user,
            content: i.content,
            userLink: '/UserInfo?id=' + i.user,
            date: new Date(i.date).toLocaleString()
          })
        }
      })
    })
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

    onReply(name, content) {
      this.replyContent = 
      "回复" + name + "：" + content.substring(0, 20) + "\n------------------------\n"
    },

    onPostButtonClick() {
      axios.post('/api', 'method=get&key=class.' + this.getQueryVariable('class') + '.post.' + this.getQueryVariable('post')).then(res => {
        let reply = res.data.reply;
        reply.push({
          id: this.$uuid.v4(),
          user: cookies.get('user'),
          content: this.replyContent,
          date: new Date().toJSON()
        })
        axios.post('/api', 'method=setj&key=class.' + this.getQueryVariable('class') + '.post.' + this.getQueryVariable('post') + '.reply&val=' + 
          encodeURIComponent(JSON.stringify(reply))).then(() => {
            this.$message.success("回帖成功")
            setTimeout(() => this.$router.go(0));
          })
      })
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