<template>
    <div class="picture">
        <!-- 标题 -->
        <div class="title">
            <div>图片编辑</div>
        </div>
        <!-- 背景色 -->
        <div class="background">
            <div>背景色:</div>
            <div class="btn">
                <el-color-picker v-model="backgroundColor" ref="defultBackgroundColor"></el-color-picker> 
                <div class="reset" @click="resetBackgroundColor">重置</div>
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
        <!-- 上传图片列表 -->
        <div class="pictureList">
            <div class="pictureItem">
                <div class="uploadingImg">
                    <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <div class="link">链接：<span>编辑内容</span></div>
            </div>
        </div>
        <!-- 上传图片 -->
        <div class="uploading">+添加图片</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                backgroundColor: '#ccc',//背景默认颜色
                radius:0,//圆角的初始值
                margin:0,//外边距
                padding:0,//内边距    
                dialogImageUrl: '',
                dialogVisible: false     
            };
        },
        methods:{
           // 重置默认背景颜色
            resetBackgroundColor(){
                this.backgroundColor = "#ccc"
                this.$refs.defultBackgroundColor.color.value = this.backgroundColor
                this.$refs.defultBackgroundColor.$el.firstElementChild.firstElementChild.firstChild.style.backgroundColor = this.backgroundColor
            },
            // 上传图片
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        },
       watch:{
            // 监听默认背景颜色改变事件
            backgroundColor(){
                // console.log(12345)
                this.$emit('getData',this.$refs.defultBackgroundColor.$el.firstElementChild.firstElementChild.firstChild.style.backgroundColor,'图片')
            },
            // 监听圆角改变
            radius(){
                // console.log(123456789)
                this.$emit('radius',this.radius,'图片')
            },
            // 监听外边距
            margin(){
                this.$emit('margin',this.margin,'图片')
            },
            // 监听内边距
            padding(){
                this.$emit('padding',this.padding,'图片')
            },
        },
    }
</script>

<style lang="less" scoped>
.picture{
    .title{
        div{
            background-color: #eee;
        }
    }
    .sites,.background{
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
    .background{
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
        .radius,.margin,.padding{
            background-color: #eee;
        }
        .block{
            padding: 10px 100px;
            z-index: 1;
        }
    }
    .pictureList{
        // background-color: #eee;
        padding: 10px;
        .pictureItem{
            border: 1px solid #e9ebee;
            display: flex;
            padding: 10px;
            .uploadingImg{
                width: 60%;
            }
            .link{
                line-height: 148px;
                span{
                    color: #31708f;
                    cursor: pointer;
                }
            }
        }
        .pictureItem:hover{
            border: 1px solid rgb(90, 136, 235);
        }
    }
}
</style>