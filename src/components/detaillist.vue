<template>
    <div class="detail-list">
        <div class="detail-item" v-for="header in dataset.headers" :key="header.key">
            <span>{{ header.text }}</span>
            <span v-if="header.type == 'text'">{{ dataset.row[header.key] }}</span>
            <span v-if="header.type == 'map'">{{ header.map[dataset.row[header.key]] }}</span>
            <span v-if="header.type == 'date'">{{ formatDate(dataset.row[header.key]) }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailListView",
    props: {
        dataset: {
            type: Object,
            default: () => {
                return {
                };
            }
        }
    },
    data() {
        return {

        };
    },
    methods: {
        formatDate(date) {
            if (!date) return "";
            let d = new Date(date);
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
    }
};
</script>

<style lang="scss">
.detail-list {
    display: flex;
    flex-direction: column;
    .detail-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid hsl(0, 0%, 93%);
        padding: 10px 0;
        span {
            font-size: 1em;
        }
    }
}
</style>