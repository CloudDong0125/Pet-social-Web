<template>
     <div class="page-container">
        <div class="page-content-box">
      <!-- 管理员：用户列表 -->
      <h1>用户列表</h1>
     
       <!-- 搜索框 -->
      <div style="margin-top: 15px; width:500px">
      <el-input  placeholder="请输入小宠名称" v-model="input" class="input-with-select">
      <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="小宠名称" value="name"></el-option>
        <el-option label="品种" value="pettype"></el-option>
        <el-option label="宠龄" value="old"></el-option>
      </el-select> -->
      <el-button slot="append" icon="el-icon-search" @click="search"
  ></el-button>
    </el-input>
  </div>
  
  
      <el-table :data="items">
        
        <el-table-column prop="_id" label="ID" width="230"> </el-table-column>
        
        <el-table-column prop="username" label="小宠名称"> </el-table-column>
        <el-table-column prop="icon" label="图标"> 
          <!-- 自定义 -->
          <!-- <template slot-scope="scope">
            <img :src="scope.row.icon"
             style="height:3rem"></img>
          </template> -->
  
        </el-table-column>
        <el-table-column prop="pettype" label="品种"> </el-table-column>
  
        <el-table-column prop="old" label="宠龄"> </el-table-column>
  
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              size="small"
              @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
            >
              编辑
            </el-button> -->
            <el-button
              type="success"
              size="small"
              v-if="scope.row.lock == 1"
              @click="clickOpen(scope.row)"
              >启用</el-button
            >
            <el-button
              type="danger"
              size="small"
              v-else
              @click="clickStop(scope.row)"
              >禁言</el-button
            >
            <el-button type="text" size="small" @click="remove(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [],
        //与查询有关的数据
        input: "",
        select: "username",
      };
    },
  
    methods: {
      //查询
      async fetch(type) {
        let url = "rest/admin_users?userType=webUser";
        if (type) {
  
          //传选择的参数
          url = url + "&" + type + "=" + this.input;
        }
        const res = await this.$http.get(url);
        this.items = res.data.data;
      },
      //启用
      async clickOpen(row) {
        //基本写法
        // row.lock = 1;
        // var res = await this.$http.put(`rest/admin_users/${row._id}`, row);
        // this.fetch();
  
        //添加提示写法
        this.$confirm(`是否确定要启用"${row.username}"`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          row.lock = 0;
          var res = await this.$http.put(`rest/admin_users/${row._id}`, row);
  
          this.$message({
            type: "success",
            message: "启用成功!",
          });
          this.fetch(); //重新获取数据
        });
      },
      //禁止
      async clickStop(row) {
        // row.lock = 1;
        // var res = await this.$http.put(`rest/admin_users/${row._id}`, row);
        // this.fetch();
  
        this.$confirm(`是否确定要禁言"${row.username}"`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          row.lock = 1;
          var res = await this.$http.put(`rest/admin_users/${row._id}`, row);
  
          this.$message({
            type: "success",
            message: "禁言成功!",
          });
          this.fetch(); //重新获取数据
        });
      },
      //删除
      async remove(row) {
        this.$confirm(`是否确定要删除"${row.username}"`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          const res = await this.$http.delete(`rest/admin_users/${row._id}`);
  
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetch(); //重新获取数据
        });
      },
  
      // 搜索框
      search() {
        this.fetch("username"); //重新获取数据
      },
    },
  
    created() {
      this.fetch();
    },
  };
  </script>
  <style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  </style>