管理员的用户管理页面


<template>
<el-container>
  <div class="gridCommon">
        <el-divider></el-divider>
      <el-col :span="16">
        <admin-add-user-dialog ref = "addDlg"></admin-add-user-dialog>
        <admin-remove-user-dialog ref = "rmDlg"></admin-remove-user-dialog>
        <div class="bigFont gridCommon">
          当前系统中的注册用户
        <el-button type="primary" @click="this.OnAddUserButtonClick">添加用户</el-button>
          <div v-for="i in users" :key="i.id" class="marginCommon normalFont gridCommon handCursor">
            <el-row>
                <admin-user-management-user-item :userData=i @deleteUser="OnRemoveUserButtonClick"></admin-user-management-user-item>
            </el-row>
          </div>
        </div>
      </el-col>
  </div>
</el-container>
</template>

<script>
import axios from 'axios';
import AdminAddUserDialog from './AdminAddUserDialog.vue';
import AdminRemoveUserDialog from './AdminRemoveUserDialog.vue';
import AdminUserManagementUserItem from './AdminUserManagementUserItem.vue';


export default {
  components: { AdminAddUserDialog, AdminRemoveUserDialog, AdminUserManagementUserItem },
  name: 'AdminUserManagementPage',
  data() {
    return {
      vi:false,
      users: []
    }
  },

  mounted() {
    this.users = [
      {uid: 1, 
      username: "a", 
      icon: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      status:-1,
      email: "???",
      phone:"????"},

     {uid: 2, 
      username: "a", 
      icon: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      status:1,
      email: "???",
      phone:"????"
     },
          {uid: 3, 
      username: "a", 
      icon: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      status:0,
      email: "???",
      phone:"????"
     }
    ];
  },

  methods: {
      OnRemoveUserButtonClick(){
        this.$refs['rmDlg'].Visible = true;
      },

      OnAddUserButtonClick(){
        this.$refs['addDlg'].Visible = true;
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


</style>