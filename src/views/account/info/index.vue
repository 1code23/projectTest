<template>
  <div class="app-container">
    <PageHeader />
    <el-descriptions :column="1" size="medium">
      <el-descriptions-item label="登录账号">{{
        row.account
      }}</el-descriptions-item>
      <el-descriptions-item label="注册时间">{{
        row.createTime
      }}</el-descriptions-item>
      <el-descriptions-item label="账号角色">
        <el-tag>{{ row.roleName }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="账号权限">{{
        row.menuList
      }}</el-descriptions-item>
    </el-descriptions>
    <el-button type="primary" v-has="'operate'" @click="dialogVisible = true"
      >修改密码</el-button
    >
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="400px"
      center
    >
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="auto">
        <el-form-item label="旧密码:" prop="originalPwd">
          <el-input
            v-model="form.originalPwd"
            placeholder="请输入旧密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="newPwd">
          <el-input
            type="password"
            v-model="form.newPwd"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirmPwd">
          <el-input
            type="password"
            v-model="form.confirmPwd"
            placeholder="请输入确认密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { info, pwd } from "@/api/user";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userId"]),
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.form = this.$options.data().form;
      }
    },
  },
  data() {
    return {
      row: {},
      dialogVisible: false,
      rules: {
        originalPwd: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
        newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        confirmPwd: [
          { required: true, message: "请确认密码", trigger: "blur" },
        ],
      },
      form: {
        userId: null,
        originalPwd: "",
        newPwd: "",
        confirmPwd: "",
      },
    };
  },
  created() {
    this.$nextTick(() => {
      // info({ id: this.userId }).then((res) => {
      //   this.row = res.data;
      // });
    });
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let parmas = { ...this.form };
          parmas.userId = this.userId;
          pwd(parmas).then((res) => {
            this.dialogVisible = false;
            this.$message.success("修改成功");
          });
        }
      });
    },
  },
};
</script>

<style>
</style>