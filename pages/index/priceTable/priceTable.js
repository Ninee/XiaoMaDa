(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/index/priceTable/priceTable" ], {
    1212: function(t, e, i) {
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = getApp(), o = {
                data: function() {
                    return {
                        ad_code: "",
                        lookPriceLists: [],
                        lookPriceListSon: [],
                        category_price_range: "",
                        content_title: "",
                        from_firstPage_category_id: "",
                        from_firstPage_category_title: "",
                        navHeight: 0,
                        unit_name: "",
                        unit_symbol: "",
                        unit_option_list: [],
                        min_weight: "",
                        max_weight: "",
                        price_area: {
                            min: "0",
                            max: "0"
                        },
                        total_price: {
                            min: "0",
                            max: "0"
                        },
                        order_items: [],
                        recovery_category_id: "",
                        recovery_category_img: "",
                        recovery_category_name: "",
                        photos: [],
                        is_show_car: !1,
                        msgs: [],
                        activity: [],
                        lat: "",
                        lng: "",
                        is_show_active: !1,
                        img_float: {},
                        animation: {},
                        animationData: {}
                    };
                },
                onLoad: function() {
                    var e = this;
                    t.getSystemInfo({
                        success: function(t) {
                            e.navHeight = t.statusBarHeight;
                        }
                    }), this.animation = t.createAnimation({
                        transformOrigin: "50% 50%",
                        duration: 400,
                        timingFunction: "linear",
                        delay: 0
                    });
                },
                onShow: function() {
                    var e = this;
                    this.is_show_car = !1, this.is_show_active = !0, this.clearOrderItems();
                    var o = this;
                    this.getPositionAndAuth().then(function(t) {
                        i.globalData.toPriceTabParms && i.globalData.toPriceTabParms.category_id ? (o.from_firstPage_category_id = i.globalData.toPriceTabParms.category_id, 
                        o.from_firstPage_category_title = i.globalData.toPriceTabParms.category_title, o.recovery_category_img = i.globalData.toPriceTabParms.recovery_category_img) : (o.from_firstPage_category_id = "", 
                        o.from_firstPage_category_title = "", o.recovery_category_img = ""), o.getPriceList(), 
                        e.$authHelper.isLogin() && (e.activeTaskList(), e.activeTaskNotList());
                    }).catch(function(e) {
                        t.switchTab({
                            url: "../index"
                        });
                    }), t.hideTabBar({
                        animation: !1
                    });
                    var a = 0;
                    this.img_float = setInterval(function() {
                        0 == a ? (e.animation.top("-20rpx").step(), e.animationData = e.animation.export(), 
                        a = 20) : (e.animation.top("0rpx").step(), e.animationData = e.animation.export(), 
                        a = 0);
                    }, 500);
                },
                onHide: function() {
                    t.showTabBar({
                        animation: !1
                    }), clearInterval(this.img_float);
                },
                computed: {
                    list_height: function() {
                        return 0 == this.msgs.length ? "140rpx" : "200rpx";
                    }
                },
                methods: {
                    getPriceList: function() {
                        var t = this;
                        this.$tips.loading(), this.$http.get("/recovery/category/public/v2/recoveryCategoryPriceList?ad_code=" + this.ad_code + "&admin_key=" + this.$configs.adminKey).then(function(e) {
                            t.$tips.loaded(), e.code == t.$configs.httpSuccessStatus && (t.lookPriceLists = e.data, 
                            t.lookPriceLists.forEach(function(t) {
                                t.child_titles.length > 0 && (t.child_titles = JSON.parse(t.child_titles));
                            }), t.from_firstPage_category_id ? (t.recovery_category_id = t.from_firstPage_category_id, 
                            t.content_title = t.from_firstPage_category_title) : (t.recovery_category_id = t.lookPriceLists[0].id, 
                            t.content_title = t.lookPriceLists[0].title, t.recovery_category_img = t.lookPriceLists[0].logo_url), 
                            t.category_price_range = t.lookPriceLists[0].price_range, t.getPriceListSon());
                        }).catch(function(e) {
                            t.$tips.loaded(), t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    getPriceListSon: function() {
                        var t = this;
                        this.lookPriceListSon = [], this.$http.get("/recovery/category/public/v3/recoveryV3CategoryPriceList?ad_code=" + this.ad_code + "&admin_key=" + this.$configs.adminKey + "&recovery_category_id=" + this.recovery_category_id + "&recovery_category_name=" + this.recovery_category_name).then(function(e) {
                            if (e.code == t.$configs.httpSuccessStatus && (t.lookPriceListSon = e.data, t.lookPriceListSon.length > 0)) {
                                var i = [], o = [];
                                t.lookPriceListSon.forEach(function(t) {
                                    t.slogan = JSON.parse(t.slogan), -1 != t.price ? i.push(t) : o.push(t);
                                }), t.lookPriceListSon = [], t.lookPriceListSon = i.concat(o);
                            }
                        }).catch(function(e) {
                            t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    getRecoveryCategoryUnit: function() {
                        var t = this;
                        return this.unit_symbol = "", new Promise(function(e, i) {
                            t.$http.get("/recovery/category/public/v3/getRecoveryCategoryUnit?admin_key=" + t.$configs.adminKey + "&ad_code=" + t.ad_code + "&recovery_category_id=" + t.recovery_category_id).then(function(i) {
                                i.code == t.$configs.httpSuccessStatus ? (t.unit_name = i.data.unit_name, t.unit_symbol = i.data.unit_symbol, 
                                t.unit_option_list = i.data.unit_option_list, t.unit_option_list.length > 0 && (t.min_weight = i.data.unit_option_list[0].min, 
                                t.max_weight = i.data.unit_option_list[0].max)) : t.$tips.toast(i.message), e(i);
                            }).catch(function(e) {
                                rejcet(e), t.$tips.toast(e.message || "网络异常"), console.log("异常", e);
                            });
                        });
                    },
                    getEstimatedPrice: function() {
                        var t = this;
                        return new Promise(function(e, i) {
                            t.$http.get("/recovery/category/public/v3/getEstimatedPrice?min=" + t.min_weight + "&max=" + t.max_weight + "&ad_code=" + t.ad_code + "&recovery_category_id=" + t.recovery_category_id).then(function(i) {
                                if (i.code == t.$configs.httpSuccessStatus) {
                                    var o = i.data;
                                    o = o.split("-"), t.price_area.min = o[0], t.price_area.max = o[1], e(i);
                                } else t.$tips.toast(i.message);
                            }).catch(function(e) {
                                i(e), t.$tips.toast(e.message || "网络异常"), console.log("异常", e);
                            });
                        });
                    },
                    activeTaskList: function() {
                        var t = this;
                        this.$http.get("/terminal/task/activeTaskList?ad_code=" + this.ad_code + "&admin_key=" + this.$configs.adminKey + "&lat=" + this.lat + "&lng=" + this.lng + "&is_list=1").then(function(e) {
                            e.code == t.$configs.httpSuccessStatus && e.data ? t.msgs = e.data : t.$tips.toast(e.message);
                        }).catch(function(e) {
                            t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    activeTaskNotList: function() {
                        var t = this;
                        this.$http.get("/terminal/task/activeTaskList?ad_code=" + this.ad_code + "&admin_key=" + this.$configs.adminKey + "&lat=" + this.lat + "&lng=" + this.lng + "&is_list=0").then(function(e) {
                            e.code == t.$configs.httpSuccessStatus && e.data ? t.activity = e.data : t.$tips.toast(e.message);
                        }).catch(function(e) {
                            t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    playOrderImg: function() {
                        this.is_show_car = !this.is_show_car, this.is_show_car ? this.is_show_active = !1 : this.is_show_active = !0;
                    },
                    toSelWeightArea: function(t, e) {
                        this.min_weight = t, this.max_weight = e;
                    },
                    showSon: function(t) {
                        t.id != this.recovery_category_id && (this.recovery_category_id = t.id, this.content_title = t.title, 
                        this.category_price_range = t.price_range, this.recovery_category_img = t.logo_url, 
                        this.lookPriceListSon = [], this.getPriceListSon());
                    },
                    sel_weight: function() {
                        var t = this;
                        this.$authHelper.login().then(function(e) {
                            e.code == t.$configs.httpSuccessStatus && t.getRecoveryCategoryUnit().then(function(e) {
                                t.$refs.selWeightPopup.open();
                            });
                        });
                    },
                    toAddCar: function() {
                        var t = this;
                        this.getEstimatedPrice().then(function() {
                            var e = t;
                            t.order_items.forEach(function(i, o) {
                                if (i.recovery_category_id == t.recovery_category_id) {
                                    var a = {
                                        min: i.min,
                                        max: i.max
                                    };
                                    e.delAllNum(a), e.order_items.splice(o, 1);
                                }
                            });
                            var i = {};
                            i.recovery_category_id = t.recovery_category_id, i.name = t.content_title, i.min = t.price_area.min, 
                            i.max = t.price_area.max, i.imgs = t.recovery_category_img, 0 == t.min_weight ? i.weight = t.max_weight + t.unit_symbol + "以上" : i.weight = t.min_weight + t.unit_symbol + "-" + t.max_weight + t.unit_symbol, 
                            i.price_area, i.price_remark = "".concat(t.price_area.min, "-").concat(t.price_area.max, "元"), 
                            i.weight_remark = t.min_weight + "-" + t.max_weight + t.unit_symbol, i.unit_symbol = t.unit_symbol, 
                            t.photos.push(t.recovery_category_img), t.order_items.push(i), t.addAllNum(), t.$refs.selWeightPopup.close();
                        });
                    },
                    addAllNum: function() {
                        var t = this.price_area, e = 0, i = 0;
                        e = parseFloat(this.total_price.min) + parseFloat(t.min), i = parseFloat(this.total_price.max) + parseFloat(t.max), 
                        e += "", i += "", this.total_price.min = this.saveFloat(e), this.total_price.max = this.saveFloat(i);
                    },
                    delAllNum: function(t) {
                        var e = 0, i = 0;
                        e = parseFloat(this.total_price.min) - parseFloat(t.min), i = parseFloat(this.total_price.max) - parseFloat(t.max), 
                        e += "", i += "", this.total_price.min = this.saveFloat(e), this.total_price.max = this.saveFloat(i);
                    },
                    saveFloat: function(t) {
                        return t.split(".")[1] ? 1 == t.split(".")[1].length && (t += "0") : t += ".00", 
                        t;
                    },
                    clearOrderItems: function() {
                        this.order_items = [], this.photos = [], this.is_show_car = !1, this.is_show_active = !0, 
                        this.total_price = {
                            min: "0",
                            max: "0"
                        };
                    },
                    toDeleteOrderItems: function(t) {
                        var e = this;
                        this.order_items.forEach(function(i, o) {
                            i.recovery_category_id == t.recovery_category_id && (e.delAllNum(t), e.order_items.splice(o, 1));
                        }), 0 == e.order_items.length ? (this.is_show_car = !1, this.is_show_active = !0) : this.is_show_active = !1;
                    },
                    toPlayOrder: function() {
                        0 != this.order_items.length ? (i.globalData.pay_order_info = this.order_items, 
                        i.globalData.total_price = this.total_price, t.navigateTo({
                            url: "../writeOrderInfo/writeOrderInfo"
                        })) : this.$tips.toast("请先添加物品");
                    },
                    goBack: function() {
                        t.switchTab({
                            url: "../index"
                        });
                    },
                    getPositionAndAuth: function() {
                        var e = this, i = this;
                        return new Promise(function(o, a) {
                            e.$openHelper.getPosition().then(function(t) {
                                t.code == e.$configs.httpSuccessStatus && (i.ad_code = t.data.area_id, i.lng = t.data.lng, 
                                i.lat = t.data.lat, o(t.data));
                            }).catch(function(e) {
                                t.showModal({
                                    content: "检测到您没有打开每日一收的地理位置权限，是否去设置打开？",
                                    success: function(e) {
                                        e.confirm ? t.openSetting({
                                            success: function(t) {
                                                t.authSetting["scope.userLocation"] && i.getPositionAndAuth();
                                            }
                                        }) : e.cancel && a({
                                            cancel: "用户点击取消"
                                        });
                                    }
                                });
                            });
                        });
                    },
                    toGiftsPage: function() {
                        var e = this;
                        this.$authHelper.login().then(function(i) {
                            i.code == e.$configs.httpSuccessStatus && e.getShareSwitch().then(function(i) {
                                1 == i.data ? t.navigateTo({
                                    url: "../../task/task?ad_code=" + e.ad_code + "&lat=" + e.lat + "&lng=" + e.lng
                                }) : e.$tips.toast("当前区域暂未开放!");
                            });
                        });
                    },
                    getShareSwitch: function() {
                        var t = this;
                        return new Promise(function(e, i) {
                            t.$http.get("/terminal/user/v2/getShareSwitch?ad_code=" + t.ad_code + "&admin_key=" + t.$configs.adminKey + "&lat=" + t.lat + "&lng=" + t.lng).then(function(t) {
                                e(t);
                            }).catch(function(e) {
                                reject(e), t.$tips.toast(e.message || "网络异常"), console.log("异常", e);
                            });
                        });
                    }
                }
            };
            e.default = o;
        }).call(this, i("543d").default);
    },
    3834: function(t, e, i) {
        i.d(e, "b", function() {
            return a;
        }), i.d(e, "c", function() {
            return n;
        }), i.d(e, "a", function() {
            return o;
        });
        var o = {
            uniPopup: function() {
                return Promise.all([ i.e("common/vendor"), i.e("components/uni-popup/uni-popup") ]).then(i.bind(null, "8575"));
            }
        }, a = function() {
            var t = this;
            t.$createElement;
            t._self._c, t._isMounted || (t.e0 = function(t) {
                t.stopPropagation(), t.preventDefault();
            }, t.e1 = function(e) {
                return t.$refs.selWeightPopup.close();
            });
        }, n = [];
    },
    "4b46": function(t, e, i) {
        (function(t) {
            function e(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            i("b544"), e(i("66fd")), t(e(i("e46f")).default);
        }).call(this, i("543d").createPage);
    },
    "8ab1": function(t, e, i) {},
    c3ae: function(t, e, i) {
        var o = i("8ab1");
        i.n(o).a;
    },
    e46f: function(t, e, i) {
        i.r(e);
        var o = i("3834"), a = i("f7eb");
        for (var n in a) "default" !== n && function(t) {
            i.d(e, t, function() {
                return a[t];
            });
        }(n);
        i("c3ae");
        var s = i("f0c5"), r = Object(s.a)(a.default, o.b, o.c, !1, null, null, null, !1, o.a, void 0);
        e.default = r.exports;
    },
    f7eb: function(t, e, i) {
        i.r(e);
        var o = i("1212"), a = i.n(o);
        for (var n in o) "default" !== n && function(t) {
            i.d(e, t, function() {
                return o[t];
            });
        }(n);
        e.default = a.a;
    }
}, [ [ "4b46", "common/runtime", "common/vendor" ] ] ]);