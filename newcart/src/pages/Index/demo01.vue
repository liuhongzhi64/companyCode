<template>
    <div class="demo01">
        <!-- 组件 -->
        <div class="left">
            <div class="top">组件</div>
            <div class="text-wrapper">
                <draggable
                class="dragArea list-group  element"
                :list="list1"
                :group="{ name: 'people', pull: 'clone', put: false }"
                :clone="cloneShow"
                @change="log"
                >
                <div class="list-group-item item" v-for="item in list1" :key="item.id">
                    {{ item.name }}
                </div>
                </draggable>
            </div>
            
        </div>
        <!-- 中间展示区 -->
        <div class="center">
            <div class="top">中间展示区</div>
            <div class="showElement">
                <!-- 顶部标题和设置 -->
                <div class="showElementTop">
                    <div class="title">{{titleName}}</div>
                    <div class="set" @click="setShowElementTop"></div>
                </div>
                <!-- 中间 -->
                <div class="showElementCenter">
                    <draggable
                    class="dragArea list-group"
                    :list="list2"
                    group="people"
                    @change="log1"
                    style="min-height:375px;"
                    >
                        <div class="list-group-item item" v-for="i in list2" :key="i.id"  :class="{'delStyle':i.name ==''}">
                            <div class="items">
                                <div class="name">
                                    {{ i.name }}
                                </div>
                                <div class="delSoild" v-show="i.name === ''"></div>
                            </div>
                            <i class="del" @click="delElement(i)"></i> 
                        </div>
                    </draggable> 
                </div>
            </div>
            
        </div>

        <!-- 右边编辑 -->
        <div class="right">
            <div class="top">右边编辑区</div>
            <!-- 默认样式 -->
            <div v-show="defultStyle" class="setStyle">
                <div class="titleName">网页编辑</div>
                <div class="redact">默认设置</div>
                <!-- 标题 -->
                <div class="title">
                    <div>标题名称：</div>
                    <el-input
                    placeholder="请输入内容"
                    v-model="titleName"
                    clearable>
                    </el-input>
                </div>
                <!-- 背景色 -->
                <div class="background">
                    <div>
                        背景色:
                    </div>
                    <el-button type="primary" round>背景色</el-button>
                </div>
                <!-- 全屏展示 -->
                <div class="full-screen">
                    <div>
                        全屏展示:
                    </div>
                    <div>
                        <el-switch
                        v-model="fullScreen"
                        active-color="#13ce66"
                        inactive-color="#eee"
                        @change="change">
                        </el-switch>
                    </div>
                    
                </div>
                <!-- 背景图片 -->
                <div class="background-img">
                    <div>
                        背景图片:
                    </div>
                        <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                   
                </div>
            </div>
            <!-- 优惠卷样式 -->
            <discounts v-show="discountsStyle"/>
        </div>
    </div>
  
</template>

