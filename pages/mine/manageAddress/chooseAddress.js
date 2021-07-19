(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/mine/manageAddress/chooseAddress" ], {
    2740: function(t, s, e) {
        e.r(s);
        var i = e("aac6"), a = e("9527");
        for (var n in a) "default" !== n && function(t) {
            e.d(s, t, function() {
                return a[t];
            });
        }(n);
        e("6957");
        var o = e("f0c5"), d = Object(o.a)(a.default, i.b, i.c, !1, null, null, null, !1, i.a, void 0);
        s.default = d.exports;
    },
    6957: function(t, s, e) {
        var i = e("99f8");
        e.n(i).a;
    },
    "76a8": function(t, s, e) {
        (function(t) {
            Object.defineProperty(s, "__esModule", {
                value: !0
            }), s.default = void 0;
            var e = getApp(), i = t.getRecorderManager(), a = {
                data: function() {
                    return {
                        address: "",
                        choose_addr: "",
                        user_name: "",
                        sexVal: "",
                        phone_num: "",
                        is_has_default_add: 0,
                        is_default: 0,
                        sel_switch: 0,
                        lat: "",
                        lng: "",
                        poi_address: "",
                        address_list: [],
                        id: null,
                        ad_code: "",
                        items: [ {
                            value: "1",
                            name: "先生",
                            checked: "true"
                        }, {
                            value: "2",
                            name: "女士"
                        } ],
                        options: [ {
                            text: "删除",
                            style: {
                                backgroundColor: "#F22B2B"
                            }
                        } ],
                        show_input_box: !1,
                        messages: "",
                        voicePath: "",
                        is_speaking: !1,
                        startUpVoice: !1
                    };
                },
                onLoad: function() {
                    var t = this;
                    this.sexVal = this.items[0].value;
                    var s = this;
                    i.onStop(function(t) {
                        s.voicePath = t.tempFilePath, s.startUpVoice && (s.biaDuVoiceToString(s.voicePath), 
                        s.startUpVoice = !1);
                    }), this.getUserDefAddress().then(function() {
                        var s = e.globalData.fromWOIAddInfo;
                        s && (t.address = s.address, t.choose_addr = s.choose_addr, t.user_name = s.user_name, 
                        t.sexVal = s.sex, t.phone_num = s.user_phone_num, t.lat = s.latitude, t.lng = s.longtiude, 
                        t.poi_address = s.poi_address, t.id = s.terminal_user_address_id || "", t.ad_code = s.ad_code, 
                        t.is_default = s.is_default, !t.is_default && t.is_has_default_add ? t.sel_switch = 0 : t.sel_switch = 1, 
                        e.globalData.fromWOIAddInfo = void 0);
                    });
                },
                onShow: function() {
                    this.getListAddress();
                },
                methods: {
                    getListAddress: function() {
                        var t = this;
                        this.$tips.loading(), this.$http.post("/terminalUser/addres/v2/listAddress").then(function(s) {
                            t.$tips.loaded(), s.code == t.$configs.httpSuccessStatus && (t.address_list = s.data);
                        }).catch(function(s) {
                            t.$tips.loaded(), t.$tips.toast(s.message), console.log("失败", s);
                        });
                    },
                    getAddress: function(t) {
                        var s = this;
                        return new Promise(function(e, i) {
                            s.$http.post("/terminalUser/addres/getAddress", {
                                id: t
                            }).then(function(t) {
                                t.code == s.$configs.httpSuccessStatus && e(t);
                            }).catch(function(t) {
                                i(t), s.$tips.toast(t.message), console.log("失败", t);
                            });
                        });
                    },
                    saveAddres: function() {
                        var s = this;
                        if ("" == this.choose_addr) return this.$tips.toast("请选择地址");
                        if ("" == this.address) return this.$tips.toast("请填写门牌号");
                        if ("" == this.user_name) return this.$tips.toast("请填写姓名");
                        if (0 == this.lat || 0 == this.lng) return this.$tips.toast("请选择正确的地址");
                        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone_num)) return this.$tips.toast("请填写正确手机号");
                        var e = {
                            address: this.address,
                            id: this.id,
                            is_default: this.sel_switch,
                            lat: this.lat,
                            lng: this.lng,
                            name: this.user_name,
                            phone: this.phone_num,
                            poi_address: this.poi_address,
                            poi_name: this.choose_addr,
                            sex: this.sexVal
                        };
                        this.$tips.loading(), this.$http.post("/terminalUser/addres/v2/saveAddres", e).then(function(i) {
                            s.$tips.loaded(), i.code == s.$configs.httpSuccessStatus ? (s.$tips.toast("保存成功"), 
                            e.id = i.data, s.getAddress(i.data).then(function(s) {
                                e.area_code = s.data.area_code, setTimeout(function() {
                                    t.$emit("hasAddr", e);
                                }, 500), t.navigateBack();
                            })) : s.$tips.toast(i.message);
                        }).catch(function(t) {
                            s.$tips.loaded(), s.$tips.toast(t.message), console.log("失败", t);
                        });
                    },
                    toDel: function(t) {
                        var s = this;
                        return new Promise(function(e, i) {
                            s.$tips.loading(), s.$http.post("/terminalUser/addres/delAddres", {
                                id: t
                            }).then(function(t) {
                                s.$tips.loaded(), t.code == s.$configs.httpSuccessStatus && (s.$tips.toast("删除成功"), 
                                e(t));
                            }).catch(function(t) {
                                reject(t), s.$tips.loaded(), s.$tips.toast(t.message), console.log("失败", t);
                            });
                        });
                    },
                    getUserDefAddress: function() {
                        var t = this;
                        return new Promise(function(s, e) {
                            t.$tips.loading(), t.$http.get("/terminalUser/addres/v2/defaultAddress").then(function(e) {
                                t.$tips.loaded(), e.code == t.$configs.httpSuccessStatus && e.data ? t.is_has_default_add = 1 : (t.is_has_default_add = 0, 
                                t.sel_switch = 1), s();
                            }).catch(function(s) {
                                e(), t.$tips.loaded(), t.$tips.toast(s.message), console.log("失败", s);
                            });
                        });
                    },
                    baiDuImageToString: function(t) {
                        var s = this;
                        this.$tips.loading(), this.$http.upload("/terminalUser/addres/public/baiDuImageToString", {
                            filePath: t,
                            name: "file"
                        }).then(function(t) {
                            if (s.$tips.loaded(), t.code == s.$configs.httpSuccessStatus) {
                                var e = "";
                                t.data.words_result.forEach(function(t, s) {
                                    e += t.words;
                                }), s.messages = e;
                            } else s.$tips.toast(t.message);
                        }).catch(function(t) {
                            s.$tips.loaded(), s.$tips.toast(t.message), console.log("失败", t);
                        });
                    },
                    biaDuVoiceToString: function(t) {
                        var s = this;
                        this.$tips.loading(), this.$http.upload("/terminalUser/addres/public/biaDuVoiceToString", {
                            filePath: t,
                            name: "file"
                        }).then(function(t) {
                            if (s.$tips.loaded(), t.code == s.$configs.httpSuccessStatus) {
                                var e = "";
                                t.data.result.forEach(function(t, s) {
                                    e += t;
                                }), s.messages = e;
                            } else s.$tips.toast(t.message);
                        }).catch(function(t) {
                            s.$tips.loaded(), s.$tips.toast(t.message), console.log("失败", t);
                        });
                    },
                    addressTextToAddress: function(t) {
                        var s = this;
                        this.$tips.loading(), this.$http.get("/terminalUser/addres/addressTextToAddress?address_str=" + t).then(function(t) {
                            if (s.$tips.loaded(), t.code == s.$configs.httpSuccessStatus) {
                                if (0 == t.data.lat || 0 == t.data.lng) return s.$tips.toast("请填写完整的地址");
                                s.address = t.data.detail, s.lat = t.data.lat, s.lng = t.data.lng, s.user_name = t.data.person, 
                                s.phone_num = t.data.phonenum, s.poi_address = t.data.province + t.data.city + t.data.county + t.data.detail, 
                                s.choose_addr = t.data.detail;
                            } else s.$tips.toast(t.message);
                        }).catch(function(t) {
                            s.$tips.loaded(), s.$tips.toast(t.message), console.log("失败", t);
                        });
                    },
                    changeAddress: function(s, e, i, a) {
                        t.navigateTo({
                            url: "./addAddress?id=" + s + "&lat=" + e + "&lng" + i + "&area_code=" + a
                        });
                    },
                    goBack: function(s) {
                        setTimeout(function() {
                            t.$emit("hasAddr", s);
                        }, 500), t.navigateBack({});
                    },
                    toDelAddress: function(t) {
                        var s = this, e = this;
                        this.toDel(t).then(function(i) {
                            s.address_list.forEach(function(s, i) {
                                s.id == t && e.address_list.splice(i, 1);
                            });
                        });
                    },
                    addAdd: function() {
                        var s = this;
                        this.lat && this.lng ? t.chooseLocation({
                            latitude: s.lat,
                            longitude: s.lng,
                            success: function(t) {
                                s.choose_addr = t.name, s.lat = t.latitude, s.lng = t.longitude, s.poi_address = t.address;
                            }
                        }) : t.chooseLocation({
                            success: function(t) {
                                s.choose_addr = t.name, s.lat = t.latitude, s.lng = t.longitude, s.poi_address = t.address;
                            }
                        });
                    },
                    chooseSex: function(t) {
                        for (var s = 0; s < this.items.length; s++) if (this.items[s].value == t.target.value) {
                            this.sexVal = this.items[s].value;
                            break;
                        }
                    },
                    toShowInputBox: function() {
                        this.show_input_box = !0;
                    },
                    textInput: function(t) {
                        this.messages = t.detail.value;
                    },
                    toClearMessages: function() {
                        this.messages = "";
                    },
                    toChooseImg: function() {
                        var s = this;
                        s.show_input_box = !0, t.chooseImage({
                            count: 1,
                            success: function(t) {
                                s.baiDuImageToString(t.tempFilePaths[0]);
                            }
                        });
                    },
                    toClearUserInfo: function() {
                        this.address = "", this.lat = "", this.lng = "", this.user_name = "", this.phone_num = "", 
                        this.poi_address = "", this.choose_addr = "", this.sexVal = this.items[0].value;
                    },
                    toOpenVoicePopup: function() {
                        var s = this;
                        t.authorize({
                            scope: "scope.record",
                            success: function() {
                                i.start({
                                    format: "PCM",
                                    sampleRate: 16e3,
                                    numberOfChannels: 1
                                }), s.show_input_box = !0, s.$refs.voicePropu.open(), s.is_speaking = !0;
                            },
                            fail: function() {
                                s.$tips.modal("请打开麦克风权限").then(function(e) {
                                    t.openSetting({
                                        success: function(t) {
                                            t.authSetting["scope.record"] && s.toOpenVoicePopup();
                                        },
                                        fail: function(t) {
                                            console.log(t);
                                        }
                                    });
                                });
                            }
                        });
                    },
                    toClosePopup: function() {
                        this.is_speaking = !1, i.stop(), this.startUpVoice = !0, this.$refs.voicePropu.close();
                    },
                    switchChange: function(t) {
                        this.sel_switch = t.target.value, t.target.value ? this.sel_switch = 1 : this.sel_switch = 0;
                    }
                }
            };
            s.default = a;
        }).call(this, e("543d").default);
    },
    9527: function(t, s, e) {
        e.r(s);
        var i = e("76a8"), a = e.n(i);
        for (var n in i) "default" !== n && function(t) {
            e.d(s, t, function() {
                return i[t];
            });
        }(n);
        s.default = a.a;
    },
    "99f8": function(t, s, e) {},
    a18a: function(t, s, e) {
        (function(t) {
            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            e("b544"), s(e("66fd")), t(s(e("2740")).default);
        }).call(this, e("543d").createPage);
    },
    aac6: function(t, s, e) {
        e.d(s, "b", function() {
            return a;
        }), e.d(s, "c", function() {
            return n;
        }), e.d(s, "a", function() {
            return i;
        });
        var i = {
            uniSwipeAction: function() {
                return e.e("components/uni-swipe-action/uni-swipe-action").then(e.bind(null, "97f9"));
            },
            uniSwipeActionItem: function() {
                return Promise.all([ e.e("common/vendor"), e.e("components/uni-swipe-action-item/uni-swipe-action-item") ]).then(e.bind(null, "54b4"));
            },
            uniPopup: function() {
                return Promise.all([ e.e("common/vendor"), e.e("components/uni-popup/uni-popup") ]).then(e.bind(null, "8575"));
            }
        }, a = function() {
            var t = this;
            t.$createElement;
            t._self._c;
        }, n = [];
    }
}, [ [ "a18a", "common/runtime", "common/vendor" ] ] ]);