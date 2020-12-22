<template>
  <div class="gridCommon">
    <el-container>
    <el-header :style="{'font-size':'30px','text-align':'center'}">
      密码重置
    </el-header>
    <el-divider></el-divider>
    <el-main style="text-align:center;width:60% display: flex;
        align-items: center;
        justify-content: center;">
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px" style="width=60%;">
      <el-row :gutter="15">
        <el-form-item label="新密码" prop="password_new">
          <el-input v-model="formData.password_new" placeholder="请输入新密码" :maxlength="18" clearable
            show-password :style="{width: '70%'}"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password_confirm">
          <el-input v-model="formData.password_confirm" placeholder="请与密码完全相同" clearable show-password
            :style="{width: '70%'}"></el-input>
        </el-form-item>
      </el-row>
      <el-form-item size="large" style="text-align:center">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
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
      formData: {
        password_new: undefined,
        password_confirm: undefined,
      },
      rules: {
        password_new: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }],
        password_confirm: [{
          required: true,
          message: '请与密码完全相同',
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
.page {
  position: relative;
  width: 80%;
  left: 10%;
  background-color: white;
}

</style>