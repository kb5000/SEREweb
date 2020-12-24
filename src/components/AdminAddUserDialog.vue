增加一个用户的时候出现的页面

<template>
  <div>
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="增加一个用户" :visible.sync="Visible">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-row :gutter="15">
          <el-form-item label="学工号" prop="id">
            <el-input v-model="formData.id" placeholder="请输入学工号" :maxlength="18" clearable
              :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="username">
            <el-input v-model="formData.username" placeholder="请输入姓名" :maxlength="18" clearable
              :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" :maxlength="18" clearable show-password
              :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password_confirm">
            <el-input v-model="formData.password_confirm" placeholder="与密码完全相同" :maxlength="18" clearable
              show-password :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email" placeholder="请输入邮箱" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入手机号" :maxlength="11" clearable
              :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  event: 'update-user',
  inheritAttrs: false,
  components: {},
  props: [],
  data() {
    return {
      Visible:false,
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
          message: '与密码完全相同',
          trigger: 'blur',
        }],
        email: [{
          required: true,
          message: '请输入邮箱',
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
    open(){
      this.Visible = true;
    },
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
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
        axios.post('/api', 
          "method=setj&key=user." + this.formData.id + "&val=" + encodeURIComponent(JSON.stringify(user)))
          .then(() => {
            this.$emit("update-user");
          })
        this.Visible = false;
        this.close()
      })
    },
  }
}

</script>
<style>
</style>
