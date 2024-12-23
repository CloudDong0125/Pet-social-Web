// 1 导入 defineStore:
import {
    defineStore
} from 'pinia'

// 2 设置起始和结束日期：
const startDate = new Date();
const endDate = new Date();
endDate.setDate(startDate.getDate() + 1);

// 3 定义 main 存储:
const useMainStore = defineStore("main", {
    state: () => ({
        startDate: startDate,
        endDate: endDate,
        isLoading: false, // loading
    })
})

// 4 导出存储:
export default useMainStore;