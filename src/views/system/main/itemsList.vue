<template>
  <div class="page-container">
    <div class="page-content-box">
      <!-- 宠物管理:小宠之星列表 -->
      <h1>小宠之星</h1>

      <!-- 搜索框 -->
      <div style="margin-top: 15px; width:500px" class="mt20">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <template v-slot:prepend>
            <el-select v-model="select" placeholder="请选择">
              <el-option label="小宠名称" value="name"></el-option>
              <el-option label="品种" value="pettype"></el-option>
              <el-option label="宠龄" value="old"></el-option>
            </el-select>
          </template>
          <template v-slot:append>
            <el-button icon="el-icon-search" @click="search"></el-button>
          </template>
        </el-input>
      </div>

      <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="230"> </el-table-column>
        <el-table-column prop="name" label="小宠名称"> </el-table-column>

        <el-table-column prop="icon" label="图标">
          <!-- 自定义 -->
          <template v-slot:default="scope">
            <img :src="scope.row.icon" style="height:3rem"></img>
          </template>
        </el-table-column>

        <el-table-column prop="pettype" label="品种">
        </el-table-column>

        <el-table-column prop="old" label="宠龄">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="180">
          <template v-slot:default="scope">
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/main/itemsEdit/${scope.row._id}`)"
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

<script setup>
import { ref, onMounted,getCurrentInstance } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';


const instance = getCurrentInstance();
const $http = instance.appContext.config.globalProperties.$http;

const items = ref([]);
const input = ref('');
const select = ref('name');

const fetch = async (type) => {
  let url = 'rest/items';
  if (type) {
    url = url + '?' + type + '=' + input.value;
  }
  const res = await $http.get(url);
  items.value = res.data.data.reverse();
};

const remove = async (row) => {
  await ElMessageBox.confirm(`是否确定要删除分类"${row.name}"`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });

  const res = await $http.delete(`rest/items/${row._id}`);

  ElMessage({
    type: 'success',
    message: '删除成功!',
  });
  fetch();
};

const search = () => {
  fetch(select.value);
};

onMounted(() => {
  fetch();
});
</script>

<style>
.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
  width: 130px;
  padding: 0 !important;
}
</style>
