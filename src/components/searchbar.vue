<template>
    <div class="searchbar">
        <div class="search-input">
            <i class="iconfont icon-sousuo"></i>
            <input type="text" placeholder="Search..." v-model="keyword">
        </div>
        <div class="actions">
            <i class="iconfont icon-switch" @click="layout"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: "SearchBarView",
    data() {
        return {
            keyword: ''
        };
    },
    watch: {
        keyword() {
            this.searchData();
        }
    },
    methods: {
        searchData() {
            this.$emit('search', this.keyword);
        },
        layout() {
            this.$emit('layout');
        }
    }
};
</script>

<style lang="scss">
.searchbar{
    border-bottom: 2px solid hsl(0, 0%, 93%);
    display: flex;
    align-items: center;
    padding: 10px 30px;
    .search-input{
        flex: 1;
        display: flex;
        align-items: center;
        input{
            border: none;
            outline: none;
            font-size: 16px;
            margin-left: 10px;
            width: 100%;
        }
        i{
            font-size: 24px;
            color: $font-secondary-color;
        }
    }
    .actions{
        display: flex;
        align-items: center;
        justify-content: space-between;
        i{
            font-size: 24px;
            color: $font-secondary-color;
            cursor: pointer;
            &:hover{
                color: $font-primary-color;
            }
        }
    }
}
</style>