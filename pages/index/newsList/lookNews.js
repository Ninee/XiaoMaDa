(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/index/newsList/lookNews" ], {
    "2c74": function(t, n, e) {
        e.r(n);
        var i = e("4c3f"), a = e("c7ba");
        for (var s in a) "default" !== s && function(t) {
            e.d(n, t, function() {
                return a[t];
            });
        }(s);
        e("56d4");
        var c = e("f0c5"), o = Object(c.a)(a.default, i.b, i.c, !1, null, null, null, !1, i.a, void 0);
        n.default = o.exports;
    },
    "4c3f": function(t, n, e) {
        e.d(n, "b", function() {
            return i;
        }), e.d(n, "c", function() {
            return a;
        }), e.d(n, "a", function() {});
        var i = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, a = [];
    },
    "56d4": function(t, n, e) {
        var i = e("cfd5");
        e.n(i).a;
    },
    "9b8b": function(t, n, e) {
        (function(t) {
            function n(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            e("b544"), n(e("66fd")), t(n(e("2c74")).default);
        }).call(this, e("543d").createPage);
    },
    c7ba: function(t, n, e) {
        e.r(n);
        var i = e("f843"), a = e.n(i);
        for (var s in i) "default" !== s && function(t) {
            e.d(n, t, function() {
                return i[t];
            });
        }(s);
        n.default = a.a;
    },
    cfd5: function(t, n, e) {},
    f843: function(t, n, e) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var i = {
            data: function() {
                return {
                    news_data: [],
                    admin_subject_id: 0,
                    id: 0,
                    news_content: ""
                };
            },
            onLoad: function(t) {
                console.log("opt", t), t && t.admin_subject_id && t.id && (this.admin_subject_id = t.admin_subject_id, 
                this.id = t.id), this.getData();
            },
            onShareAppMessage: function() {
                var t = this;
                return {
                    title: "手机点一点，废品上门收",
                    path: "/pages/index/newsList/lookNews?admin_subject_id=" + t.admin_subject_id + "&id=" + t.id,
                    imageUrl: "http://files.pay.dianjishenghuo.cn/mrys_share_to_friends.jpg"
                };
            },
            onShareTimeline: function() {
                var t = this;
                return {
                    title: "手机点一点，废品上门收",
                    query: "admin_subject_id=" + t.admin_subject_id + "&id=" + t.id,
                    imageUrl: ""
                };
            },
            methods: {
                getData: function() {
                    var t = this;
                    this.$tips.loading(), this.$http.get("/news/information/public/getNewsInformation?admin_subject_id=" + this.admin_subject_id + "&id=" + this.id).then(function(n) {
                        if (t.$tips.loaded(), console.log("获取新闻资讯数据", n), n.code == t.$configs.httpSuccessStatus) {
                            var e = n.data;
                            null != e.news_content && (t.news_content = e.news_content.replace(/\<img/gi, '<img class="rich_img"'), 
                            t.news_content = t.news_content.replace(/\<image/gi, '<image class="rich_img"'));
                            var i = t.news_content.replace(/<img[^>]*>/gi, function(t, n) {
                                return t.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/gi, 'style="width:100%;max-width:100%;height:auto;width: 100vw !important;max-width: 100vw !important;vertical-align: middle;"');
                            });
                            i = t.news_content.replace(/<img[^>]*>/gi, function(t, n) {
                                return t.replace(/class\s*?=\s*?([‘"])[\s\S]*?\1/gi, 'class="rich_img"');
                            }), t.news_content = i, t.news_data = n.data;
                        } else t.$tips.toast(n.message);
                    }).catch(function(n) {
                        t.$tips.loaded(), t.$tips.toast(n.message || "网络异常"), console.log("异常", n);
                    });
                }
            }
        };
        n.default = i;
    }
}, [ [ "9b8b", "common/runtime", "common/vendor" ] ] ]);