<template>
  <div class="main-wrap">
    <el-button type="primary" @click="add('addOrder')">添加</el-button>
    <add-order ref="addOrder" v-if="addOrderVisible" :visible.sync="addOrderVisible"></add-order>
  </div>
</template>
<script>
  import Add from './demo04'
  export default {
    data(){
      return {
        addOrderVisible: false
      }
    },
    methods: {
      add(refForm){
        if(this.$refs[refForm]){
          this.$refs[refForm].initForm();
        }
        this.addOrderVisible= true;
      }
    },
    components: {
      'add-order': Add
    }
  }
</script>