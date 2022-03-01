<template>
  <div class="shrinkage" @click="clickText">
    <!-- 收缩文字组件 -->
    <span class="text">{{ text }}</span>
    <i v-if="closed" class="el-icon-arrow-down"></i>
    <i v-else class="el-icon-arrow-up"></i>
  </div>
</template>

<script>
export default {
  model: {
    prop: "closed",
    event: "change",
  },
  props: {
    closed: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    text() {
      let tex = this.closed ? "展开" : "收起";
      return tex;
    },
  },
  methods: {
    clickText() {
      this.$emit("change", !this.closed);
    },
  },
};
</script>

<style lang="scss" scoped>
.shrinkage {
  font-size: 13px;
  color: #409eff;
  cursor: pointer;
  user-select: none;
  .text {
    margin-right: 5px;
  }
}
</style>
