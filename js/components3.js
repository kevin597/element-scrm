// tree选择
Vue.component('v-tree', {
    template: `
    <div class="v-tree">
        <div class="flex-row flex-top v-body">
            <!-- 左侧 tree -->
            <div class="dialog-box scroll flex-full right-line">
                <div class="pr20">
                    <!-- 过滤输入框 -->
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText" suffix-icon="el-icon-search"
                        size="small">
                    </el-input>
                    <!-- tree list -->
                    <el-tree class="filter-tree pt10" :data="dataTree" show-checkbox default-expand-all
                        :filter-node-method="filterNode" ref="tree" node-key="id" @check="getCheckedNodes">
                    </el-tree>
                </div>
            </div>
            <!-- 右侧 list -->
            <div class="dialog-box scroll flex-full">
                <div class="pl20">
                    <div class="pb10">已选择{{selarr.length}}名成员</div>
                    <!-- 无数据 -->
                    <div class="empty" v-if="selarr.length==0">
                        <div class="no_pic">
                            <img src="./images/empty-image-default.png">
                        </div>
                        <div class="no_text">
                            没有数据
                        </div>
                    </div>
                    <!-- seled list -->
                    <div class="sel-box" v-else>
                        <div class="ptb10 flex-row bottom-line" v-for="(item,idx) in selarr" :key="idx">
                            <div class="flex-full">{{item.label}}</div>
                            <i class="el-icon-circle-close fs20 hand" @click="delsel(idx)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部按钮 -->
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="selReset">取 消</el-button>
            <el-button size="small" type="primary" @click="selSubmit">确 定</el-button>
        </div>
    </div>
    `,
    props: {
        seldata: {
            type: Array,
            default: []
        },
        radio: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            radio: this.radio,//单人，多人
            filterText: '',//搜索tree
            selarr: [],//tree选中的数据
            //tree数据
            dataTree: [{
                id: 1,
                label: '豆米科技',
                children: [{
                    id: 10,
                    label: '设计部',
                    children: [{
                        id: 11,
                        label: '谢兰'
                    }, {
                        id: 12,
                        label: '叶丽然'
                    }, {
                        id: 13,
                        label: '邹荣乐'
                    }, {
                        id: 14,
                        label: '吴文聪'
                    }, {
                        id: 15,
                        label: '朱乐然'
                    }]
                }, {
                    id: 20,
                    label: '业务部',
                    children: [{
                        id: 21,
                        label: '王宵'
                    }, {
                        id: 22,
                        label: '邓思桂'
                    }]
                }, {
                    id: 30,
                    label: '行政部',
                    children: [{
                        id: 31,
                        label: '殷洁'
                    }, {
                        id: 32,
                        label: '杨龙'
                    }]
                }, {
                    id: 40,
                    label: '项目部',
                    children: [{
                        id: 410,
                        label: '项目1部',
                        children: [{
                            id: 411,
                            label: '李怀英'
                        }, {
                            id: 412,
                            label: '郑锐'
                        }, {
                            id: 413,
                            label: '江萍'
                        }, {
                            id: 414,
                            label: '胡克东'
                        }, {
                            id: 415,
                            label: '宛艳萍'
                        }, {
                            id: 416,
                            label: '张迎',
                            disabled: true
                        }, {
                            id: 417,
                            label: '刘霜霜',
                            disabled: true
                        }, {
                            id: 418,
                            label: '付婷婷',
                            disabled: true
                        }]
                    }, {
                        id: 420,
                        label: '项目2部',
                        children: [{
                            id: 421,
                            label: '杨建'
                        }, {
                            id: 422,
                            label: '陈云普'
                        }, {
                            id: 423,
                            label: '牛坤'
                        }, {
                            id: 424,
                            label: '刘康康'
                        }, {
                            id: 425,
                            label: '陈宝春'
                        }, {
                            id: 426,
                            label: '高超',
                            disabled: true
                        }, {
                            id: 427,
                            label: '王栋',
                            disabled: true
                        }]
                    }, {
                        id: 430,
                        label: '项目3部',
                        children: [{
                            id: 431,
                            label: '刘迎春'
                        }, {
                            id: 432,
                            label: '朱小明'
                        }, {
                            id: 433,
                            label: '权龙龙'
                        }, {
                            id: 434,
                            label: '丁浩'
                        }, {
                            id: 435,
                            label: '曹伟'
                        }, {
                            id: 436,
                            label: '冯慧',
                            disabled: true
                        }, {
                            id: 437,
                            label: '刘磊磊',
                            disabled: true
                        }, {
                            id: 438,
                            label: '孙文',
                            disabled: true
                        }]
                    }]
                }]
            }],
        }
    },
    methods: {
        // 获取tree选中节点
        getCheckedNodes(data, checked) {
            // console.log('radio:' + this.radio)
            if (this.radio == 0) {
                // 单选
                const indexs = this.selarr.indexOf(data.id);
                if (indexs < 0 && this.selarr.length === 1 && checked) {
                    this.$refs.tree.setCheckedNodes([data]);
                    this.selarr = [];
                    this.selarr.push(data);
                } else if (this.selarr.length === 0 && checked) {
                    this.selarr = [];
                    this.selarr.push(data);
                } else if (indexs >= 0 && this.selarr.length === 1 && !checked) {
                    this.selarr = [];
                }
            } else {
                // 多选
                let res = this.$refs.tree.getCheckedNodes();
                let arr = []
                res.forEach((item) => {
                    if (item.children == undefined) {//不包含父节点
                        arr.push(item)
                    }
                })
                this.selarr = arr.map(o => ({ ...o }));
            }
        },
        // 设置tree节点选中
        setCheckedNodes(data) {
            this.$refs.tree.setCheckedNodes(data);
        },
        // 过滤tree
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        // 删除选中数据 & 同时取消tree选中节点
        delsel(idx) {
            this.selarr = this.remove(this.selarr, idx)
            this.setCheckedNodes(this.selarr);
        },
        // 根据下标删除数组中元素
        remove(arr, idx) {
            var newarr = [];
            for (var i = 0; i < arr.length; i++) {
                if (i != idx) {
                    newarr.push(arr[i]);
                }
            }
            return newarr;
        },
        // 选择人员dialog弹窗确定
        selSubmit() {
            let data = this.selarr;
            // console.log('d1:', data)
            this.$emit("selsubmit", data);
        },
        // 选择人员dialog弹窗取消
        selReset() {
            this.$emit("selreset", true);
        }
    },
    watch: {
        // 监听输入关键字进行过滤
        filterText(val) {
            this.$refs.tree.filter(val);
        },
        // 监听传入数据变化
        seldata: {
            deep: true,//深度
            // immediate: true,//首次
            handler() {
                // console.log(this.seldata)
                let seldata = this.seldata;
                this.selarr = seldata.map(o => ({ ...o }));
                this.setCheckedNodes(seldata);
            }
        }
    },
})


