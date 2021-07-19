(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/common/login" ], {
    3106: function(n, o, e) {
        e.r(o);
        var t = e("b543"), i = e.n(t);
        for (var c in t) "default" !== c && function(n) {
            e.d(o, n, function() {
                return t[n];
            });
        }(c);
        o.default = i.a;
    },
    b543: function(n, o, e) {
        (function(n) {
            Object.defineProperty(o, "__esModule", {
                value: !0
            }), o.default = void 0;
            var e = {
                name: "login",
                data: function() {
                    return {
                        loginStatus: !1,
                        showProp: !1
                    };
                },
                created: function() {
                    console.log("login初始化created");
                },
                mounted: function() {
                    var o = this;
                    console.log("login初始化mounted");
                    var e = this;
                    e.showProp = !0, n.$on("openLoginLayer", function() {
                        e.$refs.loginProp.open();
                    }), this.$authHelper.login().then(function(n) {
                        n.code == o.$configs.httpSuccessStatus && (o.loginStatus = !0, o.$emit("success", n), 
                        console.log("登陆中..."));
                    });
                },
                destroyed: function() {
                    console.log("login卸载"), this.showProp = !1, n.$off("openLoginLayer");
                },
                methods: {
                    loginPropChange: function(o, e) {
                        o.show || e || (n.switchTab({
                            url: "/pages/index/index"
                        }), this.$emit("fail"));
                    },
                    getPhoneNumber: function(n) {
                        var o = this, e = n.detail.encryptedData, t = n.detail.iv;
                        e && t ? this.$authHelper.reg(e, t).then(function(n) {
                            o.loginStatus = !0, o.$emit("success", n), o.$refs.loginProp.close();
                        }).catch(function() {}) : (this.loginStatus = !1, this.$emit("fail"), this.$refs.loginProp.close());
                    }
                }
            };
            o.default = e;
        }).call(this, e("543d").default);
    },
    c5db: function(n, o, e) {
        e.d(o, "b", function() {
            return i;
        }), e.d(o, "c", function() {
            return c;
        }), e.d(o, "a", function() {
            return t;
        });
        var t = {
            uniPopup: function() {
                return Promise.all([ e.e("common/vendor"), e.e("components/uni-popup/uni-popup") ]).then(e.bind(null, "8575"));
            }
        }, i = function() {
            var n = this;
            n.$createElement;
            n._self._c;
        }, c = [];
    },
    e74f: function(n, o, e) {
        e.r(o);
        var t = e("c5db"), i = e("3106");
        for (var c in i) "default" !== c && function(n) {
            e.d(o, n, function() {
                return i[n];
            });
        }(c);
        var u = e("f0c5"), l = Object(u.a)(i.default, t.b, t.c, !1, null, null, null, !1, t.a, void 0);
        o.default = l.exports;
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/common/login-create-component", {
    "components/common/login-create-component": function(n, o, e) {
        e("543d").createComponent(e("e74f"));
    }
}, [ [ "components/common/login-create-component" ] ] ]);