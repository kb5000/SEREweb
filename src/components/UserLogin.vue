<template>
  <div class="gridCommon">
    <el-container :style="{'text-align':'center'}" style="text-align:center;display: flex;
        align-items: center;
        justify-content: center;">
    <el-header :style="{ 'font-size': '30px', 'text-align': 'center' }">
      登录
    </el-header>
    <el-divider></el-divider>
    <el-main  style="text-align:center;  display: flex;
        align-items: center;
        justify-content: center;">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-row :gutter="15" >
          <el-form-item label="用户名" prop="username" :style="{'margin-top':'30px'}">
            <el-input
              v-model="formData.username"
              placeholder="请输入用户名"
              clearable
              :style="{ width: '90%'}"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :style="{'margin-top':'30px'}">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              :maxlength="18"
              clearable
              show-password
              :style="{ width: '90%' }"
            ></el-input>
          </el-form-item>
          <el-row :style="{'margin-top':'30px'}">
            <el-checkbox :style="{ float: 'left' }" v-model="rememberMe"
              >记住我</el-checkbox
            >
            <el-link
              :style="{ float: 'right' }"
              type="primary"
              href="/User/ResetPassword/EmailVerify"
              >忘了密码？</el-link
            >
          </el-row>
        </el-row >
        <el-form-item size="large" style="margin-top:30px;text-align:center">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="goToRegisterPage">去注册</el-button>
        </el-form-item>
      </el-form>
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
      rememberMe: false,
      formData: {
        username: undefined,
        password: undefined,
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goToRegisterPage() {
      this.$router.push("/User/Register");
    },
    login() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
  },
};
</script>
<style scoped>
.postButton {
  height: 30px;
  width: 50px;
}
</style>
