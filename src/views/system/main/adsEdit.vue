<template>
  <div class="page-container">
    <div class="page-content-box">
      <!-- 广告编辑 -->
      <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
      <el-form label-width="120px" @submit.native.prevent="save" class="mt20">
        <el-form-item label="名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="广告">
          <el-button size="small" @click="model.items.push({})">
            <i class="el-icon-plus"></i> 添加广告
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="24" v-for="(item, i) in model.items" :key="i">
              <!-- <el-form-item label="跳转链接 (URL)">
                <el-input v-model="item.url"></el-input>
              </el-form-item> -->
              <el-form-item label="图片" style="margin-top: 0.5rem">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'image', res.url)"
                >
                  <img v-if="item.image" :src="item.image" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.items.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        items: [],
      },
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
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        //增
        res = await this.$http.post("rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "提交成功了",
      });
    },

    //获取分类详情页
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = res.data;
    },

    //获取父级的选项
    async fetchParents() {
      const res = await this.$http.get(`rest/ads`);
      this.parents = res.data;
    },
  },
  created() {
    //获取后并执行
    this.id && this.fetch();
  },
};
</script>
