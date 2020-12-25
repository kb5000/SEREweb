教师管理学生分组

<template>
  <div class="page">
    <div class="head"></div>
    <div class="content">
      <el-row :gutter="10" class="gridCommon">
        <el-col :span="24">
          <el-row>
            <el-col :span="17" class="bigFont"
              >管理 {{ courseName }} 的分组</el-col
            >
            <el-col :span="4">
              <el-input size="mini" style="position: relative; top: -2px;" v-model="inputName"/>
            </el-col>
            <el-col :span="3">
              <el-button
                style="position: relative; left: 25px; padding: 3px 0"
                type="primary"
                @click="addGroup"
              >
                添加分组
              </el-button>
            </el-col>
          </el-row>
          <div v-for="(i, idx) in groups" :key="idx" class="cardWrap">
            <el-row gutter="2">
              <el-card :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                  <el-row>
                    <el-col :span="2">
                      <span class="bigFont">{{ i.name }}</span></el-col
                    >
                    <el-col :span="18">
                      <el-table
                        :data="i.students"
                        height="200"
                        border
                        style="width: 100%"
                      >
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="uid" label="学工号" width="180">
                        </el-table-column>
                        <el-table-column prop="" label="操作">
                          <template slot-scope="scope">
                            <el-button
                              style="float: right; padding: 2px 0; color: red"
                              type="text"
                              icon="el-icon-delete"
                              circle
                              @click.native.prevent="deleteRow(scope.$index, i.students)"
                            >
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-col>
                    <el-col :span="4">
                      <el-button
                        style="float: right; padding: 3px 0"
                        type="danger"
                        @click="removeGroup(idx)"
                      >
                        删除分组
                      </el-button>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" :offset="2">
                      <el-input
                        v-model="i.inputStudent.uid"
                        placeholder="请输入学工号"
                      ></el-input>
                    </el-col>
                    <el-col :span="10">
                      <el-button
                        style="float: left; padding: 2px 2"
                        type="text"
                        icon="el-icon-plus"
                        @click="onPlusButtonClick(idx)"
                      >
                        添加学生
                      </el-button>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-row>
          </div>
        </el-col>
        <el-button type="primary" @click="onPostButtonClick" style="display: inline-block; position: relative; left: 45%;">更新 / 创建</el-button>
      </el-row>

    </div>
    <div class="tail"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TeacherManageGroup",
  data() {
    return {
      courseName: "", // 本课程名称
      groups: [], // 本课程下所有分组
      inputName: [],
    };
  },

  mounted() {
    // this.courseName = "微积分（甲）1";
    // this.groups = [
    //   { id: 0, name: "第一组", gid: 0, students: [
    //     { id: 0, name: "许可越", uid: "3180101000" },
    //     { id: 1, name: "许可越2", uid: "3180101001" },
    //   ], inputStudent: {id: 0, name: "", uid: ""} },
    //   { id: 1, name: "第二组", gid: 1, students: [
    //     { id: 0, name: "潘凯航", uid: "3180101222" },
    //     { id: 1, name: "潘凯航2", uid: "3180101223" },
    //   ], inputStudent: {id: 0, name: "", uid: ""} },
    // ];

    axios.post('/api', 'method=get&key=class.' + this.getQueryVariable('class')).then(res => {
      this.courseName = res.data.name
      if (typeof(res.data.groups) !== 'undefined') {
        for (let i of res.data.groups) {
          let students = []
          for (let j in i.student) {
            students.push({
              id: 0, name: i.student[j], uid: j
            })
          }
          this.groups.push({
            id: 0, name: i.name, gid: i.id, students: students,
            inputStudent: {id: 0, name: "", uid: ""}
          })
        }
      }
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

    addGroup() {
      this.groups.push({gid: this.groups.length, id: this.groups.length, name: this.inputName, students: [],
        inputStudent: {id: 0, uid: '', name: ''}});
    },

    removeGroup(idx) {
      this.groups.splice(idx, 1)
    },

    onPostButtonClick() {
      let dat = []
      for (let i of this.groups) {
        let student = {};
        for (let j of i.students) {
          student[j.uid] = j.name;
        }
        dat.push({
          name: i.name,
          id: i.gid,
          student: student
        })
      }
      axios.post('/api', 'method=setj&key=class.' + this.getQueryVariable('class') + '.groups&val=' + 
        encodeURIComponent(JSON.stringify(dat))).then(() => {
          this.$message.success("更新/创建成功");
          setTimeout(() => {this.$router.go(-1)}, 500)
        })
    },

    deleteRow(index, rows) {
      // console.log(rows)
      rows.splice(index, 1);
    },

    onPlusButtonClick(idx) {
      // this.inputStudent.name = "new";
      // this.inputStudent.id = this.studentsOfGroup[idx].length;
      // let isnerted = JSON.parse(JSON.stringify(this.inputStudent));
      // this.studentsOfGroup[idx].push(isnerted);
      // this.inputStudent.uid = "";

      axios.post('/api', 'method=get&key=user.' + this.groups[idx].inputStudent.uid).then(res => {
        if (res.data === null) {
          this.$message.error("该用户不存在");
          return;
        } else {
          this.groups[idx].inputStudent.name = res.data.name;
          let isnerted = JSON.parse(JSON.stringify(this.groups[idx].inputStudent));
          this.groups[idx].students.push(isnerted);
          this.groups[idx].inputStudent.uid = "";
        }
      })
    },
  },
};
</script>

<style scoped>
.page {
  position: relative;
  width: 80%;
  left: 10%;
  background-color: white;
}
.cardWrap {
  margin: 2px;
  padding: 10px;
  background-color: white;
  font-size: 14px;
}
</style>