<template>
    <div class="sidebar-page">
        <section class="sidebar-layout">
            <b-sidebar position="static" :expand-on-hover="expandOnHover" :reduce="reduce"
                :delay="expandWithDelay ? 500 : null" type="is-light" open>
                <div class="p-1">
                    <b-menu>
                        <b-menu-list label="EZLOT v1.0">
                            <b-menu-item>
                                <template #label>
                                    <i class="iconfont icon-home"></i>
                                    HOME
                                </template>
                            </b-menu-item>

                            <b-menu-list>
                                    <b-menu-item :active="shouldExpand" :expanded="shouldExpand"
                                        @click="ChangeView('ProductsView')">
                                        <template #label>
                                            <i class="iconfont icon-products"></i>
                                            Products
                                        </template>
                                        <b-menu-item label="Overview" :active="'ProductsView' === ViewName"
                                            @click="ChangeView('ProductsView')"></b-menu-item>
                                        <b-menu-item label="Prize" :active="'PrizeView' === ViewName"
                                            @click="ChangeView('PrizeView')"></b-menu-item>
                                    </b-menu-item>
                                    
                                </b-menu-list>

                        </b-menu-list>
                    </b-menu>
                </div>
            </b-sidebar>
        </section>
    </div>
</template>

<script>
export default {
    name: "SidebarView",
    data() {
        return {
            expandOnHover: false,
            expandWithDelay: false,
            mobile: "reduce",
            reduce: false,
            ViewName: "HomeView",
            username: "",
            usertype: "user"
        };
    },
    computed: {
        shouldExpand() {
            return 'ProductsView' === this.ViewName || 'PrizeView' === this.ViewName;
        }
    },
    mounted() {
        let view = localStorage.getItem("view");
        this.username = localStorage.getItem("username");
        this.usertype = localStorage.getItem("usertype");
        if (view) {
            this.ChangeView(view);
        } else {
            this.ChangeView("HomeView");
        }
    },
    methods: {
        ChangeView(view) {
            console.log(view);
            this.ViewName = view;
            localStorage.setItem("view", view);
            this.$emit("ChangeView", view);
        },
        Logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("usertype");
            this.$router.push("/");
        }
    }
};
</script>

<style lang="scss">
.p-1 {
    padding: 3em;
}

.sidebar-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;

    // min-height: 100vh;
    .sidebar-layout {
        display: flex;
        flex-direction: row;
        min-height: 100vh;
    }
}

@media screen and (max-width: 1023px) {
    .b-sidebar {
        .sidebar-content {
            height: 100%;
            padding: .5em 0;

            &.is-mini-mobile {

                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: inline-block;
                                }
                            }

                            ul {
                                padding-left: 0;

                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }

                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}

@media screen and (min-width: 1024px) {
    .b-sidebar {
        .sidebar-content {
            height: 100%;
            padding: .5em 1em;

            &.is-mini {

                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: inline-block;
                                }
                            }

                            ul {
                                padding-left: 0;

                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }

                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}

.user-name {
    display: flex;
    align-items: center;
    cursor: pointer;

    i {
        margin: 0 .5em;
    }

    .icon-shop {
        width: 30px;
        height: 30px;
        display: block;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.12), 0px 2px 5px rgba(60, 66, 87, 0.08);
        color: #A3ACB9;
    }
}

.is-custom-mobile {
    margin-top: 1em;
}

.is-mini-expand {
    .menu-list a {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.menu-list a.is-active {
    background-color: transparent !important;
    color: $base-color !important;
}

.b-sidebar .sidebar-content {
    box-shadow: none !important;
    border-right: 2px solid hsl(0, 0%, 93%);
}
</style>