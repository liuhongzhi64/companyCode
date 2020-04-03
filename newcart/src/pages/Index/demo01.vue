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
                <div class="showElementCenter" :style="{'backgroundColor':defultBackgroundColor}">
                    <draggable
                    class="dragArea list-group"
                    :list="list2"
                    group="people"
                    @change="log1"
                    style="min-height:500px;"
                    >
                    <div class="list-group-item item"
                    v-for="i in list2" :key="i.id"  
                    :class="{'delStyle':i.name ==''}"                 
                    >
                    <div class="items">
                        <div class="name" v-if="i.name !=='地址'&&i.name!=='电话'&&i.name !== '请添加新闻资讯'&&i.name!=='图片'">{{ i.name }}</div>
                        <!-- 地址样式 -->
                        <div class="name" v-if="i.name ==='地址'&&i.name!=='电话'&&i.name !== '请添加新闻资讯'" :style="{'backgroundColor':elementSendStyle,'height':'80px','borderRadius':elementRadius+'px','marginLeft':elementMargin+'px','marginRight':elementMargin+'px','paddingLeft':elementPadding+'px','paddingRight':elementPadding+'px'}">
                            <span :style="{'color':elementTitleColorStyle}">{{ i.name }}:</span>
                            <span :style="{'color':elementColorStyle}" >{{ i.site }}</span> 
                        </div>
                        <!-- 电话 -->
                        <div class="name" v-if="i.name !=='地址'&&i.name ==='电话'&&i.name !== '请添加新闻资讯'" :style="{'backgroundColor':elementSendPhoneStyle,'height':'100px','borderRadius':elementSendPhoneRadius+'px','marginLeft':elementSendPhoneMargin+'px','marginRight':elementSendPhoneMargin+'px','paddingLeft':elementSendPhonePadding+'px','paddingRight':elementSendPhonePadding+'px'}">
                            <span :style="{'color':elementSendPhoneTitleColorStyle}">{{ i.name }}:</span>
                            <span :style="{'color':elementSendPhoneColorStyle}" >{{ i.phone }}</span> 
                        </div>
                        <!-- 图片 -->
                        <div class="name" v-if="i.name !=='地址'&&i.name!=='电话'&&i.name !== '请添加新闻资讯'&&i.name==='图片'" :style="{'backgroundColor':pictureStyles,'borderRadius':pictureSendPhoneRadius+'px','marginLeft':pictureSendPhoneMargin+'px','marginRight':pictureSendPhoneMargin+'px','paddingLeft':pictureSendPhonePadding+'px','paddingRight':pictureSendPhonePadding+'px'}"> 
                            <div style=" width: 100%;text-align: center;"><img style="width: 100%; height: 100%; text-align: center; display: block; border-radius: 0px;" src="../../assets/imgs/picture.png" alt=""></div>
                        </div>
                        <!-- 新闻资讯 -->
                        <div class="name" v-if="i.name === '请添加新闻资讯' && i.name !=='地址'&&i.name!=='电话'" :style="{'backgroundColor':elementNewStyle}">{{ i.name }}</div>
                        <!-- 辅助线样式 -->
                        <div class="delSoild" v-if="i.name === ''"></div>
                    </div>
                    <!-- <i class="del" @click="delElement(i)" v-show="i.name ==='地址'&&i.name!=='电话'" :style="{'backgroundColor':elementSendStyle}"></i> 
                    <i class="del" @click="delElement(i)" v-show="i.name !=='地址'&&i.name ==='电话'" :style="{'backgroundColor':elementSendPhoneStyle}"></i>  -->
                    <!-- <i class="del" @click="delElement(i)" v-show="i.name !=='地址'&&i.name!=='电话'"></i>  -->
                    <i class="del" @click="delElement(i)"></i> 
                    </div>
                    </draggable> 
                </div>
            </div>
            <div class="clear">
                <!-- 清空组件 -->
                <el-button type="primary" style="margin-top:100px;" @click="clearElement">清空组件</el-button>
            </div>
        </div>
        <!-- 右边编辑 -->
        <div class="right">
            <div class="top">右边编辑区</div>
            <!-- 默认样式 -->
            <div v-if="defultStyle" class="setStyle">
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
                    <div> 背景色: </div>
                    <div class="btn">
                        <el-color-picker v-model="color" ref="defultBackgroundColor"></el-color-picker>
                        <!-- <colorPicker v-model="color"  ref="defultBackgroundColor"></colorPicker>  -->
                        <div class="reset" @click="resetDefultBackgroundColor">重置</div>
                    </div>                   
                </div>
                <!-- 全屏展示 -->
                <div class="full-screen">
                    <div> 全屏展示: </div>
                    <div class="set-full-screen" @change="change">
                        <el-switch
                        v-model="fullScreen"
                        active-color="#2692ff"
                        inactive-color="#eee"
                        >
                        </el-switch>
                        <div v-bind:style="{'color': fullScreen ?'#2692ff':'#606266'}">全屏显示</div>
                    </div>
                </div>
                <!-- 背景图片 -->
                <div class="background-img">
                    <div class="backgroundImgsText"> 背景图片: </div>
                    <div class="backgroundImgs"  @click="centerDialogVisible = true">
                        <i class="el-icon-plus"></i>
                    </div>                   
                </div>
            </div>
            <!-- 样式列表 -->
            <div>
                <!-- 优惠卷样式 -->
                <discounts v-if="discountsStyle" />
                <!-- 样式 -->
                <defultStyle v-if="elementDefultStyle"/>
                <!-- 文字 -->
                <textStyle v-if="textStyle" />
                <!-- 地址 -->
                <siteStyle v-if="siteStyle" @getData="getData" @setTitleColor="setTitleColor" @setsitesColor="setsitesColor" @radius="radius" @margin='margin' @padding='padding' />
                <!-- 电话 -->
                <phoneStyle v-if="phoneStyle" @getData="getData" @setTitleColor="setTitleColor" @phoneColor="phoneColor" @radius="radius" @margin='margin' @padding='padding' />
                <!-- 辅助线 -->
                <sublineStyle v-if="sublineStyle" />
                <!-- t图片 -->
                <pictureStyle v-if="pictureStyle" @getData="getData" @radius="radius" @margin='margin' @padding='padding' />
                <!-- 新闻样式 -->
                <newsInformation v-if="newsInformation" @getData="getData" />
                <!-- 富文本样式 -->
                <richText v-if="richText" />
                <!-- 视频样式 -->
                <videoStyle v-if="videoStyle" />
                <!-- 图文广告 -->
                <imageTextAdvertising v-if="imageTextAdvertising" />
                <!-- 营销活动 -->
                <marketingCampaign v-if="marketingCampaign" />
                <!-- 标题商品 -->
                <labelCommodity v-if="labelCommodity" />
                <!-- 标题编辑 -->
                <titleStyle v-if="titleStyle" />
                <!-- 图文导航 -->
                <imageTextLabel v-if="imageTextLabel" />
                <!-- 空白辅助 -->
                <blankAssist v-if="blankAssist" />
                <!-- 商品 -->
                <commodityStyle v-if="commodityStyle" />
            </div>           
        </div>
        <!-- 点击背景图片的表单 -->
        <el-dialog
            title="图库"
            :visible.sync="centerDialogVisible"
            width="860px"
            center
        >
        <!-- 点击新增分组 -->
        <el-dialog
            width="30%"
            title="新增分组"
            :visible.sync="addGrouping"
            append-to-body>
            <el-input
                placeholder="请输入内容"
                v-model="addGroupingName"
                clearable>
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addGrouping = false">取 消</el-button>
                <el-button type="primary" @click="addGroupingFromList(1)">确 定</el-button>
            </span>
        </el-dialog>
        <div class="imgsList">
            <div class="imgsListTab">
                <div class="groupingList">
                    <span>图片分组</span>
                    <!-- <el-button class="allGrouping">全部分组</el-button> -->
                    <el-button v-for="i in groupingList" :key="i.id" :class="{'allGrouping':i.name === '全部分组'}">{{ i.name }}</el-button>
                </div>
                <el-button class="addGrouping" @click="addGrouping = true">+新建分组</el-button>
            </div>
            <!-- 列表 -->
            <div class="imgsLists">
                <!-- 头部搜索款 -->
                <div class="imsListsSearch">
                    <!-- 上传图片 -->
                    <!-- <el-button type="primary">上传图片</el-button> -->
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-change="handleChange"
                        >
                        <!-- :file-list="fileList" -->
                        <el-button  type="primary">上传图片</el-button>
                    </el-upload>
                    <div>
                        <el-input
                        placeholder="请输入内容"
                        v-model="searchInput"
                        clearable>
                        </el-input>
                        <el-button type="primary">搜索</el-button>
                    </div>
                </div>
                <!-- 中间展示区 -->
                <div class="centerImgList">
                    <div class="imgsListsShow">
                        <img v-for="i in imagesList" :key="i.id" :src="i.url" alt="">
                        <img src="../../assets/imgs/login.png">
                        <img src="../../assets/imgs/pagesImgs/30.jpg">
                        <img src="../../assets/imgs/pagesImgs/31.jpg">
                        <img src="../../assets/imgs/pagesImgs/32.jpg">
                        <img src="../../assets/imgs/pagesImgs/33.jpg">
                        <img src="../../assets/imgs/pagesImgs/34.jpg">
                        <img src="../../assets/imgs/pagesImgs/35.jpg">
                        <img src="../../assets/imgs/pagesImgs/36.jpg">
                    </div>
                </div>
                <!-- 底部分页 -->
                <div class="footerPaging">
                    <div>共{{ pagers }}条</div>
                    <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="100">
                    </el-pagination>
                </div>
            </div> 
        </div>           
            <!-- 确定和取消按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import discounts from "../../components/discounts";
