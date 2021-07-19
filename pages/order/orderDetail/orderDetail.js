(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/order/orderDetail/orderDetail" ], {
    "30cd": function(t, e, i) {
        i.r(e);
        var o = i("a38e"), n = i("5c90");
        for (var a in n) "default" !== a && function(t) {
            i.d(e, t, function() {
                return n[t];
            });
        }(a);
        i("e1f4");
        var s = i("f0c5"), r = Object(s.a)(n.default, o.b, o.c, !1, null, null, null, !1, o.a, void 0);
        e.default = r.exports;
    },
    "5c90": function(t, e, i) {
        i.r(e);
        var o = i("e2cf"), n = i.n(o);
        for (var a in o) "default" !== a && function(t) {
            i.d(e, t, function() {
                return o[t];
            });
        }(a);
        e.default = n.a;
    },
    "83c5": function(t, e, i) {},
    a38e: function(t, e, i) {
        i.d(e, "b", function() {
            return n;
        }), i.d(e, "c", function() {
            return a;
        }), i.d(e, "a", function() {
            return o;
        });
        var o = {
            uniPopup: function() {
                return Promise.all([ i.e("common/vendor"), i.e("components/uni-popup/uni-popup") ]).then(i.bind(null, "8575"));
            }
        }, n = function() {
            var t = this;
            t.$createElement;
            t._self._c, t._isMounted || (t.e0 = function(e) {
                t.isPull = !t.isPull;
            }, t.e1 = function(e) {
                t.isPull = !t.isPull;
            }, t.e2 = function(e) {
                return t.$refs.popup.close();
            });
        }, a = [];
    },
    aff6: function(t, e, i) {
        (function(t) {
            function e(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            i("b544"), e(i("66fd")), t(e(i("30cd")).default);
        }).call(this, i("543d").createPage);
    },
    e1f4: function(t, e, i) {
        var o = i("83c5");
        i.n(o).a;
    },
    e2cf: function(t, e, i) {
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = {
                data: function() {
                    return {
                        cursor: 1,
                        size: 10,
                        selTab: 0,
                        ids: "",
                        orderData: [],
                        id: "",
                        pjid: "",
                        content: "",
                        carter_satisfied: 2,
                        order_status: "",
                        photos: [],
                        showTextArea: !1,
                        showPopup1: !1,
                        title: "map",
                        latitude: 39.90403,
                        longitude: 116.407526,
                        covers: [ {
                            id: 1,
                            latitude: 39.90403,
                            longitude: 116.407526,
                            width: 58,
                            height: 78,
                            iconPath: "/static/order/yhdw@2x.png"
                        }, {
                            id: 2,
                            latitude: 39.90403,
                            longitude: 116.407526,
                            width: 58,
                            height: 78,
                            iconPath: "/static/order/qsdw@2x.png",
                            callout: {
                                content: "距离您1000m",
                                color: "#000",
                                fontSize: 14,
                                borderRadius: 10,
                                bgColor: "#ffffff",
                                padding: 10,
                                display: "ALWAYS"
                            }
                        } ],
                        carterLatitude: 39.90403,
                        carterLongitude: 116.407526,
                        timeFlushCarter: null,
                        isPull: !1,
                        wxVersion: "old"
                    };
                },
                onLoad: function(e) {
                    var i = t.getSystemInfoSync().SDKVersion;
                    this.$myUtil.compareVersion(i, "2.7.0") >= 0 && (this.wxVersion = "news"), console.log("opt", e), 
                    e && e.selTab && e.id && e.order_status && (this.selTab = e.selTab, this.ids = e.id, 
                    this.order_status = e.order_status), e.orderId && e && (this.ids = e.orderId, console.log("opt.orderId", this.ids)), 
                    this.getData();
                },
                onUnload: function() {
                    null != this.timeFlushCarter && clearInterval(this.timeFlushCarter);
                },
                methods: {
                    getData: function() {
                        var t = this, e = this;
                        console.log("getData"), this.$tips.loading(), this.$http.get("/terminal/user/orderInfo?id=" + this.ids).then(function(i) {
                            t.$tips.loaded(), i.code == t.$configs.httpSuccessStatus && (t.orderData = i.data, 
                            t.latitude = i.data.lat, t.longitude = i.data.lng, t.photos = JSON.parse(i.data.photos), 
                            25 == i.data.order_status && (Promise.all([ t.getCarterLocation(i.data.carter_user_id) ]).then(function(e) {
                                t.setDefMapView();
                            }).catch(function(t) {
                                console.log(t);
                            }), t.timeFlushCarter = setInterval(function() {
                                e.getCarterLocation(e.orderData.carter_user_id).then(function() {
                                    e.timeFlush();
                                }).catch(function(t) {
                                    console.log(t);
                                });
                            }, 5e3)));
                        }).catch(function(e) {
                            t.$tips.loaded(), t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    getCarterLocation: function(t) {
                        var e = this;
                        return new Promise(function(i, o) {
                            e.$http.get(e.$configs.baseLbsUrl + "/carter/location/getCarterLocation?carter_user_id=" + t).then(function(t) {
                                t.code == e.$configs.httpSuccessStatus ? (e.carterLatitude = t.data.lat, e.carterLongitude = t.data.lon, 
                                i({
                                    lat: t.data.lat,
                                    lon: t.data.lon
                                })) : o(t);
                            }).catch(function(t) {
                                o(t);
                            });
                        });
                    },
                    toTell: function() {
                        this.$refs.popup.open();
                    },
                    confirm1: function() {
                        this.$refs.popup.close(), t.makePhoneCall({
                            phoneNumber: this.orderData.carter_phone
                        });
                    },
                    detailOrder: function(t) {
                        this.id = t, this.showPopup1 = !0, this.$refs.popup1.open();
                    },
                    toEvaluate: function() {
                        this.showTextArea = !0, this.carter_satisfied = 2, this.$refs.popup2.open();
                    },
                    goIndexs: function() {
                        t.switchTab({
                            url: "../../index/index"
                        });
                    },
                    good: function() {
                        this.carter_satisfied = 1;
                    },
                    bad: function() {
                        this.carter_satisfied = 0;
                    },
                    toSubmit: function() {
                        var e = this;
                        if (2 != this.carter_satisfied) {
                            this.showTextArea = !1;
                            var i = {
                                carter_satisfied: this.carter_satisfied,
                                content: this.content,
                                id: this.ids
                            };
                            this.$tips.loading(), this.$http.post("/terminal/user/orderEvaluate", i).then(function(i) {
                                e.$tips.loaded(), i.code == e.$configs.httpSuccessStatus && (e.$tips.toast("评价成功"), 
                                e.$refs.popup2.close(), t.navigateBack());
                            }).catch(function(t) {
                                e.$tips.loaded(), e.$tips.toast(t.message), console.log("失败", t);
                            });
                        } else this.$tips.toast("请评价小哥服务");
                    },
                    close: function(t) {
                        this.showPopup1 = !1, t();
                    },
                    confirm: function(e, i) {
                        var o = this;
                        console.log("取消原因", i);
                        var n = {
                            id: this.ids,
                            reason_of_cancel: i
                        };
                        this.$tips.loading(), this.$http.post("/terminal/user/cancelOrder", n).then(function(e) {
                            o.$tips.loaded(), e.code == o.$configs.httpSuccessStatus ? (console.log("取消订单", e), 
                            t.reLaunch({
                                url: "../order?tabs=3",
                                complete: function() {
                                    t.showTabBar({
                                        animation: !1
                                    });
                                }
                            })) : o.$tips.toast(e.message);
                        }).catch(function(t) {
                            o.$tips.loaded(), o.$tips.toast(t.message), console.log("失败", t);
                        }), this.showPopup1 = !1, e();
                    },
                    _previewImage: function(e) {
                        t.previewImage({
                            urls: this.photos,
                            current: e
                        });
                    },
                    setDefMapView: function() {
                        var e = this, i = t.createMapContext("maps");
                        this.covers[0].longitude = this.longitude, this.covers[0].latitude = this.latitude, 
                        this.covers[1].longitude = this.carterLongitude, this.covers[1].latitude = this.carterLatitude, 
                        this.covers[1].callout.content = this.distance(this.latitude, this.longitude, this.carterLatitude, this.carterLongitude), 
                        i.includePoints({
                            points: [ {
                                latitude: e.latitude,
                                longitude: e.longitude
                            }, {
                                latitude: e.carterLatitude,
                                longitude: e.carterLongitude
                            } ]
                        });
                    },
                    timeFlush: function() {
                        this.covers[1].longitude = this.carterLongitude, this.covers[1].latitude = this.carterLatitude, 
                        this.covers[1].callout.content = this.distance(this.latitude, this.longitude, this.carterLatitude, this.carterLongitude);
                    },
                    flushCater: function() {
                        var t = this;
                        this.getCarterLocation(this.orderData.carter_user_id).then(function() {
                            t.timeFlush();
                        }).catch(function(t) {
                            console.log(t);
                        });
                    },
                    distance: function(t, e, i, o) {
                        var n = t * Math.PI / 180, a = i * Math.PI / 180, s = n - a, r = e * Math.PI / 180 - o * Math.PI / 180, c = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(s / 2), 2) + Math.cos(n) * Math.cos(a) * Math.pow(Math.sin(r / 2), 2)));
                        return c *= 6378.137, (c = Math.round(1e4 * c) / 1e4) < 1 ? "距离您" + (1e3 * c).toFixed(0) + "米" : "距离您" + c.toFixed(1) + "公里";
                    }
                }
            };
            e.default = i;
        }).call(this, i("543d").default);
    }
}, [ [ "aff6", "common/runtime", "common/vendor" ] ] ]);