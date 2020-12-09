教师主页
显示所有班级，可以查看待批改的作业和小测

<template>
  <div class="page">
    <div class="head">

    </div>
    <div class="content">
    </div>
    <div class="tail">

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TeacherIndex',
  data() {
    return {
    }
  },

  mounted() {
  },

  methods: {
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
.page {
  position: relative;
  width: 80%;
  left: 10%;
  background-color: white;
}

</style>