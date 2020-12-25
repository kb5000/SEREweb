学生作业详情页，查看作业详情，可以上传作业和下载作业文件

<template>
  <div class="page">
    <div class="gridCommon bigFont">{{title}}</div>
    <el-row class="gridCommon marginCommon normalFont" style="padding: 20px">
      <el-col span="24" class="paddingCommon">
        <el-tabs>
          <el-tab-pane label="作业要求">
            <el-row class="gridCommon normalFont marginCommon" style="padding: 20px">
              作业信息
              <div class="marginCommon smallFont gridCommon">
                <el-row>
                  <el-col :span="4">占成绩比例：{{homeworkRatio}}</el-col>
                  <el-col :span="6">公布成绩时间：{{homeworkShowScoreTime}}</el-col>
                  <el-col :span="5">开放时间：{{homeworkStartTime}}</el-col>
                  <el-col :span="5">截止时间：{{homeworkEndTime}}</el-col>
                  <el-col :span="4">作业形式：{{homeworkForm}}</el-col>
                </el-row>
                <!-- <el-row>
                  <el-col :span="20">{{homeworkContent}}</el-col>
                  <el-col :span="4">
                    <div class="myButton" style="float:right;" v-on:click="onDownloadHomeworkButtonClick">下载附件</div>
                  </el-col>
                </el-row> -->
              </div> 
            </el-row>
            <el-row class="gridCommon normalFont marginCommon" style="padding: 20px">
              评分方式
              <div class="marginCommon smallFont gridCommon">
                <el-row>
                  <el-col :span="12">教师评价：{{homeworkTeacherRatio}}</el-col>
                  <el-col :span="12">学生评价：{{homeworkStudentRatio}}</el-col>
                </el-row>
              </div> 
            </el-row>
            <div class="merginCommon gridCommon">
              <p>{{homeworkContenta}}</p>
              <div v-if="homeworkData !== null" class="myButton" style="position: relative; width: 50px;" @click="onDownloadHomeworkButtonAClick">下载附件</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的作业">
            <el-row class="gridCommon normalFont marginCommon" style="padding: 20px">
              我的作业
              <div v-for="i in myHomework" :key="i.id" class="marginCommon smallFont gridCommon">
                <el-row>
                  <el-col :span="8">提交时间：{{i.submitTime}}</el-col>
                  <el-col :span="8">{{i.detail}}</el-col>
                  <el-col :span="4">成绩：{{i.score}}</el-col>
                  <el-col :span="4">
                    <div class="myButton" style="float:right;" @click="onDownloadButtonClick(i)">下载作业</div>
                  </el-col>
                </el-row>
              </div>
            </el-row>
            <el-row class="gridCommon normalFont marginCommon" style="padding: 20px">
              提交作业
              <div class="marginCommon smallFont gridCommon">
                <el-row>
                  <el-col :span="24">
                    <textarea class="marginCommon myPostContentTextBox" maxlength="1000" v-model="homeworkDescription"/>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22">
                    <!-- <div style="height: 24px; position: relative;">
                      <div class="myButton marginCommon" style="float:right;" v-on:click="onUploadButtonClick">上传文件</div>
                    </div> -->
                    <el-upload
                      style="position: relative;  width: 400px"
                      action="/data/"
                      :on-success="dataUploadSuccess"
                    >
                      <div class="el-upload__text"><em>点击上传附件</em></div>
                      <div class="el-upload__tip" slot="tip">只能上传不超过20MB的文件</div>
                    </el-upload>
                  </el-col>
                  <el-col :span="2">
                    <div style="height: 24px; position: relative;">
                      <div class="myButton marginCommon" style="float:right;" v-on:click="onSubmitButtonClick">提交</div>
                    </div>
                  </el-col>
                </el-row>
              </div> 
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="作业互评">
            <el-row class="gridCommon normalFont marginCommon" style="padding: 20px">
              互评作业列表
              <div v-for="i in scoreHomework" :key="i.id" class="marginCommon smallFont gridCommon">
                <el-row>
                  <el-col :span="16">提交时间：{{i.submitTime}}</el-col>
                  <el-col :span="6">成绩：{{i.score}}</el-col>
                  <el-col :span="2">
                    <a class="stressFontColor" :href="i.scoreLink" style="text-decoration: none; float:right;">开始评价</a>
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
import cookies from 'js-cookie'

export default {
  name: 'StudentHomework',
  data() {
    return {
      homeworkDescription:"",
      title:"",
      homeworkName:"",
      homeworkRatio:"",
      homeworkStartTime:"",
      homeworkShowScoreTime:"",
      homeworkEndTime:"",
      homeworkForm:"",
      homeworkTeacherRatio:"",
      homeworkStudentRatio:"",
      myHomework:[],
      homeworkContenta: "",
      scoreHomework:[],
      file: null,
      homeworkData: null,
    }
  },

  mounted() {
    this.homeworkName = "作业一";
    this.title = this.homeworkName;
    this.homeworkRatio = "5.0%";
    this.homeworkShowScoreTime = "2020-12-31 23:00";
    this.homeworkStartTime = "2020-12-20 23:00";
    this.homeworkEndTime = "2020-12-25 23:00";
    this.homeworkForm = "个人作业";
    this.homeworkTeacherRatio = "100%";
    this.homeworkStudentRatio = "0%";
    // this.myHomework = [
    //   {id: 1, submitTime: "2020-12-20 12:00", score: "90"},
    //   {id: 2, submitTime: "2020-12-20 12:30", score: "100"},
    // ];
    this.scoreHomework = [
      {id: 1, submitTime: "2020-12-20 12:00", score: "100", scoreLink:"/StudentScoreHomework"},
      {id: 2, submitTime: "2020-12-20 12:30", score: "0", scoreLink:"/StudentScoreHomework"},
    ];

    let classID = this.getQueryVariable('class')
    let homeworkID = this.getQueryVariable('homework')
    axios.post('/api', 'method=get&key=class.' + classID).then(res => {
      let classData = res.data;
      let homework = classData.homework[homeworkID]
      this.homeworkName = homework.name;
      this.title = homework.name
      this.homeworkEndTime = new Date(homework.deadline).toLocaleString()
      this.homeworkForm = homework.isGroup ? "分组作业" : "个人作业"
      this.homeworkContenta = homework.description
      this.homeworkData = homework.file[0]
      this.myHomework = []
      for (let i in homework.submits) {
        let o = homework.submits[i]
        this.myHomework.push({
          id: o.id,
          submitTime: new Date(o.time).toLocaleString(),
          score: o.score === null ? "未评分" : o.score,
          detail: o.content,
          file: o.file
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

    dataUploadSuccess(res) {
      this.file = res
    },

    onDownloadHomeworkButtonAClick() {
      window.open('/data/' + this.homeworkData);
    },

    onDownloadButtonClick(node) {
      window.open('/data/' + node.file);
    },

    onUploadButtonClick() {

    },

    onSubmitButtonClick() {
      let toUpload = {
        id: this.$uuid.v4(),
        user: cookies.get('user'),
        file: this.file,
        content: this.homeworkDescription,
        time: new Date().toJSON(),
        score: null
      }
      axios.post('/api', 'method=setj&key=class.' + this.getQueryVariable('class') + '.homework.' + this.getQueryVariable('homework') + '.submits.' + toUpload.id + '&val=' + 
        encodeURIComponent(JSON.stringify(toUpload))).then(() => {
          this.$message.success("上传成功");
          // setTimeout(() => {this.$router.go(-1)}, 500)
        })
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
</style>