<template>
  <el-dialog
    :title="type == 'add' ? '添加角色' : '编辑角色'"
    :visible.sync="dialogVisible"
    width="400px"
    center
  >
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="角色名称:" prop="name">
        <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="控制权配置：" required>
        <!-- -->
        <el-tree
          ref="tree"
          :data="menuList"
          show-checkbox
          node-key="id"
          :default-checked-keys="form.menuList"
          :props="{ children: 'sub', label: 'name' }"
        >
        </el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="save('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { creat, update, info } from "@/api/roles";
import { getMenuList } from "@/api/menu";
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
      if (val && this.type == "edit") {
        this.form = { ...this.row };
        this.fetchList();
      } else {
        this.form = this.$options.data().form;
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys([]);
        });
      }
    },
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        menuList: [{ required: true, message: "请配置权限", trigger: "blur" }],
      },
      form: {
        name: "",
        menuList: [],
      },
      menuList: [],
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    fetchList() {
      info({ id: this.form.id }).then((res) => {
        // 所有存在子集的node节点id
        const allNodeMenuIds = this.getNodeMenuIds(this.menuList);
        // 当前拥有权限的node节点id
        const haveMenuIds = this.getHaveMenuIds(res.data.menuList);
        this.form.menuList = haveMenuIds.filter((h) =>
          allNodeMenuIds.includes(h)
        );
      });
    },
    getMenuList() {
      getMenuList().then((res) => {
        this.menuList = res.data;
      });
    },
    //根绝后端返回的菜单数据，转化为拥有权限的菜单id数组
    getHaveMenuIds(menu) {
      if (!menu) {
        return [];
      }
      let haveMenuIds = [];
      menu.map((m) => {
        haveMenuIds.push(m.id);
      });
      return haveMenuIds;
    },
    //获取节点菜单路由，该节点不存在子集
    //主要是为了解决前端根据选中某一个父节点后会默认全选所有的子节点问题
    getNodeMenuIds(menuList, parentList = []) {
      menuList.map((m) => {
        if (m.sub && m.sub.length !== 0) {
          this.getNodeMenuIds(m.sub, parentList);
        } else {
          parentList.push(m.id);
        }
      });
      return parentList;
    },
    save(formName) {
      // 将所有已选和半选的菜单返回,否则会出现某一层路由菜单后端不返回的问题
      const selectMenu =
        this.$refs.tree
          .getCheckedKeys()
          .concat(this.$refs.tree.getHalfCheckedKeys()) || [];
      if (!selectMenu.length) {
        this.$message.warning("请配置权限");
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = { ...this.form };
          params.menuList = selectMenu.toString();
          if (this.type === "add") {
            creat(params).then((res) => {
              this.dialogVisible = false;
              this.$parent.fetchList();
              this.$store.dispatch("account/updateRoleList");
              this.$message.success("添加成功");
            });
          } else {
            update(params).then((res) => {
              this.dialogVisible = false;
              this.$parent.fetchList();
              this.$message.success("编辑成功");
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
