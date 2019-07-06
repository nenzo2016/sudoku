<template>
  <div class="body">
    <div class="box">
      <div class="title">sudoku</div>
      <div class="day">每天更新</div>
      <mt-button @click="startGame(0)" class="btn" type="primary" round>入门</mt-button>
      <mt-button @click="startGame(1)" class="btn" type="primary" round>初级</mt-button>
      <mt-button @click="startGame(2)" class="btn" type="primary" round>中级</mt-button>
      <mt-button @click="startGame(3)" class="btn" type="primary" round>高级</mt-button>
      <mt-button @click="startGame(4)" class="btn" type="primary" round>骨灰级</mt-button>
    </div>
  </div>
</template>

<script>
import { parseTime } from "../utils/index";
import { fetchGame } from "../api/game";
import { Indicator,Toast } from "mint-ui";
import { mapMutations } from "vuex";
export default {
  name: "Home",
  data() {
    return {};
  },
  created() {
    let subject = JSON.parse(localStorage.getItem("subject"));
    if (subject) {
      const today = parseTime(new Date().getTime(), "{y}-{m}-{d}");
      if (subject.date !== today) {
        this.fetchData();
      }
    } else {
      this.fetchData();
    }
  },
  methods: {
    async fetchData() {
      Indicator.open("加载中...");
      let fetch_subject = await fetchGame();
      fetch_subject.subject.map(item => {
        item.result = item.result.split("");
        item.initial = item.initial.split("");
        item.history = item.initial;
      });
      let subject = {
        data: fetch_subject.subject,
        date: fetch_subject.date
      };
      localStorage.setItem("subject", JSON.stringify(subject));
      this.setData(subject);
      Indicator.close();
    },
    startGame(nd) {
      let subject = localStorage.getItem("subject");
      if (!subject) {
        Toast('请求失败，请刷新页面重试！')
      } else {
        const self = this;
        self.$router.push({ path: "/game", query: { nd } });
      }
    },
    ...mapMutations({
      setData: "subject/setData"
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.day{
  text-align: center;
  padding-bottom: 80px;
  padding-top: 20px;
  color: rgba(0, 0, 0, 0.2);
}
.btn {
  display: block;
  width: 40%;
  margin: 40px auto;
  height: 80px;
  border-radius: 100px;
  font-size: 30px;
}
.box {
  width: 100%;
  padding-bottom: 30px;
}
.title {
  font-size: 80px;
  text-align: center;
  font-family: "STHupo";
  padding-top: 20px;
}
.body {
  min-height: 100vh;
  background-color: #ffffff;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
}
</style>
