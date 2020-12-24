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
        <el-form-item label="通知主题">
            <el-input v-model="form.theme"></el-input>
        </el-form-item>
        <el-form-item label="发布对象">
            <el-select v-model="form.object" placeholder="请选择发布对象">
            <el-option label="学生" value="student"></el-option>
            <el-option label="教师" value="teacher"></el-option>
            <el-option label="助教" value="ta"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="定时发送">
            <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
        </el-form-item>
        <el-form-item label="通知内容">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即发布</el-button>
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
  name: 'AdminReleaseNotice',
    data() {
      return {
        form: {
          theme:'',
          object: '',
          date1: '',
          data2:'',
          type: [],
          resource: '',
          desc: ''
        }
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