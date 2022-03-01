<template>
  <!-- 页面头部组件 -->
  <div class="page-header">
    <div>
      <span class="page-header-title">{{ pageTitle }}</span>
      <div class="page-header-text">
        <span v-if="text">{{ text }}</span>
        <slot v-else name="text" />
      </div>
    </div>
    <slot name="right" />
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    title: String,
  },
  computed: {
    pageTitle() {
      if (this.title) {
        return this.title;
      }
      return this.$route.meta.title;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  &-title {
    color: #5a5a5a;
    font-weight: bold;
    font-size: 17px;
    margin-right: 10px;
  }
  &-text {
    display: inline-block;
    font-size: 13px;
    color: #ccc;
  }
}
</style>