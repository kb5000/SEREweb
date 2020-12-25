学生小测详情页

<template>
  <div class="page">
    <div class="gridCommon bigFont">{{title}}</div>
    <el-row class="gridCommon normalFont marginCommon" style="padding: 20px">
      测试信息
      <div class="marginCommon smallFont gridCommon">
        <el-row style="padding: 10px">
          <el-col :span="4">占成绩比例：{{testRatio}}</el-col>
          <el-col :span="6">开放时间：{{testShowTime}}</el-col>
          <el-col :span="5">开始时间：{{testStartTime}}</el-col>
          <el-col :span="5">截止时间：{{testEndTime}}</el-col>
          <el-col :span="4">测试形式：{{testForm}}</el-col>
        </el-row>
        <el-row style="padding: 10px">
          <el-col :span="4">允许尝试次数：{{testAttemptNumber}}</el-col>
          <el-col :span="6">计分规则：{{testScoreRule}}</el-col>
          <el-col :span="5">公布成绩时间：{{testShowScoreTime}}</el-col>
          <el-col :span="5">公布答案时间：{{testShowAnswerTime}}</el-col>
          <el-col :span="4">题目数量：{{testQuestionNumber}}</el-col>
        </el-row>
      </div> 
    </el-row>
    <el-row class="gridCommon normalFont marginCommon" style="padding: 20px">
      我的测试      
      <a class="stressFontColor" :href="testLink" style="text-decoration: none; float:right;">开始测试</a>
      <div v-for="i in myTest" :key="i.id" class="marginCommon smallFont gridCommon">
        <el-row>
          <el-col :span="20">最后交卷时间：{{i.submitTime}}</el-col>
          <el-col :span="4">成绩：{{i.score}}</el-col>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StudentTest',
  data() {
    return {
        title:"",
        testName:"",
        testRatio:"",
        testShowTime:"",
        testStartTime:"",
        testEndTime:"",
        testForm:"",
        testAttemptNumber:"",
        testScoreRule:"",
        testShowScoreTime:"",
        testShowAnswerTime:"",
        testQuestionNumber:"",
        testLink:"",
        myTest : [],
    }
  },

  mounted() {
      this.testName = "测试一";
      this.title = this.testName;
      this.testRatio = "10.0%",
      this.testShowTime = "2020-12-20 10:00";
      this.testStartTime = "2020-12-20 10:00";
      this.testEndTime = "2020-12-20 12:00";
      this.testForm = "个人测试";
      this.testAttemptNumber = "5";
      this.testScoreRule = "最后一次得分";
      this.testShowScoreTime = "立即公布";
      this.testShowAnswerTime = "不公布答案";
      this.testQuestionNumber = "5",
      this.myTest = [
        {id: 1, submitTime: "2020-12-20 12:00", score: "90"},
        {id: 2, submitTime: "2020-12-20 12:30", score: "100"},
      ];
      this.testLink = "/StudentTest?class=" + this.getQueryVariable('class') + "&test=" + this.getQueryVariable('test');

      axios.post('/api', 'method=get&key=class.' + this.getQueryVariable('class') + '.test.' + this.getQueryVariable('test')).then(res => {
        this.testName = res.data.name;
        this.title = res.data.name;
        this.myTest = []
        for (let i in res.data.submits) {
          let o = res.data.submits[i]
          this.myTest.push({
            id: o.id,
            submitTime: new Date(o.time).toLocaleString(),
            score: o.score
          })
        }
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

  }
}
</script>

<style scoped>


</style>