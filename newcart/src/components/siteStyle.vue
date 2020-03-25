<template>
    <div class="site">
        <div class="titleName">网页编辑</div>
        <div class="redact">地址设置</div>
        <!-- 标题 -->
        <div class="title">
            <div>名称：</div>
            <el-input
            placeholder="请输入内容"
            v-model="titleName"
            clearable>
            </el-input>
        </div>
        <!-- 地址 -->
        <div class="sites">
            <div>地址：</div>
            <el-input
            placeholder="请输入内容"
            v-model="sitesName"
            clearable>
            </el-input>
        </div>
        <!-- 背景色 -->
        <div class="background">
            <div>背景色:</div>
            <div class="btn">
                <colorPicker v-model="backgroundColor"  ref="defultBackgroundColor"></colorPicker> 
                <div class="reset" @click="resetBackgroundColor">重置</div>
            </div>                   
        </div>
        <!-- 标题颜色 -->
        <div class="titleColor">
            <div>标题颜色:</div>
            <div class="btn">
                <colorPicker v-model="titleColors"  ref="titleColor"></colorPicker> 
                <div class="reset" @click="titleColor">重置</div>
            </div>
        </div>
        <!-- 地址颜色 -->
        <div class="sitesColor">
            <div>地址颜色:</div>
            <div class="btn">
                <colorPicker v-model="sitesColor"  ref="sitesColor"></colorPicker> 
                <div class="reset" @click="siteColor">重置</div>
            </div> 
        </div>
        <!-- 圆角设置 -->
        <div class="setRadius">
            <div class="radius">圆角设置：</div>
            <div class="block">
                <el-slider
                v-model="radius"
                show-input
                :max=80>
                </el-slider>
            </div>
        </div>
        <!-- 外边距 -->
        <div class="setMargin">
            <div class="margin">外边距：</div>
            <div class="block">
                <el-slider
                v-model="margin"
                show-input
                :max=80>
                </el-slider>
            </div>
        </div>
        <!-- 内边距 -->
        <div class="setPadding">
            <div class="padding">内边距：</div>
            <div class="block">
                <el-slider
                v-model="padding"
                show-input
                :max=80>
                </el-slider>
            </div>
        </div>
        <!-- 地图 -->
        <div class="map">
            地图
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                titleName:'',//名称
                sitesName:'',//地址
                backgroundColor: '#ccc',//背景默认颜色
                titleColors:'#eee',//标题颜色默认颜色
                sitesColor:'#ddd',//地址默认颜色
                radius:0,//圆角的初始值
                margin:0,//外边距
                padding:0,//内边距
            };
        },
        methods:{
            // 点击背景颜色
            resetBackgroundColor(){
                // 重置默认背景颜色
                this.backgroundColor = "#ccc"
                // console.log(this.$refs.defultBackgroundColor.$refs.colorPicker.children[0].style.backgroundColor)
                // console.log(this.backgroundColor)
                this.$refs.defultBackgroundColor.$refs.colorPicker.children[0].style.backgroundColor = this.backgroundColor
                this.$refs.defultBackgroundColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor = this.backgroundColor
                // console.log(this.$refs.defultBackgroundColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor)
            },
            //标题颜色
            titleColor(){
                this.titleColors = "#eee"
                console.log(this.$refs.titleColor.$refs.colorPicker.children[0].style.backgroundColor,'111')
                this.$refs.defultBackgroundColor.$refs.colorPicker.children[0].style.backgroundColor = this.titleColors
                this.$refs.defultBackgroundColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor = this.titleColors
            },
            //地址默认颜色
            siteColor(){
                this.sitesColor = "#ddd"
                console.log(this.$refs.sitesColor.$refs.colorPicker.children[0].style.backgroundColor,'222')
            },
        },
        watch:{
            // 监听默认地址背景颜色改变事件
            backgroundColor(){
                // console.log(12345)
                this.$emit('getData',this.$refs.defultBackgroundColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor,'地址')
                // this.defultBackgroundColor = this.$refs.defultBackgroundColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor
            },
            // 监听标题颜色默认颜色改变事件
            titleColors(){
                console.log(678910,this.$emit('getDataColor'))
                this.$emit('getDataColor','地址')
                // this.defultBackgroundColor = this.$refs.defultBackgroundColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor
            },
            // 监听地址默认颜色改变事件
            sitesColor(){
                console.log(123456789)
                // this.defultBackgroundColor = this.$refs.defultBackgroundColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor
            },

        },
    }
</script>

<style lang="less" scoped>
.site{
    .titleName{
        height: 40px;
        line-height: 40px;       
        font-size: 20px;   
        color: #666;
    }
    .title,.sites,.background,.full-screen,.titleColor,.sitesColor,{
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
        .set-full-screen{
            cursor: pointer;
            width: 30%;
            display: flex;
            .el-switch{
                margin-top: 10px;
                margin-left: 20px;
                width: 50px;
            }
            div{
                width: 100px;
            }
        }
    }
    .background,.titleColor,.sitesColor{
        .btn{
            height: 40px;
            display: flex;
            justify-content: center;
            width: 100%;
            color: #2692ff;
            .m-colorPicker{
                height: 40px;
                padding: 12px 0;
                .colorBtn{
                     width: 40px;
                    height: 40px;
                    }
                }
            .reset{
                width: 30%;
                cursor: pointer;
            }
        }
    }
    .setRadius,.setMargin,.setPadding{
        // width: 80%;
        .radius,.margin,.padding{
            background-color: #eee;
        }
        .block{
            padding: 10px 100px;
            z-index: 1;
        }
    }
}
</style>
<style>
    .m-colorPicker .box{
        z-index: 100;
    }
</style>
