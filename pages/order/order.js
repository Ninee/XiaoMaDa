(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/order/order" ], {
    3848: function(t, e, o) {
        var i = o("b904");
        o.n(i).a;
    },
    "3fc6": function(t, e, o) {
        o.d(e, "b", function() {
            return s;
        }), o.d(e, "c", function() {
            return n;
        }), o.d(e, "a", function() {
            return i;
        });
        var i = {
            uniRate: function() {
                return o.e("components/uni-rate/uni-rate").then(o.bind(null, "5cfa"));
            },
            uniPopup: function() {
                return Promise.all([ o.e("common/vendor"), o.e("components/uni-popup/uni-popup") ]).then(o.bind(null, "8575"));
            }
        }, s = function() {
            var t = this;
            t.$createElement;
            t._self._c, t._isMounted || (t.e0 = function(e) {
                return t.$refs.popup.close();
            }, t.e1 = function(e) {
                return t.$refs.cancleOrder.close();
            });
        }, n = [];
    },
    "52e4": function(t, e, o) {
        o.r(e);
        var i = o("3fc6"), s = o("ab44");
        for (var n in s) "default" !== n && function(t) {
            o.d(e, t, function() {
                return s[t];
            });
        }(n);
        o("3848");
        var r = o("f0c5"), a = Object(r.a)(s.default, i.b, i.c, !1, null, null, null, !1, i.a, void 0);
        e.default = a.exports;
    },
    ab44: function(t, e, o) {
        o.r(e);
        var i = o("fe59"), s = o.n(i);
        for (var n in i) "default" !== n && function(t) {
            o.d(e, t, function() {
                return i[t];
            });
        }(n);
        e.default = s.a;
    },
    b904: function(t, e, o) {},
    dc69: function(t, e, o) {
        (function(t) {
            function e(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            o("b544"), e(o("66fd")), t(e(o("52e4")).default);
        }).call(this, o("543d").createPage);
    },
    fe59: function(t, e, o) {
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var o = getApp(), i = {
                data: function() {
                    return {
                        noMore: !1,
                        cursor: 1,
                        size: 10,
                        tabs: [ {
                            id: 10,
                            tit: "未接单"
                        }, {
                            id: 20,
                            tit: "已接单"
                        }, {
                            id: 30,
                            tit: "已完成"
                        }, {
                            id: 50,
                            tit: "已取消"
                        } ],
                        selTab: 0,
                        list: [],
                        id: "",
                        pjid: "",
                        pjcarTerName: "",
                        pjIndex: 0,
                        carter_satisfied: 2,
                        content: "",
                        dataLoad: !1,
                        phoneNum: "",
                        showTextArea: !1,
                        showCancleOrderPopup: !1,
                        pickUpIng: !1,
                        pickUpIngOrderId: "",
                        stars_num: 4.5
                    };
                },
                onLoad: function(t) {
                    o.globalData.lookingOrderStatus ? (this.selTab = o.globalData.lookingOrderStatus.orderStatus, 
                    o.globalData.lookingOrderStatus.orderStatus = 0) : t.selTab ? this.selTab = t.selTab : this.selTab = 10;
                },
                onShow: function() {
                    var e = this;
                    this.list = [], this.$authHelper.login().then(function(t) {
                        t.code == e.$configs.httpSuccessStatus && (e.getData(), e.getUpDoorOrder());
                    }), t.showTabBar({
                        animation: !1
                    });
                },
                methods: {
                    getData: function() {
                        var t = this;
                        this.dataLoad = !0;
                        var e = this, o = {
                            cursor: this.cursor,
                            size: this.size,
                            order_status: this.selTab
                        };
                        this.$http.post("/terminal/user/v2/orderList", o).then(function(o) {
                            0 == o.data.length ? (t.cursor > 1 && (t.cursor -= 1), t.noMore = !0) : o.data.forEach(function(o) {
                                var i = 0, s = 0;
                                o.order_item_list_resps.forEach(function(t) {
                                    2 == t.order_item_type ? (o.has_type2 = !0, s++) : i++, t.weight_remark = e.reamrk_nums(t.weight_remark), 
                                    t.price_remark = e.reamrk_nums(t.price_remark);
                                }), o.type1_count = i, o.type2_count = s, o.is_show_more_goods = !1, t.list.push(o);
                            }), t.dataLoad = !1;
                        }).catch(function(e) {
                            t.$tips.loaded(), console.log("失败", e);
                        });
                    },
                    toDelOrder: function(t) {
                        var e = this;
                        this.$tips.confirm("确定删除该订单吗？").then(function(o) {
                            e.$http.post("/terminal/user/delOrder", {
                                id: t
                            }).then(function(o) {
                                o.code == e.$configs.httpSuccessStatus ? e.list.forEach(function(o, i) {
                                    o.id == t && (e.list.splice(i, 1), e.$tips.toast("删除成功"));
                                }) : e.$tips.toast(o.message);
                            }).catch(function(t) {
                                e.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                            });
                        });
                    },
                    confirmCancleOrder: function() {
                        var e = this;
                        this.$tips.loading(), this.$http.post("/terminal/user/cancelOrder", {
                            id: this.id
                        }).then(function(o) {
                            e.$tips.loaded(), o.code == e.$configs.httpSuccessStatus && (t.navigateTo({
                                url: "./orderCancleSuccess/orderCancleSuccess?id=" + e.id
                            }), e.$refs.cancleOrder.close());
                        }).catch(function(t) {
                            e.$tips.loaded(), e.$tips.toast(t.message), console.log("失败", t);
                        }), this.showPopup1 = !1;
                    },
                    toSubmit: function() {
                        var t = this;
                        if (2 != this.carter_satisfied) {
                            this.showTextArea = !1;
                            var e = {
                                carter_satisfied: this.carter_satisfied,
                                content: this.content,
                                id: this.pjid
                            };
                            this.$tips.loading(), this.$http.post("/terminal/user/orderEvaluate", e).then(function(e) {
                                t.$tips.loaded(), e.code == t.$configs.httpSuccessStatus && (t.$tips.toast("评价成功"), 
                                t.$refs.popup2.close(), t.list[t.pjIndex].order_status = 40);
                            }).catch(function(e) {
                                t.$tips.loaded(), t.$tips.toast(e.message), console.log("失败", e);
                            });
                        } else this.$tips.toast("请评价小哥服务");
                    },
                    getUpDoorOrder: function() {
                        var t = this;
                        this.$tips.loading(), this.$http.get("/terminal/user/pickUpIng").then(function(e) {
                            t.$tips.loaded(), e.code == t.$configs.httpSuccessStatus ? (t.pickUpIng = !0, t.pickUpIngOrderId = e.data) : (t.pickUpIng = !1, 
                            t.pickUpIngOrderId = "");
                        }).catch(function(e) {
                            t.$tips.loaded(), t.$tips.toast(e.message || "网络异常"), console.log("异常", e);
                        });
                    },
                    selTabHand: function(t) {
                        this.selTab = t, this.cursor = 1, this.list = [], this.noMore = !1, this.getData();
                    },
                    showMoreGoods: function(t) {
                        this.list[t].is_show_more_goods = !this.list[t].is_show_more_goods;
                    },
                    toTell: function(t) {
                        this.$refs.popup.open(), this.phoneNum = t;
                    },
                    confirm1: function() {
                        this.$refs.popup.close(), t.makePhoneCall({
                            phoneNumber: this.phoneNum
                        });
                    },
                    cancleOrder: function(t) {
                        this.id = t, this.showCancleOrderPopup = !0, this.$refs.cancleOrder.open();
                    },
                    toOrderDetail: function(e) {
                        t.navigateTo({
                            url: "./details/details?orderId=" + e
                        });
                    },
                    toPlayOrder: function() {
                        o.globalData.fromIndexCategoryId = {}, t.switchTab({
                            url: "../index/firstPage"
                        });
                    },
                    toEvaluate: function(t, e) {
                        this.showTextArea = !0, this.carter_satisfied = 2, this.pjid = t.id, this.pjcarTerName = t.carter_name, 
                        this.pjIndex = e, this.$refs.popup2.open();
                    },
                    good: function() {
                        this.carter_satisfied = 1;
                    },
                    bad: function() {
                        this.carter_satisfied = 0;
                    },
                    copy: function(t) {
                        var e = this;
                        wx.setClipboardData({
                            data: t,
                            success: function(t) {
                                e.$tips.toast("复制成功");
                            }
                        });
                    },
                    toHiddePhone: function(t) {
                        var e = /^(\d{3})\d{4}(\d{4})$/;
                        return t.replace(e, "$1****$2");
                    },
                    lookPickUpIng: function() {
                        t.navigateTo({
                            url: "./details/details?orderId=" + this.pickUpIngOrderId
                        });
                    },
                    reamrk_nums: function(t) {
                        var e = (t + "").split("-")[0], o = (t + "").split("-")[1];
                        return 0 == parseFloat(e) ? o + "以上" : t;
                    }
                },
                onReachBottom: function() {
                    this.noMore || (this.cursor += 1, console.log("到底了"), this.getData());
                }
            };
            e.default = i;
        }).call(this, o("543d").default);
    }
}, [ [ "dc69", "common/runtime", "common/vendor" ] ] ]);