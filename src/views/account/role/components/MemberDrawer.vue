<template>
  <el-drawer
    :show-close="false"
    title="成员管理"
    :visible.sync="dialogVisible"
    direction="rtl"
    size="40%"
  >
    <div class="app-container">
      <el-row>
        <el-col :span="8">
          <el-input
            v-model="queryModel.keyword"
            placeholder="搜索成员名称"
            prefix-icon="el-icon-search"
            @keydown.native.enter="search"
          ></el-input>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#FAFAFA' }"
        stripe
        style="width: 100%; margin: 20px 0"
      >
        <el-table-column prop="date" label="序号" align="center">
          <template slot-scope="scope">{{
            scope.$index + 1 + (queryModel.page - 1) * queryModel.size
          }}</template>
        </el-table-column>
        <el-table-column prop="name" label="成员名称" align="center">
        </el-table-column>
        <el-table-column prop="roleName" label="角色" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-popconfirm
              :title="`确定移出该成员吗？`"
              @confirm="handleDelete(row.id)"
            >
              <el-button slot="reference" type="text" style="margin-left: 10px"
                >移出</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        v-show="queryModel.total > 0"
        :total="queryModel.total"
        :page.sync="queryModel.page"
        :limit.sync="queryModel.size"
        @pagination="fetchList"
      />
    </div>
  </el-drawer>
</template>

<script>
import { list, del } from "@/api/members";
export default {
  props: { isShow: Boolean, row: Object, type: String },
  computed: {
    dialogVisible: {
      get() {
        return this.isShow;
      },
      set(val) {
        this.$emit("update:isShow", val);
      },
    },
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.queryModel.roleId = this.row.id;
        this.fetchList();
      } else {
        this.tableData = [];
        this.queryModel = this.$options.data().queryModel;
      }
    },
  },
  data() {
    return {
      queryModel: {
        keyword: "",
        total: 0,
        page: 1,
        size: 10,
        roleId: null,
      },
      tableData: [],
    };
  },
  methods: {
    search() {
      this.queryModel.page = 1;
      this.fetchList();
    },
    fetchList() {
      list(this.queryModel).then((res) => {
        const { list, count } = res.data;
        this.tableData = list;
        this.queryModel.total = count;
      });
    },
    handleDelete(id) {
      del({ id: id }).then((res) => {
        this.$message.success("移出成功");
        this.fetchList();
        this.$parent.fetchList();
      });
    },
  },
};
</script>

<style>
</style>