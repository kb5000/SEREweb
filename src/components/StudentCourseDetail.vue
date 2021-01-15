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
                  <el-col :span="4">班级名称：{{className}}</el-col>
                  <el-col :span="4">专业课：{{courseMajor}}</el-col>
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
              <div v-for="(i,idx) in courseMaterials" :key="idx" class="marginCommon smallFont gridCommon">
                <el-row>
                  <el-col :span="20">{{i.name}}</el-col>
                  <el-col :span="4">
                    <div class="myButton" style="float:right;" v-on:click="onDownloadButtonClick(i.url)">下载</div>
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
                  <el-col :span="8">开放时间：{{i.endTime}}</el-col>
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
                  <el-col :span="4">状态：{{i.state}}</el-col>
                  <el-col :span="4">测试时长：{{i.time}}分钟</el-col>
                  <el-col :span="8">开放时间：{{i.startTime}}</el-col>
                  <el-col :span="2">成绩：{{i.score}}</el-col>
                  <el-col :span="2">
                    <a class="stressFontColor" :href="i.detailLink" style="text-decoration: none; float:right;">详情</a>
                  </el-col>
                </el-row>
              </div>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="视频">
            <el-row class="gridCommon normalFont marginCommon" style="padding: 20px">
              视频列表
              <div v-for="i in videos" :key="i.id" class="marginCommon smallFont gridCommon">
                <el-row>
                  <el-col :span="20">{{i.name}}</el-col>
                  <el-col :span="4">
                    <div class="myButton" style="float:right;" v-on:click="onVideoButtonClick">观看</div>
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
      className: "",
      courseName:"",
      title:"",
      courseMajor:"",
      courseDate:"",
      courseSession:"",
      courseTeacher:[],
      courseBrief:"",
      courseMaterials:[],
      courseHomework:[],
      courseQuiz:[],
      videos: []
    }
  },

  mounted() {
    // this.courseId = "21194584";
    // this.courseName = "软件需求工程";
    // this.title = this.courseName;
    // this.courseDepartment = "软件学院";
    // this.courseSession = "2020-2021 秋冬";
    // this.courseDate = "2020-09-01";
    // this.courseTeacher = [
    //   {id: 1, user: "邢卫", userLink: "/"},
    //   {id: 2, user: "刘玉生", userLink: "/"},
    // ];
    // this.courseBrief = "软件需求工程是最好的一门课！";
    // this.courseMaterials = [
    //   {id: 1, name: "UML课件"},
    //   {id: 2, name: "需求课件"},
    // ];
    this.videos= [
      {id: 1, name: "UML课件"},
      {id: 2, name: "需求课件"},
    ];
    // this.courseHomework = [
    //   {id: 1, name: "作业一", form: "个人作业", state: "未交", startTime:"2020-12-20 11:30", endTime: "2020-12-25 11:30", score : "0", detailLink : "/StudentHomework"},
    //   {id: 2, name: "作业二", form: "个人作业", state: "已交", startTime:"2020-12-20 11:30", endTime: "2020-12-25 11:30", score : "100", detailLink : "/StudentHomework"},
    // ];
    // this.courseQuiz = [
    //   {id: 1, name: "测试一", questionNumber: "5", state: "未交", startTime:"2020-12-20 11:30", endTime: "2020-12-25 11:30", score : "0", detailLink : "/StudentTestDetail"},
    //   {id: 2, name: "测试二", questionNumber: "10", state: "已交", startTime:"2020-12-20 11:30", endTime: "2020-12-25 11:30", score : "100", detailLink : "/StudentTestDetail"},
    // ];

    let courseID = this.getQueryVariable('id');
    let classID = this.getQueryVariable('class')

    axios.post('/api', 'method=get&key=course.' + courseID).then(res => {
      axios.post('/api', 'method=get&key=class.' + classID).then(rec => {
        let courseData = res.data;
        let classData = rec.data;
        this.courseId = courseData.id;
        this.courseName = courseData.name;
        this.className = classData.name
        this.courseMajor = courseData.isMajor ? "专业课" : "通识课"
        this.courseSession = classData.time;
        this.courseDate = new Date(courseData.startDate).toLocaleDateString()
        this.courseTeacher = []
        for (let i in classData.teacher) {
          this.courseTeacher.push({
            id: i,
            user: classData.teacher[i],
            userLink: ''
          })
        }
        this.courseBrief = courseData.description;
        this.title = courseData.name + " " + classData.name
        this.courseMaterials = classData.file;
        for (let i in classData.homework) {
          let o = classData.homework[i]
          this.courseHomework.push({
            id: i,
            name: o.name,
            form: o.isGroup ? "分组作业" : "个人作业",
            state: "未交",
            endTime: new Date(o.deadline).toLocaleString(),
            score: '',
            detailLink: '/StudentHomework?class=' + classID + '&homework=' + i
          })
        }
        for (let i in classData.test) {
          let o = classData.test[i]
          this.courseQuiz.push({
            id: i,
            name: o.name,
            time: o.quizTime,
            state: "未交",
            startTime: new Date(o.startTime).toLocaleString(),
            score: '',
            detailLink: '/StudentTestDetail?class=' + classID + '&test=' + i
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

    onPostButtonClick() {
      axios({
        method: 'get',
        url: '/api?method=add'
      });
    },

    onDownloadButtonClick(url) {
      window.open('/data/' + url)
    },

    onVideoButtonClick() {

    }
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