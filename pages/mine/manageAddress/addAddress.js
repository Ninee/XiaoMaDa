(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/mine/manageAddress/addAddress" ], {
    "0a36": function(t, s, e) {
        (function(t) {
            Object.defineProperty(s, "__esModule", {
                value: !0
            }), s.default = void 0;
            var e = t.getRecorderManager(), i = {
                data: function() {
                    return {
                        address: "",
                        choose_addr: "",
                        user_name: "",
                        sexVal: "",
                        phone_num: "",
                        is_default: 0,
                        sel_switch: 0,
                        lat: "",
                        lng: "",
                        poi_address: "",
                        id: null,
                        items: [ {
                            value: "1",
                            name: "先生",
                            checked: "true"
                        }, {
                            value: "2",
                            name: "女士"
                        } ],
                        is_speaking: !1,
                        area_code: "",
                        show_input_box: !1,
                        messages: "",
                        voicePath: "",
                        startUpVoice: !1,
                        goBackOne: 0
                    };
                },
                onLoad: function(t) {
                    var s = this, i = this;
                    this.sexVal = this.items[0].value, t && t.id > 0 ? (this.id = t.id, this.getUserDefAddress().then(function(t) {
                        t.msg && s.getChangeAddress(s.id);
                    })) : this.getUserDefAddress(), t && t.goBackOne && (this.goBackOne = t.goBackOne), 
                    e.onStop(function(t) {
                        i.voicePath = t.tempFilePath, i.startUpVoice && (i.biaDuVoiceToString(i.voicePath), 
                        i.startUpVoice = !1);
                    });
                },
                methods: {
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
                            sex: this.sexVal,
                            area_code: this.area_code
                        };
                        this.$tips.loading(), this.$http.post("/terminalUser/addres/v2/saveAddres", e).then(function(i) {
                            s.$tips.loaded(), i.code == s.$configs.httpSuccessStatus && (s.$tips.toast("保存成功"), 
                            e.id = i.data, setTimeout(function() {
                                t.$emit("hasAddr", e);
                            }, 500), s.goBackOne ? t.navigateBack() : t.navigateBack({
                                delta: 2
                            }));
                        }).catch(function(t) {
                            s.$tips.loaded(), s.$tips.toast(t.message), console.log("失败", t);
                        });
                    },
                    toDel: function() {
                        var s = this;
                        this.$tips.loading(), this.$http.post("/terminalUser/addres/v2/delAddres", {
                            ids: [ this.id ]
                        }).then(function(e) {
                            s.$tips.loaded(), e.code == s.$configs.httpSuccessStatus && (t.navigateBack(), s.$tips.toast("删除成功"));
                        }).catch(function(t) {
                            s.$tips.loaded(), s.$tips.toast(t.message), console.log("失败", t);
                        });
                    },
                    lonAndLatToAddress: function() {
                        var t = this;
                        this.$tips.loading(), this.$http.get("/inverse/geocoding/public/v2/getInverseGeocoding?lon_and_lat=" + this.lng + "," + this.lat).then(function(s) {
                            t.$tips.loaded(), s.code == t.$configs.httpSuccessStatus ? t.area_code = s.data.address_component.adcode : t.$tips.toast(s.message);
                        }).catch(function(s) {
                            t.$tips.loaded(), t.$tips.toast(s.message || "网络异常"), console.log("异常", s);
                        });
                    },
                    changeAddress: function(t) {
                        this.choose_addr = t.poi_name, this.address = t.address, this.poi_address = t.poi_address, 
                        this.user_name = t.name, this.sexVal = t.sex, this.phone_num = t.phone, 1 == this.is_default ? this.sel_switch = t.is_default : this.sel_switch = 1, 
                        this.id = t.id, this.lat = t.lat, this.lng = t.lng, this.area_code = t.area_code;
                    },
                    getUserDefAddress: function() {
                        var t = this;
                        return new Promise(function(s, e) {
                            t.$tips.loading(), t.$http.get("/terminalUser/addres/v2/defaultAddress").then(function(e) {
                                t.$tips.loaded(), e.code == t.$configs.httpSuccessStatus && e.data ? t.is_default = 1 : (t.is_default = 0, 
                                t.sel_switch = 1), s({
                                    msg: !0
                                });
                            }).catch(function(s) {
                                e({
                                    msg: !1
                                }), t.$tips.loaded(), t.$tips.toast(s.message), console.log("失败", s);
                            });
                        });
                    },
                    addAdd: function() {
                        var s = this;
                        this.lat && this.lng ? t.chooseLocation({
                            latitude: s.lat,
                            longitude: s.lng,
                            success: function(t) {
                                s.choose_addr = t.name, s.lat = t.latitude, s.lng = t.longitude, s.poi_address = t.address, 
                                s.lonAndLatToAddress();
                            }
                        }) : t.chooseLocation({
                            success: function(t) {
                                s.choose_addr = t.name, s.lat = t.latitude, s.lng = t.longitude, s.poi_address = t.address, 
                                s.lonAndLatToAddress();
                            }
                        });
                    },
                    getChangeAddress: function(t) {
                        var s = this;
                        this.$http.post("/terminalUser/addres/v2/getAddress", {
                            id: t
                        }).then(function(t) {
                            t.code == s.$configs.httpSuccessStatus && s.changeAddress(t.data);
                        }).catch(function(t) {
                            s.$tips.toast(t.message), console.log("失败", t);
                        });
                    },
                    chooseSex: function(t) {
                        for (var s = 0; s < this.items.length; s++) if (this.items[s].value == t.target.value) {
                            this.sexVal = this.items[s].value;
                            break;
                        }
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
                            if (s.$tips.loaded(), t.code == s.$configs.httpSuccessStatus && t.data.result) {
                                var e = "";
                                t.data.result.forEach(function(t, s) {
                                    e += t;
                                }), s.messages = e;
                            } else s.$tips.toast("请再试一次");
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
                    switchChange: function(t) {
                        t.target.value ? this.sel_switch = 1 : this.sel_switch = 0;
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
                                e.start({
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
                        this.is_speaking = !1, e.stop(), this.startUpVoice = !0, this.$refs.voicePropu.close();
                    }
                }
            };
            s.default = i;
        }).call(this, e("543d").default);
    },
    "4fd3": function(t, s, e) {
        e.r(s);
        var i = e("6eae"), a = e("a49c");
        for (var n in a) "default" !== n && function(t) {
            e.d(s, t, function() {
                return a[t];
            });
        }(n);
        e("63ec");
        var o = e("f0c5"), d = Object(o.a)(a.default, i.b, i.c, !1, null, null, null, !1, i.a, void 0);
        s.default = d.exports;
    },
    "63ec": function(t, s, e) {
        var i = e("8374");
        e.n(i).a;
    },
    "6eae": function(t, s, e) {
        e.d(s, "b", function() {
            return a;
        }), e.d(s, "c", function() {
            return n;
        }), e.d(s, "a", function() {
            return i;
        });
        var i = {
            uniPopup: function() {
                return Promise.all([ e.e("common/vendor"), e.e("components/uni-popup/uni-popup") ]).then(e.bind(null, "8575"));
            }
        }, a = function() {
            var t = this;
            t.$createElement;
            t._self._c, t._isMounted || (t.e0 = function(s) {
                t.is_speaking = !0;
            }, t.e1 = function(s) {
                t.is_speaking = !1;
            });
        }, n = [];
    },
    8122: function(t, s, e) {
        (function(t) {
            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            e("b544"), s(e("66fd")), t(s(e("4fd3")).default);
        }).call(this, e("543d").createPage);
    },
    8374: function(t, s, e) {},
    a49c: function(t, s, e) {
        e.r(s);
        var i = e("0a36"), a = e.n(i);
        for (var n in i) "default" !== n && function(t) {
            e.d(s, t, function() {
                return i[t];
            });
        }(n);
        s.default = a.a;
    }
}, [ [ "8122", "common/runtime", "common/vendor" ] ] ]);