<template>
    <div>
        <div class="tabs-content ">
            <div id="item-desc" class="item-content visible">
                <div v-for="item in picAndTextDatas" class="pic">
                    <img :src="item" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:['picAndTextDatas'],
        data(){
            return{

            }
        },
        created(){
            
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
}
#item-desc .pic {
    min-height: 100px;
}
#item-desc .pic img {
    width: 100%;
}
img {
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
</style>