import { get, post } from '../request/index.js';

const product = {
  /**
 * 获取商品列表
 * @param key：要查看的对象标识
 * @productStatus 是否下架 0 下架 1上架
 * @isDisplayWebsite 首页展示 0 不展示首页 1 首页展示
 * @productName 模糊商品名字（是不是贼low）
 * @param page： 分页对象
 */
  getProductList(targetUserId, productStatus, isDisplayWebsite, productName, page) {
    return post(`/WX_SmallProcedures/GetSmallProductInfoList?merchantSysNo=${targetUserId}&productStatus=${productStatus}&isDisplayWebsite=${isDisplayWebsite}&ProductName=${productName}`, page);
  },
  // 获取商品详情
  getDetail(key) {
    return get(`/WX_SmallProcedures/GetSmallProductInfo?sysNo=${key}`);
  },
  /**
   * 删除商品
   * @data array [
   *      {
   *         SysNo: 0
   *      },
   *      {
   *         SysNo: 1
   *      }
   * ]
   */
  deleteProductList(data) {
    return post('/WX_SmallProcedures/DeleteSmallProceduresProduct', data);
  },
  /**
   * 修改商品
   * @data 
   {
	 "SysNo":"1143799",
     "ProductName" :"测试名称1511",
     "DefaultImage":"/yjj/1394t/5f2fc8f1326ca4fcfb2dda5a92ccfb5c.jpg",
      "DefaultImageList":
      [
      {
         "ImagePath":"3.jpg"
      },
       {
         "ImagePath":"4.jpg"
      }
      ],
     "ProductStatus" :"10",
     "MerchantSysNo" :"9",
     "productType" :"1",
     "ShowPrice" :"1",
     "Material" :"实木木",
     "WholesalePrice":"33.33",
     "SKUModel":"vd10",
     "Priority":"10"
}
   */
  updateProduct(data) {
    return post('/WX_SmallProcedures/UpdateSmallProceduresProduct', data);
  },
  /**
   * 商品上下架
   * @data array
   [
      {
        "SysNo": 1143799,
        "ProductStatus": 10
      }
    ]
   */
  offSale(data) {
    return post('/WX_SmallProcedures/UpperShelfSmallProduct', data);
  },
  // 获取商品详情
  getDetail(key) {
    return get(`/WX_SmallProcedures/GetSmallProductInfo?sysNo=${key}`);
  },
  /**
   * 首页展示商品
   */
  updateIsTopic(productSysNo, status) {
    return post(`/WX_SmallProcedures/UpdateIsDisplayWebsite?productSysNo=${productSysNo}&status=${status}`)
  },
  // 修改排序
  updateRank(data) {
    return post(`/WX_SmallProcedures/UpdateSmallProductPriority`, data)
  }
}

export default product;