<template>
  <div class="imageTextAdvertising">
    <div class="imageTextAdvertisingTop">图文广告编辑</div>
    <!-- 选择模板 -->
    <div class="setTemplate">
      <div class="template">选择模板</div>
      <div class="bolck">
        <div class="one" @click="changeTemplate(1)" :style="{'border': (changeTemplateImg1 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}">
          <img src="../assets/imgs/imageTextOne.png" alt />
        </div>
        <div class="one"  @click="changeTemplate(2)" :style="{'border': (changeTemplateImg2 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}" >
          <img src="../assets/imgs/imageTextTwo.png" alt />
        </div>
        <div class="one"  @click="changeTemplate(3)" :style="{'border': (changeTemplateImg3 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}" >
          <img src="../assets/imgs/imageTextThree.png" alt />
        </div>
      </div>
    </div>
    <!-- 背景色 -->
    <div class="background">
      <div>背景色:</div>
      <div class="btn">
        <el-color-picker v-model="backgroundColor" ref="defultBackgroundColor"></el-color-picker>
        <div class="reset" @click="resetBackgroundColor">重置</div>
      </div>
    </div>
    <!-- 图片圆角设置 -->
    <div class="setRadius">
      <div class="radius">图片圆角设置：</div>
      <div class="block">
        <el-slider v-model="radius" show-input :max="100"></el-slider>
      </div>
    </div>
    <!-- 单个圆角 -->
    <div class="setOneRadius">
      <div class="radius">单个圆角设置：</div>
      <div class="block">
        <el-slider v-model="oneRadius" show-input :max="100"></el-slider>
      </div>
    </div>
    <!-- 背景圆角 -->
    <div class="setBackgroundRadius">
      <div class="radius">背景圆角设置：</div>
      <div class="block">
        <el-slider v-model="backgroundRadius" show-input :max="100"></el-slider>
      </div>
    </div>
    <!-- 外边距 -->
    <div class="setMargin">
      <div class="margin">外边距：</div>
      <div class="block">
        <el-slider v-model="margin" show-input :max="100"></el-slider>
      </div>
    </div>
    <!-- 内边距 -->
    <div class="setPadding">
      <div class="padding">内边距：</div>
      <div class="block">
        <el-slider v-model="padding" show-input :max="80"></el-slider>
      </div>
    </div>
    <!-- 单个背景色 -->
    <div class="oneBackgroundColor">
      <div>单个背景色:</div>
      <div class="btn">
        <el-color-picker v-model="oneBackgroundColor" ref="oneBackgroundColor"></el-color-picker>
        <div class="reset" @click="setoneBackgroundColor">重置</div>
      </div>
    </div>
    <!-- 图文内容 -->
    <div class="setImageTextCentent">
      <div class="imageTextCentent">图文内容</div>
      <div class="pictureList">
        <div class="pictureItem" v-for="(i,k) in pictureItemList" :key="k">
          <div class="uploadingImg">
            <div class="backgroundImgs" @click="centerDialogVisible = true">
              <i class="el-icon-plus"></i>
            </div>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
          <div class="links">
            链接：
            <!-- <span @click="dialogLIink = true">编辑内容</span> -->
            <el-button type="info" @click="dialogNewLIink(i)">编辑内容</el-button>
          </div>
          <div class="del" @click="delElement(i)"></div>
        </div>
        <!-- 上传图片 -->
        <div class="uploading" @click="addPicture(1)">
          <div>+添加图片</div>
        </div>
        <!-- 链接的对话框 -->
        <el-dialog title="选择链接" :visible.sync="dialogLIink" v-if="dialogLIink" width="70%" center>
          <!-- 中间主体部分 -->
          <Link ref="newOrderDetail" />
          <!-- 页脚 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogLIink = false">取 消</el-button>
            <el-button type="primary" @click="dialogLIink = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 图片 -->
        <!-- 点击背景图片的表单 -->
        <el-dialog title="图库" :visible.sync="centerDialogVisible" width="860px" center>
          <!-- 点击新增分组 -->
          <el-dialog width="30%" title="新增分组" :visible.sync="addGrouping" append-to-body>
            <el-input placeholder="请输入内容" v-model="addGroupingName" clearable></el-input>
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
                <el-button
                  v-for="i in groupingList"
                  :key="i.id"
                  :class="{'allGrouping':i.name === '全部分组'}"
                >{{ i.name }}</el-button>
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
                  <el-button type="primary">上传图片</el-button>
                </el-upload>
                <div>
                  <el-input placeholder="请输入内容" v-model="searchInput" clearable></el-input>
                  <el-button type="primary">搜索</el-button>
                </div>
              </div>
              <!-- 中间展示区 -->
              <div class="centerImgList">
                <div class="imgsListsShow">
                  <img v-for="i in imagesList" :key="i.id" :src="i.url" alt />
                  <img src="../assets/imgs/login.png" />
                  <!-- <img src="../assets/imgs/pagesImgs/30.jpg" />
                  <img src="../assets/imgs/pagesImgs/31.jpg" />
                  <img src="../assets/imgs/pagesImgs/32.jpg" />
                  <img src="../assets/imgs/pagesImgs/33.jpg" />
                  <img src="../assets/imgs/pagesImgs/34.jpg" />
                  <img src="../assets/imgs/pagesImgs/35.jpg" />
                  <img src="../assets/imgs/pagesImgs/36.jpg" />-->
                </div>
              </div>
              <!-- 底部分页 -->
              <div class="footerPaging">
                <div>共{{ pagers }}条</div>
                <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
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
    </div>
  </div>
