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
            <el-table-column prop="date"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="marginCommon gridCommon" style="height: 530px">
          <div></div>
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
      homeworkObj: undefined,
    }
  },

  mounted() {
    this.title = "软需一班作业二"
    this.homeworks = [
      {id: 1, name: "张三", url: "/", text: "2345458", date: "2020/12/01"},
      {id: 2, name: "李四", url: "/", text: "2345458", date: "2020/12/01"},
      {id: 3, name: "王五", url: "/", text: "2345458", date: "2020/12/01"},
    ]
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
    },

    getHomeworkObj(id) {
      for (let i of this.homeworks) {
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

  },

}
</script>

<style scoped>


</style>
