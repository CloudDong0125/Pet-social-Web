<script>
/*
 * 标签切换按钮组件
 */
 import {
    defineComponent,
    ref,
    reactive,
    computed,
    onMounted,
    watch,
    toRef,
    onUnmounted,
    nextTick,
} from 'vue';
import SvgIcon from '@/components/svgIcon/index.vue';
export default defineComponent({
    name: 'TagList',
    components: {
        SvgIcon,,
    },
})

</script>

<template>
    <div class="tag-list-cp-container">
        <div :class="{
                left: true,
                'show-right': dataContainer.showRight,
                'show-left': dataContainer.showLeft,
            }"
            @wheel="handleScroll">

        </div>
    </div>
</template>


<style scoped lang="scss">
.tag-list-cp-container {
    height: 100%;
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: var(--text-color);
    --item-gap: 10px;
    padding: 0 var(--item-gap) 0 0;
    :deep(.defin-drop) {
        height: 100% !important;
        width: 100% !important;
        > .defin-drop-target {
            height: 100% !important;
            width: 100% !important;
        }
    }
    > .left {
        flex: 1 1 0;
        width: 0;
        height: 100%;
        position: relative;
        margin-right: var(--item-gap);
        &.show-left {
            &::after {
                opacity: 1;
            }
        }
        &.show-right {
            &::before {
                opacity: 1;
            }
        }
        &::after {
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s;
            content: ' ';
            position: absolute;
            left: 0;
            top: 0;
            width: var(--item-gap);
            height: 100%;
            background-image: linear-gradient(to right, #3c3f45, transparent);
            z-index: 9;
        }
        &::before {
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s;
            content: ' ';
            position: absolute;
            right: 0;
            top: 0;
            width: var(--item-gap);
            height: 100%;
            background-image: linear-gradient(to right, transparent, #3c3f45);
            z-index: 9;
        }
        :deep(.scrollbar) {
            width: 100%;
            height: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            .scrollbar-container {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                width: fit-content;
                height: 100%;
                padding: 0 var(--item-gap);
                box-sizing: border-box;
                .item {
                    cursor: pointer;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    padding: 5px 10px;
                    box-sizing: border-box;
                    margin: 0 10px 0 0;
                    font-size: 12px;
                    font-weight: bold;
                    height: 30px;
                    width: max-content;
                    border-radius: 5px;
                    color: var(--text-color);
                    position: relative;
                    transition: all 0.2s;
                    opacity: 0.8;
                    --bt-width: 20px;
                    --bt-width-1: calc(var(--bt-width) / 2);
                    &:last-child {
                        margin: 0;
                    }
                    &.active {
                        background-color: #5340ff;
                        color: var(--text-color-2);
                        font-weight: bold;
                        opacity: 1;
                        box-shadow: var(--box-shadow-2);
                    }
                    &.is-select {
                        box-shadow: inset 0 0 0 2px #5340ff !important;
                    }
                    &:hover {
                        background-color: #5340ff;
                        > .bt {
                            opacity: 1;
                            width: var(--bt-width);
                            right: calc(0px - var(--bt-width-1));
                        }
                    }
                    > .sign {
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background-color: #5240ff;
                        margin-right: 5px;
                        &.icon-sign {
                            background-color: transparent;
                        }
                    }
                    > .bt {
                        opacity: 0;
                        width: 0;
                        height: var(--bt-width);
                        border-radius: 100%;
                        display: flex;
                        position: absolute;
                        right: 0;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        transition: all 0.2s;
                        border: 2px solid rgb(228, 228, 228);
                        box-sizing: border-box;
                        &:hover {
                            color: red;
                            border: 2px solid red;
                        }
                    }
                    > .cache {
                        width: 30%;
                        max-width: 30px;
                        min-width: 15px;
                        height: 3px;
                        border-radius: 999px;
                        background-color: rgba(255, 255, 255, 0.397);
                        position: absolute;
                        bottom: -1px;
                        box-shadow: var(--box-shadow-2);
                    }
                }
                .add-bt {
                    width: 30px;
                    height: 30px;
                    background-color: rgb(0, 0, 0);
                    border-radius: 50%;
                    padding: 0;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    color: rgb(202, 202, 202);
                    border: 2px solid #7768ff;
                    &:hover {
                        background-color: #5340ff;
                        opacity: 1;
                        transform: scale(1.2);
                    }
                }
            }
        }
    }
    > .right {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 0px 0 0px;
        box-sizing: border-box;
        height: 100%;
        > * {
            margin: 0 0 0 15px;
            &:first-child {
                margin: 0;
            }
        }
        .bt {
            cursor: pointer;
            transition: all 0.2s;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            color: #c2c2c2;
            &:hover {
                color: #ffffff;
            }
        }
    }
}
</style>