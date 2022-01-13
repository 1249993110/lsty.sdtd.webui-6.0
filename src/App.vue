<template>
    <el-config-provider :locale="locale">
        <router-view></router-view>
    </el-config-provider>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { ElConfigProvider } from 'element-plus';
import { getLocale } from './locales';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';

export default defineComponent({
    components: {
        ElConfigProvider,
    },
    setup() {
        return {
            locale: computed(() => {
                switch (getLocale()) {
                    case 'zh-cn':
                        return zhCn;
                    case 'en':
                        return en;
                }
            }),
        };
    },
});
</script>
