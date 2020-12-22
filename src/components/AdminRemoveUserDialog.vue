删除用户的时候出现的对话框

<template>
  <div>
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="删除用户" :visible.sync="Visible">
          <el-row :gutter="10">
      <el-col :span="8">
        <div class="bigFont gridCommon titleGrid">
          <div style="text-align: center;">
          <el-avatar :size="150" :src="icon" ></el-avatar>
          </div>
          <div :style="{'text-align':'center'}">{{username}}</div>
        </div>
      </el-col>
            <el-col :span="16">
        <div class="bigFont gridCommon">
          基本信息
          <el-divider></el-divider>
          <el-row>
            <el-col span="8">
              uid
            </el-col>
            <el-col span="16">
              <span>{{this.uid}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              用户名
            </el-col>
            <el-col span="8">
              <span>{{this.username}}</span>
            </el-col>
            <el-col span="8">  
              <el-button circle class="positionRight" icon="el-icon-edit" type="primary" @click="changeUsername"></el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              手机号
            </el-col>
            <el-col span="8">
              <span>{{this.phone}}</span>     
            </el-col>         
            <el-col span="8">
              <el-button circle class="positionRight" icon="el-icon-edit" type="primary" @click="changePhone"></el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              邮箱
            </el-col>
            <el-col span="8">
              <span>{{this.email}}</span>
            </el-col>
            <el-col span="8">              
              <el-button circle class="positionRight" icon="el-icon-edit" type="primary" @click="changeEmail"></el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              密码
            </el-col>
            <el-col span="16">
              <el-button type="primary" @click="changePassword">修改密码</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="danger" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  components: {},
  props: ['userData'],
  data() {
    return {
        Visible:false,
        username: undefined,
        password: undefined,
        password_confirm: undefined,
        email: undefined,
  
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {
    },
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.onClose();
      this.Visible=false;
    },
    handleConfirm() {
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
