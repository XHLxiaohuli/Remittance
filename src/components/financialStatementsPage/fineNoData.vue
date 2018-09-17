<template>
    <div>
        <div class="noDataDiv">
            <div class="noDataPic"></div>
            <p class="noDataText">灰常抱歉,占时没有数据哦~</p>
        </div>
    </div>
</template>
<script>

</script>
<style>
.noDataPic{
    width: 130px;
    height: 130px;
    background: url("../../../static/images/loading_fail.png") no-repeat;
    background-size: 100% 100%;
    margin: auto;
    margin-top: 30%;
}
.noDataText{
    text-align: center;
    font-size: 12px;
    padding-top: 10px;
}
</style>