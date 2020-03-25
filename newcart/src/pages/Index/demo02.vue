<template>
    <div>
        父组件345:<span>{{ msg }}</span> 
        <Child @getData="getData" />
        <!-- 子组件的值：-->
    </div>
</template>

<script>
import Child from './demo03'
    export default {
        components:{
            Child,
        },
        data(){
            return{
                msg:"父组件的默认值"
            }
        },
        methods:{
            getData(data){
                this.msg = data
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>