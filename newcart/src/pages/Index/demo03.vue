<template>
    <div>
        <!-- 子组件123
        <input type="text" v-model= msgs >
        <el-button @click="setData">传递到父组件</el-button> -->
    </div>
</template>

<script>
    export default {
        data(){
            return{
                // msgs:"传给父组件的值"
            }
        },
        // props:{
        //     msg:String
        // },
        methods:{
            // setData(e){
            //     this.$emit('getData',this.msgs)
            //     console.log(this,e)
            // }
        },
    }
</script>

<style lang="scss" scoped>

</style>