(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/index/firstPage" ], {
    1471: function(t, e, s) {
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var s = getApp(), a = {
                data: function() {
                    return {
                        id: 0,
                        latitude: 39.909,
                        longitude: 116.39742,
                        area_code: "",
                        is_open_area: !0,
                        address: "",
                        choose_addr: "请选择上门地址",
                        poi_address: "",
                        min_distence_addr: {},
                        show_min_addr: !1,
                        terminal_user_address_id: "",
                        is_have_default: !1,
                        is_default: 0,
                        recovery_category_id: 0,
                        navHeight: 0,
                        sexVal: "1",
                        address_list: [],
                        user_phone_num: "",
                        user_name: "",
                        is_more_info: !1,
                        mapCtx: "",
                        to_addr_page: !1,
                        wxVersion: "old",
                        msgs: []
                    };
                },
                onReady: function() {
                    this.mapCtx = t.createMapContext("myMap");
                },
                onLoad: function(e) {
                    var s = this, a = t.getSystemInfoSync().SDKVersion;
                    this.$myUtil.compareVersion(a, "2.7.0") >= 0 ? this.wxVersion = "news" : t.showModal({
                        title: "提示",
                        content: "当前微信版本过低，建议升级后使用"
                    }), t.getSystemInfo({
                        success: function(t) {
                            s.navHeight = t.statusBarHeight;
                        }
                    });
                },
                onUnload: function() {},
                onShow: function() {
                    var e = this, s = this;
                    this.$authHelper.login().then(function(t) {
                        t.code == e.$configs.httpSuccessStatus ? e.to_addr_page ? e.to_addr_page = !1 : e.getUserDefAddress().then(function() {
                            e.user_phone_num || e.getUserPhoneNum();
                        }) : e.getPositionAndAuth().then(function(t) {
                            s.latitude = t.lat, s.longitude = t.lng, s.area_code = t.area_id, s.lonAndLatToAddress(), 
                            s.activeTaskList();
                        });
                    }), t.$on("hasAddr", function(t) {
                        s.address = t.address, s.is_default = t.is_default, 0 == s.is_default ? s.is_have_default = !1 : s.is_have_default = !0, 
                        s.latitude = t.lat, s.longitude = t.lng, s.user_name = t.name, s.user_phone_num = t.phone, 
                        s.poi_address = t.poi_address, s.choose_addr = t.poi_name, s.sexVal = t.sex, s.terminal_user_address_id = t.id, 
                        s.area_code = t.area_code, s.activeTaskList(), s.getNearAddr();
                    }), t.$on("selRecoveryType", function(t) {
                        var e = t.msg;
                        s.recovery_category_id = e.recovery_category_id;
                    }), t.hideTabBar({
                        animation: !1
                    });
                },
                onHide: function() {
                    this.to_addr_page || this.cleraAllData(), t.showTabBar({
                        animation: !1
                    }), t.$off("hasAddr");
                },
                methods: {
                    getUserDefAddress: function() {
                        var t = this;
                        return new Promise(function(e, s) {
                            t.$tips.loading(), t.$http.get("/terminalUser/addres/v2/defaultAddress").then(function(s) {
                                t.$tips.loaded(), s.code == t.$configs.httpSuccessStatus && s.data ? (t.address = s.data.address, 
                                t.is_default = s.data.is_default, t.latitude = s.data.lat, t.longitude = s.data.lng, 
                                t.user_name = s.data.name, t.user_phone_num = s.data.phone, t.poi_address = s.data.poi_address, 
                                t.choose_addr = s.data.poi_name, t.sexVal = s.data.sex, t.terminal_user_address_id = s.data.id, 
                                t.area_code = s.data.area_code, t.is_have_default = !0, t.activeTaskList(), t.getListAddress()) : (t.is_have_default = !1, 
                                t.getListAddress()), e(s);
                            }).catch(function(e) {
                                s(e), t.$tips.loaded(), t.$tips.toast(e.message), console.log("失败", e);
                            });
                        });
                    },
                    getListAddress: function() {
                        var t = this, e = this;
                        this.$tips.loading(), this.$http.post("/terminalUser/addres/v2/listAddress").then(function(s) {
                            t.$tips.loaded(), s.code == t.$configs.httpSuccessStatus && (t.address_list = s.data, 
                            e.is_have_default ? t.getNearAddr(t.longitude, t.latitude) : t.getPositionAndAuth().then(function(t) {
                                e.latitude = t.lat, e.longitude = t.lng, e.area_code = t.area_id, e.activeTaskList(), 
                                e.lonAndLatToAddress(), e.getNearAddr(e.longitude, e.latitude);
                            }));
                        }).catch(function(e) {
                            t.$tips.loaded(), t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    getUserPhoneNum: function() {
                        var t = this;
                        this.$http.post("/terminal/user/getTerminalUserPhone").then(function(e) {
                            e.code == t.$configs.httpSuccessStatus && (t.user_phone_num = e.data);
                        }).catch(function(e) {
                            t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    activeTaskList: function() {
                        var t = this;
                        this.$http.get("/terminal/task/activeTaskList?ad_code=" + this.area_code + "&admin_key=" + this.$configs.adminKey + "&lat=" + this.latitude + "&lng=" + this.longitude + "&is_list=1").then(function(e) {
                            e.code == t.$configs.httpSuccessStatus && e.data ? t.msgs = e.data : t.$tips.toast(e.message);
                        }).catch(function(e) {
                            t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    cleraAllData: function() {
                        this.address = "", this.is_default = 0, this.latitude = 39.909, this.longitude = 116.39742, 
                        this.user_name = "", this.user_phone_num = "", this.poi_address = "", this.choose_addr = "请输入地址", 
                        this.terminal_user_address_id = "", this.area_code = "", this.show_min_addr = !1, 
                        this.is_more_info = !1;
                    },
                    myAddr: function() {
                        this.show_min_addr = !1, this.address = this.min_distence_addr.address, this.is_default = this.min_distence_addr.is_default, 
                        this.latitude = this.min_distence_addr.lat, this.longitude = this.min_distence_addr.lng, 
                        this.user_name = this.min_distence_addr.name, this.user_phone_num = this.min_distence_addr.phone, 
                        this.poi_address = this.min_distence_addr.poi_address, this.choose_addr = this.min_distence_addr.poi_name, 
                        this.sexVal = this.min_distence_addr.sex, this.terminal_user_address_id = this.min_distence_addr.id, 
                        this.area_code = this.min_distence_addr.area_code, this.activeTaskList();
                    },
                    bindregionchangeEvent: function(t) {
                        var e = this;
                        "end" == t.type && "drag" == t.causedBy && (e.terminal_user_address_id = "", e.is_default = 0, 
                        e.address = "", e.user_phone_num = "", e.user_name = "", this.mapCtx.getCenterLocation({
                            success: function(t) {
                                e.latitude = t.latitude, e.longitude = t.longitude, e.lonAndLatToAddress(!0), e.getNearAddr(t.longitude, t.latitude, !0);
                            },
                            fail: function(t) {}
                        }));
                    },
                    getNearAddr: function(t, e, s) {
                        var a = this, i = [];
                        a.address_list.length > 0 && a.address_list.forEach(function(s) {
                            var n = a.getDistance(t, e, s.lng, s.lat);
                            i.push(n);
                        });
                        var n = Math.min.apply(null, i), d = "";
                        i.forEach(function(t, e) {
                            t != n || (d = e);
                        }), 1e3 * n < 200 ? a.is_have_default ? 1 == s ? (a.show_min_addr = !0, a.min_distence_addr = a.address_list[d]) : void 0 == s && (a.show_min_addr = !1) : (a.show_min_addr = !0, 
                        a.min_distence_addr = a.address_list[d]) : (a.show_min_addr = !1, a.min_distence_addr = "");
                    },
                    getDistance: function(t, e, s, a) {
                        var i = e * Math.PI / 180, n = a * Math.PI / 180, d = i - n, o = t * Math.PI / 180 - s * Math.PI / 180, r = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(d / 2), 2) + Math.cos(i) * Math.cos(n) * Math.pow(Math.sin(o / 2), 2)));
                        return r *= 6378.137, (r = Math.round(1e4 * r) / 1e4).toFixed(2);
                    },
                    chooseAddress: function() {
                        var e = this;
                        this.$authHelper.login().then(function(s) {
                            s.code == e.$configs.httpSuccessStatus && (e.to_addr_page = !0, t.navigateTo({
                                url: "../mine/manageAddress/chooseAddress"
                            }));
                        });
                    },
                    getPositionAndAuth: function() {
                        var e = this, a = this;
                        return new Promise(function(i, n) {
                            e.$openHelper.getPosition(s.globalData.position).then(function(t) {
                                t.code == e.$configs.httpSuccessStatus && i(t.data);
                            }).catch(function(e) {
                                t.showModal({
                                    content: "检测到您没有打开每日一收的地理位置权限，是否去设置打开？",
                                    success: function(e) {
                                        e.confirm ? t.openSetting({
                                            success: function(t) {
                                                t.authSetting["scope.userLocation"] && a.getPositionAndAuth();
                                            }
                                        }) : e.cancel && n({
                                            cancel: "用户点击取消"
                                        });
                                    }
                                });
                            });
                        });
                    },
                    goZero: function() {
                        var t = this;
                        this.getPositionAndAuth().then(function(e) {
                            t.address = "", t.is_default = 0, t.latitude = e.lat, t.longitude = e.lng, t.area_code = e.area_id, 
                            t.terminal_user_address_id = "", t.activeTaskList(), t.lonAndLatToAddress(), t.getNearAddr(t.longitude, t.latitude, !0);
                        });
                    },
                    lonAndLatToAddress: function() {
                        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        this.$tips.loading(), this.$http.get("/inverse/geocoding/public/v2/getInverseGeocoding?lon_and_lat=" + this.longitude + "," + this.latitude).then(function(s) {
                            if (t.$tips.loaded(), s.code == t.$configs.httpSuccessStatus) {
                                if (e && (t.area_code = s.data.address_component.adcode, t.activeTaskList()), s.data.pois.length > 0) {
                                    t.choose_addr = s.data.pois[0].poi_name, t.poi_address = s.data.pois[0].poi_address;
                                    var a = s.data.pois[0].location;
                                    a = a.split(",");
                                }
                            } else t.$tips.toast(s.message);
                        }).catch(function(e) {
                            t.$tips.loaded(), t.$tips.toast(e.message || "网络异常"), console.log("异常", e);
                        });
                    },
                    next: function() {
                        var e = /^1(3|4|5|6|7|8|9)\d{9}$/;
                        if (!this.address) return this.$tips.toast("请填写门牌号");
                        if (!this.user_name) return this.$tips.toast("请填写姓名");
                        if (!e.test(this.user_phone_num)) return this.$tips.toast("请填写正确的手机号");
                        var a = {
                            address: this.address,
                            id: this.terminal_user_address_id,
                            is_default: this.is_default,
                            lat: this.latitude,
                            lng: this.longitude,
                            name: this.user_name,
                            phone: this.user_phone_num,
                            poi_address: this.poi_address,
                            poi_name: this.choose_addr,
                            sex: this.sexVal,
                            area_code: this.area_code
                        };
                        s.globalData.playOrderAddress = a, t.navigateTo({
                            url: "./writeOrderInfo/writeOrderInfo"
                        });
                    },
                    getShareSwitch: function(t) {
                        var e = this;
                        return new Promise(function(s, a) {
                            e.$http.get("/terminal/user/v2/getShareSwitch?ad_code=" + t + "&admin_key=" + e.$configs.adminKey + "&lat=" + e.latitude + "&lng=" + e.longitude).then(function(t) {
                                s(t);
                            }).catch(function(t) {
                                reject(t), e.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                            });
                        });
                    },
                    toGiftsPage: function() {
                        var e = this;
                        this.area_code ? this.getShareSwitch(this.area_code).then(function(s) {
                            1 == s.data ? t.navigateTo({
                                url: "../task/task?ad_code=" + e.area_code + "&lat=" + e.latitude + "&lng=" + e.longitude
                            }) : e.$tips.toast("当前区域暂未开放!");
                        }) : this.getPositionAndAuth().then(function(t) {
                            e.latitude = t.lat, e.longitude = t.lng, e.area_code = t.area_id, e.activeTaskList(), 
                            e.lonAndLatToAddress();
                        });
                    },
                    goIndex: function() {
                        t.switchTab({
                            url: "../index/index"
                        });
                    }
                }
            };
            e.default = a;
        }).call(this, s("543d").default);
    },
    3756: function(t, e, s) {
        s.d(e, "b", function() {
            return a;
        }), s.d(e, "c", function() {
            return i;
        }), s.d(e, "a", function() {});
        var a = function() {
            var t = this;
            t.$createElement;
            t._self._c, t._isMounted || (t.e0 = function(t) {
                t.stopPropagation(), t.preventDefault();
            }, t.e1 = function(e) {
                t.show_min_addr = !1;
            });
        }, i = [];
    },
    "3ca0": function(t, e, s) {
        var a = s("9659");
        s.n(a).a;
    },
    "4d7d": function(t, e, s) {
        (function(t) {
            function e(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            s("b544"), e(s("66fd")), t(e(s("b27b")).default);
        }).call(this, s("543d").createPage);
    },
    9659: function(t, e, s) {},
    b27b: function(t, e, s) {
        s.r(e);
        var a = s("3756"), i = s("e615");
        for (var n in i) "default" !== n && function(t) {
            s.d(e, t, function() {
                return i[t];
            });
        }(n);
        s("3ca0");
        var d = s("f0c5"), o = Object(d.a)(i.default, a.b, a.c, !1, null, null, null, !1, a.a, void 0);
        e.default = o.exports;
    },
    e615: function(t, e, s) {
        s.r(e);
        var a = s("1471"), i = s.n(a);
        for (var n in a) "default" !== n && function(t) {
            s.d(e, t, function() {
                return a[t];
            });
        }(n);
        e.default = i.a;
    }
}, [ [ "4d7d", "common/runtime", "common/vendor" ] ] ]);