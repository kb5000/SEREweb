增加一个用户的时候出现的页面

<template>
  <div class="gridCommon">
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="增加用户" :visible.sync="Visible">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-row :gutter="15">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" placeholder="请输入用户名" :maxlength="18" clearable
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
          <el-form-item label="手机号" prop="field112">
            <el-input v-model="formData.field112" placeholder="请输入手机号" :maxlength="11" clearable
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
export default {
  inheritAttrs: false,
  components: {},
  props: [],
  data() {
    return {
      Visible:false,
      formData: {
        username: undefined,
        password: undefined,
        password_confirm: undefined,
        email: undefined,
        field112: undefined,
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
          message: '与密码完全相同',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }],
        field112: [{
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
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.close()
      })
    },
  }
}

</script>
<style>
</style>
