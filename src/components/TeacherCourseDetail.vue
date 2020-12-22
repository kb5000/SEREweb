教师班级详情页
管理课程，管理学生，上传课件，添加作业，添加小测（可另开一页）
添加作业可以选择是个人还是分组，是否支持互评

<template>
  <div class="page">
    <div class="head">
    </div>
    <div class="content">
      <el-row :gutter="10" class="gridCommon">
        <el-row><el-col :span="24" class="bigFont">{{courseName}} 课程简介</el-col></el-row>
        <el-row class="cardWrap">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入"
            v-model="courseInfo"
          >
          </el-input
        ></el-row>
        <el-row class="cardWrap">
          <el-col :span="4">
            <el-image
              :src="courseImg"
              style="width: 100px; height: 100px"
              :fit="fill"
            >
            </el-image>
          </el-col>
          <el-col :span="20">
            <el-button style="float: right; padding: 3px 0" type="success">
              更新课程简介
            </el-button>
          </el-col>
        </el-row>
      </el-row>
      <el-row :gutter="10" class="gridCommon">
        <el-col :span="24">
          <el-row>
            <el-col :span="8" class="bigFont">管理 {{courseName}} 课程资源</el-col>
            <el-col :span="16">
              <el-select
                v-model="condition"
                :placeholder="conditions[0].label"
                style="float: right"
              >
                <el-option
                  v-for="item in conditions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="gridCommon">
            <span class="normalFont">为以下选中的班级上传文件</span>
            <el-row>
              <div v-for="i in classes" :key="i.id">
                <el-row gutter="5" class="gridSmall">
                  <el-col :span="4">{{ i.name }}</el-col>
                  <el-col :span="4">{{ i.time }}</el-col>
                  <el-col :span="4">学生：{{ i.stuNum }}人</el-col>
                  <el-col :span="5">
                    教师：
                    <el-dropdown>
                      <span class="el-dropdown-link">
                        {{ teachersOfClass[i.id][0].name }}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <div v-for="k in teachersOfClass[i.id]" :key="k.id">
                          <el-dropdown-item>{{ k.name }}</el-dropdown-item>
                        </div>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                  <el-col :span="5">
                    助教：
                    <el-dropdown>
                      <span class="el-dropdown-link">
                        {{ assitantsOfClass[i.id][0].name }}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <div v-for="k in assitantsOfClass[i.id]" :key="k.id">
                          <el-dropdown-item>{{ k.name }}</el-dropdown-item>
                        </div>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                  <el-col :span="2">
                    <el-checkbox v-model="i.checked" style="float: right"
                      >选择</el-checkbox
                    >
                  </el-col>
                </el-row>
              </div>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  icon="el-icon-plus"
                >
                  添加文件
                </el-button>
              </el-col>
            </el-row>
          </el-row>
          <el-row class="gridCommon">
            <span class="normalFont">课程资源</span>
            <el-col :span="24">
              <el-row>
                <div v-for="i in filesForCourse" :key="i.id">
                  <el-row gutter="2" class="gridMidium">
                    <el-col :span="4">{{ i.name }}</el-col>
                    <el-col :span="8">
                      分发：
                      <el-dropdown size="small" trigger="click">
                        <el-button size="small" type="primary">
                          班级
                          <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                          <div v-for="k in classesHaveFile[i.id]" :key="k.id">
                            <el-dropdown-item style="width: 100px">
                              <span>{{ k.name }}</span>
                              <el-button
                                style="
                                  float: right;
                                  padding: 2px 0;
                                  color: red;
                                  margin: 2px;
                                "
                                type="text"
                                icon="el-icon-delete"
                                circle
                              ></el-button>
                            </el-dropdown-item>
                            <el-dropdown-item style="width: 100px" divided>
                              <el-button
                                style="float: left; padding: 2px 0"
                                type="text"
                                icon="el-icon-plus"
                                circle
                                @click="dialogVisible = true"
                                >添加分发班级
                              </el-button>
                            </el-dropdown-item>
                          </div>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-col>
                    <el-col :span="4">{{ i.size }}</el-col>
                    <el-col :span="3">
                      <span></span>
                    </el-col>
                    <el-col :span="1">
                      <el-button
                        style="float: right; padding: 2px 0"
                        type="text"
                        icon="el-icon-delete"
                        circle
                      >
                      </el-button>
                    </el-col>
                    <el-col :span="1">
                      <el-button
                        style="float: right; padding: 2px 0"
                        type="text"
                        icon="el-icon-download"
                        circle
                      >
                      </el-button>
                    </el-col>
                    <el-col :span="1">
                      <el-button
                        style="float: right; padding: 2px 0"
                        type="text"
                        icon="el-icon-view"
                        circle
                      >
                      </el-button>
                    </el-col>
                  </el-row>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="添加分发班级" :visible.sync="dialogVisible">
      <el-row class="gridCommon">
        <span class="normalFont"
          >为 {{ filesForCourse[selectClassId].name }} 添加要分发的班级</span
        >
        <el-row>
          <div v-for="i in classes" :key="i.id">
            <el-row gutter="5" class="gridSmall">
              <el-col :span="4">{{ i.name }}</el-col>
              <el-col :span="4">{{ i.time }}</el-col>
              <el-col :span="4">学生：{{ i.stuNum }}人</el-col>
              <el-col :span="5">
                教师：
                <el-dropdown>
                  <span class="el-dropdown-link">
                    {{ teachersOfClass[i.id][0].name }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <div v-for="k in teachersOfClass[i.id]" :key="k.id">
                      <el-dropdown-item>{{ k.name }}</el-dropdown-item>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
              <el-col :span="5">
                助教：
                <el-dropdown>
                  <span class="el-dropdown-link">
                    {{ assitantsOfClass[i.id][0].name }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <div v-for="k in assitantsOfClass[i.id]" :key="k.id">
                      <el-dropdown-item>{{ k.name }}</el-dropdown-item>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
              <el-col :span="2">
                <el-checkbox v-model="i.checked" style="float: right"
                  >选择</el-checkbox
                >
              </el-col>
            </el-row>
          </div>
        </el-row>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div class="tail"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TeacherCourseDetail",
  data() {
    return {
      classes: [], // 本课程下所有班级
      files: [], // 该教师拥有的所有资源文件
      conditions: [], // 筛选条件：班级开课时间
      teachersOfClass: [[]], // 班级.教师
      assitantsOfClass: [[]], // 班级.助教
      filesForCourse: [], // 班级.资源文件
      classesHaveFile: [[]], // 资源文件.班级
      condition: "",
      courseId: "",
      courseName: "",
      courseInfo: "好课啊好课！",
      courseImg:
        "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      selectClassId: 0,
    };
  },

  mounted() {
    this.courseName = "微积分（甲）1";
      (this.classes = [
        {
          id: 0,
          name: "周一678",
          time: "2020-2021秋冬",
          stuNum: 42,
          checked: false,
        },
        {
          id: 1,
          name: "周三345",
          time: "2020-2021秋冬",
          stuNum: 35,
          checked: false,
        },
      ]);
    this.teachersOfClass = [
      [
        { id: 0, name: "许可越" },
        { id: 1, name: "马梓睿" },
      ],
      [
        { id: 0, name: "李保宏" },
        { id: 1, name: "赖诚" },
        { id: 2, name: "吉庆雄" },
      ],
    ];
    this.assitantsOfClass = [
      [
        { id: 0, name: "a" },
        { id: 1, name: "b" },
      ],
      [
        { id: 0, name: "c" },
        { id: 1, name: "d" },
        { id: 2, name: "e" },
      ],
    ];
    this.conditions = [
      { value: "2020-2021秋冬", label: "进行中" },
      { value: "2019-2020春夏", label: "2019-2020春夏" },
      { value: "2019-2020秋冬", label: "2019-2020秋冬" },
    ];
    this.filesForCourse = [
      { id: 0, name: "ch1.pdf", size: "1MB" },
      { id: 1, name: "ch2.pdf", size: "2KB" },
    ];
    this.classesHaveFile = [
      [{ id: 0, name: "周三345" }],
      [{ id: 1, name: "周一678" }],
    ];
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
.gridSmall {
  border: 1px solid #d3d3d3;
  margin: 3px;
  padding: 2px;
  background-color: white;
  font-size: 14px;
}
.gridMidium {
  border: 1px solid #d3d3d3;
  margin: 3px;
  padding: 10px;
  background-color: white;
  font-size: 16px;
}
</style>