教师添加作业

<template>
  <div class="page">
    <div class="gridCommon bigFont">{{ className }}的作业</div>
    <div class="marginCommon gridCommon">
      <div class="normalFont" style="display: inline-block;">作业名称：</div>
      <el-input 
        v-model="homeworkName"
        style="position: relative; width: 360px;"
      /><br/><br/>
      <div class="normalFont" style="display: inline-block;">作业形式：</div>
      <el-radio v-model="isGroup" :label="false">个人作业</el-radio>
      <el-radio v-model="isGroup" :label="true">分组作业</el-radio>
      <br/><br/>
      <div style="display: inline-block;">截止日期：</div>
      <el-date-picker
        v-model="deadline"
        type="date"
        placeholder="选择日期"
        style="width: 360px"
      /><br/><br/>
      <div class="normalFont" style="display: inline-block;">作业要求：</div>
      <el-input 
        v-model="homeworkDescription"
        type="textarea"
        style="position: relative; width: 360px; vertical-align: top;"
      /><br/><br/>
      <div class="normalFont" style="display: inline-block;">上传附件：</div>
      <el-upload
        style="position: relative; left: 70px; top: -20px; width: 400px"
        drag
        action="/data/"
        :on-success="dataUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传不超过20MB的文件</div>
      </el-upload>
      <div class="commonButton" style="position: relative; left: 380px; width: 30px;" @click="onPostButtonClick">提交</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TeacherAddHomework",
  data() {
    return {
      className: "软需一班",
      classID: "",
      homeworkName: "",
      deadline: null,
      homeworkDescription: "",
      isGroup: false,
      file: [],
    };
  },

  mounted() {
    this.classID = this.getQueryVariable('class');
    axios.post("/api", 'method=get&key=class.' + this.classID).then(res => {
      this.className = res.data.name;
    })
  },

  methods: {
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },

    dataUploadSuccess(response) {
      // response is the file name, we can access it by /data/xxx
      console.log(response)
      this.file.push(response)
    },

    onPostButtonClick() {
      let homeworkID = this.$uuid.v4();
      axios.post('/api', 'method=setj&key=class.' + this.classID + '.homework.' + homeworkID + '&val=' + 
        encodeURIComponent(JSON.stringify({
          id: homeworkID,
          name: this.homeworkName,
          deadline: this.deadline,
          description: this.homeworkDescription,
          isGroup: this.isGroup,
          file: this.file
        }))).then(() => {
          this.$message.success("布置成功");
          setTimeout(() => {this.$router.go(-1)}, 500)
        })
    },
  },
};
</script>

<style scoped>
.mainTextArea {
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
