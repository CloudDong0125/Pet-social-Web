<template>
      <div class="page-container">
        <div class="page-content-box">
      <h1>{{ id ? "编辑" : "新建" }}小宠之星</h1>
      <!-- 表单 -->
      <el-form label-width="120px" @submit.native.prevent="save" class="mt20">
        <!-- 表单项目 -->
        <el-form-item label="选择宠物" style="width: 400px">
          <el-select
          filterable
          :multiple="false"
            @change="changeSelect"
            v-model="model.name"
            placeholder="请选择宠物"
          >
            <el-option
              v-for="user in userlist"
              :key="user._id"
              :label="user.username"
              :value="user.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品种" style="width: 400px">
          <el-input :disabled="true" v-model="model.pettype"></el-input>
        </el-form-item>
        <el-form-item label="宠龄" style="width: 400px">
          <el-input :disabled="true" v-model="model.old"></el-input>
        </el-form-item>
        <el-form-item label="图标">
            <img v-if="model.icon" :src="model.icon" class="avatar" />
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
          icon: "",
        },
        userlist: [],
      };
    },
    props: {
      id: {},
    },
    methods: {
      //获取用户列表
  
      afterUpload(res) {
        //显示赋值
        this.model.icon = res.url;
        // this.$set(this.model,'icon',res.url)
        // this.model.icon = res.url
      },
  
      async save() {
        let res;
        if (this.id) {
          //改
          res = await this.$http.put(`rest/items/${this.id}`, this.model);
        } else {
          //增
          res = await this.$http.post("rest/items", this.model);
        }
        this.$router.push("/main/itemsList");
        this.$message({
          type: "success",
          message: "提交成功了",
        });
      },
  
      //获取分类详情页
      async fetch() {
        const res = await this.$http.get(`rest/items/${this.id}`);
        this.model = res.data.data;
      },
  
      //获取父级的选项
      async fetchParents() {
        const res = await this.$http.get(`rest/items`);
        this.parents = res.data.data;
      },
      async getUserList() {
        const res = await this.$http.get("rest/admin_users?userType=webUser");
        this.userlist = res.data.data;
      },
      changeSelect(value) {
        // alert(value)
        this.userlist.forEach((item) => {
          if (item.username == value) {
            this.model = item;
            this.model.name=item.username;
            this.model.userid = item._id;
            delete this.model["_id"]
          }
        }); 
       },
    },
    mounted() {},
    created() {
      //获取后并执行
      this.getUserList();
      this.id && this.fetch();
    },
  };
  </script>
  <style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  </style>