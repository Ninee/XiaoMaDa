(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/mine/extendCode/extendCode" ], {
    "04cc": function(e, n, t) {
        var o = t("7d8f");
        t.n(o).a;
    },
    3749: function(e, n, t) {
        t.r(n);
        var o = t("d1ae"), a = t("5f02");
        for (var r in a) "default" !== r && function(e) {
            t.d(n, e, function() {
                return a[e];
            });
        }(r);
        t("04cc");
        var f = t("f0c5"), i = Object(f.a)(a.default, o.b, o.c, !1, null, null, null, !1, o.a, void 0);
        n.default = i.exports;
    },
    "4aba": function(e, n, t) {
        (function(e) {
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            t("b544"), n(t("66fd")), e(n(t("3749")).default);
        }).call(this, t("543d").createPage);
    },
    "5b3a": function(e, n, t) {
        (function(e) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.default = void 0;
            var o = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }(t("0b27")), a = {
                data: function() {
                    return {
                        user_infos: {},
                        qrCodeUrl: ""
                    };
                },
                onLoad: function() {
                    console.log("this.qrCodeUrl='';", this.qrCodeUrl), this.getUserInfor();
                },
                onUnload: function() {
                    this.qrCodeUrl = "";
                },
                methods: {
                    toLookData: function() {
                        e.navigateTo({
                            url: "../extendDataList/extendDataList"
                        });
                    },
                    getUserInfor: function() {
                        var e = this;
                        this.$tips.loading(), this.$http.post("/terminal/user/getTerminalUserInfo").then(function(n) {
                            e.$tips.loaded(), n.code == e.$configs.httpSuccessStatus && (e.user_infos = n.data, 
                            e.make());
                        }).catch(function(n) {
                            e.$tips.loaded(), e.$tips.toast(n.message), console.log("失败", n);
                        });
                    },
                    make: function() {
                        var e = this;
                        o.default.make({
                            canvasId: "qrcode",
                            componentInstance: e,
                            text: e.$configs.promoCode + "?id=" + e.user_infos.promoter_info_id,
                            size: 200,
                            margin: 12,
                            backgroundColor: "#ffffff",
                            foregroundColor: "#000000",
                            fileType: "jpg",
                            correctLevel: o.default.errorCorrectLevel.L,
                            success: function(n) {
                                e.qrCodeUrl = n, console.log("asdf", n, e.qrCodeUrl);
                            }
                        });
                    }
                }
            };
            n.default = a;
        }).call(this, t("543d").default);
    },
    "5f02": function(e, n, t) {
        t.r(n);
        var o = t("5b3a"), a = t.n(o);
        for (var r in o) "default" !== r && function(e) {
            t.d(n, e, function() {
                return o[e];
            });
        }(r);
        n.default = a.a;
    },
    "7d8f": function(e, n, t) {},
    d1ae: function(e, n, t) {
        t.d(n, "b", function() {
            return o;
        }), t.d(n, "c", function() {
            return a;
        }), t.d(n, "a", function() {});
        var o = function() {
            var e = this;
            e.$createElement;
            e._self._c;
        }, a = [];
    }
}, [ [ "4aba", "common/runtime", "common/vendor" ] ] ]);