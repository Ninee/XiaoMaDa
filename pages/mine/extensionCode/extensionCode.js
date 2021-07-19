(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/mine/extensionCode/extensionCode" ], {
    "1f0e": function(t, n, i) {
        i.r(n);
        var s = i("d967"), e = i.n(s);
        for (var o in s) "default" !== o && function(t) {
            i.d(n, t, function() {
                return s[t];
            });
        }(o);
        n.default = e.a;
    },
    4688: function(t, n, i) {
        var s = i("4b43");
        i.n(s).a;
    },
    "4b43": function(t, n, i) {},
    "5bc5": function(t, n, i) {
        i.r(n);
        var s = i("7294"), e = i("1f0e");
        for (var o in e) "default" !== o && function(t) {
            i.d(n, t, function() {
                return e[t];
            });
        }(o);
        i("4688");
        var a = i("f0c5"), c = Object(a.a)(e.default, s.b, s.c, !1, null, null, null, !1, s.a, void 0);
        n.default = c.exports;
    },
    6594: function(t, n, i) {
        (function(t) {
            function n(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            i("b544"), n(i("66fd")), t(n(i("5bc5")).default);
        }).call(this, i("543d").createPage);
    },
    7294: function(t, n, i) {
        i.d(n, "b", function() {
            return e;
        }), i.d(n, "c", function() {
            return o;
        }), i.d(n, "a", function() {
            return s;
        });
        var s = {
            uniPopup: function() {
                return Promise.all([ i.e("common/vendor"), i.e("components/uni-popup/uni-popup") ]).then(i.bind(null, "8575"));
            }
        }, e = function() {
            var t = this, n = (t.$createElement, t._self._c, t.$configs.networkImgs.searchImg("yaoqingjiang_bj")), i = n ? t.$configs.networkImgs.searchImg("yaoqingjiang_bj") : null, s = n ? t.$configs.networkImgs.searchImg("yaoqingjiang_bj_hongbao") : null, e = n && s ? t.$configs.networkImgs.searchImg("yaoqingjiang_bj_hongbao") : null;
            t._isMounted || (t.e0 = function(n) {
                return t.$refs.goAway.close();
            }), t.$mp.data = Object.assign({}, {
                $root: {
                    g0: n,
                    g1: i,
                    g2: s,
                    g3: e
                }
            });
        }, o = [];
    },
    d967: function(t, n, i) {
        (function(t) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.default = void 0;
            var i = {
                data: function() {
                    return {
                        navHeight: 0,
                        notice_msgs: [],
                        is_now_month: !0,
                        ad_code: "",
                        lng: "",
                        lat: "",
                        on_the_road_earnings: 0,
                        accumulative_total_earnings: 0,
                        success_invitation_count: 0,
                        invite_task_list: {},
                        invite_task_list_length: 0,
                        rich_list: [],
                        this_month: "",
                        last_month: "",
                        user_infos: {},
                        my_invitation_list: [],
                        notice_timer: {},
                        is_go_index: !1,
                        now_rewards: {},
                        is_list_get_gift: !0,
                        is_show_bottom_btn: !1
                    };
                },
                onShareAppMessage: function(t) {
                    return {
                        title: "@你，我刚领到一个大红包，看看你能领到多少>>",
                        path: "/pages/mine/extensionCode/faceToFaceCode?id=" + this.user_infos.id,
                        imageUrl: this.$configs.networkImgs.searchImg("mrys_yaoqingjiang_fengxinagrukou")
                    };
                },
                onLoad: function(n) {
                    var i = this;
                    t.getSystemInfo({
                        success: function(t) {
                            i.navHeight = t.statusBarHeight;
                        }
                    }), n && n.name && (this.is_go_index = !0);
                },
                onShow: function() {
                    var n = this;
                    this.getRandomNotice(20), this.notice_timer = setInterval(function() {
                        n.getRandomNotice(20);
                    }, 7e4), this.$authHelper.login().then(function(i) {
                        i.code == n.$configs.httpSuccessStatus && (n.getPositionAndAuth().then(function() {
                            n.myInvitation(), n.invitationOrderMinPriceTaskList(), n.myInvitationList();
                        }).catch(function(n) {
                            t.navigateBack();
                        }), n.getUserInfo(), n.richList());
                    });
                },
                onPageScroll: function(t) {
                    t.scrollTop > 240 ? this.is_show_bottom_btn = !0 : this.is_show_bottom_btn = !1;
                },
                onHide: function() {
                    clearInterval(this.notice_timer);
                },
                onUnload: function() {
                    clearInterval(this.notice_timer);
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
                            t.on_the_road_earnings = n.data.on_the_road_earnings, t.success_invitation_count = n.data.success_invitation_count) : t.$tips.toast(n.message);
                        }).catch(function(n) {
                            t.$tips.toast(n.message || "网络异常"), console.log("异常", n);
                        });
                    },
                    invitationOrderMinPriceTaskList: function() {
                        var n = this;
                        this.$http.get("/terminal/task/invitationOrderMinPriceTaskList?admin_key=" + this.$configs.adminKey + "&ad_code=" + this.ad_code + "&lng=" + this.lng + "&lat=" + this.lat).then(function(i) {
                            if (i.code == n.$configs.httpSuccessStatus && i.data) {
                                if (n.invite_task_list = i.data, n.invite_task_list_length = n.invite_task_list.second_prizes_list.length - 1, 
                                n.invite_task_list.second_prizes_list.length > 0) {
                                    var s = 0;
                                    n.invite_task_list.second_prizes_list.forEach(function(t, n) {
                                        2 != t.status && 3 != t.status || (s += 1);
                                    }), s > 0 && (n.invite_task_list.second_prizes_list[s - 1].now_step = 1);
                                }
                            } else n.$tips.toast("该区域暂未开放", function() {
                                t.navigateBack();
                            });
                        }).catch(function(t) {
                            n.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                        });
                    },
                    richList: function() {
                        var t = this, n = 1;
                        this.is_now_month || (n = 0), this.$http.get("/terminal/task/richList?month=" + n).then(function(n) {
                            n.code == t.$configs.httpSuccessStatus ? (t.rich_list = n.data.rich_list, t.this_month = n.data.this_month, 
                            t.last_month = n.data.last_month) : t.$tips.toast(n.message);
                        }).catch(function(n) {
                            t.$tips.toast(n.message || "网络异常"), console.log("异常", n);
                        });
                    },
                    myInvitationList: function() {
                        var t = this, n = {
                            ad_code: this.ad_code,
                            admin_key: this.$configs.adminKey,
                            cursor: 1,
                            size: 3,
                            lat: this.lat,
                            lng: this.lng,
                            type: 0
                        };
                        this.$http.post("/terminal/task/myInvitationList", n).then(function(n) {
                            n.code == t.$configs.httpSuccessStatus && n.data.length > 0 && (t.my_invitation_list = n.data, 
                            t.my_invitation_list.forEach(function(t) {
                                t.sub_rule = JSON.parse(t.sub_rule);
                            }));
                        }).catch(function(n) {
                            t.$tips.toast(n.message || "网络异常"), console.log("异常", n);
                        });
                    },
                    getRewards: function(t) {
                        var n = this, i = "";
                        2 == t ? (this.is_list_get_gift = !1, i = this.now_rewards.task_agent_user_sub_status_id) : (this.is_list_get_gift = !0, 
                        i = this.now_rewards.id);
                        var s = this;
                        this.$http.get("/terminal/task/taskPrizeToTerminalUser?task_agent_config_id=" + this.now_rewards.task_agent_config_id + "&task_agent_user_status_id=" + this.now_rewards.task_agent_user_status_id + "&task_agent_user_sub_status_id=" + i).then(function(t) {
                            t.code == s.$configs.httpSuccessStatus ? (s.$refs.getGift.open(), n.myInvitation(), 
                            n.invitationOrderMinPriceTaskList(), n.myInvitationList(), n.richList()) : n.$tips.toast(t.message);
                        }).catch(function(t) {
                            n.$tips.toast(t.message), console.log("失败", t);
                        });
                    },
                    getPositionAndAuth: function() {
                        var n = this, i = this;
                        return new Promise(function(s, e) {
                            n.$openHelper.getPosition().then(function(t) {
                                t.code == n.$configs.httpSuccessStatus && (i.ad_code = t.data.area_id, i.lng = t.data.lng, 
                                i.lat = t.data.lat, s(t.data));
                            }).catch(function(n) {
                                t.showModal({
                                    content: "检测到您没有打开每日一收的地理位置权限，是否去设置打开？",
                                    success: function(n) {
                                        n.confirm ? t.openSetting({
                                            success: function(t) {
                                                t.authSetting["scope.userLocation"] && i.getPositionAndAuth();
                                            }
                                        }) : n.cancel && e({
                                            cancel: "用户点击取消"
                                        });
                                    }
                                });
                            });
                        });
                    },
                    selMonths: function(t) {
                        this.is_now_month = !!t, this.richList();
                    },
                    goBottom: function() {
                        t.pageScrollTo({
                            scrollTop: 3e3,
                            duration: 300
                        });
                    },
                    getMoble: function() {
                        for (var t = new Array("130", "131", "132", "133", "135", "137", "138", "170", "187", "189")[parseInt(10 * Math.random())], n = 0; n < 8; n++) t += Math.floor(10 * Math.random());
                        return t;
                    },
                    randomNum: function(t, n) {
                        switch (arguments.length) {
                          case 1:
                            return parseInt(Math.random() * t + 1, 10);

                          case 2:
                            return parseInt(Math.random() * (n - t + 1) + t, 10);

                          default:
                            return 0;
                        }
                    },
                    toHiddePhone: function(t) {
                        var n = /^(\d{3})\d{4}(\d{4})$/;
                        return t.replace(n, "$1****$2");
                    },
                    getRandomNotice: function(t) {
                        this.notice_msgs = [];
                        for (var n = 0; n < t; n++) {
                            var i = {
                                phone: "",
                                moneys: 0
                            }, s = this.getMoble();
                            s = this.toHiddePhone(s);
                            var e = this.randomNum(10, 200);
                            i.phone = s, i.moneys = e, this.notice_msgs.push(i);
                        }
                    },
                    toGetRewards: function(t, n) {
                        2 == t.status && (this.now_rewards = t, this.getRewards(n));
                    },
                    close_pop: function() {
                        this.$refs.getGift.close();
                    },
                    toWithDrawLog: function() {
                        t.navigateTo({
                            url: "../balance/balance?selectTabId=1"
                        });
                    },
                    toWithDraw: function() {
                        t.navigateTo({
                            url: "/pages/mine/withdrawal/withdrawal"
                        });
                    },
                    toOpenCode: function() {
                        t.navigateTo({
                            url: "./faceToFaceCode"
                        });
                    },
                    toInviteList: function() {
                        t.navigateTo({
                            url: "./inviteList"
                        });
                    },
                    toInviteLogs: function() {
                        t.navigateTo({
                            url: "./inviteLogs"
                        });
                    },
                    goBack: function() {
                        this.$refs.goAway.open();
                    },
                    goAway: function() {
                        this.is_go_index ? t.switchTab({
                            url: "../../index/index"
                        }) : t.navigateBack();
                    }
                }
            };
            n.default = i;
        }).call(this, i("543d").default);
    }
}, [ [ "6594", "common/runtime", "common/vendor" ] ] ]);