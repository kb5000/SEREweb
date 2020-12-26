论坛帖子浏览页
浏览帖子，发帖，删帖

<template>
  <div class="page">
    <div class="bigFont gridCommon">{{plateName}}</div>
    <div class="marginCommon normalFont gridCommon">
      {{"标题"}}<input class="marginCommon postTitleTextBox" type="text" v-model="postTitle"/>
      {{"内容"}}<textarea class="marginCommon postContentTextBox" v-model="postContent"/>
      <div class="postButtons">
        <div class="commonButton postButton" v-on:click="onPostButtonClick">发帖</div>
      </div>
    </div>
    <div class="marginCommon normalFont gridCommon">
      <div v-for="(item, index) in postList" :key="item.id" class="postEntry marginCommon gridCommon" @click="goPost(index)">
        <el-row style="padding: 10px">
          <el-col span="14" class="handCursor">{{item.title}}</el-col>
          <el-col span="3" class="unimportantFontColor">发帖人：<a style="textDecoration: none" :href="item.userLink">{{item.userName}}</a></el-col>
          <el-col span="5" class="unimportantFontColor">发帖时间：{{item.date}}</el-col>
          <el-col span="2"><div class="commonButton postContentControlButton" @click.stop="1">删除</div></el-col>
        </el-row>
        <!-- <p class="postContentTitle" v-on:click="onTitleClick(item)">{{item.title}}</p>
        <div class="postContentControl">
          <div class="commonButton postContentControlButton">删除</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import cookies from 'js-cookie'

axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded"
}

export default {
  name: 'ForumExplore',
  data() {
    return {
      plateID: 0,
      plateName: "",
      postContent: "",
      postTitle: "",
      postList: []
    }
  },

  mounted() {
    this.plateName = "测试板块"
    this.postList = []
    // for (let i = 0; i < 20; i++) {
    //   this.postList.push({
    //     id: i,
    //     title: "Main函数为什么不能调用",
    //     // subject: "测试测试测试",
    //     userName: "abc",
    //     date: "2020/11/20 20:17"
    //   })
    // }

    axios.post('/api', "method=get&key=course").then(courses => {
      axios.post('/api', 'method=get&key=class.' + this.getQueryVariable('class')).then(res => {
        this.plateName = courses.data[res.data.course].name + ' ' + res.data.name
        if (typeof(res.data.post) === 'undefined') return;
        for (let i of res.data.post) {
          this.postList.push({
            id: i.id,
            title: i.title,
            userName: i.user,
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

    goPost(index) {
      this.$router.push("/ForumDetail?class=" + this.getQueryVariable('class') + '&post=' + index)
    },

    onPostButtonClick() {
      axios.post('/api', 'method=get&key=class.' + this.getQueryVariable('class')).then(res => {
        let o = res.data.post;
        if (typeof(o) === 'undefined') o = []
        o.push({
          id: this.$uuid.v4(),
          title: this.postTitle,
          user: cookies.get('user'),
          date: new Date().toJSON(),
          reply: [{user: cookies.get('user'), date: new Date().toJSON(), content: this.postContent}]
        })
        axios.post('/api', 'method=setj&key=class.' + this.getQueryVariable('class') + '.post&val=' + 
          encodeURIComponent(JSON.stringify(o))).then(() => {
            this.$message.success("发帖成功")
            setTimeout(() => this.$router.push("/ForumDetail?class=" + this.getQueryVariable('class') + '&post=' + (res.data.length - 1)), 500)
          })
      })
    },

    onTitleClick(item) {
      alert(item.id);
    },
  }
}
</script>

<style scoped>
.head {
  position: relative;
  padding: 3px;
  /* border: 1px solid black;
  border-radius: 10px; */
}

.plateName {
  font-size: 1.2em;
  margin: 10px 15px;
}

.postTitleTextBox {
  width: calc(100% - 10px);
  border: 1px solid;
  border-radius: 3px;
  border-color: #006b6d;
  padding: 2px;
  font-size: 1.2em;
}

.postContentTextBox {
  width: calc(100% - 10px);
  height: 80px;
  border: 1px solid;
  padding: 2px;
  font-family: '微软雅黑';
  border-radius: 3px;
  border-color: #006b6d;
  font-size: 1.1em;
}

.postButtons {
  position: relative;
  height: 40px;
}


.postButton {
  position: absolute;
  top: 3px;
  right: 4px;
}


.postEntry {
  position: relative;
  padding: 0px 10px;
  /* cursor: pointer; */
}


.postContentUserName {
  position: absolute;
  top: -5px;
  left: -30px;
  color: rgb(100, 100, 100)
}

.postContentDate {
  position: absolute;
  top: -5px;
  left: 10px;
  color: rgb(100, 100, 100)
}

.postContentControlButton {
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>