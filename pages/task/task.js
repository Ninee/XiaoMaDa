(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/task/task" ], {
    "090a": function(t, e, n) {
        n.r(e);
        var s = n("1210"), a = n.n(s);
        for (var i in s) "default" !== i && function(t) {
            n.d(e, t, function() {
                return s[t];
            });
        }(i);
        e.default = a.a;
    },
    "113e": function(t, e, n) {
        (function(t) {
            function e(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            n("b544"), e(n("66fd")), t(e(n("f820")).default);
        }).call(this, n("543d").createPage);
    },
    1210: function(t, e, n) {
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var n = {
                data: function() {
                    return {
                        navHeight: 0,
                        ad_code: "",
                        has_coin_balance: 0,
                        have_prize: 0,
                        task_list: [],
                        notice_list: [],
                        now_rewards: {},
                        is_get_gift: !1,
                        taskStatus: [],
                        latitude: "",
                        longitude: ""
                    };
                },
                onLoad: function(e) {
                    var n = this, s = this;
                    s.ad_code = e.ad_code, s.latitude = e.lat, s.longitude = e.lng, t.getSystemInfo({
                        success: function(t) {
                            n.navHeight = t.statusBarHeight;
                        }
                    });
                },
                onShow: function() {
                    var t = this;
                    this.$authHelper.login().then(function(e) {
                        t.getTaskStatus().then(function(e) {
                            t.taskList();
                        }), t.yetHaveCoinBalance(), t.yetHavePrize(), t.getInform();
                    });
                },
                methods: {
                    taskList: function() {
                        var t = this;
                        return new Promise(function(e, n) {
                            t.$tips.loading(), t.$http.get("/terminal/task/v2/taskList?ad_code=" + t.ad_code + "&admin_key=" + t.$configs.adminKey + "&lat=" + t.latitude + "&lng=" + t.longitude).then(function(n) {
                                t.$tips.loaded(), n.code == t.$configs.httpSuccessStatus ? (t.task_list = n.data, 
                                e(n)) : t.$tips.toast(n.message);
                            }).catch(function(e) {
                                rejcet(e), t.$tips.loaded(), t.$tips.toast(e.message), console.log("失败", e);
                            });
                        });
                    },
                    getTaskStatus: function() {
                        var t = this;
                        return new Promise(function(e, n) {
                            t.$http.get("/terminal/task/v2/taskListStatus?ad_code=" + t.ad_code + "&admin_key=" + t.$configs.adminKey + "&lat=" + t.latitude + "&lng=" + t.longitude).then(function(n) {
                                n.code == t.$configs.httpSuccessStatus ? (t.taskStatus = n.data, e(n)) : t.$tips.toast(n.message);
                            }).catch(function(e) {
                                rejcet(e), t.$tips.toast(e.message), console.log("失败", e);
                            });
                        });
                    },
                    yetHaveCoinBalance: function() {
                        var t = this;
                        this.$tips.loading(), this.$http.get("/terminal/task/yetHaveCoinBalance").then(function(e) {
                            t.$tips.loaded(), e.code == t.$configs.httpSuccessStatus ? t.has_coin_balance = e.data : t.$tips.toast(e.message);
                        }).catch(function(e) {
                            t.$tips.loaded(), t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    yetHavePrize: function() {
                        var t = this;
                        this.$tips.loading(), this.$http.get("/terminal/task/yetHavePrize").then(function(e) {
                            t.$tips.loaded(), e.code == t.$configs.httpSuccessStatus ? t.have_prize = e.data : t.$tips.toast(e.message);
                        }).catch(function(e) {
                            t.$tips.loaded(), t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    getRewards: function() {
                        var t = this, e = this;
                        this.$http.get("/terminal/task/taskPrizeToTerminalUser?task_agent_config_id=" + this.now_rewards.id + "&task_agent_user_status_id=" + this.now_rewards.task_agent_user_status_id + "&task_agent_user_sub_status_id=" + this.now_rewards.task_agent_user_sub_status_id).then(function(n) {
                            n.code == e.$configs.httpSuccessStatus ? (e.is_get_gift = !0, e.$refs.slelctWeight.open(), 
                            e.yetHaveCoinBalance(), e.yetHavePrize(), e.taskList()) : t.$tips.toast(n.message);
                        }).catch(function(e) {
                            t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    getInform: function() {
                        var t = this;
                        this.$http.post("/terminal/task/getInform").then(function(e) {
                            e.code == t.$configs.httpSuccessStatus ? t.notice_list = e.data : t.$tips.toast(e.message);
                        }).catch(function(e) {
                            t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    goBack: function() {
                        t.navigateBack();
                    },
                    toGiftList: function() {
                        t.navigateTo({
                            url: "./giftList/giftList"
                        });
                    },
                    toCoiin: function() {
                        t.navigateTo({
                            url: "../mine/balance/balance"
                        });
                    },
                    toGetRewards: function(t) {
                        this.is_get_gift = !1, this.now_rewards = t, this.getRewards();
                    },
                    toFinishTask: function(t) {
                        this.is_get_gift = !1, this.now_rewards = t, this.$refs.slelctWeight.open();
                    },
                    notOpen: function() {
                        this.$tips.toast("暂未开放!");
                    },
                    toTaskPage: function() {
                        "/pages/mine/extensionCode/extensionCode" == this.now_rewards.redirect_url ? (t.navigateTo({
                            url: this.now_rewards.redirect_url
                        }), this.$refs.slelctWeight.close()) : t.reLaunch({
                            url: this.now_rewards.redirect_url
                        });
                    },
                    close_pop: function() {
                        this.$refs.slelctWeight.close();
                    },
                    toDetailRules: function() {
                        t.navigateTo({
                            url: "./detailRules/detailRules?id=" + this.now_rewards.id
                        });
                    }
                }
            };
            e.default = n;
        }).call(this, n("543d").default);
    },
    "234b": function(t, e, n) {
        var s = n("29fe");
        n.n(s).a;
    },
    "29fe": function(t, e, n) {},
    "9b0e": function(t, e, n) {
        n.d(e, "b", function() {
            return a;
        }), n.d(e, "c", function() {
            return i;
        }), n.d(e, "a", function() {
            return s;
        });
        var s = {
            uniPopup: function() {
                return Promise.all([ n.e("common/vendor"), n.e("components/uni-popup/uni-popup") ]).then(n.bind(null, "8575"));
            }
        }, a = function() {
            var t = this, e = (t.$createElement, t._self._c, t.taskStatus.includes("icon.png")), n = t.taskStatus.includes("icon_manesong.png"), s = t.taskStatus.includes("icon_ljxiadan.png"), a = t.taskStatus.includes("icon_invite.png");
            t.$mp.data = Object.assign({}, {
                $root: {
                    g0: e,
                    g1: n,
                    g2: s,
                    g3: a
                }
            });
        }, i = [];
    },
    f820: function(t, e, n) {
        n.r(e);
        var s = n("9b0e"), a = n("090a");
        for (var i in a) "default" !== i && function(t) {
            n.d(e, t, function() {
                return a[t];
            });
        }(i);
        n("234b");
        var o = n("f0c5"), c = Object(o.a)(a.default, s.b, s.c, !1, null, null, null, !1, s.a, void 0);
        e.default = c.exports;
    }
}, [ [ "113e", "common/runtime", "common/vendor" ] ] ]);