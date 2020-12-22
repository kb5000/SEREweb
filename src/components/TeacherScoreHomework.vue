教师批改作业
先下载再批改

<template>
  <div class="page">
    <div class="gridCommon bigFont">{{title}}</div>
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="marginCommon gridCommon">
          <el-table :data="homeworks" border height="530" :show-header="false" highlight-current-row
            v-on:current-change="changeActivateHomework"
          >
            <el-table-column prop="name"></el-table-column>
            <el-table-column prop="no"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="marginCommon gridCommon" style="height: 530px">
          <span v-if="this.homeworkObj !== null">
            <div class="bigFont">
              <span class="stressFontColor">{{homeworkObj.name}}</span>的作业
            </div>
            <div style="margin: 20px 0; height: 30px; position: relative;">
              提交日期：{{homeworkObj.date}} 
              <span v-if="isHomeworkTimeout(homeworkObj.date, due).timeout" style="color: red;">
                (超时{{isHomeworkTimeout(homeworkObj.date, due).time}}天)</span>
              <div class="commonButton" style="display: inline-block; margin: 0 10px;">下载</div>
            </div>
            得分：<input v-model="currentScore" type="number" min="0" max="100"/><br/><br/>
            评语：<br/><br/>
            <textarea class="mainTextArea"></textarea>
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
  name: 'TeacherScoreHomework',
  data() {
    return {
      title: "",
      homeworks: [],
      activeHomework: 0,
      homeworkObj: null,
      due: "",
      currentScore: 0,
    }
  },

  mounted() {
    this.title = "软需一班作业二"
    this.homeworks = [
      {id: 1, name: "张三", url: "/", text: "2345458", date: "2020/12/01", no: "3180100000"},
      {id: 2, name: "李四", url: "/", text: "2345458", date: "2020/12/02", no: "3180100000"},
      {id: 3, name: "王五", url: "/", text: "2345458", date: "2020/12/03", no: "3180100000"},
    ]
    this.due = "2020/12/02";
    this.activeHomework = 1;
    this.homeworkObj = null;
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

    changeActivateHomework(current) {
      this.activeHomework = current.id;
      this.homeworkObj = this.getHomeworkObj(current.id);
      // console.log(this.homeworkObj)
    },

    getHomeworkObj(id) {
      for (let i of this.homeworks) {
        if (i.id === id) return i;
      }
      return null;
    },

    isHomeworkTimeout(date, due) {
      let dateD = new Date(date);
      let dueD = new Date(due);
      let millis = dueD.getTime() - dateD.getTime();
      return {timeout: millis < 0, time: parseInt(-millis / 86400000)};
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
