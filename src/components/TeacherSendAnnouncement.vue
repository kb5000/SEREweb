教师发布通知
需要指定班级

<template>
  <div class="page">
    <div class="gridCommon">
      <span class="bigFont">发布通知<br/></span>
      <br/>
      <textarea class="mainTextArea"></textarea>
      <div style="height: 40px; margin: 10px 0; position: relative;">
        <div class="commonButton" style="position: absolute; right: 0px;">发布</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TeacherSendAnnouncement',
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
.mainTextArea {
  width: calc(100% - 6px);
  height: 100px;
  border: 1px solid;
  border-radius: 3px;
  border-color: #006b6d;
  padding: 2px;
  font-size: 1.2em;
  resize: vertical;
}
</style>