<template>
  <div class="app-container">
    <PageHeader text="（对成员账号进行添加、删除、编辑和权限配置。）" />
    <el-row style="margin-bottom: 20px">
      <el-button v-has="'add'" @click="handleOperation('add')" type="primary"
        ><i class="el-icon-plus"></i>添加成员</el-button
      >
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-input
          v-model="queryModel.keyword"
          placeholder="搜索姓名或登录账号"
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
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="account" label="登录账号" align="center">
      </el-table-column>
      <el-table-column prop="roleName" label="用户角色" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column prop="lastLogin" label="最近登录时间" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button
            v-has="'edit'"
            type="text"
            @click="handleOperation('edit', row)"
            >编辑</el-button
          >
          <el-popconfirm
            :title="`确定重置密码吗？`"
            @confirm="handlePwdReset(row.id)"
          >
            <el-button
              v-has="'operate'"
              slot="reference"
              type="text"
              style="margin-left: 10px"
              >重置密码</el-button
            >
          </el-popconfirm>
          <el-popconfirm
            :title="`确定删除吗？`"
            @confirm="handleDelete(row.id)"
          >
            <el-button
              v-has="'delete'"
              slot="reference"
              type="text"
              style="margin-left: 10px"
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
  </div>
</template>

<script>
import { list, del, pwdReset } from "@/api/members";
import EditorDialog from "./components/EditorDialog.vue";
export default {
  components: { EditorDialog },
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
    },
    handleDelete(id) {
      del({ id: id }).then((res) => {
        this.$message.success("删除成功");
        this.fetchList();
      });
    },
    handlePwdReset(id) {
      pwdReset({ id: id }).then((res) => {
        this.$message.success("重置成功");
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