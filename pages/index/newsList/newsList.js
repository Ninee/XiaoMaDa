(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/index/newsList/newsList" ], {
    "32cc": function(n, t, e) {
        var o = e("6e1f");
        e.n(o).a;
    },
    "3f28": function(n, t, e) {
        (function(n) {
            function t(n) {
                return n && n.__esModule ? n : {
                    default: n
                };
            }
            e("b544"), t(e("66fd")), n(t(e("fd96")).default);
        }).call(this, e("543d").createPage);
    },
    "686f": function(n, t, e) {
        e.r(t);
        var o = e("9dcc"), i = e.n(o);
        for (var s in o) "default" !== s && function(n) {
            e.d(t, n, function() {
                return o[n];
            });
        }(s);
        t.default = i.a;
    },
    "6e1f": function(n, t, e) {},
    "9dcc": function(n, t, e) {
        (function(n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var e = {
                data: function() {
                    return {
                        noMore: !1,
                        cursor: 1,
                        size: 10,
                        news: []
                    };
                },
                onShow: function() {
                    this.news = [], this.cursor = 1, this.noMore = !1, this.getNewsImg();
                },
                onShareAppMessage: function() {
                    return {
                        title: "手机点一点，废品上门收",
                        path: "/pages/index/newsList/newsList",
                        imageUrl: "http://files.pay.dianjishenghuo.cn/mrys_share_to_friends.jpg"
                    };
                },
                onShareTimeline: function() {
                    return {
                        title: "手机点一点，废品上门收",
                        query: "",
                        imageUrl: ""
                    };
                },
                methods: {
                    getNewsImg: function() {
                        var n = this, t = this;
                        this.$tips.loading(), this.$http.post("/news/information/public/getNewsInformationList", {
                            admin_key: this.$configs.adminKey,
                            cursor: this.cursor,
                            size: this.size
                        }).then(function(e) {
                            n.$tips.loaded(), console.log("获取新闻资讯数据", e), e.code == n.$configs.httpSuccessStatus ? 0 == e.data.length ? (n.cursor > 1 && (n.cursor -= 1), 
                            n.noMore = !0) : (e.data.forEach(function(n) {
                                t.news.push(n);
                            }), console.log("this.news", n.news)) : n.$tips.toast(e.message);
                        }).catch(function(t) {
                            n.$tips.loaded(), n.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                        });
                    },
                    toLookNews: function(t) {
                        n.navigateTo({
                            url: "./lookNews?admin_subject_id=" + t.admin_subject_id + "&id=" + t.id
                        });
                    }
                },
                onReachBottom: function() {
                    this.noMore || (this.cursor += 1, console.log("到底了"), this.getNewsImg());
                }
            };
            t.default = e;
        }).call(this, e("543d").default);
    },
    df6f: function(n, t, e) {
        e.d(t, "b", function() {
            return o;
        }), e.d(t, "c", function() {
            return i;
        }), e.d(t, "a", function() {});
        var o = function() {
            var n = this;
            n.$createElement;
            n._self._c;
        }, i = [];
    },
    fd96: function(n, t, e) {
        e.r(t);
        var o = e("df6f"), i = e("686f");
        for (var s in i) "default" !== s && function(n) {
            e.d(t, n, function() {
                return i[n];
            });
        }(s);
        e("32cc");
        var c = e("f0c5"), a = Object(c.a)(i.default, o.b, o.c, !1, null, null, null, !1, o.a, void 0);
        t.default = a.exports;
    }
}, [ [ "3f28", "common/runtime", "common/vendor" ] ] ]);