// 图片素材选择 弹窗
Vue.component('v-dialog-img', {
    template: `
    <div class="v-img">
        <div class="v-body">
            <div class="boxb dialog-box scroll">
                <!-- 搜索 -->
                <v-search @selsearch="selsearch"></v-search>
                <!-- 列表 -->
                <div class="flex-row flex-left flex-wrap ptb5 zou-card scroll mt10">
                    <div class="zou-card-img" v-for="(item,index) in imagesList" :key="index"
                        @click="selMaterialIndex(index)">
                        <div class="zou-img-pic">
                            <img :src="item.url" class="imgc">
                            <div class="nowrap fs12 c9 pt5 tc">{{item.name}}</div>
                        </div>
                        <div class="zou-card-sel-img" v-if="current==index">
                            <i class="el-icon-circle-check cb mb20"></i>
                        </div>
                    </div>
                </div>
                <div class="plr10 mt10">
                    <el-checkbox v-model="checked" @change="onChange">仅显示自己上传的素材库</el-checkbox>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="imgreset">取 消</el-button>
            <el-button size="small" type="primary" @click="imgsubmit">确 定</el-button>
        </span>
    </div>
    `,
    data() {
        return {
            checked: '',//仅显示自己上传的素材库
            current: '-1',//当前选中素材下标
            // 图片素材列表
            imagesList: [{
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "这里是图片名称",
                id: "1"
            }, {
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "800_cs",
                id: "1"
            }, {
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "这里是图片名称",
                id: "1"
            }, {
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "800_cs",
                id: "1"
            }, {
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "800_cs",
                id: "1"
            }, {
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "800_cs",
                id: "1"
            }, {
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "800_cs",
                id: "1"
            }, {
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "800_cs",
                id: "1"
            }],
        }
    },
    methods: {
        // 仅显示自己上传的素材库
        onChange(v) {
            console.log(v)
        },
        // 选中素材
        selMaterialIndex(i) {
            this.current = i;
        },
        //图片素材选择 确定
        imgsubmit() {
            let current = this.current;
            let content = {}
            if (current != '-1') {
                let url = this.imagesList[current].url;
                let name = this.imagesList[current].name;
                content.imgName = name;
                content.dialogImageUrl = url;
                content.istype = '1';
            }
            this.$emit("imgsubmit", content);
            this.initOpen();
        },
        //图片素材选择 取消
        imgreset() {
            this.$emit("imgreset", true);
            this.initOpen();
        },
        // 搜索
        selsearch(input, value) {
            console.log('input:' + input, 'value:' + value)
        },
        //初始化
        initOpen() {
            this.current = '-1';//当前选择素材下标
            this.checked = '';//仅显示自己上传的素材库
        },
    },
})


// 网页素材选择 弹窗
Vue.component('v-dialog-web', {
    template: `
    <div class="v-web">
        <div class="v-body">
            <div class="boxb dialog-box scroll">
                <!-- 搜索 -->
                <v-search @selsearch="selsearch"></v-search>
                <!-- 列表 -->
                <div class="flex-row flex-left flex-wrap ptb5 zou-card scroll mt10">
                    <div class="zou-card-box" v-for="(item,index) in websiteList" :key="index"
                        @click="selMaterialIndex(index)">
                        <el-card shadow="never">
                            <div class="fs14 c0 row2">{{item.webtitle}}</div>
                            <div class="flex-row">
                                <div class="flex-full fs14 c9 row2">{{item.webinfo}}</div>
                                <div class="border ml10 webimg-box"><img :src="item.webpic" class="imgc"></div>
                            </div>
                        </el-card>
                        <div class="zou-card-sel" v-if="current==index">
                            <i class="el-icon-circle-check cb"></i>
                        </div>
                    </div>
                </div>
                <div class="plr10 mt10">
                    <el-checkbox v-model="checked" @change="onChange">仅显示自己上传的素材库</el-checkbox>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="webreset">取 消</el-button>
            <el-button size="small" type="primary" @click="websubmit">确 定</el-button>
        </span>
    </div>
    `,
    data() {
        return {
            checked: '',//仅显示自己上传的素材库
            current: '-1',//当前选中素材下标
            // 网页素材列表
            websiteList: [{
                weblink: 'http://www.baidu.com/',
                webtitle: '百度一下，你就知道',
                webinfo: '全球最大的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。',
                webpic: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            }, {
                weblink: 'https://cn.vuejs.org/',
                webtitle: 'VUE',
                webinfo: '当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。',
                webpic: 'https://cn.vuejs.org/images/logo.png',
            }, {
                weblink: 'https://www.csdn.net/',
                webtitle: 'CSDN - 专业开发者社区',
                webinfo: 'CSDN是全球知名中文IT技术交流平台,创建于1999年,包含原创博客、精品问答、职业培训、技术论坛、资源下载等产品服务,提供原创、优质、完整内容的专业IT技术开发社区.',
                webpic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            }, {
                weblink: 'https://cdn.bootcss.com/',
                webtitle: 'BootCDN - Bootstrap 中文网开源项目免费 CDN 加速服务',
                webinfo: 'Bootstrap 中文网开源项目免费 CDN 加速服务 - 我们致力于为 Bootstrap、jQuery、Angular、Vue.js 一样优秀的开源项目提供稳定、快速、免费的 CDN 加速服务。',
                webpic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            }],
        }
    },
    methods: {
        // 仅显示自己上传的素材库
        onChange(v) {
            console.log(v)
        },
        // 选中素材
        selMaterialIndex(i) {
            this.current = i;
        },
        //网页素材选择 确定
        websubmit() {
            let current = this.current;
            let content = {}
            if (current != '-1') {
                let selected = this.websiteList[current];
                content = selected;
                content.istype = '1';
            }
            this.$emit("websubmit", content);
            this.initOpen();
        },
        //网页素材选择 取消
        webreset() {
            this.$emit("webreset", true);
            this.initOpen();
        },
        // 搜索
        selsearch(input, value) {
            console.log('input:' + input, 'value:' + value)
        },
        //初始化
        initOpen() {
            this.current = '-1';//当前选择素材下标
            this.checked = '';//仅显示自己上传的素材库
        },
    },
})



