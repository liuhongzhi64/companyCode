// components/modal/bottom-modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showImageModal: {
      type: Boolean,
      value: false
    },
    text: {
      type: String,
      value: ''
    },
    src: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideModal(e) {
      console.log(e)
      this.setData({
        showImageModal: false
      })
    }
  }
})
