教师班级详情页
管理课程，管理学生，上传课件，添加作业，添加小测（可另开一页）
添加作业可以选择是个人还是分组，是否支持互评

<template>
  <div class="page">
    <div class="head"></div>
    <div class="content">
      <el-row :gutter="10" class="gridCommon">
        <el-row
          ><el-col :span="24" class="bigFont"
            >{{ courseName }} 课程简介</el-col
          ></el-row
        >
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
            <el-upload
              class="avatar-uploader"
              action="/data/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="courseImg" :src="courseImg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
          <el-col :span="20">
            <el-button style="float: right; padding: 3px 0" type="success" @click="updateCourseDetail">
              更新课程简介
            </el-button>
          </el-col>
        </el-row>
      </el-row>
      <el-row :gutter="10" class="gridCommon marginCommon">
        <el-col :span="24">
          <el-row>
            <el-col :span="8" class="bigFont"
              >管理 {{ courseName }} 课程资源</el-col
            >
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
          <el-row class="gridCommon marginCommon">
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
                        {{ i.teacher[0].name }}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <div v-for="k in i.teacher" :key="k.id">
                          <el-dropdown-item>{{ k.name }}</el-dropdown-item>
                        </div>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                  <el-col :span="5">
                    助教：
                    <el-dropdown>
                      <span class="el-dropdown-link">
                        {{ i.ta[0].name }}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <div v-for="k in i.ta" :key="k.id">
                          <el-dropdown-item>{{ k.name }}</el-dropdown-item>
                        </div>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                  <el-col :span="2">
                    <!-- <el-checkbox v-model="i.checked" style="float: right"
                      >选择</el-checkbox
                    > -->
                    <el-button
                      style="float: right; padding: 3px 0"
                      type="text"
                      icon="el-icon-plus"
                      @click="onFileManageButtonClick(i)"
                    >
                      管理文件
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </el-row>
            <el-row>
              <el-col :span="24">
              </el-col>
            </el-row>
          </el-row>
          <el-row class="gridCommon marginCommon">
            <span class="normalFont">你的资源</span>
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
                                @click="dialogVisibleClassDeliver = true"
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
    <el-dialog title="添加分发班级" :visible.sync="dialogVisibleClassDeliver">
      <el-row class="gridCommon">
        <span class="normalFont"
          >为 {{ filesForCourse[selectClassId].name }} 添加要分发的班级</span
        >
        <div v-for="i in classes" :key="i.id">
          <el-row gutter="5" class="gridSmall">
            <el-col :span="4">{{ i.name }}</el-col>
            <el-col :span="4">{{ i.time }}</el-col>
            <el-col :span="4">学生：{{ i.stuNum }}人</el-col>
            <el-col :span="5">
              教师：
              <el-dropdown>
                <span class="el-dropdown-link">
                  {{ i.teacher[0].name }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div v-for="k in i.teacher" :key="k.id">
                    <el-dropdown-item>{{ k.name }}</el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="5">
              助教：
              <el-dropdown>
                <span class="el-dropdown-link">
                  {{ i.ta[0].name }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div v-for="k in i.ta" :key="k.id">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleClassDeliver = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleClassDeliver = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="资源管理" :visible.sync="dialogVisibleFile">
      <el-row class="gridCommon">
        <span class="normalFont">为 {{ currentClass ? currentClass.name : "" }} 添加文件</span>
        <br/>
        <br/>
        <el-row>
          <el-table :data="currentClass.file" height="200" border style="width: 100%" @selection-change="selectionChange">
            <el-table-column prop="" label="选择" width="50" type="selection">
            </el-table-column>
            <el-table-column prop="name" label="文件名">
            </el-table-column>
            <el-table-column prop="size" label="动作" width="70">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="downloadFile(scope.row)">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-upload action="/data" :on-success="handleFileUpload" :file-list="fileList">
              <el-button type="text" icon="el-icon-plus">上传本地文件</el-button>
            </el-upload>
          </el-col>
          <el-col :span="5">
            <el-button type="text" icon="el-icon-delete" @click="handleFileRemove">删除选中文件</el-button>
          </el-col>
        </el-row>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleFile = false">取 消</el-button>
        <el-button type="primary" @click="updateClassFile"
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
      uploadFile: "",
      selectClassId: 0,
      dialogVisibleClassDeliver: false,
      dialogVisibleFile: false,
      currentClass: null,
      fileList: [],
      selected: [],
    };
  },

  mounted() {
    this.courseName = "微积分（甲）1";
    this.currentClass = {file: []};
    // this.classes = [
    //   {
    //     id: 0,
    //     name: "周一678",
    //     time: "2020-2021秋冬",
    //     stuNum: 42,
    //     checked: false,
    //   },
    //   {
    //     id: 1,
    //     name: "周三345",
    //     time: "2020-2021秋冬",
    //     stuNum: 35,
    //     checked: false,
    //   }
    // ];
    this.files = [
      { id: 0, name: "ch1.pdf", size: "1MB", checked: false },
      { id: 1, name: "ch2.pdf", size: "2KB", checked: false },
      { id: 2, name: "ch3.pdf", size: "1MB", checked: false },
      { id: 3, name: "ch4.pdf", size: "2KB", checked: false },
    ];
    // this.teachersOfClass = [
    //   [
    //     { id: 0, name: "许可越" },
    //     { id: 1, name: "马梓睿" },
    //   ],
    //   [
    //     { id: 0, name: "李保宏" },
    //     { id: 1, name: "赖诚" },
    //     { id: 2, name: "吉庆雄" },
    //   ],
    // ];
    // this.assitantsOfClass = [
    //   [
    //     { id: 0, name: "a" },
    //     { id: 1, name: "b" },
    //   ],
    //   [
    //     { id: 0, name: "c" },
    //     { id: 1, name: "d" },
    //     { id: 2, name: "e" },
    //   ],
    // ];
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

    axios.post('/api', 'method=get&key=course.' + this.getQueryVariable('id')).then(res => {
      this.courseName = res.data.name;
      this.courseInfo = res.data.description;
      this.courseImg = (typeof(res.data.img) !== 'undefined' ? res.data.img : "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png");
    })

    axios.post('/api', 'method=get&key=class').then(res => {
      let courseID = this.getQueryVariable('id');
        console.log(res);
      for (let i in res.data) {
        if (res.data[i].course === courseID) {
          let j = res.data[i];
          let arr = []
          for (let k in j.teacher) {
            arr.push({id: k, name: j.teacher[k]})
          }
          j.teacher = arr;
          let arr2 = []
          for (let k in j.ta) {
            arr2.push({id: k, name: j.ta[k]})
          }
          j.ta = arr2;
          let num = 0;
          // eslint-disable-next-line no-unused-vars
          for (let k in j.student) {
            num++;
          }
          j.stuNum = num;
          j.checked = false;
          this.classes.push(j)
        }
      }
      // console.log(JSON.stringify(this.classes))
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

    onPostButtonClick() {
      axios({
        method: "get",
        url: "/api?method=add",
      });
    },

    onFileManageButtonClick(classData) {
      this.currentClass = classData;
      if (typeof(this.currentClass.file) === 'undefined') this.currentClass.file = [];
      this.dialogVisibleFile = true
    },

    handleFileUpload(dat, file) {
      if (typeof(this.currentClass.file) === 'undefined') this.currentClass.file = [];
      this.currentClass.file.push({
        name: file.name,
        url: dat,
      })
      // console.log(dat);
      // console.log(file);
    },

    handleFileRemove() {
      for (let i of this.selected) {
        for (let j = 0; j < this.currentClass.file.length; j++) {
          if (i.url == this.currentClass.file[j].url) {
            this.currentClass.file.splice(j, 1);
            break;
          }
        }
      }
      this.selected = []
      this.fileList = []
    },

    selectionChange(data) {
      this.selected = data;
    },

    downloadFile(row) {
      window.open('/data/' + row.url);
    },

    updateClassFile() {
      axios.post('/api', 'method=setj&key=class.' + this.currentClass.id + '.file&val=' + 
        encodeURIComponent(JSON.stringify(this.currentClass.file))).then(() => {
          this.dialogVisibleFile = false;
          this.$message.success("上传成功");
        })
    },

    updateCourseDetail() {
      axios.post('/api', 'method=set&key=course.' + this.getQueryVariable('id') + '.detail&val=' + encodeURIComponent(this.courseInfo));
      axios.post('/api', 'method=set&key=course.' + this.getQueryVariable('id') + '.img&val=' + encodeURIComponent(this.courseImg)).then(() => {
        this.$message.success("更新成功")
      });
    },

    handleAvatarSuccess(res) {
      this.courseImg = '/data/' + res;
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped>
.page {
  /* position: relative;
  width: 80%;
  left: 10%;
  background-color: white; */
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>