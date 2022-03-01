<template>
  <div class="app-container">
    <PageHeader
      text="（根据《Android隐私合规检测规范_191和164文件应用》等其他67份文件进行合规检测）"
    >
      <div slot="right">
        <el-button type="primary"
          ><i class="el-icon-plus"></i>添加检测应用</el-button
        >
      </div>
    </PageHeader>
    <el-row :gutter="10">
      <el-col :span="4">
        <SearchLabel label="应用名称">
          <el-input
            style="width: 100%"
            v-model="queryModel.keyword"
            placeholder="请输入应用名称"
          ></el-input>
        </SearchLabel>
      </el-col>
      <el-col :span="5">
        <SearchLabel label="开发单位">
          <el-input
            style="width: 100%"
            v-model="queryModel.keyword"
            placeholder="请输入应用开发者单位名称"
          ></el-input>
        </SearchLabel>
      </el-col>
      <el-col :span="8">
        <SearchLabel label="检测进程">
          <SearchSelect :options="options" v-model="queryModel.id" />
        </SearchLabel>
      </el-col>
      <el-col :span="5">
        <SearchLabel label="检测结果">
          <SearchSelect :options="options1" v-model="queryModel.id" />
        </SearchLabel>
      </el-col>
      <el-col :span="2">
        <Shrinkage style="margin-top: 10px" v-model="queryModel.closed" />
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 20px" v-if="!queryModel.closed">
      <el-col :span="4">
        <SearchLabel label="权限规则">
          <el-select v-model="queryModel.keyword" placeholder="选择权限规则">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </SearchLabel>
      </el-col>
      <el-col :span="7">
        <SearchLabel label="上传时间">
          <el-date-picker
            style="width: 100%"
            v-model="queryModel.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </SearchLabel>
      </el-col>
      <el-col :span="7">
        <SearchLabel label="检测时间">
          <el-date-picker
            style="width: 100%"
            v-model="queryModel.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </SearchLabel>
      </el-col>
      <el-col :span="5">
        <SearchLabel label="检测人员">
          <el-input
            style="width: 100%"
            v-model="queryModel.keyword"
            placeholder="请输入检测人员名称"
          ></el-input>
        </SearchLabel>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      :header-cell-style="{ background: '#FAFAFA' }"
      style="width: 100%; margin: 20px 0"
    >
      <el-table-column label="应用名称" prop="name" />
      <el-table-column label="开发者单位名称" prop="name" :min-width="100" />
      <el-table-column label="应用来源" prop="name" />
      <el-table-column label="应用版本" prop="name" />
      <el-table-column label="权限规则" prop="name" />
      <el-table-column label="检测人员" prop="name" />
      <el-table-column label="上传时间" prop="name" />
      <el-table-column label="检测时间" prop="name" fixed="right" />
      <el-table-column label="检测进程" prop="name" fixed="right" />
      <el-table-column label="检测结果" prop="name" fixed="right" />
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="{ row }">
          <el-button type="text">详情</el-button>
          <el-button type="text">重测</el-button>
          <el-button type="text">修改</el-button>
          <el-button type="text">报告</el-button>
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
</template>

<script>
import { SearchSelect, Shrinkage } from "@/components/SearchBlock";
export default {
  components: { SearchSelect, Shrinkage },
  data() {
    return {
      options: [
        { id: 0, name: "全部" },
        { id: 1, name: "待检测" },
        { id: 2, name: "检测中" },
        { id: 3, name: "已检测" },
        { id: 4, name: "检测失败" },
      ],
      options1: [
        { id: 0, name: "全部" },
        { id: 1, name: "未通过" },
        { id: 2, name: "已通过" },
      ],
      queryModel: {
        closed: true,
        id: 0,
        keyword: "",
        total: 0,
        page: 1,
        size: 10,
        date: null,
      },
      tableData: [],
    };
  },
  methods: {
    fetchList() {},
  },
};
</script>

<style lang="scss" scoped>
</style>