// 小程序素材选择 弹窗
Vue.component('v-dialog-wx', {
    template: `
    <div class="v-web">
        <div class="v-body">
            <div class="boxb dialog-box scroll">
                <!-- 搜索 -->
                <v-search @selsearch="selsearch"></v-search>
                <!-- 列表 -->
                <div class="flex-row flex-left flex-wrap ptb5 zou-card scroll mt10">
                    <div class="zou-card-box" v-for="(item,index) in wxList" :key="index"
                        @click="selMaterialIndex(index)">
                        <el-card shadow="never">
                            <div class="fs14 c0 row2">{{item.webtitle}}</div>
                            <div class="flex-row">
                                <div class="flex-full fs14 c9 row2">{{item.webinfo}}</div>
                                <div class="border ml10 webimg-box"><img :src="item.webpic" class="imgc"></div>
                            </div>
                        </el-card>
                        <div class="zou-card-sel" v-if="current==index">
                            <i class="el-icon-circle-check cb"></i>
                        </div>
                    </div>
                </div>
                <div class="plr10 mt10">
                    <el-checkbox v-model="checked" @change="onChange">仅显示自己上传的素材库</el-checkbox>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="wxreset">取 消</el-button>
            <el-button size="small" type="primary" @click="wxsubmit">确 定</el-button>
        </span>
    </div>
    `,
    data() {
        return {
            checked: '',//仅显示自己上传的素材库
            current: '-1',//当前选中素材下标
            // 小程序素材列表
            wxList: [{
                weblink: 'pages/index/index',
                webtitle: '百度小程序1',
                webinfo: '百度一下，你就知道',
                webpic: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            }, {
                weblink: 'pages/office/office',
                webtitle: 'VUE小程序2',
                webinfo: 'VUE小程序',
                webpic: 'https://cn.vuejs.org/images/logo.png',
            }, {
                weblink: 'pages/index/index',
                webtitle: '百度小程序3',
                webinfo: '百度一下，你就知道',
                webpic: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            }, {
                weblink: 'pages/office/officeVUE小程序',
                webtitle: 'VUE小程序4',
                webinfo: 'VUE小程序',
                webpic: 'https://cn.vuejs.org/images/logo.png',
            }],
        }
    },
    methods: {
        // 仅显示自己上传的素材库
        onChange(v) {
            console.log(v)
        },
        // 选中素材
        selMaterialIndex(i) {
            this.current = i;
        },
        //文本素材选择 确定
        wxsubmit() {
            let current = this.current;
            let content = {}
            if (current != '-1') {
                let selected = this.wxList[current];
                content = selected;
                content.istype = '1';
            }
            this.$emit("wxsubmit", content);
            this.initOpen();
        },
        //文本素材选择 取消
        wxreset() {
            this.$emit("wxreset", true);
            this.initOpen();
        },
        // 搜索
        selsearch(input, value) {
            console.log('input:' + input, 'value:' + value)
        },
        //初始化
        initOpen() {
            this.current = '-1';//当前选择素材下标
            this.checked = '';//仅显示自己上传的素材库
        },
    },
})

// 以上可以不看，暂时没用到==================================================================================================================================

