管理员用户管理页的每个用户项

<template>
  <div class="page">
      <el-col>
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="bigFont gridCommon">
            <el-row>
            <el-col :span="4" class="unimportantFontColor">
            <el-avatar :size="size" :src="icon"></el-avatar>
            </el-col>
              <el-col :span="4" class="unimportantFontColor">uid：
                  <span>{{userData.uid}}</span>
                  </el-col>
              <el-col :span="6" class="unimportantFontColor">用户名：
                  <span>{{userData.username}}</span>
                  </el-col>
                <el-col :span="6" class="unimportantFontColor">状态：
                    <span>{{userData.status}}</span>
                </el-col>
            </el-row>
        </div>
        </el-col>
    </el-row>
      </el-col>
    <el-col>
        <el-button  :disabled="this.userData.status== -1" type="danger" @click="this.OnRemoveBtnClick">删除</el-button>
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
    OnRemoveBtnClick(){
        this.$emit("deleteUser");
      },
  }
}
</script>

<style scoped>


</style>