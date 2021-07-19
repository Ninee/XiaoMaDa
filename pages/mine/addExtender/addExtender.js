(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/mine/addExtender/addExtender" ], {
    "1b11": function(t, e, n) {
        n.r(e);
        var a = n("92a7"), i = n("b4de");
        for (var o in i) "default" !== o && function(t) {
            n.d(e, t, function() {
                return i[t];
            });
        }(o);
        n("2577");
        var s = n("f0c5"), u = Object(s.a)(i.default, a.b, a.c, !1, null, null, null, !1, a.a, void 0);
        e.default = u.exports;
    },
    "1e08": function(t, e, n) {
        (function(t) {
            function e(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            n("b544"), e(n("66fd")), t(e(n("1b11")).default);
        }).call(this, n("543d").createPage);
    },
    2577: function(t, e, n) {
        var a = n("7155");
        n.n(a).a;
    },
    7155: function(t, e, n) {},
    "92a7": function(t, e, n) {
        n.d(e, "b", function() {
            return a;
        }), n.d(e, "c", function() {
            return i;
        }), n.d(e, "a", function() {});
        var a = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, i = [];
    },
    b4de: function(t, e, n) {
        n.r(e);
        var a = n("c8c1"), i = n.n(a);
        for (var o in a) "default" !== o && function(t) {
            n.d(e, t, function() {
                return a[t];
            });
        }(o);
        e.default = i.a;
    },
    c8c1: function(t, e, n) {
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var n = {
                data: function() {
                    return {
                        tel: "",
                        name: "",
                        agent_subject_id: null,
                        userInfo: {},
                        isClick: !1
                    };
                },
                onLoad: function(t) {
                    var e = this, n = decodeURIComponent(t.q);
                    n = (n = n.split("?"))[1].split("="), this.agent_subject_id = n[1], this.$authHelper.login().then(function(t) {
                        t.code == e.$configs.httpSuccessStatus && e.getUserInfo();
                    });
                },
                methods: {
                    getUserInfo: function() {
                        var t = this;
                        this.$tips.loading(), this.$http.post("/terminal/user/getTerminalUserInfo").then(function(e) {
                            t.$tips.loaded(), t.userInfo = e.data, e.data && 1 == e.data.is_promoter ? (t.tel = e.data.user_tel, 
                            t.name = e.data.real_name, t.isClick = !0) : t.isClick = !1;
                        }).catch(function(e) {
                            t.$tips.toast(e.message || "网络异常");
                        });
                    },
                    submit: function() {
                        var t = this;
                        if ("" != this.name) if (/^1[3456789]\d{9}$/.test(this.tel)) {
                            var e = {
                                agent_subject_id: this.agent_subject_id,
                                real_name: this.name,
                                user_tel: this.tel
                            };
                            this.$tips.loading(), this.$http.post("/promoter/addPromoter", e).then(function(e) {
                                t.$tips.loaded(), e.code == t.$configs.httpSuccessStatus ? t.$tips.toast("注册成功", function() {
                                    t.getUserInfo();
                                }) : t.$tips.toast(e.message);
                            }).catch(function(e) {
                                t.$tips.loaded(), t.$tips.toast(e.message || "网络异常"), console.log("异常", e);
                            });
                        } else this.$tips.toast("请正确填写手机号"); else this.$tips.toast("姓名不能为空");
                    },
                    toCode: function() {
                        t.navigateTo({
                            url: "../extendCode/extendCode"
                        });
                    }
                }
            };
            e.default = n;
        }).call(this, n("543d").default);
    }
}, [ [ "1e08", "common/runtime", "common/vendor" ] ] ]);