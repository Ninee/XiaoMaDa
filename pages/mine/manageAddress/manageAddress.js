(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/mine/manageAddress/manageAddress" ], {
    "078c": function(t, e, d) {
        (function(t) {
            function e(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            d("b544"), e(d("66fd")), t(e(d("cee9")).default);
        }).call(this, d("543d").createPage);
    },
    2466: function(t, e, d) {
        d.r(e);
        var n = d("9a09"), i = d.n(n);
        for (var s in n) "default" !== s && function(t) {
            d.d(e, t, function() {
                return n[t];
            });
        }(s);
        e.default = i.a;
    },
    "8a55": function(t, e, d) {
        d.d(e, "b", function() {
            return n;
        }), d.d(e, "c", function() {
            return i;
        }), d.d(e, "a", function() {});
        var n = function() {
            var t = this, e = (t.$createElement, t._self._c, t.is_editing && t.address.length > 0 ? t.__map(t.address, function(e, d) {
                return {
                    $orig: t.__get_orig(e),
                    g0: t.sel_addr_id_arr.indexOf(e.id)
                };
            }) : null);
            t._isMounted || (t.e0 = function(e) {
                t.is_editing = !t.is_editing;
            }), t.$mp.data = Object.assign({}, {
                $root: {
                    l0: e
                }
            });
        }, i = [];
    },
    "905c": function(t, e, d) {},
    "9a09": function(t, e, d) {
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var d = {
                data: function() {
                    return {
                        address: [],
                        fromWriterOrderInfo: 0,
                        is_editing: !1,
                        default_addr_id: 0,
                        sel_addr_id_arr: []
                    };
                },
                onLoad: function(t) {
                    t && t.fromWriterOrderInfo && (this.fromWriterOrderInfo = t.fromWriterOrderInfo);
                },
                onShow: function() {
                    this.getAllAddress();
                },
                methods: {
                    choose: function(e) {
                        this.fromWriterOrderInfo && (setTimeout(function() {
                            t.$emit("hasAddr", e);
                        }, 500), t.navigateBack({}));
                    },
                    toEdit: function(e) {
                        this.fromWriterOrderInfo ? t.navigateTo({
                            url: "./addAddress?id=" + e
                        }) : t.navigateTo({
                            url: "./addAddress?id=" + e + "&goBackOne=1"
                        });
                    },
                    toDel: function(t, e) {
                        var d = this, n = t;
                        1 == e && (n = [ t ]), this.$tips.confirm("确认是否删除所选地址").then(function(t) {
                            d.$http.post("/terminalUser/addres/v2/delAddres", {
                                ids: n
                            }).then(function(t) {
                                t.code == d.$configs.httpSuccessStatus ? (d.$tips.toast("删除成功"), d.sel_addr_id_arr = [], 
                                d.getAllAddress()) : d.$tips.toast(t.message);
                            }).catch(function(t) {
                                d.$tips.toast(t.message), console.log("失败", t);
                            });
                        }).catch(function(t) {});
                    },
                    getAllAddress: function() {
                        var t = this;
                        this.$http.post("/terminalUser/addres/v2/listAddress").then(function(e) {
                            e.code == t.$configs.httpSuccessStatus ? (t.address = e.data, t.address.forEach(function(e) {
                                1 == e.is_default && (t.default_addr_id = e.id);
                            })) : t.$tips.toast(e.message);
                        }).catch(function(e) {
                            t.$tips.loaded(), t.$tips.toast(e.message), console.log("失败", e);
                        });
                    },
                    setDefaultAddr: function(e) {
                        var d = this;
                        if (1 != e.is_default) {
                            var n = {
                                address: e.address,
                                id: e.id,
                                is_default: 1,
                                lat: e.lat,
                                lng: e.lng,
                                name: e.name,
                                phone: e.phone,
                                poi_address: e.poi_address,
                                poi_name: e.poi_name,
                                sex: e.sex
                            };
                            this.$tips.loading(), this.$http.post("/terminalUser/addres/v2/saveAddres", n).then(function(e) {
                                d.$tips.loaded(), e.code == d.$configs.httpSuccessStatus && (d.$tips.toast("设置成功"), 
                                d.getAllAddress(), t.pageScrollTo({
                                    scrollTop: 0,
                                    duration: 300
                                }));
                            }).catch(function(t) {
                                d.$tips.loaded(), d.$tips.toast(t.message), console.log("失败", t);
                            });
                        }
                    },
                    selOperationAddr: function(t) {
                        var e = this;
                        -1 == this.sel_addr_id_arr.indexOf(t) ? this.sel_addr_id_arr.push(t) : this.sel_addr_id_arr.forEach(function(d, n) {
                            d == t && e.sel_addr_id_arr.splice(n, 1);
                        });
                    },
                    toAddAddr: function() {
                        this.fromWriterOrderInfo ? t.navigateTo({
                            url: "./addAddress"
                        }) : t.navigateTo({
                            url: "./addAddress?goBackOne=1"
                        });
                    },
                    overOperation: function() {
                        this.is_editing = !this.is_editing, this.sel_addr_id_arr = [];
                    }
                }
            };
            e.default = d;
        }).call(this, d("543d").default);
    },
    a7f3: function(t, e, d) {
        var n = d("905c");
        d.n(n).a;
    },
    cee9: function(t, e, d) {
        d.r(e);
        var n = d("8a55"), i = d("2466");
        for (var s in i) "default" !== s && function(t) {
            d.d(e, t, function() {
                return i[t];
            });
        }(s);
        d("a7f3");
        var a = d("f0c5"), r = Object(a.a)(i.default, n.b, n.c, !1, null, null, null, !1, n.a, void 0);
        e.default = r.exports;
    }
}, [ [ "078c", "common/runtime", "common/vendor" ] ] ]);