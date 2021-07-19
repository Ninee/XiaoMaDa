(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/index/index" ], {
    1085: function(t, e, n) {
        n.r(e);
        var i = n("2094"), o = n.n(i);
        for (var s in i) "default" !== s && function(t) {
            n.d(e, t, function() {
                return i[t];
            });
        }(s);
        e.default = o.a;
    },
    2094: function(t, e, n) {
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = t.getRecorderManager(), o = getApp(), s = {
                components: {
                    frameAnimation: function() {
                        n.e("components/common/frameAnimation").then(function() {
                            return resolve(n("0cad"));
                        }.bind(null, n)).catch(n.oe);
                    }
                },
                data: function() {
                    return {
                        bannerAuto: !0,
                        navHeight: 0,
                        menus: [ "首页", "塑料", "金属", "瓶类", "旧衣服", "金属", "瓶类", "旧衣服" ],
                        hot_btns: [],
                        msgs: [ "助力垃圾分类、共建绿水青山" ],
                        activities: [],
                        current: 0,
                        margin: "210rpx",
                        hot_imgs: [],
                        hot_anthore_imgs: [],
                        partner_url: [],
                        swiper_img: [],
                        topBgColor: "",
                        lat: "",
                        lng: "",
                        ad_code: "",
                        messages: "",
                        voicePath: "",
                        is_speaking: !1,
                        startUpVoice: !1,
                        user_infos: {},
                        hot_swiper: !1,
                        bannerTop: 0,
                        is_novice: !1,
                        setIntervalNotice: null,
                        xcxIsAudit: 1,
                        img_float: {},
                        animation: {},
                        animationData: {}
                    };
                },
                mounted: function() {
                    var e = this;
                    t.createSelectorQuery().in(this).select("#bannerSwiper").boundingClientRect(function(t) {
                        e.bannerTop = t.height + t.top;
                    }).exec();
                },
                onPageScroll: function(t) {
                    t.scrollTop > this.bannerTop - 70 ? this.bannerAuto = !1 : this.bannerAuto = !0;
                },
                onLoad: function(e) {
                    var n = this;
                    t.getSystemInfo({
                        success: function(t) {
                            n.navHeight = t.statusBarHeight;
                        }
                    }), this.animation = t.createAnimation({
                        transformOrigin: "50% 50%",
                        duration: 400,
                        timingFunction: "linear",
                        delay: 0
                    }), e.id && this.$authHelper.setTerminalShareId(e.id);
                    var i = this.$authHelper.setTerminalPromoId(e.q);
                    i && 3 == i.promoType && this.getStoreCode(i.promoId).then(function(e) {
                        e.data || t.navigateTo({
                            url: "../storeCode/storeCode?store_code=" + i.promoId
                        });
                    }), this.hot_imgs = [ this.$configs.networkImgs.searchImg("sbnr01"), this.$configs.networkImgs.searchImg("sbnr02"), this.$configs.networkImgs.searchImg("sbnr03"), this.$configs.networkImgs.searchImg("sbnr04") ], 
                    this.hot_anthore_imgs = [ this.$configs.networkImgs.searchImg("sbnr01f"), this.$configs.networkImgs.searchImg("sbnr02f"), this.$configs.networkImgs.searchImg("sbnr03f"), this.$configs.networkImgs.searchImg("sbnr04f") ], 
                    this.partner_url = [ this.$configs.networkImgs.searchImg("mrys_hzhb_logo01"), this.$configs.networkImgs.searchImg("mrys_hzhb_logo02"), this.$configs.networkImgs.searchImg("mrys_hzhb_logo03"), this.$configs.networkImgs.searchImg("mrys_hzhb_logo04"), this.$configs.networkImgs.searchImg("mrys_hzhb_logo05"), this.$configs.networkImgs.searchImg("mrys_hzhb_logo06"), this.$configs.networkImgs.searchImg("mrys_hzhb_logo07"), this.$configs.networkImgs.searchImg("mrys_hzhb_logo08") ], 
                    this.getMenuList("").then(function(t) {
                        n.getPositionAndAuth().then(function(t) {
                            n.getMenuList(n.ad_code);
                        }).catch(function(t) {
                            n.getMenuList(n.ad_code);
                        });
                    }), this.getBanner(), this.getNewGuideStatus();
                },
                computed: {
                    leftCurrent: function() {
                        return 0 == this.current ? this.hot_imgs.length - 1 : this.current - 1;
                    },
                    rightCurrent: function() {
                        return this.current == this.hot_imgs.length - 1 ? 0 : this.current + 1;
                    }
                },
                onHide: function() {
                    this.hot_swiper = !1, this.bannerAuto = !1, clearInterval(this.setIntervalNotice), 
                    clearInterval(this.img_float);
                },
                onShow: function() {
                    var e = this;
                    this.is_novice ? (t.hideTabBar({
                        animation: !1
                    }), this.$refs.noviceGuidance.open()) : t.showTabBar({
                        animation: !1
                    });
                    var n = 0;
                    this.img_float = setInterval(function() {
                        0 == n ? (e.animation.top("-20rpx").step(), e.animationData = e.animation.export(), 
                        n = 20) : (e.animation.top("0rpx").step(), e.animationData = e.animation.export(), 
                        n = 0);
                    }, 500), this.$authHelper.isLogin() && this.ad_code && this.lat && this.lng && this.activeTaskList(), 
                    this.hot_swiper = !0, this.bannerAuto = !0, this.getAnnouncements(), this.terminalUserXcxIsAudit(), 
                    this.setIntervalNotice = setInterval(function() {
                        e.getAnnouncements();
                    }, 75e3);
                    var o = this;
                    i.onStop(function(e) {
                        o.voicePath = e.tempFilePath, o.startUpVoice && (o.biaDuVoiceToString(o.voicePath).then(function(e) {
                            t.navigateTo({
                                url: "../index/priceTable/garbageSelet?messages=" + o.messages
                            });
                        }), o.startUpVoice = !1);
                    });
                },
                onShareAppMessage: function() {
                    var t = this;
                    this.$authHelper.login().then(function(e) {
                        t.getUserInfo().then(function(e) {
                            var n = "/pages/index/index";
                            return t.user_infos && t.user_infos.id && (n += "?id=" + t.user_infos.id), {
                                title: "手机点一点，废品上门收",
                                path: n,
                                imageUrl: "http://files.pay.dianjishenghuo.cn/mrys_share_to_friends.jpg"
                            };
                        });
                    });
                },
                methods: {
                    getPositionAndAuth: function() {
                        var e = this, n = this;
                        return new Promise(function(i, s) {
                            e.$openHelper.getPosition(o.globalData.position).then(function(t) {
                                t.code == e.$configs.httpSuccessStatus && (n.ad_code = t.data.area_id, n.lat = t.data.lat, 
                                n.lng = t.data.lng, e.$authHelper.isLogin() && e.activeTaskList(), i(t.data));
                            }).catch(function(e) {
                                t.showModal({
                                    content: "检测到您没有打开每日一收的地理位置权限，是否去设置打开？",
                                    success: function(e) {
                                        e.confirm ? t.openSetting({
                                            success: function(t) {
                                                t.authSetting["scope.userLocation"] && n.getPositionAndAuth();
                                            }
                                        }) : e.cancel && s({
                                            cancel: "用户点击取消"
                                        });
                                    }
                                });
                            });
                        });
                    },
                    getBanner: function() {
                        var t = this;
                        this.$http.get("/terminal/home/page/public/banner?admin_key=" + this.$configs.adminKey).then(function(e) {
                            e.code == t.$configs.httpSuccessStatus ? (t.swiper_img = e.data, t.topBgColor = e.data[0].color) : t.$tips.toast(e.message);
                        }).catch(function(e) {
                            t.$tips.toast(e.message || "网络异常"), console.log("异常", e);
                        });
                    },
                    terminalUserXcxIsAudit: function() {
                        var t = this;
                        this.$http.get("/terminal/user/public/terminalUserXcxIsAudit").then(function(e) {
                            e.code == t.$configs.httpSuccessStatus ? 1 == e.data ? t.xcxIsAudit = 1 : t.xcxIsAudit = 0 : t.$tips.toast(e.message);
                        }).catch(function(e) {
                            t.$tips.toast(e.message || "网络异常"), console.log("异常", e);
                        });
                    },
                    getMenuList: function(t) {
                        var e = this;
                        return this.$tips.loading(), new Promise(function(n, i) {
                            e.$http.get("/recovery/category/public/v3/getRecoveryCategory?admin_key=" + e.$configs.adminKey + "&ad_code=" + t).then(function(t) {
                                e.$tips.loaded(), t.code == e.$configs.httpSuccessStatus && (e.hot_btns = [], e.menus = t.data, 
                                e.menus.forEach(function(t, n) {
                                    1 == t.cid && e.hot_btns.push(t);
                                })), n(t);
                            }).catch(function(t) {
                                e.$tips.loaded(), i(t), e.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                            });
                        });
                    },
                    categoryIsOpen: function(t) {
                        var e = this;
                        return new Promise(function(n, i) {
                            e.$http.get("/recovery/category/public/v3/getRecoveryCategoryUnit?recovery_category_id=" + t + "&ad_code=" + e.ad_code).then(function(t) {
                                t.code, e.$configs.httpSuccessStatus, n(t);
                            }).catch(function(t) {
                                rejcet(t), e.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                            });
                        });
                    },
                    getAnnouncements: function() {
                        var t = this;
                        this.$http.get("/terminal/home/page/public/getAnnouncements").then(function(e) {
                            e.code == t.$configs.httpSuccessStatus && (t.msgs = e.data);
                        }).catch(function(e) {
                            t.$tips.toast(e.message || "网络异常"), console.log("异常", e);
                        });
                    },
                    getStoreCode: function(t) {
                        var e = this;
                        return new Promise(function(n, i) {
                            e.$http.get("/terminal/user/public/getStoreCode?store_code=" + t).then(function(t) {
                                t.code == e.$configs.httpSuccessStatus && n(t);
                            }).catch(function(t) {
                                n(t), e.$tips.toast(t.message || "网络异常");
                            });
                        });
                    },
                    biaDuVoiceToString: function(t) {
                        var e = this;
                        return new Promise(function(n, i) {
                            e.$tips.loading(), e.$http.upload("/terminalUser/addres/public/biaDuVoiceToString", {
                                filePath: t,
                                name: "file"
                            }).then(function(t) {
                                if (e.$tips.loaded(), t.code == e.$configs.httpSuccessStatus) {
                                    var i = "";
                                    t.data.result.forEach(function(t, e) {
                                        i += t;
                                    }), "" != i && i.lastIndexOf("。") == i.length - 1 && (i = i.substr(0, i.length - 1)), 
                                    e.messages = i, n(t);
                                } else e.$tips.toast(t.message);
                            }).catch(function(t) {
                                i(t), e.$tips.loaded(), e.$tips.toast(t.message), console.log("失败", t);
                            });
                        });
                    },
                    addressTextToAddress: function(t) {
                        var e = this;
                        this.$tips.loading(), this.$http.get("/terminalUser/addres/addressTextToAddress?address_str=" + t).then(function(t) {
                            e.$tips.loaded(), t.code == e.$configs.httpSuccessStatus ? (e.address = t.data.detail, 
                            e.lat = t.data.lat, e.lng = t.data.lng, e.user_name = t.data.person, e.phone_num = t.data.phonenum, 
                            e.poi_address = t.data.province + t.data.city + t.data.county + t.data.detail, e.choose_addr = t.data.detail) : e.$tips.toast(t.message);
                        }).catch(function(t) {
                            e.$tips.loaded(), e.$tips.toast(t.message), console.log("失败", t);
                        });
                    },
                    getShareSwitch: function() {
                        var t = this;
                        return new Promise(function(e, n) {
                            t.$http.get("/terminal/user/v2/getShareSwitch?ad_code=" + t.ad_code + "&admin_key=" + t.$configs.adminKey + "&lat=" + t.lat + "&lng=" + t.lng).then(function(t) {
                                e(t);
                            }).catch(function(e) {
                                reject(e), t.$tips.toast(e.message || "网络异常"), console.log("异常", e);
                            });
                        });
                    },
                    getUserInfo: function() {
                        var t = this;
                        return new Promise(function(e, n) {
                            t.$tips.loading(), t.$http.post("/terminal/user/getTerminalUserInfo").then(function(n) {
                                t.$tips.loaded(), n.code == t.$configs.httpSuccessStatus ? (t.user_infos = n.data, 
                                e()) : t.$tips.toast(n.message);
                            }).catch(function(e) {
                                n(), t.$tips.loaded(), t.$tips.toast(e.message || "网络异常");
                            });
                        });
                    },
                    getNewGuideStatus: function() {
                        var e = this;
                        this.$authHelper.getOpenId().then(function(n) {
                            var i = {
                                app_id: e.$configs.xcxAppId,
                                auth_type: 1,
                                unique_id: n.data
                            };
                            e.$http.post("/terminal/user/public/getNewGuideStatus", i).then(function(n) {
                                n.code != e.$configs.httpSuccessStatus || n.data && 0 != JSON.parse(n.data.new_guide_status).v1 ? e.is_novice = !1 : (e.is_novice = !0, 
                                t.hideTabBar({
                                    animation: !1
                                }), e.$refs.noviceGuidance.open());
                            }).catch(function(t) {
                                e.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                            });
                        });
                    },
                    updateNewGuideStatus: function() {
                        var t = this;
                        this.$authHelper.getOpenId().then(function(e) {
                            var n = {
                                app_id: t.$configs.xcxAppId,
                                auth_type: 1,
                                unique_id: e.data,
                                new_guide_status: JSON.stringify({
                                    v1: 1
                                })
                            };
                            t.$http.post("/terminal/user/public/updateNewGuideStatus", n).then(function(e) {
                                e.code == t.$configs.httpSuccessStatus || t.$tips.toast(e.message);
                            }).catch(function(e) {
                                t.$tips.toast(e.message || "网络异常"), console.log("异常", e);
                            });
                        });
                    },
                    activeTaskList: function() {
                        var t = this;
                        this.$http.get("/terminal/task/activeTaskList?ad_code=" + this.ad_code + "&admin_key=" + this.$configs.adminKey + "&lat=" + this.lat + "&lng=" + this.lng + "&is_list=0").then(function(e) {
                            e.code == t.$configs.httpSuccessStatus && e.data ? t.activities = e.data : t.$tips.toast(e.message);
                        }).catch(function(e) {
                            t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    toSelGarbage: function() {
                        t.navigateTo({
                            url: "../index/priceTable/garbageSelet"
                        });
                    },
                    swiperJumpPage: function(e) {
                        1 == e.go_to_type ? t.navigateTo({
                            url: e.go_to_details
                        }) : 2 == e.go_to_type && t.switchTab({
                            url: e.go_to_details
                        });
                    },
                    toBusinessCooperation: function() {
                        t.navigateTo({
                            url: "./businessCooperation/businessCooperation"
                        });
                    },
                    toOtherPage: function(e) {
                        this.ad_code ? e.is_on ? (o.globalData.toPriceTabParms = {
                            category_id: e.id,
                            category_title: e.value,
                            category_img: e.category_img
                        }, t.switchTab({
                            url: "../index/priceTable/priceTable"
                        })) : this.$tips.toast("该区域暂未开放") : this.getPositionAndAuth();
                    },
                    toCategory: function() {
                        this.ad_code ? (o.globalData.toPriceTabParms = {}, t.switchTab({
                            url: "../index/priceTable/priceTable"
                        })) : this.getPositionAndAuth();
                    },
                    toPlayOrder: function() {
                        o.globalData.fromIndexCategoryId = {}, t.switchTab({
                            url: "../index/firstPage"
                        });
                    },
                    nowPlayOrder: function(e) {
                        var n = this;
                        this.ad_code ? this.categoryIsOpen(e).then(function(i) {
                            i.code == n.$configs.httpSuccessStatus ? (o.globalData.fromIndexCategoryId = {
                                id: e
                            }, t.switchTab({
                                url: "../index/firstPage"
                            })) : n.toPlayOrder();
                        }).catch(function(t) {
                            n.$tips.toast("该品类暂未开放");
                        }) : this.getPositionAndAuth();
                    },
                    openNewPage: function() {
                        t.navigateTo({
                            url: "../webView/selPhone"
                        });
                    },
                    toGiftsPage: function() {
                        var e = this;
                        this.$authHelper.login().then(function(n) {
                            n.code == e.$configs.httpSuccessStatus && (e.ad_code ? e.getShareSwitch().then(function(n) {
                                1 == n.data ? t.navigateTo({
                                    url: "../task/task?ad_code=" + e.ad_code + "&lat=" + e.lat + "&lng=" + e.lng
                                }) : e.$tips.toast("当前区域暂未开放!");
                            }) : e.getPositionAndAuth());
                        });
                    },
                    toExtensionCode: function() {
                        var e = this;
                        this.$authHelper.login().then(function(n) {
                            n.code == e.$configs.httpSuccessStatus && (e.ad_code ? e.getShareSwitch().then(function(n) {
                                1 == n.data ? t.navigateTo({
                                    url: "../mine/extensionCode/extensionCode"
                                }) : e.$tips.toast("当前区域暂未开放!");
                            }) : e.getPositionAndAuth());
                        });
                    },
                    swiperJump: function(t) {
                        0 == t && this.toExtensionCode(), 3 == t && this.toSelGarbage();
                    },
                    not_open: function() {
                        this.$tips.toast("暂未开放");
                    },
                    changes: function(t) {
                        this.current = t.detail.current;
                    },
                    change_swiper: function(t) {
                        this.topBgColor = this.swiper_img[t.detail.current].color;
                    },
                    toOpenVoicePopup: function() {
                        var e = this;
                        t.authorize({
                            scope: "scope.record",
                            success: function() {
                                e.is_speaking = !0, i.start({
                                    format: "PCM",
                                    sampleRate: 16e3,
                                    numberOfChannels: 1
                                }), e.$refs.voicePropu.open();
                            },
                            fail: function() {
                                e.$tips.modal("请打开麦克风权限").then(function(n) {
                                    t.openSetting({
                                        success: function(t) {
                                            t.authSetting["scope.record"] && e.toOpenVoicePopup();
                                        },
                                        fail: function(t) {
                                            console.log(t);
                                        }
                                    });
                                });
                            }
                        });
                    },
                    toClosePopup: function() {
                        this.is_speaking = !1, i.stop(), this.startUpVoice = !0, this.$refs.voicePropu.close();
                    },
                    closeNoviceGuidance: function() {
                        this.$refs.noviceGuidance.close(), t.showTabBar({
                            animation: !1
                        }), this.updateNewGuideStatus(), this.is_novice = !1;
                    }
                }
            };
            e.default = s;
        }).call(this, n("543d").default);
    },
    6543: function(t, e, n) {
        var i = n("8ddd");
        n.n(i).a;
    },
    "66b0": function(t, e, n) {
        (function(t) {
            function e(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            n("b544"), e(n("66fd")), t(e(n("fe97")).default);
        }).call(this, n("543d").createPage);
    },
    "8ddd": function(t, e, n) {},
    "9e39": function(t, e, n) {
        n.d(e, "b", function() {
            return o;
        }), n.d(e, "c", function() {
            return s;
        }), n.d(e, "a", function() {
            return i;
        });
        var i = {
            uniPopup: function() {
                return Promise.all([ n.e("common/vendor"), n.e("components/uni-popup/uni-popup") ]).then(n.bind(null, "8575"));
            }
        }, o = function() {
            var t = this, e = (t.$createElement, t._self._c, 1 == t.xcxIsAudit ? t.$configs.networkImgs.searchImg("mrys_hongbao") : null), n = 0 == t.xcxIsAudit ? t.$configs.networkImgs.searchImg("mrys_hongbao") : null, i = t.$configs.networkImgs.searchImg("mrys_huiyuanrihaoni"), o = t.$configs.networkImgs.searchImg("mrys_bubnr02.v2");
            t._isMounted || (t.e0 = function(e) {
                return t.$refs.recovertRuselt.close();
            }), t.$mp.data = Object.assign({}, {
                $root: {
                    g0: e,
                    g1: n,
                    g2: i,
                    g3: o
                }
            });
        }, s = [];
    },
    fe97: function(t, e, n) {
        n.r(e);
        var i = n("9e39"), o = n("1085");
        for (var s in o) "default" !== s && function(t) {
            n.d(e, t, function() {
                return o[t];
            });
        }(s);
        n("6543");
        var a = n("f0c5"), c = Object(a.a)(o.default, i.b, i.c, !1, null, null, null, !1, i.a, void 0);
        e.default = c.exports;
    }
}, [ [ "66b0", "common/runtime", "common/vendor" ] ] ]);