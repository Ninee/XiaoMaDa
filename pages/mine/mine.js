(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/mine/mine" ], {
    "0152": function(t, n, e) {},
    "0e42": function(t, n, e) {
        e.r(n);
        var o = e("6eac"), i = e.n(o);
        for (var a in o) "default" !== a && function(t) {
            e.d(n, t, function() {
                return o[t];
            });
        }(a);
        n.default = i.a;
    },
    2209: function(t, n, e) {
        e.r(n);
        var o = e("614f"), i = e("0e42");
        for (var a in i) "default" !== a && function(t) {
            e.d(n, t, function() {
                return i[t];
            });
        }(a);
        e("b2a0");
        var s = e("f0c5"), c = Object(s.a)(i.default, o.b, o.c, !1, null, null, null, !1, o.a, void 0);
        n.default = c.exports;
    },
    "614f": function(t, n, e) {
        e.d(n, "b", function() {
            return o;
        }), e.d(n, "c", function() {
            return i;
        }), e.d(n, "a", function() {});
        var o = function() {
            var t = this, n = (t.$createElement, t._self._c, t.$configs.networkImgs.searchImg("mrys_hongbao")), e = t.$configs.networkImgs.searchImg("mrys_fenxiangyouni"), o = t.$configs.networkImgs.searchImg("mrys_choujiang"), i = t.$configs.networkImgs.searchImg("mrys_huiyuanrihaoni"), a = t.$configs.networkImgs.searchImg("mrys_hongbao@2");
            t.$mp.data = Object.assign({}, {
                $root: {
                    g0: n,
                    g1: e,
                    g2: o,
                    g3: i,
                    g4: a
                }
            });
        }, i = [];
    },
    "6eac": function(t, n, e) {
        (function(t) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.default = void 0;
            var o = getApp(), i = {
                components: {
                    frameAnimation: function() {
                        e.e("components/common/frameAnimation").then(function() {
                            return resolve(e("0cad"));
                        }.bind(null, e)).catch(e.oe);
                    }
                },
                data: function() {
                    return {
                        navHeight: 0,
                        userInfo: [ {
                            pic: ""
                        } ],
                        userStatus: 1,
                        pickUpIng: !1,
                        pickUpIngOrderId: "",
                        recoveryMoney: 0,
                        coin: 0,
                        isEnterSuccess: !1,
                        allPeople: 0,
                        recovery_num: 0
                    };
                },
                onShow: function() {
                    var t = this;
                    this.$authHelper.login().then(function(n) {
                        n.code == t.$configs.httpSuccessStatus && (t.userStatus = 2, t.getUserInfo(), t.getUpDoorOrder(), 
                        t.getTerminalUserBalance(), t.checkIsEnter(), t.getRecoveryPrice(), t.getTotalShareTerminalUserCount(), 
                        t.getRecoveryCount());
                    });
                },
                onLoad: function() {
                    var n = this;
                    t.getSystemInfo({
                        success: function(t) {
                            n.navHeight = t.statusBarHeight;
                        }
                    });
                },
                methods: {
                    bindGetUserInfo: function(t) {
                        var n = this;
                        t.detail.iv && this.$authHelper.getOpenId().then(function(e) {
                            n.$http.post("/terminal/user/get/pic/nickname/unionId", {
                                encrypted_data: t.detail.encryptedData,
                                iv: t.detail.iv,
                                openid: e.data
                            }).then(function(t) {
                                n.getUserInfo();
                            }).catch(function(t) {
                                n.$tips.toast(t.message || "网络异常");
                            });
                        });
                    },
                    getUserInfo: function() {
                        var t = this;
                        this.$http.post("/terminal/user/getTerminalUserInfo").then(function(n) {
                            t.userInfo = n.data, t.userInfo && t.userInfo.pic && (t.userStatus = 3);
                        }).catch(function(n) {
                            t.$tips.toast(n.message || "网络异常");
                        });
                    },
                    getUpDoorOrder: function() {
                        var t = this;
                        this.$tips.loading(), this.$http.get("/terminal/user/pickUpIng").then(function(n) {
                            t.$tips.loaded(), n.code == t.$configs.httpSuccessStatus ? (t.pickUpIng = !0, t.pickUpIngOrderId = n.data) : (t.pickUpIng = !1, 
                            t.pickUpIngOrderId = "");
                        }).catch(function(n) {
                            t.$tips.loaded(), t.$tips.toast(n.message || "网络异常"), console.log("异常", n);
                        });
                    },
                    getRecoveryPrice: function() {
                        var t = this;
                        this.$http.post("/terminal/user/getRecoveryPrice").then(function(n) {
                            n.code == t.$configs.httpSuccessStatus && (t.recoveryMoney = n.data);
                        }).catch(function(n) {
                            t.$tips.toast(n.message || "网络异常"), console.log("异常", n);
                        });
                    },
                    getTerminalUserBalance: function() {
                        var t = this;
                        this.$http.post("/terminalUser/balance/getTerminalUserBalance").then(function(n) {
                            n.code == t.$configs.httpSuccessStatus && (t.coin = n.data);
                        }).catch(function(n) {
                            t.$tips.toast(n.message || "网络异常"), console.log("异常", n);
                        });
                    },
                    isSubmit: function() {
                        var n = this;
                        this.$http.post("/merchant/info/getMerchantInfo").then(function(e) {
                            e.code == n.$configs.httpSuccessStatus ? null != e.data ? 1 == e.data.status ? t.navigateTo({
                                url: "./merchantsEnter/merCenter"
                            }) : t.navigateTo({
                                url: "./merchantsEnter/result"
                            }) : t.navigateTo({
                                url: "./merchantsEnter/merchantsEnter"
                            }) : n.$tips.toast(e.message);
                        }).catch(function(t) {
                            n.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                        });
                    },
                    checkIsEnter: function() {
                        var t = this;
                        this.$http.post("/merchant/info/getMerchantInfo").then(function(n) {
                            n.code == t.$configs.httpSuccessStatus ? null != n.data && (1 == n.data.status ? t.isEnterSuccess = !0 : t.isEnterSuccess = !1) : t.$tips.toast(n.message);
                        }).catch(function(n) {
                            t.$tips.toast(n.message || "网络异常"), console.log("异常", n);
                        });
                    },
                    toMyCion: function() {
                        t.navigateTo({
                            url: "./balance/balance"
                        });
                    },
                    toReg: function() {
                        t.navigateTo({
                            url: "/pages/login"
                        });
                    },
                    toRankList: function() {
                        t.navigateTo({
                            url: "inviteFriends/inviteFriends"
                        });
                    },
                    manageAddress: function() {
                        t.navigateTo({
                            url: "./manageAddress/manageAddress"
                        });
                    },
                    toTell: function() {
                        t.makePhoneCall({
                            phoneNumber: "4009900188"
                        });
                    },
                    toCarter: function() {
                        t.navigateToMiniProgram({
                            appId: this.$configs.carterXcx.appId,
                            path: this.$configs.carterXcx.path,
                            envVersion: this.$configs.carterXcx.envVersion,
                            success: function(t) {
                                console.log(t);
                            }
                        });
                    },
                    integralShop: function() {
                        this.$tips.toast("敬请期待!");
                    },
                    toShop: function() {
                        t.navigateToMiniProgram({
                            appId: this.$configs.huishihuoXcx.appId,
                            path: this.$configs.huishihuoXcx.path,
                            envVersion: this.$configs.huishihuoXcx.envVersion,
                            success: function(t) {
                                console.log(t);
                            }
                        });
                    },
                    toOrderList: function(n) {
                        t.reLaunch({
                            url: "../order/order?selTab=" + n
                        });
                    },
                    toEctend: function() {
                        t.navigateTo({
                            url: "./extendCode/extendCode"
                        });
                    },
                    toMerEnter: function() {
                        this.isSubmit();
                    },
                    toBalance: function() {
                        t.navigateTo({
                            url: "./balance/balance"
                        });
                    },
                    toExtensionCode: function() {
                        var n = this;
                        this.getPositionAndAuth().then(function(e) {
                            n.getShareSwitch(e.area_id, e.lat, e.lng).then(function(e) {
                                1 == e.data ? t.navigateTo({
                                    url: "extensionCode/extensionCode"
                                }) : n.$tips.toast("当前区域暂未开放!");
                            });
                        });
                    },
                    toexTendsionMateriel: function() {
                        var n = this, e = this;
                        this.getPositionAndAuth().then(function(o) {
                            n.getShareSwitch(o.area_id, o.lat, o.lng).then(function(n) {
                                1 == n.data ? t.navigateTo({
                                    url: "extendsionMateriel/extendsionMateriel"
                                }) : e.$tips.toast("当前区域暂未开放!");
                            });
                        });
                    },
                    toGiftsPage: function() {
                        var n = this, e = this;
                        this.getPositionAndAuth().then(function(o) {
                            n.getShareSwitch(o.area_id, o.lat, o.lng).then(function(n) {
                                1 == n.data ? t.navigateTo({
                                    url: "../task/task?ad_code=" + o.area_id + "&lat=" + o.lat + "&lng=" + o.lng
                                }) : e.$tips.toast("当前区域暂未开放!");
                            });
                        }), this.ad_code || this.getPositionAndAuth();
                    },
                    getTotalShareTerminalUserCount: function() {
                        var t = this;
                        this.$http.post("/terminal/user/getTotalShareTerminalUserCount").then(function(n) {
                            n.code == t.$configs.httpSuccessStatus ? t.allPeople = n.data : t.$tips.toast(n.message);
                        }).catch(function(n) {
                            t.$tips.toast(n.message || "网络异常"), console.log("异常", n);
                        });
                    },
                    getRecoveryCount: function() {
                        var t = this;
                        this.$http.post("/terminal/user/getRecoveryCount").then(function(n) {
                            n.code == t.$configs.httpSuccessStatus ? t.recovery_num = n.data : t.$tips.toast(n.message);
                        }).catch(function(n) {
                            t.$tips.toast(n.message || "网络异常"), console.log("异常", n);
                        });
                    },
                    getPositionAndAuth: function() {
                        var n = this, e = this;
                        return new Promise(function(i, a) {
                            n.$openHelper.getPosition(o.globalData.position).then(function(t) {
                                t.code == n.$configs.httpSuccessStatus && i(t.data);
                            }).catch(function(n) {
                                t.showModal({
                                    content: "检测到您没有打开每日一收的地理位置权限，是否去设置打开？",
                                    success: function(n) {
                                        n.confirm ? t.openSetting({
                                            success: function(t) {
                                                var n = this;
                                                t.authSetting["scope.userLocation"] && e.getPositionAndAuth().then(function(t) {
                                                    r.code == n.$configs.httpSuccessStatus && i(r.data);
                                                });
                                            }
                                        }) : n.cancel && (console.log("用户点击取消"), a({
                                            cancel: "用户点击取消"
                                        }));
                                    }
                                });
                            });
                        });
                    },
                    getShareSwitch: function(t, n, e) {
                        var o = this;
                        return new Promise(function(i, a) {
                            o.$http.get("/terminal/user/v2/getShareSwitch?ad_code=" + t + "&admin_key=" + o.$configs.adminKey + "&lat=" + n + "&lng=" + e).then(function(t) {
                                i(t);
                            }).catch(function(t) {
                                reject(t), o.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                            });
                        });
                    }
                }
            };
            n.default = i;
        }).call(this, e("543d").default);
    },
    b2a0: function(t, n, e) {
        var o = e("0152");
        e.n(o).a;
    },
    b62e: function(t, n, e) {
        (function(t) {
            function n(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            e("b544"), n(e("66fd")), t(n(e("2209")).default);
        }).call(this, e("543d").createPage);
    }
}, [ [ "b62e", "common/runtime", "common/vendor" ] ] ]);