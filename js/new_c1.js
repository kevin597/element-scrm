var vm = new Vue({
    el: '#app',
    data: {
        input: '',//活码名称
        radio: 0,//类型（0：单人，1：多人）
        checked: false,//添加设置
        //渠道列表
        Qptions: [{
            value: '选项1',
            label: '渠道1'
        }, {
            value: '选项2',
            label: '渠道2'
        }, {
            value: '选项3',
            label: '渠道3'
        }],
        value: '',//渠道选中值
        switch1: false,//特殊时期
        switch2: false,//周期排员
        defaultList: { personnel: [], department: [] },//默认员工
        dialogAddVisible: false,//添加成员弹框
        dialogSelVisible: false,//选择成员弹框
        // 部门列表,
        options: [{
            value: '选项1',
            label: '设计部'
        }, {
            value: '选项2',
            label: '业务部'
        }, {
            value: '选项3',
            label: '行政部'
        }, {
            value: '选项4',
            label: '项目1部'
        }, {
            value: '选项5',
            label: '项目2部'
        }, {
            value: '选项6',
            label: '项目3部'
        }],
        tssqTimeList: {},//特殊时期
        // 特殊时期弹窗选择人员
        dialogIndex: {
            key: '',
            index: '',
            type: 0,
            data: []
        },
        checkboxGroup: [],//适用周期选中的值
        gdsdTimeList: [ //固定时间
            { startTime: "", endTime: "", personnel: [], department: [] }
        ],
        // 周期列表
        weekOptions: [{
            id: 1,
            cname: '周一',
            ename: 'Monday',
            list: []
        }, {
            id: 2,
            cname: '周二',
            ename: 'Tuesday',
            list: []
        }, {
            id: 3,
            cname: '周三',
            ename: 'Wednesday',
            list: []
        }, {
            id: 4,
            cname: '周四',
            ename: 'Thursday',
            list: []
        }, {
            id: 5,
            cname: '周五',
            ename: 'Friday',
            list: []
        }, {
            id: 6,
            cname: '周六',
            ename: 'Saturday',
            list: []
        }, {
            id: 7,
            cname: '周日',
            ename: 'Sunday',
            list: []
        }]
    },
    created() {
        // 增加1个特殊时期
        this.tssqTimeAdd(this.randomString());
    },
    filters: {
        // json对象转字符串（cname：名称）
        jsonToString: function (value, cname) {
            if (!value) return ''
            if (typeof (value) == 'string' || typeof (value) != 'object') return ''
            let newValue = ''
            value.forEach((item) => {
                newValue = newValue + item[cname] + ' ';
            })
            return newValue
        }
    },
    methods: {
        // 随机32位key
        randomString(len) {
            len = len || 32;
            var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhijklmnopqrstuvwxyz1234567890';
            var maxPos = $chars.length;
            var pwd = '';
            for (i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },
        // 类型切换
        onRadioChange(e) {
            // 重置特殊时期
            this.tssqTimeList = {};
            this.tssqTimeAdd(this.randomString());
            // 重置固定时期
            this.gdsdTimeList = [];
            let arrdata = [{ startTime: "", endTime: "", personnel: [], department: [] }];
            this.gdsdTimeList = arrdata.map(o => ({ ...o }));
            // 重置默认人员
            this.defaultList = {};
            this.defaultList = { personnel: [], department: [] };
            // 重置周期排员
            let weeklist = this.weekOptions;
            for (let j = 0; j < weeklist.length; j++) {
                this.weekOptions[j].list = [];
            }
        },
        // 添加特殊时期
        tssqTimeAdd(key) {
            if (key == '' || key == undefined) {
                key = this.randomString();
            }
            let defaultDate = new Date();
            defaultDate = defaultDate.getTime();//默认为当天日期（时间戳方式显示）
            Vue.set(this.tssqTimeList, key, { dataRange: [defaultDate, defaultDate], timeRange: [] });
            this.tssqTimePush(key);//新增一个默认时间段
            // console.log(this.tssqTimeList)
        },
        // 添加特殊时期中时间段
        tssqTimePush(key) {
            let arr = { startTime: "", endTime: "", personnel: [], department: [] };
            this.tssqTimeList[key].timeRange.push(arr);
        },
        // 删除特殊时期中时间段
        tssqTimeDel(key, i) {
            this.tssqTimeList[key].timeRange.splice(i, 1);
        },
        // 删除特殊时期
        tssqDateDel(key) {
            Vue.delete(this.tssqTimeList, key)
        },
        // 选择企业人员 - type:类型（0：特殊时期，1：正常时期,2:默认员工）
        handleOpen(key, idx, data, type = 0) {
            this.dialogSelVisible = true;
            this.dialogIndex.key = key;
            this.dialogIndex.index = idx;
            this.dialogIndex.type = type;
            this.dialogIndex.data = data.map(o => ({ ...o }));
            // this.selarr = data.map(o => ({ ...o }));
            // console.log('data:' + data.length)
            // console.log('selarr:' + this.selarr.length)
            // 回显选中的人员
            // this.$nextTick(() => {
            //     this.setCheckedNodes(data)
            // })
        },
        // 选择人员dialog弹窗确定
        selsubmit(data) {
            // console.log('d2:', data)
            this.selreset();
            let selarr = data;
            let key = this.dialogIndex.key;
            let index = this.dialogIndex.index;
            let type = this.dialogIndex.type;
            if (type == 0) {
                this.tssqTimeList[key].timeRange[index].personnel = selarr.map(o => ({ ...o }));
            } else if (type == 1) {
                this.gdsdTimeList[index].personnel = selarr.map(o => ({ ...o }));
            } else if (type == 2) {
                this.defaultList.personnel = selarr.map(o => ({ ...o }));
            }
        },
        // 选择人员dialog弹窗取消
        selreset() {
            this.dialogSelVisible = false;
        },
        // 添加人员dialog弹窗确定
        addSubmit() {
            let seled = this.checkboxGroup; // 选择的适用周期
            let arrlist = this.gdsdTimeList; // 设置的固定时间数据集合
            let isRnull = false; // 是否选择了企业人员或部门
            let isTnull = false; // 是否选择了起始及结束时间段
            let isobj = {}; // 选择的时间段集合
            let isTime = false; // 选择的时间段是否有冲突
            // let qd_type = this.radio; // 类型（0：单人，1：多人）
            for (var i = 0; i < arrlist.length; i++) {
                // if (qd_type == '0') {//单人
                //     if (arrlist[i].personnel == '') {
                //         isRnull = true;
                //     }
                // } else {//多人1
                if (arrlist[i].personnel.length == 0 && arrlist[i].department.length == 0) {
                    isRnull = true;
                }
                // }
                if (arrlist[i].startTime == '' || arrlist[i].endTime == '') {
                    isTnull = true;
                }
                let start = parseInt(arrlist[i].startTime);
                let end = parseInt(arrlist[i].endTime);
                for (let j = start; j < end; j++) {
                    if (isobj[j] == null) {
                        isobj[j] = true;
                    } else {
                        isTime = true;
                    }
                }
            }
            if (isRnull) {
                this.$message({
                    message: '请选择企业人员或部门',
                    type: 'warning',
                    center: true
                });
                return false;
            }
            if (isTnull) {
                this.$message({
                    message: '请选择起始及结束时间段',
                    type: 'warning',
                    center: true
                });
                return false;
            }
            if (isTime) {
                this.$message({
                    message: '时间段存在冲突，请修改',
                    type: 'warning',
                    center: true
                });
                return false;
            }
            if (seled.length == 0) {
                this.$message({
                    message: '请选择适用周期',
                    type: 'warning',
                    center: true
                });
                return false;
            }
            // 把设置的时间人员加到选中的适用周期里
            seled.forEach((j) => {
                // this.weekOptions[j].list = [].concat(arrlist);
                this.weekOptions[j].list = arrlist.map(o => ({ ...o }));
            })
            // console.log(isobj)
            // console.log(this.checkboxGroup)
            // console.log(this.gdsdTimeList)
            this.dialogAddVisible = false
        },
        // 添加固定时间段
        gdsdTimePush() {
            let arr = { startTime: "", endTime: "", personnel: [], department: [] };
            this.gdsdTimeList.push(arr);
        },
        // 删除固定时间段
        gdsdTimeDel(i) {
            this.gdsdTimeList.splice(i, 1);
        },
        // 添加修改固定时间段企业成员
        handleAdd(i) {
            this.checkboxGroup = [];
            this.gdsdTimeList = [];
            if (i < 7) {
                let list = this.weekOptions[i].list;
                this.checkboxGroup.push(i);
                this.gdsdTimeList = list.map(o => ({ ...o }));
            } else {
                let arr = { startTime: "", endTime: "", personnel: [], department: [] };
                this.gdsdTimeList.push(arr);
            }
            this.dialogAddVisible = true
        },
        // 提交
        bigSubmit() {
            let qd_name = this.input;
            let qd_type = this.radio;
            let qd_set = this.checked;
            let qd_qd = this.value;
            let qd_defaultList = this.defaultList;//默认员工
            let qd_gdsq = this.switch2//是否固定时期
            let qd_tssq = this.switch1//是否特殊时期
            let qd_tssqlist = this.tssqTimeList;// 设置的特殊时期数据集合
            let qd_gdsqlist = this.gdsdTimeList;// 设置的固定时间数据集合
            // 活码名称判断
            if (qd_name == '') {
                this.$message({
                    message: '请输入活码名称',
                    type: 'warning',
                    center: true
                });
                return false;
            }
            //默认员工
            if (qd_defaultList.personnel.length == 0 && qd_defaultList.department.length == 0) {
                this.$message({
                    message: '请选择默认员工',
                    type: 'warning',
                    center: true
                });
                return false;
            }
            // 固定时间判断
            if (qd_gdsq) {
                let isGnull = false;
                for (var i = 0; i < qd_gdsqlist.length; i++) {
                    if (qd_gdsqlist[i].personnel.length == 0 && qd_gdsqlist[i].department.length == 0) {
                        isGnull = true;
                    }
                }
                if (isGnull) {
                    this.$message({
                        message: '请添加企业成员设置固定时期',
                        type: 'warning',
                        center: true
                    });
                    return false;
                }
            }
            //特殊时期判断
            if (qd_tssq) {
                let isRnull = false; // 是否设置成员
                let isTnull = false; // 是否设置时间段
                let isobj = {}; // 设置的时间段
                let isTime = false; // 设置的时间段是否冲突
                // 遍历特殊时期
                for (var i in qd_tssqlist) {
                    // 遍历时间段
                    for (var j = 0; j < qd_tssqlist[i].timeRange.length; j++) {
                        // 是否设置成员
                        // 单人0
                        // if (qd_type == '0') {
                        //     if (qd_tssqlist[i].timeRange[j].personnel == '') {
                        //         isRnull = true;
                        //     }
                        // } else {//多人1
                        if (qd_tssqlist[i].timeRange[j].personnel.length == 0 && qd_tssqlist[i].timeRange[j].department.length == 0) {
                            isRnull = true;
                        }
                        // }
                        // 是否设置时间
                        if (qd_tssqlist[i].timeRange[j].startTime == '' || qd_tssqlist[i].timeRange[j].endTime == '') {
                            isTnull = true;
                        }
                        // 设置的时间是否冲突
                        let start = parseInt(qd_tssqlist[i].timeRange[j].startTime);
                        let end = parseInt(qd_tssqlist[i].timeRange[j].endTime);
                        for (let j = start; j < end; j++) {
                            if (isobj[j] == null) {
                                isobj[j] = true;
                            } else {
                                isTime = true;
                            }
                        }
                    }
                }
                if (isRnull) {
                    this.$message({
                        message: '请选择企业人员或部门',
                        type: 'warning',
                        center: true
                    });
                    return false;
                }
                if (isTnull) {
                    this.$message({
                        message: '请选择起始及结束时间段',
                        type: 'warning',
                        center: true
                    });
                    return false;
                }
                if (isTime) {
                    this.$message({
                        message: '时间段存在冲突，请修改',
                        type: 'warning',
                        center: true
                    });
                    return false;
                }
            }
            this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success',
                center: true,
                onClose: function () {
                    console.log("关闭时的回调函数")
                }
            });
            console.log('活码名称:' + qd_name)
            console.log('添加设置:' + qd_set)
            console.log('渠道:' + qd_qd)
            console.log('类型:' + qd_type)
            console.log('默认员工:' + JSON.stringify(qd_defaultList))
            console.log('固定时期:' + qd_gdsq)
            console.log('固定时期:' + JSON.stringify(qd_gdsqlist))
            console.log('特殊时期:' + qd_tssq)
            console.log('特殊时期:' + JSON.stringify(qd_tssqlist))
        },
    }
});