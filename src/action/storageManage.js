/**
 * 存储管理模块
 */
export default {
    userStorage() {
        // 假设这里使用了 localStorage 来存储用户数据
        const storageKey = 'userData';
        return {
            get value() {
                const storedData = localStorage.getItem(storageKey);
                return storedData ? JSON.parse(storedData) : null;
            },
            set value(data) {
                localStorage.setItem(storageKey, JSON.stringify(data));
            }
        };
    }
};
