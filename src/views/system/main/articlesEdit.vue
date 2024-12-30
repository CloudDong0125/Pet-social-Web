<template>
  <div class="page-container">
    <div class="page-content-box">
      <h1>{{ id ? "编辑" : "新建" }}资讯</h1>
      <el-form label-width="120px" @submit.native.prevent="save" class="mt20">
        <el-form-item label="所属分类">
          <el-select v-model="model.categories" multiple>
            <el-option
              v-for="item in categories"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <!-- <el-form-item label="数量">
          <el-input v-model="model.num"></el-input>
        </el-form-item> -->
        <el-form-item label="详情">
          <vue-editor
            v-model="model.body"
            useCustomImageHandler
            @image-added="handleImageAdded"
          ></vue-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {},
    // num:String
  },
  components: {
    // VueEditor
  },
  data() {
    return {
      model: {},
      categories: [],
      // num:{}
    };
  },
  methods: {
    //图片路径参数修改
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      //定义表单数据
      const formData = new FormData();
      formData.append("file", file);

      //发起请求
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },

    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data.data;
    },
    async fetchCatgories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data.data;
    },
  },
  created() {
    this.fetchCatgories();
    this.id && this.fetch();
  },
};
</script>
