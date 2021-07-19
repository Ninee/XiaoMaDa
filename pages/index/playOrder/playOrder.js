(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/index/playOrder/playOrder" ], {
    "18f6": function(t, e, s) {
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var s = getApp(), o = {
                data: function() {
                    return {
                        firstCategorys: [],
                        recovery_category_id: 0,
                        recovery_category_name: "",
                        recovery_category_is_on: 0,
                        setDefCategoryValue: null,
                        categoryShow: !1,
                        showPrice: !1,
                        noPriceMsg: "选择地址后可获得价格",
                        noPriceMsgCanToAddress: !1,
                        price_areas: "",
                        lookPriceLists: [],
                        setDefWeightValue: null,
                        weightShow: !1,
                        goodWeight: [],
                        selectWeight: "",
                        setDefTimeValue: null,
                        timeShow: !1,
                        time_area: [],
                        indicatorStyle: "height: ".concat(Math.round(t.getSystemInfoSync().screenWidth / 7.5), "px;"),
                        select_day_str: "",
                        select_hour_str: "",
                        hours: [],
                        chose_address: "",
                        terminal_user_address_id: "",
                        message: "",
                        upImg1: {
                            show: !0,
                            url: ""
                        },
                        upImg2: {
                            show: !0,
                            url: ""
                        },
                        upImg3: {
                            show: !0,
                            url: ""
                        },
                        upImg4: {
                            show: !0,
                            url: ""
                        },
                        userStatus: 1,
                        showLogin: !1,
                        area_code: "",
                        show_more: !1,
                        tmplIds: []
                    };
                },
                onLoad: function(e) {
                    this.showLogin = !0;
                    var s = this;
                    e && e.id && e.title && (this.recovery_category_id = e.id, this.recovery_category_name = e.title), 
                    t.$on("choose_address", function(t) {
                        s.terminal_user_address_id = t.id, this.$http.post("/terminalUser/addres/getAddress", {
                            id: t.id
                        }).then(function(t) {
                            s.chose_address = "".concat(t.data.province_code_desc).concat(t.data.city_code_desc).concat(t.data.area_code_desc).concat(t.data.street_code_desc).concat(t.data.address), 
                            s.area_code = t.data.area_code, s.getPriceArea(t.data.area_code);
                        });
                    }), this.getTerminalUserTemplates();
                },
                onUnload: function() {
                    t.$off("choose_address"), this.showLogin = !1;
                },
                onShareAppMessage: function() {
                    return {
                        title: "手机点一点，废品上门收",
                        path: "/pages/index/index",
                        imageUrl: "http://files.pay.dianjishenghuo.cn/mrys_share_to_friends.jpg"
                    };
                },
                onShareTimeline: function() {
                    return {
                        title: "手机点一点，废品上门收",
                        query: "",
                        imageUrl: ""
                    };
                },
                methods: {
                    onLoginSuccess: function(t) {
                        var e = this;
                        t.code == this.$configs.httpSuccessStatus && this.$openHelper.getPosition(s.globalData.position).then(function(t) {
                            t.code == e.$configs.httpSuccessStatus && (e.area_code = t.data.area_id), e.getUserDefAddress();
                        }).catch(function(t) {
                            e.getUserDefAddress();
                        });
                    },
                    loadPageData: function() {
                        this.userStatus = 2, this.getCategory(), this.chooseWeigh(), this.chooseTime();
                    },
                    getUserDefAddress: function() {
                        var t = this;
                        this.$http.get("/terminalUser/addres/defaultAddress").then(function(e) {
                            e.code == t.$configs.httpSuccessStatus && e.data && (t.terminal_user_address_id = e.data.id, 
                            t.area_code = e.data.area_code, t.chose_address = "".concat(e.data.province_code_desc).concat(e.data.city_code_desc).concat(e.data.area_code_desc).concat(e.data.street_code_desc).concat(e.data.address)), 
                            t.loadPageData();
                        }).catch(function() {
                            t.loadPageData();
                        });
                    },
                    getCategory: function() {
                        var t = this;
                        this.$tips.loading();
                        var e = this;
                        this.$http.get("/recovery/category/public/getRecoveryCategory?recovery_category_id=0").then(function(s) {
                            t.$tips.loaded(), t.firstCategorys = s.data, t.recovery_category_id && 0 != t.recovery_category_id || (console.log(t.recovery_category_id), 
                            t.recovery_category_id = t.firstCategorys[0].id, t.recovery_category_name = t.firstCategorys[0].value), 
                            t.getPriceArea(t.area_code), t.firstCategorys.forEach(function(t, s) {
                                t.id != e.recovery_category_id || (e.setDefCategoryValue = [ s ]);
                            });
                        }).catch(function(e) {
                            t.$tips.loaded(), t.$tips.toast(e.message || "网络异常"), console.log("异常", e);
                        });
                    },
                    chooseWeigh: function() {
                        var t = this;
                        this.$tips.loading(), this.$http.get("/sys/constant/public/getConstantWeight").then(function(e) {
                            t.$tips.loaded(), e.code == t.$configs.httpSuccessStatus && (t.goodWeight = e.data, 
                            t.selectWeight = t.goodWeight[0]);
                        }).catch(function(e) {
                            t.$tips.loaded(), t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    chooseTime: function() {
                        var t = this;
                        this.$tips.loading(), this.$http.get("/terminal/dateTime/public/select").then(function(e) {
                            t.$tips.loaded(), e.code == t.$configs.httpSuccessStatus && (t.time_area = e.data, 
                            t.hours = t.time_area[0].hours, t.select_day_str = t.time_area[0].day_str, t.select_hour_str = t.hours[0].hour_str);
                        }).catch(function(e) {
                            t.$tips.loaded(), t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    getPriceArea: function(t) {
                        var e = this;
                        if (!t) return this.showPrice = !1, this.noPriceMsg = "选择地址后可获得价格", void (this.noPriceMsgCanToAddress = !0);
                        this.$http.get("/recovery/category/public/priceRange?recovery_category_id=" + this.recovery_category_id + "&ad_code=" + t + "&admin_key=" + this.$configs.adminKey).then(function(t) {
                            t.code == e.$configs.httpSuccessStatus ? (e.price_areas = t.data, e.showPrice = !0) : (e.showPrice = !1, 
                            e.noPriceMsg = t.message, e.noPriceMsgCanToAddress = !1, e.$tips.toast(t.message));
                        }).catch(function(t) {
                            e.$tips.toast(t.message);
                        });
                    },
                    getPriceList: function(t) {
                        var e = this;
                        this.$http.get("/recovery/category/public/recoveryCategoryPriceList?recovery_category_id=" + this.recovery_category_id + "&ad_code=" + t + "&admin_key=" + this.$configs.adminKey).then(function(t) {
                            t.code == e.$configs.httpSuccessStatus && (e.lookPriceLists = t.data);
                        }).catch(function(t) {
                            e.$tips.toast(t.message), console.log("失败", t);
                        });
                    },
                    showPriceProp: function() {
                        this.getPriceList(this.area_code), this.$refs.popup.open();
                    },
                    noPriceClick: function() {
                        this.noPriceMsgCanToAddress && this.chooseAddress();
                    },
                    toChooseTime: function() {
                        this.timeShow = !0, this.$refs.slelctTime.open();
                    },
                    slelctTime_true_btn_confirm: function() {
                        "" == this.select_hour_str && (this.select_day_str = this.time_area[0].day_str, 
                        this.select_hour_str = this.hours[0].hour_str, this.setDefTimeValue = [ 0, 0 ]), 
                        this.$refs.slelctTime.close(), this.timeShow = !1;
                    },
                    timeCancel: function() {
                        this.select_day_str = "", this.select_hour_str = "", this.$refs.slelctTime.close(), 
                        this.timeShow = !1;
                    },
                    timeOptionChange: function(t) {
                        var e = t.detail.value;
                        this.setDefTimeValue = e, this.hours = this.time_area[e[0]].hours, this.select_day_str = this.time_area[e[0]].day_str, 
                        null == this.hours[e[1]] ? this.select_hour_str = "" : this.select_hour_str = this.hours[e[1]].hour_str;
                    },
                    toSlelctCategory: function() {
                        this.categoryShow = !0, this.$refs.slelctCategory.open();
                    },
                    categoryOk: function() {
                        var t = this.setDefCategoryValue;
                        this.recovery_category_id = this.firstCategorys[t[0]].id, this.recovery_category_name = this.firstCategorys[t[0]].value, 
                        this.getPriceArea(this.area_code), this.$refs.slelctCategory.close(), this.categoryShow = !1;
                    },
                    categoryCancel: function() {
                        this.$refs.slelctCategory.close(), this.categoryShow = !1;
                    },
                    categoryOptionChange: function(t) {
                        var e = t.detail.value;
                        this.setDefCategoryValue = e;
                    },
                    toSlelctWeight: function() {
                        this.weightShow = !0, this.$refs.slelctWeight.open();
                    },
                    weightOk: function() {
                        this.$refs.slelctWeight.close(), this.weightShow = !1;
                    },
                    weightCancel: function() {
                        this.$refs.slelctWeight.close(), this.weightShow = !1;
                    },
                    weightOptionChange: function(t) {
                        var e = t.detail.value;
                        this.setDefWeightValue = e, this.selectWeight = this.goodWeight[e[0]];
                    },
                    chooseAddress: function() {
                        t.navigateTo({
                            url: "../../mine/manageAddress/manageAddress?chooses=2"
                        });
                    },
                    getTerminalUserTemplates: function() {
                        var t = this, e = this;
                        this.$http.get("/sys/constant/public/getTerminalUserTemplates").then(function(s) {
                            s.code == t.$configs.httpSuccessStatus && s.data.forEach(function(t) {
                                e.tmplIds.push(t.template_id);
                            });
                        }).catch(function(e) {
                            t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    pushAuthor: function() {
                        var e = this;
                        t.requestSubscribeMessage({
                            tmplIds: e.tmplIds,
                            success: function(t) {
                                e.orderRecovery();
                            },
                            fail: function(t) {
                                e.orderRecovery(), console.log(t);
                            }
                        });
                    },
                    orderRecovery: function() {
                        var e = this;
                        if (0 == this.recovery_category_id || !this.recovery_category_id) return this.$tips.toast("请填写回收分类");
                        if (!this.selectWeight || "请选择重量范围" == this.selectWeight) return this.$tips.toast("请填写回收的重量");
                        if ("" == this.terminal_user_address_id) return this.$tips.toast("请选择回收地址");
                        if ("" == this.select_day_str || "" == this.select_hour_str) return this.$tips.toast("请选择预约时间");
                        var s = [];
                        this.upImg1.url && s.push(this.upImg1.url), this.upImg2.url && s.push(this.upImg2.url), 
                        this.upImg3.url && s.push(this.upImg3.url), this.upImg4.url && s.push(this.upImg4.url);
                        var o = {
                            day_str: this.select_day_str,
                            hour_str: this.select_hour_str,
                            weight_remark: this.selectWeight,
                            message: this.message,
                            recovery_category_id: this.recovery_category_id,
                            terminal_user_address_id: this.terminal_user_address_id,
                            photos: s
                        };
                        this.$tips.loading(), this.$http.post("/terminal/user/addOrder", o).then(function(s) {
                            if (e.$tips.loaded(), s.code == e.$configs.httpSuccessStatus) {
                                e.$tips.toast("预约成功");
                                var o = s.data;
                                t.reLaunch({
                                    url: "../../order/details/details?orderId=" + o
                                });
                            } else e.$tips.toast(s.message), console.log("photo", e.upImg1.url, e.upImg2.url, e.upImg3.url, e.upImg4.url);
                        }).catch(function(t) {
                            e.$tips.loaded(), e.$tips.toast(t.message), console.log("失败", t);
                        });
                    },
                    chooseImage: function(e) {
                        var s = this;
                        t.chooseImage({
                            cout: 1,
                            success: function(t) {
                                s.$http.get("/terminal/file/getUploadAuth").then(function(o) {
                                    var i = new Date().getTime() + Math.round(100 * Math.random());
                                    s.$http.upload(s.$configs.fileUploadHost, {
                                        filePath: t.tempFilePaths[0],
                                        name: "file",
                                        formData: {
                                            key: i,
                                            token: o.data
                                        }
                                    }).then(function(t) {
                                        s[e].show = !1, s[e].url = s.$configs.fileDownLoadHost + t.key;
                                    }).catch(function(t) {
                                        Promise.reject(t);
                                    });
                                }).catch(function() {
                                    s.$tips.toast("上传失败，稍后再试");
                                });
                            },
                            fail: function(t) {}
                        });
                    }
                }
            };
            e.default = o;
        }).call(this, s("543d").default);
    },
    3554: function(t, e, s) {},
    3821: function(t, e, s) {
        s.d(e, "b", function() {
            return i;
        }), s.d(e, "c", function() {
            return a;
        }), s.d(e, "a", function() {
            return o;
        });
        var o = {
            uniPopup: function() {
                return Promise.all([ s.e("common/vendor"), s.e("components/uni-popup/uni-popup") ]).then(s.bind(null, "8575"));
            }
        }, i = function() {
            var t = this;
            t.$createElement;
            t._self._c, t._isMounted || (t.e0 = function(e) {
                t.show_more = !t.show_more;
            }, t.e1 = function(t) {
                return this.$refs.popup.close();
            });
        }, a = [];
    },
    "44e8": function(t, e, s) {
        var o = s("3554");
        s.n(o).a;
    },
    "793d": function(t, e, s) {
        s.r(e);
        var o = s("3821"), i = s("fc39");
        for (var a in i) "default" !== a && function(t) {
            s.d(e, t, function() {
                return i[t];
            });
        }(a);
        s("44e8");
        var r = s("f0c5"), c = Object(r.a)(i.default, o.b, o.c, !1, null, null, null, !1, o.a, void 0);
        e.default = c.exports;
    },
    8649: function(t, e, s) {
        (function(t) {
            function e(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            s("b544"), e(s("66fd")), t(e(s("793d")).default);
        }).call(this, s("543d").createPage);
    },
    fc39: function(t, e, s) {
        s.r(e);
        var o = s("18f6"), i = s.n(o);
        for (var a in o) "default" !== a && function(t) {
            s.d(e, t, function() {
                return o[t];
            });
        }(a);
        e.default = i.a;
    }
}, [ [ "8649", "common/runtime", "common/vendor" ] ] ]);