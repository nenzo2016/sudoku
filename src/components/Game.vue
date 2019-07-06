<template>
  <div class="content">
    <div class="table">
      <div class="box">
        <div v-for="(row,i) of parseData" v-bind:key="i" class="row">
          <div @click="showSel(i*9+n)" v-for="(col,n) of row" v-bind:key="n" class="col">
            <div v-if="initial[i*9+n]!=0">{{parseCol(col)}}</div>
            <div v-else class="col-blue">{{parseCol(col)}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isAnswer" class="btn">
      <mt-button @click="reStart" class="btn-item" type="primary" round>重新开始</mt-button>
      <mt-button @click="goAnswer" class="btn-item" type="primary" round>答案</mt-button>
    </div>
    <div v-if="vis_sel" class="sel">
      <mt-picker :slots="slots" class="pick" showToolbar @change="onValuesChange">
        <div class="pick-box">
          <!-- <mt-button @click="hideSel(true)" class="pick-item" type="primary" round>清除</mt-button> -->
          <mt-button @click="hideSel()" class="pick-item" type="primary" round>确定</mt-button>
        </div>
      </mt-picker>
    </div>
  </div>
</template>

<script>
import { parseTime, cloneObj } from "../utils/index";
import { fetchGame } from "../api/game.js";
import { mapGetters, mapMutations } from "vuex";
import { Toast, MessageBox } from "mint-ui";
export default {
  name: "Home",
  data() {
    return {
      vis_sel: false,
      sel_col: null,
      slots: [
        {
          flex: 1,
          className: "game-pick-item",
          defaultIndex: 0,
          values: ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        }
      ]
    };
  },
  created() {
    let subject = JSON.parse(localStorage.getItem("subject"));
    if (subject) {
      this.setData(subject);
    }
  },
  methods: {
    setND(action) {
      let { $route, data, setData } = this;
      Object.assign(data[$route.query.nd], { ...action });
      setData({
        data: data
      });
    },
    showSel(index) {
      if (this.initial[index] != 0 || this.isAnswer) {
        return;
      }
      this.vis_sel = true;
      this.sel_col = index;
    },
    hideSel(type) {
      let { sel_col, history, setND, initial, result, subject } = this;
      if (type) {
        let clone = cloneObj(history);
        clone[sel_col] = 0;
        setND({
          history: clone
        });
      }
      this.vis_sel = false;
      if (!history.includes("0")) {
        if (cloneObj(history).join() == cloneObj(result).join()) {
          Toast("恭喜你！数独已完成。");
        } else {
          Toast("数独验证不正确！");
        }
      }
      localStorage.setItem("subject", JSON.stringify(subject));
    },
    onValuesChange(picker, values) {
      let { sel_col, history, setND } = this;
      if (sel_col !== null) {
        let clone = cloneObj(history);
        clone[sel_col] = values[0] || "0";
        setND({
          history: clone
        });
      }
    },
    goAnswer() {
      let { $router, $route } = this;
      $router.push({ path: "/answer", query: { nd: $route.query.nd } });
    },
    reStart() {
      let { subject, setND, initial } = this;
      MessageBox.confirm("确定要重新开始吗?").then(action => {
        setND({
          history: initial
        });
        localStorage.setItem("subject", JSON.stringify(subject));
      });
    },
    parseCol(col) {
      return col == 0 ? "" : col;
    },
    ...mapMutations({
      setData: "subject/setData"
    })
  },
  computed: {
    isAnswer() {
      return this.$route.path == "/answer";
    },
    parseData() {
      let arr = [];
      let clone = this.isAnswer
        ? cloneObj(this.result)
        : cloneObj(this.history);
      while (clone.length > 0) {
        arr.push(clone.splice(0, 9));
      }
      return arr;
    },
    result() {
      return this.$store.getters.result(this.$route.query.nd);
    },
    history() {
      return this.$store.getters.history(this.$route.query.nd);
    },
    initial() {
      return this.$store.getters.initial(this.$route.query.nd);
    },
    ...mapGetters(["data", "subject"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pick {
  background-color: #ffffff;
  padding: 40px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.sel {
  position: fixed;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
}
.pick-box {
  flex-direction: row-reverse;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.pick-item {
  margin: 0 40px;
  padding: 0 30px;
  font-size: 26px;
  height: 50px;
  border-radius: 40px;
  float: right;
}
.btn {
  padding: 50px;
  display: flex;
  justify-content: space-around;
}
.btn-item {
  font-size: 30px;
  width: 170px;
  height: 70px;
  border-radius: 70px;
}
.col-blue {
  color: #409eff;
}
.table {
  padding: 40px 0;
  display: flex;
  justify-content: center;
}
.box {
  border: 3px solid rgba(0, 0, 0, 0.5);
}
.row {
  margin: 0 auto;
  display: flex;
}
.row:nth-of-type(3n) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
}
.row:nth-of-type(3n + 1) {
  border-top: 2px solid rgba(0, 0, 0, 0.5);
}
.row:first-of-type {
  border: none;
}
.row:nth-of-type(3n) .col {
  border-bottom: none;
}
.row:nth-of-type(3n + 1) .col {
  border-top: none;
}
.row:first-of-type .col {
  border-top: 1px solid rgba(0, 0, 0, 0.3);
}
.row:last-of-type .col {
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
.row:last-of-type {
  border: none;
}
.col:nth-of-type(3n) {
  border-right: 2px solid rgba(0, 0, 0, 0.5);
}
.col:nth-of-type(3n + 1) {
  border-left: 2px solid rgba(0, 0, 0, 0.5);
}
.col:first-of-type {
  border-left: 1px solid rgba(0, 0, 0, 0.3);
}
.col:last-of-type {
  border-right: 1px solid rgba(0, 0, 0, 0.3);
}
.col {
  width: 10.5vw;
  height: 10.5vw;
  box-sizing: border-box;
  text-align: center;
  line-height: 10.5vw;
  font-weight: normal;
  font-size: 50px;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.body {
}
</style>
