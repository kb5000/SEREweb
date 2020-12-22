教师添加小测

<template>
  <div class="page">
    <div class="gridCommon bigFont">{{ className }}的小测</div>
    <div class="gridCommon marginCommon">
      <div class="normalFont" style="display: inline-block;">小测名称：</div>
      <el-input 
        v-model="testName"
        style="position: relative; width: 360px;"
      /><br/><br/>
      <div style="display: inline-block;">开始时间：</div>
      <el-date-picker
        v-model="startTime"
        type="datetime"
        placeholder="选择时间"
        style="width: 360px"
      /><br/><br/>
      <div style="display: inline-block;">持续分钟：</div>
      <el-input-number v-model="quizTime" :min="1" :max="1440" label="分钟数"></el-input-number>
      <br/><br/>
    </div>
    <div class="gridCommon marginCommon">
      <div v-for="(i, index) in questions" :key="i.id" class="marginCommon">
        <div>{{index}}. </div>
      </div>
      <div class="marginCommon">
        <p class="bigFont">添加题目</p>
        题目类型：
        <el-select v-model="currentType">
          <el-option
            v-for="item in questionMetaList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select><br/><br/>
        题目描述：
        <el-input 
          v-model="currentDescription"
          type="textarea"
          style="position: relative; width: 360px; vertical-align: top;"
        /><br/><br/>
        题目图片：
        <el-upload
          style="position: relative; left: 70px; top: -20px; width: 400px;"
          drag
          action="/data/"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传不超过5MB的图片</div>
        </el-upload>
        <template v-if="currentType === 0">
          选项：
          <div style="display: inline-block; position: relative; left: 20px; vertical-align: top;">
            <div v-for="(i, index) in currentOptions" :key="index" style="position: relative; width: 440px;">
              <el-input v-model="currentOptions[index]" style="margin: 5px 0; display: inline-block; width: 350px;"></el-input>
              <div class="el-icon-delete" style="position: absolute; right: 0px; top: 15px; cursor: pointer;" @click="removeOptionClick(index)"></div>
              <el-radio v-model="currentAnswer" :label="index" style="position: absolute; right: 30px; top: 15px;">答案</el-radio>
            </div>
            <div class="commonButton" style="position: relative; width: 60px; margin: 6px 0px;" @click="addOptionClick">添加选项</div>
          </div>
          <br/><br/>
        </template>
        <template v-if="currentType === 1">
          答案：{{"\xa0\xa0\xa0\xa0\xa0\xa0"}}
          <el-input 
            v-model="currentAnswer"
            type="textarea"
            style="position: relative; width: 360px; vertical-align: top;"
          /><br/><br/>
        </template>
        分数：{{"\xa0\xa0\xa0\xa0\xa0\xa0"}}
        <input v-model="currentScore" type="number" min="0" max="100"/><br/>
        <br/>
        <div class="commonButton" style="position: relative; width: 30px; left: 65px;" @click="addQuestion">添加</div>
      </div>
      <br/>
      <div class="commonButton" style="position: relative; left: calc(50% - 15px); width: 30px;">提交</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TeacherAddTest',
  data() {
    return {
      className: "",
      testName: "",
      startTime: null,
      quizTime: 120,
      questions: [],
      currentType: 0,
      currentDescription: "",
      currentScore: 0,
      currentAnswer: "",
      currentOptions: [],
      currentImg: "",
      questionMetaList: [
        {label: "选择题", value: 0},
        {label: "填空题", value: 1},
        {label: "主观题", value: 2}
      ],
    }
  },

  mounted() {
    this.className = "软需一班";
    this.currentOptions = [
      "选项A",
      "选项B",
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

    addQuestion() {
      let question = {
        type: this.currentType,
        description: this.currentDescription,
        options: this.currentOptions,
        answer: this.currentAnswer,
        score: this.currentScore,
        img: this.currentImg
      };
      this.questions.push(question);
    },

    addOptionClick() {
      this.currentOptions.push("");
    },

    removeOptionClick(index) {
      for (let i = index; i < this.currentOptions.length - 1; i++) {
        this.currentOptions[i] = this.currentOptions[i + 1];
      }
      this.currentOptions.pop();
      this.currentAnswer = 0;
    },

    onPostButtonClick() {
      axios({
        method: 'get',
        url: '/api?method=add'
      });
    },

  },

}
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
