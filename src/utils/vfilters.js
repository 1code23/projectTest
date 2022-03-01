const vfilter = {
  // 保留两位小数
  keepTwoNum(val) {
    if (!isNaN(val)) {
      val = Number(val)
      return val.toFixed(2)
    }
  },
  phoneHideMiddle(val) {
    if (val) {
      return `${val.substring(0, 3)}****${val.substring(val.length - 4)}`
    } else {
      return '--'
    }
  }
}
export default vfilter
