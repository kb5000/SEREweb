管理员页
增加用户（以及教师身份），删除用户，添加班级，班级批量导入学生、删除学生，班级设置教师助教，发布通知
教师身份可以创建课程和班级，课程是班级的容器，仅此而已
课程：{name: "", classIDs: [1, 2, 3]}
班级：{ID: 1, studentIDs: [], ...}

<template>
  <div class="">
    <div class="head"></div>
    <div class="gridCommon">
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="班级号">
            <el-input v-model="form.courseid"></el-input>
        </el-form-item>
        <el-form-item label="教师ID">
            <el-input v-model="form.teacherid"></el-input>
        </el-form-item>
        <el-form-item label="设置角色">
            <el-select v-model="form.category" placeholder="请设置教师角色">
            <el-option label="教师" :value="true"></el-option>
            <el-option label="非教师" :value="false"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即设置</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>   
    </div>
    <div class="tail">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
  name: 'AdminSetTeacherRole',
    data() {
      return {
        form: {
          courseid:'',
          teacherid:'',
          category: false,
          type: [],
          resource: '',
        }
      }
    },
    methods: {
      onSubmit() {
        axios.post('/api', 'method=get&key=class.' + this.form.courseid).then(res => {
          if (res.data == null) {
            this.$message.error("没有这个班级");
            return;
          } else {
            if (this.form.category) {
              axios.post('/api', 'method=setj&key=class.' + this.form.courseid + '.teacher.' + this.form.teacherid + '&val=true');
            } else {
              axios.post('/api', 'method=erase&key=class.' + this.form.courseid + '.teacher.' + this.form.teacherid);
            }
          }
        })
        // console.log('submit!');
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