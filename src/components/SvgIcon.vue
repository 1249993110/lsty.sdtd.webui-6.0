<template>
    <svg aria-hidden="true" class="svg-icon">
        <use :xlink:href="symbolId" :fill="color" />
    </svg>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'SvgIcon',
    props: {
        prefix: {
            type: String,
            default: 'icon',
        },
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: '#333',
        },
    },
    setup(props) {
        const symbolId = computed(() => `#${props.prefix}-${props.name}`);
        return { symbolId };
    },
});
</script>

<style scoped>
.svg-icon {
    width: 20px;
    height: 20px;
}
</style>
