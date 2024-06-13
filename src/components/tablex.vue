<template>
    <div class="tablex">
        <div class="actions">
            <b-button v-if="actions.add" type="is-success is-light" size="is-small" @click="toAdd">
                <i class="iconfont icon-add"></i>
                <span>新增</span>
            </b-button>
            <b-button v-if="actions.update" type="is-primary is-light" size="is-small" @click="toUpdate">
                <i class="iconfont icon-editor"></i>
                <span>修改</span></b-button>
            <b-button v-if="actions.delete" type="is-danger is-light" size="is-small" @click="toDelete"><i
                    class="iconfont icon-ashbin"></i>
                <span>删除</span></b-button>
        </div>
        <div class="tabsx" v-if="tabs">
            <div class="tabx" :class="{ 'active': tab.active }" v-for="tab in tabsx" :key="tab.id" @click="SelectTab(tab)">
                {{ tab.name }}
            </div>
        </div>
        <div class="contentx">
            <div class="rowx header">

                <div class="cellx title" :style="header.style || {}" v-for="header in dataset.headers" :key="header.key">
                    <span>{{ header.text }}</span>
                </div>
            </div>
            <div class="rowx" v-for="row in dataset.rows" :key="row.id">

                <div class="cellx" :style="cell.style || {}" v-for="cell in dataset.headers" :key="cell.key">
                    <b-tooltip :active="cell.tootip == true" :label="getLabelName(row, cell)" position="is-right">
                        <span v-if="cell.type == 'text'">{{ row[cell.key] }}{{ cell.unit }}</span>
                        <span v-if="cell.type == 'map'">{{ cell.map[row[cell.key]] }}</span>
                        <span v-if="cell.type == 'calculate'">{{ CalculateValue(row, cell) }}{{ cell.unit }}</span>
                        <span v-if="cell.type == 'json'">{{ cell.handler(row[cell.key]) }}</span>
                        <span style="font-size: 12px;" v-if="cell.type == 'date'">{{ formatDate(row[cell.key]) }}</span>
                    </b-tooltip>

                </div>
                <div class="cellx action actions">
                    <span v-if="rowActions.view" @click="ActionView(row)" class="iconfont icon-more"></span>
                    <b-button v-if="rowActions.update" @click="ActionUpdate(row)" type="is-primary is-light" size="is-small">
                        <i class="iconfont icon-editor"></i>
                        <span>修改</span>
                    </b-button>
                    <b-button v-if="rowActions.delete" @click="ActionDelete(row)" type="is-danger is-light" size="is-small">
                        <i class="iconfont icon-ashbin"></i>
                        <span>删除</span>
                    </b-button>
                </div>
            </div>
            <div class="pager" v-if="pager">
                <div class="counter">
                    <span class="b">{{ dataset.rows.length }}</span>
                    <span> 结果</span>
                </div>
                <div class="actions">
                    <b-button size="is-small is-light">上一页</b-button>
                    <b-button size="is-small is-light">下一页</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as math from 'mathjs';
export default {
    name: "TableXView",
    props: {
        tabs: {
            type: Array,
            default: () => []
        },
        dataset: {
            type: Object,
            default: () => ({
                headers: [

                ],
                rows: []
            })
        },
        pager: {
            type: Boolean,
            default: true
        },
        view: {
            type: Boolean,
            default: true
        },
        actions: {
            type: Object,
            default: () => {
                return {
                    view: true,
                    add: true,
                    update: true,
                    delete: true
                }
            }
        },
        rowActions: {
            type: Object,
            default: () => {
                return {
                    view: false,
                    update: true,
                    delete: true
                }
            }
        }
    },
    data() {
        return {
            tabsx: []
        }
    },
    mounted() {
        this.tabsx = this.tabs;
    },
    methods: {
        SelectTab(tab) {
            this.tabsx.forEach(tabx => {
                tabx.active = false;
            });
            tab.active = true;
            this.$forceUpdate();
        },
        getLabelName(row, cell) {
            switch (cell.type) {
                case 'text':
                    return row[cell.key] + "";
                case 'map':
                    return cell.map[row[cell.key]];
                case 'date':
                    return this.formatDate(row[cell.key]);
                default:
                    return row[cell.key] + "";
            }
        },
        formatDate(date) {
            if (!date) return "";
            let d = new Date(date);
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        },
        ActionView(row) {
            this.$emit("ActionView", row);
        },
        ActionUpdate(row) {
            this.$emit("ActionUpdate", row);
        },
        ActionDelete(row) {
            this.$emit("ActionDelete", row);
        },
        CalculateValue(row, cell) {
            let value = cell.calculate;
            let keys = Object.keys(row);
            console.log(keys);
            keys.forEach(key => {
                console.log(key, row[key]);
                value = value.replace(key, row[key]);
            });
            console.log(value);
            return cell.decimal ? math.evaluate(value).toFixed(cell.decimal) : math.evaluate(value);
        },
        rowUpdate() {
            this.$emit("rowUpdate");
        },
        rowDelete() {
            this.$emit("rowDelete");
        },
        toAdd() {
            this.$emit("toAdd");
        },
        toUpdate() {
            this.$emit("toUpdate");
        },
        toDelete() {
            this.$emit("toDelete");
        }
    }
}
</script>

<style lang="scss" scoped>
.tablex {
    display: flex;
    flex-direction: column;

    .tabsx {
        display: flex;
        align-items: center;

        .tabx {
            margin-right: 2em;
            cursor: pointer;
            user-select: none;
            color: #697386;
            font-family: 'Roboto';
            font-weight: 500;
            font-size: 14px;
            padding-bottom: 8px;

            &.active {
                color: $base-color;
                border-bottom: 2px solid $base-color;
            }
        }
    }

    .contentx {
        display: flex;
        flex-direction: column;

        .rowx {
            display: flex;
            align-items: center;
            padding: .5em 0;
            border-bottom: 1px solid hsl(0, 0%, 93%);

            .cellx {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: black;
                font-family: 'Roboto Mono';
                font-weight: 500;
                flex-wrap: wrap;
                width: 10%;
                .b-tooltip {
                    width: 100%;
                }

                &.title {
                    font-family: 'Roboto Mono';
                    font-size: 12px;
                    font-weight: 500;
                    margin-bottom: 0;
                    padding: .5em 0;
                    color: #4F566B;
                }

                span {
                    word-wrap: break-word;
                    display: block;
                    padding: 0 10px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                &:first-child {
                    span {
                        padding-left: 0px;
                    }
                }

                &:last-child {
                    span {
                        padding-right: 0px;
                    }
                }

                &.action {
                    cursor: pointer;
                    text-align: right;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    padding: 0px;
                    width:15%;

                    .button {
                        margin-left: .3em;
                        box-shadow: none;
                        span{
                            margin: 0;
                            padding: 0;
                        }
                    }
                }
            }

            &:first-child {
                border-top: 1px solid hsl(0, 0%, 93%);
            }
        }

        .pager {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1em 0;

            .counter {
                font-size: 14px;
                color: #4F566B;

                .b {
                    font-weight: 700;
                }
            }

            .actions {
                button {
                    margin-left: .5em;
                }
            }
        }
    }
}</style>