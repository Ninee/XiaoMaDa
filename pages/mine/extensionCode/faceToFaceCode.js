(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/mine/extensionCode/faceToFaceCode" ], {
    "0ade": function(t, e, i) {
        (function(t) {
            function n(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            function o(t, e, i, n, o, a, s) {
                try {
                    var r = t[a](s), c = r.value;
                } catch (t) {
                    return void i(t);
                }
                r.done ? e(c) : Promise.resolve(c).then(n, o);
            }
            function a(t) {
                return function() {
                    var e = this, i = arguments;
                    return new Promise(function(n, a) {
                        function s(t) {
                            o(c, n, a, s, r, "next", t);
                        }
                        function r(t) {
                            o(c, n, a, s, r, "throw", t);
                        }
                        var c = t.apply(e, i);
                        s(void 0);
                    });
                };
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var s = n(i("a34a")), r = n(i("0b27")), c = i("f2d7"), u = {
                data: function() {
                    return {
                        user_infos: {},
                        invite_task_list: {},
                        qrCodeUrl: "",
                        posterData: {
                            posterBgUrl: ""
                        },
                        posterResult: {
                            finalPath: ""
                        },
                        posterSimpleData: {},
                        is_share: !1,
                        left_line: "",
                        right_line: "",
                        user_head_img: "",
                        network_imgs: [ "yaoqing_poster_bg", "mrys_yaoqingjiang_linel", "mrys_yaoqingjiang_linr", "mrys_tuser_defaultHeader" ],
                        ad_code: "",
                        lng: "",
                        lat: "",
                        invite_price: ""
                    };
                },
                onLoad: function(e) {
                    var i = this;
                    if (e.id && this.$authHelper.setTerminalShareId(e.id, 4), this.$authHelper.setTerminalPromoId(e.q), 
                    e && (e.q || e.id)) this.is_share = !0; else {
                        this.getUserInfo();
                        var n = this;
                        this.network_imgs.forEach(function(t, e) {
                            n.downImg(t).then(function(t) {
                                0 == e ? n.posterData.posterBgUrl = t.tempFilePath : 1 == e ? n.left_line = t.tempFilePath : 2 == e && (n.right_line = t.tempFilePath);
                            });
                        });
                    }
                    this.getPositionAndAuth().then(function() {
                        i.invitationOrderMinPriceTaskList();
                    }).catch(function(e) {
                        t.reLaunch({
                            url: "/pages/index/index"
                        });
                    });
                },
                computed: {
                    shareBtn: function() {
                        return this.qrCodeUrl && this.posterData.posterBgUrl && this.left_line && this.right_line;
                    }
                },
                methods: {
                    getUserInfo: function() {
                        var e = this, i = this;
                        this.$tips.loading(), this.$http.post("/terminal/user/getTerminalUserInfo").then(function(n) {
                            if (n.code == e.$configs.httpSuccessStatus) {
                                e.user_infos = n.data;
                                var o = n.data.pic;
                                o && (o = o.split("/"), o = o.splice(3).join("/"), o = "https://thirdwx.qlogo.cn/" + o, 
                                t.downloadFile({
                                    url: o,
                                    success: function(t) {
                                        200 === t.statusCode && (i.user_head_img = t.tempFilePath);
                                    },
                                    fail: function(t) {
                                        console.log("err", t);
                                    }
                                })), e.make();
                            } else e.$tips.toast(n.message);
                        }).catch(function(t) {
                            e.$tips.loaded(), e.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                        });
                    },
                    invitationOrderMinPriceTaskList: function() {
                        var e = this;
                        this.$http.get("/terminal/task/public/invitationOrderMinPriceTaskList?admin_key=" + this.$configs.adminKey + "&ad_code=" + this.ad_code + "&lng=" + this.lng + "&lat=" + this.lat).then(function(i) {
                            i.code == e.$configs.httpSuccessStatus && i.data ? (e.invite_task_list = i.data, 
                            e.invite_price = i.data.first_prize.prize[0].value) : e.$tips.toast("该区域暂未开放", function() {
                                t.reLaunch({
                                    url: "/pages/index/index"
                                });
                            });
                        }).catch(function(t) {
                            e.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                        });
                    },
                    getPositionAndAuth: function() {
                        var e = this, i = this;
                        return new Promise(function(n, o) {
                            e.$openHelper.getPosition().then(function(t) {
                                t.code == e.$configs.httpSuccessStatus && (i.ad_code = t.data.area_id, i.lng = t.data.lng, 
                                i.lat = t.data.lat, n(t.data));
                            }).catch(function(e) {
                                t.showModal({
                                    content: "授权位置后查看您的红包，是否去设置打开？",
                                    success: function(e) {
                                        e.confirm ? t.openSetting({
                                            success: function(t) {
                                                t.authSetting["scope.userLocation"] && i.getPositionAndAuth();
                                            }
                                        }) : e.cancel && o({
                                            cancel: "用户点击取消"
                                        });
                                    }
                                });
                            });
                        });
                    },
                    make: function() {
                        var t = this;
                        r.default.make({
                            canvasId: "qrcode",
                            componentInstance: t,
                            text: t.$configs.yqUserCode + "?id=" + t.user_infos.id,
                            size: 200,
                            margin: 12,
                            backgroundColor: "#ffffff",
                            foregroundColor: "#000000",
                            fileType: "jpg",
                            correctLevel: r.default.errorCorrectLevel.L,
                            success: function(e) {
                                t.qrCodeUrl = e;
                            },
                            complete: function() {
                                t.$tips.loaded();
                            }
                        });
                    },
                    makeMyPoster: function() {
                        var t = this;
                        return a(s.default.mark(function e() {
                            var i, n;
                            return s.default.wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                  case 0:
                                    return i = t, e.next = 3, (0, c.getSharePoster)({
                                        _this: i,
                                        type: "mySharePoster",
                                        backgroundImage: i.posterData.posterBgUrl,
                                        posterCanvasId: "mySharePoster",
                                        delayTimeScale: 20,
                                        setCanvasWH: function(t) {
                                            var e = t.bgObj;
                                            i.posterResult = e;
                                        },
                                        drawArray: function(t) {
                                            var e = t.bgObj, n = (t.type, t.bgScale, t.setBgObj, t.getBgOb, e.width, .08 * e.width);
                                            return e.height, i.invite_task_list.first_order_prize ? new Promise(function(t, o) {
                                                t([ {
                                                    type: "text",
                                                    fontWeight: "bold",
                                                    text: "邀好友得" + i.invite_price + "元奖励",
                                                    size: n + n / 3,
                                                    color: "#FFD88D",
                                                    alpha: 1,
                                                    textAlign: "center",
                                                    textBaseline: "middle",
                                                    infoCallBack: function(t) {
                                                        return {
                                                            dx: e.width / 2,
                                                            dy: .12 * e.height
                                                        };
                                                    },
                                                    serialNum: 0,
                                                    id: "text1"
                                                }, {
                                                    type: "text",
                                                    fontWeight: "bold",
                                                    text: "好友首单得" + i.invite_task_list.first_order_prize.prize[0].value + "元奖励",
                                                    size: n - n / 3,
                                                    color: "#FFD88D",
                                                    alpha: 1,
                                                    textAlign: "center",
                                                    textBaseline: "middle",
                                                    infoCallBack: function(t) {
                                                        return {
                                                            dx: e.width / 2,
                                                            dy: .19 * e.height
                                                        };
                                                    },
                                                    serialNum: 1,
                                                    id: "text2"
                                                }, {
                                                    type: "image",
                                                    url: i.left_line,
                                                    dWidth: n + n / 6,
                                                    dHeight: .07 * n,
                                                    infoCallBack: function(t) {
                                                        return {
                                                            dx: 2 * n,
                                                            dy: .185 * e.height
                                                        };
                                                    },
                                                    serialNum: 2,
                                                    id: "image1"
                                                }, {
                                                    type: "image",
                                                    url: i.right_line,
                                                    dWidth: n + n / 6,
                                                    dHeight: .07 * n,
                                                    infoCallBack: function(t) {
                                                        return {
                                                            dx: .753 * e.width,
                                                            dy: .185 * e.height
                                                        };
                                                    },
                                                    serialNum: 2,
                                                    id: "image2"
                                                }, {
                                                    type: "image",
                                                    url: i.user_head_img || "/static/mine/defaultHeader.png",
                                                    dWidth: 1.6 * n,
                                                    dHeight: 1.6 * n,
                                                    circleSet: !0,
                                                    infoCallBack: function(t) {
                                                        return {
                                                            dx: e.width / 2 - 1.6 * n / 2,
                                                            dy: .228 * e.height
                                                        };
                                                    },
                                                    serialNum: 0,
                                                    id: "image3"
                                                }, {
                                                    type: "image",
                                                    url: i.qrCodeUrl,
                                                    dWidth: .41 * e.width,
                                                    dHeight: .41 * e.width,
                                                    infoCallBack: function(t) {
                                                        return {
                                                            dx: e.width / 2 - .41 * e.width / 2,
                                                            dy: .45 * e.height
                                                        };
                                                    },
                                                    serialNum: 0,
                                                    id: "qrcode1"
                                                } ]);
                                            }) : new Promise(function(t, o) {
                                                t([ {
                                                    type: "text",
                                                    fontWeight: "bold",
                                                    text: "邀好友得" + i.invite_price + "元奖励",
                                                    size: n + n / 3,
                                                    color: "#FFD88D",
                                                    alpha: 1,
                                                    textAlign: "center",
                                                    textBaseline: "middle",
                                                    infoCallBack: function(t) {
                                                        return {
                                                            dx: e.width / 2,
                                                            dy: .12 * e.height
                                                        };
                                                    },
                                                    serialNum: 0,
                                                    id: "text1"
                                                }, {
                                                    type: "image",
                                                    url: i.user_head_img || "/static/mine/defaultHeader.png",
                                                    dWidth: 1.6 * n,
                                                    dHeight: 1.6 * n,
                                                    circleSet: !0,
                                                    infoCallBack: function(t) {
                                                        return {
                                                            dx: e.width / 2 - 1.6 * n / 2,
                                                            dy: .228 * e.height
                                                        };
                                                    },
                                                    serialNum: 0,
                                                    id: "image3"
                                                }, {
                                                    type: "image",
                                                    url: i.qrCodeUrl,
                                                    dWidth: .41 * e.width,
                                                    dHeight: .41 * e.width,
                                                    infoCallBack: function(t) {
                                                        return {
                                                            dx: e.width / 2 - .41 * e.width / 2,
                                                            dy: .45 * e.height
                                                        };
                                                    },
                                                    serialNum: 0,
                                                    id: "qrcode1"
                                                } ]);
                                            });
                                        }
                                    });

                                  case 3:
                                    n = e.sent, i.$set(i.posterResult, "finalPath", n.poster.tempFilePath), i.saveImg();

                                  case 6:
                                  case "end":
                                    return e.stop();
                                }
                            }, e);
                        }))();
                    },
                    saveImg: function() {
                        var e = this;
                        t.authorize({
                            scope: "scope.writePhotosAlbum",
                            success: function(i) {
                                t.saveImageToPhotosAlbum({
                                    filePath: e.posterResult.finalPath,
                                    success: function() {
                                        e.$tips.toast("保存成功");
                                    }
                                });
                            },
                            fail: function() {
                                t.showModal({
                                    content: "检测到您没有打开相册权限，是否去设置打开？",
                                    success: function(i) {
                                        i.confirm ? t.openSetting({
                                            success: function(t) {
                                                t.authSetting["scope.writePhotosAlbum"] && e.saveImg();
                                            }
                                        }) : i.cancel && e.$tips.toast("保存失败，请打开相册权限");
                                    }
                                });
                            }
                        });
                    },
                    saveEvn: function() {
                        this.$tips.toast("正在保存中..."), this.posterResult && this.posterResult.finalPath && "" != this.posterResult.finalPath ? this.saveImg() : this.makeMyPoster();
                    },
                    lookRules: function() {
                        this.$refs.rulesPopup.open();
                    },
                    toSharePage: function() {
                        t.redirectTo({
                            url: "./extensionCode?name=toIndex"
                        });
                    },
                    toIndexPage: function() {
                        t.reLaunch({
                            url: "/pages/index/index"
                        });
                    },
                    downImg: function(e) {
                        var i = this;
                        return new Promise(function(n) {
                            t.downloadFile({
                                url: i.$configs.networkImgs.searchImg(e),
                                success: function(t) {
                                    200 === t.statusCode && n(t);
                                }
                            });
                        });
                    }
                }
            };
            e.default = u;
        }).call(this, i("543d").default);
    },
    "1be0": function(t, e, i) {
        i.r(e);
        var n = i("2b52"), o = i("47a5");
        for (var a in o) "default" !== a && function(t) {
            i.d(e, t, function() {
                return o[t];
            });
        }(a);
        i("c315");
        var s = i("f0c5"), r = Object(s.a)(o.default, n.b, n.c, !1, null, null, null, !1, n.a, void 0);
        e.default = r.exports;
    },
    "2b52": function(t, e, i) {
        i.d(e, "b", function() {
            return o;
        }), i.d(e, "c", function() {
            return a;
        }), i.d(e, "a", function() {
            return n;
        });
        var n = {
            uniPopup: function() {
                return Promise.all([ i.e("common/vendor"), i.e("components/uni-popup/uni-popup") ]).then(i.bind(null, "8575"));
            }
        }, o = function() {
            var t = this, e = (t.$createElement, t._self._c, t.is_share ? null : t.$configs.networkImgs.searchImg("yaoqingjiang_bj")), i = !t.is_share && e ? t.$configs.networkImgs.searchImg("yaoqingjiang_bj") : null, n = t.is_share ? t.$configs.networkImgs.searchImg("yaoqingjiang_bj") : null, o = t.is_share && n ? t.$configs.networkImgs.searchImg("yaoqingjiang_bj") : null, a = t.is_share && n ? t.$configs.networkImgs.searchImg("yaoqingjiang_bj_hongbao") : null, s = t.is_share && n && a ? t.$configs.networkImgs.searchImg("yaoqingjiang_bj_hongbao") : null;
            t._isMounted || (t.e0 = function(e) {
                return t.$refs.rulesPopup.close();
            }), t.$mp.data = Object.assign({}, {
                $root: {
                    g0: e,
                    g1: i,
                    g2: n,
                    g3: o,
                    g4: a,
                    g5: s
                }
            });
        }, a = [];
    },
    3050: function(t, e, i) {},
    "47a5": function(t, e, i) {
        i.r(e);
        var n = i("0ade"), o = i.n(n);
        for (var a in n) "default" !== a && function(t) {
            i.d(e, t, function() {
                return n[t];
            });
        }(a);
        e.default = o.a;
    },
    c315: function(t, e, i) {
        var n = i("3050");
        i.n(n).a;
    },
    e5a4: function(t, e, i) {
        (function(t) {
            function e(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            i("b544"), e(i("66fd")), t(e(i("1be0")).default);
        }).call(this, i("543d").createPage);
    }
}, [ [ "e5a4", "common/runtime", "common/vendor" ] ] ]);