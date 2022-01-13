<template>
    <el-dropdown trigger="click" @command="changeLocale" class="el-dropdown">
        <SvgIcon name="language" color="white"></SvgIcon>
        <template #dropdown>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :disabled="language === 'zh-cn'" command="zh-cn"> 中文 </el-dropdown-item>
                <el-dropdown-item :disabled="language === 'en'" command="en"> English </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { changeLocale, getLocale } from '../locales';
import { computed } from 'vue';
import SvgIcon from '../components/SvgIcon.vue';

const language = computed(getLocale);
</script>

<style scoped>
.el-dropdown {
    cursor: pointer;
}
</style>
