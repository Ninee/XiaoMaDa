(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/mine/extensionCode/inviteLogs" ], {
    "131b": function(t, n, i) {
        i.d(n, "b", function() {
            return e;
        }), i.d(n, "c", function() {
            return s;
        }), i.d(n, "a", function() {});
        var e = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, s = [];
    },
    "64f3": function(t, n, i) {},
    7268: function(t, n, i) {
        var e = i("64f3");
        i.n(e).a;
    },
    9503: function(t, n, i) {
        i.r(n);
        var e = i("131b"), s = i("d6a1");
        for (var o in s) "default" !== o && function(t) {
            i.d(n, t, function() {
                return s[t];
            });
        }(o);
        i("7268");
        var a = i("f0c5"), c = Object(a.a)(s.default, e.b, e.c, !1, null, null, null, !1, e.a, void 0);
        n.default = c.exports;
    },
    "99f6": function(t, n, i) {
        (function(t) {
            function n(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            i("b544"), n(i("66fd")), t(n(i("9503")).default);
        }).call(this, i("543d").createPage);
    },
    abe0: function(t, n, i) {
        (function(t) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.default = void 0;
            var i = {
                data: function() {
                    return {
                        is_success_invite: !0,
                        my_invitation_list: [],
                        cursor: 1,
                        size: 10,
                        noMore: !1,
                        ad_code: "",
                        lng: "",
                        lat: "",
                        user_infos: {},
                        success_invitation_count: 0,
                        to_be_completed_count: 0
                    };
                },
                onShareAppMessage: function(t) {
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
                onLoad: function() {
                    var t = this;
                    this.getPositionAndAuth().then(function() {
                        t.myInvitationList(), t.myInvitation();
                    }), this.getUserInfo();
                },
                methods: {
                    getUserInfo: function() {
                        var t = this;
                        this.$tips.loading(), this.$http.post("/terminal/user/getTerminalUserInfo").then(function(n) {
                            t.$tips.loaded(), n.code == t.$configs.httpSuccessStatus ? t.user_infos = n.data : t.$tips.toast(n.message);
                        }).catch(function(n) {
                            t.$tips.loaded(), t.$tips.toast(n.message || "网络异常"), console.log("异常", n);
                        });
                    },
                    myInvitation: function() {
                        var t = this;
                        this.$http.get("/terminal/task/myInvitation?admin_key=" + this.$configs.adminKey + "&ad_code=" + this.ad_code + "&lng=" + this.lng + "&lat=" + this.lat).then(function(n) {
                            n.code == t.$configs.httpSuccessStatus ? (t.success_invitation_count = n.data.success_invitation_count, 
                            t.to_be_completed_count = n.data.to_be_completed_count) : t.$tips.toast(n.message);
                        }).catch(function(n) {
                            t.$tips.toast(n.message || "网络异常"), console.log("异常", n);
                        });
                    },
                    myInvitationList: function() {
                        var t = this, n = {
                            ad_code: this.ad_code,
                            admin_key: this.$configs.adminKey,
                            cursor: this.cursor,
                            size: this.size,
                            lat: this.lat,
                            lng: this.lng,
                            type: this.is_success_invite ? 2 : 1
                        };
                        this.$http.post("/terminal/task/myInvitationList", n).then(function(n) {
                            n.code == t.$configs.httpSuccessStatus && (0 == n.data.length ? (t.cursor > 1 && (t.cursor -= 1), 
                            t.noMore = !0) : n.data.forEach(function(n) {
                                n.sub_rule = JSON.parse(n.sub_rule), t.my_invitation_list.push(n);
                            }));
                        }).catch(function(n) {
                            t.$tips.toast(n.message || "网络异常"), console.log("异常", n);
                        });
                    },
                    getPositionAndAuth: function() {
                        var n = this, i = this;
                        return new Promise(function(e, s) {
                            n.$openHelper.getPosition().then(function(t) {
                                t.code == n.$configs.httpSuccessStatus && (i.ad_code = t.data.area_id, i.lng = t.data.lng, 
                                i.lat = t.data.lat, e(t.data));
                            }).catch(function(n) {
                                t.showModal({
                                    content: "检测到您没有打开每日一收的地理位置权限，是否去设置打开？",
                                    success: function(n) {
                                        n.confirm ? t.openSetting({
                                            success: function(t) {
                                                t.authSetting["scope.userLocation"] && i.getPositionAndAuth();
                                            }
                                        }) : n.cancel && s({
                                            cancel: "用户点击取消"
                                        });
                                    }
                                });
                            });
                        });
                    },
                    selList: function(t) {
                        this.is_success_invite = !!t, this.cursor = 1, this.my_invitation_list = [], this.noMore = !1, 
                        this.myInvitationList();
                    }
                },
                onReachBottom: function() {
                    this.noMore || (this.cursor += 1, console.log("到底了"), this.getData());
                }
            };
            n.default = i;
        }).call(this, i("543d").default);
    },
    d6a1: function(t, n, i) {
        i.r(n);
        var e = i("abe0"), s = i.n(e);
        for (var o in e) "default" !== o && function(t) {
            i.d(n, t, function() {
                return e[t];
            });
        }(o);
        n.default = s.a;
    }
}, [ [ "99f6", "common/runtime", "common/vendor" ] ] ]);