</template>

<script>
import Link from "../components/link";
export default {
  components: { Link },
  data() {
    return {
      backgroundColor: "#eee", //背景色
      oneBackgroundColor: "#ccc", //单个背景
      radius: 0, //图片圆角设置
      oneRadius: 0, //单个圆角
      backgroundRadius: 0, //背景圆角
      margin: 0, //外边距
      padding: 0, //内边距
      dialogImageUrl: "",
      dialogVisible: false,
      centerDialogVisible: false, //上传图片
      pictureItemList: ["1"],
      num: 1,
      dialogLIink: false,
      searchInput: "", //搜索图片框
      pagers: 10, //图片数量
      imagesList: [
        { url: "/img/login.d3c4bad8.png", id: 1 },
        { url: "/img/30.f1e6f8d4.jpg", id: 2 },
        { url: "/img/31.d983e4f3.jpg", id: 3 },
        { url: "/img/32.0abd6721.jpg", id: 4 },
        { url: "/img/33.d962cfe4.jpg", id: 5 },
        { url: "/img/34.44c20bef.jpg", id: 6 },
        { url: "/img/35.2afe101f.jpg", id: 7 },
        { url: "/img/36.a94f52d8.jpg", id: 8 },
        { url: "/img/34.44c20bef.jpg", id: 9 },
        { url: "/img/31.d983e4f3.jpg", id: 10 },
        { url: "/img/33.d962cfe4.jpg", id: 11 }
      ],
      groupingList: [
        { id: 1, name: "全部分组" },
        { id: 2, name: "未分组" }
      ], //分组列表
      addGrouping: false,
      addGroupingName: "",
      changeTemplateImg1:true,//图片的选择样式
      changeTemplateImg2:false,//图片的选择样式
      changeTemplateImg3:false,//图片的选择样式
    };
  },
  methods: {
    // 点击重置背景颜色
    resetBackgroundColor() {
      this.backgroundColor = "#eee";
    },
    setoneBackgroundColor() {
      this.oneBackgroundColor = "#ccc";
    },
    // 点击上传图片
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    // 编辑内容（链接）
    dialogNewLIink(e) {
      this.dialogLIink = true;
      console.log(e);
    },
    // 点击删除
    delElement(item) {
      for (let i = 0; i < this.pictureItemList.length; i++) {
        if (this.pictureItemList[i] == item) {
          // console.log(i)
          this.pictureItemList.splice(i, 1);
          return;
        }
      }
    },
    // 点击添加图片
    addPicture(i) {
      this.num = this.num + i;
      // console.log(i,this.num)
      this.pictureItemList.push(this.num);
    },
    // 选择模板
    changeTemplate(i){
        if(i ==1 ){
            this.changeTemplateImg1 = true
            this.changeTemplateImg2=false
            this.changeTemplateImg3=false
        }else if(i ==2 ){
            this.changeTemplateImg1 = false
            this.changeTemplateImg2=true
            this.changeTemplateImg3=false
        }else{
            this.changeTemplateImg1 = false
            this.changeTemplateImg2=false
            this.changeTemplateImg3=true      
        }
    }
  },
  watch: {
    // 监听默认地址背景颜色改变事件
    backgroundColor() {
      this.$emit("getData", this.backgroundColor, "图文广告");
    },
    // 监听单个背景
    oneBackgroundColor() {
      this.$emit("oneBackgroundColor", this.oneBackgroundColor, "图文广告");
    },
    // 监听圆角改变
    radius() {
      // console.log(123456789)
      this.$emit("radius", this.radius, "图文广告");
    },
    // 单个圆角
    oneRadius() {
      this.$emit("oneRadius", this.oneRadius, "图文广告");
    },
    // 背景圆角
    backgroundRadius() {
      this.$emit("backgroundRadius", this.backgroundRadius, "图文广告");
    },
    // 监听外边距
    margin() {
      this.$emit("margin", this.margin, "图文广告");
    },
    // 监听内边距
    padding() {
      this.$emit("padding", this.padding, "图文广告");
    }
  }
};
</script>

