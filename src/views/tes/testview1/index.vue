<template>
  <div class="app-content">
    <el-row>
      <el-col :span="7">
        <el-upload
          action="/"
          :on-change="onChange"
          :auto-upload="false"
          :show-file-list="false"
          accept=".xls, .xlsx"
        >
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>
      </el-col>
      <el-col :span="7">
        <el-button size="small" type="primary" @click="exportExcel">文件导出</el-button>
      </el-col>
    </el-row>
    <!-- <el-table
      style="margin:20px 0;"
      :data="outputs"
      border
      :header-cell-style="{background:'#f1f1f1',color:'#606266'}"
    >
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="年龄" prop="age" />
    </el-table> -->
    <pageTable
      :columns="columns"
      :table-data="tableData"
    />
    <div class="disfr jsa ac">
      <el-select v-model="optionsId" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </el-select>
      <div>右边部分</div>
    </div>

  </div>
</template>

<script>
// import XLSX from 'xlsx'
import pageTable from '@/components/PageTable/PageTable.vue'
export default {
  components: { pageTable },
  data() {
    return {
      outputs: [{ name: 'zhan', age: '20' }], // 保存读取出来的数据列表
      columns: [{ key: 'name', label: '姓名', align: 'center' },
        { key: 'age', label: '年龄', align: 'center' },
        { key: 'adrr', label: '地址', align: 'center' }],
      tableData: { list: [{ name: 'zhan', age: '20', adr: '上海' }] },
      options: '',
      optionsId: '1'
    }
  },
  created() {
    this.options = window.adr.constant.tabOptions
  },
  methods: {
    // 导出表格
    exportExcel() {
      window.adr.exportExcel.exportExcel({
        tHeader: this.columns,
        list: this.tableData.list,
        filename: '整体趋势'
      })
    },
    // 导出表格
    onChange(file) {
      const that = this
      const pagedHead = ['姓名']// 导入表格表头字段中文
      const pageHeadE = ['name']// 导入表格表头字段英文
      window.adr.exportExcel.readExcel(file, pagedHead, pageHeadE, function(outPuts) {
        console.log(outPuts)
        that.tableData.list = outPuts
      })
    }
  }
}
</script>

<style>
</style>
