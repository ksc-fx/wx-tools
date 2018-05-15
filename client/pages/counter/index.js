import np from "../../utils/np";
Page({
  data: {
    firstNum: 0,
    operator: "",
    showNum: 0,
    ctrString: "",
    equal: false
  },
  onLoad() {
    console.log(np.eval("1+-2"));
  },
  initData() {
    this.setData({
      firstNum: 0,
      operator: "",
      showNum: 0,
      ctrString: "",
      equal: false
    });
  },
  defaultTap(e) {
    console.log("e", e);
    const type = e.currentTarget.dataset.type;
    const value = e.currentTarget.dataset.value;
    const currentShowValue = this.data.showNum + "";
    const currentOperator = this.data.operator;
    const currentctrString = this.data.ctrString + "";
    const strLength = currentctrString.length;
    let tapResultValue = "";
    console.log("type", type);

    if (currentShowValue.indexOf("输入异常") > -1) {
      this.initData();
      return;
    }
    if (currentShowValue.length > 50 || currentctrString.length > 50) {
      return;
    }

    switch (type) {
      case "ac":
        //点击归零
        this.initData();
        break;
      case "+/-":
        //点击正负号

        if (/(\+|\-|\×|\÷)$/.test(currentctrString.charAt(strLength - 1))) {
          if (currentShowValue.charAt(0) == "-") {
            tapResultValue = "0";
          } else {
            tapResultValue = "-0";
          }
        } else {
          const lastIndex = currentctrString.lastIndexOf(currentShowValue);
          let resultStr = currentctrString.substr(0, lastIndex);
          if (currentShowValue.charAt(0) == "-") {
            tapResultValue = currentShowValue.substr(1);
          } else {
            tapResultValue = "-" + currentShowValue;
          }
          this.setData({
            ctrString: resultStr + tapResultValue
          });
        }

        this.setData({
          showNum: tapResultValue
        });
        break;
      case "%":
        //点击百分号
        if (currentShowValue == "0") {
          tapResultValue = currentShowValue;
        } else {
          tapResultValue = np.eval(currentShowValue + "/100");
        }
        if (
          currentctrString
            .charAt(currentctrString.length - 1)
            .match(/\+|\-|\×|\÷/g)
        ) {
          this.setData({
            showNum: tapResultValue ? tapResultValue : 0,
            ctrString: tapResultValue ? tapResultValue : 0
          });
        } else {
          this.setData({
            showNum: tapResultValue ? tapResultValue : 0,
            ctrString: currentctrString + "÷100"
          });
        }

        break;
      case "number":
        //点击数字

        if (/(\+|\-|\×|\÷)$/.test(currentctrString.charAt(strLength - 1))) {
          if (currentShowValue == "-0") {
            this.setData({
              showNum: "-" + value,
              ctrString: currentctrString + "-" + value
            });
          } else {
            this.setData({
              showNum: value,
              ctrString: currentctrString + value
            });
          }
        } else {
          if (this.data.equal) {
            this.setData({
              showNum: value,
              equal: false,
              ctrString: currentctrString + value
            });
          } else {
            this.setData({
              showNum:
                (currentShowValue == "0" ? "" : currentShowValue) + value,
              ctrString: currentctrString + value
            });
          }
        }

        break;
      case "dot":
        //点击小数点
        if (currentShowValue.indexOf(".") > -1) {
          tapResultValue = currentShowValue;
        } else {
          tapResultValue = currentShowValue + ".";
        }
        let resString = "";
        // const strLength = currentctrString.length;
        if (/(\+|\-|\×|\÷)$/.test(currentctrString.charAt(strLength - 1))) {
          tapResultValue = "0" + value;
          resString = (currentctrString + "0" + value).replace(/\.+/g, ".");
        } else {
          resString = (currentctrString + value).replace(/\.+/g, ".");
        }
        this.setData({
          showNum: tapResultValue,
          ctrString: resString
        });
        break;
      case "operator":
        //点击运算符号
        const ctrStrLength = currentctrString.length;
        const curStr =
          "+-×÷".indexOf(currentctrString.charAt(ctrStrLength - 1)) > -1
            ? currentctrString.substr(0, ctrStrLength - 1)
            : currentctrString;
        if (currentctrString == "") {
          this.setData({
            operator: value,
            ctrString: currentShowValue + value
          });
        } else {
          this.setData({
            operator: value,
            ctrString: curStr + value
          });
        }

        const matchOperator = this.data.ctrString.match(/.*?([\d|.]+)[\D]+$/);

        if (value == "÷" || value == "×") {
          if (matchOperator && matchOperator.length > 1) {
            this.setData({
              showNum: matchOperator[1]
            });
          }
        } else if (value == "+" || value == "-") {
          console.log("this.data.currentctrString", this.data.ctrString);
          this.setData({
            showNum: np.eval(
              this.data.ctrString.substr(0, this.data.ctrString.length - 1)
            )
          });
        }

        break;
      case "equal":
        //点击等号
        let str = /(\+|\-|\×|\÷)$/.test(currentctrString.charAt(strLength - 1))
          ? currentctrString.substr(0, strLength - 1)
          : currentctrString;
        const result = np.eval(str);
        this.setData({
          equal: true,
          ctrString: "",
          showNum: result
        });
        break;
      default:
        break;
    }
  }
});
