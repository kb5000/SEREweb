学生班级列表页
展示加入的所有班级，班级后面显示课程名，展示未完成作业数和小测数

<template>
  <div class="page">
    <div class="head">

    </div>
    <div class="content">

      <el-row :gutter="10" class="gridCommon">
        <el-col :span="24">
          <el-row>
            <el-col :span="8" class="bigFont">参与的课程与班级</el-col>
            <el-col :span="12">
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
          <div v-for="i in courses" :key="i.id" class="cardWrap">
            <el-row gutter="2">
              <el-card :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                  <el-row>
                    <el-col :span="24">
                      <span class="bigFont">{{ i.name }}</span></el-col
                    >
                    
                  </el-row>
                </div>
                <el-row>
                  <el-col :span="4">
                    <el-image
                      :src="i.img"
                      style="width: 100px; height: 100px"
                      :fit="fill"
                    >
                    </el-image>
                  </el-col>
                  <el-col :span="4" class="bigFont">课程介绍：</el-col>
                  <el-col :span="16">{{ i.info }}</el-col>
                </el-row>
                <div v-for="j in classesOfCourse[i.id]" :key="j.id">
                  <el-row gutter="2" class="cardWrap">
                    <el-col :span="4">{{ j.name }}</el-col>
                    <el-col :span="4">{{ j.time }}</el-col>
                    <el-col :span="4">学生：{{ j.stuNum }}人</el-col>
                    <el-col :span="4">
                      教师：
                      <el-dropdown>
                        <span class="el-dropdown-link">
                          {{ teachersOfClassOfCourse[i.id][j.id][0].name }}
                          <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <div
                            v-for="k in teachersOfClassOfCourse[i.id][j.id]"
                            :key="k.id"
                          >
                            <el-dropdown-item>{{ k.name }}</el-dropdown-item>
                          </div>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-col>
                    <el-col :span="4">
                      助教：
                      <el-dropdown>
                        <span class="el-dropdown-link">
                          {{ assitantsOfClassOfCourse[i.id][j.id][0].name }}
                          <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <div
                            v-for="k in assitantsOfClassOfCourse[i.id][j.id]"
                            :key="k.id"
                          >
                            <el-dropdown-item>{{ k.name }}</el-dropdown-item>
                          </div>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-col>
                    <el-col :span="4">
                      <router-link :to="myHomework">
                        <el-button
                          style="float: right; padding: 3px 0"
                          type="text"
                          icon="el-icon-edit"
                          >查看作业
                        </el-button>
                      </router-link>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-row>
          </div>
        </el-col>
      </el-row>
    
    </div>
    <div class="tail">

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StudentCourseList',
   data() {
    return {
      courses: [], // 该教师参与的所有课程
      classesOfCourse: [[]], // 课程.班级列表
      conditions: [], // 筛选条件：课程下班级的开课时间
      teachersOfClassOfCourse: [[[]]], // 课程.班级.教师名单
      assitantsOfClassOfCourse: [[[]]], // 课程.班级.助教名单
      condition: "",
      addCourse: "",
      courseDetail: "/TeacherCourseDetail",
      manageGroup: "/TeacherManageGroup",
      myHomework: "/StudentHomework",
    };
  },

  mounted() {
    this.courses = [
      {
        id: 0,
        name: "微积分（甲）1",
        info: "微积分是一门好课！",
        img:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 1,
        name: "线性代数",
        info: "线性代数是一门好课！",
        img:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
    ];
    this.classesOfCourse = [
      [
        { id: 0, name: "周一678", time: "2020-2021秋冬", stuNum: 42 },
      ],
      [
        { id: 0, name: "周一12", time: "2020-2021秋冬", stuNum: 42 },
      ],
    ];
    this.teachersOfClassOfCourse = [
      [
        [
          { id: 0, name: "许可越" },
          { id: 1, name: "马梓睿" },
        ],
      ],
      [
        [
          { id: 0, name: "许可越2" },
          { id: 1, name: "马梓睿2" },
        ],
      ],
    ];
    this.assitantsOfClassOfCourse = [
      [
        [
          { id: 0, name: "a" },
          { id: 1, name: "b" },
        ],
      ],
      [
        [
          { id: 0, name: "a2" },
          { id: 1, name: "b2" },
        ],
      ],
    ];
    this.conditions = [
      { value: "2020-2021秋冬", label: "进行中" },
      { value: "2019-2020春夏", label: "2019-2020春夏" },
      { value: "2019-2020秋冬", label: "2019-2020秋冬" },
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
</style>