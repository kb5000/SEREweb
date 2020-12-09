论坛帖子浏览页
浏览帖子，发帖，删帖

<template>
  <div class="page">
    <div class="head">
      <p class="plateName">{{plateName}}</p>
      {{"\xa0\xa0\xa0标题"}}<input class="postTitleTextBox" type="text" v-model="postTitle"/>
      {{"\xa0\xa0\xa0内容"}}<textarea class="postContentTextBox" v-model="postContent"/>
      <img src="@/assets/logo.png" width="80px" height="80px"/>
      <div class="postButtons">
        <div class="commonButton postButton" v-on:click="onPostButtonClick">提交</div>
      </div>
    </div>
    <div class="content">
      <div v-for="item in postList" :key="item.id" class="postEntry">
        <p class="postContentTitle" v-on:click="onTitleClick(item)">{{item.title}}</p>
        <div class="postContentControl">
          <p class="postContentUserName">{{item.userName}}</p>
          <p class="postContentDate">{{item.date}}</p>
          <div class="commonButton postContentControlButton">删除</div>
        </div>
      </div>
    </div>
    <div class="tail">

    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
    for (let i = 0; i < 20; i++) {
      this.postList.push({
        id: i,
        title: "Main函数为什么不能调用",
        subject: "测试测试测试",
        userName: "abc",
        date: "2020/11/20 20:17"
      })
    }
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
        url: '/api?method=get&key=forum.plates.' + this.plateID + '.newID'
      }).then(res => {
        axios({
          method: 'get',
          url: '/api?method=setj&key=forum.plates.' + this.plateID + '.posts.' + res.data + ''
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
.page {
  position: relative;
  width: 80%;
  left: 10%;
  background-color: white;
}

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
  margin: 5px 15px;
  width: calc(100% - 35px);
  border: 1px solid;
  border-radius: 3px;
  border-color: #006b6d;
  padding: 2px;
  font-size: 1.2em;
}

.postContentTextBox {
  margin: 5px 15px 10px 15px;
  width: calc(100% - 35px);
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

.commonButton {
  padding: 5px 10px;
  border: 1px solid;
  border-radius: 3px;
  background-color: #fff;
  color: #00bbbd;
  border-color: #00bbbd;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}

.commonButton:active {
  color: #000000;
  border-color: #000000;
}

.postButton {
  position: absolute;
  right: 15px;
}

.content {
  /* border: 1px solid black; */
  margin: 0 10px;
  width: calc(100% - 20px);
}

.postEntry {
  position: relative;
}

.postContentTitle {
  margin: 10px 10px;
  font-size: 1.2em;
  cursor: pointer;
}

.postContentUserName {
  position: absolute;
  top: -10px;
  left: -30px;
  color: rgb(100, 100, 100)
}

.postContentDate {
  position: absolute;
  top: -10px;
  left: 10px;
  color: rgb(100, 100, 100)
}

.postContentControl {
  position: absolute;
  top: 7px;
  right: 10px;
  width: 200px;
  /* border: 1px solid black; */
  height: 31px;
}

.postContentControlButton {
  position: absolute;
  right: 5px;
}

.postEntry {
  border: 1px solid black;
  margin: 5px;
}
</style>