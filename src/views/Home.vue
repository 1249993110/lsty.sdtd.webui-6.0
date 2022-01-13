<template>
    <el-container>
        <el-aside width="210px">
            <el-menu
                :default-active="selectedMenu"
                class="navmenuContainer"
                @select="handleSelectMenu"
                background-color="#001529"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <el-menu-item v-for="(item, index) in menus" :index="item.name">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header height="48px" class="header">天依七日杀服务器管理系统</el-header>
            <el-main>
                <el-tabs v-model="selectedTab" type="card" closable @tab-remove="removeTab">
                    <el-tab-pane class="el-tab-pane" v-for="(item, index) in tabPanes" :key="index" :label="item.title" :name="item.name">
                        <router-view></router-view>
                        <!-- <router-view v-slot="{ Component }">
                            <transition name="move" mode="out-in">
                                <keep-alive :include="tagsList">
                                    <component :is="Component" />
                                </keep-alive>
                            </transition>
                        </router-view>-->
                    </el-tab-pane>
                </el-tabs>
            </el-main>
            <el-footer height="72px">
                <p class="footer">LSTY.Sdtd 6.0 ™ Copyright © 2021 IceCoffee</p>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script setup>
import { watch, ref, reactive } from 'vue';

const selectedTab = ref('');
const selectedMenu = ref('live-players');
const menus = reactive([
    {
        name: 'live-players',
        title: '在线玩家',
        url: '/webcontrol/live-players.html',
        icon: 'el-icon-user',
    },
    {
        name: 'history-players',
        title: '历史玩家',
        url: '/webcontrol/history-players.html',
        icon: 'el-icon-user-solid',
    },
    {
        name: 'chat-message',
        title: '实时聊天',
        url: '/webcontrol/chat-message.html',
        icon: 'el-icon-chat-dot-square',
    },
    {
        name: 'chat-record',
        title: '聊天记录',
        url: '/webcontrol/chat-record.html',
        icon: 'el-icon-chat-line-square',
    },
    {
        name: 'console',
        title: '控制台',
        url: '/webcontrol/console.html',
        icon: 'el-icon-loading',
    },
    {
        name: 'api-document',
        title: '接口文档',
        url: '/api/swagger/index.html',
        icon: 'el-icon-document',
        externalLink: true,
    },
]);
const tabPanes = ref([]);

const addTab = (menuName) => {
    const menu = menus.find((item) => item.name === menuName);

    if (menu.externalLink) {
        window.open(window.origin + menu.url);
    } else {
        tabPanes.value.push(menu);
        selectedTab.value = menuName;
    }
};
const removeTab = (targetName) => {
    let tabs = tabPanes.value;
    let activeName = selectedTab.value;
    if (activeName === targetName) {
        tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                    activeName = nextTab.name;
                }
            }
        });
    }

    selectedTab.value = activeName;
    tabPanes.value = tabs.filter((tab) => tab.name !== targetName);
};
const handleSelectMenu = (menuName) => {
    if (tabPanes.value.find((item) => item.name === menuName)) {
        selectedTab.value = menuName;
    } else {
        addTab(menuName);
    }
};

watch(selectedTab, (newValue, oldValue) => {
    //直接监听
    selectedMenu.value = newValue;
});

addTab('live-players');
</script>

<style scoped>
.el-container {
    width: 100%;
    height: 100%;
}

.navmenuContainer {
    height: 100%;
}

.el-tab-pane {
    height: calc(100vh - 216px);
}

.header {
    color: #1890ff;
    font-weight: 600;
    font-size: 20px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    text-align: center;
    line-height: 48px;
    padding-top: 10px;
}

.footer {
    text-align: center;
    color: #a0a0a0;
}
</style>
