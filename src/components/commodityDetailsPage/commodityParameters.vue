<template>
    <div>
        <div class="item-content item-param visible">
            <ul class="list features">
                <li>
                    <label>品牌:</label>
                    <span>{{parametersData[1].text}}</span>
                </li>
                <li>
                    <label>特别说明:</label>
                    <span>{{parametersData[0].特别说明}}</span>
                </li>
                <li>
                    <label>规格:</label>
                    <span>{{parametersData[2].specification}}</span>
                </li>
                <li>
                    <label>功效:</label>
                    <span>{{parametersData[0].功效}}</span>
                </li>
                <li>
                    <label>适用人群:</label>
                    <span>{{parametersData[0].适用人群}}</span>
                </li>
                <li>
                    <label>保质期:</label>
                    <span>{{parametersData[0].保质期}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default{
        data(){
            return{
                parametersData:"",
            }
        },
        props:{
            shopParameterss:{
                type: Array,
                required: true
            }
        },
        created(){
            this.parametersData=this.shopParameterss
            console.log(this.parametersData)
        },
        mounted(){
            
        },
        methods:{

        }
    }
</script>
<style>
.tabs-content .item-content.visible {
    display: block;
}
.item-content {
    padding-bottom: 10px;
    background: #fff;
}
.item-param {
    padding: 13px 0;
}
.item-param .list label {
    display: inline-block;
    width: 95px;
    height: 25px;
    line-height: 25px;
    padding: 0 15px;
    border-right: 1px solid #e5e5e5;
}
.item-param .list li {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 14px;
    color: #2e2e2e;
}
.item-param .list span {
    display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 0 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height: 25px;
}
</style>