<template>
  <div class="gridCommon">
    <el-container>
    <el-header :style="{'font-size':'30px','text-align':'center'}">
      密码重置验证
    </el-header>
        <el-divider></el-divider>
  <el-main class="center-block" style="text-align:center;width:60%">
    <el-row>请输入您在注册时使用的验证邮箱</el-row>
    <el-row>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium"  :style="{'margin-top':'50px','text-align':'center'}">
      <el-row :gutter="16" style="text-align:center">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入您在注册时使用的邮箱" clearable
            :style="{width: '70%'}"></el-input>
        </el-form-item>
      </el-row>
      <el-row style="text-align:right">
      <el-link>尝试其他验证方法</el-link>
      </el-row>
      <el-form-item size="large" style="text-align:center">
        <el-button type="primary" @click="submitForm">发送验证邮件</el-button>
      </el-form-item>
    </el-form>
        </el-row>
    </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      background_url:require('../assets/background.png'),
      formData: {
        email: undefined,
      },
      rules: {
        email: [{
          required: true,
          message: '请输入您在注册时使用的邮箱',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
  }
}

</script>
<style scoped>
.center-block {
  width: 100%;
    margin: 0 auto;
}
.header{
  color: white;
    background-color: white;
}
</style>