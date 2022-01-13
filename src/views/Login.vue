<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-box-title">
                <span>{{ $t('login.title') }}</span>
                <lang-selector class="login-box-language" />
            </div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="login-box-content">
                <el-form-item prop="username">
                    <el-input disabled v-model="param.username">
                        <template #prepend>
                            <el-button :icon="User"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="accesstoken">
                    <el-input type="password" placeholder="Access-Token" v-model="param.accesstoken" @keyup.enter="submitForm">
                        <template #prepend>
                            <el-button :icon="Lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm">{{ $t('login.loginbutton') }}</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ElMessage as message } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
import LangSelector from '../components/LangSelector.vue';
import * as api from '../api';
import request, { storekey } from '../utils/request';

const router = useRouter();
const i18n = useI18n();
const param = reactive({
    username: computed(() => i18n.t('login.username')),
    accesstoken: '',
});
const rules = {
    accesstoken: [{ required: true, message: i18n.t('login.validationError'), trigger: 'blur' }],
};
const login = ref(null);
const submitForm = () => {
    login.value.validate((valid) => {
        if (valid) {
            request.defaults.headers.common[storekey] = param.accesstoken;
            api.login()
                .then(() => {
                    message.success(i18n.t('login.success'));
                    localStorage.setItem(storekey, param.accesstoken);
                    router.push('/');
                })
                .catch((error) => message.error(i18n.t('login.failed')));
        }
    });
};
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(45, 58, 75);
}

.login-box {
    width: 360px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
    margin-bottom: 8vh;
}

.login-box-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: rgb(238, 238, 238);
    border-bottom: 1px solid #ddd;
    position: relative;
}

.login-box-language {
    position: absolute;
    right: 10px;
    top: 10px;
}

.login-box-content {
    padding: 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>
