<template>
    <div class="sumdata-list">
        <div class="sumdata-item" v-for="sumdata in dataset" :key="sumdata.title">
            <div class="stitle">{{ sumdata.title }}</div>
            <div class="svalue" :class="sumdata.type || 'text'">{{ formatText(sumdata) }}<span class="unit">{{ sumdata.unit
            }}</span></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SumDataListView",
    props: {
        dataset: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {

        };
    },
    methods: {
        formatText(sumdata) {
            switch (sumdata.type) {
                case "text":
                    return sumdata.value;
                case "money":
                    return parseFloat(sumdata.value).toLocaleString("en-US", { style: "decimal" });
                case "date":
                    return this.formatDate(sumdata.value);
                default:
                    return sumdata.value;
            }
        },
        formatDate(date) {
            if (!date) return "";
            let d = new Date(date);
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
    }
};
</script>

<style lang="scss">
.sumdata-list {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
    padding: 10px 0;
    border-top: 1px solid hsl(0, 0%, 93%);
    border-bottom: 1px solid hsl(0, 0%, 93%);

    .sumdata-item {

        display: flex;
        width: 25%;
        flex-direction: column;
        padding: 10px 0;

        .stitle {
            font-size: 1em;
            font-weight: 500;
            color: #484848;
        }

        .svalue {
            font-size: 1.5em;
            font-weight: bold;

            &.money {
                font-style: italic
            }

            .unit {
                font-size: 0.5em;
                font-weight: normal;
                padding-left: 5px;
                color: #484848;
                font-style: normal;
            }
        }
    }
}</style>