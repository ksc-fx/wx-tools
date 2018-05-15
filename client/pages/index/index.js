//index.js
var qcloud = require("../../vendor/wafer2-client-sdk/index");
var config = require("../../config");
var util = require("../../utils/util.js");

Page({
  data: {
    toolWidth: 0,
    movingID: "",
    clientX: "",
    clientY: "",
    list: [
      {
        name: "计算器",
        image: "counter.png",
        page: "counter",
        id: "111",
        moveAble: false
      }
    ]
  },
  onLoad() {
    let itemWidth = 0;
    wx.getSystemInfo({
      success: res => {
        console.log("res", res);
        itemWidth = res.windowWidth / 3;
      }
    });

    console.log("thisthisthis", this);
    this.setData({
      toolWidth: itemWidth
    });
    this.initList();
  },
  navToTool(item) {
    console.log("item", item);
  },
  touchStart(e) {
    console.log("e", e);
    const touchId = e.currentTarget.id;
    this.setData({
      movingID: touchId
    });
    const timer = setTimeout(() => {
      console.log("setTime.e", e);
      const list = [...this.data.list];
      if (touchId == this.data.movingID) {
        list.forEach((item, index) => {
          if (item.id == touchId) {
            const setParam = {};
            const key = `list[${index}].moveAble`;
            setParam[key] = true;
            this.setData(setParam);
          }
        });
      }
      clearTimeout(timer);
    }, 500);
  },
  initList() {
    const list = this.data.list;
    const itemWidth = this.data.toolWidth;
    list.forEach((item, index) => {
      item.x = (index % 3) * itemWidth;
      item.y = Math.floor(index / 3) * itemWidth;
      item.moveAble = false;
    });
    this.setData({
      list: list
    });
  },
  touchmove(e) {
    console.log("touchmove", e);
    this.setData({
      movingID: ""
    });
  },
  touchEnd(e) {
    this.setData({
      movingID: ""
    });
    this.initList();
  },
  bindchange(e) {
    console.log("bindchange", e);
  }
});
