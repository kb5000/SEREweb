教师批改小测
主要看主观题，客观题展示可以二期

<template>
  <div class="page">
    <div class="gridCommon bigFont"><span class="stressFontColor">{{className}}</span>的小测</div>
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="marginCommon gridCommon">
          <el-table :data="tests" border height="530" :show-header="false" highlight-current-row
            v-on:current-change="changeActivateTest"
          >
            <el-table-column prop="name"></el-table-column>
            <el-table-column prop="no"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="marginCommon gridCommon">
          <span v-if="this.testObj !== null">
            <div class="bigFont">
              <span class="stressFontColor">{{testObj.name}}</span>的小测
            </div>
            <div v-for="(i, index) in testObj.data" :key="index" style="margin: 10px 0;">
              <p><span class="stressFontColor">问题：</span>{{i.question}}</p>
              <template v-if="i.img !== null">
                <img v-if="i.img !== null" :src="i.img" height="200" width="200"/>
                <br/><br/>
              </template>
              <p><span class="stressFontColor">回答：</span>{{i.answer}}</p>
              <span class="stressFontColor">得分：</span><input v-model="i.score" type="number" min="0" max="100"/><br/>
            </div>
            <div style="height: 40px; margin: 10px 0; position: relative;">
              <div class="commonButton" style="position: absolute; right: 0px;">提交</div>
            </div>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TeacherScoreTest',
  data() {
    return {
      className: "",
      activeTest: 0,
      testObj: null,
      tests: [],
      currentScore: 0,
    }
  },

  mounted() {
    this.className = "软需一班";
    let data = [
      {type: 2, question: "根据以下信息回答问题1", img: null, answer: "首先定义问题需要解决", score: 0},
      {type: 2, question: "根据以下信息回答问题2", img: "/favicon.ico", answer: "其次也需要考虑一些问题", score: 0},
      {type: 0, question: "根据以下信息回答问题3", img: null, answer: "A", score: 5},
    ];
    this.tests = [
      {id: 1, name: "张三", url: "/", date: "2020/12/01", no: "3180100000", data: data},
      {id: 2, name: "李四", url: "/", date: "2020/12/02", no: "3180100000", data: data},
      {id: 3, name: "王五", url: "/", date: "2020/12/03", no: "3180100000", data: data},
    ]
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

    changeActivateTest(current) {
      // console.log(current.id)
      this.activeTest = current.id;
      this.testObj = this.getTestObj(current.id);
    },

    getTestObj(id) {
      for (let i of this.tests) {
        if (i.id === id) return i;
      }
      return null;
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