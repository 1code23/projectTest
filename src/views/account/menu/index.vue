<template>
  <div class="app-container">
    <el-row style="margin-bottom: 20px">
      <el-button type="primary" v-has="'add'" @click="handleOperation('add')"
        ><i class="el-icon-plus"></i>添加菜单</el-button
      >
    </el-row>
    <el-table
      :data="menu"
      :header-cell-style="{ background: '#FAFAFA' }"
      stripe
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'sub' }"
    >
      <el-table-column label="名称" prop="name"> </el-table-column>
      <el-table-column label="路由" prop="webRouter">
        <template slot-scope="{ row }">
          <span v-if="row.comType == 'page'">{{ row.webRouter }}</span>
          <span v-else>{{ getButtonName(row.action) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="desc" width="150" align="center">
        <template slot-scope="{ row }">
          <el-button
            v-has="'add'"
            type="text"
            v-if="row.comType !== 'button'"
            @click="handleOperation('add', row)"
            >添加</el-button
          >
          <el-button
            v-has="'edit'"
            type="text"
            @click="handleOperation('edit', row)"
            >编辑</el-button
          >
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
    <EditorDialog :isShow.sync="editorDialogShow" :row="row" :type="type" />
  </div>
</template>

<script>
import { getMenuList, del } from "@/api/menu";
import EditorDialog from "./components/EditorDialog.vue";
export default {
  components: { EditorDialog },
  data() {
    return {
      menu: [],
      row: {},
      type: "",
      editorDialogShow: false,
      configMenuBtn: [
        {
          name: "查询",
          value: "query",
        },
        {
          name: "添加",
          value: "add",
        },
        {
          name: "编辑",
          value: "edit",
        },
        {
          name: "删除",
          value: "delete",
        },
        {
          name: "下载",
          value: "download",
        },
        {
          name: "操作",
          value: "operate",
        },
        {
          name: "其他",
          value: "other",
        },
      ],
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      getMenuList().then((res) => {
        this.menu = this.initMenu(res.data || []);
        console.log(this.menu);
      });
    },
    //初始化菜单数据，格式化成前端需要的数据结构
    initMenu(menu, Oindex = 0, parentId = null) {
      let menuList = [];
      /**
       * button 按钮，page 页面
       * comType 当前数据类型
       * nextcomType 下一个数据类型
       */
      menu.forEach((item) => {
        item.comType = "button";
        item.nextcomType = "button";
        item.parentId = parentId;
        if (Oindex < 2) {
          item.comType = "page";
        }
        if (Oindex < 1) {
          item.nextcomType = "page";
        }

        if (item.sub) {
          this.initMenu(item.sub, Oindex + 1, item.id);
        }
        menuList.push(item);
      });
      return menuList;
    },
    getButtonName(val) {
      if (!val) {
        return "";
      }
      const item = this.configMenuBtn.find((c) => c.value === val);
      return item.name;
    },
    handleOperation(type, row = {}) {
      this.type = type;
      if (type === "add") {
        this.editorDialogShow = true;
        this.row = { ...row };
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
  },
};
</script>

<style>
.app-content {
  padding: 20px;
}
</style>