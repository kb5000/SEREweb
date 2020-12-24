管理员用户管理页的每个用户项

<template>
  <div>
      <el-col>
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="commonFont gridCommon">
            <el-row>
            <el-col :span="4" class="unimportantFontColor">
            <el-avatar :size="size" :src="icon"></el-avatar>
            </el-col>
              <el-col :span="4" class="unimportantFontColor">学工号：
                  <span>{{userData.uid}}</span>
                  </el-col>
              <el-col :span="6" class="unimportantFontColor">姓名：
                  <span>{{userData.username}}</span>
                  </el-col>
                <el-col :span="6" class="unimportantFontColor">状态：
                    <span>{{getStatusName(userData.status)}}</span>
                </el-col>
                <el-col :span="4" >
                    <el-button v-show="this.userData.status!=-1"  :disabled="this.userData.status== -1" type="danger" @click="this.OnRemoveBtnClick">删除</el-button>
                    <el-button v-show="this.userData.status==-1"  type="primary" @click="this.OnRecoverBtnClick" style="position: relative; left: -5px;">恢复</el-button>
                </el-col>
            </el-row>
        </div>
        </el-col>
    </el-row>
      </el-col>
  </div>
</template>

<script>
//import axios from 'axios';


export default {
  name: 'AdminUserManagementUserItem',
  props:['userData'],
  data() {
    return {
      icon:this.userData.icon,
      uid:this.userData.uid,
      username:this.userData.username,
      status:this.userData.status
    }
  },

  mounted() {
    
  },

  methods: {
    getStatusName(statusCode){
      switch (statusCode){
        case -1:return "已删除";
        case 0:return "未激活";
        case 1:return "已激活";
        default:return "undefined"
      }
    },
    OnRemoveBtnClick(){
      this.$emit("delete-user",this.userData);
      // this.close();
    },
    OnRecoverBtnClick(){
      this.$emit("recover-user",this.userData);
      // this.close();
    }
  }
}
</script>

<style scoped>


</style>