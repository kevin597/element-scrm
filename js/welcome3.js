var vm = new Vue({
    el: '#app',
    data: {
        dialogSelVisible: true,//设置欢迎语-弹窗
        dialogMaterial: false,//文本素材选择-弹窗
        dialogMessage: false,//添加消息-弹窗
        qdvalue: '主动上门',//渠道
        textarea: '',//消息内容
        isclass: '-1', //类型（-1：没有，0：图片，1：网页，2：小程序）
        isname: '',//图片url或网页title
    },
    created() {

    },
    mounted() {

    },
    methods: {
        //设置欢迎语 打开
        dialogSel() {
            this.dialogSelVisible = true;
            this.$nextTick(() => {
                // 这里写打开弹窗要执行的事件
            })
        },
        //插入 微信昵称
        addName() {
            this.textarea = this.textarea + `<微信昵称>`
        },
        //设置欢迎语 确定
        welcomeSubmit() {
            console.log("消息内容:", this.textarea)
            this.$message({
                message: '设置成功',
                type: 'success',
                center: true,
                onClose: () => {
                    console.log("关闭时的回调函数")
                }
            });
            this.dialogSelVisible = false
        },

        // 以下是组件传递方法

        // 文本素材 确定
        textsubmit(data) {
            if (data != '') {
                this.textarea = data;
            }
            this.textreset();
        },
        // 文本素材 取消
        textreset() {
            this.dialogMaterial = false;
        },
        // 文本素材 打开
        textopen() {
            this.dialogMaterial = true;
        },
        // 添加消息 删除
        delsel() {
            this.isclass = '-1';//类型（-1：没有，0：图片，1：网页，2：小程序）
            this.isname = '';//图片url或网页title
        },
        // 添加消息 打开
        dialogopen() {
            this.dialogMessage = true;
        },
        // 添加消息 确定
        messageaubmit(isclass, isname) {
            this.isclass = isclass;
            this.isname = isname;
            this.messagereset();
        },
        // 添加消息 取消
        messagereset() {
            this.dialogMessage = false;
        },
    }
});