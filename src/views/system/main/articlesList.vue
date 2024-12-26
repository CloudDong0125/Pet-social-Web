<template>
     <div class="page-container">
      <div class="page-content-box">
      <h1>文章列表</h1>
  
      <div style="margin-top: 15px; width:500px" >
        <!-- 查询框 -->
        <el-input
          placeholder="请输入标题"
          v-model="input"
          class="input-with-select"
        >
          <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="标题" value="title"></el-option>
        </el-select> -->
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-input>
      </div>
  
      <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="230"> </el-table-column>
  
        <el-table-column prop="title" label="标题"> </el-table-column>
  
        <!-- <el-table-column prop="num" label="数量"> </el-table-column> -->
  
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/articles/edit/${scope.row._id}`)"
            >
              编辑
            </el-button>
  
          
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
        input: "",
        select: "title",
      };
    },
  
    methods: {
      //查询
      async fetch(type) {
        let url = "rest/articles";
        if (type) {
          //传选择的参数
          url = url + "?" + type + "=" + this.input;
        }
        const res = await this.$http.get(url);
        this.items = res.data.data;
      },
      async remove(row) {
        this.$confirm(`是否确定要删除文章"${row.title}"`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          const res = await this.$http.delete(`rest/articles/${row._id}`);
   
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetch(); //重新获取数据
        });
      },
      search() {
        this.fetch(this.select); //重新获取数据
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