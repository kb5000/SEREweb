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
              学工号
            </el-col>
            <el-col span="16">
              <span>{{this.uid}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              姓名
            </el-col>
            <el-col span="16">
              <span>{{username}}</span>
            </el-col>
            <el-col span="8">  
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              手机号
            </el-col>
            <el-col span="16">
              <span>{{phone}}</span>     
            </el-col>         
            <el-col span="8">
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              邮箱
            </el-col>
            <el-col span="16">
              <span>{{email}}</span>
            </el-col>
            <el-col span="8">              
            </el-col>
          </el-row>
        </div>
      </el-col>

    </el-row>
      <div slot="footer">
        <el-row style="color:red">
            如果执行操作，该用户将无法再登录系统，确定吗？
            <el-button @click="close">取消</el-button>
        <el-button type="danger" @click="handleConfirm">确定</el-button>
        </el-row>

      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  inheritAttrs: false,
  components: {},
  props: ['userDatas'],
  data() {
    return {
        rmVisible:false,
        icon:"",
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
      this.icon = userData.icon;
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
      this.rmVisible=false;
      // this.onClose();
    },
    handleConfirm() {
      axios.post('/api', "method=setj&key=user." + this.uid + ".status&val=-1").then(() => {
        this.$emit("update-user");
        this.close();
      })
      // this.$refs['elForm'].validate(valid => {
      //   if (!valid);
      //   this.close()
      // })V
    },
  }
}

</script>


<style>
</style>


