(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/index/writeOrderInfo/writeOrderInfo" ], {
    "4d03": function(e, t, i) {
        i.d(t, "b", function() {
            return s;
        }), i.d(t, "c", function() {
            return o;
        }), i.d(t, "a", function() {
            return a;
        });
        var a = {
            uniPopup: function() {
                return Promise.all([ i.e("common/vendor"), i.e("components/uni-popup/uni-popup") ]).then(i.bind(null, "8575"));
            }
        }, s = function() {
            var e = this;
            e.$createElement;
            e._self._c, e._isMounted || (e.e0 = function(t) {
                t.stopPropagation(), e.is_show_phone = !e.is_show_phone;
            }, e.e1 = function(t) {
                t.stopPropagation(), e.is_show_phone = !e.is_show_phone;
            }, e.e2 = function(t) {
                e.is_agree_agreement = !e.is_agree_agreement;
            }, e.e3 = function(e) {
                e.stopPropagation(), e.preventDefault();
            }, e.e4 = function(e) {
                e.stopPropagation(), e.preventDefault();
            });
        }, o = [];
    },
    "561f": function(e, t, i) {
        var a = i("8057");
        i.n(a).a;
    },
    "77e3": function(e, t, i) {
        (function(e) {
            function t(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            i("b544"), t(i("66fd")), e(t(i("a312")).default);
        }).call(this, i("543d").createPage);
    },
    8057: function(e, t, i) {},
    a312: function(e, t, i) {
        i.r(t);
        var a = i("4d03"), s = i("af37");
        for (var o in s) "default" !== o && function(e) {
            i.d(t, e, function() {
                return s[e];
            });
        }(o);
        i("561f");
        var r = i("f0c5"), n = Object(r.a)(s.default, a.b, a.c, !1, null, null, null, !1, a.a, void 0);
        t.default = n.exports;
    },
    a90c: function(e, t, i) {
        (function(e) {
            function i(e) {
                return r(e) || o(e) || s(e) || a();
            }
            function a() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function s(e, t) {
                if (e) {
                    if ("string" == typeof e) return n(e, t);
                    var i = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === i && e.constructor && (i = e.constructor.name), "Map" === i || "Set" === i ? Array.from(e) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? n(e, t) : void 0;
                }
            }
            function o(e) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
            }
            function r(e) {
                if (Array.isArray(e)) return n(e);
            }
            function n(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var i = 0, a = new Array(t); i < t; i++) a[i] = e[i];
                return a;
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var c = getApp(), d = {
                data: function() {
                    return {
                        is_default: 0,
                        latitude: "",
                        longtiude: "",
                        user_name: "",
                        user_phone_num: "",
                        poi_address: "",
                        choose_addr: "",
                        address: "",
                        sex: "1",
                        terminal_user_address_id: "",
                        ad_code: "",
                        time_area: [],
                        now_play_order_housr: [],
                        select_day_str: "",
                        select_hour_str: "",
                        is_show_phone: !1,
                        privacy_number: "",
                        first_recovery_name: [],
                        recovery_category_id: "",
                        recovery_category_img: "",
                        recovery_category_name: "",
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
                        is_agree_agreement: !0,
                        leave_msg: "",
                        tmplIds: [],
                        activities: [],
                        img_float: {},
                        animation: {},
                        animationData: {}
                    };
                },
                onLoad: function(t) {
                    var i = this;
                    this.animation = e.createAnimation({
                        transformOrigin: "50% 50%",
                        duration: 400,
                        timingFunction: "linear",
                        delay: 0
                    });
                    var a = this, s = c.globalData.playOrderAddress;
                    if (s && s.area_code && (a.address = s.address, a.is_default = s.is_default, a.latitude = s.lat, 
                    a.longtiude = s.lng, a.user_name = s.name, a.user_phone_num = s.phone, a.sex = s.sex, 
                    a.poi_address = s.poi_address, a.choose_addr = s.poi_name, a.terminal_user_address_id = s.id, 
                    a.ad_code = s.area_code, a.toHiddePhone(a.user_phone_num), a.chooseTime()), c.globalData.fromIndexCategoryId && c.globalData.fromIndexCategoryId.id) a.getMenuList(a.ad_code).then(function(e) {
                        e.code == i.$configs.httpSuccessStatus && (e.data.forEach(function(e, t) {
                            e.id == c.globalData.fromIndexCategoryId.id && (a.recovery_category_id = e.id, a.recovery_category_img = e.data, 
                            a.recovery_category_name = e.value);
                        }), a.getRecoveryCategoryUnit(a.ad_code).then(function(e) {
                            e.code == i.$configs.httpSuccessStatus ? a.getEstimatedPrice().then(function(e) {
                                a.toAddCar();
                            }) : "300002" === e.code && (a.recovery_category_id = a.first_recovery_name[0].id, 
                            a.getRecoveryCategoryUnit(a.ad_code).then(function(e) {
                                a.getEstimatedPrice();
                            }));
                        }).catch(function(e) {}));
                    }); else if (c.globalData.pay_order_info && c.globalData.pay_order_info.length > 0) {
                        var o = c.globalData.pay_order_info;
                        this.order_items = o, this.total_price = c.globalData.total_price, c.globalData.pay_order_info = [], 
                        c.globalData.total_price = "", this.getUserDefAddress().then(function(e) {
                            e.data && (a.chooseTime(), a.getMenuList(a.ad_code).then(function(e) {
                                a.getRecoveryCategoryUnit(a.ad_code).then(function(e) {
                                    e.code == i.$configs.httpSuccessStatus && a.getEstimatedPrice();
                                });
                            }));
                        });
                    } else a.getMenuList(a.ad_code).then(function(e) {
                        a.getRecoveryCategoryUnit(a.ad_code).then(function(e) {
                            e.code == i.$configs.httpSuccessStatus && a.getEstimatedPrice();
                        });
                    });
                    c.globalData.playOrderAddress = {}, this.getTerminalUserTemplates();
                },
                onShow: function() {
                    var t = this, i = this;
                    e.$on("hasAddr", function(e) {
                        var t = this;
                        i.address = e.address, i.is_default = e.is_default, i.latitude = e.lat, i.longtiude = e.lng, 
                        i.user_name = e.name, i.user_phone_num = e.phone, i.sex = e.sex, i.poi_address = e.poi_address, 
                        i.choose_addr = e.poi_name, i.terminal_user_address_id = e.id, i.ad_code = e.area_code, 
                        i.toHiddePhone(i.user_phone_num), i.chooseTime(), i.getMenuList(i.ad_code).then(function(e) {
                            e.code == t.$configs.httpSuccessStatus ? (i.order_items.length > 0 && i.order_items.forEach(function(e, t) {
                                i.first_recovery_name.forEach(function(t) {
                                    e.recovery_category_id == t.id && 0 == t.is_on && i.toDeleteOrderItems(e);
                                });
                            }), i.getRecoveryCategoryUnit(i.ad_code).then(function(e) {
                                i.getEstimatedPrice();
                            })) : "300002" == e.code && (i.order_items = []);
                        }), i.$authHelper.isLogin() && i.ad_code && i.latitude && i.longtiude && i.activeTaskList();
                    }), this.$authHelper.isLogin() && this.ad_code && this.latitude && this.longtiude && this.activeTaskList(), 
                    e.$on("leaveMsg", function(e) {
                        i.leave_msg = e.trim();
                    });
                    var a = 0;
                    this.img_float = setInterval(function() {
                        0 == a ? (t.animation.top("-20rpx").step(), t.animationData = t.animation.export(), 
                        a = 20) : (t.animation.top("0rpx").step(), t.animationData = t.animation.export(), 
                        a = 0);
                    }, 500);
                },
                onHide: function() {
                    e.$off("hasAddr"), clearInterval(this.img_float);
                },
                onUnload: function() {
                    e.$off("leaveMsg");
                },
                methods: {
                    getUserDefAddress: function() {
                        var e = this;
                        return new Promise(function(t, i) {
                            e.$tips.loading(), e.$http.get("/terminalUser/addres/v2/defaultAddress").then(function(i) {
                                e.$tips.loaded(), i.code == e.$configs.httpSuccessStatus && i.data ? (e.is_default = 1, 
                                e.address = i.data.address, e.latitude = i.data.lat, e.longtiude = i.data.lng, e.user_name = i.data.name, 
                                e.user_phone_num = i.data.phone, e.poi_address = i.data.poi_address, e.choose_addr = i.data.poi_name, 
                                e.terminal_user_address_id = i.data.id, e.ad_code = i.data.area_code, e.toHiddePhone(e.user_phone_num)) : e.is_default = 0, 
                                t(i);
                            }).catch(function(t) {
                                i(t), e.$tips.loaded(), e.$tips.toast(t.message), console.log("失败", t);
                            });
                        });
                    },
                    chooseTime: function() {
                        var e = this;
                        this.$tips.loading(), this.$http.get("/terminal/dateTime/public/v3/select?ad_code=" + this.ad_code + "&admin_key=" + this.$configs.adminKey + "&lat=" + this.latitude + "&lng=" + this.longtiude).then(function(t) {
                            if (e.$tips.loaded(), t.code == e.$configs.httpSuccessStatus) {
                                e.time_area = t.data, e.time_area[0].date = "今天", e.time_area[1].date = "明天", e.time_area[2].date = "后天", 
                                e.time_area.forEach(function(e, t) {
                                    t > 2 && (e.date = e.day_str.slice(5));
                                    var i = !1;
                                    e.hours && e.hours.length > 0 && (e.hours.forEach(function(e) {
                                        e.is_on && (i = !0);
                                    }), e.is_working = i);
                                });
                                var i = [];
                                e.time_area.forEach(function(e, t) {
                                    e.is_working && i.push(e);
                                }), e.time_area = i, e.toSelDay(e.time_area[0].day_str, e.time_area[0].hours);
                            }
                        }).catch(function(t) {
                            e.$tips.loaded(), e.$tips.toast(t.message), console.log("失败", t);
                        });
                    },
                    getMenuList: function(e) {
                        var t = this;
                        return new Promise(function(i, a) {
                            t.$http.get("/recovery/category/public/v3/getRecoveryCategory?admin_key=" + t.$configs.adminKey + "&ad_code=" + e).then(function(e) {
                                e.code == t.$configs.httpSuccessStatus ? (t.first_recovery_name = e.data, t.recovery_category_id = e.data[0].id, 
                                t.recovery_category_img = e.data[0].data, t.recovery_category_name = e.data[0].value) : t.$tips.toast(e.message), 
                                i(e);
                            }).catch(function(e) {
                                a(e), t.$tips.toast(e.message || "网络异常"), console.log("异常", e);
                            });
                        });
                    },
                    getRecoveryCategoryUnit: function() {
                        var e = this;
                        return new Promise(function(t, i) {
                            e.$http.get("/recovery/category/public/v3/getRecoveryCategoryUnit?admin_key=" + e.$configs.adminKey + "&ad_code=" + e.ad_code + "&recovery_category_id=" + e.recovery_category_id).then(function(i) {
                                i.code == e.$configs.httpSuccessStatus ? (e.unit_name = i.data.unit_name, e.unit_symbol = i.data.unit_symbol, 
                                e.unit_option_list = i.data.unit_option_list, e.min_weight = i.data.unit_option_list[0].min, 
                                e.max_weight = i.data.unit_option_list[0].max) : e.$tips.toast(i.message), t(i);
                            }).catch(function(t) {
                                rejcet(t), e.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                            });
                        });
                    },
                    getEstimatedPrice: function() {
                        var e = this;
                        return new Promise(function(t, i) {
                            e.$http.get("/recovery/category/public/v3/getEstimatedPrice?min=" + e.min_weight + "&max=" + e.max_weight + "&ad_code=" + e.ad_code + "&recovery_category_id=" + e.recovery_category_id).then(function(i) {
                                if (i.code == e.$configs.httpSuccessStatus) {
                                    var a = i.data;
                                    a = a.split("-"), e.price_area.min = a[0], e.price_area.max = a[1], t(i);
                                } else e.$tips.toast(i.message);
                            }).catch(function(t) {
                                i(t), e.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                            });
                        });
                    },
                    addOrder: function() {
                        var t = this, a = {
                            address: this.address,
                            day_str: this.select_day_str,
                            hour_str: this.select_hour_str,
                            is_default: this.is_default ? 1 : this.is_default,
                            lat: this.latitude,
                            lng: this.longtiude,
                            message: this.leave_msg,
                            name: this.user_name,
                            order_items: this.order_items,
                            phone: this.user_phone_num,
                            photos: [],
                            poi_address: this.poi_address,
                            poi_name: this.choose_addr,
                            sex: this.sex,
                            terminal_user_address_id: this.terminal_user_address_id
                        };
                        this.$http.post("/terminal/user/v3/addOrder", a).then(function(a) {
                            var s = t;
                            if (a.code == t.$configs.httpSuccessStatus) {
                                t.$tips.toast("下单成功");
                                var o = [ "上门回收时，请先电话联系", "物品比较重，需要多人上门", "物品已打包，请尽快上门收" ], r = e.getStorageSync("storage_msg");
                                if (c.globalData.fromIndexCategoryId = {}, t.leave_msg && 4 == (o = new Set([].concat(i(o), [ t.leave_msg ]))).size) if (!r || r && 0 == r.length) e.setStorageSync("storage_msg", [ {
                                    id: "1",
                                    msg: t.leave_msg
                                } ]); else if (r.length > 0 && r.length < 3) {
                                    for (var n = !1, d = 0; d < r.length; d++) r[d].msg == t.leave_msg && (n = !0);
                                    n || (r.unshift({
                                        id: "1",
                                        msg: t.leave_msg
                                    }), e.setStorageSync("storage_msg", r));
                                } else if (r.length = 3) {
                                    for (var _ = !1, u = 0; u < r.length; u++) r[u].msg == t.leave_msg && (_ = !0);
                                    _ || (r.splice(2, 1), r.unshift({
                                        id: "1",
                                        msg: t.leave_msg
                                    }), e.setStorageSync("storage_msg", r));
                                }
                                var l = a.data;
                                e.redirectTo({
                                    url: "../../order/details/details?orderId=" + l
                                });
                            } else if (2222 == a.code) e.showModal({
                                title: "提示",
                                content: a.message,
                                showCancel: !1,
                                success: function(e) {
                                    e.confirm;
                                }
                            }); else if (3333 == a.code) {
                                var h = a.message;
                                h = h.split(":"), s.terminal_user_address_id = h[2], e.showModal({
                                    title: "提示",
                                    content: h[0],
                                    showCancel: !0,
                                    success: function(e) {
                                        e.confirm && s.cancle_order(h[1]).then(function(e) {
                                            s.addOrder();
                                        });
                                    }
                                });
                            } else t.$tips.toast(a.message);
                        }).catch(function(e) {
                            t.$tips.toast(e.message || "网络异常"), console.log("异常", e);
                        });
                    },
                    getTerminalUserTemplates: function() {
                        var e = this, t = this;
                        this.$http.get("/sys/constant/public/getTerminalUserTemplates").then(function(i) {
                            i.code == e.$configs.httpSuccessStatus && i.data.forEach(function(e) {
                                t.tmplIds.push(e.template_id);
                            });
                        }).catch(function(t) {
                            e.$tips.toast(t.message), console.log("失败", t);
                        });
                    },
                    activeTaskList: function() {
                        var e = this;
                        this.$http.get("/terminal/task/activeTaskList?ad_code=" + this.ad_code + "&admin_key=" + this.$configs.adminKey + "&lat=" + this.latitude + "&lng=" + this.longtiude + "&is_list=0").then(function(t) {
                            t.code == e.$configs.httpSuccessStatus && t.data ? e.activities = t.data : e.$tips.toast(t.message);
                        }).catch(function(t) {
                            e.$tips.toast(t.message), console.log("失败", t);
                        });
                    },
                    pushAuthor: function() {
                        if (!this.user_phone_num) return this.$tips.toast("请填写地址");
                        if (this.order_items.length < 1) return this.$tips.toast("请填添加回收物品");
                        if (!this.select_hour_str) return this.$tips.toast("请选择预约时间");
                        if (!this.is_agree_agreement) return this.$tips.toast("请查看并同意用户协议");
                        var t = this;
                        e.requestSubscribeMessage({
                            tmplIds: t.tmplIds,
                            complete: function() {
                                t.addOrder();
                            }
                        });
                    },
                    cancle_order: function(e) {
                        var t = this;
                        return new Promise(function(i, a) {
                            t.$http.post("/terminal/user/cancelOrder", {
                                id: e,
                                reason_of_cancel: ""
                            }).then(function(e) {
                                e.code == t.$configs.httpSuccessStatus && i(e);
                            }).catch(function(e) {
                                a(), t.$tips.toast(e.message), console.log("失败", e);
                            });
                        });
                    },
                    toAddCar: function() {
                        var e = this, t = this;
                        this.order_items.forEach(function(i, a) {
                            if (i.recovery_category_id == e.recovery_category_id) {
                                var s = {
                                    min: i.min,
                                    max: i.max
                                };
                                t.delAllNum(s), t.order_items.splice(a, 1);
                            }
                        });
                        var i = {};
                        i.recovery_category_id = this.recovery_category_id, i.min = this.price_area.min, 
                        i.max = this.price_area.max, i.imgs = this.recovery_category_img, i.name = this.recovery_category_name, 
                        0 == this.min_weight ? i.weight = this.max_weight + this.unit_symbol + "以上" : i.weight = this.min_weight + this.unit_symbol + "-" + this.max_weight + this.unit_symbol, 
                        i.price_remark = "".concat(this.price_area.min, "-").concat(this.price_area.max, "元"), 
                        i.weight_remark = this.min_weight + "-" + this.max_weight + this.unit_symbol, i.unit_symbol = this.unit_symbol, 
                        this.order_items.push(i), this.addAllNum(), this.$refs.addRecoveryType.close();
                    },
                    toDeleteOrderItems: function(e) {
                        var t = this;
                        this.order_items.forEach(function(i, a) {
                            i.recovery_category_id == e.recovery_category_id && (t.delAllNum(e), t.order_items.splice(a, 1));
                        });
                    },
                    clearOrderItems: function() {
                        this.order_items = [], this.total_price = {
                            min: "0",
                            max: "0"
                        };
                    },
                    addAllNum: function() {
                        var e = this.price_area, t = 0, i = 0;
                        t = parseFloat(this.total_price.min) + parseFloat(e.min), i = parseFloat(this.total_price.max) + parseFloat(e.max), 
                        t += "", i += "", this.total_price.min = this.saveFloat(t), this.total_price.max = this.saveFloat(i);
                    },
                    delAllNum: function(e) {
                        var t = 0, i = 0;
                        t = parseFloat(this.total_price.min) - parseFloat(e.min), i = parseFloat(this.total_price.max) - parseFloat(e.max), 
                        t += "", i += "", this.total_price.min = this.saveFloat(t), this.total_price.max = this.saveFloat(i);
                    },
                    saveFloat: function(e) {
                        return e.split(".")[1] ? 1 == e.split(".")[1].length && (e += "0") : e += ".00", 
                        e;
                    },
                    toSelDay: function(e, t) {
                        this.select_day_str = e, this.now_play_order_housr = t, this.select_hour_str = t[0].hour_str;
                    },
                    toSelTimeArea: function(e) {
                        this.select_hour_str = e;
                    },
                    toSelFirstRecovery: function(e, t, i) {
                        var a = this;
                        this.recovery_category_id = e, this.recovery_category_img = t, this.recovery_category_name = i, 
                        this.getRecoveryCategoryUnit().then(function(e) {
                            a.getEstimatedPrice();
                        });
                    },
                    toSelWeightArea: function(e, t) {
                        this.min_weight = e, this.max_weight = t, this.getEstimatedPrice();
                    },
                    toHiddePhone: function(e) {
                        var t = /^(\d{3})\d{4}(\d{4})$/;
                        this.privacy_number = e.replace(t, "$1****$2");
                    },
                    toAdd: function() {
                        return this.first_recovery_name && 0 != this.first_recovery_name.length ? this.user_name ? (this.recovery_category_id = this.first_recovery_name[0].id, 
                        this.min_weight = this.unit_option_list[0].min, this.max_weight = this.unit_option_list[0].max, 
                        this.recovery_category_img = this.first_recovery_name[0].data, this.recovery_category_name = this.first_recovery_name[0].value, 
                        this.getEstimatedPrice(), void this.$refs.addRecoveryType.open()) : this.$tips.toast("请先选择地址") : this.$tips.toast("该地区暂未开放");
                    },
                    closeAddRecoveryType: function() {
                        this.$refs.addRecoveryType.close();
                    },
                    toOpenTips: function() {
                        this.$refs.tipsPopup.open();
                    },
                    toCloseTips: function() {
                        this.$refs.tipsPopup.close();
                    },
                    toLeaveMsg: function() {
                        e.navigateTo({
                            url: "../leaveMessage/leaveMessage"
                        });
                    },
                    toSelAdd: function() {
                        var t = {
                            address: this.address,
                            latitude: this.latitude,
                            longtiude: this.longtiude,
                            user_name: this.user_name,
                            user_phone_num: this.user_phone_num,
                            sex: this.sex,
                            poi_address: this.poi_address,
                            choose_addr: this.choose_addr,
                            terminal_user_address_id: this.terminal_user_address_id,
                            ad_code: this.ad_code,
                            is_default: this.is_default ? 1 : this.is_default
                        };
                        c.globalData.fromWOIAddInfo = t, e.navigateTo({
                            url: "../../mine/manageAddress/chooseAddress"
                        });
                    },
                    toAddList: function() {
                        e.navigateTo({
                            url: "../../mine/manageAddress/manageAddress?fromWriterOrderInfo=1"
                        });
                    },
                    lookAgreement: function() {
                        e.navigateTo({
                            url: "../../order/userAgreement/userAgreement"
                        });
                    },
                    moveHandle: function() {
                        return !1;
                    }
                }
            };
            t.default = d;
        }).call(this, i("543d").default);
    },
    af37: function(e, t, i) {
        i.r(t);
        var a = i("a90c"), s = i.n(a);
        for (var o in a) "default" !== o && function(e) {
            i.d(t, e, function() {
                return a[e];
            });
        }(o);
        t.default = s.a;
    }
}, [ [ "77e3", "common/runtime", "common/vendor" ] ] ]);