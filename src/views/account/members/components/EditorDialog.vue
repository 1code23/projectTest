<template>
  <el-dialog
    :title="type == 'add' ? '添加用户' : '编辑用户'"
    :visible.sync="dialogVisible"
    width="400px"
    center
  >
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password" v-if="type == 'add'">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="登录方式:" prop="account">
        <div style="margin-bottom: 10px">
          <el-radio v-model="form.type" :label="1">手机号登录</el-radio>
          <el-radio v-model="form.type" :label="2">邮箱登录</el-radio>
        </div>
        <el-input
          v-model="form.account"
          placeholder="请输入手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色:" prop="roleId">
        <el-select v-model="form.roleId" placeholder="请选择角色">
          <el-option
            v-for="role in roleList"
            :key="role.id"
            :label="role.name"
            :value="role.id"
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
import { creat, update, pwdReset } from "@/api/members";
import { mapGetters } from "vuex";
export default {
  props: { isShow: Boolean, row: Object, type: String },
  computed: {
    ...mapGetters(["roleList"]),
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
        this.form = { ...this.form, ...this.row };
      } else {
        this.form = this.$options.data().form;
      }
    },
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
      form: {
        name: "",
        password: "",
        roleId: null,
        type: 1,
        account: "",
      },
    };
  },
  created() {
    this.$store.dispatch("account/updateRoleList");
  },
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
