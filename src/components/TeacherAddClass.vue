教师、助教添加班级页
添加一个班级，也可以为班级指定一个课程

<template>
  <div class="page">
    <div class="head"></div>
    <div class="content">
      <el-row :gutter="10" class="gridCommon">
        <el-row
          ><el-col :span="24" class="bigFont"
            >{{ courseName }} 班级信息</el-col
          ></el-row
        >
        <el-row class="cardWrap">
          <el-col :span="24">
            <el-form
              ref="form"
              :model="form"
              label-width="80px"
              class="gridCommon"
            >
              <el-form-item label="班级名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="开课时间">
                <el-select
                  v-model="form.time"
                  :placeholder="classTimeList[0].label"
                  style="float: left"
                >
                  <el-option
                    v-for="item in classTimeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="教师" class="gridCommon">
                <el-row>
                  <el-table
                    :data="form.teachers"
                    height="200"
                    border
                    style="width: 100%"
                  >
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="uid" label="学工号" width="180">
                    </el-table-column>
                    <el-table-column prop="" label="操作">
                      <el-button
                        style="float: right; padding: 2px 0; color: red"
                        type="text"
                        icon="el-icon-delete"
                        circle
                      >
                      </el-button>
                    </el-table-column> </el-table
                ></el-row>
                <el-row>
                  <el-col :span="12">
                    <el-input
                      v-model="inputTeacher.uid"
                      placeholder="请输入学工号"
                    ></el-input>
                  </el-col>
                  <el-col :span="12">
                    <el-button
                      style="float: left; padding: 2px 2"
                      type="text"
                      icon="el-icon-plus"
                      @click="onPlusButtonClick(0)"
                    >
                      添加教师
                    </el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="助教" class="gridCommon">
                <el-row>
                  <el-table
                    :data="form.assitants"
                    height="200"
                    border
                    style="width: 100%"
                  >
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="uid" label="学工号" width="180">
                    </el-table-column>
                    <el-table-column prop="" label="操作">
                      <el-button
                        style="float: right; padding: 2px 0; color: red"
                        type="text"
                        icon="el-icon-delete"
                        circle
                      >
                      </el-button>
                    </el-table-column> </el-table
                ></el-row>
                <el-row>
                  <el-col :span="12">
                    <el-input
                      v-model="inputAssistant.uid"
                      placeholder="请输入学工号"
                    ></el-input>
                  </el-col>
                  <el-col :span="12">
                    <el-button
                      style="float: left; padding: 2px 2"
                      type="text"
                      icon="el-icon-plus"
                      @click="onPlusButtonClick(1)"
                    >
                      添加助教
                    </el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="学生" class="gridCommon">
                <el-row>
                  <el-table
                    :data="form.students"
                    height="200"
                    border
                    style="width: 100%"
                  >
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="uid" label="学工号" width="180">
                    </el-table-column>
                    <el-table-column prop="" label="操作">
                      <el-button
                        style="float: right; padding: 2px 0; color: red"
                        type="text"
                        icon="el-icon-delete"
                        circle
                      >
                      </el-button>
                    </el-table-column> </el-table
                ></el-row>
                <el-row>
                  <el-col :span="12">
                    <el-input
                      v-model="inputStudent.uid"
                      placeholder="请输入学工号"
                    ></el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-button
                      style="float: left; padding: 2px 2"
                      type="text"
                      icon="el-icon-plus"
                      @click="onPlusButtonClick(2)"
                    >
                      添加学生
                    </el-button>
                  </el-col>
                  <el-col :span="6">
                    <el-button
                      style="float: left; padding: 2px 2"
                      type="primary"
                      icon="el-icon-plus"
                    >
                      批量导入学生
                    </el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit"
                  >更新 / 创建</el-button
                >
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-row>
    </div>
    <div class="tail"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TeacherAddClass",
  data() {
    return {
      courseName: "", // 本课程名称
      form: {
        name: "", // 班级名
        time: "", // 开课时间
        teachers: [], // 教师名单
        assitants: [], // 助教名单
        students: [], // 学生名单
      },
      classTimeList: [], // 可选择的开课时间列表
      inputTeacher: "",
      inputAssistant: "",
      inputStudent: "",
    };
  },

  mounted() {
    this.courseName = "微积分（甲）1";
    this.classTimeList = [
      { value: "2020-2021秋冬", label: "进行中" },
      { value: "2019-2020春夏", label: "2019-2020春夏" },
      { value: "2019-2020秋冬", label: "2019-2020秋冬" },
    ];
    this.form.teachers = [{ id: 0, name: "许可越", uid: "3180101000" }];
    this.form.assitants = [{ id: 0, name: "a", uid: "3180101111" }];
    this.form.students = [{ id: 0, name: "潘凯航", uid: "3180101222" }];
    this.inputTeacher = { id: 0, name: "", uid: "" };
    this.inputAssistant = { id: 0, name: "", uid: "" };
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

    onPlusButtonClick(groupType) {
      if (groupType == 0) {
        this.inputTeacher.name = "new";
        this.inputTeacher.id = this.form.teachers.length;
        let isnerted = JSON.parse(JSON.stringify(this.inputTeacher));
        this.form.teachers.push(isnerted);
        this.inputTeacher.uid = "";
      } else if (groupType == 1) {
        this.inputAssistant.name = "new";
        this.inputAssistant.id = this.form.assitants.length;
        let isnerted = JSON.parse(JSON.stringify(this.inputAssistant));
        this.form.teachers.push(isnerted);
        this.inputAssistant.uid = "";
      } else if (groupType == 2) {
        this.inputStudent.name = "new";
        this.inputStudent.id = this.form.students.length;
        let isnerted = JSON.parse(JSON.stringify(this.inputStudent));
        this.form.teachers.push(isnerted);
        this.inputStudent.uid = "";
      }
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