<script>
import draggable from "vuedraggable";
import discounts from "../../components/discounts";
// let idGlobal = 8;
export default {
  order: 3,
  components: {
    draggable,
    discounts
  },
  data() {
    return {
      list1: [
        { name: "优惠券", id: 1 },
        { name: "地址", id: 2 },
        { name: "电话", id: 3 },
        { name: "新闻资讯", id: 4 },
        { name: "图片", id: 5 },
        { name: "富文本", id: 6 },
        { name: "视频", id: 7 },
        { name: "文本", id: 8 },
        { name: "辅助线", id: 9 },
        { name: "图文广告", id: 10 },
        { name: "营销活动", id: 11 },
        { name: "标签商品", id: 12 },
        { name: "标题", id: 13 },
        { name: "图文导航", id: 14 },
        { name: "空白辅助", id: 15 },
        { name: "商品", id: 16 },
      ],
      list2: [],
      titleName:'仙剑',
      defultStyle:true,//默认右边编辑显示
      discountsStyle:false,//选择优惠卷样式
      fullScreen:true,//全屏显示
      imageUrl: '',//上传图片
      elementName:''//组件名称
    };
  },
  methods: {
    log: function(evt) {
    //   window.console.log(evt);
      window.console.log(222,evt);
    },
    log1(evt) {
    //   window.console.log(evt)
      this.elementName = evt.added.element.name
      console.log(this.elementName)
        // 辅助线
        // if(elementName === '优惠卷' ){
        //     this.discountsStyle = true;
        //     this.defultStyle = false;
        //     return{
        //         name: `${ name }`
        //     }
        // }else if(elementName === '辅助线'){
        //     this.defultStyle = false;
        //     this.discountsStyle = false;
        //     return{
        //         // name: `${ name }`
        //         name:'',
        //     }
        // }
        // else{
        //     this.defultStyle = false;
        //     return{
        //         name: `${ name }`
        //     }
        // }
    },
    cloneShow({ name }){  
        console.log(name)
        console.log(this.elementName)
        // 辅助线
        if(name === '辅助线' ){
            this.defultStyle = false;
            return{
                // name: `${ name }`
                name:'',
            }
        }else{
            this.defultStyle = false;
            return{
                name: `${ name }`
            }
        }
    },
    // 点击顶部设置
    setShowElementTop(){
        this.defultStyle = true
    },
    // 点击删除
    delElement(item){
        // console.log(item)
        for(let i=0;i<this.list2.length;i++){
            if(this.list2[i].name == item.name){
                // console.log(this.list2[i],i)
                this.list2.splice(i,1)
                if(this.list2.length ==0){
                    this.defultStyle = true
                }
                return true;
            }
        }
    },
    // 点击全屏显示的启动
    change(){
        console.log(this.fullScreen)
    },
    // 点击上传图片
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    }
  }
};
</script>
<style scoped lang="less">
    .demo01{
        display: flex;
        height: 100%;
        text-align: center;
        .top{
            font-size: 30px;
            color: rgb(90, 136, 235);
        }
        .left{
            width: 30%;
            height: 100%;
            overflow: auto;
            background-color: #ccc;
            .text-wrapper{
                padding-top:20px;
                .element{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    .item{
                        cursor: pointer;
                        width: 40%;
                        height: 60px;
                        line-height: 60px;
                        border: 1px dashed #eee;
                        overflow: hidden;
                    }
                    
                }
            }
        }
        .center{
            flex: 1;
            height: 100%;
            background-color: #eee;
            .showElement{
                width: 60%;
                height: 70%;
                margin: 0 auto;
                border: 1px solid #fff;
                overflow: auto;
                .showElementTop{
                    display: flex;
                    justify-content: flex-end;
                    border: 1px solid #fff;
                    height: 5%;
                    padding: 1% 4% 1%;
                    .title{
                        flex: 1;
                        padding-left: 18%;
                        margin-top: 1.5%;
                    }
                    .set{
                        width: 20%;
                        height: 100%;
                        background: url('../../assets/imgs/setdraggable.png')  no-repeat;
                        background-size: 100%;
                        margin-top: 0 auto;
                    }
                }
                .showElementCenter{
                    width: 100%;
                    .item{
                        cursor: pointer;
                        height: 60px;
                        line-height: 60px;
                        // border: 1px dashed #eee;
                        background-color: #fff;
                        display: flex;
                        justify-content: flex-end;
                        .items{
                            width: 98%;
                        }
                        .del{
                            width: 18px;
                            height: 18px;
                            border-radius: 18px;
                            background: url('../../assets/imgs/del.png')  no-repeat;
                            background-size: 100%;
                            background-color: #eee;
                            display: none;
                        }
                        .delSoild{
                            width: 90%;
                            margin-top: 10px;
                            margin-left: 5%;
                            border-top: 1px solid #000;
                            height: 2px;
                        }
                    }
                    .item:hover{
                        border: 1px dashed rgb(90, 136, 235);
                        .del{
                            display: inline;
                        }
                    }
                    .delStyle{
                        height: 20px;
                    }
                }
            }
        }
        .right{
            width: 30%;
            .titleName{
                height: 40px;
                line-height: 40px;       
                font-size: 20px;   
                color: #666;
            }
            .redact{
                background-color: #eee; 
            }
            .title,.background,.full-screen,.background-img{
                margin-top: 5px;
                display: flex;
                justify-content: flex-start;
                div{
                    width: 90px;
                    line-height: 40px;
                }
                .el-input{
                    width: 80%;
                }
            }
            .background-img{
                div{
                    line-height: 196px;
                    margin-right: 20px;
                }
            }
        }
    }
</style>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>