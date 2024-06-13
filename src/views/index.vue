<template>
    <div class="index">
        <div class="sidebar">
            <!-- Sidebar component -->
            <Sidebar @ChangeView="ChangeView"></Sidebar>
        </div>
        <div class="content">
            <!-- Content component -->
            <SearchBar @search="searchData" @layout="layout"></SearchBar>
            <div class="content-view" :class="{ 'nodisplay': DetailViewBody }">
                <component @ShowDetailView="ShowDetailView" :is="ViewBody" :keyword="keyword"></component>
            </div>
            <div class="content-detail-view">
                <component @HideDetailView="HideDetailView" :pageData="pageData" :is="DetailViewBody"></component>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/sidebar.vue';
import SearchBar from '@/components/searchbar.vue';
export default {
    name: "IndexView",
    // Component logic goes here
    components: {
        Sidebar,
        SearchBar
    },
    props: {
        // Component props go here
    },
    data() {
        return {
            // Component data goes here
            ViewBody: null,
            DetailViewBody: null,
            pageData: null,
            keyword: ""
        };
    },
    methods: {
        // Component methods go here
        ChangeView(view) {
            this.ViewBody = () => import(`./content/${view}.vue`).catch(() => import(`./content/ProductView.vue`));
        },
        ShowDetailView(data) {
            this.pageData = data.pageData;
            this.DetailViewBody = () => import(`./content/${data.view}.vue`).catch(() => import(`./content/ProductView.vue`));
        },
        HideDetailView() {
            console.log("HideDetailView");
            this.DetailViewBody = null;
        },
        searchData(keyword) {
            this.keyword = keyword;
        },
        layout() {
            this.$buefy.dialog.confirm({
                title: 'LAY OUT',
                message: 'Are you sure you want to log out?',
                confirmText: 'Log out',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => {
                    localStorage.removeItem('token');
                    this.$router.push({ path: "/" });
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.nodisplay {
    display: none;
}

.index {
    display: flex;
}

.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
}

.content {
    margin-left: 258px;
    flex: 1;
    display: flex;
    flex-direction: column;

    /* Content styles */
}
</style>