<style lang="less" scoped>
.imageTextAdvertising {
  .imageTextCentent {
    background-color: #ccc;
    margin-bottom: 5px;
  }
  .background,
  .color,
  .oneBackgroundColor {
    margin: 5px 0;
    display: flex;
    justify-content: flex-start;
    div {
      width: 100px;
      line-height: 40px;
    }
    .el-input {
      width: 80%;
    }
    .btn {
      height: 40px;
      display: flex;
      justify-content: center;
      width: 100%;
      color: #2692ff;
      .m-colorPicker {
        height: 40px;
        padding: 12px 0;
        .colorBtn {
          width: 40px;
          height: 40px;
        }
      }
      .reset {
        width: 30%;
        cursor: pointer;
      }
    }
  }
  .setRadius,
  .setMargin,
  .setPadding,
  .setOneRadius,
  .setBackgroundRadius {
    .template,
    .radius,
    .margin,
    .padding {
      background-color: #eee;
    }
    .block {
      padding: 5px 100px;
      z-index: 1;
    }
  }
  .setTemplate {
    .template {
      background-color: #ccc;
    }
    .bolck {
      display: flex;
      justify-content: space-around;
      .one {
        cursor: pointer;
        padding: 5px;
      }
      .one:hover {
          background-color: #eee;
      }
    }
  }
  .pictureList {
    padding: 0 10px;
    height: 260px;
    overflow-y: auto;
    .pictureItem {
      position: relative;
      border: 1px solid #e9ebee;
      display: flex;
      padding: 10px;
      margin-top: 10px;
      .uploadingImg {
        width: 30%;
        .backgroundImgs {
          cursor: pointer;
          margin: 0 atut;
          margin-top: 20px;
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
      .links {
        line-height: 148px;
      }
    }
    .pictureItem:hover {
      border: 1px solid rgb(90, 136, 235);
      .del {
        display: block;
      }
    }
    .del {
      cursor: pointer;
      background: url("../assets/imgs/del.png") no-repeat;
      background-size: 100%;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      position: absolute;
      top: -10px;
      right: -10px;
      display: none;
    }
  }
  .uploading {
    cursor: pointer;
    padding: 10px;
    div {
      height: 34px;
      line-height: 34px;
      border: 1px solid #e9ebee;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 10px;
      color: rgb(90, 136, 235);
    }
  }
  .uploading div:hover {
    border: 1px solid rgb(90, 136, 235);
  }
  .imgsList {
    display: flex;
    flex-direction: row;
    .imgsListTab {
      display: flex;
      width: 140px;
      height: 500px;
      flex-direction: column;
      text-align: center;
      .groupingList {
        height: 100%;
        button {
          margin-top: 20px;
          width: 120px;
        }
        .allGrouping {
          margin-left: 10px;
        }
      }

      .addGrouping {
        margin-right: 5px;
        margin-left: 20px;
        margin-top: 10px;
      }
    }
    .imgsLists {
      flex: 1;
      display: flex;
      flex-direction: column;
      .imsListsSearch {
        display: flex;
        justify-content: space-between;
        input {
          width: 120px;
        }
        div {
          display: flex;
          button {
            margin-left: 10px;
          }
        }
      }
      .centerImgList {
        flex: 1;
        width: 650px;
        .imgsListsShow {
          img {
            margin-top: 10px;
            margin-right: 12px;
            padding: 25px;
            width: 100px;
            height: 100px;
          }
        }
        img:hover {
          background-color: #ccc;
        }
      }
      .footerPaging {
        display: flex;
        justify-content: flex-end;
        div {
          line-height: 30px;
        }
      }
    }
  }
}
</style>