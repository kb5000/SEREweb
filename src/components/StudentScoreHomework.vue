学生互评页

<template>
  <div class="page">
    <div class="gridCommon bigFont">{{title}}</div>
    <el-row class="gridCommon normalFont marginCommon" style="padding: 20px">
      作业内容
      <div class="marginCommon smallFont gridCommon">
        <el-row>
          <el-col :span="24">{{homeworkDescription}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div style="height: 24px; position: relative;">
              <div class="marginCommon myButton" style="float:right;" v-on:click="onDownloadButtonClick">下载文件</div>
            </div>
          </el-col>
        </el-row>
      </div> 
    </el-row>
    <el-row class="gridCommon normalFont marginCommon" style="padding: 20px">
      提交评价
      <div class="marginCommon smallFont gridCommon">
        <el-row>
          <el-col :span="24">
            <textarea class="marginCommon myPostContentTextBox" placeholder = "评语" maxlength="1000" v-model="homeworkComment"/>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <input class="marginCommon myScoreTextBox" style="float:right;" type = "number" min = "0" max = "100" placeholder = "评分" v-model="homeworkScore"/>
          </el-col>
          <el-col :span="2">
            <div style="height: 24px; position: relative;">
              <div class="marginCommon myButton" style="float:right;" v-on:click="onSubmitButtonClick">提交</div>
            </div>
          </el-col>
        </el-row>
      </div> 
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StudentScoreHomework',
  data() {
    return {
      homeworkComment:"",
      homeworkScore:"",
      homeworkName:"",
      title:"",
      homeworkDescription:"",
    }
  },

  mounted() {
    this.homeworkName = "互评作业一";
    this.title = this.homeworkName;
    this.homeworkDescription = "我的作业就在附件中，请老师下载，求高分！";
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

    onDownloadButtonClick() {

    },

    onSubmitButtonClick() {

    },

  }
}
</script>

<style scoped>
.myButton {
  padding: 5px 10px;
  border: 1px solid;
  border-radius: 3px;
  background-color: #fff;
  color: #00bbbd;
  border-color: #00bbbd;
  font-size: 12px;
  cursor: pointer;
  user-select: none;
}
.myPostContentTextBox {
  width: calc(100% - 21px);
  height: 100px;
  border: 1px solid;
  border-radius: 3px;
  border-color: #006b6d;
  padding: 10px;
  font-size: 13px;
  resize: vertical;
}
.myScoreTextBox {
  width: calc(5%);
  height: 8px;
  border: 1px solid;
  border-radius: 3px;
  border-color: #006b6d;
  padding: 10px;
  font-size: 13px;
  resize: vertical;
}
</style>