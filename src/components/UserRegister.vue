<template>
  <div class="gridCommon">
    <el-container style="text-align:center;display: flex;
        align-items: center;
        justify-content: center;">
    <el-header :style="{'font-size':'30px','text-align':'center'}">
      注册
    </el-header>
        <el-divider></el-divider>
    <el-main style="text-align:center; display: flex;
        align-items: center;
        justify-content: center;">
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px" style="width=800px">
      <el-row :gutter="15">
        <el-form-item label="学工号" prop="id">
          <el-input v-model="formData.id" placeholder="小于10位数字" clearable :style="{width: '70%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="formData.username" placeholder="小于18位的汉字、英文字母、数字、下划线组合" clearable :style="{width: '70%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="6-18位" :maxlength="18" clearable show-password
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
          <el-input v-model="formData.phone" placeholder="11位手机号码" clearable :style="{width: '70%'}">
          </el-input>
        </el-form-item>
      </el-row>
      <el-form-item size="large" style="text-align:center">
        <el-button type="primary" @click="submitForm">注册</el-button>
      </el-form-item>
    </el-form>
        </el-main>
    </el-container>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        id: null,
        username: null,
        password: null,
        password_confirm: null,
        email: null,
        phone: null,
      },
      rules: {
        id: [{
          required: true,
          message: '请输入学工号',
          trigger: 'blur'
        }],
        username: [{
          required: true,
          message: '请输入姓名',
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
        if (!valid) return false;
        let user = {
          id: this.formData.id,
          name: this.formData.username,
          password: this.formData.password,
          email: this.formData.email,
          phone: this.formData.phone,
          state: 1,
        }
        axios.post('/api', 'method=get&key=user.' + this.formData.id).then(res => {
          if (res.data !== null) {
            this.$message.error('学工号已存在')
          } else {
            axios.post('/api', 
              "method=setj&key=user." + this.formData.id + "&val=" + encodeURIComponent(JSON.stringify(user)))
              .then(() => {
                this.$emit("update-user");
              })
            this.$message('注册成功，请登录')
            this.$router.push({path: '/UserLogin'})
          }
        })
        // TODO 提交表单
      })
    },
  }
}

</script>
<style scoped>


</style>
