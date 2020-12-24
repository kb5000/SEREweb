管理员页
增加用户（以及教师身份），删除用户，添加班级，班级批量导入学生、删除学生，班级设置教师助教，发布通知
教师身份可以创建课程和班级，课程是班级的容器，仅此而已
课程：{name: "", classIDs: [1, 2, 3]}
班级：{ID: 1, studentIDs: [], ...}

<template>
  <div class="page">
    <div class="head"></div>
    <div class="content">
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="课程名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="班级号">
            <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button>取消</el-button>
        </el-form-item>
          <el-table
              :data="tableData"
              stripe
              style="width: 100%">
              <el-table-column
                prop="number"
                label="学号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="major"
                label="专业">
              </el-table-column>
            </el-table>
        </el-form>   
    </div>
    <div class="tail">
    </div>
  </div>
</template>

<script>
  export default {
  name: 'AdminCourseStudentManagement',
    data() {
      return {
        form: {
          name: '',
          id:'',
          type: [],
          resource: '',
        },
         tableData: [{
          number: '318XXXXXXX',
          name: '王小虎',
          major: '软件工程'
        }, {
          number: '318XXXXXXX',
          name: '李小龙',
          major: '计算机科学与技术'
        }, {
          number: '318XXXXXXX',
          name: '段小希',
          major: '软件工程'
        },{
          number: '318XXXXXXX',
          name: '张小林',
          major: '计算机科学与技术'
        },{
          number: '318XXXXXXX',
          name: '王小虎',
          major: '软件工程'
        }, {
          number: '318XXXXXXX',
          name: '李小龙',
          major: '计算机科学与技术'
        }, {
          number: '318XXXXXXX',
          name: '段小希',
          major: '软件工程'
        },{
          number: '318XXXXXXX',
          name: '张小林',
          major: '计算机科学与技术'
        },{
          number: '318XXXXXXX',
          name: '王小虎',
          major: '软件工程'
        }, {
          number: '318XXXXXXX',
          name: '李小龙',
          major: '计算机科学与技术'
        }, {
          number: '318XXXXXXX',
          name: '段小希',
          major: '软件工程'
        },{
          number: '318XXXXXXX',
          name: '张小林',
          major: '计算机科学与技术'
        },{
          number: '318XXXXXXX',
          name: '王小虎',
          major: '软件工程'
        }, {
          number: '318XXXXXXX',
          name: '李小龙',
          major: '计算机科学与技术'
        }, {
          number: '318XXXXXXX',
          name: '段小希',
          major: '软件工程'
        },{
          number: '318XXXXXXX',
          name: '张小林',
          major: '计算机科学与技术'
        }]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>
.page {
  position: relative;
  width: 80%;
  left: 10%;
  background-color: white;
}


</style>