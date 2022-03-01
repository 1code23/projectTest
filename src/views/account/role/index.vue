<template>
  <div class="app-container">
    <PageHeader text="（为角色定义不同的平台控制权限）" />
    <el-row style="margin-bottom: 20px">
      <el-button @click="handleOperation('add')" type="primary"
        ><i class="el-icon-plus"></i>添加角色</el-button
      >
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-input
          v-model="queryModel.keyword"
          placeholder="搜索角色名称"
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
      <el-table-column prop="name" label="角色名称" align="center">
      </el-table-column>
      <el-table-column prop="roleName" label="控制权限描述" align="center">
      </el-table-column>
      <el-table-column prop="userCount" label="成员数量" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button type="text" @click="handleOperation('edit', row)"
            >编辑</el-button
          >
          <el-button type="text" @click="handleOperation('members', row)"
            >成员管理</el-button
          >
          <el-popconfirm
            :title="`确定删除吗？`"
            @confirm="handleDelete(row.id)"
          >
            <el-button slot="reference" type="text" style="margin-left: 10px"
              >删除</el-button
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
    <EditorDialog :isShow.sync="editorDialogShow" :row="row" :type="type" />
    <MemberDrawer :isShow.sync="memberDrawerShow" :row="row" />
  </div>
</template>

<script>
import { list, del } from "@/api/roles";
import EditorDialog from "./components/EditorDialog.vue";
import MemberDrawer from "./components/MemberDrawer.vue";
export default {
  components: { EditorDialog, MemberDrawer },
  data() {
    return {
      queryModel: {
        keyword: "",
        total: 0,
        page: 1,
        size: 10,
      },
      row: {},
      type: "",
      editorDialogShow: false,
      memberDrawerShow: false,
      tableData: [],
    };
  },
  created() {
    this.fetchList();
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
    handleOperation(type, row) {
      this.type = type;
      if (type === "add") {
        this.editorDialogShow = true;
      }
      if (type === "edit") {
        this.editorDialogShow = true;
        this.row = { ...row };
      }
      if (type === "members") {
        this.memberDrawerShow = true;
        this.row = { ...row };
      }
    },
    handleDelete(id) {
      del({ id: id }).then((res) => {
        this.$message.success("删除成功");
        this.fetchList();
      });
    },
  },
};
</script>

<style>
.app-content {
  padding: 20px;
}
</style>