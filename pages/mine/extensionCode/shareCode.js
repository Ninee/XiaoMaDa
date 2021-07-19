(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/mine/extensionCode/shareCode" ], {
    2925: function(e, t, n) {
        (function(e) {
            function t(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            n("b544"), t(n("66fd")), e(t(n("6c71")).default);
        }).call(this, n("543d").createPage);
    },
    "5d2a": function(e, t, n) {
        n.d(t, "b", function() {
            return o;
        }), n.d(t, "c", function() {
            return s;
        }), n.d(t, "a", function() {
            return r;
        });
        var r = {
            uniPopup: function() {
                return Promise.all([ n.e("common/vendor"), n.e("components/uni-popup/uni-popup") ]).then(n.bind(null, "8575"));
            }
        }, o = function() {
            var e = this;
            e.$createElement;
            e._self._c, e._isMounted || (e.e0 = function(t) {
                return e.$refs.shareFriend.close();
            }, e.e1 = function(t) {
                return e.$refs.shareFriend.close();
            }, e.e2 = function(t) {
                return e.$refs.shareFriend.close();
            });
        }, s = [];
    },
    "6c71": function(e, t, n) {
        n.r(t);
        var r = n("5d2a"), o = n("bf0d");
        for (var s in o) "default" !== s && function(e) {
            n.d(t, e, function() {
                return o[e];
            });
        }(s);
        n("cb52");
        var i = n("f0c5"), a = Object(i.a)(o.default, r.b, r.c, !1, null, null, null, !1, r.a, void 0);
        t.default = a.exports;
    },
    "807e": function(e, t, n) {
        (function(e) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            function o(e, t, n, r, o, s, i) {
                try {
                    var a = e[s](i), u = a.value;
                } catch (e) {
                    return void n(e);
                }
                a.done ? t(u) : Promise.resolve(u).then(r, o);
            }
            function s(e) {
                return function() {
                    var t = this, n = arguments;
                    return new Promise(function(r, s) {
                        function i(e) {
                            o(u, r, s, i, a, "next", e);
                        }
                        function a(e) {
                            o(u, r, s, i, a, "throw", e);
                        }
                        var u = e.apply(t, n);
                        i(void 0);
                    });
                };
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var i = r(n("a34a")), a = r(n("0b27")), u = n("f2d7"), c = {
                data: function() {
                    return {
                        navHeight: 0,
                        user_infos: {},
                        qrCodeUrl: "",
                        deliveryFlag: !1,
                        posterData: {
                            posterBgUrl: ""
                        },
                        posterResult: {
                            finalPath: ""
                        },
                        posterSimpleData: {},
                        phone_type: "",
                        bgImg: "",
                        showCanvas: !1,
                        is_share: !1,
                        formFriend: ""
                    };
                },
                onLoad: function(t) {
                    var n = this, r = new Date();
                    if (t && "share" == t.source) return this.is_share = !0, this.formFriend = this.$configs.fromFriendImg + "?r=" + r.getFullYear() + (r.getMonth() + 1) + r.getDate() + r.getHours(), 
                    void e.reLaunch({
                        url: "/pages/index/index?id=" + t.id
                    });
                    this.getUserInfo(), e.getSystemInfo({
                        success: function(e) {
                            n.navHeight = e.statusBarHeight;
                        }
                    }), this.getPhoneType(), this.posterData.posterBgUrl = this.$configs.shareBgUrlBorder + "?r=" + r.getFullYear() + (r.getMonth() + 1) + r.getDate() + r.getHours(), 
                    console.log("this.posterData.posterBgUrl", this.posterData.posterBgUrl), this.bgImg = this.$configs.shareBgUrl + "?r=" + r.getFullYear() + (r.getMonth() + 1) + r.getDate() + r.getHours();
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
                    makeMyPoster: function() {
                        var e = this;
                        return s(i.default.mark(function t() {
                            var n, r;
                            return i.default.wrap(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                  case 0:
                                    return n = e, t.next = 3, (0, u.getSharePoster)({
                                        _this: n,
                                        type: "mySharePoster",
                                        backgroundImage: n.posterData.posterBgUrl,
                                        posterCanvasId: "mySharePoster",
                                        delayTimeScale: 20,
                                        setCanvasWH: function(e) {
                                            var t = e.bgObj;
                                            n.posterResult = t;
                                        },
                                        drawArray: function(e) {
                                            var t = e.bgObj;
                                            return e.type, e.bgScale, e.setBgObj, e.getBgOb, t.width, t.width, t.height, new Promise(function(e, r) {
                                                e([ {
                                                    type: "qrcode",
                                                    text: n.$configs.shareUserCode + "?id=" + n.user_infos.id,
                                                    size: .42 * t.width,
                                                    dx: t.width / 2 - .42 * t.width / 2,
                                                    dy: .41 * t.height,
                                                    serialNum: 2,
                                                    id: "qr1"
                                                }, {
                                                    type: "text",
                                                    text: "长按识别专属二维码",
                                                    size: .04 * t.width,
                                                    color: "#666666",
                                                    alpha: 1,
                                                    textAlign: "center",
                                                    textBaseline: "middle",
                                                    allInfoCallback: function() {
                                                        var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).drawArray.find(function(e) {
                                                            return "qr1" === e.id;
                                                        });
                                                        return new Promise(function(n, r) {
                                                            setTimeout(function() {
                                                                n({
                                                                    dx: t.width / 2,
                                                                    dy: e.dy + e.size + .06 * t.height
                                                                });
                                                            }, 1);
                                                        });
                                                    },
                                                    serialNum: 3,
                                                    id: "text3"
                                                } ]);
                                            });
                                        }
                                    });

                                  case 3:
                                    r = t.sent, n.$set(n.posterResult, "finalPath", r.poster.tempFilePath);

                                  case 5:
                                  case "end":
                                    return t.stop();
                                }
                            }, t);
                        }))();
                    },
                    getUserInfo: function() {
                        var e = this;
                        this.$http.post("/terminal/user/getTerminalUserInfo").then(function(t) {
                            t.code == e.$configs.httpSuccessStatus ? (e.user_infos = t.data, e.make()) : e.$tips.toast(t.message);
                        }).catch(function(t) {
                            e.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                        });
                    },
                    make: function() {
                        this.$tips.loading("努力绘制中");
                        var e = this;
                        a.default.make({
                            canvasId: "qrcode",
                            componentInstance: e,
                            text: e.$configs.shareUserCode + "?id=" + e.user_infos.id,
                            size: 200,
                            margin: 12,
                            backgroundColor: "#ffffff",
                            foregroundColor: "#000000",
                            fileType: "jpg",
                            correctLevel: a.default.errorCorrectLevel.L,
                            success: function(t) {
                                e.qrCodeUrl = t, e.posterData.posterCodeUrl = t;
                            },
                            complete: function() {
                                e.$tips.loaded();
                            }
                        });
                    },
                    getPhoneType: function() {
                        var t = this;
                        e.getSystemInfo({
                            success: function(e) {
                                t.phone_type = e.platform, console.log("_that.phone_type", t.phone_type);
                            }
                        });
                    },
                    shareFriend: function() {
                        this.deliveryFlag = !1, this.$refs.shareFriend.open();
                    },
                    handleShowPoster: function() {
                        this.deliveryFlag = !1;
                    },
                    shareEvn: function() {
                        this.posterResult && this.posterResult.finalPath && "" != this.posterResult.finalPath || this.makeMyPoster(), 
                        this.$refs.share.open();
                    },
                    close_pop: function() {
                        this.$refs.share.close();
                    },
                    saveImg: function() {
                        this.$tips.toast("正在保存中...");
                        var t = this;
                        e.saveImageToPhotosAlbum({
                            filePath: t.posterResult.finalPath,
                            success: function() {
                                t.$refs.share.close(), t.$tips.toast("保存成功");
                            }
                        });
                    }
                }
            };
            t.default = c;
        }).call(this, n("543d").default);
    },
    "91f2": function(e, t, n) {},
    bf0d: function(e, t, n) {
        n.r(t);
        var r = n("807e"), o = n.n(r);
        for (var s in r) "default" !== s && function(e) {
            n.d(t, e, function() {
                return r[e];
            });
        }(s);
        t.default = o.a;
    },
    cb52: function(e, t, n) {
        var r = n("91f2");
        n.n(r).a;
    }
}, [ [ "2925", "common/runtime", "common/vendor" ] ] ]);