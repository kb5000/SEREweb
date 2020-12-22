学生班级详情，
显示标题，课程简介，课程大纲（分节），每节下面有课件、作业、小测
可以用选项卡<!-- <el-tabs> -->控件

<template>
  <div class="page">
    <div class="gridCommon bigFont">{{title}}</div>
    <el-row class="gridCommon marginCommon normalFont" style="padding: 20px">
      <el-col span="24" class="paddingCommon">
        <el-tabs>
          <el-tab-pane label="课程信息">
            <el-row class="gridCommon normalFont marginCommon" style="padding: 20px">
              课程信息
              <div class="marginCommon smallFont gridCommon">
                <el-row>
                  <el-col :span="4">课程名称：{{courseName}}</el-col>
                  <el-col :span="4">课程代码：{{courseId}}</el-col>
                  <el-col :span="4">开课系级：{{courseDepartment}}</el-col>
                  <el-col :span="4">学年期：{{courseSession}}</el-col>
                  <el-col :span="4">开始日期：{{courseDate}}</el-col>
                  <el-col :span="4">授课教师：
                    <a v-for="i in courseTeacher" :key="i.id" class="stressFontColor" :href="i.userLink" style="text-decoration: none">{{i.user}}  </a>
                  </el-col>
                </el-row>
              </div> 
            </el-row>
            <el-row class="gridCommon normalFont marginCommon" style="padding: 20px">
              课程简介
              <div class="marginCommon smallFont gridCommon">
                <el-row>
                  <el-col :span="24">{{courseBrief}}</el-col>
                </el-row>
              </div> 
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="课件">
            <el-row class="gridCommon normalFont marginCommon" style="padding: 20px">
              课件列表
              <div v-for="i in courseMaterials" :key="i.id" class="marginCommon smallFont gridCommon">
                <el-row>
                  <el-col :span="20">{{i.name}}</el-col>
                  <el-col :span="4">
                    <div class="myButton" style="float:right;" v-on:click="onDownloadButtonClick">下载</div>
                  </el-col>
                </el-row>
              </div>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="作业">
            <el-row class="gridCommon normalFont marginCommon" style="padding: 20px">
              作业列表
              <div v-for="i in courseHomework" :key="i.id" class="marginCommon smallFont gridCommon">
                <el-row>
                  <el-col :span="4">作业名称：{{i.name}}</el-col>
                  <el-col :span="4">作业形式：{{i.form}}</el-col>
                  <el-col :span="4">状态：{{i.state}}</el-col>
                  <el-col :span="8">开放时间：{{i.startTime}}-{{i.endTime}}</el-col>
                  <el-col :span="2">成绩：{{i.score}}</el-col>
                  <el-col :span="2">
                    <a class="stressFontColor" :href="i.detailLink" style="text-decoration: none; float:right">详情</a>
                  </el-col>
                </el-row>
              </div>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="测试">
            <el-row class="gridCommon normalFont marginCommon" style="padding: 20px">
              测试列表
              <div v-for="i in courseQuiz" :key="i.id" class="marginCommon smallFont gridCommon">
                <el-row>
                  <el-col :span="4">测试名称：{{i.name}}</el-col>
                  <el-col :span="4">题目数量：{{i.questionNumber}}</el-col>
                  <el-col :span="4">状态：{{i.state}}</el-col>
                  <el-col :span="8">开放时间：{{i.startTime}}-{{i.endTime}}</el-col>
                  <el-col :span="2">成绩：{{i.score}}</el-col>
                  <el-col :span="2">
                    <a class="stressFontColor" :href="i.detailLink" style="text-decoration: none; float:right;">详情</a>
                  </el-col>
                </el-row>
              </div>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StudentCourseDetail',
  data() {
    return {
      courseId:"",
      courseName:"",
      title:"",
      courseDepartment:"",
      courseDate:"",
      courseSession:"",
      courseTeacher:[],
      courseBrief:"",
      courseMaterials:[],
      courseHomework:[],
      courseQuiz:[],
    }
  },

  mounted() {
    this.courseId = "21194584";
    this.courseName = "软件需求工程";
    this.title = this.courseName;
    this.courseDepartment = "软件学院";
    this.courseSession = "2020-2021 秋冬";
    this.courseDate = "2020-09-01";
    this.courseTeacher = [
      {id: 1, user: "邢卫", userLink: "/"},
      {id: 2, user: "刘玉生", userLink: "/"},
    ];
    this.courseBrief = "哈哈哈哈哈哈哈哈哈哈哈哈哈好多文档哈哈哈哈哈哈哈哈哈";
    this.courseMaterials = [
      {id: 1, name: "UML课件"},
      {id: 2, name: "需求课件"},
    ];
    this.courseHomework = [
      {id: 1, name: "作业一", form: "个人作业", state: "未交", startTime:"2020-12-20 11:30", endTime: "2020-12-25 11:30", score : "0", detailLink : "/StudentHomework"},
      {id: 2, name: "作业二", form: "个人作业", state: "已交", startTime:"2020-12-20 11:30", endTime: "2020-12-25 11:30", score : "100", detailLink : "/StudentHomework"},
    ];
    this.courseQuiz = [
      {id: 1, name: "测试一", questionNumber: "5", state: "未交", startTime:"2020-12-20 11:30", endTime: "2020-12-25 11:30", score : "0", detailLink : "/StudentTestDetail"},
      {id: 2, name: "测试二", questionNumber: "10", state: "已交", startTime:"2020-12-20 11:30", endTime: "2020-12-25 11:30", score : "100", detailLink : "/StudentTestDetail"},
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

    onDownloadButtonClick() {

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
</style>