(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/mine/merchantsEnter/merchantsEnter" ], {
    "0298": function(t, e, s) {},
    5175: function(t, e, s) {
        s.r(e);
        var n = s("ada9"), i = s.n(n);
        for (var o in n) "default" !== o && function(t) {
            s.d(e, t, function() {
                return n[t];
            });
        }(o);
        e.default = i.a;
    },
    7220: function(t, e, s) {
        var n = s("0298");
        s.n(n).a;
    },
    "8e4b": function(t, e, s) {
        s.d(e, "b", function() {
            return n;
        }), s.d(e, "c", function() {
            return i;
        }), s.d(e, "a", function() {});
        var n = function() {
            var t = this;
            t.$createElement;
            t._self._c, t._isMounted || (t.e0 = function(e) {
                t.isChecked = !t.isChecked;
            });
        }, i = [];
    },
    ada9: function(t, e, s) {
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var s = {
                data: function() {
                    return {
                        mer_name: "",
                        mer_store_number: "",
                        legal_name: "",
                        phone: "",
                        business_content: "",
                        choose_addr: "",
                        lat: "",
                        lng: "",
                        poi_address: "",
                        upImg1: {
                            show: !0,
                            url: ""
                        },
                        upImg3: {
                            show: !0,
                            url: ""
                        },
                        upImg4: {
                            show: !0,
                            url: ""
                        },
                        isChecked: !1
                    };
                },
                onLoad: function(t) {
                    var e = this;
                    if (t && t.data) {
                        var s = JSON.parse(t.data);
                        e.mer_name = s.mer_name, e.mer_store_number = s.mer_store_number, e.legal_name = s.legal_name, 
                        e.phone = s.phone, e.business_content = s.business_content, e.lat = s.lat, e.lng = s.lng, 
                        e.choose_addr = s.mer_poi_name, e.poi_address = s.mer_address;
                        var n = JSON.parse(s.business_license_img), i = JSON.parse(s.door_head_imgs);
                        this.upImg1.url = n[0], this.upImg1.show = !1, this.upImg3.url = i[0], this.upImg3.show = !1, 
                        i[1] && (this.upImg4.url = i[1], this.upImg4.show = !1);
                    }
                },
                methods: {
                    formSubmit: function(t) {
                        var e = [], s = [], n = /^1[3|4|5|7|8][0-9]\d{8}$/;
                        if (!this.mer_name) return this.$tips.toast("请输入企业名称");
                        if (!this.choose_addr) return this.$tips.toast("请选择地址");
                        if (!this.mer_store_number) return this.$tips.toast("请输入门牌号");
                        if (this.upImg1.url) {
                            if (this.upImg1.url && e.push(this.upImg1.url), !this.legal_name) return this.$tips.toast("请输入法人姓名");
                            if (this.phone) if (n.test(this.phone)) {
                                if (!this.business_content) return this.$tips.toast("请输入经营范围");
                                if (this.upImg3.url || this.upImg4.url) {
                                    if (this.upImg3.url && s.push(this.upImg3.url), this.upImg4.url && s.push(this.upImg4.url), 
                                    !this.isChecked) return this.$tips.toast("请阅读并同意用户协议");
                                    this.submitApply(e, s);
                                } else this.$tips.toast("请上传门头照");
                            } else this.$tips.toast("请输入正确的手机号"); else this.$tips.toast("请输入联系方式");
                        } else this.$tips.toast("请上传营业执照");
                    },
                    submitApply: function(e, s) {
                        var n = this;
                        this.$tips.loading();
                        var i = {
                            admin_key: this.$configs.adminKey,
                            mer_name: this.mer_name,
                            mer_poi_name: this.choose_addr,
                            mer_store_number: this.mer_store_number,
                            legal_name: this.legal_name,
                            phone: this.phone,
                            business_content: this.business_content,
                            mer_address: this.poi_address,
                            business_license_img: e,
                            door_head_imgs: s,
                            lat: this.lat,
                            lng: this.lng
                        };
                        this.$http.post("/merchant/info/addMerchantInfo", i).then(function(e) {
                            n.$tips.loaded(), e.code == n.$configs.httpSuccessStatus ? t.redirectTo({
                                url: "./result"
                            }) : n.$tips.toast(e.message);
                        }).catch(function(t) {
                            n.$tips.loaded(), n.$tips.toast(t.message || "网络异常"), console.log("异常", t);
                        });
                    },
                    choose_address: function() {
                        var e = this;
                        t.chooseLocation({
                            success: function(t) {
                                e.choose_addr = t.name, e.lat = t.latitude, e.lng = t.longitude, e.poi_address = t.address;
                            }
                        });
                    },
                    chooseImage: function(e) {
                        var s = this;
                        t.chooseImage({
                            cout: 1,
                            success: function(t) {
                                s.$http.get("/terminal/file/getUploadAuth").then(function(n) {
                                    var i = new Date().getTime() + Math.round(100 * Math.random());
                                    s.$http.upload(s.$configs.fileUploadHost, {
                                        filePath: t.tempFilePaths[0],
                                        name: "file",
                                        formData: {
                                            key: i,
                                            token: n.data
                                        }
                                    }).then(function(t) {
                                        s[e].show = !1, s[e].url = s.$configs.fileDownLoadHost + t.key;
                                    }).catch(function(t) {
                                        Promise.reject(t);
                                    });
                                }).catch(function() {
                                    s.$tips.toast("上传失败，稍后再试");
                                });
                            },
                            fail: function(t) {}
                        });
                    }
                }
            };
            e.default = s;
        }).call(this, s("543d").default);
    },
    e831: function(t, e, s) {
        s.r(e);
        var n = s("8e4b"), i = s("5175");
        for (var o in i) "default" !== o && function(t) {
            s.d(e, t, function() {
                return i[t];
            });
        }(o);
        s("7220");
        var a = s("f0c5"), r = Object(a.a)(i.default, n.b, n.c, !1, null, null, null, !1, n.a, void 0);
        e.default = r.exports;
    },
    fd84: function(t, e, s) {
        (function(t) {
            function e(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            s("b544"), e(s("66fd")), t(e(s("e831")).default);
        }).call(this, s("543d").createPage);
    }
}, [ [ "fd84", "common/runtime", "common/vendor" ] ] ]);