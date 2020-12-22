删除用户的时候出现的对话框

<template>
  <div>
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="删除用户" :visible.sync="rmVisible">
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
          用户信息
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
              <span>{{username}}</span>
            </el-col>
            <el-col span="8">  
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              手机号
            </el-col>
            <el-col span="8">
              <span>{{phone}}</span>     
            </el-col>         
            <el-col span="8">
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              邮箱
            </el-col>
            <el-col span="8">
              <span>{{email}}</span>
            </el-col>
            <el-col span="8">              
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
  props: ['userDatas'],
  data() {
    return {
        rmVisible:false,
        uid:0,
        username:"",
        email:"",
        phone:""
  
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    open(userData){
        this.uid = userData.uid;
        this.username = userData.username;
        this.email = userData.email;
        this.phone = userData.phone;

    },
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


