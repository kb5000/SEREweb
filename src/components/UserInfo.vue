个人信息页

<template>
  <div class="page">
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="bigFont gridCommon titleGrid">
          <div style="text-align: center;">
          <el-avatar :size="150" :src="icon" @click="alert('?');"></el-avatar>
          </div>
          <div :style="{'text-align':'center'}">{{username}}</div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="commonFont unimportantFontColor gridCommon">
          基本信息
          <el-divider></el-divider>
          <el-row class="info-row">
            <el-col span="8">
              uid
            </el-col>
            <el-col span="16">
              <span>{{this.uid}}</span>
            </el-col>
          </el-row>
          <el-row class="info-row">
            <el-col span="8">
              头像
            </el-col>
            <el-col span="16">
              <el-avatar shape="square" :size="200" :src="icon" @click="alert('?');"></el-avatar>
            </el-col>
          </el-row>
          <el-row class="info-row">
            <el-col span="8">
              用户名
            </el-col>
            <el-col span="8">
              <span>{{this.username}}</span>
            </el-col>
            <el-col span="8">  
              <el-button circle class="positionRight" icon="el-icon-edit" type="primary" @click="openEditInfoDialog('用户名')"></el-button>
            </el-col>
          </el-row>
          <el-row class="info-row">
            <el-col span="8">
              手机号
            </el-col>
            <el-col span="8">
              <span>{{this.phone}}</span>     
            </el-col>         
            <el-col span="8">
              <el-button circle class="positionRight" icon="el-icon-edit" type="primary" @click="openEditInfoDialog('手机号')"></el-button>
            </el-col>
          </el-row>
          <el-row class="info-row">
            <el-col span="8">
              邮箱
            </el-col>
            <el-col span="8">
              <span>{{this.email}}</span>
            </el-col>
            <el-col span="8">              
              <el-button circle class="positionRight" icon="el-icon-edit" type="primary" @click="openEditInfoDialog('邮箱')"></el-button>
            </el-col>
          </el-row>
          <el-row class="info-row">
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
<el-dialog
  :title="'修改'+ editingKey"
  :visible.sync="editVisible"
  width="30%"
  :before-close="handleClose">
  <span>请输入新的{{editingKey}}</span>
  <span slot="footer" class="dialog-footer">
      <el-input v-model="editInput" :placeholder="getEditPlaceHolder()"></el-input>
      <el-row style="margin-top:30px"> 
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </el-row>
  </span>
</el-dialog>
  </div>
</template>




<script>
import axios from 'axios';

export default {
  name: 'UserInfo',
  data() {
    return {
      editInput:"",
      editingKey:"",
      editVisible:false,
      uid:0,
      icon:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      username:"?????",
      email:"3111111111@zju.edu.cn",
      phone:"18888888888",
      
    }
  },

  mounted() {
  },

  methods: {
    openEditInfoDialog(infoKey){
        this.editingKey = infoKey;
        this.editVisible = true;
    },
    // updateInfoValue(infoKey,infoValue){

    // },

    getEditPlaceHolder(){
      switch(this.editingKey){
        case '用户名':return '小于18位的汉字、英文字母、数字、下划线组合';
        case '邮箱':return '*@zju.edu.cn';
        case '手机号':return '11位手机号';
        default:return "";
      }
    },

    changePassword(){
      this.$router.push('/UserResetPasswordEmailVerify');
    },

    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
              var pair = vars[i].split("=");
              if(pair[0] == variable){return pair[1];}
      }
      return false;
    },

    onPostButtonClick() {
      axios({
        method: 'get',
        url: '/api?method=add'
      });
    },

  }
}
</script>

<style scoped>
.postContentTextBox {
  width: calc(100% - 6px);
  height: 100px;
  border: 1px solid;
  border-radius: 3px;
  border-color: #006b6d;
  padding: 2px;
  font-size: 1.2em;
  resize: vertical;
}

.positionRight {
float: right;
                margin-right: 25px;
}

.info-row {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap
  }
</style>