import defultStyle from '../../components/defultStyle'
import textStyle from '../../components/textStyle'
import siteStyle from '../../components/siteStyle'
import phoneStyle from '../../components/phoneStyle'
import sublineStyle from '../../components/sublineStyle'
import pictureStyle from '../../components/pictureStyle'
import newsInformation from '../../components/newsInformation'
import richText from '../../components/richText'
import videoStyle from '../../components/videoStyle'
import imageTextAdvertising from '../../components/imageTextAdvertising'
import marketingCampaign from '../../components/marketingCampaign'
import labelCommodity from '../../components/labelCommodity'
import titleStyle from '../../components/titleStyle'
import imageTextLabel from '../../components/imageTextLabel'
import blankAssist from '../../components/blankAssist'
import commodityStyle from '../../components/commodityStyle'

export default {
  order: 3,
  components: {
    draggable,//拖拽
    discounts,//优惠卷样式
    defultStyle,//默认样式
    textStyle,//文本样式
    siteStyle,//地址样式
    phoneStyle,//电话样式
    sublineStyle,//辅助线样式
    pictureStyle,//图片样式
    newsInformation,//新闻样式
    richText,//富文本样式
    videoStyle,//视频样式
    imageTextAdvertising,//图文广告样式
    marketingCampaign,//营销活动样式
    labelCommodity,//标签商品样式
    titleStyle,//标题样式
    imageTextLabel,//图文导航样式
    blankAssist,//空白辅助样式
    commodityStyle,//商品样式
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
        elementName:'',//组件名称
        elementDefultStyle:false,//默认样式
        color: '#eee',//样色表的使用
        defultBackgroundColor:"#eee",//默认背景色
        centerDialogVisible: false,//默认设置的点击背景图片的开关
        searchInput:'',//搜索图片框
        pagers:10,//图片数量
        imagesList:[
            {url:'/img/login.d3c4bad8.png',id:1},
            {url:'/img/30.f1e6f8d4.jpg',id:2},
            {url:'/img/31.d983e4f3.jpg',id:3},
            {url:'/img/32.0abd6721.jpg',id:4},
            {url:'/img/33.d962cfe4.jpg',id:5},
            {url:'/img/34.44c20bef.jpg',id:6},
            {url:'/img/35.2afe101f.jpg',id:7},
            {url:'/img/36.a94f52d8.jpg',id:8},
            {url:'/img/34.44c20bef.jpg',id:9},
            {url:'/img/31.d983e4f3.jpg',id:10},
            {url:'/img/33.d962cfe4.jpg',id:11},
        ],
        groupingList:[
            {id:1,name:'全部分组'},
            {id:2,name:'未分组'},
        ],//分组列表
        addGrouping:false,
        addGroupingName:'',
        textStyle:false,//文本样式
        siteStyle:false,//地址样式
        phoneStyle:false,//电话样式
        sublineStyle:false,//辅助线样式
        pictureStyle:false,//图片样式
        newsInformation:false,//新闻样式
        richText:false,//新闻样式
        videoStyle:false,//视频样式
        imageTextAdvertising:false,//图文广告样式
        marketingCampaign:false,//营销活动样式
        labelCommodity:false,//标题商品样式
        titleStyle:false,//标题样式
        imageTextLabel:false,//图文导航样式
        blankAssist:false,//空白辅助样式
        commodityStyle:false,//商品样式
        elementSendStyle:'#eee',//拖拽组件的默认背景颜色
        elementTitleColorStyle:'#2692ff',//拖拽组件的默认标题字体颜色
        elementColorStyle:'#2692ff',//拖拽组件的默认字体颜色
        elementRadius:0,//拖拽组件的默认圆角大小
        elementMargin:0,//拖拽组件的默认外边距大小
        elementPadding:0,//拖拽组件的默认内边距大小
        elementSendPhoneStyle:'#eee',//拖拽组件的电话默认背景颜色
        elementSendPhoneTitleColorStyle:'#2692ff',//拖拽组件电话的默认标题字体颜色
        elementSendPhoneColorStyle:'#2692ff',//拖拽电话组件的默认字体颜色
        elementSendPhoneRadius:0,//拖拽电话组件的默认圆角大小
        elementSendPhoneMargin:0,//拖拽组件电话的默认外边距大小
        elementSendPhonePadding:0,//拖拽组件电话的默认内边距大小
        elementNewStyle:'#eee',//新闻背景默认颜色
        pictureStyles:'#eee',//图片的默认背景颜色
        pictureSendPhoneRadius:0,//图片的默认圆角大小
        pictureSendPhoneMargin:0,//图片的默认内边距
        pictureSendPhonePadding:0,//图片的默认外边距
        };
  },
    methods: {
        log: function(evt) {
            //   window.console.log(evt);
            window.console.log(222,evt);
        },
        log1(evt) {
            window.console.log(111,evt)
        },
        // 判定拖拽的文件
        cloneShow({ name }){  
            // console.log(name)
            if(name === '优惠券'){
                this.defultStyle = false;
                this.discountsStyle = true
                this.elementDefultStyle = false;
                this.siteStyle = false;
                this.textStyle = false;
                this.phoneStyle = false;
                this.sublineStyle = false;
                this.pictureStyle = false;
                this.newsInformation=false;
                this.richText=false;
                this.videoStyle=false;
                this.imageTextAdvertising=false;
                this.marketingCampaign=false;
                this.labelCommodity=false;
                this.titleStyle=false;
                this.imageTextLabel=false;
                this.blankAssist=false;
                this.commodityStyle=false;
                return{
                    name:`${ name }`
                }
            }  
            else if(name === '地址' ){
                this.defultStyle = false;
                this.discountsStyle = false;
                this.elementDefultStyle = false;
                this.textStyle = false;
                this.siteStyle = true;
                this.phoneStyle = false;
                this.sublineStyle = false;
                this.pictureStyle = false;
                this.newsInformation=false;
                this.richText=false;
                this.videoStyle=false;
                this.imageTextAdvertising=false;
                this.marketingCampaign=false;
                this.labelCommodity=false;
                this.titleStyle=false;
                this.imageTextLabel=false;
                this.blankAssist=false;
                this.commodityStyle=false;
                return{
                    name: `${ name }`,
                    site:'四川省成都市双流县海滨广场11座7楼'
                }
            }
            else if(name === '电话' ){
                this.defultStyle = false;
                this.discountsStyle = false;
                this.elementDefultStyle = false;
                this.textStyle = false;
                this.siteStyle = false;
                this.phoneStyle = true;
                this.sublineStyle = false;
                this.pictureStyle = false;
                this.newsInformation=false;
                this.richText=false;
                this.videoStyle=false;
                this.imageTextAdvertising=false;
                this.marketingCampaign=false;
                this.labelCommodity=false;
                this.titleStyle=false;
                this.imageTextLabel=false;
                this.blankAssist=false;
                this.commodityStyle=false;
                return{
                    name: `${ name }`,
                    phone:'13194782515'
                }
            }
            else if(name === '新闻资讯' ){
                this.defultStyle = false;
                this.discountsStyle = false;
                this.elementDefultStyle = false;
                this.textStyle = false;
                this.siteStyle = false;
                this.phoneStyle = false;
                this.sublineStyle = false;
                this.pictureStyle = false;
                this.newsInformation=true;
                this.richText=false;
                this.videoStyle=false;
                this.imageTextAdvertising=false;
                this.marketingCampaign=false;
                this.labelCommodity=false;
                this.titleStyle=false;
                this.imageTextLabel=false;
                this.blankAssist=false;
                this.commodityStyle=false;
                return{
                    // name: `${ name }`
                    name:'请添加新闻资讯'
                }
            }
            else if(name === '图片' ){
                this.defultStyle = false;
                this.discountsStyle = false;
                this.elementDefultStyle = false;
                this.textStyle = false;
                this.siteStyle = false;
                this.phoneStyle = false;
                this.sublineStyle = false;
                this.pictureStyle = true;
                this.newsInformation=false;
                this.richText=false;
                this.videoStyle=false;
                this.imageTextAdvertising=false;
                this.marketingCampaign=false;
                this.labelCommodity=false;
                this.titleStyle=false;
                this.imageTextLabel=false;
                this.blankAssist=false;
                this.commodityStyle=false;
                return{
                    name: `${ name }`
                }
            }
            else if(name === '富文本' ){
                this.defultStyle = false;
                this.discountsStyle = false;
                this.elementDefultStyle = false;
                this.textStyle = false;
                this.siteStyle = false;
                this.phoneStyle = false;
                this.sublineStyle = false;
                this.pictureStyle = false;
                this.newsInformation=false;
                this.videoStyle=false;
                this.imageTextAdvertising=false;
                this.marketingCampaign=false;
                this.richText=true;
                this.labelCommodity=false;
                this.titleStyle=false;
                this.imageTextLabel=false;
                this.blankAssist=false;
                this.commodityStyle=false;
                return{
                    name: `${ name }`
                }
            }
            else if(name === '视频' ){
                this.defultStyle = false;
                this.discountsStyle = false;
                this.elementDefultStyle = false;
                this.siteStyle = false;
                this.phoneStyle = false;
                this.sublineStyle = false;
                this.pictureStyle = false;
                this.newsInformation=false;
                this.richText=false;
                this.textStyle = false;
                this.imageTextAdvertising = false;
                this.marketingCampaign = false;
                this.videoStyle = true;
                this.labelCommodity = false;
                this.titleStyle = false;
                this.imageTextLabel = false;
                this.blankAssist = false;
                this.commodityStyle = false;
                return{
                    name: `${ name }`
                }
            }
            else if(name === '文本' ){
                this.defultStyle = false;
                this.discountsStyle = false;
                this.elementDefultStyle = false;
                this.siteStyle = false;
                this.textStyle = true;
                this.phoneStyle = false;
                this.sublineStyle = false;
                this.pictureStyle = false;
                this.newsInformation=false;
                this.richText=false;
                this.videoStyle=false;
                this.imageTextAdvertising=false;
                this.marketingCampaign=false;
                this.labelCommodity=false;
                this.titleStyle=false;
                this.imageTextLabel=false;
                this.blankAssist=false;
                this.commodityStyle=false;
                return{
                    name: `${ name }`
                }
            }
            else if(name === '辅助线' ){
                this.defultStyle = false;
                this.discountsStyle = false;
                this.elementDefultStyle = false;
                this.siteStyle = false;
                this.phoneStyle = false;
                this.textStyle = false;
                this.sublineStyle = true;
                this.pictureStyle = false;
                this.newsInformation=false;
                this.richText=false;
                this.videoStyle=false;
                this.imageTextAdvertising=false;
                this.marketingCampaign=false;
                this.labelCommodity=false;
                this.titleStyle=false;
                this.imageTextLabel=false;
                this.blankAssist=false;
                this.commodityStyle=false;
                return{
                    // name: `${ name }`
                    name:'',
                }
            }   
            else if(name === '图文广告' ){
                this.defultStyle = false;
                this.discountsStyle = false;
                this.elementDefultStyle = false;
                this.siteStyle = false;
                this.textStyle = false;
                this.phoneStyle = false;
                this.sublineStyle = false;
                this.pictureStyle = false;
                this.newsInformation=false;
                this.richText=false;
                this.videoStyle=false;
                this.marketingCampaign=false;
                this.labelCommodity=false;
                this.imageTextAdvertising=true;
                this.titleStyle=false;
                this.imageTextLabel=false;
                this.blankAssist=false;
                this.commodityStyle=false;
                return{
                    name: `${ name }`
                }
            }    
            else if(name === '营销活动' ){
                this.defultStyle = false;
                this.discountsStyle = false;
                this.elementDefultStyle = false;
                this.siteStyle = false;
                this.textStyle = false;
                this.phoneStyle = false;
                this.sublineStyle = false;
                this.pictureStyle = false;
                this.newsInformation=false;
                this.richText=false;
                this.videoStyle=false;
                this.imageTextAdvertising=false;
                this.labelCommodity=false;
                this.marketingCampaign=true;
                this.titleStyle=false;
                this.imageTextLabel=false;
                this.blankAssist=false;
                this.commodityStyle=false;
                return{
                    name: `${ name }`
                }
            }    
            else if(name === '标签商品' ){
                this.defultStyle = false;
                this.discountsStyle = false;
                this.elementDefultStyle = false;
                this.siteStyle = false;
                this.textStyle = false;
                this.phoneStyle = false;
                this.sublineStyle = false;
                this.pictureStyle = false;
                this.newsInformation=false;
                this.richText=false;
                this.videoStyle=false;
                this.imageTextAdvertising=false;
                this.marketingCampaign=false;
                this.labelCommodity=true;
                this.titleStyle=false;
                this.imageTextLabel=false;
                this.blankAssist=false;
                this.commodityStyle=false;
                return{
                    name: `${ name }`
                }
            }    
            else if(name === '标题' ){
                this.defultStyle = false;
                this.discountsStyle = false;
                this.elementDefultStyle = false;
                this.siteStyle = false;
                this.textStyle = false;
                this.phoneStyle = false;
                this.sublineStyle = false;
                this.pictureStyle = false;
                this.newsInformation=false;
                this.richText=false;
                this.videoStyle=false;
                this.imageTextAdvertising=false;
                this.marketingCampaign=false;
                this.titleStyle=true;
                this.labelCommodity=false;
                this.imageTextLabel=false;
                this.blankAssist=false;
                this.commodityStyle=false;
                return{
                    name: `${ name }`
                }
            }    
            else if(name === '图文导航' ){
                this.defultStyle = false;
                this.discountsStyle = false;
                this.elementDefultStyle = false;
                this.siteStyle = false;
                this.textStyle = false;
                this.phoneStyle = false;
                this.sublineStyle = false;
                this.pictureStyle = false;
                this.newsInformation=false;
                this.richText=false;
                this.videoStyle=false;
                this.imageTextAdvertising=false;
                this.marketingCampaign=false;
                this.labelCommodity=false;
                this.imageTextLabel=true;
                this.titleStyle=false;
                this.blankAssist=false;
                this.commodityStyle=false;
                return{
                    name: `${ name }`
                }
            }    
            else if(name === '空白辅助' ){
                this.defultStyle = false;
                this.discountsStyle = false;
                this.elementDefultStyle = false;
                this.siteStyle = false;
                this.textStyle = false;
                this.phoneStyle = false;
                this.sublineStyle = false;
                this.pictureStyle = false;
                this.newsInformation=false;
                this.richText=false;
                this.videoStyle=false;
                this.imageTextAdvertising=false;
                this.marketingCampaign=false;
                this.labelCommodity=false;
                this.titleStyle=false;
                this.blankAssist=true;
                this.imageTextLabel=false;
                this.commodityStyle=false;
                return{
                    name: `${ name }`
                }
            }    
            else if(name === '商品' ){
                this.defultStyle = false;
                this.discountsStyle = false;
                this.elementDefultStyle = false;
                this.siteStyle = false;
                this.textStyle = false;
                this.phoneStyle = false;
                this.sublineStyle = false;
                this.pictureStyle = false;
                this.newsInformation=false;
                this.richText=false;
                this.videoStyle=false;
                this.imageTextAdvertising=false;
                this.marketingCampaign=false;
                this.labelCommodity=false;
                this.titleStyle=false;
                this.imageTextLabel=false;
                this.blankAssist=false;
                this.commodityStyle=true;
                return{
                    name: `${ name }`
                }
            } 
        },
        // 点击顶部设置
        setShowElementTop(){
            this.defultStyle = true
            this.discountsStyle = false;
            this.elementDefultStyle = false;
            this.textStyle = false;
            this.siteStyle = false;
            this.phoneStyle = false;
            this.sublineStyle = false;
            this.pictureStyle = false;
            this.newsInformation=false;
            this.richText=false;
            this.videoStyle=false;
            this.imageTextAdvertising=false;
            this.marketingCampaign=false;
            this.labelCommodity=false;
            this.titleStyle=false;
            this.imageTextLabel=false;
            this.blankAssist=false;
            this.commodityStyle=false;
        },
        // 点击删除
        delElement(item){
            for(let i=0;i<this.list2.length;i++){
                if(this.list2[i].name == item.name){
                    this.list2.splice(i,1)
                    if(this.list2.length == 0){
                        this.defultStyle = true;
                        this.discountsStyle = false;
                        this.elementDefultStyle = false;
                        this.textStyle = false;
                        this.siteStyle = false;
                        this.phoneStyle = false;
                        this.sublineStyle = false;
                        this.pictureStyle = false;
                        this.newsInformation=false;
                        this.richText=false;
                        this.videoStyle=false;
                        this.imageTextAdvertising=false;
                        this.marketingCampaign=false;
                        this.labelCommodity=false;
                        this.titleStyle=false;
                        this.imageTextLabel=false;
                        this.blankAssist=false;
                        this.commodityStyle=false;
                    }else{
                        this.defultStyle = false;
                        this.discountsStyle = false;
                        this.elementDefultStyle = false;
                        this.textStyle = false;
                        this.siteStyle = false;
                        this.phoneStyle = false;
                        this.sublineStyle = false;
                        this.pictureStyle = false;
                        this.newsInformation=false;
                        this.richText=false;
                        this.videoStyle=false;
                        this.imageTextAdvertising=false;
                        this.marketingCampaign=false;
                        this.labelCommodity=false;
                        this.titleStyle=false;
                        this.imageTextLabel=false;
                        this.blankAssist=false;
                        this.commodityStyle=false;                        
                    }
                    return true;
                }
            }
        },
        // 点击重置默认背景颜色
        resetDefultBackgroundColor(){
            // 重置默认背景颜色
            this.$refs.defultBackgroundColor.color.value = this.defultBackgroundColor
            this.defultBackgroundColor = "#eee"
            console.log(this.$refs.defultBackgroundColor.$el.firstElementChild.firstElementChild.firstChild.style.backgroundColor)
            this.$refs.defultBackgroundColor.$el.firstElementChild.firstElementChild.firstChild.style.backgroundColor = this.defultBackgroundColor
            // console.log(this.$refs.defultBackgroundColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor)
            // this.$refs.defultBackgroundColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor = this.defultBackgroundColor
        },
        // 点击全屏显示的启动
        change(){
            console.log(this.fullScreen)
        },
        addGroupingFromList(e){
            this.addGrouping = false
            // console.log(this.groupingList.push({name:this.addGroupingName,id:this.groupingList.length+1+e}))
            this.groupingList.push({name:this.addGroupingName,id:this.groupingList.length+1+e})
        },
        // 点击上传图片
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-3);
        },
        // 点击清空组件按钮
        clearElement(){
            this.list2 = []
            this.defultStyle = true;
            this.discountsStyle = false
            this.elementDefultStyle = false;
            this.siteStyle = false;
            this.textStyle = false;
            this.phoneStyle = false;
            this.sublineStyle = false;
            this.pictureStyle = false;
            this.newsInformation=false;
            this.richText=false;
            this.videoStyle=false;
            this.imageTextAdvertising=false;
            this.marketingCampaign=false;
            this.labelCommodity=false;
            this.titleStyle=false;
            this.imageTextLabel=false;
            this.blankAssist=false;
            this.commodityStyle=false;
        },
        // 获取地址子组件的值
        getData(data,item){
            // console.log(data,item)
            // this.elementSendStyle = data
            // this.elementSendPhoneStyle = data
            if(item == '地址'){
                this.elementSendStyle = data
            }else if(item == '电话'){
                this.elementSendPhoneStyle = data
            }else if(item == '新闻资讯'){
                console.log(data)
                this.elementNewStyle = data
            }else if(item == '图片'){
                console.log(data)
                this.pictureStyles = data
            }
            for(let i=0;i<this.list2.length;i++){
                if(this.list2[i].name == item){
                    // console.log(this.list2[i])
                    return true;
                }
            }
        },
        // 获取地址子组件传的标题颜色
        setTitleColor(data,item){
            // console.log(data,item)
            if(item == '地址'){
                this.elementTitleColorStyle = data
            }else if(item == '电话'){
                this.elementSendPhoneTitleColorStyle = data
            }
            // this.elementTitleColorStyle = data
            // this.elementSendPhoneTitleColorStyle = data
            for(let i=0;i<this.list2.length;i++){
                if(this.list2[i].name == item){
                    // console.log(this.list2[i])
                    return true;
                }
            }          
        },
        // 获取地址子组件的位置颜色
        setsitesColor(data,item){
            // this.elementColorStyle = data
            if(item == '地址'){
                this.elementColorStyle = data
            }else if(item == '电话'){
                this.elementSendPhoneColorStyle = data
            }
            for(let i=0;i<this.list2.length;i++){
                if(this.list2[i].name == item){
                    return true;
                }
            }
        },
        phoneColor(data,item){
            if(item == '地址'){
                this.elementColorStyle = data
            }else if(item == '电话'){
                this.elementSendPhoneColorStyle = data
            }
            // this.elementColorStyle = data
            // this.elementSendPhoneColorStyle = data
            for(let i=0;i<this.list2.length;i++){
                if(this.list2[i].name == item){
                    return true;
                }
            }
        },
        // 获取地址子组件的圆角变化
        radius(data,item){
            // console.log(data,item)
            if(item == '地址'){
                this.elementRadius = data
            }else if(item == '电话'){
                this.elementSendPhoneRadius = data
            }else if(item == '图片'){
                this.pictureSendPhoneRadius = data
            }
            // this.elementRadius = data
            // this.elementSendPhoneRadius = data
            for(let i=0;i<this.list2.length;i++){
                if(this.list2[i].name == item){
                    return true;
                }
            }
        },
        // 内外边距监听
        margin(data,item){
            if(item == '地址'){
                this.elementMargin = data
            }else if(item == '电话'){
                this.elementSendPhoneMargin = data
            }else if(item == '图片'){
                this.pictureSendPhoneMargin = data
            }
            // this.elementMargin= data
            // this.elementSendPhoneMargin= data
            for(let i=0;i<this.list2.length;i++){
                if(this.list2[i].name == item){
                    return true;
                }
            }
        },
        padding(data,item){
            if(item == '地址'){
                this.elementPadding = data
            }else if(item == '电话'){
                this.elementSendPhonePadding = data
            }else if(item == '图片'){
                this.pictureSendPhonePadding = data
            }
            // this.elementPadding = data
            // this.elementSendPhonePadding = data
            for(let i=0;i<this.list2.length;i++){
                if(this.list2[i].name == item){
                    return true;
                }
            }
        }
    },
    watch:{
        // 监听默认背景颜色改变事件
        color(){
            // console.log(this.$refs.defultBackgroundColor)
            this.defultBackgroundColor = this.$refs.defultBackgroundColor.color.value
        },
    },
  }
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
            width: 20%;
            height: 100%;
            overflow: auto;
            background-color: #fff;
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
            // background-color: #ccc;
            .showElement{
                // width: 45%;
                width: 350px;
                height: 70%;
                margin: 0 auto;
                border: 1px solid #fff;
                overflow: auto;
                .showElementTop{
                    display: flex;
                    justify-content: flex-end;
                    border: 1px solid #fff;
                    height: 6%;
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
                        height: auto;
                        // line-height: 60px;
                        border: 1px solid rgb(90, 136, 235);
                        display: flex;
                        justify-content: flex-end;
                        .items{
                            width: 100%;
                        }
                        .del{
                            width: 18px;
                            height: 20px;
                            // border-radius: 18px;
                            background: url('../../assets/imgs/del.png')  no-repeat;
                            background-size: 100%;
                            display: none;
                            top: 0;
                            right: -10px;
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
            width: 40%;
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
            .background-img{ 
                // margin-top: 50%;
                .backgroundImgsText{
                    line-height: 196px;
                }
                .backgroundImgs{
                    cursor: pointer;
                    margin: 0 atut;
                    margin-top: 50px;
                    width: 100px;
                    height: 100px;
                    background-color: #eee;
                    font-size: 40px;
                    font-weight: 400;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    text-align: center;
                    display: flex;
                    -webkit-box-pack: center;
                    justify-content: center;
                    -webkit-box-align: center;
                    align-items: center;
                }
            }
        }
        .imgsList{ 
            display: flex;
            flex-direction: row ;
            .imgsListTab{
                display: flex;
                width: 140px;
                height: 500px;
                flex-direction:column;
                text-align: center;
                .groupingList{
                    height: 100%;
                    button{
                        margin-top: 20px;
                        width: 120px;
                    }
                    .allGrouping{
                        margin-left: 10px;
                    }
                }
               
                .addGrouping{
                    margin-right: 5px;
                    margin-left: 20px;
                    margin-top: 10px;
                }
            }
            .imgsLists{
                flex: 1;
                display: flex;
                flex-direction:column;
                .imsListsSearch{
                    display: flex;
                    justify-content: space-between;
                    input{
                        width: 120px;
                    }
                    div{
                        display: flex;
                        button{
                            margin-left: 10px;
                        }
                    }
                }
                .centerImgList{
                    flex: 1;
                    width: 650px;
                    .imgsListsShow{
                        img{
                            margin-top: 10px;
                            margin-right: 30px;
                            width: 100px;
                            height: 100px;
                        }
                    }
                }
                .footerPaging{
                    display: flex;
                    justify-content: flex-end;
                    div{
                        line-height: 30px;
                    }
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