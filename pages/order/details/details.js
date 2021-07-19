(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/order/details/details" ], {
    "07bf": function(t, e, i) {
        (function(t) {
            function e(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            i("b544"), e(i("66fd")), t(e(i("e119")).default);
        }).call(this, i("543d").createPage);
    },
    "0984": function(t, e, i) {
        var o = i("730b");
        i.n(o).a;
    },
    "5c86": function(t, e, i) {
        i.r(e);
        var o = i("7f7a"), n = i.n(o);
        for (var r in o) "default" !== r && function(t) {
            i.d(e, t, function() {
                return o[t];
            });
        }(r);
        e.default = n.a;
    },
    "730b": function(t, e, i) {},
    "7f7a": function(t, e, i) {
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = getApp(), o = {
                data: function() {
                    return {
                        mapCtx: "",
                        phoneNum: "",
                        stars_num: 4.5,
                        order_info: {},
                        is_show_more_goods: !1,
                        animation: {},
                        animationData: {},
                        title: "map",
                        isPull: !1,
                        carterLatitude: 39.90403,
                        carterLongitude: 116.407526,
                        latitude: 39.90403,
                        longitude: 116.407526,
                        timeFlushCarter: null,
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
                        polyline: [],
                        is_new_data: !0
                    };
                },
                onReady: function() {
                    this.mapCtx = t.createMapContext("myMap");
                },
                onLoad: function(t) {
                    this.getUpDoorOrder(t.orderId);
                },
                onUnload: function() {
                    null != this.timeFlushCarter && clearInterval(this.timeFlushCarter);
                },
                onShow: function() {
                    this.animation = t.createAnimation({
                        transformOrigin: "50% 50%",
                        duration: 500,
                        timingFunction: "ease",
                        delay: 0
                    });
                },
                methods: {
                    getUpDoorOrder: function(t) {
                        var e = this, i = this;
                        this.$tips.loading(), this.$http.get("/terminal/user/v2/orderInfo?id=" + t).then(function(t) {
                            if (e.$tips.loaded(), t.code == e.$configs.httpSuccessStatus) {
                                e.latitude = t.data.lat, e.longitude = t.data.lng, e.order_info = t.data;
                                var o = 0, n = 0;
                                if (e.order_info.order_item_list_resps.forEach(function(t) {
                                    2 == t.order_item_type ? (e.order_info.has_type2 = !0, n++) : o++, t.weight_remark = i.reamrk_nums(t.weight_remark), 
                                    t.price_remark = i.reamrk_nums(t.price_remark);
                                }), e.order_info.type1_count = o, e.order_info.type2_count = n, e.order_info.is_show_more_goods = !1, 
                                e.order_info.order_status < 25 || e.order_info.order_status >= 50) e.setDefMapView(e.order_info.order_status); else if (25 == e.order_info.order_status) e.getCarterLocation(t.data.carter_user_id).then(function(t) {
                                    e.setDefMapView(e.order_info.order_status);
                                }), e.timeFlushCarter = setInterval(function() {
                                    i.getCarterLocation(i.order_info.carter_user_id).then(function() {
                                        i.timeFlush();
                                    }).catch(function(t) {});
                                }, 5e3); else if (e.order_info.order_status > 25) if (e.order_info.start_service_point) {
                                    var r = e.order_info.start_service_point.split(",");
                                    e.carterLongitude = r[0], e.carterLatitude = r[1], e.setDefMapView(e.order_info.order_status), 
                                    e.getLinePlan(e.order_info.start_service_point, e.longitude + "," + e.latitude);
                                } else e.getCarterLocation(t.data.carter_user_id).then(function(t) {
                                    e.setDefMapView(e.order_info.order_status);
                                });
                            } else e.$tips.toast(t.message);
                        }).catch(function(t) {
                            e.$tips.loaded(), e.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                        });
                    },
                    getLinePlan: function(t, e) {
                        var i = this;
                        this.$http.get("/terminalUser/addres/drivingDirection?origin=" + t + "&destination=" + e).then(function(t) {
                            t.data && (i.polyline = [ {
                                points: t.data,
                                width: 7,
                                color: "#00A600",
                                arrowLine: !0,
                                borderWidth: 1,
                                borderColor: "#005900"
                            } ]);
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
                    toPlayOrder: function() {
                        t.switchTab({
                            url: "../../index/firstPage"
                        });
                    },
                    showMoreGoods: function() {
                        this.is_show_more_goods ? (this.is_show_more_goods = !1, this.animation.height("554rpx").step(), 
                        this.animationData = this.animation.export()) : (this.is_show_more_goods = !0, this.animation.height("806rpx").step(), 
                        this.animationData = this.animation.export());
                    },
                    lookOrder: function() {
                        var e = 0;
                        e = 30 == this.order_info.order_status || 40 == this.order_info.order_status ? 30 : this.order_info.order_status, 
                        i.globalData.lookingOrderStatus = {
                            orderStatus: e
                        }, t.reLaunch({
                            url: "../order"
                        });
                    },
                    toTell: function(t) {
                        this.$refs.popup.open(), this.phoneNum = t;
                    },
                    confirm1: function() {
                        this.$refs.popup.close(), t.makePhoneCall({
                            phoneNumber: this.phoneNum
                        });
                    },
                    setDefMapView: function(t) {
                        this.covers[0].longitude = this.longitude, this.covers[0].latitude = this.latitude, 
                        t < 25 || t >= 50 ? this.covers.splice(1, 1) : (this.covers[1].longitude = this.carterLongitude, 
                        this.covers[1].latitude = this.carterLatitude, this.covers[1].callout.content = this.distance(this.latitude, this.longitude, this.carterLatitude, this.carterLongitude));
                    },
                    timeFlush: function() {
                        this.covers[1].longitude = this.carterLongitude, this.covers[1].latitude = this.carterLatitude, 
                        this.covers[1].callout.content = this.distance(this.latitude, this.longitude, this.carterLatitude, this.carterLongitude);
                    },
                    flushCater: function() {
                        var t = this;
                        this.getCarterLocation(this.order_info.carter_user_id).then(function() {
                            t.timeFlush();
                        }).catch(function(t) {
                            console.log(t);
                        });
                    },
                    distance: function(t, e, i, o) {
                        var n = t * Math.PI / 180, r = i * Math.PI / 180, a = n - r, s = e * Math.PI / 180 - o * Math.PI / 180, u = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(n) * Math.cos(r) * Math.pow(Math.sin(s / 2), 2)));
                        return u *= 6378.137, (u = Math.round(1e4 * u) / 1e4) < 1 ? "距离您" + (1e3 * u).toFixed(0) + "米" : "距离您" + u.toFixed(1) + "公里";
                    },
                    reamrk_nums: function(t) {
                        var e = (t + "").split("-")[0], i = (t + "").split("-")[1];
                        return 0 == parseFloat(e) ? i + "以上" : t;
                    }
                }
            };
            e.default = o;
        }).call(this, i("543d").default);
    },
    a718: function(t, e, i) {
        i.d(e, "b", function() {
            return n;
        }), i.d(e, "c", function() {
            return r;
        }), i.d(e, "a", function() {
            return o;
        });
        var o = {
            uniRate: function() {
                return i.e("components/uni-rate/uni-rate").then(i.bind(null, "5cfa"));
            },
            uniPopup: function() {
                return Promise.all([ i.e("common/vendor"), i.e("components/uni-popup/uni-popup") ]).then(i.bind(null, "8575"));
            }
        }, n = function() {
            var t = this;
            t.$createElement;
            t._self._c, t._isMounted || (t.e0 = function(t) {
                t.stopPropagation(), t.preventDefault();
            }, t.e1 = function(e) {
                return t.$refs.popup.close();
            });
        }, r = [];
    },
    e119: function(t, e, i) {
        i.r(e);
        var o = i("a718"), n = i("5c86");
        for (var r in n) "default" !== r && function(t) {
            i.d(e, t, function() {
                return n[t];
            });
        }(r);
        i("0984");
        var a = i("f0c5"), s = Object(a.a)(n.default, o.b, o.c, !1, null, null, null, !1, o.a, void 0);
        e.default = s.exports;
    }
}, [ [ "07bf", "common/runtime", "common/vendor" ] ] ]);