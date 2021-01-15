管理员页
增加用户（以及教师身份），删除用户，添加班级，班级批量导入学生、删除学生，班级设置教师助教，发布通知
教师身份可以创建课程和班级，课程是班级的容器，仅此而已
课程：{name: "", classIDs: [1, 2, 3]}
班级：{ID: 1, studentIDs: [], ...}

<template>
  <div class="page">
    <div class="head"></div>
    <div class="gridCommon">
        <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="课程名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="管理教师ID">
            <el-input v-model="form.teacher"></el-input>
        </el-form-item>
        <!-- <el-form-item label="班级号">
            <el-input v-model="form.id"></el-input>
        </el-form-item> -->
        <el-form-item label="课程类别">
            <el-select v-model="form.category" placeholder="请选择课程类别">
            <el-option label="专业课" :value="true"></el-option>
            <el-option label="通识课" :value="false"></el-option>
            </el-select>
        </el-form-item>
        <!-- <el-form-item label="开课时间">
            <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="结课时间">
            <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item> -->
        <el-form-item label="仅本专业">
            <el-switch v-model="form.only"></el-switch>
        </el-form-item>
        <el-form-item label="课程介绍">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即添加</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>   
    </div>
    <div class="tail">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
  name: 'AdminAddCourse',
    data() {
      return {
        form: {
          name: '',
          id:'',
          teacher:'',
          category: '',
          // date1: '',
          // date2: '',
          only: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        let out = {
          name: this.form.name,
          id: this.$uuid.v4(),
          isMajor: this.form.category,
          // startDate: this.form.date1,
          // endDate: this.form.date2,
          thisMajor: this.form.only,
          description: this.form.desc,
          teacher: this.form.teacher
        }
        axios.post('/api', 'method=setj&key=course.' + out.id + "&val=" + encodeURIComponent(JSON.stringify(out)))
          .then(() => {
            alert("添加课程成功，课程号为" + out.id);
          })
      }
    }
  }
</script>

<style scoped>



</style>