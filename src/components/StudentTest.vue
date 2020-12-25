学生进行小测页
显示各题目，题目通过后端获取
三种题目：选择，填空，简答

<template>
  <div class="page">
    <div class="gridCommon bigFont">{{ testName }}</div>
    <div class="gridCommon marginCommon" style="position: relative;">
      <div v-for="(i, index) in questions" :key="index" class="marginCommon">
        <div style="position: relative">
          <p style="display: inline-block; vertical-align: top; position: relative; top: 2px;">{{index + 1}}. </p>
          <!-- <div class="el-icon-delete" style="position: absolute; left: -3px; top: 48px; cursor: pointer;" @click="removeQuestionClick(index)"></div> -->
          <div style="display: inline-block; vertical-align: top; margin: 0 10px;">
            <p class="normalFont">{{i.description + "（" + i.score + "分）"}}</p>
            <img v-if="i.img !== ''" :src="'/data/' + i.img" />
            <div v-if="i.type === 0">
              <el-radio-group v-model="i.myAnswer">
                <el-radio v-for="(j, jndex) in i.options" :key="jndex" :label="jndex">{{String.fromCharCode(jndex + 65) + '. ' + j}}</el-radio>
              </el-radio-group>
            </div><br/>
            <el-input v-if="i.type === 1" v-model="i.myAnswer" />
            <el-input v-if="i.type === 2" style="width: 525px; height: 100px;" v-model="i.myAnswer" type="textarea"/>
            <!-- <p v-if="i.type !== 2"><span class="stressFontColor">答案：</span>{{i.type === 0 ? String.fromCharCode(i.answer + 65) : i.answer}}</p> -->
          </div>
        </div>
      </div>
      <div class="commonButton" style="position: relative; width: 40px; left: 45%;" @click="onPostButtonClick">提交</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import cookies from 'js-cookie'

export default {
  name: 'StudentTest',
  data() {
    return {
      testName: '',
      questions: []
    }
  },

  mounted() {
    axios.post('/api', 'method=get&key=class.' + this.getQueryVariable('class') + '.test.' + this.getQueryVariable('test')).then(res => {
      this.testName = res.data.name;
      this.questions = res.data.questions
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
      let score = 0;
      let id = this.$uuid.v4();
      for (let i of this.questions) {
        if (i.type !== 2) {
          if (i.myAnswer == i.answer) score += new Number(i.score);
        }
      }
      axios.post('/api', 'method=setj&key=class.' + this.getQueryVariable('class') + '.test.' + 
        this.getQueryVariable('test') + '.submits.' + id +'&val=' + encodeURIComponent(JSON.stringify({
          id: id,
          score: score, 
          time: new Date().toJSON(),
          user: cookies.get('user'),
          answers: this.questions
        }))).then(() => {
          this.$message.success("提交成功，您的分数为" + score);
          setTimeout(() => {this.$router.go(-1)}, 500)
        })
    },

  }
}
</script>

<style scoped>


</style>