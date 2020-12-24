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
          <el-form-item label="学工号" prop="id" :style="{'margin-top':'30px'}">
            <el-input
              v-model="formData.id"
              placeholder="请输入学工号"
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
            <el-checkbox :style="{ float: 'left' , left: '50px'}" v-model="rememberMe"
              >记住我</el-checkbox
            >
            <el-link
              :style="{ float: 'right' }"
              type="primary"
              href="/UserResetPasswordEmailVerify"
              >忘了密码？</el-link
            >
          </el-row>
        </el-row >
        <el-form-item size="large" style="margin-top:30px;text-align:center">
          <el-button type="primary" @click="login" style="position: relative; left: -30px;">登录</el-button>
          <el-button @click="goToRegisterPage">去注册</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    </el-container>
  </div>
</template>
<script>
import axios from 'axios'
import cookies from 'js-cookie'

export default {
  components: {},
  props: [],
  stores: {
    logged: 'state.logged',
    loggedUser: 'state.currentUser'
  },
  data() {
    return {
      rememberMe: false,
      formData: {
        id: "",
        password: "",
      },
      rules: {
        id: [
          {
            required: true,
            message: "请输入学工号",
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
      this.$router.push("/UserRegister");
    },
    login() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        axios.post('/api', "method=get&key=user." + this.formData.id + '.password').then(res => {
          if (res.data === null || res.data !== this.formData.password) {
            this.$message.error("学工号或密码不正确");
          } else {
            this.$message.success("登录成功");
            if (this.rememberMe) {
              cookies.set('user', this.formData.id, {SameSite: "Strict", expires: 7});
            } else {
              cookies.set('user', this.formData.id, {SameSite: "Strict"});
            }
            this.logged = true;
            axios.post('/api', "method=get&key=user." + this.formData.id).then(res => {
              this.loggedUser = res.data;
              // console.log(this.loggedUser)
            })
            this.$router.push('/');
          }
        })
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
