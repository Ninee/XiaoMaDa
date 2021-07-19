(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/mine/extendsionMateriel/extendsionMateriel" ], {
    1503: function(e, t, n) {
        n.d(t, "b", function() {
            return o;
        }), n.d(t, "c", function() {
            return s;
        }), n.d(t, "a", function() {
            return i;
        });
        var i = {
            uniPopup: function() {
                return Promise.all([ n.e("common/vendor"), n.e("components/uni-popup/uni-popup") ]).then(n.bind(null, "8575"));
            }
        }, o = function() {
            var e = this;
            e.$createElement;
            e._self._c, e._isMounted || (e.e0 = function(t) {
                return e.$refs.rulesPopup.open();
            }, e.e1 = function(t) {
                return e.$refs.rulesPopup.close();
            });
        }, s = [];
    },
    "1d87": function(e, t, n) {
        (function(e) {
            function t(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            n("b544"), t(n("66fd")), e(t(n("df1b")).default);
        }).call(this, n("543d").createPage);
    },
    "521b": function(e, t, n) {
        n.r(t);
        var i = n("fb8a"), o = n.n(i);
        for (var s in i) "default" !== s && function(e) {
            n.d(t, e, function() {
                return i[e];
            });
        }(s);
        t.default = o.a;
    },
    d946: function(e, t, n) {
        var i = n("ecb6");
        n.n(i).a;
    },
    df1b: function(e, t, n) {
        n.r(t);
        var i = n("1503"), o = n("521b");
        for (var s in o) "default" !== s && function(e) {
            n.d(t, e, function() {
                return o[e];
            });
        }(s);
        n("d946");
        var a = n("f0c5"), r = Object(a.a)(o.default, i.b, i.c, !1, null, null, null, !1, i.a, void 0);
        t.default = r.exports;
    },
    ecb6: function(e, t, n) {},
    fb8a: function(e, t, n) {
        (function(e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var i = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }(n("0b27")), o = {
                components: {
                    cardSwiper: function() {
                        n.e("components/helang-cardSwiper/helang-cardSwiper").then(function() {
                            return resolve(n("385c"));
                        }.bind(null, n)).catch(n.oe);
                    }
                },
                data: function() {
                    return {
                        list: [],
                        paddingLR: "79rpx",
                        index: 0,
                        bigImg: [],
                        now_share_img_url: "",
                        phone_type: "",
                        cache_url: "",
                        user_infos: {},
                        qrCodeUrl: "",
                        showCanvas: !1,
                        is_share: !1,
                        formFriend: "",
                        withdrawal_min_money: 0,
                        shard_active_rule: 0
                    };
                },
                onLoad: function(t) {
                    var n = new Date();
                    if (t && "share" == t.source) return this.is_share = !0, this.formFriend = this.$configs.fromFriendImg + "?r=" + n.getFullYear() + (n.getMonth() + 1) + n.getDate() + n.getHours(), 
                    void e.reLaunch({
                        url: "/pages/index/index?id=" + t.id
                    });
                    var i = this;
                    this.$configs.materielBigImg.forEach(function(e, t) {
                        i.list.push(e + "?r=" + n.getFullYear() + (n.getMonth() + 1) + n.getDate() + n.getHours());
                    }), this.getUserInfo(), this.getPhoneType(), this.getTerminalUserWithdrawalMinMoney();
                },
                onUnload: function() {
                    this.qrCodeUrl = "";
                },
                onShareAppMessage: function(e) {
                    return {
                        title: "手机点一点，废品上门收",
                        path: "/pages/index/index?id=" + this.user_infos.id,
                        imageUrl: "http://files.pay.dianjishenghuo.cn/mrys_share_to_friends.jpg"
                    };
                },
                onShareTimeline: function() {
                    return {
                        title: "手机点一点，废品上门收",
                        query: "id=" + this.user_infos.id + "&source=share",
                        imageUrl: ""
                    };
                },
                methods: {
                    getPhoneType: function() {
                        var t = this;
                        e.getSystemInfo({
                            success: function(e) {
                                t.phone_type = e.platform;
                            }
                        });
                    },
                    getUserInfo: function() {
                        var e = this;
                        this.$tips.loading(), this.$http.post("/terminal/user/getTerminalUserInfo").then(function(t) {
                            t.code == e.$configs.httpSuccessStatus ? (e.user_infos = t.data, e.make(), e.getPositionAndAuth().then(function(t) {
                                console.log("111"), e.shardActiveTaskRule(t.area_id, e.user_infos.id);
                            })) : e.$tips.toast(t.message);
                        }).catch(function(t) {
                            e.$tips.loaded(), e.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                        });
                    },
                    getTerminalUserWithdrawalMinMoney: function() {
                        var e = this;
                        this.$http.post("/terminalUser/balance/getTerminalUserWithdrawalMinMoney").then(function(t) {
                            t.code == e.$configs.httpSuccessStatus ? e.withdrawal_min_money = t.data : e.$tips.toast(t.message);
                        }).catch(function(t) {
                            e.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                        });
                    },
                    shardActiveTaskRule: function(e, t) {
                        var n = this;
                        this.$http.get("/terminal/task/shardActiveTaskRule?ad_code=" + e + "&terminal_user_id=" + t).then(function(e) {
                            e.code == n.$configs.httpSuccessStatus ? n.shard_active_rule = e.data : n.$tips.toast(e.message);
                        }).catch(function(e) {
                            n.$tips.toast(e.message || "网络异常"), console.log("异常", e);
                        });
                    },
                    getPositionAndAuth: function() {
                        var t = this, n = this;
                        return new Promise(function(i, o) {
                            t.$openHelper.getPosition().then(function(e) {
                                e.code == t.$configs.httpSuccessStatus && i(e.data);
                            }).catch(function(t) {
                                e.showModal({
                                    content: "检测到您没有打开每日一收的地理位置权限，是否去设置打开？",
                                    success: function(t) {
                                        t.confirm ? e.openSetting({
                                            success: function(e) {
                                                var t = this;
                                                e.authSetting["scope.userLocation"] && n.getPositionAndAuth().then(function(e) {
                                                    r.code == t.$configs.httpSuccessStatus && i(r.data);
                                                });
                                            }
                                        }) : t.cancel && (console.log("用户点击取消"), o({
                                            cancel: "用户点击取消"
                                        }));
                                    }
                                });
                            });
                        });
                    },
                    make: function() {
                        var e = this;
                        i.default.make({
                            canvasId: "qrcode",
                            componentInstance: e,
                            text: e.$configs.shareUserCode + "?id=" + e.user_infos.id,
                            size: 100,
                            margin: 6,
                            backgroundColor: "#ffffff",
                            foregroundColor: "#000000",
                            fileType: "jpg",
                            correctLevel: i.default.errorCorrectLevel.L,
                            success: function(t) {
                                e.qrCodeUrl = t;
                            },
                            complete: function() {
                                e.$tips.loaded();
                            }
                        });
                    },
                    getImgInfo: function() {
                        var t = this;
                        e.getImageInfo({
                            src: t.now_share_img_url,
                            success: function(e) {
                                t.cache_url = e.path, t.drawShareImg();
                            }
                        });
                    },
                    popueShare: function() {
                        this.$tips.loading("努力绘制中");
                        var e = this, t = new Date();
                        this.$configs.materielBigImg.forEach(function(n, i) {
                            e.bigImg.push(n + "?r=" + t.getFullYear() + (t.getMonth() + 1) + t.getDate() + t.getHours());
                        }), this.now_share_img_url = this.bigImg[this.index], this.showCanvas = !0, setTimeout(function() {
                            e.getImgInfo();
                        }, 400);
                    },
                    drawShareImg: function() {
                        var t = this, n = e.createSelectorQuery().in(this).select("#share_qr"), i = e.createCanvasContext("share_qr_code");
                        i.draw(), setTimeout(function() {
                            n.boundingClientRect(function(e) {
                                var n = e.height || 960, o = e.width || 540;
                                i.setFillStyle("#FFFFFF"), i.fillRect(0, 0, o, n), i.drawImage(t.cache_url, 0, 0, o, n), 
                                i.drawImage(t.qrCodeUrl, .344 * o, .6 * n, .311 * o, .175 * n), i.draw(!1, function() {
                                    t.$nextTick(function() {
                                        t.$tips.loaded("绘制成功"), t.saveImg();
                                    });
                                });
                            }).exec();
                        }, 200);
                    },
                    saveImg: function() {
                        this.$tips.toast("正在保存中...");
                        var t = this;
                        e.canvasToTempFilePath({
                            canvasId: "share_qr_code",
                            success: function(n) {
                                t.shareQrImg = n.tempFilePath, e.saveImageToPhotosAlbum({
                                    filePath: n.tempFilePath,
                                    success: function() {
                                        t.showCanvas = !1, t.$tips.toast("保存成功");
                                    }
                                });
                            }
                        });
                    },
                    swiperChange: function(e) {
                        this.index = e.detail.current;
                    }
                }
            };
            t.default = o;
        }).call(this, n("543d").default);
    }
}, [ [ "1d87", "common/runtime", "common/vendor" ] ] ]);