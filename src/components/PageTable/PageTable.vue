<template>
  <div>
    <el-table
      stripe
      :data="tableData.list"
      style="width: 100%"
      :row-key="rowKey"
      :height="height"
      :highlight-current-row="highlightCurrentRow"
      :header-cell-style="headClass"
      @select="handleSelect"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
    >
      <!-- :cell-style="rowClass" -->
      <slot name="prefix" />
      <el-table-column
        v-for="item in columns"
        :key="item.key ? item.key : item.slot"
        :prop="item.key ? item.key : item.slot"
        :label="item.label"
        :fixed="item.fixed"
        :sortable="item.sortable"
        :width="item.width"
        :align="item.align ? item.align : 'left'"
      >
        <template slot-scope="{ row }">
          <span v-if="item.key">{{ row[item.key] }}</span>
          <slot v-if="item.slot" :name="item.slot" :row="row" />
        </template>
      </el-table-column>
      <slot />
    </el-table>
    <!-- <el-pagination
      class="pagination-wapper"
      @size-change="handleSizeChange"
      @current-change="handleChangePage"
      :current-page="parseInt(tableData.page)"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="parseInt(tableData.size)"
      layout="total, sizes, prev, pager, next, jumper"
      :total="parseInt(tableData.count)"
    >
    </el-pagination> -->
    <el-pagination
      class="pagination-wapper"
      :current-page="parseInt(tableData.page)"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="parseInt(tableData.size)"
      layout="sizes, prev, pager, next"
      :total="parseInt(tableData.count)"
      @size-change="handleSizeChange"
      @current-change="handleChangePage"
    />
  </div>
</template>
<script>
export default {
  props: {
    rowKey: {
      type: String
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    columns: {
      required: true,
      type: Array,
      default() {
        return []
      }
    },
    tableData: {
      required: true,
      type: Object,
      default() {
        return {
          page: 1,
          size: 10,
          total: 0,
          list: []
        }
      }
    },
    height: {
      type: String
    }
  },
  methods: {
    handleSizeChange(size) {
      let page = this.tableData.page
      if (page !== 1) {
        // 当不是在第一页更改size时，更新tableData里面的数据。以防再次触发handleChangePage
        page = 1
        this.tableData.size = size
        this.tableData.page = 1
      }
      this.$emit('page-change', { page, size })
    },
    handleChangePage(page) {
      this.$emit('page-change', { page, size: this.tableData.size })
    },
    handleSelect(selection, row) {
      this.$emit('select', selection, row)
    },
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    handleCurrentChange(row) {
      this.$emit('current-change', row)
    },
    // 表头样式设置
    headClass() {
      return 'background:RGB(247,248,250);color:#252934;'
    }
    // 表格样式设置
    // rowClass() {
    //   return "text-align: center;";
    // },
    // sortChange(val) {
    //   // this.$emit("sort-change", column, prop, order);
    //   console.log(val);
    // },
  }
}
</script>
<style scoped lang="scss">
.pagination-wapper {
  text-align: right;
  margin-top: 10px;
}
// /deep/.el-table th.el-table__cell > .cell {
//   font-weight: 600 !important;
//   color: #252934 !important;
// }
</style>
