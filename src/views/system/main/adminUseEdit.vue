<template>
     <div class="page-container">
      <div class="page-content-box">
      <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
      <!-- 表单 -->
      <el-form label-width="120px" @submit.native.prevent="save">
        <!-- 表单项目 -->
        <!-- 用户名 -->
        <el-form-item label="用户名">        
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码">
          <el-input type="text" v-model="model.password"></el-input>
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
        model: {
          userType:"adminUser"
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
          res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
        } else {
          //增
          res = await this.$http.post('rest/admin_users', this.model);
        }
        this.$router.push("/admin_users/list");
        this.$message({
          type: "success",
          message: "提交成功了",
        });
      },
  
      //获取分类详情页
      async fetch() {
        const res = await this.$http.get(`rest/admin_users/${this.id}`);
        this.model = res.data;
      },
  
    },
    created() {
      //获取后并执行
      this.id && this.fetch();
  
    },
  };
  </script>