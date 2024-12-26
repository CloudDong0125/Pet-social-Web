<template>
  <div class="page-container">
    <div class="page-content-box">
      <h1>新建列表</h1>

      <el-table :data="items" stripe height="100%" class="mt20">
        <el-table-column  prop="_id" label="ID" />
        <el-table-column prop="parent.name" label="上级分类"> </el-table-column>
        <el-table-column prop="name" label="分类名称"> </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template v-slot:default="scope">
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/main/categoryEdit/${scope.row._id}`)"
            >
              编辑
            </el-button>

            <el-button type="text" size="small" @click="remove(scope  .row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<!-- <script>
export default {
  data() {
    return {
      items: [],
    };
  },

  methods: {
    async fetch() {
      const res = await this.$http.get("rest/categories");
      console.log(res.data.data);
      this.items = res.data.data;
    },
    async remove(row) {
      this.$confirm(`是否确定要删除分类"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/categories/${row._id}`);

        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch(); //重新获取数据
      });
    },
  },
  created() {
    this.fetch();
  },
  mounted() {},
};
</script> -->
<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const instance = getCurrentInstance();
const $http = instance.appContext.config.globalProperties.$http;

const items = ref([]);

const fetch = async (row) => {
  const res = await $http.get("rest/categories");
  console.log(res.data.data);
  items.value = res.data.data;
};

const remove = async (row) => {
  await ElMessageBox.confirm(`是否确定要删除分类"${row.name}"`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  });

  const res = await $http.delete(`rest/categories/${row._id}`);

  ElMessage({
    type: "success",
    message: "删除成功!",
  });
  fetch(); // 重新获取数据
};
onMounted(() => {
  fetch();
});
</script>