// 素材搜索========================================
Vue.component('v-search', {
    template: `
    <div class="v-search">
        <div class="flex-row flex-left plr10">
            <div class="w200 mr20">
                <el-input placeholder="搜索素材题材" v-model="input" size="small" clearable>
                </el-input>
            </div>
            <div class="w200 mr20">
                <el-select v-model="value" filterable clearable placeholder="请选择素材分组" size="small"
                    class="wfull">
                    <el-option v-for="item in materialClass" :key="item.value" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-search" size="small" @click="onSearch">搜索</el-button>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            input: '',//搜索素材题材
            value: '',//选择素材分组
            // 素材分组
            materialClass: [{
                label: '未分组',
                value: 'wfz',
                id: '1',
            }, {
                label: '营销话述',
                value: 'yxhs',
                id: '2',
            }, {
                label: '分组一',
                value: 'fzy',
                id: '3',
            }],
        }
    },
    methods: {
        // 搜索
        onSearch() {
            let input = this.input;
            let value = this.value;
            this.$emit("selsearch", input, value);
        },
    },
})

// 文本素材选择 弹窗===============================
Vue.component('v-dialog-text', {
    template: `
    <div class="v-text">
        <div class="v-body">
            <div class="boxb dialog-box scroll">
                <!-- 搜索 -->
                <v-search @selsearch="selsearch"></v-search>
                <!-- 列表 -->
                <div class="flex-row flex-left flex-wrap ptb5 zou-card scroll mt10">
                    <div class="zou-card-box" v-for="(item,index) in materialList" :key="index"
                        @click="selMaterialIndex(index)">
                        <el-card shadow="never">
                            <div class="zou-card-content" v-html="item.value"></div>
                        </el-card>
                        <div class="zou-card-sel" v-if="current==index">
                            <i class="el-icon-circle-check cb"></i>
                        </div>
                    </div>
                </div>
                <div class="plr10 mt10">
                    <el-checkbox v-model="checked" @change="onChange">仅显示自己上传的素材库</el-checkbox>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="textreset">取 消</el-button>
            <el-button size="small" type="primary" @click="textsubmit">确 定</el-button>
        </span>
    </div>
    `,
    data() {
        return {
            checked: '',//仅显示自己上传的素材库
            current: '-1',//当前选中素材下标
            // 文本素材列表
            materialList: [{
                value: '哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或',
                id: '1',
            }, {
                value: `<img src="https://crm.ihuzan.com/static/ec7b4eb20862f857f3e5fd7784fc7151.png" class="editor-face-img">点击“客户-流失客户”进入下图页面，展示员工删除客户的数据情况；可通过客户姓名、员工删除日期进行筛选；还可查看客户详情及聊天记录；点击“客户-流失客户”进入下图页面，展示员工删除客户的数据情况；可通过客户姓名、员工删除日期进行筛选；还可查看客户详情及聊天记录；点击“客户-流失客户”进入下图页面，展示员工删除客户的数据情况；可通过客户姓名、员工删除日期进行筛选；还可查看客户详情及聊天记录；点击“客户-流失客户”进入下图页面，展示员工删除客户的数据情况；可通过客户姓名、员工删除日期进行筛选；还可查看客户详情及聊天记录；点击“客户-流失客户”进入下图页面，展示员工删除客户的数据情况；可通过客户姓名、员工删除日期进行筛选；还可查看客户详情及聊天记录；点击“客户-流失客户”进入下图页面，展示员工删除客户的数据情况；可通过客户姓名、员工删除日期进行筛选；还可查看客户详情及聊天记录；`,
                id: '2',
            }, {
                value: '哈哈哈哈哈哈哈哈哈哈',
                id: '3',
            }],
        }
    },
    methods: {
        // 仅显示自己上传的素材库
        onChange(v) {
            console.log(v)
            console.log("现在搜索文本素材")
        },
        // 选中素材
        selMaterialIndex(i) {
            this.current = i;
        },
        //文本素材选择 确定
        textsubmit() {
            let current = this.current;
            let content = ''
            if (current != '-1') {
                content = this.materialList[current].value;
            }
            this.$emit("textsubmit", content);
            this.initOpen();
        },
        //文本素材选择 取消
        textreset() {
            this.$emit("textreset", true);
            this.initOpen();
        },
        // 搜索
        selsearch(input, value) {
            console.log('input:' + input, 'value:' + value)
            console.log("现在搜索文本素材")
        },
        //初始化
        initOpen() {
            this.current = '-1';//当前选择素材下标
            this.checked = '';//仅显示自己上传的素材库
        },
    },
})


// 插入表情========================================
Vue.component('v-emoji', {
    template: `
    <div class="v-emoji">
        <div class="border bor2 ptb10 plr20">
            <!-- 输入框 -->
            <div class="ptb10">
                <el-input type="textarea" :rows="rows" placeholder="请输入消息内容（不超过300字）" v-model="textarea" @blur="onblur">
                </el-input>
            </div>
            <!-- 表情 -->
            <div class="flex-row">
                <div class='emoji mr20'>
                    <el-popover placement="bottom-start" width="410">
                        <div class="tabs-emoji">
                            <el-tabs v-model="activeEmoji" @tab-click="handleClick">
                                <el-tab-pane :label="item.name" :name="idx"
                                    v-for="(item,idx) in emojiList" :key="idx">
                                    <div class="emoji-box scroll flex-row flex-left flex-wrap">
                                        <div class="emoji-btn-box hand"
                                            v-for="(items,i) in item.max_number" :key="i"
                                            @click="handleEmoji(idx,items)">
                                            <img :src="item.path+items+item.suffix">
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                        <img src="./images/ic_emoji@2x.png" slot="reference" class="hand w26">
                        </el-button>
                    </el-popover>
                </div>
                <div class="hand cb" @click="selMaterial">从素材库选择</div>
                <div class="flex-full"></div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            textarea: '',
            // emoji表情 （name：名称，path：路径，suffix：后缀，max_number：总数）
            emojiList: [
                { name: "QQ表情", path: "./images/emoji/qq/", suffix: ".gif", max_number: 91 },
                { name: "贴吧表情", path: "./images/emoji/tieba/", suffix: ".jpg", max_number: 50 }
            ],
            activeEmoji: '0',//当前表情name下标
        }
    },
    props: ["textarea", "rows"],
    methods: {
        // 插入表情
        handleEmoji(idx, i) {
            let emojiList = this.emojiList;
            let faceImg = `<img src="${emojiList[idx].path}${i}${emojiList[idx].suffix}" class="editor-face-img">`;
            this.textarea = this.textarea + faceImg;
            this.$emit("textsubmit", this.textarea);
        },
        onblur() {
            this.$emit("textsubmit", this.textarea);
        },
        //文本素材选择 打开
        selMaterial() {
            this.$emit("textopen", true);
        },
        // 切换tabs
        handleClick(tab) {
            console.log(tab.index, tab.label, tab.name);
        },
    },
})



