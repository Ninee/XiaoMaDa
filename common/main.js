(global.webpackJsonp = global.webpackJsonp || []).push([ [ "common/main" ], {
    6690: function(e, t, n) {
        var o = n("a6bd");
        n.n(o).a;
    },
    "7de3": function(e, t, n) {
        n.r(t);
        var o = n("8e0e");
        for (var u in o) "default" !== u && function(e) {
            n.d(t, e, function() {
                return o[e];
            });
        }(u);
        n("6690");
        var a = n("f0c5"), c = Object(a.a)(o.default, void 0, void 0, !1, null, null, null, !1, void 0, void 0);
        t.default = c.exports;
    },
    "861a": function(e, t, n) {
        (function(e) {
            function t(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            function o(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    t && (o = o.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                    })), n.push.apply(n, o);
                }
                return n;
            }
            function u(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e;
            }
            n("b544");
            var a = t(n("66fd")), c = t(n("7de3")), i = t(n("8196")), l = t(n("eecf")), r = t(n("18b0")), f = t(n("0d40")), p = t(n("20e3")), d = t(n("6153"));
            a.default.config.productionTip = !1, a.default.http = i.default, a.default.prototype.$http = i.default, 
            a.default.tips = r.default, a.default.prototype.$tips = r.default, a.default.configs = l.default, 
            a.default.prototype.$configs = l.default, a.default.authHelper = f.default, a.default.prototype.$authHelper = f.default, 
            a.default.openHelper = p.default, a.default.prototype.$openHelper = p.default, a.default.myUtil = d.default, 
            a.default.prototype.$myUtil = d.default, a.default.component("uniPopup", function() {
                Promise.all([ n.e("common/vendor"), n.e("components/uni-popup/uni-popup") ]).then(function() {
                    return resolve(n("8575"));
                }.bind(null, n)).catch(n.oe);
            }), a.default.component("uniPopupMessage", function() {
                n.e("components/uni-popup/uni-popup-message").then(function() {
                    return resolve(n("de7f"));
                }.bind(null, n)).catch(n.oe);
            }), a.default.component("uniPopupDialog", function() {
                n.e("components/uni-popup/uni-popup-dialog").then(function() {
                    return resolve(n("152f"));
                }.bind(null, n)).catch(n.oe);
            }), a.default.component("commonLogin", function() {
                n.e("components/common/login").then(function() {
                    return resolve(n("e74f"));
                }.bind(null, n)).catch(n.oe);
            }), a.default.component("pickUping", function() {
                n.e("components/common/pickUpingBtn").then(function() {
                    return resolve(n("a0bd"));
                }.bind(null, n)).catch(n.oe);
            }), a.default.component("notices", function() {
                n.e("components/common/notices").then(function() {
                    return resolve(n("e43d"));
                }.bind(null, n)).catch(n.oe);
            }), c.default.mpType = "app", e(new a.default(function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? o(Object(n), !0).forEach(function(t) {
                        u(e, t, n[t]);
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                    });
                }
                return e;
            }({}, c.default))).$mount();
        }).call(this, n("543d").createApp);
    },
    "8e0e": function(e, t, n) {
        n.r(t);
        var o = n("990f"), u = n.n(o);
        for (var a in o) "default" !== a && function(e) {
            n.d(t, e, function() {
                return o[e];
            });
        }(a);
        t.default = u.a;
    },
    "990f": function(e, t, n) {
        (function(e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = {
                onLaunch: function() {},
                globalData: {
                    navHeight: 0,
                    position: {}
                },
                onShow: function() {
                    var t = this;
                    if (this.$authHelper.getOpenId(), this.$openHelper.refreshPosition().then(function(e) {
                        e.code == t.$configs.httpSuccessStatus && (t.globalData.position = e.data);
                    }), e.canIUse("getUpdateManager")) {
                        var n = wx.getUpdateManager();
                        n.onCheckForUpdate(function(t) {
                            t.hasUpdate && (n.onUpdateReady(function() {
                                e.showModal({
                                    showCancel: !1,
                                    title: "更新提示",
                                    content: "新版本已经准备好，是否重启应用？",
                                    success: function(e) {
                                        e.confirm && n.applyUpdate();
                                    }
                                });
                            }), n.onUpdateFailed(function() {
                                e.showModal({
                                    title: "已经有新版本了哟~",
                                    content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
                                });
                            }));
                        });
                    } else e.showModal({
                        title: "提示",
                        content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
                    });
                },
                onHide: function() {}
            };
            t.default = n;
        }).call(this, n("543d").default);
    },
    a6bd: function(e, t, n) {}
}, [ [ "861a", "common/runtime", "common/vendor" ] ] ]);