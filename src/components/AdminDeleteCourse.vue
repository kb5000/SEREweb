管理员页
增加用户（以及教师身份），删除用户，添加班级，班级批量导入学生、删除学生，班级设置教师助教，发布通知
教师身份可以创建课程和班级，课程是班级的容器，仅此而已
课程：{name: "", classIDs: [1, 2, 3]}
班级：{ID: 1, studentIDs: [], ...}

<template>
  <div>
    <div class="head"></div>
    <div class="gridCommon">
      <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="班级号">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="open">查询班级</el-button>
        <el-button>取消</el-button>
      </el-form-item>
      </el-form>   
    </div>
    <div class="gridCommon marginCommon">
      <el-form ref="form" :model="form1" label-width="80px">
      <el-form-item label="课程名">
        <el-input v-model="form1.id"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="open1">查询课程</el-button>
        <el-button>取消</el-button>
      </el-form-item>
      </el-form>   
    </div>
    <div class="tail">
    </div>
  </div>
</template>

<script>
  export default {
  name: 'AdminDeleteCourse',
    data() {
      return {
        form: {
          id:'',
          type: [],
          resource: '',
          desc: ''
        },
        form1: {
          id:'',
          type: [],
          resource: '',
          desc: ''
        },
      }
    },
    methods: {
      open() {
        this.$alert('课程简介', '课程详情', {
          confirmButtonText: '确定删除',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      open1() {
        this.$alert('课程简介', '课程详情', {
          confirmButtonText: '确定删除',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    }
  }
</script>

<style scoped>
</style>