// 添加图片/网页/小程序消息 按钮=====================
Vue.component('v-message-btn', {
    template: `
    <div class="v-message-btn pt10">
        <!-- 图片 -->
        <div v-if="isclass=='0'">
            <div class="flex-row">
                <div class="border webimg-box-80">
                    <img :src="isname" class="imgc img80">
                </div>
                <div class="ml10 hand" @click="delSel">
                    <i class="el-icon-circle-close fs30 c3"></i>
                </div>
                <div class="flex-full"></div>
            </div>
        </div>
        <!-- 网页 -->
        <div v-else-if="isclass=='1'">
            <div class="flex-row">
                <div class="fs14 c0 fwb row2">【网页】{{isname}}</div>
                <div class="ml10 hand" @click="delSel">
                    <i class="el-icon-circle-close fs30 c3"></i>
                </div>
                <div class="flex-full"></div>
            </div>
        </div>
        <!-- 小程序 -->
        <div v-else-if="isclass=='2'">
            <div class="flex-row">
                <div class="fs14 c0 fwb row2">【小程序】{{isname}}</div>
                <div class="ml10 hand" @click="delSel">
                    <i class="el-icon-circle-close fs30 c3"></i>
                </div>
                <div class="flex-full"></div>
            </div>
        </div>
        <!-- 添加 -->
        <div v-else>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="selMessage">
                添加图片/网页/小程序消息
            </el-button>
        </div>
    </div>
    `,
    data() {
        return {}
    },
    props: ["isclass", "isname"],
    methods: {
        // 删除消息
        delSel() {
            this.$emit("delsel", true);
        },
        // 添加消息 打开
        selMessage() {
            this.$emit("dialogopen", true);
        }
    },
})



