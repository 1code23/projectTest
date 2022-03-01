<template>
  <div class="search-label">
    <span class="label">{{ label }}:</span>
    <div class="content"><slot /></div>
  </div>
</template>
<script>
export default {
  props: {
    label: String,
  },
};
</script>

<style lang="scss" scoped>
.search-label {
  display: flex;
  .label {
    white-space: nowrap;
    line-height: 32px;
    font-size: 14px;
    color: #5a5a5a;
    margin-right: 5px;
  }
  .content {
    align-self: start;
    width: 100%;
  }
}
</style>