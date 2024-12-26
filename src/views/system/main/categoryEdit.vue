<template>
  <div class="page-container">
    <div class="page-content-box">
      <h1>{{ id ? "编辑" : "新建" }}分类</h1>
      <!-- 表单 -->
      <el-form label-width="120px" @submit.native.prevent="save" class="mt20">
        <el-form-item label="上级分类">
          <div class="input_select">
            <el-select v-model="model.parent">
              <el-option
                v-for="item in parents"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="名称">
          <div class="input_select">
            <el-input v-model="model.name"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {},
      parents: [],
    };
  },
  props: {
    id: {},
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        //改
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        //增
        res = await this.$http.post("rest/categories", this.model);
      }
      this.$router.push("/main/categoryList");
      this.$message({
        type: "success",
        message: "提交成功了",
      });
    },

    //获取分类详情页
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data.data;
    },

    //获取父级的选项
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data.data;
    },
  },
  created() {
    //获取后并执行
    this.id && this.fetch();
    this.fetchParents();
  },
};
</script>

<style>
.input_select {
  width: 220px !important;
}
</style>
