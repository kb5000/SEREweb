管理员的用户管理页面

<template>
  <div>
    <el-container
      style="
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <div class="gridCommon">
        <el-header>
          当前系统中的注册用户
          <el-button type="primary" @click="this.OnAddUserButtonClick"
            >添加用户</el-button
          >
          <el-button type="primary" @click="this.OnAddUserButtonClick"
            >批量导入用户</el-button
          >
        </el-header>
        <el-divider></el-divider>
        <el-main
          style="
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <el-col>
            <admin-add-user-dialog ref="addDlg"></admin-add-user-dialog>
            <admin-remove-user-dialog ref="removeDlg"></admin-remove-user-dialog>
            <div v-for="i in users" :key="i.id" class="marginCommon normalFont">
              <el-row>
                <admin-user-management-user-item
                  :userData="i"
                  @deleteUser="OnRemoveUserButtonClick"
                ></admin-user-management-user-item>
              </el-row>
            </div>
          </el-col>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import AdminAddUserDialog from "./AdminAddUserDialog.vue";
import AdminRemoveUserDialog from "./AdminRemoveUserDialog.vue";
import AdminUserManagementUserItem from "./AdminUserManagementUserItem.vue";

export default {
  components: {
    AdminAddUserDialog,
    AdminRemoveUserDialog,
    AdminUserManagementUserItem,
  },
  name: "AdminUserManagementPage",
  data() {
    return {
      vi: false,
      users: [],
    };
  },

  mounted() {
    this.users = [
      {
        uid: 1,
        username: "吉庆雄",
        icon:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        status: -1,
        email: "???",
        phone: "????",
      },

      {
        uid: 2,
        username: "马梓睿",
        icon:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        status: 1,
        email: "???",
        phone: "????",
      },
      {
        uid: 3,
        username: "李保宏",
        icon:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        status: 0,
        email: "???",
        phone: "????",
      },
    ];
  },

  methods: {
    OnRemoveUserButtonClick(userData) {
      this.$refs["removeDlg"].open(userData);
      this.$refs["removeDlg"].rmVisible = true;
    },

    OnAddUserButtonClick() {
      this.$refs["addDlg"].Visible = true;
    },

    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },

    onPostButtonClick() {
      axios({
        method: "get",
        url: "/api?method=add",
      });
    },
  },
};
</script>

<style scoped>
</style>