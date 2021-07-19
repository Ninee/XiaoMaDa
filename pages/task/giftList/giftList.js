(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/task/giftList/giftList" ], {
    "2a5c": function(t, n, o) {
        (function(t) {
            function n(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            o("b544"), n(o("66fd")), t(n(o("eb74")).default);
        }).call(this, o("543d").createPage);
    },
    "44e2": function(t, n, o) {
        var e = o("f489");
        o.n(e).a;
    },
    5434: function(t, n, o) {
        o.r(n);
        var e = o("bb42"), a = o.n(e);
        for (var c in e) "default" !== c && function(t) {
            o.d(n, t, function() {
                return e[t];
            });
        }(c);
        n.default = a.a;
    },
    "7c2b": function(t, n, o) {
        o.d(n, "b", function() {
            return e;
        }), o.d(n, "c", function() {
            return a;
        }), o.d(n, "a", function() {});
        var e = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, a = [];
    },
    bb42: function(t, n, o) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var e = {
            data: function() {
                return {
                    noMore: !1,
                    cursor: 1,
                    size: 10,
                    list: []
                };
            },
            onLoad: function() {
                this.getData();
            },
            methods: {
                getData: function() {
                    var t = this, n = this, o = {
                        cursor: this.cursor,
                        size: this.size
                    };
                    this.$http.post("/terminal/task/yetHavePrizeList", o).then(function(o) {
                        o.code == t.$configs.httpSuccessStatus ? 0 == o.data.length ? (t.cursor > 1 && (t.cursor -= 1), 
                        t.noMore = !0) : o.data.forEach(function(t) {
                            n.list.push(t);
                        }) : t.$tips.toast(o.message);
                    }).catch(function(n) {
                        t.$tips.loaded(), console.log("失败", n);
                    });
                },
                onReachBottom: function() {
                    this.noMore || (this.cursor += 1, console.log("到底了"), this.getData());
                }
            }
        };
        n.default = e;
    },
    eb74: function(t, n, o) {
        o.r(n);
        var e = o("7c2b"), a = o("5434");
        for (var c in a) "default" !== c && function(t) {
            o.d(n, t, function() {
                return a[t];
            });
        }(c);
        o("44e2");
        var i = o("f0c5"), u = Object(i.a)(a.default, e.b, e.c, !1, null, null, null, !1, e.a, void 0);
        n.default = u.exports;
    },
    f489: function(t, n, o) {}
}, [ [ "2a5c", "common/runtime", "common/vendor" ] ] ]);