(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/order/userAgreement/userAgreement" ], {
    2911: function(e, n, t) {
        t.d(n, "b", function() {
            return c;
        }), t.d(n, "c", function() {
            return u;
        }), t.d(n, "a", function() {});
        var c = function() {
            var e = this;
            e.$createElement;
            e._self._c;
        }, u = [];
    },
    "64d4": function(e, n, t) {
        t.r(n);
        var c = t("2911"), u = t("df8b");
        for (var o in u) "default" !== o && function(e) {
            t.d(n, e, function() {
                return u[e];
            });
        }(o);
        t("6b82");
        var r = t("f0c5"), a = Object(r.a)(u.default, c.b, c.c, !1, null, null, null, !1, c.a, void 0);
        n.default = a.exports;
    },
    "6b82": function(e, n, t) {
        var c = t("9ce0");
        t.n(c).a;
    },
    8593: function(e, n, t) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var c = {
            data: function() {
                return {
                    agreement: ""
                };
            },
            onLoad: function() {
                this.getRecyclingAgreement();
            },
            methods: {
                getRecyclingAgreement: function() {
                    var e = this;
                    this.$http.get("/recovery/agreement/public/getRecyclingAgreement").then(function(n) {
                        n.code == e.$configs.httpSuccessStatus && (e.agreement = n.data);
                    }).catch(function(n) {
                        e.$tips.toast(n.message), console.log("失败", n);
                    });
                }
            }
        };
        n.default = c;
    },
    "8dcd": function(e, n, t) {
        (function(e) {
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            t("b544"), n(t("66fd")), e(n(t("64d4")).default);
        }).call(this, t("543d").createPage);
    },
    "9ce0": function(e, n, t) {},
    df8b: function(e, n, t) {
        t.r(n);
        var c = t("8593"), u = t.n(c);
        for (var o in c) "default" !== o && function(e) {
            t.d(n, e, function() {
                return c[e];
            });
        }(o);
        n.default = u.a;
    }
}, [ [ "8dcd", "common/runtime", "common/vendor" ] ] ]);