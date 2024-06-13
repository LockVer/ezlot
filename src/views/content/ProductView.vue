<template>
    <div class="home">
        <div class="title">
            Products
        </div>
        <b-table :data="DataListFiltered"
            :paginated="true" per-page="10" current-page.sync="1" sort-icon="arrow-up" sort-icon-size="is-small"
            default-sort="id" aria-next-label="下一页" aria-previous-label="上一页" aria-page-label="Page"
            checkbox-type="is-primary" aria-current-label="当前页" :page-input="true">

            <b-table-column field="pdName" label="NAME" width="200" sortable v-slot="props">
                {{ props.row.pdName }}
            </b-table-column>

            <b-table-column field="status" label="STATUS" width="200" sortable v-slot="props">
                {{ ["DELISTING","ON SALE"][props.row.status] }}
            </b-table-column>

            <b-table-column field="changedMoney" label="REDEEMED" width="100" sortable v-slot="props">
                {{ props.row.changedMoney }}
            </b-table-column>

            <b-table-column field="totalMoney" label="TOTAL" width="100" sortable v-slot="props">
                {{ props.row.totalMoney }}
            </b-table-column>

            <template #empty>
                <div class="has-text-centered">NO DATA</div>
            </template>
        </b-table>
    </div>
</template>

<script>
import ProductService from '../../services/productService';
export default {
    name: "ProductsView",
    props: {
        // Component props go here
        keyword: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            isLoading: false,
            serviceClass: new ProductService(),
            DataList: [],
            checkedRows: [],
            actionDisabledDelete: true,
            actionDisabledUpdate: true,
            isComponentModalActive: false,
            modalType: "add",
            DataInfo: {
                pdName: "",
                status: 0,
                changedMoney: 0,
                totalMoney: 0,
                createTime: new Date()
            },
            ProdProcessList: [],
            selectProdProcess: null,
            additionalInfo: {}
        };
    },
    watch: {
        keyword(newValue) {
            console.log(newValue);
        }
    },
    computed: {
        DataListFiltered() {
            // 定义你想要检查的字段
            const fieldsToFilterBy = ['pdName', 'status', 'changedMoney', 'totalMoney'];

            return this.DataList.filter(item => {
                // 检查指定的字段中至少有一个包含关键字
                return fieldsToFilterBy.some(field => {
                    // 确保字段存在于对象中，并且是字符串类型
                    if (item[field]) {
                        return item[field].toString().includes(this.keyword);
                    }
                    return false;
                });
            });
        },
        filteredDataObj() {
            return this.ProdProcessList.filter((option) => {
                console.log(option);
                if (!this.DataInfo.process_name) {
                    return true;
                }
                return (
                    option.process_name
                        .toString()
                        .toLowerCase()
                        .indexOf(this.DataInfo.process_name.toLowerCase()) >= 0
                )
            })
        },
    },
    mounted() {
        this.LoadData();
    },
    methods: {
        LoadData() {
            this.isLoading = true;
            this.checkedRows = [];
            this.serviceClass.getDataList().then((response) => {
                console.log(response);
                this.DataList = response.data;
                this.isLoading = false;
            }).catch((error) => {
                console.log(error);
                this.$buefy.toast.open({
                    message: error,
                    type: "is-danger"
                });
                this.isLoading = false;
            });

        },
        LoadProdProcess() {
            this.prodProcessService.getDataList().then((response) => {
                console.log(response);
                this.ProdProcessList = response.data;
                if (this.modalType === "update") {
                    this.selectProdProcess = this.ProdProcessList.find(item => item.process_id === this.DataInfo.process_id);
                }
            }).catch((error) => {
                console.log(error);
                this.$buefy.toast.open({
                    message: error,
                    type: "is-danger"
                });
            });
        },
        showAddDataModal() {
            this.modalType = "add";
            this.DataInfo = {
                page_title: "",
                product_name: "",
                net_weight: "",
                content_per_piece: "",
                product_category: "",
                additional_info: {
                    otherInfo: "",
                    product_image: [],
                    product_intro_image: [],
                    product_standard_report_image: []
                },
                process_name: ""
            };
            this.LoadProdProcess();
            this.isComponentModalActive = true;
        },
        showUpdateDataModal() {
            this.modalType = "update";
            this.DataInfo = { ...this.checkedRows[0] };
            this.DataInfo.production_date = new Date(this.DataInfo.production_date);
            this.DataInfo.shelf_life = new Date(this.DataInfo.shelf_life);

            console.log(this.DataInfo);
            this.LoadProdProcess();
            this.isComponentModalActive = true;
        },

        verifyDataInfo() {
            if (!this.DataInfo.page_title) {
                this.$buefy.toast.open({
                    message: "请输入页面标题",
                    type: "is-danger"
                });
                return false;
            }
            if (!this.DataInfo.product_name) {
                this.$buefy.toast.open({
                    message: "请输入产品名称",
                    type: "is-danger"
                });
                return false;
            }
            if (!this.DataInfo.net_weight) {
                this.$buefy.toast.open({
                    message: "请输入净含量",
                    type: "is-danger"
                });
                return false;
            }
            if (!this.DataInfo.content_per_piece) {
                this.$buefy.toast.open({
                    message: "请输入每片含量",
                    type: "is-danger"
                });
                return false;
            }
            if (!this.DataInfo.product_category) {
                this.$buefy.toast.open({
                    message: "请输入产品类别",
                    type: "is-danger"
                });
                return false;
            }
            // if (!this.DataInfo.production_batch) {
            //     this.$buefy.toast.open({
            //         message: "请输入生产批次",
            //         type: "is-danger"
            //     });
            //     return false;
            // }
            // if (!this.DataInfo.production_date) {
            //     this.$buefy.toast.open({
            //         message: "请输入生产日期",
            //         type: "is-danger"
            //     });
            //     return false;
            // }
            // if (!this.DataInfo.shelf_life) {
            //     this.$buefy.toast.open({
            //         message: "请输入保质期",
            //         type: "is-danger"
            //     });
            //     return false;
            // }
            console.log(this.selectProdProcess);
            if (!this.selectProdProcess) {
                this.$buefy.toast.open({
                    message: "请选择生产流程",
                    type: "is-danger"
                });
                return false;
            }
            this.DataInfo.process_id = this.selectProdProcess.process_id;
            // if (!this.DataInfo.additional_info.otherInfo) {
            //     this.$buefy.toast.open({
            //         message: "请输入附加信息",
            //         type: "is-danger"
            //     });
            //     return false;
            // }
            this.DataInfo.additional_info.product_image = this.$refs.product_image.getImages();
            //this.DataInfo.additional_info.test_report_image = this.$refs.test_report_image.getImages();
            this.DataInfo.additional_info.product_intro_image = this.$refs.product_intro_image.getImages();
            this.DataInfo.additional_info.product_standard_report_image = this.$refs.product_standard_report_image.getImages();

            if (this.DataInfo.additional_info.product_image.length === 0) {
                this.$buefy.toast.open({
                    message: "请上传产品图片",
                    type: "is-danger"
                });
                return false;
            }
            // if (this.DataInfo.additional_info.test_report_image.length === 0) {
            //     this.$buefy.toast.open({
            //         message: "请上传检测报告图",
            //         type: "is-danger"
            //     });
            //     return false;
            // }
            if (this.DataInfo.additional_info.product_intro_image.length === 0) {
                this.$buefy.toast.open({
                    message: "请上传产品介绍图",
                    type: "is-danger"
                });
                return false;
            }
            if (this.DataInfo.additional_info.product_standard_report_image.length === 0) {
                this.$buefy.toast.open({
                    message: "请上传产品标准报告图",
                    type: "is-danger"
                });
                return false;
            }
            console.log(this.DataInfo);
            return true;
        },
        saveData() {
            if (!this.verifyDataInfo()) {
                return;
            }
            if (this.modalType === "add") {
                this.addData();
            } else {
                this.updateData();
            }
        },
        addData() {
            this.serviceClass.addData(this.DataInfo).then((response) => {
                this.LoadData();
                this.$buefy.toast.open({
                    message: response.msg,
                    type: "is-success"
                });
                this.isComponentModalActive = false;
            }).catch((error) => {
                console.log(error);
                this.$buefy.toast.open({
                    message: error,
                    type: "is-danger"
                });
            });
        },
        updateData() {
            this.serviceClass.updateData(this.DataInfo).then((response) => {
                console.log(response);
                this.$buefy.toast.open({
                    message: response.msg,
                    type: "is-success"
                });
                this.LoadData();
                this.isComponentModalActive = false;

            }).catch((error) => {
                console.log(error);
                this.$buefy.toast.open({
                    message: error,
                    type: "is-danger"
                });
            });
        },
        deleteDatas() {
            this.$buefy.dialog.confirm({
                title: "删除产品",
                message: "确定删除选中的产品吗？",
                confirmText: "确定",
                cancelText: "取消",
                type: "is-danger",
                hasIcon: true,
                onConfirm: () => {
                    let ids = this.checkedRows.map(item => item.product_id);
                    this.serviceClass.deleteData({
                        ids: ids
                    }).then((response) => {
                        console.log(response);

                        this.$buefy.toast.open({
                            message: response.msg,
                            type: "is-success"
                        });
                        this.LoadData();
                    }).catch((error) => {
                        console.log(error);
                        this.$buefy.toast.open({
                            message: error,
                            type: "is-danger"
                        });
                    });
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.urls {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin: 0;
    padding: 0;
}

.urls-form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    margin: 0;
    padding: 0;
}

.modal-card-foot {
    display: flex;
    justify-content: flex-end;
}

.flow-list {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid #ccc;

    .flow-item {
        display: flex;
        flex-direction: row;
        gap: 10px;

        .left {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .right {
            video {
                width: 200px;
                height: 200px;
            }
        }
    }
}
</style>
