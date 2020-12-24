教师管理学生分组

<template>
  <div class="page">
    <div class="head"></div>
    <div class="content">
      <el-row :gutter="10" class="gridCommon">
        <el-col :span="24">
          <el-row>
            <el-col :span="24" class="bigFont"
              >管理 {{ courseName }} 的分组</el-col
            >
          </el-row>
          <div v-for="i in groups" :key="i.id" class="cardWrap">
            <el-row gutter="2">
              <el-card :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                  <el-row>
                    <el-col :span="2">
                      <span class="bigFont">{{ i.name }}</span></el-col
                    >
                    <el-col :span="18">
                      <el-table
                        :data="studentsOfGroup[i.id]"
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
                              @click.native.prevent="deleteRow(scope.$index, studentsOfGroup[i.id])"
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
                      >
                        删除分组
                      </el-button>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" :offset="2">
                      <el-input
                        v-model="inputStudent.uid"
                        placeholder="请输入学工号"
                      ></el-input>
                    </el-col>
                    <el-col :span="10">
                      <el-button
                        style="float: left; padding: 2px 2"
                        type="text"
                        icon="el-icon-plus"
                        @click="onPlusButtonClick(i.id)"
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
      studentsOfGroup: [[]], // 分组.学生名单
      inputStudent: "",
    };
  },

  mounted() {
    this.courseName = "微积分（甲）1";
    this.groups = [
      { id: 0, name: "第一组", gid: 0 },
      { id: 1, name: "第二组", gid: 1 },
    ];
    this.studentsOfGroup = [
      [
        { id: 0, name: "许可越", uid: "3180101000" },
        { id: 1, name: "许可越2", uid: "3180101001" },
      ],
      [
        { id: 0, name: "潘凯航", uid: "3180101222" },
        { id: 1, name: "潘凯航2", uid: "3180101223" },
      ],
    ];
    this.inputStudent = { id: 0, name: "", uid: "" };
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

    onPostButtonClick() {
      axios({
        method: "get",
        url: "/api?method=add",
      });
    },

    deleteRow(index, rows) {
      rows.splice(index, 1);
    },

    onPlusButtonClick(id) {
      this.inputStudent.name = "new";
      this.inputStudent.id = this.studentsOfGroup[id].length;
      let isnerted = JSON.parse(JSON.stringify(this.inputStudent));
      this.studentsOfGroup[id].push(isnerted);
      this.inputStudent.uid = "";
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