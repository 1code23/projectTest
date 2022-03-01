<template>
  <div class="search-select">
    <div
      v-for="item in options"
      :key="item.id"
      class="option"
      :class="{ active: id == item.id }"
      @click="handleSelect(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "id",
    event: "select",
  },
  props: {
    options: Array,
    id: {
      type: [String, Number],
      default: 0,
    },
  },
  methods: {
    handleSelect(item) {
      this.$emit("select", item.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-select {
  display: inline-block;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  align-items: center;
  padding: 2px;
  box-sizing: border-box;
  .option {
    display: inline-block;
    white-space: nowrap;
    height: 100%;
    line-height: 28px;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 13px;
    color: #5a5a5a;
    cursor: pointer;
    &.active {
      background: #409eff;
      color: white;
    }
  }
}
</style>