// 添加图片/网页/小程序消息 弹窗=====================
Vue.component('v-message-add', {
    template: `
    <div class="v-message-add">
        <!-- 新建消息 弹窗-->
        <el-dialog title="新建消息" class="dialog-big dialog-big2" :visible.sync="dialogmessage">
            <div class="boxb dialog-box scroll">
                <div class="plr15">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <!-- 图片 -->
                        <el-tab-pane label="图片" name="first">
                            <div class="dbox ptb20 zou-tabs-pic flex-row flex-top">
                                <div class="w200 mr20 pr20">
                                    <el-image fit="cover" class="border bor2" :src="dialogImageUrl">
                                        <div slot="error" class="image-slot">
                                            <i class="el-icon-picture-outline fs30 cb2"></i>
                                        </div>
                                    </el-image>
                                    <div class="ptb10 fs15 c9 mt10">{{imgName}}</div>
                                    <div class="mt20" v-if="istype=='0'">
                                        <el-checkbox v-model="checked2">保存到素材库</el-checkbox>
                                    </div>
                                </div>
                                <div class="pl20 ml20">
                                    <label class="zou-upload-btn bg-g bor2 flex-col hand">
                                        <i class="el-icon-plus fs30 c9"></i>
                                        <div class="fs14 c9 pt5">上传图片</div>
                                        <input type="file" style='display:none;' @change="updatePhoto(0)"
                                            accept="image/jpg, image/jpeg, image/png">
                                    </label>
                                    <div class="c9 ptb15 fs12 tc">图片大小不超过2M</div>
                                </div>
                                <div class="pl20 ml20">
                                    <div class="zou-upload-btn bg-g bor2 flex-col hand" @click="selImage">
                                        <i class="el-icon-plus fs30 c9"></i>
                                        <div class="fs14 c9 pt5">从素材库选择</div>
                                    </div>
                                </div>
                                <div class="flex-full"></div>
                            </div>
                        </el-tab-pane>
                        <!-- 网页 -->
                        <el-tab-pane label="网页" name="second">
                            <div class="dbox ptb20 zou-tabs-web flex-row flex-top">
                                <div class="mr20 pr20">
                                    <div class="border zou-form ptb20">
                                        <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px"
                                            size="small" class="demo-ruleForm">
                                            <el-form-item label="链接：" prop="weblink">
                                                <el-input v-model="ruleForm.weblink"></el-input>
                                            </el-form-item>
                                            <el-form-item label="标题：" prop="webtitle">
                                                <el-input v-model="ruleForm.webtitle"></el-input>
                                            </el-form-item>
                                            <el-form-item label="描述：" prop="webinfo">
                                                <el-input v-model="ruleForm.webinfo"></el-input>
                                            </el-form-item>
                                            <el-form-item label="封面图：" prop="webpic">
                                                <div class="zou-upload-btn2 webpic-box rel mt10"
                                                    v-if="ruleForm.webpic!=''">
                                                    <el-image fit="cover" class="zou-upload-btn2 bor2 flex-col"
                                                        :src="ruleForm.webpic">
                                                        <div slot="error" class="image-slot">
                                                            <i class="el-icon-picture-outline fs30 cb2"></i>
                                                        </div>
                                                    </el-image>
                                                    <div class="abs webpic-del flex-col hand" @click="webpicDel">
                                                        <i class="el-icon-delete fs30 cf"></i>
                                                    </div>
                                                </div>
                                                <label class="zou-upload-btn2 bg-g bor2 flex-col hand mt10" v-else>
                                                    <i class="el-icon-plus fs30 c9"></i>
                                                    <div class="fs14 c9 pt5">上传图片</div>
                                                    <input type="file" style='display:none;' @change="updatePhoto(1)"
                                                        accept="image/jpg, image/jpeg, image/png">
                                                </label>
                                                <div class="c9 pt15 fs12 tl">建议尺寸：160×160像素；支持jpg、jpeg、png格式，图片大小不超过1MB
                                                </div>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                    <div class="mt20" v-if="ruleForm.istype=='0'">
                                        <el-checkbox v-model="checked2">保存到素材库</el-checkbox>
                                    </div>
                                </div>
                                <div class="pl20">
                                    <div class="zou-upload-btn bg-g bor2 flex-col hand" @click="selWebsite">
                                        <i class="el-icon-plus fs30 c9"></i>
                                        <div class="fs14 c9 pt5">从素材库选择</div>
                                    </div>
                                </div>
                                <div class="flex-full"></div>
                            </div>
                        </el-tab-pane>
                        <!-- 小程序 -->
                        <el-tab-pane label="小程序" name="third">
                            <div class="dbox ptb20 zou-tabs-web flex-row flex-top">
                                <div class="mr20 pr20">
                                    <div class="border zou-form ptb20">
                                        <el-form :model="ruleForm2" ref="ruleForm2" :rules="rules" label-width="100px"
                                            size="small" class="demo-ruleForm">
                                            <el-form-item label="小程序：" prop="webtitle">
                                                <el-select v-model="ruleForm2.webtitle" clearable filterable
                                                    placeholder="">
                                                    <el-option v-for="(item,idx) in wxList" :key="idx"
                                                        :label="item.webtitle" :value="item.webtitle">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="标题：" prop="webinfo">
                                                <el-input v-model="ruleForm2.webinfo"></el-input>
                                            </el-form-item>
                                            <el-form-item label="page：" prop="weblink">
                                                <el-input v-model="ruleForm2.weblink"></el-input>
                                            </el-form-item>
                                            <el-form-item label="封面图：" prop="webpic">
                                                <div class="zou-upload-btn2 webpic-box rel mt10"
                                                    v-if="ruleForm2.webpic!=''">
                                                    <el-image fit="cover" class="zou-upload-btn2 bor2 flex-col"
                                                        :src="ruleForm2.webpic">
                                                        <div slot="error" class="image-slot">
                                                            <i class="el-icon-picture-outline fs30 cb2"></i>
                                                        </div>
                                                    </el-image>
                                                    <div class="abs webpic-del flex-col hand" @click="wxpicDel">
                                                        <i class="el-icon-delete fs30 cf"></i>
                                                    </div>
                                                </div>
                                                <label class="zou-upload-btn2 bg-g bor2 flex-col hand mt10" v-else>
                                                    <i class="el-icon-plus fs30 c9"></i>
                                                    <div class="fs14 c9 pt5">上传图片</div>
                                                    <input type="file" style='display:none;' @change="updatePhoto(2)"
                                                        accept="image/jpg, image/jpeg, image/png">
                                                </label>
                                                <div class="c9 pt15 fs12 tl">建议尺寸：160×160像素；支持jpg、jpeg、png格式，图片大小不超过1MB
                                                </div>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                    <div class="mt20" v-if="ruleForm2.istype=='0'">
                                        <el-checkbox v-model="checked2">保存到素材库</el-checkbox>
                                    </div>
                                </div>
                                <div class="pl20">
                                    <div class="zou-upload-btn bg-g bor2 flex-col hand" @click="selWx">
                                        <i class="el-icon-plus fs30 c9"></i>
                                        <div class="fs14 c9 pt5">从素材库选择</div>
                                    </div>
                                </div>
                                <div class="flex-full"></div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="MessageReset">取 消</el-button>
                <el-button size="small" type="primary" @click="MessageSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 图片素材选择 -->
        <el-dialog title="图片素材选择" :visible.sync="dialogImages">
            <div class="boxb dialog-box scroll">
                <!-- 搜索 -->
                <v-search @selsearch="selsearch"></v-search>
                <!-- 列表 -->
                <div class="flex-row flex-left flex-wrap ptb5 zou-card scroll mt10">
                    <div class="zou-card-img" v-for="(item,index) in imagesList" :key="index"
                        @click="selMaterialIndex(index)">
                        <div class="zou-img-pic">
                            <img :src="item.url" class="imgc">
                            <div class="nowrap fs12 c9 pt5 tc">{{item.name}}</div>
                        </div>
                        <div class="zou-card-sel-img" v-if="current==index">
                            <i class="el-icon-circle-check cb mb20"></i>
                        </div>
                    </div>
                </div>
                <div class="plr10 mt10">
                    <el-checkbox v-model="checked" @change="onChange">仅显示自己上传的素材库</el-checkbox>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogImages = false;">取 消</el-button>
                <el-button size="small" type="primary" @click="ImagesSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 网页素材选择 -->
        <el-dialog title="网页素材选择" :visible.sync="dialogWebsite">
            <div class="boxb dialog-box scroll">
                <!-- 搜索 -->
                <v-search @selsearch="selsearch"></v-search>
                <!-- 列表 -->
                <div class="flex-row flex-left flex-wrap ptb5 zou-card scroll mt10">
                    <div class="zou-card-box" v-for="(item,index) in websiteList" :key="index"
                        @click="selMaterialIndex(index)">
                        <el-card shadow="never">
                            <div class="fs14 c0 row2">{{item.webtitle}}</div>
                            <div class="flex-row">
                                <div class="flex-full fs14 c9 row2">{{item.webinfo}}</div>
                                <div class="border ml10 webimg-box"><img :src="item.webpic" class="imgc"></div>
                            </div>
                        </el-card>
                        <div class="zou-card-sel" v-if="current==index">
                            <i class="el-icon-circle-check cb"></i>
                        </div>
                    </div>
                </div>
                <div class="plr10 mt10">
                    <el-checkbox v-model="checked" @change="onChange">仅显示自己上传的素材库</el-checkbox>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogWebsite = false;">取 消</el-button>
                <el-button size="small" type="primary" @click="WebsiteSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 小程序素材选择 -->
        <el-dialog title="小程序素材选择" :visible.sync="dialogWx">
            <div class="boxb dialog-box scroll">
                <!-- 搜索 -->
                <v-search @selsearch="selsearch"></v-search>
                <!-- 列表 -->
                <div class="flex-row flex-left flex-wrap ptb5 zou-card scroll mt10">
                    <div class="zou-card-box" v-for="(item,index) in wxList" :key="index"
                        @click="selMaterialIndex(index)">
                        <el-card shadow="never">
                            <div class="fs14 c0 row2">{{item.webtitle}}</div>
                            <div class="flex-row">
                                <div class="flex-full fs14 c9 row2">{{item.webinfo}}</div>
                                <div class="border ml10 webimg-box"><img :src="item.webpic" class="imgc"></div>
                            </div>
                        </el-card>
                        <div class="zou-card-sel" v-if="current==index">
                            <i class="el-icon-circle-check cb"></i>
                        </div>
                    </div>
                </div>
                <div class="plr10 mt10">
                    <el-checkbox v-model="checked" @change="onChange">仅显示自己上传的素材库</el-checkbox>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogWx = false;">取 消</el-button>
                <el-button size="small" type="primary" @click="WxSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    `,
    data() {
        return {
            dialogImages: false,//图片素材选择-弹窗
            dialogWebsite: false,//网页素材选择-弹窗
            dialogWx: false,//小程序素材选择-弹窗
            activeName: 'first',//当前tabs
            checked2: '',//保存到素材库
            checked: '',//仅显示自己上传的素材库
            current: '-1',//当前选中素材下标
            // 新建消息-图片-地址
            dialogImageUrl: '',
            imgName: '图片名称',
            istype: '0',//类型（0：自己上传，1：素材里选）
            // 新建消息-网页
            ruleForm: {
                weblink: '',
                webtitle: '',
                webinfo: '',
                webpic: '',
                istype: '0'//类型（0：自己上传，1：素材里选）
            },
            // 新建消息-网页-验证
            rules: {
                weblink: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                webtitle: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                webinfo: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                webpic: [
                    { required: true, message: '必填' }
                ]
            },
            // 新建消息-小程序
            ruleForm2: {
                weblink: '',
                webtitle: '',
                webinfo: '',
                webpic: '',
                istype: '0'//类型（0：自己上传，1：素材里选）
            },
            // 新建消息-小程序-验证
            rules2: {
                weblink: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                webtitle: [
                    { required: true, message: '必填', trigger: 'change' }
                ],
                webinfo: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                webpic: [
                    { required: true, message: '必填' }
                ]
            },
            // 小程序素材列表
            wxList: [{
                weblink: 'pages/index/index',
                webtitle: '百度小程序1',
                webinfo: '百度一下，你就知道',
                webpic: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            }, {
                weblink: 'pages/office/office',
                webtitle: 'VUE小程序2',
                webinfo: 'VUE小程序',
                webpic: 'https://cn.vuejs.org/images/logo.png',
            }, {
                weblink: 'pages/index/index',
                webtitle: '百度小程序3',
                webinfo: '百度一下，你就知道',
                webpic: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            }, {
                weblink: 'pages/office/officeVUE小程序',
                webtitle: 'VUE小程序4',
                webinfo: 'VUE小程序',
                webpic: 'https://cn.vuejs.org/images/logo.png',
            }],
            // 文本素材列表
            materialList: [{
                value: '哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或',
                id: '1',
            }, {
                value: `<img src="https://crm.ihuzan.com/static/ec7b4eb20862f857f3e5fd7784fc7151.png" class="editor-face-img">点击“客户-流失客户”进入下图页面，展示员工删除客户的数据情况；可通过客户姓名、员工删除日期进行筛选；还可查看客户详情及聊天记录；点击“客户-流失客户”进入下图页面，展示员工删除客户的数据情况；可通过客户姓名、员工删除日期进行筛选；还可查看客户详情及聊天记录；点击“客户-流失客户”进入下图页面，展示员工删除客户的数据情况；可通过客户姓名、员工删除日期进行筛选；还可查看客户详情及聊天记录；点击“客户-流失客户”进入下图页面，展示员工删除客户的数据情况；可通过客户姓名、员工删除日期进行筛选；还可查看客户详情及聊天记录；点击“客户-流失客户”进入下图页面，展示员工删除客户的数据情况；可通过客户姓名、员工删除日期进行筛选；还可查看客户详情及聊天记录；点击“客户-流失客户”进入下图页面，展示员工删除客户的数据情况；可通过客户姓名、员工删除日期进行筛选；还可查看客户详情及聊天记录；`,
                id: '2',
            }, {
                value: '哈哈哈哈哈哈哈哈哈哈',
                id: '3',
            }],
            // 图片素材列表
            imagesList: [{
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "这里是图片名称",
                id: "1"
            }, {
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "800_cs",
                id: "1"
            }, {
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "这里是图片名称",
                id: "1"
            }, {
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "800_cs",
                id: "1"
            }, {
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "800_cs",
                id: "1"
            }, {
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "800_cs",
                id: "1"
            }, {
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "800_cs",
                id: "1"
            }, {
                url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                name: "800_cs",
                id: "1"
            }],
            // 网页素材列表
            websiteList: [{
                weblink: 'http://www.baidu.com/',
                webtitle: '百度一下，你就知道',
                webinfo: '全球最大的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。',
                webpic: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            }, {
                weblink: 'https://cn.vuejs.org/',
                webtitle: 'VUE',
                webinfo: '当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。',
                webpic: 'https://cn.vuejs.org/images/logo.png',
            }, {
                weblink: 'https://www.csdn.net/',
                webtitle: 'CSDN - 专业开发者社区',
                webinfo: 'CSDN是全球知名中文IT技术交流平台,创建于1999年,包含原创博客、精品问答、职业培训、技术论坛、资源下载等产品服务,提供原创、优质、完整内容的专业IT技术开发社区.',
                webpic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            }, {
                weblink: 'https://cdn.bootcss.com/',
                webtitle: 'BootCDN - Bootstrap 中文网开源项目免费 CDN 加速服务',
                webinfo: 'Bootstrap 中文网开源项目免费 CDN 加速服务 - 我们致力于为 Bootstrap、jQuery、Angular、Vue.js 一样优秀的开源项目提供稳定、快速、免费的 CDN 加速服务。',
                webpic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            }],
        }
    },
    props: ["dialogmessage"],
    methods: {
        // 选中素材
        selMaterialIndex(i) {
            this.current = i;
        },
        // 仅显示自己上传的素材库
        onChange(v) {
            console.log("仅显示自己上传的素材库:" + v)
            let activeName = this.activeName;
            if (activeName == 'first') {
                console.log("现在搜索图片素材")
            } else if (activeName == 'second') {
                console.log("现在搜索网页素材")
            } else if (activeName == 'third') {
                console.log("现在搜索小程序素材")
            } else {
                return;
            }
        },
        //添加图片/网页/小程序消息 打开
        selMessage() {
            this.dialogMessage = true;
            this.activeName = 'first';//当前tabs
            this.checked2 = '';//保存到素材库
            this.$nextTick(() => {
                // 这里写打开弹窗要执行的事件
            })
        },
        // 切换tabs
        handleClick(tab) {
            console.log(tab.index, tab.label, tab.name);
        },
        //上传图片 （i：类型，0：图片，1：网页，2：小程序）
        updatePhoto(i = 0) {
            var file = event.currentTarget.files[0];
            if (file) {
                var url = this.getObjUrl(file);
                if (i == 0) {
                    this.dialogImageUrl = url;
                    this.imgName = file.name;
                    this.istype = '0';
                } else if (i == 1) {
                    this.ruleForm.webpic = url;
                    this.ruleForm.istype = '0';
                } else if (i == 2) {
                    this.ruleForm2.webpic = url;
                    this.ruleForm2.istype = '0';
                }
            };
        },
        //将上传图片转为本地链接
        getObjUrl(file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file);
            };
            return url;
        },
        // 图片素材选择 打开
        selImage() {
            this.dialogImages = true;
            this.initOpen();
            this.$nextTick(() => {
                // 这里写打开弹窗要执行的事件
            })
        },
        //图片素材选择 确定
        ImagesSubmit() {
            let current = this.current;
            if (current != '-1') {
                let url = this.imagesList[current].url;
                let name = this.imagesList[current].name;
                this.imgName = name;
                this.dialogImageUrl = url;
                this.istype = '1';
            }
            this.dialogImages = false
        },
        // 删除网页图片
        webpicDel() {
            this.ruleForm.webpic = '';
        },
        // 网页素材选择 打开
        selWebsite() {
            this.dialogWebsite = true;
            this.initOpen();
            this.$nextTick(() => {
                // 这里写打开弹窗要执行的事件
            })
        },
        //网页素材选择 确定
        WebsiteSubmit() {
            let current = this.current;
            if (current != '-1') {
                let selected = this.websiteList[current];
                this.ruleForm = selected;
                this.ruleForm.istype = '1';
            }
            this.dialogWebsite = false
        },
        //初始化
        initOpen() {
            this.current = '-1';//当前选择素材下标
            this.input = '';//搜索题材
            this.value = '';//素材分组
            this.checked = '';//仅显示自己上传的素材库
        },
        // 小程序素材选择 打开
        selWx() {
            this.dialogWx = true;
            this.initOpen();
            this.$nextTick(() => {
                // 这里写打开弹窗要执行的事件
            })
        },
        // 删除小程序图片
        wxpicDel() {
            this.ruleForm2.webpic = '';
        },
        //小程序素材选择 确定
        WxSubmit() {
            let current = this.current;
            if (current != '-1') {
                let selected = this.wxList[current];
                this.ruleForm2 = selected;
                this.ruleForm2.istype = '1';
            }
            this.dialogWx = false
        },
        // 搜索
        selsearch(input, value) {
            console.log('input:' + input, 'value:' + value)
            let activeName = this.activeName;
            if (activeName == 'first') {
                console.log("现在搜索图片素材")
            } else if (activeName == 'second') {
                console.log("现在搜索网页素材")
            } else if (activeName == 'third') {
                console.log("现在搜索小程序素材")
            } else {
                return;
            }
        },
        //添加图片/网页/小程序消息 确定
        // 取消
        MessageReset() {
            this.$emit("messagereset", true);
        },
        // 确定
        MessageSubmit() {
            let activeName = this.activeName;
            let checked2 = this.checked2;
            if (activeName == 'first') {
                let url = this.dialogImageUrl;
                if (url != '') {
                    console.log("保存到图片素材库:" + checked2)
                    this.$emit("messageaubmit", '0', url);
                }
                this.MessageReset();
            } else if (activeName == 'second') {
                let formName = "ruleForm";
                let url = this.ruleForm.webtitle;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("保存到网页素材库:" + checked2)
                        this.$emit("messageaubmit", '1', url);
                    }
                });
            } else if (activeName == 'third') {
                let formName = "ruleForm2";
                let url = this.ruleForm2.webtitle;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("保存到小程序素材库:" + checked2)
                        this.$emit("messageaubmit", '1', url);
                    }
                });
            } else {
                this.$emit("messageaubmit", '-1', '');
            }
        },
    },
})
