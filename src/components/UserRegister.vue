<template>
  <div class="gridCommon">
    <el-header :style="{'font-size':'30px','text-align':'center'}">
      注册
    </el-header>
        <el-divider></el-divider>
        <el-main style="text-align:center;width:60% display: flex;
        align-items: center;
        justify-content: center;">
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-row :gutter="15">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" clearable :style="{width: '70%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" :maxlength="18" clearable show-password
            :style="{width: '70%'}"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password_confirm">
          <el-input v-model="formData.password_confirm" placeholder="与密码完全相同" :maxlength="18" clearable
            show-password :style="{width: '70%'}"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱地址(*@zju.edu.cn)" clearable
            :style="{width: '70%'}"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号" clearable :style="{width: '70%'}">
          </el-input>
        </el-form-item>
      </el-row>
      <el-form-item size="large" style="text-align:center">
        <el-button type="primary" @click="submitForm">注册</el-button>
      </el-form-item>
    </el-form>
        </el-main>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        username: undefined,
        password: undefined,
        password_confirm: undefined,
        email: undefined,
        phone: undefined,
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        password_confirm: [{
          required: true,
          message: '请输入确认密码',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入邮箱地址(*@zju.edu.cn)',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入手机号',
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
