"use strict";(self["webpackChunkxinma"]=self["webpackChunkxinma"]||[]).push([[602],{7602:function(t,e,s){s.r(e),s.d(e,{default:function(){return p}});var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"home"},[e("div",{staticClass:"title"},[t._v(" Products ")]),e("b-table",{attrs:{data:t.DataListFiltered,paginated:!0,"per-page":"10","current-page.sync":"1","sort-icon":"arrow-up","sort-icon-size":"is-small","default-sort":"id","aria-next-label":"下一页","aria-previous-label":"上一页","aria-page-label":"Page","checkbox-type":"is-primary","aria-current-label":"当前页","page-input":!0},scopedSlots:t._u([{key:"empty",fn:function(){return[e("div",{staticClass:"has-text-centered"},[t._v("NO DATA")])]},proxy:!0}])},[e("b-table-column",{attrs:{field:"pdName",label:"NAME",width:"200",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.pdName)+" ")]}}])}),e("b-table-column",{attrs:{field:"status",label:"STATUS",width:"200",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(["DELISTING","ON SALE"][e.row.status])+" ")]}}])}),e("b-table-column",{attrs:{field:"changedMoney",label:"REDEEMED",width:"100",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.changedMoney)+" ")]}}])}),e("b-table-column",{attrs:{field:"totalMoney",label:"TOTAL",width:"100",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.totalMoney)+" ")]}}])})],1)],1)},o=[],i=s(3643);class n{constructor(){this.apiService=new i.Z}getDataList(){return this.apiService.post("/product/getList",{},!0)}}var d=n,r={name:"ProductsView",props:{keyword:{type:String,default:""}},data(){return{isLoading:!1,serviceClass:new d,DataList:[],checkedRows:[],actionDisabledDelete:!0,actionDisabledUpdate:!0,isComponentModalActive:!1,modalType:"add",DataInfo:{pdName:"",status:0,changedMoney:0,totalMoney:0,createTime:new Date},ProdProcessList:[],selectProdProcess:null,additionalInfo:{}}},watch:{keyword(t){console.log(t)}},computed:{DataListFiltered(){const t=["pdName","status","changedMoney","totalMoney"];return this.DataList.filter((e=>t.some((t=>!!e[t]&&e[t].toString().includes(this.keyword)))))},filteredDataObj(){return this.ProdProcessList.filter((t=>(console.log(t),!this.DataInfo.process_name||t.process_name.toString().toLowerCase().indexOf(this.DataInfo.process_name.toLowerCase())>=0)))}},mounted(){this.LoadData()},methods:{LoadData(){this.isLoading=!0,this.checkedRows=[],this.serviceClass.getDataList().then((t=>{console.log(t),this.DataList=t.data,this.isLoading=!1})).catch((t=>{console.log(t),this.$buefy.toast.open({message:t,type:"is-danger"}),this.isLoading=!1}))},LoadProdProcess(){this.prodProcessService.getDataList().then((t=>{console.log(t),this.ProdProcessList=t.data,"update"===this.modalType&&(this.selectProdProcess=this.ProdProcessList.find((t=>t.process_id===this.DataInfo.process_id)))})).catch((t=>{console.log(t),this.$buefy.toast.open({message:t,type:"is-danger"})}))},showAddDataModal(){this.modalType="add",this.DataInfo={page_title:"",product_name:"",net_weight:"",content_per_piece:"",product_category:"",additional_info:{otherInfo:"",product_image:[],product_intro_image:[],product_standard_report_image:[]},process_name:""},this.LoadProdProcess(),this.isComponentModalActive=!0},showUpdateDataModal(){this.modalType="update",this.DataInfo={...this.checkedRows[0]},this.DataInfo.production_date=new Date(this.DataInfo.production_date),this.DataInfo.shelf_life=new Date(this.DataInfo.shelf_life),console.log(this.DataInfo),this.LoadProdProcess(),this.isComponentModalActive=!0},verifyDataInfo(){return this.DataInfo.page_title?this.DataInfo.product_name?this.DataInfo.net_weight?this.DataInfo.content_per_piece?this.DataInfo.product_category?(console.log(this.selectProdProcess),this.selectProdProcess?(this.DataInfo.process_id=this.selectProdProcess.process_id,this.DataInfo.additional_info.product_image=this.$refs.product_image.getImages(),this.DataInfo.additional_info.product_intro_image=this.$refs.product_intro_image.getImages(),this.DataInfo.additional_info.product_standard_report_image=this.$refs.product_standard_report_image.getImages(),0===this.DataInfo.additional_info.product_image.length?(this.$buefy.toast.open({message:"请上传产品图片",type:"is-danger"}),!1):0===this.DataInfo.additional_info.product_intro_image.length?(this.$buefy.toast.open({message:"请上传产品介绍图",type:"is-danger"}),!1):0===this.DataInfo.additional_info.product_standard_report_image.length?(this.$buefy.toast.open({message:"请上传产品标准报告图",type:"is-danger"}),!1):(console.log(this.DataInfo),!0)):(this.$buefy.toast.open({message:"请选择生产流程",type:"is-danger"}),!1)):(this.$buefy.toast.open({message:"请输入产品类别",type:"is-danger"}),!1):(this.$buefy.toast.open({message:"请输入每片含量",type:"is-danger"}),!1):(this.$buefy.toast.open({message:"请输入净含量",type:"is-danger"}),!1):(this.$buefy.toast.open({message:"请输入产品名称",type:"is-danger"}),!1):(this.$buefy.toast.open({message:"请输入页面标题",type:"is-danger"}),!1)},saveData(){this.verifyDataInfo()&&("add"===this.modalType?this.addData():this.updateData())},addData(){this.serviceClass.addData(this.DataInfo).then((t=>{this.LoadData(),this.$buefy.toast.open({message:t.msg,type:"is-success"}),this.isComponentModalActive=!1})).catch((t=>{console.log(t),this.$buefy.toast.open({message:t,type:"is-danger"})}))},updateData(){this.serviceClass.updateData(this.DataInfo).then((t=>{console.log(t),this.$buefy.toast.open({message:t.msg,type:"is-success"}),this.LoadData(),this.isComponentModalActive=!1})).catch((t=>{console.log(t),this.$buefy.toast.open({message:t,type:"is-danger"})}))},deleteDatas(){this.$buefy.dialog.confirm({title:"删除产品",message:"确定删除选中的产品吗？",confirmText:"确定",cancelText:"取消",type:"is-danger",hasIcon:!0,onConfirm:()=>{let t=this.checkedRows.map((t=>t.product_id));this.serviceClass.deleteData({ids:t}).then((t=>{console.log(t),this.$buefy.toast.open({message:t.msg,type:"is-success"}),this.LoadData()})).catch((t=>{console.log(t),this.$buefy.toast.open({message:t,type:"is-danger"})}))}})}}},c=r,l=s(1001),h=(0,l.Z)(c,a,o,!1,null,"3aa50bc6",null),p=h.exports}}]);
//# sourceMappingURL=602.1af708b4.js.map