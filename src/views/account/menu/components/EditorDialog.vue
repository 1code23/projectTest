<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="400px"
    center
  >
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="名称:" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="路由:" prop="webRouter">
        <el-input
          v-model.trim="form.webRouter"
          placeholder="请输入页面路径"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限接口:" prop="permissions">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入权限接口"
          v-model="form.permissions"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="按钮类型:"
        prop="action"
        v-if="dialogTitle == '添加按钮' || dialogTitle == '编辑按钮'"
      >
        <el-select v-model="form.action" placeholder="请选择按钮类型">
          <el-option
            v-for="btn in $parent.configMenuBtn"
            :key="btn.value"
            :label="btn.name"
            :value="btn.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="save('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { creat, update } from "@/api/menu";

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
    dialogTitle() {
      const type = this.type;
      const { nextcomType, comType } = this.row;
      if (type === "add") {
        if (nextcomType == "button") {
          return "添加按钮";
        }
        return "添加菜单";
      } else {
        if (comType == "button") {
          return "编辑按钮";
        }
        return "编辑菜单";
      }
    },
    //添加的菜单是否是按钮类型
    buttonType() {
      const { nextcomType, comType } = this.row;

      return nextcomType == "button" || comType == "button";
    },
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        if (this.type == "add") {
          if (Object.keys(this.row).length) {
            this.form.parentId = this.row.id;
            if (this.buttonType) {
              this.form.webRouter = this.row.webRouter;
            }
          }
        } else {
          this.form = { ...this.row, parentId: this.row.parentId };
        }
      } else {
        this.form = this.$options.data().form;
        this.$nextTick(() => {
          this.$refs.ruleForm.clearValidate();
        });
      }
    },
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        webRouter: [
          { required: true, message: "请输入页面路径", trigger: "blur" },
        ],
        permissions: [
          { required: false, message: "请输入权限接口", trigger: "blur" },
        ],
        action: [
          { required: true, message: "请选择按钮类型", trigger: "change" },
        ],
      },
      form: {
        name: "",
        webRouter: "",
        permissions: "",
        parentId: null,
        action: null,
      },
    };
  },
  created() {},
  methods: {
    fetchList() {},
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === "add") {
            creat(this.form).then((res) => {
              this.dialogVisible = false;
              this.$parent.fetchList();
              this.$message.success("添加成功");
            });
          } else {
            update(this.form).then((res) => {
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
