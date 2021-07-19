(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/mine/extensionCode/inviteList" ], {
    "066b": function(t, n, i) {},
    "07e5": function(t, n, i) {
        (function(t) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.default = void 0;
            var i = {
                data: function() {
                    return {
                        is_road_money: !0,
                        my_invitation_list: [],
                        cursor: 1,
                        size: 10,
                        noMore: !1,
                        ad_code: "",
                        lng: "",
                        lat: "",
                        user_infos: {},
                        on_the_road_earnings: 0,
                        accumulative_total_earnings: 0,
                        now_rewards: {}
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
                            n.code == t.$configs.httpSuccessStatus ? (t.accumulative_total_earnings = n.data.accumulative_total_earnings, 
                            t.on_the_road_earnings = n.data.on_the_road_earnings) : t.$tips.toast(n.message);
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
                            type: this.is_road_money ? 1 : 2
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
                    getRewards: function() {
                        var t = this;
                        this.$http.get("/terminal/task/taskPrizeToTerminalUser?task_agent_config_id=" + this.now_rewards.task_agent_config_id + "&task_agent_user_status_id=" + this.now_rewards.task_agent_user_status_id + "&task_agent_user_sub_status_id=" + this.now_rewards.id).then(function(n) {
                            n.code == t.$configs.httpSuccessStatus ? (t.$refs.getGift.open(), t.my_invitation_list = [], 
                            t.myInvitationList(), t.myInvitation()) : t.$tips.toast(n.message);
                        }).catch(function(n) {
                            t.$tips.toast(n.message), console.log("失败", n);
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
                        this.is_road_money = !!t, this.cursor = 1, this.my_invitation_list = [], this.noMore = !1, 
                        this.myInvitationList();
                    },
                    toGetRewards: function(t) {
                        2 == t.status && (this.now_rewards = t, this.getRewards());
                    },
                    close_pop: function() {
                        this.$refs.getGift.close();
                    }
                },
                onReachBottom: function() {
                    this.noMore || (this.cursor += 1, console.log("到底了"), this.getData());
                }
            };
            n.default = i;
        }).call(this, i("543d").default);
    },
    "1a75": function(t, n, i) {
        (function(t) {
            function n(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            i("b544"), n(i("66fd")), t(n(i("c378")).default);
        }).call(this, i("543d").createPage);
    },
    2974: function(t, n, i) {
        i.d(n, "b", function() {
            return s;
        }), i.d(n, "c", function() {
            return o;
        }), i.d(n, "a", function() {
            return e;
        });
        var e = {
            uniPopup: function() {
                return Promise.all([ i.e("common/vendor"), i.e("components/uni-popup/uni-popup") ]).then(i.bind(null, "8575"));
            }
        }, s = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, o = [];
    },
    "403b": function(t, n, i) {
        var e = i("066b");
        i.n(e).a;
    },
    c378: function(t, n, i) {
        i.r(n);
        var e = i("2974"), s = i("f2a1");
        for (var o in s) "default" !== o && function(t) {
            i.d(n, t, function() {
                return s[t];
            });
        }(o);
        i("403b");
        var a = i("f0c5"), c = Object(a.a)(s.default, e.b, e.c, !1, null, null, null, !1, e.a, void 0);
        n.default = c.exports;
    },
    f2a1: function(t, n, i) {
        i.r(n);
        var e = i("07e5"), s = i.n(e);
        for (var o in e) "default" !== o && function(t) {
            i.d(n, t, function() {
                return e[t];
            });
        }(o);
        n.default = s.a;
    }
}, [ [ "1a75", "common/runtime", "common/vendor" ] ] ]);