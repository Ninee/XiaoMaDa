var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

(global.webpackJsonp = global.webpackJsonp || []).push([ [ "common/vendor" ], {
    "03a0": function(t, e, n) {
        function r(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(t);
                e && (r = r.filter(function(e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                })), n.push.apply(n, r);
            }
            return n;
        }
        function i(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? r(Object(n), !0).forEach(function(e) {
                    o(t, e, n[e]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach(function(e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                });
            }
            return t;
        }
        function o(t, e, n) {
            return e in t ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t;
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var a = n("fe81"), s = function(t, e, n) {
            var r = {};
            return t.forEach(function(t) {
                void 0 !== n[t] ? r[t] = n[t] : void 0 !== e[t] && (r[t] = e[t]);
            }), r;
        };
        e.default = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = e.method || t.method || "GET", r = {
                baseURL: t.baseURL || "",
                method: n,
                url: e.url || "",
                params: e.params || {},
                custom: i(i({}, t.custom || {}), e.custom || {}),
                header: (0, a.deepMerge)(t.header || {}, e.header || {})
            }, o = [ "getTask", "validateStatus" ];
            if (r = i(i({}, r), s(o, t, e)), "DOWNLOAD" === n) ; else if ("UPLOAD" === n) {
                delete r.header["content-type"], delete r.header["Content-Type"];
                var l = [ "filePath", "name", "formData" ];
                l.forEach(function(t) {
                    void 0 !== e[t] && (r[t] = e[t]);
                });
            } else {
                var c = [ "data", "timeout", "dataType", "responseType" ];
                r = i(i({}, r), s(c, t, e));
            }
            return r;
        };
    },
    "0b27": function(t, e, n) {
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var n = {};
            !function() {
                function e(t) {
                    this.mode = l.MODE_8BIT_BYTE, this.data = t;
                }
                function r(t, e) {
                    this.typeNumber = t, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, 
                    this.dataCache = null, this.dataList = new Array();
                }
                function i(t, e) {
                    if (void 0 == t.length) throw new Error(t.length + "/" + e);
                    for (var n = 0; n < t.length && 0 == t[n]; ) n++;
                    this.num = new Array(t.length - n + e);
                    for (var r = 0; r < t.length - n; r++) this.num[r] = t[r + n];
                }
                function o(t, e) {
                    this.totalCount = t, this.dataCount = e;
                }
                function a() {
                    this.buffer = new Array(), this.length = 0;
                }
                function s(t) {
                    for (var e, n = "", r = 0; r < t.length; r++) (e = t.charCodeAt(r)) >= 1 && e <= 127 ? n += t.charAt(r) : e > 2047 ? (n += String.fromCharCode(224 | e >> 12 & 15), 
                    n += String.fromCharCode(128 | e >> 6 & 63), n += String.fromCharCode(128 | e >> 0 & 63)) : (n += String.fromCharCode(192 | e >> 6 & 31), 
                    n += String.fromCharCode(128 | e >> 0 & 63));
                    return n;
                }
                e.prototype = {
                    getLength: function(t) {
                        return this.data.length;
                    },
                    write: function(t) {
                        for (var e = 0; e < this.data.length; e++) t.put(this.data.charCodeAt(e), 8);
                    }
                }, r.prototype = {
                    addData: function(t) {
                        var n = new e(t);
                        this.dataList.push(n), this.dataCache = null;
                    },
                    isDark: function(t, e) {
                        if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e) throw new Error(t + "," + e);
                        return this.modules[t][e];
                    },
                    getModuleCount: function() {
                        return this.moduleCount;
                    },
                    make: function() {
                        if (this.typeNumber < 1) {
                            var t = 1;
                            for (t = 1; t < 40; t++) {
                                for (var e = o.getRSBlocks(t, this.errorCorrectLevel), n = new a(), r = 0, i = 0; i < e.length; i++) r += e[i].dataCount;
                                for (i = 0; i < this.dataList.length; i++) {
                                    var s = this.dataList[i];
                                    n.put(s.mode, 4), n.put(s.getLength(), f.getLengthInBits(s.mode, t)), s.write(n);
                                }
                                if (n.getLengthInBits() <= 8 * r) break;
                            }
                            this.typeNumber = t;
                        }
                        this.makeImpl(!1, this.getBestMaskPattern());
                    },
                    makeImpl: function(t, e) {
                        this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
                        for (var n = 0; n < this.moduleCount; n++) {
                            this.modules[n] = new Array(this.moduleCount);
                            for (var i = 0; i < this.moduleCount; i++) this.modules[n][i] = null;
                        }
                        this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), 
                        this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), 
                        this.setupTimingPattern(), this.setupTypeInfo(t, e), this.typeNumber >= 7 && this.setupTypeNumber(t), 
                        null == this.dataCache && (this.dataCache = r.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), 
                        this.mapData(this.dataCache, e);
                    },
                    setupPositionProbePattern: function(t, e) {
                        for (var n = -1; n <= 7; n++) if (!(t + n <= -1 || this.moduleCount <= t + n)) for (var r = -1; r <= 7; r++) e + r <= -1 || this.moduleCount <= e + r || (this.modules[t + n][e + r] = 0 <= n && n <= 6 && (0 == r || 6 == r) || 0 <= r && r <= 6 && (0 == n || 6 == n) || 2 <= n && n <= 4 && 2 <= r && r <= 4);
                    },
                    getBestMaskPattern: function() {
                        for (var t = 0, e = 0, n = 0; n < 8; n++) {
                            this.makeImpl(!0, n);
                            var r = f.getLostPoint(this);
                            (0 == n || t > r) && (t = r, e = n);
                        }
                        return e;
                    },
                    createMovieClip: function(t, e, n) {
                        var r = t.createEmptyMovieClip(e, n);
                        this.make();
                        for (var i = 0; i < this.modules.length; i++) for (var o = 1 * i, a = 0; a < this.modules[i].length; a++) {
                            var s = 1 * a;
                            this.modules[i][a] && (r.beginFill(0, 100), r.moveTo(s, o), r.lineTo(s + 1, o), 
                            r.lineTo(s + 1, o + 1), r.lineTo(s, o + 1), r.endFill());
                        }
                        return r;
                    },
                    setupTimingPattern: function() {
                        for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0);
                        for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0);
                    },
                    setupPositionAdjustPattern: function() {
                        for (var t = f.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++) for (var n = 0; n < t.length; n++) {
                            var r = t[e], i = t[n];
                            if (null == this.modules[r][i]) for (var o = -2; o <= 2; o++) for (var a = -2; a <= 2; a++) this.modules[r + o][i + a] = -2 == o || 2 == o || -2 == a || 2 == a || 0 == o && 0 == a;
                        }
                    },
                    setupTypeNumber: function(t) {
                        for (var e = f.getBCHTypeNumber(this.typeNumber), n = 0; n < 18; n++) {
                            var r = !t && 1 == (e >> n & 1);
                            this.modules[Math.floor(n / 3)][n % 3 + this.moduleCount - 8 - 3] = r;
                        }
                        for (n = 0; n < 18; n++) r = !t && 1 == (e >> n & 1), this.modules[n % 3 + this.moduleCount - 8 - 3][Math.floor(n / 3)] = r;
                    },
                    setupTypeInfo: function(t, e) {
                        for (var n = this.errorCorrectLevel << 3 | e, r = f.getBCHTypeInfo(n), i = 0; i < 15; i++) {
                            var o = !t && 1 == (r >> i & 1);
                            i < 6 ? this.modules[i][8] = o : i < 8 ? this.modules[i + 1][8] = o : this.modules[this.moduleCount - 15 + i][8] = o;
                        }
                        for (i = 0; i < 15; i++) o = !t && 1 == (r >> i & 1), i < 8 ? this.modules[8][this.moduleCount - i - 1] = o : i < 9 ? this.modules[8][15 - i - 1 + 1] = o : this.modules[8][15 - i - 1] = o;
                        this.modules[this.moduleCount - 8][8] = !t;
                    },
                    mapData: function(t, e) {
                        for (var n = -1, r = this.moduleCount - 1, i = 7, o = 0, a = this.moduleCount - 1; a > 0; a -= 2) for (6 == a && a--; ;) {
                            for (var s = 0; s < 2; s++) if (null == this.modules[r][a - s]) {
                                var l = !1;
                                o < t.length && (l = 1 == (t[o] >>> i & 1)), f.getMask(e, r, a - s) && (l = !l), 
                                this.modules[r][a - s] = l, -1 == --i && (o++, i = 7);
                            }
                            if ((r += n) < 0 || this.moduleCount <= r) {
                                r -= n, n = -n;
                                break;
                            }
                        }
                    }
                }, r.PAD0 = 236, r.PAD1 = 17, r.createData = function(t, e, n) {
                    for (var i = o.getRSBlocks(t, e), s = new a(), l = 0; l < n.length; l++) {
                        var c = n[l];
                        s.put(c.mode, 4), s.put(c.getLength(), f.getLengthInBits(c.mode, t)), c.write(s);
                    }
                    var u = 0;
                    for (l = 0; l < i.length; l++) u += i[l].dataCount;
                    if (s.getLengthInBits() > 8 * u) throw new Error("code length overflow. (" + s.getLengthInBits() + ">" + 8 * u + ")");
                    for (s.getLengthInBits() + 4 <= 8 * u && s.put(0, 4); s.getLengthInBits() % 8 != 0; ) s.putBit(!1);
                    for (;;) {
                        if (s.getLengthInBits() >= 8 * u) break;
                        if (s.put(r.PAD0, 8), s.getLengthInBits() >= 8 * u) break;
                        s.put(r.PAD1, 8);
                    }
                    return r.createBytes(s, i);
                }, r.createBytes = function(t, e) {
                    for (var n = 0, r = 0, o = 0, a = new Array(e.length), s = new Array(e.length), l = 0; l < e.length; l++) {
                        var c = e[l].dataCount, u = e[l].totalCount - c;
                        r = Math.max(r, c), o = Math.max(o, u), a[l] = new Array(c);
                        for (var h = 0; h < a[l].length; h++) a[l][h] = 255 & t.buffer[h + n];
                        n += c;
                        var d = f.getErrorCorrectPolynomial(u), p = new i(a[l], d.getLength() - 1).mod(d);
                        for (s[l] = new Array(d.getLength() - 1), h = 0; h < s[l].length; h++) {
                            var g = h + p.getLength() - s[l].length;
                            s[l][h] = g >= 0 ? p.get(g) : 0;
                        }
                    }
                    var y = 0;
                    for (h = 0; h < e.length; h++) y += e[h].totalCount;
                    var v = new Array(y), b = 0;
                    for (h = 0; h < r; h++) for (l = 0; l < e.length; l++) h < a[l].length && (v[b++] = a[l][h]);
                    for (h = 0; h < o; h++) for (l = 0; l < e.length; l++) h < s[l].length && (v[b++] = s[l][h]);
                    return v;
                };
                for (var l = {
                    MODE_NUMBER: 1,
                    MODE_ALPHA_NUM: 2,
                    MODE_8BIT_BYTE: 4,
                    MODE_KANJI: 8
                }, c = {
                    L: 1,
                    M: 0,
                    Q: 3,
                    H: 2
                }, u = {
                    PATTERN000: 0,
                    PATTERN001: 1,
                    PATTERN010: 2,
                    PATTERN011: 3,
                    PATTERN100: 4,
                    PATTERN101: 5,
                    PATTERN110: 6,
                    PATTERN111: 7
                }, f = {
                    PATTERN_POSITION_TABLE: [ [], [ 6, 18 ], [ 6, 22 ], [ 6, 26 ], [ 6, 30 ], [ 6, 34 ], [ 6, 22, 38 ], [ 6, 24, 42 ], [ 6, 26, 46 ], [ 6, 28, 50 ], [ 6, 30, 54 ], [ 6, 32, 58 ], [ 6, 34, 62 ], [ 6, 26, 46, 66 ], [ 6, 26, 48, 70 ], [ 6, 26, 50, 74 ], [ 6, 30, 54, 78 ], [ 6, 30, 56, 82 ], [ 6, 30, 58, 86 ], [ 6, 34, 62, 90 ], [ 6, 28, 50, 72, 94 ], [ 6, 26, 50, 74, 98 ], [ 6, 30, 54, 78, 102 ], [ 6, 28, 54, 80, 106 ], [ 6, 32, 58, 84, 110 ], [ 6, 30, 58, 86, 114 ], [ 6, 34, 62, 90, 118 ], [ 6, 26, 50, 74, 98, 122 ], [ 6, 30, 54, 78, 102, 126 ], [ 6, 26, 52, 78, 104, 130 ], [ 6, 30, 56, 82, 108, 134 ], [ 6, 34, 60, 86, 112, 138 ], [ 6, 30, 58, 86, 114, 142 ], [ 6, 34, 62, 90, 118, 146 ], [ 6, 30, 54, 78, 102, 126, 150 ], [ 6, 24, 50, 76, 102, 128, 154 ], [ 6, 28, 54, 80, 106, 132, 158 ], [ 6, 32, 58, 84, 110, 136, 162 ], [ 6, 26, 54, 82, 110, 138, 166 ], [ 6, 30, 58, 86, 114, 142, 170 ] ],
                    G15: 1335,
                    G18: 7973,
                    G15_MASK: 21522,
                    getBCHTypeInfo: function(t) {
                        for (var e = t << 10; f.getBCHDigit(e) - f.getBCHDigit(f.G15) >= 0; ) e ^= f.G15 << f.getBCHDigit(e) - f.getBCHDigit(f.G15);
                        return (t << 10 | e) ^ f.G15_MASK;
                    },
                    getBCHTypeNumber: function(t) {
                        for (var e = t << 12; f.getBCHDigit(e) - f.getBCHDigit(f.G18) >= 0; ) e ^= f.G18 << f.getBCHDigit(e) - f.getBCHDigit(f.G18);
                        return t << 12 | e;
                    },
                    getBCHDigit: function(t) {
                        for (var e = 0; 0 != t; ) e++, t >>>= 1;
                        return e;
                    },
                    getPatternPosition: function(t) {
                        return f.PATTERN_POSITION_TABLE[t - 1];
                    },
                    getMask: function(t, e, n) {
                        switch (t) {
                          case u.PATTERN000:
                            return (e + n) % 2 == 0;

                          case u.PATTERN001:
                            return e % 2 == 0;

                          case u.PATTERN010:
                            return n % 3 == 0;

                          case u.PATTERN011:
                            return (e + n) % 3 == 0;

                          case u.PATTERN100:
                            return (Math.floor(e / 2) + Math.floor(n / 3)) % 2 == 0;

                          case u.PATTERN101:
                            return e * n % 2 + e * n % 3 == 0;

                          case u.PATTERN110:
                            return (e * n % 2 + e * n % 3) % 2 == 0;

                          case u.PATTERN111:
                            return (e * n % 3 + (e + n) % 2) % 2 == 0;

                          default:
                            throw new Error("bad maskPattern:" + t);
                        }
                    },
                    getErrorCorrectPolynomial: function(t) {
                        for (var e = new i([ 1 ], 0), n = 0; n < t; n++) e = e.multiply(new i([ 1, h.gexp(n) ], 0));
                        return e;
                    },
                    getLengthInBits: function(t, e) {
                        if (1 <= e && e < 10) switch (t) {
                          case l.MODE_NUMBER:
                            return 10;

                          case l.MODE_ALPHA_NUM:
                            return 9;

                          case l.MODE_8BIT_BYTE:
                          case l.MODE_KANJI:
                            return 8;

                          default:
                            throw new Error("mode:" + t);
                        } else if (e < 27) switch (t) {
                          case l.MODE_NUMBER:
                            return 12;

                          case l.MODE_ALPHA_NUM:
                            return 11;

                          case l.MODE_8BIT_BYTE:
                            return 16;

                          case l.MODE_KANJI:
                            return 10;

                          default:
                            throw new Error("mode:" + t);
                        } else {
                            if (!(e < 41)) throw new Error("type:" + e);
                            switch (t) {
                              case l.MODE_NUMBER:
                                return 14;

                              case l.MODE_ALPHA_NUM:
                                return 13;

                              case l.MODE_8BIT_BYTE:
                                return 16;

                              case l.MODE_KANJI:
                                return 12;

                              default:
                                throw new Error("mode:" + t);
                            }
                        }
                    },
                    getLostPoint: function(t) {
                        for (var e = t.getModuleCount(), n = 0, r = 0; r < e; r++) for (var i = 0; i < e; i++) {
                            for (var o = 0, a = t.isDark(r, i), s = -1; s <= 1; s++) if (!(r + s < 0 || e <= r + s)) for (var l = -1; l <= 1; l++) i + l < 0 || e <= i + l || 0 == s && 0 == l || a == t.isDark(r + s, i + l) && o++;
                            o > 5 && (n += 3 + o - 5);
                        }
                        for (r = 0; r < e - 1; r++) for (i = 0; i < e - 1; i++) {
                            var c = 0;
                            t.isDark(r, i) && c++, t.isDark(r + 1, i) && c++, t.isDark(r, i + 1) && c++, t.isDark(r + 1, i + 1) && c++, 
                            0 != c && 4 != c || (n += 3);
                        }
                        for (r = 0; r < e; r++) for (i = 0; i < e - 6; i++) t.isDark(r, i) && !t.isDark(r, i + 1) && t.isDark(r, i + 2) && t.isDark(r, i + 3) && t.isDark(r, i + 4) && !t.isDark(r, i + 5) && t.isDark(r, i + 6) && (n += 40);
                        for (i = 0; i < e; i++) for (r = 0; r < e - 6; r++) t.isDark(r, i) && !t.isDark(r + 1, i) && t.isDark(r + 2, i) && t.isDark(r + 3, i) && t.isDark(r + 4, i) && !t.isDark(r + 5, i) && t.isDark(r + 6, i) && (n += 40);
                        var u = 0;
                        for (i = 0; i < e; i++) for (r = 0; r < e; r++) t.isDark(r, i) && u++;
                        return n += 10 * (Math.abs(100 * u / e / e - 50) / 5);
                    }
                }, h = {
                    glog: function(t) {
                        if (t < 1) throw new Error("glog(" + t + ")");
                        return h.LOG_TABLE[t];
                    },
                    gexp: function(t) {
                        for (;t < 0; ) t += 255;
                        for (;t >= 256; ) t -= 255;
                        return h.EXP_TABLE[t];
                    },
                    EXP_TABLE: new Array(256),
                    LOG_TABLE: new Array(256)
                }, d = 0; d < 8; d++) h.EXP_TABLE[d] = 1 << d;
                for (d = 8; d < 256; d++) h.EXP_TABLE[d] = h.EXP_TABLE[d - 4] ^ h.EXP_TABLE[d - 5] ^ h.EXP_TABLE[d - 6] ^ h.EXP_TABLE[d - 8];
                for (d = 0; d < 255; d++) h.LOG_TABLE[h.EXP_TABLE[d]] = d;
                i.prototype = {
                    get: function(t) {
                        return this.num[t];
                    },
                    getLength: function() {
                        return this.num.length;
                    },
                    multiply: function(t) {
                        for (var e = new Array(this.getLength() + t.getLength() - 1), n = 0; n < this.getLength(); n++) for (var r = 0; r < t.getLength(); r++) e[n + r] ^= h.gexp(h.glog(this.get(n)) + h.glog(t.get(r)));
                        return new i(e, 0);
                    },
                    mod: function(t) {
                        if (this.getLength() - t.getLength() < 0) return this;
                        for (var e = h.glog(this.get(0)) - h.glog(t.get(0)), n = new Array(this.getLength()), r = 0; r < this.getLength(); r++) n[r] = this.get(r);
                        for (r = 0; r < t.getLength(); r++) n[r] ^= h.gexp(h.glog(t.get(r)) + e);
                        return new i(n, 0).mod(t);
                    }
                }, o.RS_BLOCK_TABLE = [ [ 1, 26, 19 ], [ 1, 26, 16 ], [ 1, 26, 13 ], [ 1, 26, 9 ], [ 1, 44, 34 ], [ 1, 44, 28 ], [ 1, 44, 22 ], [ 1, 44, 16 ], [ 1, 70, 55 ], [ 1, 70, 44 ], [ 2, 35, 17 ], [ 2, 35, 13 ], [ 1, 100, 80 ], [ 2, 50, 32 ], [ 2, 50, 24 ], [ 4, 25, 9 ], [ 1, 134, 108 ], [ 2, 67, 43 ], [ 2, 33, 15, 2, 34, 16 ], [ 2, 33, 11, 2, 34, 12 ], [ 2, 86, 68 ], [ 4, 43, 27 ], [ 4, 43, 19 ], [ 4, 43, 15 ], [ 2, 98, 78 ], [ 4, 49, 31 ], [ 2, 32, 14, 4, 33, 15 ], [ 4, 39, 13, 1, 40, 14 ], [ 2, 121, 97 ], [ 2, 60, 38, 2, 61, 39 ], [ 4, 40, 18, 2, 41, 19 ], [ 4, 40, 14, 2, 41, 15 ], [ 2, 146, 116 ], [ 3, 58, 36, 2, 59, 37 ], [ 4, 36, 16, 4, 37, 17 ], [ 4, 36, 12, 4, 37, 13 ], [ 2, 86, 68, 2, 87, 69 ], [ 4, 69, 43, 1, 70, 44 ], [ 6, 43, 19, 2, 44, 20 ], [ 6, 43, 15, 2, 44, 16 ], [ 4, 101, 81 ], [ 1, 80, 50, 4, 81, 51 ], [ 4, 50, 22, 4, 51, 23 ], [ 3, 36, 12, 8, 37, 13 ], [ 2, 116, 92, 2, 117, 93 ], [ 6, 58, 36, 2, 59, 37 ], [ 4, 46, 20, 6, 47, 21 ], [ 7, 42, 14, 4, 43, 15 ], [ 4, 133, 107 ], [ 8, 59, 37, 1, 60, 38 ], [ 8, 44, 20, 4, 45, 21 ], [ 12, 33, 11, 4, 34, 12 ], [ 3, 145, 115, 1, 146, 116 ], [ 4, 64, 40, 5, 65, 41 ], [ 11, 36, 16, 5, 37, 17 ], [ 11, 36, 12, 5, 37, 13 ], [ 5, 109, 87, 1, 110, 88 ], [ 5, 65, 41, 5, 66, 42 ], [ 5, 54, 24, 7, 55, 25 ], [ 11, 36, 12 ], [ 5, 122, 98, 1, 123, 99 ], [ 7, 73, 45, 3, 74, 46 ], [ 15, 43, 19, 2, 44, 20 ], [ 3, 45, 15, 13, 46, 16 ], [ 1, 135, 107, 5, 136, 108 ], [ 10, 74, 46, 1, 75, 47 ], [ 1, 50, 22, 15, 51, 23 ], [ 2, 42, 14, 17, 43, 15 ], [ 5, 150, 120, 1, 151, 121 ], [ 9, 69, 43, 4, 70, 44 ], [ 17, 50, 22, 1, 51, 23 ], [ 2, 42, 14, 19, 43, 15 ], [ 3, 141, 113, 4, 142, 114 ], [ 3, 70, 44, 11, 71, 45 ], [ 17, 47, 21, 4, 48, 22 ], [ 9, 39, 13, 16, 40, 14 ], [ 3, 135, 107, 5, 136, 108 ], [ 3, 67, 41, 13, 68, 42 ], [ 15, 54, 24, 5, 55, 25 ], [ 15, 43, 15, 10, 44, 16 ], [ 4, 144, 116, 4, 145, 117 ], [ 17, 68, 42 ], [ 17, 50, 22, 6, 51, 23 ], [ 19, 46, 16, 6, 47, 17 ], [ 2, 139, 111, 7, 140, 112 ], [ 17, 74, 46 ], [ 7, 54, 24, 16, 55, 25 ], [ 34, 37, 13 ], [ 4, 151, 121, 5, 152, 122 ], [ 4, 75, 47, 14, 76, 48 ], [ 11, 54, 24, 14, 55, 25 ], [ 16, 45, 15, 14, 46, 16 ], [ 6, 147, 117, 4, 148, 118 ], [ 6, 73, 45, 14, 74, 46 ], [ 11, 54, 24, 16, 55, 25 ], [ 30, 46, 16, 2, 47, 17 ], [ 8, 132, 106, 4, 133, 107 ], [ 8, 75, 47, 13, 76, 48 ], [ 7, 54, 24, 22, 55, 25 ], [ 22, 45, 15, 13, 46, 16 ], [ 10, 142, 114, 2, 143, 115 ], [ 19, 74, 46, 4, 75, 47 ], [ 28, 50, 22, 6, 51, 23 ], [ 33, 46, 16, 4, 47, 17 ], [ 8, 152, 122, 4, 153, 123 ], [ 22, 73, 45, 3, 74, 46 ], [ 8, 53, 23, 26, 54, 24 ], [ 12, 45, 15, 28, 46, 16 ], [ 3, 147, 117, 10, 148, 118 ], [ 3, 73, 45, 23, 74, 46 ], [ 4, 54, 24, 31, 55, 25 ], [ 11, 45, 15, 31, 46, 16 ], [ 7, 146, 116, 7, 147, 117 ], [ 21, 73, 45, 7, 74, 46 ], [ 1, 53, 23, 37, 54, 24 ], [ 19, 45, 15, 26, 46, 16 ], [ 5, 145, 115, 10, 146, 116 ], [ 19, 75, 47, 10, 76, 48 ], [ 15, 54, 24, 25, 55, 25 ], [ 23, 45, 15, 25, 46, 16 ], [ 13, 145, 115, 3, 146, 116 ], [ 2, 74, 46, 29, 75, 47 ], [ 42, 54, 24, 1, 55, 25 ], [ 23, 45, 15, 28, 46, 16 ], [ 17, 145, 115 ], [ 10, 74, 46, 23, 75, 47 ], [ 10, 54, 24, 35, 55, 25 ], [ 19, 45, 15, 35, 46, 16 ], [ 17, 145, 115, 1, 146, 116 ], [ 14, 74, 46, 21, 75, 47 ], [ 29, 54, 24, 19, 55, 25 ], [ 11, 45, 15, 46, 46, 16 ], [ 13, 145, 115, 6, 146, 116 ], [ 14, 74, 46, 23, 75, 47 ], [ 44, 54, 24, 7, 55, 25 ], [ 59, 46, 16, 1, 47, 17 ], [ 12, 151, 121, 7, 152, 122 ], [ 12, 75, 47, 26, 76, 48 ], [ 39, 54, 24, 14, 55, 25 ], [ 22, 45, 15, 41, 46, 16 ], [ 6, 151, 121, 14, 152, 122 ], [ 6, 75, 47, 34, 76, 48 ], [ 46, 54, 24, 10, 55, 25 ], [ 2, 45, 15, 64, 46, 16 ], [ 17, 152, 122, 4, 153, 123 ], [ 29, 74, 46, 14, 75, 47 ], [ 49, 54, 24, 10, 55, 25 ], [ 24, 45, 15, 46, 46, 16 ], [ 4, 152, 122, 18, 153, 123 ], [ 13, 74, 46, 32, 75, 47 ], [ 48, 54, 24, 14, 55, 25 ], [ 42, 45, 15, 32, 46, 16 ], [ 20, 147, 117, 4, 148, 118 ], [ 40, 75, 47, 7, 76, 48 ], [ 43, 54, 24, 22, 55, 25 ], [ 10, 45, 15, 67, 46, 16 ], [ 19, 148, 118, 6, 149, 119 ], [ 18, 75, 47, 31, 76, 48 ], [ 34, 54, 24, 34, 55, 25 ], [ 20, 45, 15, 61, 46, 16 ] ], 
                o.getRSBlocks = function(t, e) {
                    var n = o.getRsBlockTable(t, e);
                    if (void 0 == n) throw new Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e);
                    for (var r = n.length / 3, i = new Array(), a = 0; a < r; a++) for (var s = n[3 * a + 0], l = n[3 * a + 1], c = n[3 * a + 2], u = 0; u < s; u++) i.push(new o(l, c));
                    return i;
                }, o.getRsBlockTable = function(t, e) {
                    switch (e) {
                      case c.L:
                        return o.RS_BLOCK_TABLE[4 * (t - 1) + 0];

                      case c.M:
                        return o.RS_BLOCK_TABLE[4 * (t - 1) + 1];

                      case c.Q:
                        return o.RS_BLOCK_TABLE[4 * (t - 1) + 2];

                      case c.H:
                        return o.RS_BLOCK_TABLE[4 * (t - 1) + 3];

                      default:
                        return;
                    }
                }, a.prototype = {
                    get: function(t) {
                        var e = Math.floor(t / 8);
                        return 1 == (this.buffer[e] >>> 7 - t % 8 & 1);
                    },
                    put: function(t, e) {
                        for (var n = 0; n < e; n++) this.putBit(1 == (t >>> e - n - 1 & 1));
                    },
                    getLengthInBits: function() {
                        return this.length;
                    },
                    putBit: function(t) {
                        var e = Math.floor(this.length / 8);
                        this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), 
                        this.length++;
                    }
                }, n = {
                    errorCorrectLevel: c,
                    defaults: {
                        size: 354,
                        margin: 0,
                        backgroundColor: "#ffffff",
                        foregroundColor: "#000000",
                        fileType: "png",
                        errorCorrectLevel: c.H,
                        typeNumber: -1
                    },
                    make: function(e) {
                        var n = {
                            canvasId: e.canvasId,
                            componentInstance: e.componentInstance,
                            text: e.text,
                            size: this.defaults.size,
                            margin: this.defaults.margin,
                            backgroundColor: this.defaults.backgroundColor,
                            foregroundColor: this.defaults.foregroundColor,
                            fileType: this.defaults.fileType,
                            errorCorrectLevel: this.defaults.errorCorrectLevel,
                            typeNumber: this.defaults.typeNumber
                        };
                        if (e) for (var i in e) n[i] = e[i];
                        (e = n).canvasId ? function() {
                            var n = new r(e.typeNumber, e.errorCorrectLevel);
                            n.addData(s(e.text)), n.make();
                            var i = t.createCanvasContext(e.canvasId, e.componentInstance);
                            i.setFillStyle(e.backgroundColor), i.fillRect(0, 0, e.size, e.size);
                            for (var o = (e.size - 2 * e.margin) / n.getModuleCount(), a = o, l = 0; l < n.getModuleCount(); l++) for (var c = 0; c < n.getModuleCount(); c++) {
                                var u = n.isDark(l, c) ? e.foregroundColor : e.backgroundColor;
                                i.setFillStyle(u);
                                var f = Math.round(c * o) + e.margin, h = Math.round(l * a) + e.margin, d = Math.ceil((c + 1) * o) - Math.floor(c * o), p = Math.ceil((l + 1) * o) - Math.floor(l * o);
                                i.fillRect(f, h, d, p);
                            }
                            setTimeout(function() {
                                i.draw(!1, void setTimeout(function() {
                                    t.canvasToTempFilePath({
                                        canvasId: e.canvasId,
                                        fileType: e.fileType,
                                        width: e.size,
                                        height: e.size,
                                        destWidth: e.size,
                                        destHeight: e.size,
                                        success: function(t) {
                                            e.success && e.success(t.tempFilePath);
                                        },
                                        fail: function(t) {
                                            e.fail && e.fail(t);
                                        },
                                        complete: function(t) {
                                            e.complete && e.complete(t);
                                        }
                                    }, e.componentInstance);
                                }, e.text.length + 700));
                            }, 150);
                        }() : console.error("uQRCode: Please set canvasId!");
                    }
                };
            }();
            var r = n;
            e.default = r;
        }).call(this, n("543d").default);
    },
    "0b81": function(t, e) {
        t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAQAAABpN6lAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAfISURBVHja5V1bbFRVFF379gEtVinvdyk0aGuigkCtKASRh0Kb2BoUBRGkaqDB8GX8kRijRj4MxoBKgoj6oUZDYkFQUiWBogYwqAFMBCoUAzGAKLVS2rr96Mx02nncc2fO3mcM62s6PXP3Xmufc+69++5zLkEVPAKlKMY4FGMMhmMA+iEbHWjBBZzDaTThBJpwhH7X84gUSAPTMB1VuCPQz/ahHnvpGz0pJKiX86t8ldPD3/wST3bNJChx8Czelibx3viYZ7BrYkbkS3mjZerReJ0nuGaYmDq4ks8Ikg/jBN/nmmss+SxerkA9GotZYQI3Jb9UmXwYi9hzzR48xxH5LnTyTJfki7nRKf0uNPBoF+SzeI1r5lFYlepgSHEi4RLswUgHuifGccyhpuA/S0k3XopfMow+UIKT/LCCHc7nD1339yTYwn2D8Qk4BLgIx5CnoHPqOI+JdMa8eaAhwBX4NcPpA4PQHOTmKYAAXI39rtkZ4gDPty4A1+JT17wCYDsvsXo8fsb17JYCnrq26duTgGtd80gDvgPB9zTI1f+rsR+LBbQjDQG4wurM349aTZrxYNjMC0+mQ4n/mfQswEWWT3y5hu0CXs354CAnuWxPIgDn46hVR4A+hu1sX2wd4oSWEwrAwGbkW3bENLL9LNsdig2BBcBjsH9vZSroddYtP8ELAwnAJdhq3QnzyBYI2P6Ii4wF4Cx8LeCCeWRvELG+K17WKH4PWI1RIi5cb9iuv4j1m/CkkQA8Fq+JOGAe2UIh+2/GnhBjBGDgAyHz5sQGinmw2VcAzMY05wIMEvNgLk9PKgDn4Esx4+aRHSzowy7OSiIAFgmaNic2VNCHPFRH/9njZoj74h9RARroXpNm/BtGiPqRS+3hjz17gGz8zSM7XNiPmu6PUT2Ac3BV2PAFMpjemPCvsB9ANnV2fYjuAXPFzQ40KnLReOQdeaYc6QEMNAtd//UgR74acC7axP04SjeHHIp8VapA3yy6OQp+lPH43g7VKZgFsg3amOaN0kMoYxwaAuInwDAKqMWvCQ/DWRVfcqm9uwfcqWLSLLp2M4KJMQXoFkBnAJiRs52IS4SnIwJwXzygZNQk3Wk/IRYfSzgn3ANuUTJpFl0tAYCysADVaR7IHCbkTPNG6aMK8AAG1qiZNEl3ymQE46GuqwcUKp15AbPoSiXEYjGECzwAZWoGzdKdAxT9meABmJ72YcxhEl25jGAspnkAKhUNmkRXMiHWG/d7TKhQNGiS7hyi6M9cT+QxVGKYRFcyIxgDT9ecUXSH6QqgW2ruS46lHowlFGBcZgmgsZLRpQB5vhmxLJPD2BSgWNegb1LMJGdk1R3t5SZ+EdbICPYQQPohRG/4RVjvviQkgOaFpwlBrYRYRADbFVl+8CuV00qIRQRQnnR8I6wuQIeyAH5ZQb2EWEgA3zy9ZfgNOd17E3i4qCyAX4T1EmIhAXSewnTDLymmLsBpZQH8CGomxAB4SGG5aVron2kCnFQWwC8rKFcil0AA7R7gd+WpmRGEiznAj6BmRhCAZ3V1jg0BVBNigIfLygL45SCV7049YjSqWvSLsG4+YKcHoF7V5NCM2g/qcw/AXmWjmbL/DwDsJ4D74w9Vo5EqzXhg3Q5S4AG4pFQhFoZy3jcJzlKLBxCwXtWsctozCTaEk9TbVM22JFvurepJfWhC4j64omo4U5BL7R4AUBs+ce2LA7wbXSm6Ia1D/T/xNtBdK3wtDoLoWmFqwxuu/VHGK13rhroXTNyIn137pIpxXVuvRa8YacJYdTeO4QpGaSdBAPxIt3Z9iDysJmCVogONuIeIiMpoEg0hwmg8pypApDY2etVYNtpTOVYKqKBvY7/kfKxTC0IWhVamRZUrUAeWKpg+gcJ49AFqpTrUqtBfSJGFeT1XjmqcDAvpUrJ/8/N4QdyHRCtHqQ2LhU1PTU4fwMvii+ZqKGqo90pOCM8DRmuHeR52CvrwJwZQ1MrUXiVL1IFZgsbXGrWS2b8kjPnUY2FubM3WV9gjZvx7k0bUhi/EPKinXingGAEIYueCVjLNPO0WEyBmg704VXt0GqtFjB82bnlKiP4KiikGiF+2uFHkkal55lFmGf8PeCf2y7gCUCdmCzhgviuEzCPyyngr1xMUrtJJPGrdgVLjNwJMEqBfQ80Bf8FbrW9wadQHGNxq3fLGFCTjPL5o2Y2VRnaLrdM/xakV4PJo664YFMLyZutWkzyQTVq8Ts0oT0m5xHjWl345llu2OZHOpfFrrrIcjaqk1oqsR39O2gLy45ZdWpbQ0hTr9O3siskrLbt1kGNOdFzEm6zTX+bPzfDMzCsFHp1sQiPOgTEQk7BCYMn0ctpi8WjWB4I0DDt/gGoNrsRn1qMkhXlkeEsdqFyFp+I718yMMJEOmzYN+o6R0TisXc0bEM0opwAV8AE3LqNmjMR7rjkmwVsoCUI/RfAjrme4BKgJziXVN00VYzfGiysdBD9hfuAb3nTA4DrXAY9CrZPySx7DDa6ZM/N2szyDlAgzudMh+ct8l0PyIQnAixzRf9A1924RPF6sTP6hjHnnaJQM8/i4AvUjbLQ7sSsRJvB6QfLrOLNOvglEAE+3/lbC91lu03cxIW7nF/mvNImf57V8m5yPKhMJl+NuLMCMQD9qwA7sowPSvv0HRCnmF1KRc48AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMTNUMjE6MzY6NTcrMDg6MDDM5QZGAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTEzVDIxOjM2OjU3KzA4OjAwvbi++gAAAABJRU5ErkJggg==";
    },
    "0d40": function(t, e, n) {
        (function(t) {
            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = r(n("8196")), o = r(n("20e3")), a = r(n("eecf")), s = {
                getCode: function() {
                    return new Promise(function(e, n) {
                        t.login({
                            provider: "weixin",
                            success: function(t) {
                                e(t);
                            },
                            fail: function(t) {
                                n(t);
                            }
                        });
                    });
                },
                remoteOpenId: function() {
                    var e = this;
                    return new Promise(function(n, r) {
                        e.getCode().then(function(e) {
                            i.default.get("/terminal/user/public/getOpenid?js_code=" + e.code + "&admin_key=" + a.default.adminKey + "&unique_type=1").then(function(e) {
                                e.code == a.default.httpSuccessStatus && t.setStorageSync(a.default.openIdStorageName, e.data), 
                                n(e);
                            }).catch(function(t) {
                                r(t);
                            });
                        }).catch(function(t) {
                            r(t);
                        });
                    });
                },
                getOpenId: function() {
                    var e = this;
                    return new Promise(function(n, r) {
                        var i = t.getStorageSync(a.default.openIdStorageName);
                        t.checkSession({
                            success: function() {
                                i ? n({
                                    code: "200",
                                    message: "",
                                    data: i
                                }) : e.remoteOpenId().then(function(t) {
                                    n(t);
                                }).catch(function(t) {
                                    r(t);
                                });
                            },
                            fail: function() {
                                e.remoteOpenId().then(function(t) {
                                    n(t);
                                }).catch(function(t) {
                                    r(t);
                                });
                            }
                        });
                    });
                },
                login: function(e) {
                    var n = this;
                    return e || (e = 1), new Promise(function(r, o) {
                        n.getOpenId().then(function(n) {
                            var s = t.getStorageSync(a.default.authStorageName);
                            s ? r({
                                code: "200",
                                message: "",
                                data: {
                                    token: s,
                                    openid: n.data
                                }
                            }) : i.default.post("/terminal/user/public/terminalUserLogin", {
                                admin_key: a.default.adminKey,
                                login_type: 3,
                                openid: n.data,
                                unique_type: 1
                            }).then(function(n) {
                                n.code == a.default.httpSuccessStatus ? (t.setStorageSync(a.default.authStorageName, n.data.token), 
                                t.setStorageSync(a.default.openIdStorageName, n.data.openid)) : "8001" == n.code && 1 == e && t.navigateTo({
                                    url: "/pages/login"
                                }), r(n);
                            }).catch(function(t) {
                                o(t);
                            });
                        }).catch(function(t) {
                            o(t);
                        });
                    });
                },
                reg: function(e, n) {
                    var r = this;
                    return t.getStorageSync("terminal-promoId"), t.getStorageSync("terminal-promoType"), 
                    new Promise(function(t, i) {
                        r.getOpenId().then(function(s) {
                            var l = {
                                admin_key: a.default.adminKey,
                                encrypted_data: e,
                                iv: n,
                                login_type: 3,
                                openid: s.data,
                                unique_type: 1
                            }, c = r.getTerminalPromoId();
                            c && Object.assign(l, c), o.default.getPosition().then(function(e) {
                                l.ad_code = e.data.area_id, l.lat = e.data.lat, l.lng = e.data.lng, r._regPost(l, t, i);
                            }).catch(function(e) {
                                r._regPost(l, t, i);
                            });
                        }).catch(function(t) {
                            i(t);
                        });
                    });
                },
                _regPost: function(e, n, r) {
                    i.default.post("/terminal/user/public/terminalUserLogin", e).then(function(e) {
                        e.code == a.default.httpSuccessStatus ? (t.setStorageSync(a.default.authStorageName, e.data.token), 
                        t.setStorageSync(a.default.openIdStorageName, e.data.openid)) : t.showToast({
                            title: e.message,
                            icon: "none",
                            mask: !0,
                            duration: 2e3,
                            success: function() {
                                setTimeout(function() {
                                    t.switchTab({
                                        url: "/pages/index/index"
                                    });
                                }, 2e3);
                            }
                        }), n(e);
                    }).catch(function(t) {
                        r(t);
                    });
                },
                _sendAdLinkLog: function(t) {
                    this.getOpenId().then(function(e) {
                        i.default.post("/terminal/adLinkLog/public/addAdLinkLog", {
                            ad_link_id: t,
                            open_id: e.data
                        });
                    }).catch(function() {
                        i.default.post("/terminal/adLinkLog/public/addAdLinkLog", {
                            ad_link_id: t,
                            open_id: ""
                        });
                    });
                },
                isLogin: function() {
                    return !!t.getStorageSync(a.default.authStorageName);
                },
                setTerminalPromoId: function(e) {
                    if (e && (e = decodeURIComponent(e))) {
                        var n = void 0, r = void 0, i = void 0, o = void 0;
                        if (-1 != e.indexOf(a.default.promoCode)) {
                            (i = this.getQueryVariable(e, "partner_id")) && null != i && this._sendAdLinkLog(i);
                            var s = this.getQueryVariable(e, "id");
                            s && null != s && (o = 1, n = s);
                        }
                        return -1 != e.indexOf(a.default.shareUserCode) && ((r = this.getQueryVariable(e, "code")) && null != r ? (o = 3, 
                        n = r) : (o = 2, n = this.getQueryVariable(e, "id"))), -1 != e.indexOf(a.default.yqUserCode) && (o = 4, 
                        n = this.getQueryVariable(e, "id")), t.setStorageSync("terminal-promoId", n), t.setStorageSync("terminal-promoType", o), 
                        {
                            promoType: o,
                            promoId: n
                        };
                    }
                },
                setTerminalShareId: function(e, n) {
                    n || (n = 2), t.setStorageSync("terminal-promoId", e), t.setStorageSync("terminal-promoType", n);
                },
                getTerminalPromoId: function() {
                    var e = t.getStorageSync("terminal-promoId"), n = t.getStorageSync("terminal-promoType");
                    if (e) return n && 1 != n ? n && 2 == n ? {
                        share_terminal_user_id: e
                    } : n && 3 == n ? {
                        store_code: e
                    } : n && 4 == n ? {
                        share_terminal_user_id: e,
                        share_type: 3
                    } : void 0 : {
                        promoter_info_id: e
                    };
                },
                getQueryVariable: function(t, e) {
                    if (-1 == t.indexOf("?")) return null;
                    for (var n = t.substring(t.indexOf("?") + 1).split("&"), r = 0; r < n.length; r++) {
                        var i = n[r].split("=");
                        if (i[0] == e) return i[1];
                    }
                    return null;
                }
            };
            e.default = s;
        }).call(this, n("543d").default);
    },
    "108e": function(e, n, r) {
        function i() {
            if ("function" != typeof WeakMap) return null;
            var t = new WeakMap();
            return i = function() {
                return t;
            }, t;
        }
        function o(t) {
            return encodeURIComponent(t).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = function(t, e) {
            if (!e) return t;
            var n;
            if (a.isURLSearchParams(e)) n = e.toString(); else {
                var r = [];
                a.forEach(e, function(t, e) {
                    null !== t && void 0 !== t && (a.isArray(t) ? e += "[]" : t = [ t ], a.forEach(t, function(t) {
                        a.isDate(t) ? t = t.toISOString() : a.isObject(t) && (t = JSON.stringify(t)), r.push(o(e) + "=" + o(t));
                    }));
                }), n = r.join("&");
            }
            if (n) {
                var i = t.indexOf("#");
                -1 !== i && (t = t.slice(0, i)), t += (-1 === t.indexOf("?") ? "?" : "&") + n;
            }
            return t;
        };
        var a = function(e) {
            if (e && e.__esModule) return e;
            if (null === e || "object" !== (void 0 === e ? "undefined" : t(e)) && "function" != typeof e) return {
                default: e
            };
            var n = i();
            if (n && n.has(e)) return n.get(e);
            var r = {}, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var a in e) if (Object.prototype.hasOwnProperty.call(e, a)) {
                var s = o ? Object.getOwnPropertyDescriptor(e, a) : null;
                s && (s.get || s.set) ? Object.defineProperty(r, a, s) : r[a] = e[a];
            }
            return r.default = e, n && n.set(e, r), r;
        }(r("fe81"));
    },
    1264: function(t, e, n) {
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var n = {
                data: function() {
                    return {
                        position: [],
                        button: {},
                        btn: "[]"
                    };
                },
                watch: {
                    button: {
                        handler: function(t) {
                            this.btn = JSON.stringify(t);
                        },
                        deep: !0
                    },
                    show: function(t) {
                        this.autoClose || (this.button ? this.button.show = t : this.init());
                    },
                    leftOptions: function() {
                        this.init();
                    },
                    rightOptions: function() {
                        this.init();
                    }
                },
                created: function() {
                    void 0 !== this.swipeaction.children && this.swipeaction.children.push(this);
                },
                mounted: function() {
                    this.init();
                },
                beforeDestroy: function() {
                    var t = this;
                    this.swipeaction.children.forEach(function(e, n) {
                        e === t && t.swipeaction.children.splice(n, 1);
                    });
                },
                methods: {
                    init: function() {
                        var t = this;
                        clearTimeout(this.swipetimer), this.swipetimer = setTimeout(function() {
                            t.getButtonSize();
                        }, 50);
                    },
                    closeSwipe: function(t) {
                        this.autoClose && this.swipeaction.closeOther(this);
                    },
                    change: function(t) {
                        this.$emit("change", t.open), this.button.show !== t.open && (this.button.show = t.open);
                    },
                    appTouchStart: function(t) {
                        var e = t.changedTouches[0].clientX;
                        this.clientX = e, this.timestamp = new Date().getTime();
                    },
                    appTouchEnd: function(t, e, n, r) {
                        var i = t.changedTouches[0].clientX, o = Math.abs(this.clientX - i), a = new Date().getTime() - this.timestamp;
                        o < 40 && a < 300 && this.$emit("click", {
                            content: n,
                            index: e,
                            position: r
                        });
                    },
                    getButtonSize: function() {
                        var e = this;
                        t.createSelectorQuery().in(this).selectAll(".uni-swipe_button-group").boundingClientRect(function(t) {
                            var n = "none";
                            n = e.autoClose ? "none" : e.show, e.button = {
                                data: t,
                                show: n
                            };
                        }).exec();
                    }
                }
            };
            e.default = n;
        }).call(this, n("543d").default);
    },
    1875: function(t, e, n) {
        (function(t) {
            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            function i(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e && (r = r.filter(function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })), n.push.apply(n, r);
                }
                return n;
            }
            function o(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? i(Object(n), !0).forEach(function(e) {
                        a(t, e, n[e]);
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach(function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                    });
                }
                return t;
            }
            function a(t, e, n) {
                return e in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t;
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var s = r(n("108e")), l = r(n("a96b")), c = r(n("39d8")), u = function(t, e) {
                var n = {};
                return t.forEach(function(t) {
                    void 0 !== e[t] && (n[t] = e[t]);
                }), n;
            };
            e.default = function(e) {
                return new Promise(function(n, r) {
                    var i, a = {
                        url: (0, s.default)((0, l.default)(e.baseURL, e.url), e.params),
                        header: e.header,
                        complete: function(t) {
                            t.config = e;
                            try {
                                "string" == typeof t.data && (t.data = JSON.parse(t.data));
                            } catch (t) {}
                            (0, c.default)(n, r, t);
                        }
                    };
                    if ("UPLOAD" === e.method) {
                        delete a.header["content-type"], delete a.header["Content-Type"];
                        var f = {
                            filePath: e.filePath,
                            name: e.name
                        }, h = [ "formData" ];
                        i = t.uploadFile(o(o(o({}, a), f), u(h, e)));
                    } else if ("DOWNLOAD" === e.method) i = t.downloadFile(a); else {
                        var d = [ "data", "method", "timeout", "dataType", "responseType" ];
                        i = t.request(o(o({}, a), u(d, e)));
                    }
                    e.getTask && e.getTask(i, e);
                });
            };
        }).call(this, n("543d").default);
    },
    "18b0": function(t, e, n) {
        (function(t) {
            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(t, r.key, r);
                }
            }
            function o(t, e, n) {
                return e && i(t.prototype, e), n && i(t, n), t;
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var a = function() {
                function e() {
                    r(this, e), this.isLoading = !1;
                }
                return o(e, null, [ {
                    key: "toast",
                    value: function(e, n) {
                        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "none";
                        t.showToast({
                            title: e,
                            icon: r,
                            mask: !0,
                            duration: 1e3
                        }), n && setTimeout(function() {
                            n();
                        }, 1e3);
                    }
                }, {
                    key: "alert",
                    value: function(e) {
                        t.showToast({
                            title: e,
                            image: n("0b81"),
                            mask: !0,
                            duration: 5e3
                        });
                    }
                }, {
                    key: "error",
                    value: function(e, r) {
                        t.showToast({
                            title: e,
                            image: n("0b81"),
                            mask: !0,
                            duration: 1500
                        }), r && setTimeout(function() {
                            r();
                        }, 1500);
                    }
                }, {
                    key: "loading",
                    value: function() {
                        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "加载中";
                        e.isLoading || (e.isLoading = !0, t.showLoading({
                            title: n,
                            mask: !0
                        }));
                    }
                }, {
                    key: "loaded",
                    value: function() {
                        e.isLoading && (e.isLoading = !1, t.hideLoading());
                    }
                }, {
                    key: "confirm",
                    value: function(e) {
                        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "提示";
                        return new Promise(function(i, o) {
                            t.showModal({
                                title: r,
                                content: e,
                                showCancel: !0,
                                success: function(t) {
                                    t.confirm ? i(n) : t.cancel && o(n);
                                },
                                fail: function(t) {
                                    o(n);
                                }
                            });
                        });
                    }
                }, {
                    key: "modal",
                    value: function(e) {
                        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "提示";
                        return new Promise(function(r, i) {
                            t.showModal({
                                title: n,
                                content: e,
                                showCancel: !1,
                                success: function(t) {
                                    r(t);
                                },
                                fail: function(t) {
                                    i(t);
                                }
                            });
                        });
                    }
                } ]), e;
            }();
            e.default = a, a.isLoading = !1;
        }).call(this, n("543d").default);
    },
    "1b7f": function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var r = {
            lunarInfo: [ 19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104, 38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104, 100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872, 42416, 83315, 21168, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46752, 103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 23232, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19195, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 111189, 27936, 44448, 84835, 37744, 18936, 18800, 25776, 92326, 59984, 27424, 108228, 43744, 41696, 53987, 51552, 54615, 54432, 55888, 23893, 22176, 42704, 21972, 21200, 43448, 43344, 46240, 46758, 44368, 21920, 43940, 42416, 21168, 45683, 26928, 29495, 27296, 44368, 84821, 19296, 42352, 21732, 53600, 59752, 54560, 55968, 92838, 22224, 19168, 43476, 41680, 53584, 62034, 54560 ],
            solarMonth: [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
            Gan: [ "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸" ],
            Zhi: [ "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥" ],
            Animals: [ "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪" ],
            solarTerm: [ "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至" ],
            sTermInfo: [ "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "9778397bd19801ec9210c965cc920e", "97b6b97bd19801ec95f8c965cc920f", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd197c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bcf97c3598082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd19801ec9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bd07f1487f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b97bd197c36c9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b70c9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "977837f0e37f149b0723b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0723b06bd", "7f07e7f0e37f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e37f14998083b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14898082b0723b02d5", "7f07e7f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66aa89801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e26665b66a449801e9808297c35", "665f67f0e37f1489801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722" ],
            nStr1: [ "日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十" ],
            nStr2: [ "初", "十", "廿", "卅" ],
            nStr3: [ "正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊" ],
            lYearDays: function(t) {
                var e, n = 348;
                for (e = 32768; e > 8; e >>= 1) n += this.lunarInfo[t - 1900] & e ? 1 : 0;
                return n + this.leapDays(t);
            },
            leapMonth: function(t) {
                return 15 & this.lunarInfo[t - 1900];
            },
            leapDays: function(t) {
                return this.leapMonth(t) ? 65536 & this.lunarInfo[t - 1900] ? 30 : 29 : 0;
            },
            monthDays: function(t, e) {
                return e > 12 || e < 1 ? -1 : this.lunarInfo[t - 1900] & 65536 >> e ? 30 : 29;
            },
            solarDays: function(t, e) {
                if (e > 12 || e < 1) return -1;
                var n = e - 1;
                return 1 == n ? t % 4 == 0 && t % 100 != 0 || t % 400 == 0 ? 29 : 28 : this.solarMonth[n];
            },
            toGanZhiYear: function(t) {
                var e = (t - 3) % 10, n = (t - 3) % 12;
                return 0 == e && (e = 10), 0 == n && (n = 12), this.Gan[e - 1] + this.Zhi[n - 1];
            },
            toAstro: function(t, e) {
                var n = [ 20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22 ];
                return "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr(2 * t - (e < n[t - 1] ? 2 : 0), 2) + "座";
            },
            toGanZhi: function(t) {
                return this.Gan[t % 10] + this.Zhi[t % 12];
            },
            getTerm: function(t, e) {
                if (t < 1900 || t > 2100) return -1;
                if (e < 1 || e > 24) return -1;
                var n = this.sTermInfo[t - 1900], r = [ parseInt("0x" + n.substr(0, 5)).toString(), parseInt("0x" + n.substr(5, 5)).toString(), parseInt("0x" + n.substr(10, 5)).toString(), parseInt("0x" + n.substr(15, 5)).toString(), parseInt("0x" + n.substr(20, 5)).toString(), parseInt("0x" + n.substr(25, 5)).toString() ], i = [ r[0].substr(0, 1), r[0].substr(1, 2), r[0].substr(3, 1), r[0].substr(4, 2), r[1].substr(0, 1), r[1].substr(1, 2), r[1].substr(3, 1), r[1].substr(4, 2), r[2].substr(0, 1), r[2].substr(1, 2), r[2].substr(3, 1), r[2].substr(4, 2), r[3].substr(0, 1), r[3].substr(1, 2), r[3].substr(3, 1), r[3].substr(4, 2), r[4].substr(0, 1), r[4].substr(1, 2), r[4].substr(3, 1), r[4].substr(4, 2), r[5].substr(0, 1), r[5].substr(1, 2), r[5].substr(3, 1), r[5].substr(4, 2) ];
                return parseInt(i[e - 1]);
            },
            toChinaMonth: function(t) {
                if (t > 12 || t < 1) return -1;
                var e = this.nStr3[t - 1];
                return e += "月";
            },
            toChinaDay: function(t) {
                var e;
                switch (t) {
                  case 10:
                    e = "初十";
                    break;

                  case 20:
                    e = "二十";
                    break;

                  case 30:
                    e = "三十";
                    break;

                  default:
                    e = this.nStr2[Math.floor(t / 10)], e += this.nStr1[t % 10];
                }
                return e;
            },
            getAnimal: function(t) {
                return this.Animals[(t - 4) % 12];
            },
            solar2lunar: function(t, e, n) {
                if (t < 1900 || t > 2100) return -1;
                if (1900 == t && 1 == e && n < 31) return -1;
                if (t) r = new Date(t, parseInt(e) - 1, n); else var r = new Date();
                var i, o = 0, a = 0, s = (t = r.getFullYear(), e = r.getMonth() + 1, n = r.getDate(), 
                (Date.UTC(r.getFullYear(), r.getMonth(), r.getDate()) - Date.UTC(1900, 0, 31)) / 864e5);
                for (i = 1900; i < 2101 && s > 0; i++) s -= a = this.lYearDays(i);
                s < 0 && (s += a, i--);
                var l = new Date(), c = !1;
                l.getFullYear() == t && l.getMonth() + 1 == e && l.getDate() == n && (c = !0);
                var u = r.getDay(), f = this.nStr1[u];
                0 == u && (u = 7);
                var h = i, d = (o = this.leapMonth(i), !1);
                for (i = 1; i < 13 && s > 0; i++) o > 0 && i == o + 1 && 0 == d ? (--i, d = !0, 
                a = this.leapDays(h)) : a = this.monthDays(h, i), 1 == d && i == o + 1 && (d = !1), 
                s -= a;
                0 == s && o > 0 && i == o + 1 && (d ? d = !1 : (d = !0, --i)), s < 0 && (s += a, 
                --i);
                var p = i, g = s + 1, y = e - 1, v = this.toGanZhiYear(h), b = this.getTerm(t, 2 * e - 1), m = this.getTerm(t, 2 * e), x = this.toGanZhi(12 * (t - 1900) + e + 11);
                n >= b && (x = this.toGanZhi(12 * (t - 1900) + e + 12));
                var _ = !1, w = null;
                b == n && (_ = !0, w = this.solarTerm[2 * e - 2]), m == n && (_ = !0, w = this.solarTerm[2 * e - 1]);
                var A = Date.UTC(t, y, 1, 0, 0, 0, 0) / 864e5 + 25567 + 10, S = this.toGanZhi(A + n - 1), P = this.toAstro(e, n);
                return {
                    lYear: h,
                    lMonth: p,
                    lDay: g,
                    Animal: this.getAnimal(h),
                    IMonthCn: (d ? "闰" : "") + this.toChinaMonth(p),
                    IDayCn: this.toChinaDay(g),
                    cYear: t,
                    cMonth: e,
                    cDay: n,
                    gzYear: v,
                    gzMonth: x,
                    gzDay: S,
                    isToday: c,
                    isLeap: d,
                    nWeek: u,
                    ncWeek: "星期" + f,
                    isTerm: _,
                    Term: w,
                    astro: P
                };
            },
            lunar2solar: function(t, e, n, r) {
                r = !!r;
                var i = this.leapMonth(t);
                if (this.leapDays(t), r && i != e) return -1;
                if (2100 == t && 12 == e && n > 1 || 1900 == t && 1 == e && n < 31) return -1;
                var o = this.monthDays(t, e), a = o;
                if (r && (a = this.leapDays(t, e)), t < 1900 || t > 2100 || n > a) return -1;
                for (var s = 0, l = 1900; l < t; l++) s += this.lYearDays(l);
                var c = 0, u = !1;
                for (l = 1; l < e; l++) c = this.leapMonth(t), u || c <= l && c > 0 && (s += this.leapDays(t), 
                u = !0), s += this.monthDays(t, l);
                r && (s += o);
                var f = Date.UTC(1900, 1, 30, 0, 0, 0), h = new Date(864e5 * (s + n - 31) + f), d = h.getUTCFullYear(), p = h.getUTCMonth() + 1, g = h.getUTCDate();
                return this.solar2lunar(d, p, g);
            }
        };
        e.default = r;
    },
    "1db6": function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var r = {
            created: function() {
                "message" === this.type && (this.maskShow = !1, this.childrenMsg = null);
            },
            methods: {
                customOpen: function() {
                    this.childrenMsg && this.childrenMsg.open();
                },
                customClose: function() {
                    this.childrenMsg && this.childrenMsg.close();
                }
            }
        };
        e.default = r;
    },
    "20e3": function(t, e, n) {
        (function(t) {
            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = r(n("8196")), o = r(n("eecf"));
            getApp();
            var a = {
                getLc: function() {
                    // return new Promise(function(e, n) {
                    //     t.getLocation({
                    //         type: "gcj02",
                    //         success: function(t) {
                    //             e(t);
                    //         },
                    //         fail: function(t) {
                    //             n(t);
                    //         }
                    //     });
                    // });
                },
                getPosition: function(e) {
                    var n = this;
                    return new Promise(function(r, a) {
                        e && e.area_id ? r({
                            code: "200",
                            message: "",
                            data: e
                        }) : (e = t.getStorageSync(o.default.positionStorageName)) && e.area_id ? r({
                            code: "200",
                            message: "",
                            data: e
                        }) : n.getLc().then(function(n) {
                            i.default.get("/inverse/geocoding/public/getInverseGeocoding?lon_and_lat=" + n.longitude + "," + n.latitude).then(function(i) {
                                e = {
                                    area_id: i.data.id,
                                    area_name: i.data.value,
                                    lng: n.longitude,
                                    lat: n.latitude
                                }, t.setStorage({
                                    key: o.default.positionStorageName,
                                    data: e
                                }), r({
                                    code: i.code,
                                    message: "",
                                    data: e
                                });
                            }).catch(function(t) {
                                a(t);
                            });
                        }).catch(function(t) {
                            a(t);
                        });
                    });
                },
                refreshPosition: function(e) {
                    var n = this;
                    return new Promise(function(r, a) {
                        n.getLc().then(function(n) {
                            i.default.get("/inverse/geocoding/public/getInverseGeocoding?lon_and_lat=" + n.longitude + "," + n.latitude).then(function(i) {
                                e = {
                                    area_id: i.data.id,
                                    area_name: i.data.value,
                                    lng: n.longitude,
                                    lat: n.latitude
                                }, t.setStorage({
                                    key: o.default.positionStorageName,
                                    data: e
                                }), r({
                                    code: i.code,
                                    message: "",
                                    data: e
                                });
                            }).catch(function(t) {
                                a(t);
                            });
                        }).catch(function(t) {
                            a(t);
                        });
                    });
                }
            };
            e.default = a;
        }).call(this, n("543d").default);
    },
    "21a2": function(t, e, n) {
        function r(t) {
            var e, n, r;
            return t < 128 ? [ t ] : t < 2048 ? (e = 192 + (t >> 6), n = 128 + (63 & t), [ e, n ]) : (e = 224 + (t >> 12), 
            n = 128 + (t >> 6 & 63), r = 128 + (63 & t), [ e, n, r ]);
        }
        function i(t) {
            for (var e = [], n = 0; n < t.length; n++) for (var i = r(t.charCodeAt(n)), o = 0; o < i.length; o++) e.push(i[o]);
            return e;
        }
        function o(t, e) {
            this.typeNumber = -1, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, 
            this.dataCache = null, this.rsBlocks = null, this.totalDataCount = -1, this.data = t, 
            this.utf8bytes = i(t), this.make();
        }
        function a(t, e) {
            if (void 0 == t.length) throw new Error(t.length + "/" + e);
            for (var n = 0; n < t.length && 0 == t[n]; ) n++;
            this.num = new Array(t.length - n + e);
            for (var r = 0; r < t.length - n; r++) this.num[r] = t[r + n];
        }
        function s() {
            this.buffer = new Array(), this.length = 0;
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = o, o.prototype = {
            constructor: o,
            getModuleCount: function() {
                return this.moduleCount;
            },
            make: function() {
                this.getRightType(), this.dataCache = this.createData(), this.createQrcode();
            },
            makeImpl: function(t) {
                this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
                for (var e = 0; e < this.moduleCount; e++) this.modules[e] = new Array(this.moduleCount);
                this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), 
                this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), 
                this.setupTimingPattern(), this.setupTypeInfo(!0, t), this.typeNumber >= 7 && this.setupTypeNumber(!0), 
                this.mapData(this.dataCache, t);
            },
            setupPositionProbePattern: function(t, e) {
                for (var n = -1; n <= 7; n++) if (!(t + n <= -1 || this.moduleCount <= t + n)) for (var r = -1; r <= 7; r++) e + r <= -1 || this.moduleCount <= e + r || (this.modules[t + n][e + r] = 0 <= n && n <= 6 && (0 == r || 6 == r) || 0 <= r && r <= 6 && (0 == n || 6 == n) || 2 <= n && n <= 4 && 2 <= r && r <= 4);
            },
            createQrcode: function() {
                for (var t = 0, e = 0, n = null, r = 0; r < 8; r++) {
                    this.makeImpl(r);
                    var i = u.getLostPoint(this);
                    (0 == r || t > i) && (t = i, e = r, n = this.modules);
                }
                this.modules = n, this.setupTypeInfo(!1, e), this.typeNumber >= 7 && this.setupTypeNumber(!1);
            },
            setupTimingPattern: function() {
                for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0, 
                null == this.modules[6][t] && (this.modules[6][t] = t % 2 == 0));
            },
            setupPositionAdjustPattern: function() {
                for (var t = u.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++) for (var n = 0; n < t.length; n++) {
                    var r = t[e], i = t[n];
                    if (null == this.modules[r][i]) for (var o = -2; o <= 2; o++) for (var a = -2; a <= 2; a++) this.modules[r + o][i + a] = -2 == o || 2 == o || -2 == a || 2 == a || 0 == o && 0 == a;
                }
            },
            setupTypeNumber: function(t) {
                for (var e = u.getBCHTypeNumber(this.typeNumber), n = 0; n < 18; n++) {
                    var r = !t && 1 == (e >> n & 1);
                    this.modules[Math.floor(n / 3)][n % 3 + this.moduleCount - 8 - 3] = r, this.modules[n % 3 + this.moduleCount - 8 - 3][Math.floor(n / 3)] = r;
                }
            },
            setupTypeInfo: function(t, e) {
                for (var n = l[this.errorCorrectLevel] << 3 | e, r = u.getBCHTypeInfo(n), i = 0; i < 15; i++) {
                    var o = !t && 1 == (r >> i & 1);
                    i < 6 ? this.modules[i][8] = o : i < 8 ? this.modules[i + 1][8] = o : this.modules[this.moduleCount - 15 + i][8] = o, 
                    o = !t && 1 == (r >> i & 1), i < 8 ? this.modules[8][this.moduleCount - i - 1] = o : i < 9 ? this.modules[8][15 - i - 1 + 1] = o : this.modules[8][15 - i - 1] = o;
                }
                this.modules[this.moduleCount - 8][8] = !t;
            },
            createData: function() {
                var t = new s(), e = this.typeNumber > 9 ? 16 : 8;
                t.put(4, 4), t.put(this.utf8bytes.length, e);
                for (var n = 0, r = this.utf8bytes.length; n < r; n++) t.put(this.utf8bytes[n], 8);
                for (t.length + 4 <= 8 * this.totalDataCount && t.put(0, 4); t.length % 8 != 0; ) t.putBit(!1);
                for (;;) {
                    if (t.length >= 8 * this.totalDataCount) break;
                    if (t.put(o.PAD0, 8), t.length >= 8 * this.totalDataCount) break;
                    t.put(o.PAD1, 8);
                }
                return this.createBytes(t);
            },
            createBytes: function(t) {
                for (var e = 0, n = 0, r = 0, i = this.rsBlock.length / 3, o = new Array(), s = 0; s < i; s++) for (var l = this.rsBlock[3 * s + 0], c = this.rsBlock[3 * s + 1], f = this.rsBlock[3 * s + 2], h = 0; h < l; h++) o.push([ f, c ]);
                for (var d = new Array(o.length), p = new Array(o.length), g = 0; g < o.length; g++) {
                    var y = o[g][0], v = o[g][1] - y;
                    for (n = Math.max(n, y), r = Math.max(r, v), d[g] = new Array(y), s = 0; s < d[g].length; s++) d[g][s] = 255 & t.buffer[s + e];
                    e += y;
                    var b = u.getErrorCorrectPolynomial(v), m = new a(d[g], b.getLength() - 1).mod(b);
                    for (p[g] = new Array(b.getLength() - 1), s = 0; s < p[g].length; s++) {
                        var x = s + m.getLength() - p[g].length;
                        p[g][s] = x >= 0 ? m.get(x) : 0;
                    }
                }
                var _ = new Array(this.totalDataCount), w = 0;
                for (s = 0; s < n; s++) for (g = 0; g < o.length; g++) s < d[g].length && (_[w++] = d[g][s]);
                for (s = 0; s < r; s++) for (g = 0; g < o.length; g++) s < p[g].length && (_[w++] = p[g][s]);
                return _;
            },
            mapData: function(t, e) {
                for (var n = -1, r = this.moduleCount - 1, i = 7, o = 0, a = this.moduleCount - 1; a > 0; a -= 2) for (6 == a && a--; ;) {
                    for (var s = 0; s < 2; s++) if (null == this.modules[r][a - s]) {
                        var l = !1;
                        o < t.length && (l = 1 == (t[o] >>> i & 1)), u.getMask(e, r, a - s) && (l = !l), 
                        this.modules[r][a - s] = l, -1 == --i && (o++, i = 7);
                    }
                    if ((r += n) < 0 || this.moduleCount <= r) {
                        r -= n, n = -n;
                        break;
                    }
                }
            }
        }, o.PAD0 = 236, o.PAD1 = 17;
        for (var l = [ 1, 0, 3, 2 ], c = {
            PATTERN000: 0,
            PATTERN001: 1,
            PATTERN010: 2,
            PATTERN011: 3,
            PATTERN100: 4,
            PATTERN101: 5,
            PATTERN110: 6,
            PATTERN111: 7
        }, u = {
            PATTERN_POSITION_TABLE: [ [], [ 6, 18 ], [ 6, 22 ], [ 6, 26 ], [ 6, 30 ], [ 6, 34 ], [ 6, 22, 38 ], [ 6, 24, 42 ], [ 6, 26, 46 ], [ 6, 28, 50 ], [ 6, 30, 54 ], [ 6, 32, 58 ], [ 6, 34, 62 ], [ 6, 26, 46, 66 ], [ 6, 26, 48, 70 ], [ 6, 26, 50, 74 ], [ 6, 30, 54, 78 ], [ 6, 30, 56, 82 ], [ 6, 30, 58, 86 ], [ 6, 34, 62, 90 ], [ 6, 28, 50, 72, 94 ], [ 6, 26, 50, 74, 98 ], [ 6, 30, 54, 78, 102 ], [ 6, 28, 54, 80, 106 ], [ 6, 32, 58, 84, 110 ], [ 6, 30, 58, 86, 114 ], [ 6, 34, 62, 90, 118 ], [ 6, 26, 50, 74, 98, 122 ], [ 6, 30, 54, 78, 102, 126 ], [ 6, 26, 52, 78, 104, 130 ], [ 6, 30, 56, 82, 108, 134 ], [ 6, 34, 60, 86, 112, 138 ], [ 6, 30, 58, 86, 114, 142 ], [ 6, 34, 62, 90, 118, 146 ], [ 6, 30, 54, 78, 102, 126, 150 ], [ 6, 24, 50, 76, 102, 128, 154 ], [ 6, 28, 54, 80, 106, 132, 158 ], [ 6, 32, 58, 84, 110, 136, 162 ], [ 6, 26, 54, 82, 110, 138, 166 ], [ 6, 30, 58, 86, 114, 142, 170 ] ],
            G15: 1335,
            G18: 7973,
            G15_MASK: 21522,
            getBCHTypeInfo: function(t) {
                for (var e = t << 10; u.getBCHDigit(e) - u.getBCHDigit(u.G15) >= 0; ) e ^= u.G15 << u.getBCHDigit(e) - u.getBCHDigit(u.G15);
                return (t << 10 | e) ^ u.G15_MASK;
            },
            getBCHTypeNumber: function(t) {
                for (var e = t << 12; u.getBCHDigit(e) - u.getBCHDigit(u.G18) >= 0; ) e ^= u.G18 << u.getBCHDigit(e) - u.getBCHDigit(u.G18);
                return t << 12 | e;
            },
            getBCHDigit: function(t) {
                for (var e = 0; 0 != t; ) e++, t >>>= 1;
                return e;
            },
            getPatternPosition: function(t) {
                return u.PATTERN_POSITION_TABLE[t - 1];
            },
            getMask: function(t, e, n) {
                switch (t) {
                  case c.PATTERN000:
                    return (e + n) % 2 == 0;

                  case c.PATTERN001:
                    return e % 2 == 0;

                  case c.PATTERN010:
                    return n % 3 == 0;

                  case c.PATTERN011:
                    return (e + n) % 3 == 0;

                  case c.PATTERN100:
                    return (Math.floor(e / 2) + Math.floor(n / 3)) % 2 == 0;

                  case c.PATTERN101:
                    return e * n % 2 + e * n % 3 == 0;

                  case c.PATTERN110:
                    return (e * n % 2 + e * n % 3) % 2 == 0;

                  case c.PATTERN111:
                    return (e * n % 3 + (e + n) % 2) % 2 == 0;

                  default:
                    throw new Error("bad maskPattern:" + t);
                }
            },
            getErrorCorrectPolynomial: function(t) {
                for (var e = new a([ 1 ], 0), n = 0; n < t; n++) e = e.multiply(new a([ 1, f.gexp(n) ], 0));
                return e;
            },
            getLostPoint: function(t) {
                for (var e = t.getModuleCount(), n = 0, r = 0, i = 0; i < e; i++) for (var o = 0, a = t.modules[i][0], s = 0; s < e; s++) {
                    var l = t.modules[i][s];
                    if (s < e - 6 && l && !t.modules[i][s + 1] && t.modules[i][s + 2] && t.modules[i][s + 3] && t.modules[i][s + 4] && !t.modules[i][s + 5] && t.modules[i][s + 6] && (s < e - 10 ? t.modules[i][s + 7] && t.modules[i][s + 8] && t.modules[i][s + 9] && t.modules[i][s + 10] && (n += 40) : s > 3 && t.modules[i][s - 1] && t.modules[i][s - 2] && t.modules[i][s - 3] && t.modules[i][s - 4] && (n += 40)), 
                    i < e - 1 && s < e - 1) {
                        var c = 0;
                        l && c++, t.modules[i + 1][s] && c++, t.modules[i][s + 1] && c++, t.modules[i + 1][s + 1] && c++, 
                        0 != c && 4 != c || (n += 3);
                    }
                    a ^ l ? o++ : (a = l, o >= 5 && (n += 3 + o - 5), o = 1), l && r++;
                }
                for (s = 0; s < e; s++) for (o = 0, a = t.modules[0][s], i = 0; i < e; i++) l = t.modules[i][s], 
                i < e - 6 && l && !t.modules[i + 1][s] && t.modules[i + 2][s] && t.modules[i + 3][s] && t.modules[i + 4][s] && !t.modules[i + 5][s] && t.modules[i + 6][s] && (i < e - 10 ? t.modules[i + 7][s] && t.modules[i + 8][s] && t.modules[i + 9][s] && t.modules[i + 10][s] && (n += 40) : i > 3 && t.modules[i - 1][s] && t.modules[i - 2][s] && t.modules[i - 3][s] && t.modules[i - 4][s] && (n += 40)), 
                a ^ l ? o++ : (a = l, o >= 5 && (n += 3 + o - 5), o = 1);
                return n += 10 * (Math.abs(100 * r / e / e - 50) / 5);
            }
        }, f = {
            glog: function(t) {
                if (t < 1) throw new Error("glog(" + t + ")");
                return f.LOG_TABLE[t];
            },
            gexp: function(t) {
                for (;t < 0; ) t += 255;
                for (;t >= 256; ) t -= 255;
                return f.EXP_TABLE[t];
            },
            EXP_TABLE: new Array(256),
            LOG_TABLE: new Array(256)
        }, h = 0; h < 8; h++) f.EXP_TABLE[h] = 1 << h;
        for (h = 8; h < 256; h++) f.EXP_TABLE[h] = f.EXP_TABLE[h - 4] ^ f.EXP_TABLE[h - 5] ^ f.EXP_TABLE[h - 6] ^ f.EXP_TABLE[h - 8];
        for (h = 0; h < 255; h++) f.LOG_TABLE[f.EXP_TABLE[h]] = h;
        a.prototype = {
            get: function(t) {
                return this.num[t];
            },
            getLength: function() {
                return this.num.length;
            },
            multiply: function(t) {
                for (var e = new Array(this.getLength() + t.getLength() - 1), n = 0; n < this.getLength(); n++) for (var r = 0; r < t.getLength(); r++) e[n + r] ^= f.gexp(f.glog(this.get(n)) + f.glog(t.get(r)));
                return new a(e, 0);
            },
            mod: function(t) {
                var e = this.getLength(), n = t.getLength();
                if (e - n < 0) return this;
                for (var r = new Array(e), i = 0; i < e; i++) r[i] = this.get(i);
                for (;r.length >= n; ) {
                    var o = f.glog(r[0]) - f.glog(t.get(0));
                    for (i = 0; i < t.getLength(); i++) r[i] ^= f.gexp(f.glog(t.get(i)) + o);
                    for (;0 == r[0]; ) r.shift();
                }
                return new a(r, 0);
            }
        };
        var d = [ [ 1, 26, 19 ], [ 1, 26, 16 ], [ 1, 26, 13 ], [ 1, 26, 9 ], [ 1, 44, 34 ], [ 1, 44, 28 ], [ 1, 44, 22 ], [ 1, 44, 16 ], [ 1, 70, 55 ], [ 1, 70, 44 ], [ 2, 35, 17 ], [ 2, 35, 13 ], [ 1, 100, 80 ], [ 2, 50, 32 ], [ 2, 50, 24 ], [ 4, 25, 9 ], [ 1, 134, 108 ], [ 2, 67, 43 ], [ 2, 33, 15, 2, 34, 16 ], [ 2, 33, 11, 2, 34, 12 ], [ 2, 86, 68 ], [ 4, 43, 27 ], [ 4, 43, 19 ], [ 4, 43, 15 ], [ 2, 98, 78 ], [ 4, 49, 31 ], [ 2, 32, 14, 4, 33, 15 ], [ 4, 39, 13, 1, 40, 14 ], [ 2, 121, 97 ], [ 2, 60, 38, 2, 61, 39 ], [ 4, 40, 18, 2, 41, 19 ], [ 4, 40, 14, 2, 41, 15 ], [ 2, 146, 116 ], [ 3, 58, 36, 2, 59, 37 ], [ 4, 36, 16, 4, 37, 17 ], [ 4, 36, 12, 4, 37, 13 ], [ 2, 86, 68, 2, 87, 69 ], [ 4, 69, 43, 1, 70, 44 ], [ 6, 43, 19, 2, 44, 20 ], [ 6, 43, 15, 2, 44, 16 ], [ 4, 101, 81 ], [ 1, 80, 50, 4, 81, 51 ], [ 4, 50, 22, 4, 51, 23 ], [ 3, 36, 12, 8, 37, 13 ], [ 2, 116, 92, 2, 117, 93 ], [ 6, 58, 36, 2, 59, 37 ], [ 4, 46, 20, 6, 47, 21 ], [ 7, 42, 14, 4, 43, 15 ], [ 4, 133, 107 ], [ 8, 59, 37, 1, 60, 38 ], [ 8, 44, 20, 4, 45, 21 ], [ 12, 33, 11, 4, 34, 12 ], [ 3, 145, 115, 1, 146, 116 ], [ 4, 64, 40, 5, 65, 41 ], [ 11, 36, 16, 5, 37, 17 ], [ 11, 36, 12, 5, 37, 13 ], [ 5, 109, 87, 1, 110, 88 ], [ 5, 65, 41, 5, 66, 42 ], [ 5, 54, 24, 7, 55, 25 ], [ 11, 36, 12 ], [ 5, 122, 98, 1, 123, 99 ], [ 7, 73, 45, 3, 74, 46 ], [ 15, 43, 19, 2, 44, 20 ], [ 3, 45, 15, 13, 46, 16 ], [ 1, 135, 107, 5, 136, 108 ], [ 10, 74, 46, 1, 75, 47 ], [ 1, 50, 22, 15, 51, 23 ], [ 2, 42, 14, 17, 43, 15 ], [ 5, 150, 120, 1, 151, 121 ], [ 9, 69, 43, 4, 70, 44 ], [ 17, 50, 22, 1, 51, 23 ], [ 2, 42, 14, 19, 43, 15 ], [ 3, 141, 113, 4, 142, 114 ], [ 3, 70, 44, 11, 71, 45 ], [ 17, 47, 21, 4, 48, 22 ], [ 9, 39, 13, 16, 40, 14 ], [ 3, 135, 107, 5, 136, 108 ], [ 3, 67, 41, 13, 68, 42 ], [ 15, 54, 24, 5, 55, 25 ], [ 15, 43, 15, 10, 44, 16 ], [ 4, 144, 116, 4, 145, 117 ], [ 17, 68, 42 ], [ 17, 50, 22, 6, 51, 23 ], [ 19, 46, 16, 6, 47, 17 ], [ 2, 139, 111, 7, 140, 112 ], [ 17, 74, 46 ], [ 7, 54, 24, 16, 55, 25 ], [ 34, 37, 13 ], [ 4, 151, 121, 5, 152, 122 ], [ 4, 75, 47, 14, 76, 48 ], [ 11, 54, 24, 14, 55, 25 ], [ 16, 45, 15, 14, 46, 16 ], [ 6, 147, 117, 4, 148, 118 ], [ 6, 73, 45, 14, 74, 46 ], [ 11, 54, 24, 16, 55, 25 ], [ 30, 46, 16, 2, 47, 17 ], [ 8, 132, 106, 4, 133, 107 ], [ 8, 75, 47, 13, 76, 48 ], [ 7, 54, 24, 22, 55, 25 ], [ 22, 45, 15, 13, 46, 16 ], [ 10, 142, 114, 2, 143, 115 ], [ 19, 74, 46, 4, 75, 47 ], [ 28, 50, 22, 6, 51, 23 ], [ 33, 46, 16, 4, 47, 17 ], [ 8, 152, 122, 4, 153, 123 ], [ 22, 73, 45, 3, 74, 46 ], [ 8, 53, 23, 26, 54, 24 ], [ 12, 45, 15, 28, 46, 16 ], [ 3, 147, 117, 10, 148, 118 ], [ 3, 73, 45, 23, 74, 46 ], [ 4, 54, 24, 31, 55, 25 ], [ 11, 45, 15, 31, 46, 16 ], [ 7, 146, 116, 7, 147, 117 ], [ 21, 73, 45, 7, 74, 46 ], [ 1, 53, 23, 37, 54, 24 ], [ 19, 45, 15, 26, 46, 16 ], [ 5, 145, 115, 10, 146, 116 ], [ 19, 75, 47, 10, 76, 48 ], [ 15, 54, 24, 25, 55, 25 ], [ 23, 45, 15, 25, 46, 16 ], [ 13, 145, 115, 3, 146, 116 ], [ 2, 74, 46, 29, 75, 47 ], [ 42, 54, 24, 1, 55, 25 ], [ 23, 45, 15, 28, 46, 16 ], [ 17, 145, 115 ], [ 10, 74, 46, 23, 75, 47 ], [ 10, 54, 24, 35, 55, 25 ], [ 19, 45, 15, 35, 46, 16 ], [ 17, 145, 115, 1, 146, 116 ], [ 14, 74, 46, 21, 75, 47 ], [ 29, 54, 24, 19, 55, 25 ], [ 11, 45, 15, 46, 46, 16 ], [ 13, 145, 115, 6, 146, 116 ], [ 14, 74, 46, 23, 75, 47 ], [ 44, 54, 24, 7, 55, 25 ], [ 59, 46, 16, 1, 47, 17 ], [ 12, 151, 121, 7, 152, 122 ], [ 12, 75, 47, 26, 76, 48 ], [ 39, 54, 24, 14, 55, 25 ], [ 22, 45, 15, 41, 46, 16 ], [ 6, 151, 121, 14, 152, 122 ], [ 6, 75, 47, 34, 76, 48 ], [ 46, 54, 24, 10, 55, 25 ], [ 2, 45, 15, 64, 46, 16 ], [ 17, 152, 122, 4, 153, 123 ], [ 29, 74, 46, 14, 75, 47 ], [ 49, 54, 24, 10, 55, 25 ], [ 24, 45, 15, 46, 46, 16 ], [ 4, 152, 122, 18, 153, 123 ], [ 13, 74, 46, 32, 75, 47 ], [ 48, 54, 24, 14, 55, 25 ], [ 42, 45, 15, 32, 46, 16 ], [ 20, 147, 117, 4, 148, 118 ], [ 40, 75, 47, 7, 76, 48 ], [ 43, 54, 24, 22, 55, 25 ], [ 10, 45, 15, 67, 46, 16 ], [ 19, 148, 118, 6, 149, 119 ], [ 18, 75, 47, 31, 76, 48 ], [ 34, 54, 24, 34, 55, 25 ], [ 20, 45, 15, 61, 46, 16 ] ];
        o.prototype.getRightType = function() {
            for (var t = 1; t < 41; t++) {
                var e = d[4 * (t - 1) + this.errorCorrectLevel];
                if (void 0 == e) throw new Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + this.errorCorrectLevel);
                for (var n = e.length / 3, r = 0, i = 0; i < n; i++) {
                    var o = e[3 * i + 0];
                    r += e[3 * i + 2] * o;
                }
                var a = t > 9 ? 2 : 1;
                if (this.utf8bytes.length + a < r || 40 == t) {
                    this.typeNumber = t, this.rsBlock = e, this.totalDataCount = r;
                    break;
                }
            }
        }, s.prototype = {
            get: function(t) {
                var e = Math.floor(t / 8);
                return this.buffer[e] >>> 7 - t % 8 & 1;
            },
            put: function(t, e) {
                for (var n = 0; n < e; n++) this.putBit(t >>> e - n - 1 & 1);
            },
            putBit: function(t) {
                var e = Math.floor(this.length / 8);
                this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), 
                this.length++;
            }
        };
    },
    "29da": function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var r = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(n("1875"));
        e.default = function(t) {
            return (0, r.default)(t);
        };
    },
    "2a65": function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var r = {
            imgs: [ {
                url: "https://files.pay.dianjishenghuo.cn/mrys_bubnr02.v2.jpg",
                name: "mrys_bubnr02.v2",
                path: "index",
                des: "商务合作"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_yaoqinghaoyou8.png",
                name: "mrys_huiyuanrihaoni",
                path: "index",
                des: "邀请好友领现金"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_hzhb_logo01.png",
                name: "mrys_hzhb_logo01",
                path: "index",
                des: "蚂蚁集团"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_hzhb_logo02.png",
                name: "mrys_hzhb_logo02",
                path: "index",
                des: "微信支付"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_hzhb_logo03.png",
                name: "mrys_hzhb_logo03",
                path: "index",
                des: "中国电信"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_hzhb_logo04.png",
                name: "mrys_hzhb_logo04",
                path: "index",
                des: "中国银联"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_hzhb_logo05.png",
                name: "mrys_hzhb_logo05",
                path: "index",
                des: "今日头条"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_hzhb_logo06.png",
                name: "mrys_hzhb_logo06",
                path: "index",
                des: "CCTV"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_hzhb_logo07.png",
                name: "mrys_hzhb_logo07",
                path: "index",
                des: "浙江卫视"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_hzhb_logo08.png",
                name: "mrys_hzhb_logo08",
                path: "index",
                des: "江苏卫视"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/temp/sbnr01.png",
                name: "sbnr01",
                path: "index",
                des: "热点轮播图(大图)"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/temp/sbnr02.png",
                name: "sbnr02",
                path: "index",
                des: "热点轮播图(大图)"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/temp/sbnr03.png",
                name: "sbnr03",
                path: "index",
                des: "热点轮播图(大图)"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/temp/sbnr04.png",
                name: "sbnr04",
                path: "index",
                des: "热点轮播图(大图)"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/temp/sbnr01f.png",
                name: "sbnr01f",
                path: "index",
                des: "热点轮播图(小图)"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/temp/sbnr02f.png",
                name: "sbnr02f",
                path: "index",
                des: "热点轮播图(小图)"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/temp/sbnr03f.png",
                name: "sbnr03f",
                path: "index",
                des: "热点轮播图(小图)"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/temp/sbnr04f.png",
                name: "sbnr04f",
                path: "index",
                des: "热点轮播图(小图)"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_zhjm_01.jpg",
                name: "mrys_zhjm_01",
                path: "businessCooperation",
                des: "商务合作页面展示图"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_zhjm_02.jpg",
                name: "mrys_zhjm_02",
                path: "businessCooperation",
                des: "商务合作页面展示图"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_zhjm_03.jpg",
                name: "mrys_zhjm_03",
                path: "businessCooperation",
                des: "商务合作页面展示图"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_zhjm_04.jpg",
                name: "mrys_zhjm_04",
                path: "businessCooperation",
                des: "商务合作页面展示图"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_zhjm_05.jpg",
                name: "mrys_zhjm_05",
                path: "businessCooperation",
                des: "商务合作页面展示图"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_zhjm_06.jpg",
                name: "mrys_zhjm_06",
                path: "businessCooperation",
                des: "商务合作页面展示图"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_zhjm_07.jpg",
                name: "mrys_zhjm_07",
                path: "businessCooperation",
                des: "商务合作页面展示图"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_zhjm_08.jpg",
                name: "mrys_zhjm_08",
                path: "businessCooperation",
                des: "商务合作页面展示图"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_zhuanqian7.png",
                name: "mrys_fenxiangyouni",
                path: "mine",
                des: "分享、赚钱"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_choujiang8.png",
                name: "mrys_choujiang",
                path: "mine",
                des: "每日抽奖图"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_hongbao2.png",
                name: "mrys_hongbao",
                path: "mine_index",
                des: "红包动图60*90"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_hongbao3.png",
                name: "mrys_hongbao@2",
                path: "mine_index",
                des: "红包动图60*60"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_yaoqingjiang_bj3.jpg",
                name: "yaoqingjiang_bj",
                path: "mine_extensionCode",
                des: "邀请好友顶部背景"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_yaoqingjiang_bj_hongbao.png",
                name: "yaoqingjiang_bj_hongbao",
                path: "mine_extensionCode",
                des: "邀请好友背景红包"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_yaoqingjiang_bj5.png",
                name: "yaoqing_poster_bg",
                path: "mine_extensionCode",
                des: "邀请好友海報背景"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_yaoqingjiang_linel.png",
                name: "mrys_yaoqingjiang_linel",
                path: "mine_extensionCode",
                des: "邀请好友海報背景渐变线"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_yaoqingjiang_linr.png",
                name: "mrys_yaoqingjiang_linr",
                path: "mine_extensionCode",
                des: "邀请好友海報背景渐变线"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_yaoqingjiang_fengxinagrukou.png",
                name: "mrys_yaoqingjiang_fengxinagrukou",
                path: "mine_extensionCode",
                des: "邀请好友分享图片"
            }, {
                url: "https://files.pay.dianjishenghuo.cn/mrys_tuser_defaultHeader.png",
                name: "mrys_tuser_defaultHeader",
                path: "mine_extensionCode",
                des: "邀请好友分享图片"
            } ],
            searchImg: function(t) {
                var e = "";
                return this.imgs.forEach(function(n, r) {
                    var i = new Date();
                    n.name != t || (e = n.url + "?t=" + i.getFullYear() + (i.getMonth() + 1) + i.getDate() + i.getHours());
                }), e;
            }
        };
        e.default = r;
    },
    "39d8": function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = function(t, e, n) {
            var r = n.config.validateStatus, i = n.statusCode;
            !i || r && !r(i) ? e(n) : t(n);
        };
    },
    "543d": function(e, n, r) {
        function i(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(t);
                e && (r = r.filter(function(e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                })), n.push.apply(n, r);
            }
            return n;
        }
        function o(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? i(Object(n), !0).forEach(function(e) {
                    u(t, e, n[e]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach(function(e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                });
            }
            return t;
        }
        function a(t, e) {
            return c(t) || l(t, e) || d(t, e) || s();
        }
        function s() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function l(t, e) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) {
                var n = [], r = !0, i = !1, o = void 0;
                try {
                    for (var a, s = t[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), 
                    !e || n.length !== e); r = !0) ;
                } catch (t) {
                    i = !0, o = t;
                } finally {
                    try {
                        r || null == s.return || s.return();
                    } finally {
                        if (i) throw o;
                    }
                }
                return n;
            }
        }
        function c(t) {
            if (Array.isArray(t)) return t;
        }
        function u(t, e, n) {
            return e in t ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t;
        }
        function f(t) {
            return g(t) || p(t) || d(t) || h();
        }
        function h() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function d(t, e) {
            if (t) {
                if ("string" == typeof t) return y(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? y(t, e) : void 0;
            }
        }
        function p(t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
        }
        function g(t) {
            if (Array.isArray(t)) return y(t);
        }
        function y(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function v(t) {
            return "function" == typeof t;
        }
        function b(t) {
            return "string" == typeof t;
        }
        function m(t) {
            return "[object Object]" === $t.call(t);
        }
        function x(t, e) {
            return Bt.call(t, e);
        }
        function _() {}
        function w(t) {
            var e = Object.create(null);
            return function(n) {
                return e[n] || (e[n] = t(n));
            };
        }
        function A(t, e) {
            var n = e ? t ? t.concat(e) : Array.isArray(e) ? e : [ e ] : t;
            return n ? S(n) : n;
        }
        function S(t) {
            for (var e = [], n = 0; n < t.length; n++) -1 === e.indexOf(t[n]) && e.push(t[n]);
            return e;
        }
        function P(t, e) {
            var n = t.indexOf(e);
            -1 !== n && t.splice(n, 1);
        }
        function T(t, e) {
            Object.keys(e).forEach(function(n) {
                -1 !== Ht.indexOf(n) && v(e[n]) && (t[n] = A(t[n], e[n]));
            });
        }
        function k(t, e) {
            t && e && Object.keys(e).forEach(function(n) {
                -1 !== Ht.indexOf(n) && v(e[n]) && P(t[n], e[n]);
            });
        }
        function O(t) {
            return function(e) {
                return t(e) || e;
            };
        }
        function D(e) {
            return !!e && ("object" === (void 0 === e ? "undefined" : t(e)) || "function" == typeof e) && "function" == typeof e.then;
        }
        function C(t, e) {
            for (var n = !1, r = 0; r < t.length; r++) {
                var i = t[r];
                if (n) n = Promise.resolve(O(i)); else {
                    var o = i(e);
                    if (D(o) && (n = Promise.resolve(o)), !1 === o) return {
                        then: function() {}
                    };
                }
            }
            return n || {
                then: function(t) {
                    return t(e);
                }
            };
        }
        function L(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return [ "success", "fail", "complete" ].forEach(function(n) {
                if (Array.isArray(t[n])) {
                    var r = e[n];
                    e[n] = function(e) {
                        C(t[n], e).then(function(t) {
                            return v(r) && r(t) || t;
                        });
                    };
                }
            }), e;
        }
        function M(t, e) {
            var n = [];
            Array.isArray(Ut.returnValue) && n.push.apply(n, f(Ut.returnValue));
            var r = Gt[t];
            return r && Array.isArray(r.returnValue) && n.push.apply(n, f(r.returnValue)), n.forEach(function(t) {
                e = t(e) || e;
            }), e;
        }
        function j(t) {
            var e = Object.create(null);
            Object.keys(Ut).forEach(function(t) {
                "returnValue" !== t && (e[t] = Ut[t].slice());
            });
            var n = Gt[t];
            return n && Object.keys(n).forEach(function(t) {
                "returnValue" !== t && (e[t] = (e[t] || []).concat(n[t]));
            }), e;
        }
        function E(t, e, n) {
            for (var r = arguments.length, i = new Array(r > 3 ? r - 3 : 0), o = 3; o < r; o++) i[o - 3] = arguments[o];
            var a = j(t);
            return a && Object.keys(a).length ? Array.isArray(a.invoke) ? C(a.invoke, n).then(function(t) {
                return e.apply(void 0, [ L(a, t) ].concat(i));
            }) : e.apply(void 0, [ L(a, n) ].concat(i)) : e.apply(void 0, [ n ].concat(i));
        }
        function F(t) {
            return Xt.test(t) && -1 === qt.indexOf(t);
        }
        function I(t) {
            return Jt.test(t) && -1 === Yt.indexOf(t);
        }
        function R(t) {
            return Qt.test(t) && "onPush" !== t;
        }
        function N(t) {
            return t.then(function(t) {
                return [ null, t ];
            }).catch(function(t) {
                return [ t ];
            });
        }
        function $(t) {
            return !(F(t) || I(t) || R(t));
        }
        function B(t, e) {
            return $(t) ? function() {
                for (var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) i[o - 1] = arguments[o];
                return v(n.success) || v(n.fail) || v(n.complete) ? M(t, E.apply(void 0, [ t, e, n ].concat(i))) : M(t, N(new Promise(function(r, o) {
                    E.apply(void 0, [ t, e, Object.assign({}, n, {
                        success: r,
                        fail: o
                    }) ].concat(i));
                })));
            } : e;
        }
        function z() {
            var t = wx.getSystemInfoSync(), e = t.platform, n = t.pixelRatio, r = t.windowWidth;
            ne = r, re = n, ee = "ios" === e;
        }
        function W(t) {
            for (var e = getCurrentPages(), n = e.length; n--; ) {
                var r = e[n];
                if (r.$page && r.$page.fullPath === t) return n;
            }
            return -1;
        }
        function H(t) {
            (Kt = Kt || wx.getStorageSync(ae)) || (Kt = Date.now() + "" + Math.floor(1e7 * Math.random()), 
            wx.setStorage({
                key: ae,
                data: Kt
            })), t.deviceId = Kt;
        }
        function U(t) {
            if (t.safeArea) {
                var e = t.safeArea;
                t.safeAreaInsets = {
                    top: e.top,
                    left: e.left,
                    right: t.windowWidth - e.right,
                    bottom: t.windowHeight - e.bottom
                };
            }
        }
        function G(t, e, n) {
            return function(r) {
                return e(J(t, r, n));
            };
        }
        function V(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            if (m(e)) {
                var o = !0 === i ? e : {};
                for (var a in v(n) && (n = n(e, o) || {}), e) if (x(n, a)) {
                    var s = n[a];
                    v(s) && (s = s(e[a], e, o)), s ? b(s) ? o[s] = e[a] : m(s) && (o[s.name ? s.name : a] = s.value) : console.warn("The '".concat(t, "' method of platform '微信小程序' does not support option '").concat(a, "'"));
                } else -1 !== fe.indexOf(a) ? v(e[a]) && (o[a] = G(t, e[a], r)) : i || (o[a] = e[a]);
                return o;
            }
            return v(e) && (e = G(t, e, r)), e;
        }
        function J(t, e, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            return v(le.returnValue) && (e = le.returnValue(t, e)), V(t, e, n, {}, r);
        }
        function X(t, e) {
            if (x(le, t)) {
                var n = le[t];
                return n ? function(e, r) {
                    var i = n;
                    v(n) && (i = n(e));
                    var o = [ e = V(t, e, i.args, i.returnValue) ];
                    void 0 !== r && o.push(r), v(i.name) ? t = i.name(e) : b(i.name) && (t = i.name);
                    var a = wx[t].apply(wx, o);
                    return I(t) ? J(t, a, i.returnValue, F(t)) : a;
                } : function() {
                    console.error("Platform '微信小程序' does not support '".concat(t, "'."));
                };
            }
            return e;
        }
        function q(t) {
            return function(e) {
                var n = e.fail, r = e.complete, i = {
                    errMsg: "".concat(t, ":fail method '").concat(t, "' not supported")
                };
                v(n) && n(i), v(r) && r(i);
            };
        }
        function Y(t, e, n) {
            return t[e].apply(t, n);
        }
        function Q(t) {
            if (wx.canIUse("nextTick")) {
                var e = t.triggerEvent;
                t.triggerEvent = function(n) {
                    for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) i[o - 1] = arguments[o];
                    return e.apply(t, [ _e(n) ].concat(i));
                };
            }
        }
        function K(t, e) {
            var n = e[t];
            e[t] = n ? function() {
                Q(this);
                for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
                return n.apply(this, e);
            } : function() {
                Q(this);
            };
        }
        function Z(t, e) {
            var n = t.$mp[t.mpType];
            e.forEach(function(e) {
                x(n, e) && (t[e] = n[e]);
            });
        }
        function tt(t, e) {
            if (!e) return !0;
            if (Nt.default.options && Array.isArray(Nt.default.options[t])) return !0;
            if (e = e.default || e, v(e)) return !!v(e.extendOptions[t]) || !!(e.super && e.super.options && Array.isArray(e.super.options[t]));
            if (v(e[t])) return !0;
            var n = e.mixins;
            return Array.isArray(n) ? !!n.find(function(e) {
                return tt(t, e);
            }) : void 0;
        }
        function et(t, e, n) {
            e.forEach(function(e) {
                tt(e, n) && (t[e] = function(t) {
                    return this.$vm && this.$vm.__call_hook(e, t);
                });
            });
        }
        function nt(t, e) {
            var n;
            return e = e.default || e, n = v(e) ? e : t.extend(e), e = n.options, [ n, e ];
        }
        function rt(t, e) {
            if (Array.isArray(e) && e.length) {
                var n = Object.create(null);
                e.forEach(function(t) {
                    n[t] = !0;
                }), t.$scopedSlots = t.$slots = n;
            }
        }
        function it(t, e) {
            var n = (t = (t || "").split(",")).length;
            1 === n ? e._$vueId = t[0] : 2 === n && (e._$vueId = t[0], e._$vuePid = t[1]);
        }
        function ot(t, e) {
            var n = t.data || {}, r = t.methods || {};
            if ("function" == typeof n) try {
                n = n.call(e);
            } catch (t) {
                Object({
                    VUE_APP_NAME: "every",
                    VUE_APP_PLATFORM: "mp-weixin",
                    NODE_ENV: "production",
                    BASE_URL: "/"
                }).VUE_APP_DEBUG && console.warn("根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。", n);
            } else try {
                n = JSON.parse(JSON.stringify(n));
            } catch (t) {}
            return m(n) || (n = {}), Object.keys(r).forEach(function(t) {
                -1 !== e.__lifecycle_hooks__.indexOf(t) || x(n, t) || (n[t] = r[t]);
            }), n;
        }
        function at(t) {
            return function(e, n) {
                this.$vm && (this.$vm[t] = e);
            };
        }
        function st(t, e) {
            var n = t.behaviors, r = t.extends, i = t.mixins, o = t.props;
            o || (t.props = o = []);
            var a = [];
            return Array.isArray(n) && n.forEach(function(t) {
                a.push(t.replace("uni://", "wx".concat("://"))), "uni://form-field" === t && (Array.isArray(o) ? (o.push("name"), 
                o.push("value")) : (o.name = {
                    type: String,
                    default: ""
                }, o.value = {
                    type: [ String, Number, Boolean, Array, Object, Date ],
                    default: ""
                }));
            }), m(r) && r.props && a.push(e({
                properties: ct(r.props, !0)
            })), Array.isArray(i) && i.forEach(function(t) {
                m(t) && t.props && a.push(e({
                    properties: ct(t.props, !0)
                }));
            }), a;
        }
        function lt(t, e, n, r) {
            return Array.isArray(e) && 1 === e.length ? e[0] : e;
        }
        function ct(t) {
            var e = {};
            return arguments.length > 1 && void 0 !== arguments[1] && arguments[1] || (e.vueId = {
                type: String,
                value: ""
            }, e.generic = {
                type: Object,
                value: null
            }, e.vueSlots = {
                type: null,
                value: [],
                observer: function(t, e) {
                    var n = Object.create(null);
                    t.forEach(function(t) {
                        n[t] = !0;
                    }), this.setData({
                        $slots: n
                    });
                }
            }), Array.isArray(t) ? t.forEach(function(t) {
                e[t] = {
                    type: null,
                    observer: at(t)
                };
            }) : m(t) && Object.keys(t).forEach(function(n) {
                var r = t[n];
                if (m(r)) {
                    var i = r.default;
                    v(i) && (i = i()), r.type = lt(n, r.type), e[n] = {
                        type: -1 !== Ae.indexOf(r.type) ? r.type : null,
                        value: i,
                        observer: at(n)
                    };
                } else {
                    var o = lt(n, r);
                    e[n] = {
                        type: -1 !== Ae.indexOf(o) ? o : null,
                        observer: at(n)
                    };
                }
            }), e;
        }
        function ut(e) {
            try {
                e.mp = JSON.parse(JSON.stringify(e));
            } catch (t) {}
            return e.stopPropagation = _, e.preventDefault = _, e.target = e.target || {}, x(e, "detail") || (e.detail = {}), 
            x(e, "markerId") && (e.detail = "object" === t(e.detail) ? e.detail : {}, e.detail.markerId = e.markerId), 
            m(e.detail) && (e.target = Object.assign({}, e.target, e.detail)), e;
        }
        function ft(t, e) {
            var n = t;
            return e.forEach(function(e) {
                var r = e[0], i = e[2];
                if (r || void 0 !== i) {
                    var o, a = e[1], s = e[3];
                    Number.isInteger(r) ? o = r : r ? "string" == typeof r && r && (o = 0 === r.indexOf("#s#") ? r.substr(3) : t.__get_value(r, n)) : o = n, 
                    Number.isInteger(o) ? n = i : a ? Array.isArray(o) ? n = o.find(function(e) {
                        return t.__get_value(a, e) === i;
                    }) : m(o) ? n = Object.keys(o).find(function(e) {
                        return t.__get_value(a, o[e]) === i;
                    }) : console.error("v-for 暂不支持循环数据：", o) : n = o[i], s && (n = t.__get_value(s, n));
                }
            }), n;
        }
        function ht(t, e, n) {
            var r = {};
            return Array.isArray(e) && e.length && e.forEach(function(e, i) {
                "string" == typeof e ? e ? "$event" === e ? r["$" + i] = n : "arguments" === e ? n.detail && n.detail.__args__ ? r["$" + i] = n.detail.__args__ : r["$" + i] = [ n ] : 0 === e.indexOf("$event.") ? r["$" + i] = t.__get_value(e.replace("$event.", ""), n) : r["$" + i] = t.__get_value(e) : r["$" + i] = t : r["$" + i] = ft(t, e);
            }), r;
        }
        function dt(t) {
            for (var e = {}, n = 1; n < t.length; n++) {
                var r = t[n];
                e[r[0]] = r[1];
            }
            return e;
        }
        function pt(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [], i = arguments.length > 4 ? arguments[4] : void 0, o = arguments.length > 5 ? arguments[5] : void 0, a = !1;
            if (i && (a = e.currentTarget && e.currentTarget.dataset && "wx" === e.currentTarget.dataset.comType, 
            !n.length)) return a ? [ e ] : e.detail.__args__ || e.detail;
            var s = ht(t, r, e), l = [];
            return n.forEach(function(t) {
                "$event" === t ? "__set_model" !== o || i ? i && !a ? l.push(e.detail.__args__[0]) : l.push(e) : l.push(e.target.value) : Array.isArray(t) && "o" === t[0] ? l.push(dt(t)) : "string" == typeof t && x(s, t) ? l.push(s[t]) : l.push(t);
            }), l;
        }
        function gt(t, e) {
            return t === e || "regionchange" === e && ("begin" === t || "end" === t);
        }
        function yt(t) {
            for (var e = t.$parent; e && e.$parent && (e.$options.generic || e.$parent.$options.generic || e.$scope._$vuePid); ) e = e.$parent;
            return e && e.$parent;
        }
        function vt(t) {
            var e = this, n = ((t = ut(t)).currentTarget || t.target).dataset;
            if (!n) return console.warn("事件信息不存在");
            var r = n.eventOpts || n["event-opts"];
            if (!r) return console.warn("事件信息不存在");
            var i = t.type, o = [];
            return r.forEach(function(n) {
                var r = n[0], a = n[1], s = r.charAt(0) === Pe, l = (r = s ? r.slice(1) : r).charAt(0) === Se;
                r = l ? r.slice(1) : r, a && gt(i, r) && a.forEach(function(n) {
                    var r = n[0];
                    if (r) {
                        var i = e.$vm;
                        if (i.$options.generic && (i = yt(i) || i), "$emit" === r) return void i.$emit.apply(i, pt(e.$vm, t, n[1], n[2], s, r));
                        var a = i[r];
                        if (!v(a)) throw new Error(" _vm.".concat(r, " is not a function"));
                        if (l) {
                            if (a.once) return;
                            a.once = !0;
                        }
                        var c = pt(e.$vm, t, n[1], n[2], s, r);
                        c = Array.isArray(c) ? c : [], /=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(a.toString()) && (c = c.concat([ , , , , , , , , , , t ])), 
                        o.push(a.apply(i, c));
                    }
                });
            }), "input" === i && 1 === o.length && void 0 !== o[0] ? o[0] : void 0;
        }
        function bt(t) {
            if (t) {
                var e = Te[t];
                return delete Te[t], e;
            }
            return ke.shift();
        }
        function mt() {
            Nt.default.prototype.getOpenerEventChannel = function() {
                return this.$scope.getOpenerEventChannel();
            };
            var t = Nt.default.prototype.__call_hook;
            Nt.default.prototype.__call_hook = function(e, n) {
                return "onLoad" === e && n && n.__id__ && (this.__eventChannel__ = bt(n.__id__), 
                delete n.__id__), t.call(this, e, n);
            };
        }
        function xt(t, e) {
            var n = e.mocks, r = e.initRefs;
            mt(), t.$options.store && (Nt.default.prototype.$store = t.$options.store), Nt.default.prototype.mpHost = "mp-weixin", 
            Nt.default.mixin({
                beforeCreate: function() {
                    if (this.$options.mpType) {
                        if (this.mpType = this.$options.mpType, this.$mp = u({
                            data: {}
                        }, this.mpType, this.$options.mpInstance), this.$scope = this.$options.mpInstance, 
                        delete this.$options.mpType, delete this.$options.mpInstance, "page" === this.mpType) {
                            var t = getApp();
                            t.$vm && t.$vm.$i18n && (this._i18n = t.$vm.$i18n);
                        }
                        "app" !== this.mpType && (r(this), Z(this, n));
                    }
                }
            });
            var i = {
                onLaunch: function(e) {
                    this.$vm || (wx.canIUse("nextTick") || console.error("当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上"), 
                    this.$vm = t, this.$vm.$mp = {
                        app: this
                    }, this.$vm.$scope = this, this.$vm.globalData = this.globalData, this.$vm._isMounted = !0, 
                    this.$vm.__call_hook("mounted", e), this.$vm.__call_hook("onLaunch", e));
                }
            };
            i.globalData = t.$options.globalData || {};
            var o = t.$options.methods;
            return o && Object.keys(o).forEach(function(t) {
                i[t] = o[t];
            }), et(i, Oe), i;
        }
        function _t(t, e) {
            for (var n, r = t.$children, i = r.length - 1; i >= 0; i--) {
                var o = r[i];
                if (o.$scope._$vueId === e) return o;
            }
            for (var a = r.length - 1; a >= 0; a--) if (n = _t(r[a], e)) return n;
        }
        function wt(t) {
            return Behavior(t);
        }
        function At() {
            return !!this.route;
        }
        function St(t) {
            this.triggerEvent("__l", t);
        }
        function Pt(t, e, n) {
            t.selectAllComponents(e).forEach(function(t) {
                var r = t.dataset.ref;
                n[r] = t.$vm || t, "scoped" === t.dataset.vueGeneric && t.selectAllComponents(".scoped-ref").forEach(function(t) {
                    Pt(t, e, n);
                });
            });
        }
        function Tt(t) {
            var e = t.$scope;
            Object.defineProperty(t, "$refs", {
                get: function() {
                    var t = {};
                    return Pt(e, ".vue-ref", t), e.selectAllComponents(".vue-ref-in-for").forEach(function(e) {
                        var n = e.dataset.ref;
                        t[n] || (t[n] = []), t[n].push(e.$vm || e);
                    }), t;
                }
            });
        }
        function kt(t) {
            var e, n = t.detail || t.value, r = n.vuePid, i = n.vueOptions;
            r && (e = _t(this.$vm, r)), e || (e = this.$vm), i.parent = e;
        }
        function Ot(t) {
            return xt(t, {
                mocks: De,
                initRefs: Tt
            });
        }
        function Dt(t) {
            return App(Ot(t)), t;
        }
        function Ct(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : je, n = t ? Object.keys(t).map(function(n) {
                var r = t[n];
                if (void 0 === r) return "";
                if (null === r) return e(n);
                if (Array.isArray(r)) {
                    var i = [];
                    return r.forEach(function(t) {
                        void 0 !== t && (null === t ? i.push(e(n)) : i.push(e(n) + "=" + e(t)));
                    }), i.join("&");
                }
                return e(n) + "=" + e(r);
            }).filter(function(t) {
                return t.length > 0;
            }).join("&") : null;
            return n ? "?".concat(n) : "";
        }
        function Lt(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = e.isPage, r = e.initRelation, i = a(nt(Nt.default, t), 2), s = i[0], l = i[1], c = o({
                multipleSlots: !0,
                addGlobalClass: !0
            }, l.options || {});
            l["mp-weixin"] && l["mp-weixin"].options && Object.assign(c, l["mp-weixin"].options);
            var u = {
                options: c,
                data: ot(l, Nt.default.prototype),
                behaviors: st(l, wt),
                properties: ct(l.props, !1, l.__file),
                lifetimes: {
                    attached: function() {
                        var t = this.properties, e = {
                            mpType: n.call(this) ? "page" : "component",
                            mpInstance: this,
                            propsData: t
                        };
                        it(t.vueId, this), r.call(this, {
                            vuePid: this._$vuePid,
                            vueOptions: e
                        }), this.$vm = new s(e), rt(this.$vm, t.vueSlots), this.$vm.$mount();
                    },
                    ready: function() {
                        this.$vm && (this.$vm._isMounted = !0, this.$vm.__call_hook("mounted"), this.$vm.__call_hook("onReady"));
                    },
                    detached: function() {
                        this.$vm && this.$vm.$destroy();
                    }
                },
                pageLifetimes: {
                    show: function(t) {
                        this.$vm && this.$vm.__call_hook("onPageShow", t);
                    },
                    hide: function() {
                        this.$vm && this.$vm.__call_hook("onPageHide");
                    },
                    resize: function(t) {
                        this.$vm && this.$vm.__call_hook("onPageResize", t);
                    }
                },
                methods: {
                    __l: kt,
                    __e: vt
                }
            };
            return l.externalClasses && (u.externalClasses = l.externalClasses), Array.isArray(l.wxsCallMethods) && l.wxsCallMethods.forEach(function(t) {
                u.methods[t] = function(e) {
                    return this.$vm[t](e);
                };
            }), n ? u : [ u, s ];
        }
        function Mt(t) {
            return Lt(t, {
                isPage: At,
                initRelation: St
            });
        }
        function jt(t, e) {
            e.isPage, e.initRelation;
            var n = Mt(t);
            return et(n.methods, Ee, t), n.methods.onLoad = function(t) {
                this.options = t;
                var e = Object.assign({}, t);
                delete e.__id__, this.$page = {
                    fullPath: "/" + (this.route || this.is) + Ct(e)
                }, this.$vm.$mp.query = t, this.$vm.__call_hook("onLoad", t);
            }, n;
        }
        function Et(t) {
            return jt(t, {
                isPage: At,
                initRelation: St
            });
        }
        function Ft(t) {
            return Component(Et(t));
        }
        function It(t) {
            return Component(Mt(t));
        }
        function Rt(t) {
            var e = Ot(t), n = getApp({
                allowDefault: !0
            }), r = n.globalData;
            if (r && Object.keys(e.globalData).forEach(function(t) {
                x(r, t) || (r[t] = e.globalData[t]);
            }), Object.keys(e).forEach(function(t) {
                x(n, t) || (n[t] = e[t]);
            }), v(e.onShow) && wx.onAppShow && wx.onAppShow(function() {
                for (var t = arguments.length, r = new Array(t), i = 0; i < t; i++) r[i] = arguments[i];
                e.onShow.apply(n, r);
            }), v(e.onHide) && wx.onAppHide && wx.onAppHide(function() {
                for (var t = arguments.length, r = new Array(t), i = 0; i < t; i++) r[i] = arguments[i];
                e.onHide.apply(n, r);
            }), v(e.onLaunch)) {
                var i = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
                e.onLaunch.call(n, i);
            }
            return t;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.createApp = Dt, n.createComponent = It, n.createPage = Ft, n.createSubpackageApp = Rt, 
        n.default = void 0;
        var Nt = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(r("66fd")), $t = Object.prototype.toString, Bt = Object.prototype.hasOwnProperty, zt = /-(\w)/g, Wt = w(function(t) {
            return t.replace(zt, function(t, e) {
                return e ? e.toUpperCase() : "";
            });
        }), Ht = [ "invoke", "success", "fail", "complete", "returnValue" ], Ut = {}, Gt = {}, Vt = {
            returnValue: function(t) {
                return D(t) ? t.then(function(t) {
                    return t[1];
                }).catch(function(t) {
                    return t[0];
                }) : t;
            }
        }, Jt = /^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/, Xt = /^create|Manager$/, qt = [ "createBLEConnection" ], Yt = [ "createBLEConnection" ], Qt = /^on|^off/;
        Promise.prototype.finally || (Promise.prototype.finally = function(t) {
            var e = this.constructor;
            return this.then(function(n) {
                return e.resolve(t()).then(function() {
                    return n;
                });
            }, function(n) {
                return e.resolve(t()).then(function() {
                    throw n;
                });
            });
        });
        var Kt, Zt = 1e-4, te = 750, ee = !1, ne = 0, re = 0, ie = {
            promiseInterceptor: Vt
        }, oe = Object.freeze({
            __proto__: null,
            upx2px: function(t, e) {
                if (0 === ne && z(), 0 === (t = Number(t))) return 0;
                var n = t / te * (e || ne);
                return n < 0 && (n = -n), 0 === (n = Math.floor(n + Zt)) && (n = 1 !== re && ee ? .5 : 1), 
                t < 0 ? -n : n;
            },
            addInterceptor: function(t, e) {
                "string" == typeof t && m(e) ? T(Gt[t] || (Gt[t] = {}), e) : m(t) && T(Ut, t);
            },
            removeInterceptor: function(t, e) {
                "string" == typeof t ? m(e) ? k(Gt[t], e) : delete Gt[t] : m(t) && k(Ut, t);
            },
            interceptors: ie
        }), ae = "__DC_STAT_UUID", se = {
            returnValue: function(t) {
                H(t), U(t);
            }
        }, le = {
            redirectTo: {
                name: function(t) {
                    return "back" === t.exists && t.delta ? "navigateBack" : "redirectTo";
                },
                args: function(t) {
                    if ("back" === t.exists && t.url) {
                        var e = W(t.url);
                        if (-1 !== e) {
                            var n = getCurrentPages().length - 1 - e;
                            n > 0 && (t.delta = n);
                        }
                    }
                }
            },
            previewImage: {
                args: function(t) {
                    var e = parseInt(t.current);
                    if (!isNaN(e)) {
                        var n = t.urls;
                        if (Array.isArray(n)) {
                            var r = n.length;
                            if (r) return e < 0 ? e = 0 : e >= r && (e = r - 1), e > 0 ? (t.current = n[e], 
                            t.urls = n.filter(function(t, r) {
                                return !(r < e) || t !== n[e];
                            })) : t.current = n[0], {
                                indicator: !1,
                                loop: !1
                            };
                        }
                    }
                }
            },
            getSystemInfo: se,
            getSystemInfoSync: se
        }, ce = [ "vibrate", "preloadPage", "unPreloadPage", "loadSubPackage" ], ue = [], fe = [ "success", "fail", "cancel", "complete" ], he = Object.create(null);
        [ "onTabBarMidButtonTap", "subscribePush", "unsubscribePush", "onPush", "offPush", "share" ].forEach(function(t) {
            he[t] = q(t);
        });
        var de = {
            oauth: [ "weixin" ],
            share: [ "weixin" ],
            payment: [ "wxpay" ],
            push: [ "weixin" ]
        }, pe = Object.freeze({
            __proto__: null,
            getProvider: function(t) {
                var e = t.service, n = t.success, r = t.fail, i = t.complete, o = !1;
                de[e] ? (o = {
                    errMsg: "getProvider:ok",
                    service: e,
                    provider: de[e]
                }, v(n) && n(o)) : (o = {
                    errMsg: "getProvider:fail service not found"
                }, v(r) && r(o)), v(i) && i(o);
            }
        }), ge = function() {
            var t;
            return function() {
                return t || (t = new Nt.default()), t;
            };
        }(), ye = Object.freeze({
            __proto__: null,
            $on: function() {
                return Y(ge(), "$on", Array.prototype.slice.call(arguments));
            },
            $off: function() {
                return Y(ge(), "$off", Array.prototype.slice.call(arguments));
            },
            $once: function() {
                return Y(ge(), "$once", Array.prototype.slice.call(arguments));
            },
            $emit: function() {
                return Y(ge(), "$emit", Array.prototype.slice.call(arguments));
            }
        }), ve = Object.freeze({
            __proto__: null
        }), be = Page, me = Component, xe = /:/g, _e = w(function(t) {
            return Wt(t.replace(xe, "-"));
        });
        be.__$wrappered || (be.__$wrappered = !0, Page = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return K("onLoad", t), be(t);
        }, Page.after = be.after, Component = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return K("created", t), me(t);
        });
        var we = [ "onPullDownRefresh", "onReachBottom", "onAddToFavorites", "onShareTimeline", "onShareAppMessage", "onPageScroll", "onResize", "onTabItemTap" ], Ae = [ String, Number, Boolean, Object, Array, null ], Se = "~", Pe = "^", Te = {}, ke = [], Oe = [ "onShow", "onHide", "onError", "onPageNotFound", "onThemeChange", "onUnhandledRejection" ], De = [ "__route__", "__wxExparserNodeId__", "__wxWebviewId__" ], Ce = /[!'()*]/g, Le = function(t) {
            return "%" + t.charCodeAt(0).toString(16);
        }, Me = /%2C/g, je = function(t) {
            return encodeURIComponent(t).replace(Ce, Le).replace(Me, ",");
        }, Ee = [ "onShow", "onHide", "onUnload" ];
        Ee.push.apply(Ee, we), ce.forEach(function(t) {
            le[t] = !1;
        }), ue.forEach(function(t) {
            var e = le[t] && le[t].name ? le[t].name : t;
            wx.canIUse(e) || (le[t] = !1);
        });
        var Fe = {};
        "undefined" != typeof Proxy ? Fe = new Proxy({}, {
            get: function(t, e) {
                return x(t, e) ? t[e] : oe[e] ? oe[e] : ve[e] ? B(e, ve[e]) : pe[e] ? B(e, pe[e]) : he[e] ? B(e, he[e]) : ye[e] ? ye[e] : x(wx, e) || x(le, e) ? B(e, X(e, wx[e])) : void 0;
            },
            set: function(t, e, n) {
                return t[e] = n, !0;
            }
        }) : (Object.keys(oe).forEach(function(t) {
            Fe[t] = oe[t];
        }), Object.keys(he).forEach(function(t) {
            Fe[t] = B(t, he[t]);
        }), Object.keys(pe).forEach(function(t) {
            Fe[t] = B(t, he[t]);
        }), Object.keys(ye).forEach(function(t) {
            Fe[t] = ye[t];
        }), Object.keys(ve).forEach(function(t) {
            Fe[t] = B(t, ve[t]);
        }), Object.keys(wx).forEach(function(t) {
            (x(wx, t) || x(le, t)) && (Fe[t] = B(t, X(t, wx[t])));
        })), wx.createApp = Dt, wx.createPage = Ft, wx.createComponent = It, wx.createSubpackageApp = Rt;
        var Ie = Fe;
        n.default = Ie;
    },
    5786: function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var r = {
            contact: "",
            person: "",
            personadd: "",
            "contact-filled": "",
            "person-filled": "",
            "personadd-filled": "",
            phone: "",
            email: "",
            chatbubble: "",
            chatboxes: "",
            "phone-filled": "",
            "email-filled": "",
            "chatbubble-filled": "",
            "chatboxes-filled": "",
            weibo: "",
            weixin: "",
            pengyouquan: "",
            chat: "",
            qq: "",
            videocam: "",
            camera: "",
            mic: "",
            location: "",
            "mic-filled": "",
            speech: "",
            "location-filled": "",
            micoff: "",
            image: "",
            map: "",
            compose: "",
            trash: "",
            upload: "",
            download: "",
            close: "",
            redo: "",
            undo: "",
            refresh: "",
            star: "",
            plus: "",
            minus: "",
            circle: "",
            checkbox: "",
            "close-filled": "",
            clear: "",
            "refresh-filled": "",
            "star-filled": "",
            "plus-filled": "",
            "minus-filled": "",
            "circle-filled": "",
            "checkbox-filled": "",
            closeempty: "",
            refreshempty: "",
            reload: "",
            starhalf: "",
            spinner: "",
            "spinner-cycle": "",
            search: "",
            plusempty: "",
            forward: "",
            back: "",
            "left-nav": "",
            checkmarkempty: "",
            home: "",
            navigate: "",
            gear: "",
            paperplane: "",
            info: "",
            help: "",
            locked: "",
            more: "",
            flag: "",
            "home-filled": "",
            "gear-filled": "",
            "info-filled": "",
            "help-filled": "",
            "more-filled": "",
            settings: "",
            list: "",
            bars: "",
            loop: "",
            paperclip: "",
            eye: "",
            arrowup: "",
            arrowdown: "",
            arrowleft: "",
            arrowright: "",
            arrowthinup: "",
            arrowthindown: "",
            arrowthinleft: "",
            arrowthinright: "",
            pulldown: "",
            closefill: "",
            sound: "",
            scan: ""
        };
        e.default = r;
    },
    5930: function(t, e, n) {
        function r() {
            this.handlers = [];
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0, r.prototype.use = function(t, e) {
            return this.handlers.push({
                fulfilled: t,
                rejected: e
            }), this.handlers.length - 1;
        }, r.prototype.eject = function(t) {
            this.handlers[t] && (this.handlers[t] = null);
        }, r.prototype.forEach = function(t) {
            this.handlers.forEach(function(e) {
                null !== e && t(e);
            });
        };
        var i = r;
        e.default = i;
    },
    "5ca1": function(e, n, r) {
        function i(t) {
            if (0 === t.indexOf("_www") || 0 === t.indexOf("_doc") || 0 === t.indexOf("_documents") || 0 === t.indexOf("_downloads")) return t;
            if (0 === t.indexOf("file://")) return t;
            if (0 === t.indexOf("/storage/emulated/0/")) return t;
            if (0 === t.indexOf("/")) {
                var e = plus.io.convertAbsoluteFileSystem(t);
                if (e !== t) return e;
                t = t.substr(1);
            }
            return "_www/" + t;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.pathToBase64 = function(e) {
            return new Promise(function(n, r) {
                if ("object" === ("undefined" == typeof window ? "undefined" : t(window)) && "document" in window) {
                    if ("function" == typeof FileReader) {
                        var o = new XMLHttpRequest();
                        return o.open("GET", e, !0), o.responseType = "blob", o.onload = function() {
                            if (200 === this.status) {
                                var t = new FileReader();
                                t.onload = function(t) {
                                    n(t.target.result);
                                }, t.onerror = r, t.readAsDataURL(this.response);
                            }
                        }, o.onerror = r, void o.send();
                    }
                    var a = document.createElement("canvas"), s = a.getContext("2d"), l = new Image();
                    return l.onload = function() {
                        a.width = l.width, a.height = l.height, s.drawImage(l, 0, 0), n(a.toDataURL()), 
                        a.height = a.width = 0;
                    }, l.onerror = r, void (l.src = e);
                }
                "object" !== ("undefined" == typeof plus ? "undefined" : t(plus)) ? "object" === ("undefined" == typeof wx ? "undefined" : t(wx)) && wx.canIUse("getFileSystemManager") ? wx.getFileSystemManager().readFile({
                    filePath: e,
                    encoding: "base64",
                    success: function(t) {
                        n("data:image/png;base64," + t.data);
                    },
                    fail: function(t) {
                        r(t);
                    }
                }) : r(new Error("not support")) : plus.io.resolveLocalFileSystemURL(i(e), function(t) {
                    t.file(function(t) {
                        var e = new plus.io.FileReader();
                        e.onload = function(t) {
                            n(t.target.result);
                        }, e.onerror = function(t) {
                            r(t);
                        }, e.readAsDataURL(t);
                    }, function(t) {
                        r(t);
                    });
                }, function(t) {
                    r(t);
                });
            });
        }, n.base64ToPath = function(e) {
            return new Promise(function(n, r) {
                if ("object" === ("undefined" == typeof window ? "undefined" : t(window)) && "document" in window) {
                    for (var i = (e = e.split(","))[0].match(/:(.*?);/)[1], o = atob(e[1]), a = o.length, s = new Uint8Array(a); a--; ) s[a] = o.charCodeAt(a);
                    return n((window.URL || window.webkitURL).createObjectURL(new Blob([ s ], {
                        type: i
                    })));
                }
                var l = e.match(/data\:\S+\/(\S+);/);
                l ? l = l[1] : r(new Error("base64 error"));
                var c = Date.now() + "." + l;
                if ("object" !== ("undefined" == typeof plus ? "undefined" : t(plus))) if ("object" === ("undefined" == typeof wx ? "undefined" : t(wx)) && wx.canIUse("getFileSystemManager")) {
                    var u = wx.env.USER_DATA_PATH + "/" + c;
                    wx.getFileSystemManager().writeFile({
                        filePath: u,
                        data: e.replace(/^data:\S+\/\S+;base64,/, ""),
                        encoding: "base64",
                        success: function() {
                            n(u);
                        },
                        fail: function(t) {
                            r(t);
                        }
                    });
                } else r(new Error("not support")); else {
                    var f = new plus.nativeObj.Bitmap("bitmap" + Date.now());
                    f.loadBase64Data(e, function() {
                        var t = "_doc/uniapp_temp/" + c;
                        f.save(t, {}, function() {
                            f.clear(), n(t);
                        }, function(t) {
                            f.clear(), r(t);
                        });
                    }, function(t) {
                        f.clear(), r(t);
                    });
                }
            });
        };
    },
    6153: function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var r = {
            compareVersion: function(t, e) {
                t = t.split("."), e = e.split(".");
                for (var n = Math.max(t.length, e.length); t.length < n; ) t.push("0");
                for (;e.length < n; ) e.push("0");
                for (var r = 0; r < n; r++) {
                    var i = parseInt(t[r]), o = parseInt(e[r]);
                    if (i > o) return 1;
                    if (i < o) return -1;
                }
                return 0;
            }
        };
        e.default = r;
    },
    "620c": function(e, n, r) {
        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function o(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(t, r.key, r);
            }
        }
        function a(t, e, n) {
            return e && o(t.prototype, e), n && o(t, n), t;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var s = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(r("1b7f")), l = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = (t.date, 
                t.selected), r = t.startDate, o = t.endDate, a = t.range;
                i(this, e), this.date = this.getDate(new Date()), this.selected = n || [], this.startDate = r, 
                this.endDate = o, this.range = a, this.cleanMultipleStatus(), this.weeks = {};
            }
            return a(e, [ {
                key: "setDate",
                value: function(t) {
                    this.selectDate = this.getDate(t), this._getWeek(this.selectDate.fullDate);
                }
            }, {
                key: "cleanMultipleStatus",
                value: function() {
                    this.multipleStatus = {
                        before: "",
                        after: "",
                        data: []
                    };
                }
            }, {
                key: "resetSatrtDate",
                value: function(t) {
                    this.startDate = t;
                }
            }, {
                key: "resetEndDate",
                value: function(t) {
                    this.endDate = t;
                }
            }, {
                key: "getDate",
                value: function(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "day";
                    e || (e = new Date()), "object" !== (void 0 === e ? "undefined" : t(e)) && (e = e.replace(/-/g, "/"));
                    var i = new Date(e);
                    switch (r) {
                      case "day":
                        i.setDate(i.getDate() + n);
                        break;

                      case "month":
                        31 === i.getDate() ? i.setDate(i.getDate() + n) : i.setMonth(i.getMonth() + n);
                        break;

                      case "year":
                        i.setFullYear(i.getFullYear() + n);
                    }
                    var o = i.getFullYear(), a = i.getMonth() + 1 < 10 ? "0" + (i.getMonth() + 1) : i.getMonth() + 1, s = i.getDate() < 10 ? "0" + i.getDate() : i.getDate();
                    return {
                        fullDate: o + "-" + a + "-" + s,
                        year: o,
                        month: a,
                        date: s,
                        day: i.getDay()
                    };
                }
            }, {
                key: "_getLastMonthDays",
                value: function(t, e) {
                    for (var n = [], r = t; r > 0; r--) {
                        var i = new Date(e.year, e.month - 1, 1 - r).getDate();
                        n.push({
                            date: i,
                            month: e.month - 1,
                            lunar: this.getlunar(e.year, e.month - 1, i),
                            disable: !0
                        });
                    }
                    return n;
                }
            }, {
                key: "_currentMonthDys",
                value: function(t, e) {
                    for (var n = this, r = [], i = this.date.fullDate, o = 1; o <= t; o++) !function(t) {
                        var o = e.year + "-" + (e.month, e.month + "-") + (t < 10 ? "0" + t : t), a = i === o, s = n.selected && n.selected.find(function(t) {
                            if (n.dateEqual(o, t.date)) return t;
                        }), l = !0, c = !0;
                        if (n.startDate) {
                            var u = n.dateCompare(n.startDate, i);
                            l = n.dateCompare(u ? n.startDate : i, o);
                        }
                        if (n.endDate) {
                            var f = n.dateCompare(i, n.endDate);
                            c = n.dateCompare(o, f ? n.endDate : i);
                        }
                        var h = n.multipleStatus.data, d = !1, p = -1;
                        n.range && (h && (p = h.findIndex(function(t) {
                            return n.dateEqual(t, o);
                        })), -1 !== p && (d = !0));
                        var g = {
                            fullDate: o,
                            year: e.year,
                            date: t,
                            multiple: !!n.range && d,
                            beforeMultiple: n.dateEqual(n.multipleStatus.before, o),
                            afterMultiple: n.dateEqual(n.multipleStatus.after, o),
                            month: e.month,
                            lunar: n.getlunar(e.year, e.month, t),
                            disable: !l || !c,
                            isDay: a
                        };
                        s && (g.extraInfo = s), r.push(g);
                    }(o);
                    return r;
                }
            }, {
                key: "_getNextMonthDays",
                value: function(t, e) {
                    for (var n = [], r = 1; r < t + 1; r++) n.push({
                        date: r,
                        month: Number(e.month) + 1,
                        lunar: this.getlunar(e.year, Number(e.month) + 1, r),
                        disable: !0
                    });
                    return n;
                }
            }, {
                key: "getInfo",
                value: function(t) {
                    var e = this;
                    return t || (t = new Date()), this.canlender.find(function(n) {
                        return n.fullDate === e.getDate(t).fullDate;
                    });
                }
            }, {
                key: "dateCompare",
                value: function(t, e) {
                    return t = new Date(t.replace("-", "/").replace("-", "/")), e = new Date(e.replace("-", "/").replace("-", "/")), 
                    t <= e;
                }
            }, {
                key: "dateEqual",
                value: function(t, e) {
                    return t = new Date(t.replace("-", "/").replace("-", "/")), e = new Date(e.replace("-", "/").replace("-", "/")), 
                    t.getTime() - e.getTime() == 0;
                }
            }, {
                key: "geDateAll",
                value: function(t, e) {
                    var n = [], r = t.split("-"), i = e.split("-"), o = new Date();
                    o.setFullYear(r[0], r[1] - 1, r[2]);
                    var a = new Date();
                    a.setFullYear(i[0], i[1] - 1, i[2]);
                    for (var s = o.getTime() - 864e5, l = a.getTime() - 864e5, c = s; c <= l; ) c += 864e5, 
                    n.push(this.getDate(new Date(parseInt(c))).fullDate);
                    return n;
                }
            }, {
                key: "getlunar",
                value: function(t, e, n) {
                    return s.default.solar2lunar(t, e, n);
                }
            }, {
                key: "setSelectInfo",
                value: function(t, e) {
                    this.selected = e, this._getWeek(t);
                }
            }, {
                key: "setMultiple",
                value: function(t) {
                    var e = this.multipleStatus, n = e.before, r = e.after;
                    this.range && (n && r ? (this.multipleStatus.before = "", this.multipleStatus.after = "", 
                    this.multipleStatus.data = []) : n ? (this.multipleStatus.after = t, this.dateCompare(this.multipleStatus.before, this.multipleStatus.after) ? this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after) : this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before)) : this.multipleStatus.before = t, 
                    this._getWeek(t));
                }
            }, {
                key: "_getWeek",
                value: function(t) {
                    var e = this.getDate(t), n = (e.fullDate, e.year), r = e.month, i = (e.date, e.day, 
                    new Date(n, r - 1, 1).getDay()), o = new Date(n, r, 0).getDate(), a = {
                        lastMonthDays: this._getLastMonthDays(i, this.getDate(t)),
                        currentMonthDys: this._currentMonthDys(o, this.getDate(t)),
                        nextMonthDays: [],
                        weeks: []
                    }, s = [], l = 42 - (a.lastMonthDays.length + a.currentMonthDys.length);
                    a.nextMonthDays = this._getNextMonthDays(l, this.getDate(t)), s = s.concat(a.lastMonthDays, a.currentMonthDys, a.nextMonthDays);
                    for (var c = {}, u = 0; u < s.length; u++) u % 7 == 0 && (c[parseInt(u / 7)] = new Array(7)), 
                    c[parseInt(u / 7)][u % 7] = s[u];
                    this.canlender = s, this.weeks = c;
                }
            } ]), e;
        }();
        n.default = l;
    },
    "66fd": function(e, n, r) {
        r.r(n), function(e) {
            function r(t) {
                return void 0 === t || null === t;
            }
            function i(t) {
                return void 0 !== t && null !== t;
            }
            function o(t) {
                return !0 === t;
            }
            function a(t) {
                return !1 === t;
            }
            function s(e) {
                return "string" == typeof e || "number" == typeof e || "symbol" === (void 0 === e ? "undefined" : t(e)) || "boolean" == typeof e;
            }
            function l(e) {
                return null !== e && "object" === (void 0 === e ? "undefined" : t(e));
            }
            function c(t) {
                return "[object Object]" === bn.call(t);
            }
            function u(t) {
                return "[object RegExp]" === bn.call(t);
            }
            function f(t) {
                var e = parseFloat(String(t));
                return e >= 0 && Math.floor(e) === e && isFinite(t);
            }
            function h(t) {
                return i(t) && "function" == typeof t.then && "function" == typeof t.catch;
            }
            function d(t) {
                return null == t ? "" : Array.isArray(t) || c(t) && t.toString === bn ? JSON.stringify(t, null, 2) : String(t);
            }
            function p(t) {
                var e = parseFloat(t);
                return isNaN(e) ? t : e;
            }
            function g(t, e) {
                for (var n = Object.create(null), r = t.split(","), i = 0; i < r.length; i++) n[r[i]] = !0;
                return e ? function(t) {
                    return n[t.toLowerCase()];
                } : function(t) {
                    return n[t];
                };
            }
            function y(t, e) {
                if (t.length) {
                    var n = t.indexOf(e);
                    if (n > -1) return t.splice(n, 1);
                }
            }
            function v(t, e) {
                return _n.call(t, e);
            }
            function b(t) {
                var e = Object.create(null);
                return function(n) {
                    return e[n] || (e[n] = t(n));
                };
            }
            function m(t, e) {
                e = e || 0;
                for (var n = t.length - e, r = new Array(n); n--; ) r[n] = t[n + e];
                return r;
            }
            function x(t, e) {
                for (var n in e) t[n] = e[n];
                return t;
            }
            function _(t) {
                for (var e = {}, n = 0; n < t.length; n++) t[n] && x(e, t[n]);
                return e;
            }
            function w(t, e, n) {}
            function A(t, e) {
                if (t === e) return !0;
                var n = l(t), r = l(e);
                if (!n || !r) return !n && !r && String(t) === String(e);
                try {
                    var i = Array.isArray(t), o = Array.isArray(e);
                    if (i && o) return t.length === e.length && t.every(function(t, n) {
                        return A(t, e[n]);
                    });
                    if (t instanceof Date && e instanceof Date) return t.getTime() === e.getTime();
                    if (i || o) return !1;
                    var a = Object.keys(t), s = Object.keys(e);
                    return a.length === s.length && a.every(function(n) {
                        return A(t[n], e[n]);
                    });
                } catch (t) {
                    return !1;
                }
            }
            function S(t, e) {
                for (var n = 0; n < t.length; n++) if (A(t[n], e)) return n;
                return -1;
            }
            function P(t) {
                var e = !1;
                return function() {
                    e || (e = !0, t.apply(this, arguments));
                };
            }
            function T(t) {
                var e = (t + "").charCodeAt(0);
                return 36 === e || 95 === e;
            }
            function k(t, e, n, r) {
                Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !!r,
                    writable: !0,
                    configurable: !0
                });
            }
            function O(t) {
                if (!En.test(t)) {
                    var e = t.split(".");
                    return function(t) {
                        for (var n = 0; n < e.length; n++) {
                            if (!t) return;
                            t = t[e[n]];
                        }
                        return t;
                    };
                }
            }
            function D(t) {
                return "function" == typeof t && /native code/.test(t.toString());
            }
            function C(t) {
                Yn.SharedObject.targetStack.push(t), Yn.SharedObject.target = t, Yn.target = t;
            }
            function L() {
                Yn.SharedObject.targetStack.pop(), Yn.SharedObject.target = Yn.SharedObject.targetStack[Yn.SharedObject.targetStack.length - 1], 
                Yn.target = Yn.SharedObject.target;
            }
            function M(t) {
                return new Qn(void 0, void 0, void 0, String(t));
            }
            function j(t) {
                var e = new Qn(t.tag, t.data, t.children && t.children.slice(), t.text, t.elm, t.context, t.componentOptions, t.asyncFactory);
                return e.ns = t.ns, e.isStatic = t.isStatic, e.key = t.key, e.isComment = t.isComment, 
                e.fnContext = t.fnContext, e.fnOptions = t.fnOptions, e.fnScopeId = t.fnScopeId, 
                e.asyncMeta = t.asyncMeta, e.isCloned = !0, e;
            }
            function E(t) {
                rr = t;
            }
            function F(t, e) {
                t.__proto__ = e;
            }
            function I(t, e, n) {
                for (var r = 0, i = n.length; r < i; r++) {
                    var o = n[r];
                    k(t, o, e[o]);
                }
            }
            function R(t, e) {
                var n;
                if (l(t) && !(t instanceof Qn)) return v(t, "__ob__") && t.__ob__ instanceof ir ? n = t.__ob__ : rr && !Gn() && (Array.isArray(t) || c(t)) && Object.isExtensible(t) && !t._isVue && (n = new ir(t)), 
                e && n && n.vmCount++, n;
            }
            function N(t, e, n, r, i) {
                var o = new Yn(), a = Object.getOwnPropertyDescriptor(t, e);
                if (!a || !1 !== a.configurable) {
                    var s = a && a.get, l = a && a.set;
                    s && !l || 2 !== arguments.length || (n = t[e]);
                    var c = !i && R(n);
                    Object.defineProperty(t, e, {
                        enumerable: !0,
                        configurable: !0,
                        get: function() {
                            var e = s ? s.call(t) : n;
                            return Yn.SharedObject.target && (o.depend(), c && (c.dep.depend(), Array.isArray(e) && z(e))), 
                            e;
                        },
                        set: function(e) {
                            var r = s ? s.call(t) : n;
                            e === r || e !== e && r !== r || s && !l || (l ? l.call(t, e) : n = e, c = !i && R(e), 
                            o.notify());
                        }
                    });
                }
            }
            function $(t, e, n) {
                if (Array.isArray(t) && f(e)) return t.length = Math.max(t.length, e), t.splice(e, 1, n), 
                n;
                if (e in t && !(e in Object.prototype)) return t[e] = n, n;
                var r = t.__ob__;
                return t._isVue || r && r.vmCount ? n : r ? (N(r.value, e, n), r.dep.notify(), n) : (t[e] = n, 
                n);
            }
            function B(t, e) {
                if (Array.isArray(t) && f(e)) t.splice(e, 1); else {
                    var n = t.__ob__;
                    t._isVue || n && n.vmCount || v(t, e) && (delete t[e], n && n.dep.notify());
                }
            }
            function z(t) {
                for (var e = void 0, n = 0, r = t.length; n < r; n++) (e = t[n]) && e.__ob__ && e.__ob__.dep.depend(), 
                Array.isArray(e) && z(e);
            }
            function W(t, e) {
                if (!e) return t;
                for (var n, r, i, o = Jn ? Reflect.ownKeys(e) : Object.keys(e), a = 0; a < o.length; a++) "__ob__" !== (n = o[a]) && (r = t[n], 
                i = e[n], v(t, n) ? r !== i && c(r) && c(i) && W(r, i) : $(t, n, i));
                return t;
            }
            function H(t, e, n) {
                return n ? function() {
                    var r = "function" == typeof e ? e.call(n, n) : e, i = "function" == typeof t ? t.call(n, n) : t;
                    return r ? W(r, i) : i;
                } : e ? t ? function() {
                    return W("function" == typeof e ? e.call(this, this) : e, "function" == typeof t ? t.call(this, this) : t);
                } : e : t;
            }
            function U(t, e) {
                var n = e ? t ? t.concat(e) : Array.isArray(e) ? e : [ e ] : t;
                return n ? G(n) : n;
            }
            function G(t) {
                for (var e = [], n = 0; n < t.length; n++) -1 === e.indexOf(t[n]) && e.push(t[n]);
                return e;
            }
            function V(t, e, n, r) {
                var i = Object.create(t || null);
                return e ? x(i, e) : i;
            }
            function J(t, e) {
                var n = t.props;
                if (n) {
                    var r, i, o, a = {};
                    if (Array.isArray(n)) for (r = n.length; r--; ) "string" == typeof (i = n[r]) && (o = An(i), 
                    a[o] = {
                        type: null
                    }); else if (c(n)) for (var s in n) i = n[s], a[o = An(s)] = c(i) ? i : {
                        type: i
                    };
                    t.props = a;
                }
            }
            function X(t, e) {
                var n = t.inject;
                if (n) {
                    var r = t.inject = {};
                    if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r[n[i]] = {
                        from: n[i]
                    }; else if (c(n)) for (var o in n) {
                        var a = n[o];
                        r[o] = c(a) ? x({
                            from: o
                        }, a) : {
                            from: a
                        };
                    }
                }
            }
            function q(t) {
                var e = t.directives;
                if (e) for (var n in e) {
                    var r = e[n];
                    "function" == typeof r && (e[n] = {
                        bind: r,
                        update: r
                    });
                }
            }
            function Y(t, e, n) {
                function r(r) {
                    var i = or[r] || sr;
                    s[r] = i(t[r], e[r], n, r);
                }
                if ("function" == typeof e && (e = e.options), J(e, n), X(e, n), q(e), !e._base && (e.extends && (t = Y(t, e.extends, n)), 
                e.mixins)) for (var i = 0, o = e.mixins.length; i < o; i++) t = Y(t, e.mixins[i], n);
                var a, s = {};
                for (a in t) r(a);
                for (a in e) v(t, a) || r(a);
                return s;
            }
            function Q(t, e, n, r) {
                if ("string" == typeof n) {
                    var i = t[e];
                    if (v(i, n)) return i[n];
                    var o = An(n);
                    if (v(i, o)) return i[o];
                    var a = Sn(o);
                    return v(i, a) ? i[a] : i[n] || i[o] || i[a];
                }
            }
            function K(t, e, n, r) {
                var i = e[t], o = !v(n, t), a = n[t], s = nt(Boolean, i.type);
                if (s > -1) if (o && !v(i, "default")) a = !1; else if ("" === a || a === Tn(t)) {
                    var l = nt(String, i.type);
                    (l < 0 || s < l) && (a = !0);
                }
                if (void 0 === a) {
                    a = Z(r, i, t);
                    var c = rr;
                    E(!0), R(a), E(c);
                }
                return a;
            }
            function Z(t, e, n) {
                if (v(e, "default")) {
                    var r = e.default;
                    return t && t.$options.propsData && void 0 === t.$options.propsData[n] && void 0 !== t._props[n] ? t._props[n] : "function" == typeof r && "Function" !== tt(e.type) ? r.call(t) : r;
                }
            }
            function tt(t) {
                var e = t && t.toString().match(/^\s*function (\w+)/);
                return e ? e[1] : "";
            }
            function et(t, e) {
                return tt(t) === tt(e);
            }
            function nt(t, e) {
                if (!Array.isArray(e)) return et(e, t) ? 0 : -1;
                for (var n = 0, r = e.length; n < r; n++) if (et(e[n], t)) return n;
                return -1;
            }
            function rt(t, e, n) {
                C();
                try {
                    if (e) for (var r = e; r = r.$parent; ) {
                        var i = r.$options.errorCaptured;
                        if (i) for (var o = 0; o < i.length; o++) try {
                            if (!1 === i[o].call(r, t, e, n)) return;
                        } catch (t) {
                            ot(t, r, "errorCaptured hook");
                        }
                    }
                    ot(t, e, n);
                } finally {
                    L();
                }
            }
            function it(t, e, n, r, i) {
                var o;
                try {
                    (o = n ? t.apply(e, n) : t.call(e)) && !o._isVue && h(o) && !o._handled && (o.catch(function(t) {
                        return rt(t, r, i + " (Promise/async)");
                    }), o._handled = !0);
                } catch (t) {
                    rt(t, r, i);
                }
                return o;
            }
            function ot(t, e, n) {
                if (Mn.errorHandler) try {
                    return Mn.errorHandler.call(null, t, e, n);
                } catch (e) {
                    e !== t && at(e, null, "config.errorHandler");
                }
                at(t, e, n);
            }
            function at(t, e, n) {
                if (!In && !Rn || "undefined" == typeof console) throw t;
                console.error(t);
            }
            function st() {
                cr = !1;
                var t = lr.slice(0);
                lr.length = 0;
                for (var e = 0; e < t.length; e++) t[e]();
            }
            function lt(t, e) {
                var n;
                if (lr.push(function() {
                    if (t) try {
                        t.call(e);
                    } catch (t) {
                        rt(t, e, "nextTick");
                    } else n && n(e);
                }), cr || (cr = !0, ar()), !t && "undefined" != typeof Promise) return new Promise(function(t) {
                    n = t;
                });
            }
            function ct(t) {
                ut(t, pr), pr.clear();
            }
            function ut(t, e) {
                var n, r, i = Array.isArray(t);
                if (!(!i && !l(t) || Object.isFrozen(t) || t instanceof Qn)) {
                    if (t.__ob__) {
                        var o = t.__ob__.dep.id;
                        if (e.has(o)) return;
                        e.add(o);
                    }
                    if (i) for (n = t.length; n--; ) ut(t[n], e); else for (n = (r = Object.keys(t)).length; n--; ) ut(t[r[n]], e);
                }
            }
            function ft(t, e) {
                function n() {
                    var t = arguments, r = n.fns;
                    if (!Array.isArray(r)) return it(r, null, arguments, e, "v-on handler");
                    for (var i = r.slice(), o = 0; o < i.length; o++) it(i[o], null, t, e, "v-on handler");
                }
                return n.fns = t, n;
            }
            function ht(t, e, n, i, a, s) {
                var l, c, u, f;
                for (l in t) c = t[l], u = e[l], f = gr(l), r(c) || (r(u) ? (r(c.fns) && (c = t[l] = ft(c, s)), 
                o(f.once) && (c = t[l] = a(f.name, c, f.capture)), n(f.name, c, f.capture, f.passive, f.params)) : c !== u && (u.fns = c, 
                t[l] = u));
                for (l in e) r(t[l]) && (f = gr(l), i(f.name, e[l], f.capture));
            }
            function dt(t, e, n, o) {
                var a = e.options.mpOptions && e.options.mpOptions.properties;
                if (r(a)) return n;
                var s = e.options.mpOptions.externalClasses || [], l = t.attrs, c = t.props;
                if (i(l) || i(c)) for (var u in a) {
                    var f = Tn(u);
                    (gt(n, c, u, f, !0) || gt(n, l, u, f, !1)) && n[u] && -1 !== s.indexOf(f) && o[An(n[u])] && (n[u] = o[An(n[u])]);
                }
                return n;
            }
            function pt(t, e, n, o) {
                var a = e.options.props;
                if (r(a)) return dt(t, e, {}, o);
                var s = {}, l = t.attrs, c = t.props;
                if (i(l) || i(c)) for (var u in a) {
                    var f = Tn(u);
                    gt(s, c, u, f, !0) || gt(s, l, u, f, !1);
                }
                return dt(t, e, s, o);
            }
            function gt(t, e, n, r, o) {
                if (i(e)) {
                    if (v(e, n)) return t[n] = e[n], o || delete e[n], !0;
                    if (v(e, r)) return t[n] = e[r], o || delete e[r], !0;
                }
                return !1;
            }
            function yt(t) {
                for (var e = 0; e < t.length; e++) if (Array.isArray(t[e])) return Array.prototype.concat.apply([], t);
                return t;
            }
            function vt(t) {
                return s(t) ? [ M(t) ] : Array.isArray(t) ? mt(t) : void 0;
            }
            function bt(t) {
                return i(t) && i(t.text) && a(t.isComment);
            }
            function mt(t, e) {
                var n, a, l, c, u = [];
                for (n = 0; n < t.length; n++) r(a = t[n]) || "boolean" == typeof a || (l = u.length - 1, 
                c = u[l], Array.isArray(a) ? a.length > 0 && (a = mt(a, (e || "") + "_" + n), bt(a[0]) && bt(c) && (u[l] = M(c.text + a[0].text), 
                a.shift()), u.push.apply(u, a)) : s(a) ? bt(c) ? u[l] = M(c.text + a) : "" !== a && u.push(M(a)) : bt(a) && bt(c) ? u[l] = M(c.text + a.text) : (o(t._isVList) && i(a.tag) && r(a.key) && i(e) && (a.key = "__vlist" + e + "_" + n + "__"), 
                u.push(a)));
                return u;
            }
            function xt(t) {
                var e = t.$options.provide;
                e && (t._provided = "function" == typeof e ? e.call(t) : e);
            }
            function _t(t) {
                var e = wt(t.$options.inject, t);
                e && (E(!1), Object.keys(e).forEach(function(n) {
                    N(t, n, e[n]);
                }), E(!0));
            }
            function wt(t, e) {
                if (t) {
                    for (var n = Object.create(null), r = Jn ? Reflect.ownKeys(t) : Object.keys(t), i = 0; i < r.length; i++) {
                        var o = r[i];
                        if ("__ob__" !== o) {
                            for (var a = t[o].from, s = e; s; ) {
                                if (s._provided && v(s._provided, a)) {
                                    n[o] = s._provided[a];
                                    break;
                                }
                                s = s.$parent;
                            }
                            if (!s && "default" in t[o]) {
                                var l = t[o].default;
                                n[o] = "function" == typeof l ? l.call(e) : l;
                            }
                        }
                    }
                    return n;
                }
            }
            function At(t, e) {
                if (!t || !t.length) return {};
                for (var n = {}, r = 0, i = t.length; r < i; r++) {
                    var o = t[r], a = o.data;
                    if (a && a.attrs && a.attrs.slot && delete a.attrs.slot, o.context !== e && o.fnContext !== e || !a || null == a.slot) o.asyncMeta && o.asyncMeta.data && "page" === o.asyncMeta.data.slot ? (n.page || (n.page = [])).push(o) : (n.default || (n.default = [])).push(o); else {
                        var s = a.slot, l = n[s] || (n[s] = []);
                        "template" === o.tag ? l.push.apply(l, o.children || []) : l.push(o);
                    }
                }
                for (var c in n) n[c].every(St) && delete n[c];
                return n;
            }
            function St(t) {
                return t.isComment && !t.asyncFactory || " " === t.text;
            }
            function Pt(t, e, n) {
                var r, i = Object.keys(e).length > 0, o = t ? !!t.$stable : !i, a = t && t.$key;
                if (t) {
                    if (t._normalized) return t._normalized;
                    if (o && n && n !== vn && a === n.$key && !i && !n.$hasNormal) return n;
                    for (var s in r = {}, t) t[s] && "$" !== s[0] && (r[s] = Tt(e, s, t[s]));
                } else r = {};
                for (var l in e) l in r || (r[l] = kt(e, l));
                return t && Object.isExtensible(t) && (t._normalized = r), k(r, "$stable", o), k(r, "$key", a), 
                k(r, "$hasNormal", i), r;
            }
            function Tt(e, n, r) {
                var i = function() {
                    var e = arguments.length ? r.apply(null, arguments) : r({});
                    return (e = e && "object" === (void 0 === e ? "undefined" : t(e)) && !Array.isArray(e) ? [ e ] : vt(e)) && (0 === e.length || 1 === e.length && e[0].isComment) ? void 0 : e;
                };
                return r.proxy && Object.defineProperty(e, n, {
                    get: i,
                    enumerable: !0,
                    configurable: !0
                }), i;
            }
            function kt(t, e) {
                return function() {
                    return t[e];
                };
            }
            function Ot(t, e) {
                var n, r, o, a, s;
                if (Array.isArray(t) || "string" == typeof t) for (n = new Array(t.length), r = 0, 
                o = t.length; r < o; r++) n[r] = e(t[r], r, r, r); else if ("number" == typeof t) for (n = new Array(t), 
                r = 0; r < t; r++) n[r] = e(r + 1, r, r, r); else if (l(t)) if (Jn && t[Symbol.iterator]) {
                    n = [];
                    for (var c = t[Symbol.iterator](), u = c.next(); !u.done; ) n.push(e(u.value, n.length, r, r++)), 
                    u = c.next();
                } else for (a = Object.keys(t), n = new Array(a.length), r = 0, o = a.length; r < o; r++) s = a[r], 
                n[r] = e(t[s], s, r, r);
                return i(n) || (n = []), n._isVList = !0, n;
            }
            function Dt(t, e, n, r) {
                var i, o = this.$scopedSlots[t];
                o ? (n = n || {}, r && (n = x(x({}, r), n)), i = o(n, this, n._i) || e) : i = this.$slots[t] || e;
                var a = n && n.slot;
                return a ? this.$createElement("template", {
                    slot: a
                }, i) : i;
            }
            function Ct(t) {
                return Q(this.$options, "filters", t, !0) || Dn;
            }
            function Lt(t, e) {
                return Array.isArray(t) ? -1 === t.indexOf(e) : t !== e;
            }
            function Mt(t, e, n, r, i) {
                var o = Mn.keyCodes[e] || n;
                return i && r && !Mn.keyCodes[e] ? Lt(i, r) : o ? Lt(o, t) : r ? Tn(r) !== e : void 0;
            }
            function jt(t, e, n, r, i) {
                if (n && l(n)) {
                    var o;
                    Array.isArray(n) && (n = _(n));
                    for (var a in n) !function(a) {
                        if ("class" === a || "style" === a || xn(a)) o = t; else {
                            var s = t.attrs && t.attrs.type;
                            o = r || Mn.mustUseProp(e, s, a) ? t.domProps || (t.domProps = {}) : t.attrs || (t.attrs = {});
                        }
                        var l = An(a), c = Tn(a);
                        l in o || c in o || (o[a] = n[a], !i) || ((t.on || (t.on = {}))["update:" + a] = function(t) {
                            n[a] = t;
                        });
                    }(a);
                }
                return t;
            }
            function Et(t, e) {
                var n = this._staticTrees || (this._staticTrees = []), r = n[t];
                return r && !e || (r = n[t] = this.$options.staticRenderFns[t].call(this._renderProxy, null, this), 
                It(r, "__static__" + t, !1)), r;
            }
            function Ft(t, e, n) {
                return It(t, "__once__" + e + (n ? "_" + n : ""), !0), t;
            }
            function It(t, e, n) {
                if (Array.isArray(t)) for (var r = 0; r < t.length; r++) t[r] && "string" != typeof t[r] && Rt(t[r], e + "_" + r, n); else Rt(t, e, n);
            }
            function Rt(t, e, n) {
                t.isStatic = !0, t.key = e, t.isOnce = n;
            }
            function Nt(t, e) {
                if (e && c(e)) {
                    var n = t.on = t.on ? x({}, t.on) : {};
                    for (var r in e) {
                        var i = n[r], o = e[r];
                        n[r] = i ? [].concat(i, o) : o;
                    }
                }
                return t;
            }
            function $t(t, e, n, r) {
                e = e || {
                    $stable: !n
                };
                for (var i = 0; i < t.length; i++) {
                    var o = t[i];
                    Array.isArray(o) ? $t(o, e, n) : o && (o.proxy && (o.fn.proxy = !0), e[o.key] = o.fn);
                }
                return r && (e.$key = r), e;
            }
            function Bt(t, e) {
                for (var n = 0; n < e.length; n += 2) {
                    var r = e[n];
                    "string" == typeof r && r && (t[e[n]] = e[n + 1]);
                }
                return t;
            }
            function zt(t, e) {
                return "string" == typeof t ? e + t : t;
            }
            function Wt(t) {
                t._o = Ft, t._n = p, t._s = d, t._l = Ot, t._t = Dt, t._q = A, t._i = S, t._m = Et, 
                t._f = Ct, t._k = Mt, t._b = jt, t._v = M, t._e = Zn, t._u = $t, t._g = Nt, t._d = Bt, 
                t._p = zt;
            }
            function Ht(t, e, n, r, i) {
                var a, s = this, l = i.options;
                v(r, "_uid") ? (a = Object.create(r), a._original = r) : (a = r, r = r._original);
                var c = o(l._compiled), u = !c;
                this.data = t, this.props = e, this.children = n, this.parent = r, this.listeners = t.on || vn, 
                this.injections = wt(l.inject, r), this.slots = function() {
                    return s.$slots || Pt(t.scopedSlots, s.$slots = At(n, r)), s.$slots;
                }, Object.defineProperty(this, "scopedSlots", {
                    enumerable: !0,
                    get: function() {
                        return Pt(t.scopedSlots, this.slots());
                    }
                }), c && (this.$options = l, this.$slots = this.slots(), this.$scopedSlots = Pt(t.scopedSlots, this.$slots)), 
                l._scopeId ? this._c = function(t, e, n, i) {
                    var o = Kt(a, t, e, n, i, u);
                    return o && !Array.isArray(o) && (o.fnScopeId = l._scopeId, o.fnContext = r), o;
                } : this._c = function(t, e, n, r) {
                    return Kt(a, t, e, n, r, u);
                };
            }
            function Ut(t, e, n, r, o) {
                var a = t.options, s = {}, l = a.props;
                if (i(l)) for (var c in l) s[c] = K(c, l, e || vn); else i(n.attrs) && Vt(s, n.attrs), 
                i(n.props) && Vt(s, n.props);
                var u = new Ht(n, s, o, r, t), f = a.render.call(null, u._c, u);
                if (f instanceof Qn) return Gt(f, n, u.parent, a, u);
                if (Array.isArray(f)) {
                    for (var h = vt(f) || [], d = new Array(h.length), p = 0; p < h.length; p++) d[p] = Gt(h[p], n, u.parent, a, u);
                    return d;
                }
            }
            function Gt(t, e, n, r, i) {
                var o = j(t);
                return o.fnContext = n, o.fnOptions = r, e.slot && ((o.data || (o.data = {})).slot = e.slot), 
                o;
            }
            function Vt(t, e) {
                for (var n in e) t[An(n)] = e[n];
            }
            function Jt(t, e, n, a, s) {
                if (!r(t)) {
                    var c = n.$options._base;
                    if (l(t) && (t = c.extend(t)), "function" == typeof t) {
                        var u;
                        if (r(t.cid) && (u = t, void 0 === (t = oe(u, c)))) return ie(u, e, n, a, s);
                        e = e || {}, $e(t), i(e.model) && Qt(t.options, e);
                        var f = pt(e, t, s, n);
                        if (o(t.options.functional)) return Ut(t, f, e, n, a);
                        var h = e.on;
                        if (e.on = e.nativeOn, o(t.options.abstract)) {
                            var d = e.slot;
                            e = {}, d && (e.slot = d);
                        }
                        qt(e);
                        var p = t.options.name || s;
                        return new Qn("vue-component-" + t.cid + (p ? "-" + p : ""), e, void 0, void 0, void 0, n, {
                            Ctor: t,
                            propsData: f,
                            listeners: h,
                            tag: s,
                            children: a
                        }, u);
                    }
                }
            }
            function Xt(t, e) {
                var n = {
                    _isComponent: !0,
                    _parentVnode: t,
                    parent: e
                }, r = t.data.inlineTemplate;
                return i(r) && (n.render = r.render, n.staticRenderFns = r.staticRenderFns), new t.componentOptions.Ctor(n);
            }
            function qt(t) {
                for (var e = t.hook || (t.hook = {}), n = 0; n < br.length; n++) {
                    var r = br[n], i = e[r], o = vr[r];
                    i === o || i && i._merged || (e[r] = i ? Yt(o, i) : o);
                }
            }
            function Yt(t, e) {
                var n = function(n, r) {
                    t(n, r), e(n, r);
                };
                return n._merged = !0, n;
            }
            function Qt(t, e) {
                var n = t.model && t.model.prop || "value", r = t.model && t.model.event || "input";
                (e.attrs || (e.attrs = {}))[n] = e.model.value;
                var o = e.on || (e.on = {}), a = o[r], s = e.model.callback;
                i(a) ? (Array.isArray(a) ? -1 === a.indexOf(s) : a !== s) && (o[r] = [ s ].concat(a)) : o[r] = s;
            }
            function Kt(t, e, n, r, i, a) {
                return (Array.isArray(n) || s(n)) && (i = r, r = n, n = void 0), o(a) && (i = xr), 
                Zt(t, e, n, r, i);
            }
            function Zt(t, e, n, r, o) {
                if (i(n) && i(n.__ob__)) return Zn();
                if (i(n) && i(n.is) && (e = n.is), !e) return Zn();
                var a, s, l;
                return Array.isArray(r) && "function" == typeof r[0] && (n = n || {}, n.scopedSlots = {
                    default: r[0]
                }, r.length = 0), o === xr ? r = vt(r) : o === mr && (r = yt(r)), "string" == typeof e ? (s = t.$vnode && t.$vnode.ns || Mn.getTagNamespace(e), 
                a = Mn.isReservedTag(e) ? new Qn(Mn.parsePlatformTagName(e), n, r, void 0, void 0, t) : n && n.pre || !i(l = Q(t.$options, "components", e)) ? new Qn(e, n, r, void 0, void 0, t) : Jt(l, n, t, r, e)) : a = Jt(e, n, t, r), 
                Array.isArray(a) ? a : i(a) ? (i(s) && te(a, s), i(n) && ee(n), a) : Zn();
            }
            function te(t, e, n) {
                if (t.ns = e, "foreignObject" === t.tag && (e = void 0, n = !0), i(t.children)) for (var a = 0, s = t.children.length; a < s; a++) {
                    var l = t.children[a];
                    i(l.tag) && (r(l.ns) || o(n) && "svg" !== l.tag) && te(l, e, n);
                }
            }
            function ee(t) {
                l(t.style) && ct(t.style), l(t.class) && ct(t.class);
            }
            function ne(t) {
                t._vnode = null, t._staticTrees = null;
                var e = t.$options, n = t.$vnode = e._parentVnode, r = n && n.context;
                t.$slots = At(e._renderChildren, r), t.$scopedSlots = vn, t._c = function(e, n, r, i) {
                    return Kt(t, e, n, r, i, !1);
                }, t.$createElement = function(e, n, r, i) {
                    return Kt(t, e, n, r, i, !0);
                };
                var i = n && n.data;
                N(t, "$attrs", i && i.attrs || vn, null, !0), N(t, "$listeners", e._parentListeners || vn, null, !0);
            }
            function re(t, e) {
                return (t.__esModule || Jn && "Module" === t[Symbol.toStringTag]) && (t = t.default), 
                l(t) ? e.extend(t) : t;
            }
            function ie(t, e, n, r, i) {
                var o = Zn();
                return o.asyncFactory = t, o.asyncMeta = {
                    data: e,
                    context: n,
                    children: r,
                    tag: i
                }, o;
            }
            function oe(t, e) {
                if (o(t.error) && i(t.errorComp)) return t.errorComp;
                if (i(t.resolved)) return t.resolved;
                var n = _r;
                if (n && i(t.owners) && -1 === t.owners.indexOf(n) && t.owners.push(n), o(t.loading) && i(t.loadingComp)) return t.loadingComp;
                if (n && !i(t.owners)) {
                    var a = t.owners = [ n ], s = !0, c = null, u = null;
                    n.$on("hook:destroyed", function() {
                        return y(a, n);
                    });
                    var f = function(t) {
                        for (var e = 0, n = a.length; e < n; e++) a[e].$forceUpdate();
                        t && (a.length = 0, null !== c && (clearTimeout(c), c = null), null !== u && (clearTimeout(u), 
                        u = null));
                    }, d = P(function(n) {
                        t.resolved = re(n, e), s ? a.length = 0 : f(!0);
                    }), p = P(function(e) {
                        i(t.errorComp) && (t.error = !0, f(!0));
                    }), g = t(d, p);
                    return l(g) && (h(g) ? r(t.resolved) && g.then(d, p) : h(g.component) && (g.component.then(d, p), 
                    i(g.error) && (t.errorComp = re(g.error, e)), i(g.loading) && (t.loadingComp = re(g.loading, e), 
                    0 === g.delay ? t.loading = !0 : c = setTimeout(function() {
                        c = null, r(t.resolved) && r(t.error) && (t.loading = !0, f(!1));
                    }, g.delay || 200)), i(g.timeout) && (u = setTimeout(function() {
                        u = null, r(t.resolved) && p(null);
                    }, g.timeout)))), s = !1, t.loading ? t.loadingComp : t.resolved;
                }
            }
            function ae(t) {
                return t.isComment && t.asyncFactory;
            }
            function se(t) {
                if (Array.isArray(t)) for (var e = 0; e < t.length; e++) {
                    var n = t[e];
                    if (i(n) && (i(n.componentOptions) || ae(n))) return n;
                }
            }
            function le(t) {
                t._events = Object.create(null), t._hasHookEvent = !1;
                var e = t.$options._parentListeners;
                e && he(t, e);
            }
            function ce(t, e) {
                yr.$on(t, e);
            }
            function ue(t, e) {
                yr.$off(t, e);
            }
            function fe(t, e) {
                var n = yr;
                return function r() {
                    null !== e.apply(null, arguments) && n.$off(t, r);
                };
            }
            function he(t, e, n) {
                yr = t, ht(e, n || {}, ce, ue, fe, t), yr = void 0;
            }
            function de(t) {
                var e = wr;
                return wr = t, function() {
                    wr = e;
                };
            }
            function pe(t) {
                var e = t.$options, n = e.parent;
                if (n && !e.abstract) {
                    for (;n.$options.abstract && n.$parent; ) n = n.$parent;
                    n.$children.push(t);
                }
                t.$parent = n, t.$root = n ? n.$root : t, t.$children = [], t.$refs = {}, t._watcher = null, 
                t._inactive = null, t._directInactive = !1, t._isMounted = !1, t._isDestroyed = !1, 
                t._isBeingDestroyed = !1;
            }
            function ge(t, e, n, r, i) {
                var o = r.data.scopedSlots, a = t.$scopedSlots, s = !!(o && !o.$stable || a !== vn && !a.$stable || o && t.$scopedSlots.$key !== o.$key), l = !!(i || t.$options._renderChildren || s);
                if (t.$options._parentVnode = r, t.$vnode = r, t._vnode && (t._vnode.parent = r), 
                t.$options._renderChildren = i, t.$attrs = r.data.attrs || vn, t.$listeners = n || vn, 
                e && t.$options.props) {
                    E(!1);
                    for (var c = t._props, u = t.$options._propKeys || [], f = 0; f < u.length; f++) {
                        var h = u[f], d = t.$options.props;
                        c[h] = K(h, d, e, t);
                    }
                    E(!0), t.$options.propsData = e;
                }
                t._$updateProperties && t._$updateProperties(t), n = n || vn;
                var p = t.$options._parentListeners;
                t.$options._parentListeners = n, he(t, n, p), l && (t.$slots = At(i, r.context), 
                t.$forceUpdate());
            }
            function ye(t) {
                for (;t && (t = t.$parent); ) if (t._inactive) return !0;
                return !1;
            }
            function ve(t, e) {
                if (e) {
                    if (t._directInactive = !1, ye(t)) return;
                } else if (t._directInactive) return;
                if (t._inactive || null === t._inactive) {
                    t._inactive = !1;
                    for (var n = 0; n < t.$children.length; n++) ve(t.$children[n]);
                    me(t, "activated");
                }
            }
            function be(t, e) {
                if (!(e && (t._directInactive = !0, ye(t)) || t._inactive)) {
                    t._inactive = !0;
                    for (var n = 0; n < t.$children.length; n++) be(t.$children[n]);
                    me(t, "deactivated");
                }
            }
            function me(t, e) {
                C();
                var n = t.$options[e], r = e + " hook";
                if (n) for (var i = 0, o = n.length; i < o; i++) it(n[i], t, null, t, r);
                t._hasHookEvent && t.$emit("hook:" + e), L();
            }
            function xe() {
                Or = Ar.length = Sr.length = 0, Pr = {}, Tr = kr = !1;
            }
            function _e() {
                var t, e;
                for (Dr(), kr = !0, Ar.sort(function(t, e) {
                    return t.id - e.id;
                }), Or = 0; Or < Ar.length; Or++) (t = Ar[Or]).before && t.before(), e = t.id, Pr[e] = null, 
                t.run();
                var n = Sr.slice(), r = Ar.slice();
                xe(), Se(n), we(r), Vn && Mn.devtools && Vn.emit("flush");
            }
            function we(t) {
                for (var e = t.length; e--; ) {
                    var n = t[e], r = n.vm;
                    r._watcher === n && r._isMounted && !r._isDestroyed && me(r, "updated");
                }
            }
            function Ae(t) {
                t._inactive = !1, Sr.push(t);
            }
            function Se(t) {
                for (var e = 0; e < t.length; e++) t[e]._inactive = !0, ve(t[e], !0);
            }
            function Pe(t) {
                var e = t.id;
                if (null == Pr[e]) {
                    if (Pr[e] = !0, kr) {
                        for (var n = Ar.length - 1; n > Or && Ar[n].id > t.id; ) n--;
                        Ar.splice(n + 1, 0, t);
                    } else Ar.push(t);
                    Tr || (Tr = !0, lt(_e));
                }
            }
            function Te(t, e, n) {
                jr.get = function() {
                    return this[e][n];
                }, jr.set = function(t) {
                    this[e][n] = t;
                }, Object.defineProperty(t, n, jr);
            }
            function ke(t) {
                t._watchers = [];
                var e = t.$options;
                e.props && Oe(t, e.props), e.methods && Fe(t, e.methods), e.data ? De(t) : R(t._data = {}, !0), 
                e.computed && Le(t, e.computed), e.watch && e.watch !== Wn && Ie(t, e.watch);
            }
            function Oe(t, e) {
                var n = t.$options.propsData || {}, r = t._props = {}, i = t.$options._propKeys = [];
                !t.$parent || E(!1);
                for (var o in e) !function(o) {
                    i.push(o);
                    var a = K(o, e, n, t);
                    N(r, o, a), o in t || Te(t, "_props", o);
                }(o);
                E(!0);
            }
            function De(t) {
                var e = t.$options.data;
                c(e = t._data = "function" == typeof e ? Ce(e, t) : e || {}) || (e = {});
                for (var n = Object.keys(e), r = t.$options.props, i = (t.$options.methods, n.length); i--; ) {
                    var o = n[i];
                    r && v(r, o) || T(o) || Te(t, "_data", o);
                }
                R(e, !0);
            }
            function Ce(t, e) {
                C();
                try {
                    return t.call(e, e);
                } catch (t) {
                    return rt(t, e, "data()"), {};
                } finally {
                    L();
                }
            }
            function Le(t, e) {
                var n = t._computedWatchers = Object.create(null), r = Gn();
                for (var i in e) {
                    var o = e[i], a = "function" == typeof o ? o : o.get;
                    r || (n[i] = new Mr(t, a || w, w, Er)), i in t || Me(t, i, o);
                }
            }
            function Me(t, e, n) {
                var r = !Gn();
                "function" == typeof n ? (jr.get = r ? je(e) : Ee(n), jr.set = w) : (jr.get = n.get ? r && !1 !== n.cache ? je(e) : Ee(n.get) : w, 
                jr.set = n.set || w), Object.defineProperty(t, e, jr);
            }
            function je(t) {
                return function() {
                    var e = this._computedWatchers && this._computedWatchers[t];
                    if (e) return e.dirty && e.evaluate(), Yn.SharedObject.target && e.depend(), e.value;
                };
            }
            function Ee(t) {
                return function() {
                    return t.call(this, this);
                };
            }
            function Fe(t, e) {
                t.$options.props;
                for (var n in e) t[n] = "function" != typeof e[n] ? w : kn(e[n], t);
            }
            function Ie(t, e) {
                for (var n in e) {
                    var r = e[n];
                    if (Array.isArray(r)) for (var i = 0; i < r.length; i++) Re(t, n, r[i]); else Re(t, n, r);
                }
            }
            function Re(t, e, n, r) {
                return c(n) && (r = n, n = n.handler), "string" == typeof n && (n = t[n]), t.$watch(e, n, r);
            }
            function Ne(t, e) {
                var n = t.$options = Object.create(t.constructor.options), r = e._parentVnode;
                n.parent = e.parent, n._parentVnode = r;
                var i = r.componentOptions;
                n.propsData = i.propsData, n._parentListeners = i.listeners, n._renderChildren = i.children, 
                n._componentTag = i.tag, e.render && (n.render = e.render, n.staticRenderFns = e.staticRenderFns);
            }
            function $e(t) {
                var e = t.options;
                if (t.super) {
                    var n = $e(t.super);
                    if (n !== t.superOptions) {
                        t.superOptions = n;
                        var r = Be(t);
                        r && x(t.extendOptions, r), (e = t.options = Y(n, t.extendOptions)).name && (e.components[e.name] = t);
                    }
                }
                return e;
            }
            function Be(t) {
                var e, n = t.options, r = t.sealedOptions;
                for (var i in n) n[i] !== r[i] && (e || (e = {}), e[i] = n[i]);
                return e;
            }
            function ze(t) {
                this._init(t);
            }
            function We(t) {
                t.use = function(t) {
                    var e = this._installedPlugins || (this._installedPlugins = []);
                    if (e.indexOf(t) > -1) return this;
                    var n = m(arguments, 1);
                    return n.unshift(this), "function" == typeof t.install ? t.install.apply(t, n) : "function" == typeof t && t.apply(null, n), 
                    e.push(t), this;
                };
            }
            function He(t) {
                t.mixin = function(t) {
                    return this.options = Y(this.options, t), this;
                };
            }
            function Ue(t) {
                t.cid = 0;
                var e = 1;
                t.extend = function(t) {
                    t = t || {};
                    var n = this, r = n.cid, i = t._Ctor || (t._Ctor = {});
                    if (i[r]) return i[r];
                    var o = t.name || n.options.name, a = function(t) {
                        this._init(t);
                    };
                    return a.prototype = Object.create(n.prototype), a.prototype.constructor = a, a.cid = e++, 
                    a.options = Y(n.options, t), a.super = n, a.options.props && Ge(a), a.options.computed && Ve(a), 
                    a.extend = n.extend, a.mixin = n.mixin, a.use = n.use, Cn.forEach(function(t) {
                        a[t] = n[t];
                    }), o && (a.options.components[o] = a), a.superOptions = n.options, a.extendOptions = t, 
                    a.sealedOptions = x({}, a.options), i[r] = a, a;
                };
            }
            function Ge(t) {
                var e = t.options.props;
                for (var n in e) Te(t.prototype, "_props", n);
            }
            function Ve(t) {
                var e = t.options.computed;
                for (var n in e) Me(t.prototype, n, e[n]);
            }
            function Je(t) {
                Cn.forEach(function(e) {
                    t[e] = function(t, n) {
                        return n ? ("component" === e && c(n) && (n.name = n.name || t, n = this.options._base.extend(n)), 
                        "directive" === e && "function" == typeof n && (n = {
                            bind: n,
                            update: n
                        }), this.options[e + "s"][t] = n, n) : this.options[e + "s"][t];
                    };
                });
            }
            function Xe(t) {
                return t && (t.Ctor.options.name || t.tag);
            }
            function qe(t, e) {
                return Array.isArray(t) ? t.indexOf(e) > -1 : "string" == typeof t ? t.split(",").indexOf(e) > -1 : !!u(t) && t.test(e);
            }
            function Ye(t, e) {
                var n = t.cache, r = t.keys, i = t._vnode;
                for (var o in n) {
                    var a = n[o];
                    if (a) {
                        var s = Xe(a.componentOptions);
                        s && !e(s) && Qe(n, o, r, i);
                    }
                }
            }
            function Qe(t, e, n, r) {
                var i = t[e];
                !i || r && i.tag === r.tag || i.componentInstance.$destroy(), t[e] = null, y(n, e);
            }
            function Ke(t, e) {
                var n = {};
                return Ze(t, e), tn(t, e, "", n), n;
            }
            function Ze(t, e) {
                if (t !== e) {
                    var n = nn(t), r = nn(e);
                    if (n == $r && r == $r) {
                        if (Object.keys(t).length >= Object.keys(e).length) for (var i in e) {
                            var o = t[i];
                            void 0 === o ? t[i] = null : Ze(o, e[i]);
                        }
                    } else n == Nr && r == Nr && t.length >= e.length && e.forEach(function(e, n) {
                        Ze(t[n], e);
                    });
                }
            }
            function tn(t, e, n, r) {
                if (t !== e) {
                    var i = nn(t), o = nn(e);
                    if (i == $r) if (o != $r || Object.keys(t).length < Object.keys(e).length) en(r, n, t); else {
                        for (var a in t) !function(i) {
                            var o = t[i], a = e[i], s = nn(o), l = nn(a);
                            if (s != Nr && s != $r) o != e[i] && en(r, ("" == n ? "" : n + ".") + i, o); else if (s == Nr) l != Nr || o.length < a.length ? en(r, ("" == n ? "" : n + ".") + i, o) : o.forEach(function(t, e) {
                                tn(t, a[e], ("" == n ? "" : n + ".") + i + "[" + e + "]", r);
                            }); else if (s == $r) if (l != $r || Object.keys(o).length < Object.keys(a).length) en(r, ("" == n ? "" : n + ".") + i, o); else for (var c in o) tn(o[c], a[c], ("" == n ? "" : n + ".") + i + "." + c, r);
                        }(a);
                    } else i == Nr ? o != Nr || t.length < e.length ? en(r, n, t) : t.forEach(function(t, i) {
                        tn(t, e[i], n + "[" + i + "]", r);
                    }) : en(r, n, t);
                }
            }
            function en(t, e, n) {
                t[e] = n;
            }
            function nn(t) {
                return Object.prototype.toString.call(t);
            }
            function rn(t) {
                if (t.__next_tick_callbacks && t.__next_tick_callbacks.length) {
                    if (Object({
                        VUE_APP_NAME: "every",
                        VUE_APP_PLATFORM: "mp-weixin",
                        NODE_ENV: "production",
                        BASE_URL: "/"
                    }).VUE_APP_DEBUG) {
                        var e = t.$scope;
                        console.log("[" + +new Date() + "][" + (e.is || e.route) + "][" + t._uid + "]:flushCallbacks[" + t.__next_tick_callbacks.length + "]");
                    }
                    var n = t.__next_tick_callbacks.slice(0);
                    t.__next_tick_callbacks.length = 0;
                    for (var r = 0; r < n.length; r++) n[r]();
                }
            }
            function on(t) {
                return Ar.find(function(e) {
                    return t._watcher === e;
                });
            }
            function an(t, e) {
                if (!t.__next_tick_pending && !on(t)) {
                    if (Object({
                        VUE_APP_NAME: "every",
                        VUE_APP_PLATFORM: "mp-weixin",
                        NODE_ENV: "production",
                        BASE_URL: "/"
                    }).VUE_APP_DEBUG) {
                        var n = t.$scope;
                        console.log("[" + +new Date() + "][" + (n.is || n.route) + "][" + t._uid + "]:nextVueTick");
                    }
                    return lt(e, t);
                }
                if (Object({
                    VUE_APP_NAME: "every",
                    VUE_APP_PLATFORM: "mp-weixin",
                    NODE_ENV: "production",
                    BASE_URL: "/"
                }).VUE_APP_DEBUG) {
                    var r = t.$scope;
                    console.log("[" + +new Date() + "][" + (r.is || r.route) + "][" + t._uid + "]:nextMPTick");
                }
                var i;
                if (t.__next_tick_callbacks || (t.__next_tick_callbacks = []), t.__next_tick_callbacks.push(function() {
                    if (e) try {
                        e.call(t);
                    } catch (e) {
                        rt(e, t, "nextTick");
                    } else i && i(t);
                }), !e && "undefined" != typeof Promise) return new Promise(function(t) {
                    i = t;
                });
            }
            function sn(t) {
                var e = Object.create(null);
                [].concat(Object.keys(t._data || {}), Object.keys(t._computedWatchers || {})).reduce(function(e, n) {
                    return e[n] = t[n], e;
                }, e);
                var n = t.__composition_api_state__ || t.__secret_vfa_state__, r = n && n.rawBindings;
                return r && Object.keys(r).forEach(function(n) {
                    e[n] = t[n];
                }), Object.assign(e, t.$mp.data || {}), Array.isArray(t.$options.behaviors) && -1 !== t.$options.behaviors.indexOf("uni://form-field") && (e.name = t.name, 
                e.value = t.value), JSON.parse(JSON.stringify(e));
            }
            function ln() {}
            function cn(t, e, n) {
                if (!t.mpType) return t;
                "app" === t.mpType && (t.$options.render = ln), t.$options.render || (t.$options.render = ln), 
                !t._$fallback && me(t, "beforeMount");
                return new Mr(t, function() {
                    t._update(t._render(), n);
                }, w, {
                    before: function() {
                        t._isMounted && !t._isDestroyed && me(t, "beforeUpdate");
                    }
                }, !0), n = !1, t;
            }
            function un(t, e) {
                return i(t) || i(e) ? fn(t, hn(e)) : "";
            }
            function fn(t, e) {
                return t ? e ? t + " " + e : t : e || "";
            }
            function hn(t) {
                return Array.isArray(t) ? dn(t) : l(t) ? pn(t) : "string" == typeof t ? t : "";
            }
            function dn(t) {
                for (var e, n = "", r = 0, o = t.length; r < o; r++) i(e = hn(t[r])) && "" !== e && (n && (n += " "), 
                n += e);
                return n;
            }
            function pn(t) {
                var e = "";
                for (var n in t) t[n] && (e && (e += " "), e += n);
                return e;
            }
            function gn(t) {
                return Array.isArray(t) ? _(t) : "string" == typeof t ? Br(t) : t;
            }
            function yn(t, e) {
                var n = e.split("."), r = n[0];
                return 0 === r.indexOf("__$n") && (r = parseInt(r.replace("__$n", ""))), 1 === n.length ? t[r] : yn(t[r], n.slice(1).join("."));
            }
            var vn = Object.freeze({}), bn = Object.prototype.toString;
            g("slot,component", !0);
            var mn, xn = g("key,ref,slot,slot-scope,is"), _n = Object.prototype.hasOwnProperty, wn = /-(\w)/g, An = b(function(t) {
                return t.replace(wn, function(t, e) {
                    return e ? e.toUpperCase() : "";
                });
            }), Sn = b(function(t) {
                return t.charAt(0).toUpperCase() + t.slice(1);
            }), Pn = /\B([A-Z])/g, Tn = b(function(t) {
                return t.replace(Pn, "-$1").toLowerCase();
            }), kn = Function.prototype.bind ? function(t, e) {
                return t.bind(e);
            } : function(t, e) {
                function n(n) {
                    var r = arguments.length;
                    return r ? r > 1 ? t.apply(e, arguments) : t.call(e, n) : t.call(e);
                }
                return n._length = t.length, n;
            }, On = function(t, e, n) {
                return !1;
            }, Dn = function(t) {
                return t;
            }, Cn = [ "component", "directive", "filter" ], Ln = [ "beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated", "errorCaptured", "serverPrefetch" ], Mn = {
                optionMergeStrategies: Object.create(null),
                silent: !1,
                productionTip: !1,
                devtools: !1,
                performance: !1,
                errorHandler: null,
                warnHandler: null,
                ignoredElements: [],
                keyCodes: Object.create(null),
                isReservedTag: On,
                isReservedAttr: On,
                isUnknownElement: On,
                getTagNamespace: w,
                parsePlatformTagName: Dn,
                mustUseProp: On,
                async: !0,
                _lifecycleHooks: Ln
            }, jn = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/, En = new RegExp("[^" + jn.source + ".$_\\d]"), Fn = "__proto__" in {}, In = "undefined" != typeof window, Rn = "undefined" != typeof WXEnvironment && !!WXEnvironment.platform, Nn = Rn && WXEnvironment.platform.toLowerCase(), $n = In && window.navigator.userAgent.toLowerCase(), Bn = $n && /msie|trident/.test($n), zn = ($n && $n.indexOf("msie 9.0"), 
            $n && $n.indexOf("edge/"), $n && $n.indexOf("android"), $n && /iphone|ipad|ipod|ios/.test($n) || "ios" === Nn), Wn = ($n && /chrome\/\d+/.test($n), 
            $n && /phantomjs/.test($n), $n && $n.match(/firefox\/(\d+)/), {}.watch);
            if (In) try {
                var Hn = {};
                Object.defineProperty(Hn, "passive", {
                    get: function() {}
                }), window.addEventListener("test-passive", null, Hn);
            } catch (t) {}
            var Un, Gn = function() {
                return void 0 === mn && (mn = !In && !Rn && void 0 !== e && e.process && "server" === e.process.env.VUE_ENV), 
                mn;
            }, Vn = In && window.__VUE_DEVTOOLS_GLOBAL_HOOK__, Jn = "undefined" != typeof Symbol && D(Symbol) && "undefined" != typeof Reflect && D(Reflect.ownKeys);
            Un = "undefined" != typeof Set && D(Set) ? Set : function() {
                function t() {
                    this.set = Object.create(null);
                }
                return t.prototype.has = function(t) {
                    return !0 === this.set[t];
                }, t.prototype.add = function(t) {
                    this.set[t] = !0;
                }, t.prototype.clear = function() {
                    this.set = Object.create(null);
                }, t;
            }();
            var Xn = w, qn = 0, Yn = function() {
                this.id = qn++, this.subs = [];
            };
            Yn.prototype.addSub = function(t) {
                this.subs.push(t);
            }, Yn.prototype.removeSub = function(t) {
                y(this.subs, t);
            }, Yn.prototype.depend = function() {
                Yn.SharedObject.target && Yn.SharedObject.target.addDep(this);
            }, Yn.prototype.notify = function() {
                for (var t = this.subs.slice(), e = 0, n = t.length; e < n; e++) t[e].update();
            }, Yn.SharedObject = {}, Yn.SharedObject.target = null, Yn.SharedObject.targetStack = [];
            var Qn = function(t, e, n, r, i, o, a, s) {
                this.tag = t, this.data = e, this.children = n, this.text = r, this.elm = i, this.ns = void 0, 
                this.context = o, this.fnContext = void 0, this.fnOptions = void 0, this.fnScopeId = void 0, 
                this.key = e && e.key, this.componentOptions = a, this.componentInstance = void 0, 
                this.parent = void 0, this.raw = !1, this.isStatic = !1, this.isRootInsert = !0, 
                this.isComment = !1, this.isCloned = !1, this.isOnce = !1, this.asyncFactory = s, 
                this.asyncMeta = void 0, this.isAsyncPlaceholder = !1;
            }, Kn = {
                child: {
                    configurable: !0
                }
            };
            Kn.child.get = function() {
                return this.componentInstance;
            }, Object.defineProperties(Qn.prototype, Kn);
            var Zn = function(t) {
                void 0 === t && (t = "");
                var e = new Qn();
                return e.text = t, e.isComment = !0, e;
            }, tr = Array.prototype, er = Object.create(tr);
            [ "push", "pop", "shift", "unshift", "splice", "sort", "reverse" ].forEach(function(t) {
                var e = tr[t];
                k(er, t, function() {
                    for (var n = [], r = arguments.length; r--; ) n[r] = arguments[r];
                    var i, o = e.apply(this, n), a = this.__ob__;
                    switch (t) {
                      case "push":
                      case "unshift":
                        i = n;
                        break;

                      case "splice":
                        i = n.slice(2);
                    }
                    return i && a.observeArray(i), a.dep.notify(), o;
                });
            });
            var nr = Object.getOwnPropertyNames(er), rr = !0, ir = function(t) {
                this.value = t, this.dep = new Yn(), this.vmCount = 0, k(t, "__ob__", this), Array.isArray(t) ? (Fn ? t.push !== t.__proto__.push ? I(t, er, nr) : F(t, er) : I(t, er, nr), 
                this.observeArray(t)) : this.walk(t);
            };
            ir.prototype.walk = function(t) {
                for (var e = Object.keys(t), n = 0; n < e.length; n++) N(t, e[n]);
            }, ir.prototype.observeArray = function(t) {
                for (var e = 0, n = t.length; e < n; e++) R(t[e]);
            };
            var or = Mn.optionMergeStrategies;
            or.data = function(t, e, n) {
                return n ? H(t, e, n) : e && "function" != typeof e ? t : H(t, e);
            }, Ln.forEach(function(t) {
                or[t] = U;
            }), Cn.forEach(function(t) {
                or[t + "s"] = V;
            }), or.watch = function(t, e, n, r) {
                if (t === Wn && (t = void 0), e === Wn && (e = void 0), !e) return Object.create(t || null);
                if (!t) return e;
                var i = {};
                for (var o in x(i, t), e) {
                    var a = i[o], s = e[o];
                    a && !Array.isArray(a) && (a = [ a ]), i[o] = a ? a.concat(s) : Array.isArray(s) ? s : [ s ];
                }
                return i;
            }, or.props = or.methods = or.inject = or.computed = function(t, e, n, r) {
                if (!t) return e;
                var i = Object.create(null);
                return x(i, t), e && x(i, e), i;
            }, or.provide = H;
            var ar, sr = function(t, e) {
                return void 0 === e ? t : e;
            }, lr = [], cr = !1;
            if ("undefined" != typeof Promise && D(Promise)) {
                var ur = Promise.resolve();
                ar = function() {
                    ur.then(st), zn && setTimeout(w);
                };
            } else if (Bn || "undefined" == typeof MutationObserver || !D(MutationObserver) && "[object MutationObserverConstructor]" !== MutationObserver.toString()) ar = "undefined" != typeof setImmediate && D(setImmediate) ? function() {
                setImmediate(st);
            } : function() {
                setTimeout(st, 0);
            }; else {
                var fr = 1, hr = new MutationObserver(st), dr = document.createTextNode(String(fr));
                hr.observe(dr, {
                    characterData: !0
                }), ar = function() {
                    fr = (fr + 1) % 2, dr.data = String(fr);
                };
            }
            var pr = new Un(), gr = b(function(t) {
                var e = "&" === t.charAt(0), n = "~" === (t = e ? t.slice(1) : t).charAt(0), r = "!" === (t = n ? t.slice(1) : t).charAt(0);
                return t = r ? t.slice(1) : t, {
                    name: t,
                    once: n,
                    capture: r,
                    passive: e
                };
            });
            Wt(Ht.prototype);
            var yr, vr = {
                init: function(t, e) {
                    if (t.componentInstance && !t.componentInstance._isDestroyed && t.data.keepAlive) {
                        var n = t;
                        vr.prepatch(n, n);
                    } else (t.componentInstance = Xt(t, wr)).$mount(e ? t.elm : void 0, e);
                },
                prepatch: function(t, e) {
                    var n = e.componentOptions;
                    ge(e.componentInstance = t.componentInstance, n.propsData, n.listeners, e, n.children);
                },
                insert: function(t) {
                    var e = t.context, n = t.componentInstance;
                    n._isMounted || (me(n, "onServiceCreated"), me(n, "onServiceAttached"), n._isMounted = !0, 
                    me(n, "mounted")), t.data.keepAlive && (e._isMounted ? Ae(n) : ve(n, !0));
                },
                destroy: function(t) {
                    var e = t.componentInstance;
                    e._isDestroyed || (t.data.keepAlive ? be(e, !0) : e.$destroy());
                }
            }, br = Object.keys(vr), mr = 1, xr = 2, _r = null, wr = null, Ar = [], Sr = [], Pr = {}, Tr = !1, kr = !1, Or = 0, Dr = Date.now;
            if (In && !Bn) {
                var Cr = window.performance;
                Cr && "function" == typeof Cr.now && Dr() > document.createEvent("Event").timeStamp && (Dr = function() {
                    return Cr.now();
                });
            }
            var Lr = 0, Mr = function(t, e, n, r, i) {
                this.vm = t, i && (t._watcher = this), t._watchers.push(this), r ? (this.deep = !!r.deep, 
                this.user = !!r.user, this.lazy = !!r.lazy, this.sync = !!r.sync, this.before = r.before) : this.deep = this.user = this.lazy = this.sync = !1, 
                this.cb = n, this.id = ++Lr, this.active = !0, this.dirty = this.lazy, this.deps = [], 
                this.newDeps = [], this.depIds = new Un(), this.newDepIds = new Un(), this.expression = "", 
                "function" == typeof e ? this.getter = e : (this.getter = O(e), this.getter || (this.getter = w)), 
                this.value = this.lazy ? void 0 : this.get();
            };
            Mr.prototype.get = function() {
                var t;
                C(this);
                var e = this.vm;
                try {
                    t = this.getter.call(e, e);
                } catch (t) {
                    if (!this.user) throw t;
                    rt(t, e, 'getter for watcher "' + this.expression + '"');
                } finally {
                    this.deep && ct(t), L(), this.cleanupDeps();
                }
                return t;
            }, Mr.prototype.addDep = function(t) {
                var e = t.id;
                this.newDepIds.has(e) || (this.newDepIds.add(e), this.newDeps.push(t), this.depIds.has(e) || t.addSub(this));
            }, Mr.prototype.cleanupDeps = function() {
                for (var t = this.deps.length; t--; ) {
                    var e = this.deps[t];
                    this.newDepIds.has(e.id) || e.removeSub(this);
                }
                var n = this.depIds;
                this.depIds = this.newDepIds, this.newDepIds = n, this.newDepIds.clear(), n = this.deps, 
                this.deps = this.newDeps, this.newDeps = n, this.newDeps.length = 0;
            }, Mr.prototype.update = function() {
                this.lazy ? this.dirty = !0 : this.sync ? this.run() : Pe(this);
            }, Mr.prototype.run = function() {
                if (this.active) {
                    var t = this.get();
                    if (t !== this.value || l(t) || this.deep) {
                        var e = this.value;
                        if (this.value = t, this.user) try {
                            this.cb.call(this.vm, t, e);
                        } catch (t) {
                            rt(t, this.vm, 'callback for watcher "' + this.expression + '"');
                        } else this.cb.call(this.vm, t, e);
                    }
                }
            }, Mr.prototype.evaluate = function() {
                this.value = this.get(), this.dirty = !1;
            }, Mr.prototype.depend = function() {
                for (var t = this.deps.length; t--; ) this.deps[t].depend();
            }, Mr.prototype.teardown = function() {
                if (this.active) {
                    this.vm._isBeingDestroyed || y(this.vm._watchers, this);
                    for (var t = this.deps.length; t--; ) this.deps[t].removeSub(this);
                    this.active = !1;
                }
            };
            var jr = {
                enumerable: !0,
                configurable: !0,
                get: w,
                set: w
            }, Er = {
                lazy: !0
            }, Fr = 0;
            (function(t) {
                t.prototype._init = function(t) {
                    var e = this;
                    e._uid = Fr++, e._isVue = !0, t && t._isComponent ? Ne(e, t) : e.$options = Y($e(e.constructor), t || {}, e), 
                    e._renderProxy = e, e._self = e, pe(e), le(e), ne(e), me(e, "beforeCreate"), !e._$fallback && _t(e), 
                    ke(e), !e._$fallback && xt(e), !e._$fallback && me(e, "created"), e.$options.el && e.$mount(e.$options.el);
                };
            })(ze), function(t) {
                var e = {
                    get: function() {
                        return this._data;
                    }
                }, n = {
                    get: function() {
                        return this._props;
                    }
                };
                Object.defineProperty(t.prototype, "$data", e), Object.defineProperty(t.prototype, "$props", n), 
                t.prototype.$set = $, t.prototype.$delete = B, t.prototype.$watch = function(t, e, n) {
                    var r = this;
                    if (c(e)) return Re(r, t, e, n);
                    (n = n || {}).user = !0;
                    var i = new Mr(r, t, e, n);
                    if (n.immediate) try {
                        e.call(r, i.value);
                    } catch (t) {
                        rt(t, r, 'callback for immediate watcher "' + i.expression + '"');
                    }
                    return function() {
                        i.teardown();
                    };
                };
            }(ze), function(t) {
                var e = /^hook:/;
                t.prototype.$on = function(t, n) {
                    var r = this;
                    if (Array.isArray(t)) for (var i = 0, o = t.length; i < o; i++) r.$on(t[i], n); else (r._events[t] || (r._events[t] = [])).push(n), 
                    e.test(t) && (r._hasHookEvent = !0);
                    return r;
                }, t.prototype.$once = function(t, e) {
                    function n() {
                        r.$off(t, n), e.apply(r, arguments);
                    }
                    var r = this;
                    return n.fn = e, r.$on(t, n), r;
                }, t.prototype.$off = function(t, e) {
                    var n = this;
                    if (!arguments.length) return n._events = Object.create(null), n;
                    if (Array.isArray(t)) {
                        for (var r = 0, i = t.length; r < i; r++) n.$off(t[r], e);
                        return n;
                    }
                    var o, a = n._events[t];
                    if (!a) return n;
                    if (!e) return n._events[t] = null, n;
                    for (var s = a.length; s--; ) if ((o = a[s]) === e || o.fn === e) {
                        a.splice(s, 1);
                        break;
                    }
                    return n;
                }, t.prototype.$emit = function(t) {
                    var e = this, n = e._events[t];
                    if (n) {
                        n = n.length > 1 ? m(n) : n;
                        for (var r = m(arguments, 1), i = 'event handler for "' + t + '"', o = 0, a = n.length; o < a; o++) it(n[o], e, r, e, i);
                    }
                    return e;
                };
            }(ze), function(t) {
                t.prototype._update = function(t, e) {
                    var n = this, r = n.$el, i = n._vnode, o = de(n);
                    n._vnode = t, n.$el = i ? n.__patch__(i, t) : n.__patch__(n.$el, t, e, !1), o(), 
                    r && (r.__vue__ = null), n.$el && (n.$el.__vue__ = n), n.$vnode && n.$parent && n.$vnode === n.$parent._vnode && (n.$parent.$el = n.$el);
                }, t.prototype.$forceUpdate = function() {
                    var t = this;
                    t._watcher && t._watcher.update();
                }, t.prototype.$destroy = function() {
                    var t = this;
                    if (!t._isBeingDestroyed) {
                        me(t, "beforeDestroy"), t._isBeingDestroyed = !0;
                        var e = t.$parent;
                        !e || e._isBeingDestroyed || t.$options.abstract || y(e.$children, t), t._watcher && t._watcher.teardown();
                        for (var n = t._watchers.length; n--; ) t._watchers[n].teardown();
                        t._data.__ob__ && t._data.__ob__.vmCount--, t._isDestroyed = !0, t.__patch__(t._vnode, null), 
                        me(t, "destroyed"), t.$off(), t.$el && (t.$el.__vue__ = null), t.$vnode && (t.$vnode.parent = null);
                    }
                };
            }(ze), function(t) {
                Wt(t.prototype), t.prototype.$nextTick = function(t) {
                    return lt(t, this);
                }, t.prototype._render = function() {
                    var t, e = this, n = e.$options, r = n.render, i = n._parentVnode;
                    i && (e.$scopedSlots = Pt(i.data.scopedSlots, e.$slots, e.$scopedSlots)), e.$vnode = i;
                    try {
                        _r = e, t = r.call(e._renderProxy, e.$createElement);
                    } catch (n) {
                        rt(n, e, "render"), t = e._vnode;
                    } finally {
                        _r = null;
                    }
                    return Array.isArray(t) && 1 === t.length && (t = t[0]), t instanceof Qn || (t = Zn()), 
                    t.parent = i, t;
                };
            }(ze);
            var Ir = [ String, RegExp, Array ], Rr = {
                KeepAlive: {
                    name: "keep-alive",
                    abstract: !0,
                    props: {
                        include: Ir,
                        exclude: Ir,
                        max: [ String, Number ]
                    },
                    created: function() {
                        this.cache = Object.create(null), this.keys = [];
                    },
                    destroyed: function() {
                        for (var t in this.cache) Qe(this.cache, t, this.keys);
                    },
                    mounted: function() {
                        var t = this;
                        this.$watch("include", function(e) {
                            Ye(t, function(t) {
                                return qe(e, t);
                            });
                        }), this.$watch("exclude", function(e) {
                            Ye(t, function(t) {
                                return !qe(e, t);
                            });
                        });
                    },
                    render: function() {
                        var t = this.$slots.default, e = se(t), n = e && e.componentOptions;
                        if (n) {
                            var r = Xe(n), i = this, o = i.include, a = i.exclude;
                            if (o && (!r || !qe(o, r)) || a && r && qe(a, r)) return e;
                            var s = this, l = s.cache, c = s.keys, u = null == e.key ? n.Ctor.cid + (n.tag ? "::" + n.tag : "") : e.key;
                            l[u] ? (e.componentInstance = l[u].componentInstance, y(c, u), c.push(u)) : (l[u] = e, 
                            c.push(u), this.max && c.length > parseInt(this.max) && Qe(l, c[0], c, this._vnode)), 
                            e.data.keepAlive = !0;
                        }
                        return e || t && t[0];
                    }
                }
            };
            (function(t) {
                var e = {
                    get: function() {
                        return Mn;
                    }
                };
                Object.defineProperty(t, "config", e), t.util = {
                    warn: Xn,
                    extend: x,
                    mergeOptions: Y,
                    defineReactive: N
                }, t.set = $, t.delete = B, t.nextTick = lt, t.observable = function(t) {
                    return R(t), t;
                }, t.options = Object.create(null), Cn.forEach(function(e) {
                    t.options[e + "s"] = Object.create(null);
                }), t.options._base = t, x(t.options.components, Rr), We(t), He(t), Ue(t), Je(t);
            })(ze), Object.defineProperty(ze.prototype, "$isServer", {
                get: Gn
            }), Object.defineProperty(ze.prototype, "$ssrContext", {
                get: function() {
                    return this.$vnode && this.$vnode.ssrContext;
                }
            }), Object.defineProperty(ze, "FunctionalRenderContext", {
                value: Ht
            }), ze.version = "2.6.11";
            var Nr = "[object Array]", $r = "[object Object]", Br = b(function(t) {
                var e = {}, n = /;(?![^(]*\))/g, r = /:(.+)/;
                return t.split(n).forEach(function(t) {
                    if (t) {
                        var n = t.split(r);
                        n.length > 1 && (e[n[0].trim()] = n[1].trim());
                    }
                }), e;
            }), zr = [ "createSelectorQuery", "createIntersectionObserver", "selectAllComponents", "selectComponent" ], Wr = [ "onLaunch", "onShow", "onHide", "onUniNViewMessage", "onPageNotFound", "onThemeChange", "onError", "onUnhandledRejection", "onInit", "onLoad", "onReady", "onUnload", "onPullDownRefresh", "onReachBottom", "onTabItemTap", "onAddToFavorites", "onShareTimeline", "onShareAppMessage", "onResize", "onPageScroll", "onNavigationBarButtonTap", "onBackPress", "onNavigationBarSearchInputChanged", "onNavigationBarSearchInputConfirmed", "onNavigationBarSearchInputClicked", "onPageShow", "onPageHide", "onPageResize" ];
            ze.prototype.__patch__ = function(t, e) {
                var n = this;
                if (null !== e && ("page" === this.mpType || "component" === this.mpType)) {
                    var r = this.$scope, i = Object.create(null);
                    try {
                        i = sn(this);
                    } catch (t) {
                        console.error(t);
                    }
                    i.__webviewId__ = r.data.__webviewId__;
                    var o = Object.create(null);
                    Object.keys(i).forEach(function(t) {
                        o[t] = r.data[t];
                    });
                    var a = !1 === this.$shouldDiffData ? i : Ke(i, o);
                    Object.keys(a).length ? (Object({
                        VUE_APP_NAME: "every",
                        VUE_APP_PLATFORM: "mp-weixin",
                        NODE_ENV: "production",
                        BASE_URL: "/"
                    }).VUE_APP_DEBUG && console.log("[" + +new Date() + "][" + (r.is || r.route) + "][" + this._uid + "]差量更新", JSON.stringify(a)), 
                    this.__next_tick_pending = !0, r.setData(a, function() {
                        n.__next_tick_pending = !1, rn(n);
                    })) : rn(this);
                }
            }, ze.prototype.$mount = function(t, e) {
                return cn(this, 0, e);
            }, function(t) {
                var e = t.extend;
                t.extend = function(t) {
                    var n = (t = t || {}).methods;
                    return n && Object.keys(n).forEach(function(e) {
                        -1 !== Wr.indexOf(e) && (t[e] = n[e], delete n[e]);
                    }), e.call(this, t);
                };
                var n = t.config.optionMergeStrategies, r = n.created;
                Wr.forEach(function(t) {
                    n[t] = r;
                }), t.prototype.__lifecycle_hooks__ = Wr;
            }(ze), function(t) {
                t.config.errorHandler = function(e, n, r) {
                    t.util.warn("Error in " + r + ': "' + e.toString() + '"', n), console.error(e);
                    var i = getApp();
                    i && i.onError && i.onError(e);
                };
                var e = t.prototype.$emit;
                t.prototype.$emit = function(t) {
                    return this.$scope && t && this.$scope.triggerEvent(t, {
                        __args__: m(arguments, 1)
                    }), e.apply(this, arguments);
                }, t.prototype.$nextTick = function(t) {
                    return an(this, t);
                }, zr.forEach(function(e) {
                    t.prototype[e] = function(t) {
                        return this.$scope && this.$scope[e] ? this.$scope[e](t) : "undefined" != typeof my ? "createSelectorQuery" === e ? my.createSelectorQuery(t) : "createIntersectionObserver" === e ? my.createIntersectionObserver(t) : void 0 : void 0;
                    };
                }), t.prototype.__init_provide = xt, t.prototype.__init_injections = _t, t.prototype.__call_hook = function(t, e) {
                    var n = this;
                    C();
                    var r, i = n.$options[t], o = t + " hook";
                    if (i) for (var a = 0, s = i.length; a < s; a++) r = it(i[a], n, e ? [ e ] : null, n, o);
                    return n._hasHookEvent && n.$emit("hook:" + t, e), L(), r;
                }, t.prototype.__set_model = function(t, e, n, r) {
                    Array.isArray(r) && (-1 !== r.indexOf("trim") && (n = n.trim()), -1 !== r.indexOf("number") && (n = this._n(n))), 
                    t || (t = this), t[e] = n;
                }, t.prototype.__set_sync = function(t, e, n) {
                    t || (t = this), t[e] = n;
                }, t.prototype.__get_orig = function(t) {
                    return c(t) && t.$orig || t;
                }, t.prototype.__get_value = function(t, e) {
                    return yn(e || this, t);
                }, t.prototype.__get_class = function(t, e) {
                    return un(e, t);
                }, t.prototype.__get_style = function(t, e) {
                    if (!t && !e) return "";
                    var n = gn(t), r = e ? x(e, n) : n;
                    return Object.keys(r).map(function(t) {
                        return Tn(t) + ":" + r[t];
                    }).join(";");
                }, t.prototype.__map = function(t, e) {
                    var n, r, i, o, a;
                    if (Array.isArray(t)) {
                        for (n = new Array(t.length), r = 0, i = t.length; r < i; r++) n[r] = e(t[r], r);
                        return n;
                    }
                    if (l(t)) {
                        for (o = Object.keys(t), n = Object.create(null), r = 0, i = o.length; r < i; r++) n[a = o[r]] = e(t[a], a, r);
                        return n;
                    }
                    if ("number" == typeof t) {
                        for (n = new Array(t), r = 0, i = t; r < i; r++) n[r] = e(r, r);
                        return n;
                    }
                    return [];
                };
            }(ze), n.default = ze;
        }.call(this, r("c8ba"));
    },
    "6eb3": function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var r = {
            top: "top",
            bottom: "bottom",
            center: "center",
            message: "top",
            dialog: "center",
            share: "bottom"
        }, i = {
            data: function() {
                return {
                    config: r
                };
            },
            mixins: [ function(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }(n("1db6")).default ]
        };
        e.default = i;
    },
    7886: function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var r = {
            name: "每日一收",
            devHost: "http://192.168.1.118:8001/",
            prodHost: "https://s.recycle.meiriyishou.com/",
            devLbsHost: "http://192.168.1.118:8004",
            prodLbsHost: "https://lbs.meiriyishou.com",
            xcxAppId: "wxdf991728d0d7a4ef",
            carterXcx: {
                appId: "wx59bc95d0eeae3a76",
                path: "/pages/index/index",
                envVersion: "trial"
            },
            huishihuoXcx: {
                appId: "wx0b3424f612a41723",
                path: "/pages/index/index",
                envVersion: "trial"
            },
            shareBgUrl: "https://files.pay.dianjishenghuo.cn/mrys_share_bg.v3.jpg",
            shareBgUrlBorder: "https://files.pay.dianjishenghuo.cn/mrys_share_bg_has_border.v3.jpg",
            storeCodeBg: "https://files.pay.dianjishenghuo.cn/meiriyishou_store_code_reg_bg.png",
            txMapKey: "Y6CBZ-24JCF-DNSJS-NZF4B-XPBVJ-KJBH5",
            promoCode: "http://promo-code.meiriyishou.com/tuser",
            shareUserCode: "http://share-user.meiriyishou.com/tuser",
            yqUserCode: "http://share-user.meiriyishou.com/yquser",
            fromFriendImg: "https://files.pay.dianjishenghuo.cn/friend_circle_share_big.jpg",
            materielSmallImg: [ "https://files.pay.dianjishenghuo.cn/mrsy_wuliao_small1.jpg", "https://files.pay.dianjishenghuo.cn/mrsy_wuliao_small2.jpg", "https://files.pay.dianjishenghuo.cn/mrsy_wuliao_small3.jpg", "https://files.pay.dianjishenghuo.cn/mrsy_wuliao_small4.jpg", "https://files.pay.dianjishenghuo.cn/mrsy_wuliao_small5.jpg", "https://files.pay.dianjishenghuo.cn/mrsy_wuliao_small6.jpg" ],
            materielBigImg: [ "https://files.pay.dianjishenghuo.cn/mrys_wuliao_big1.jpg", "https://files.pay.dianjishenghuo.cn/mrys_wuliao_big2.jpg", "https://files.pay.dianjishenghuo.cn/mrys_wuliao_big3.jpg", "https://files.pay.dianjishenghuo.cn/mrys_wuliao_big4.jpg", "https://files.pay.dianjishenghuo.cn/mrys_wuliao_big5.jpg", "https://files.pay.dianjishenghuo.cn/mrys_wuliao_big6.jpg" ],
            adminKey: "douhao",
            authHeaderName: "terminal-auth",
            authStorageName: "terminal-token",
            authExpireCode: "200302",
            httpSuccessStatus: "200",
            openIdStorageName: "terminal-openId",
            positionStorageName: "terminal-position",
            fileUploadHost: "https://upload.qiniup.com",
            fileDownLoadHost: "http://files.pay.dianjishenghuo.cn/",
            networkImgs: function(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }(n("2a65")).default
        };
        e.default = r;
    },
    "78e8": function(e, n, r) {
        (function(n) {
            function r(t, e) {
                var n = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, r = t.replace(n, function(t, e, n, r) {
                    return e + e + n + n + r + r;
                }), i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);
                return "rgba(" + parseInt(i[1], 16) + "," + parseInt(i[2], 16) + "," + parseInt(i[3], 16) + "," + e + ")";
            }
            function i(t, e, n) {
                if (isNaN(t)) throw new Error("[uCharts] unvalid series data!");
                n = n || 10, e = e || "upper";
                for (var r = 1; n < 1; ) n *= 10, r *= 10;
                for (t = "upper" === e ? Math.ceil(t * r) : Math.floor(t * r); t % n != 0; ) "upper" === e ? t++ : t--;
                return t / r;
            }
            function o(t, e, n, r) {
                for (var i = [], o = 0; o < t.length; o++) {
                    for (var a = {
                        data: [],
                        name: e[o],
                        color: n[o]
                    }, s = 0, l = r.length; s < l; s++) if (s < t[o]) a.data.push(null); else {
                        for (var c = 0, u = 0; u < t[o]; u++) c += r[s - u][1];
                        a.data.push(+(c / t[o]).toFixed(3));
                    }
                    i.push(a);
                }
                return i;
            }
            function a(t, e, n, r, i) {
                var o = i.width - i.area[1] - i.area[3], a = n.eachSpacing * (i.chartData.xAxisData.xAxisPoints.length - 1), s = e;
                return e >= 0 ? (s = 0, t.event.trigger("scrollLeft")) : Math.abs(e) >= a - o && (s = o - a, 
                t.event.trigger("scrollRight")), s;
            }
            function s(t, e, n) {
                function r(t) {
                    for (;t < 0; ) t += 2 * Math.PI;
                    for (;t > 2 * Math.PI; ) t -= 2 * Math.PI;
                    return t;
                }
                return t = r(t), e = r(e), n = r(n), e > n && (n += 2 * Math.PI, t < e && (t += 2 * Math.PI)), 
                t >= e && t <= n;
            }
            function l(t, e, n) {
                var r = t, i = n - e, o = r + (n - i - r) / Math.sqrt(2);
                return {
                    transX: o *= -1,
                    transY: (n - i) * (Math.sqrt(2) - 1) - (n - i - r) / Math.sqrt(2)
                };
            }
            function c(t, e) {
                function n(t, e) {
                    return !(!t[e - 1] || !t[e + 1]) && (t[e].y >= Math.max(t[e - 1].y, t[e + 1].y) || t[e].y <= Math.min(t[e - 1].y, t[e + 1].y));
                }
                function r(t, e) {
                    return !(!t[e - 1] || !t[e + 1]) && (t[e].x >= Math.max(t[e - 1].x, t[e + 1].x) || t[e].x <= Math.min(t[e - 1].x, t[e + 1].x));
                }
                var i = null, o = null, a = null, s = null;
                if (e < 1 ? (i = t[0].x + .2 * (t[1].x - t[0].x), o = t[0].y + .2 * (t[1].y - t[0].y)) : (i = t[e].x + .2 * (t[e + 1].x - t[e - 1].x), 
                o = t[e].y + .2 * (t[e + 1].y - t[e - 1].y)), e > t.length - 3) {
                    var l = t.length - 1;
                    a = t[l].x - .2 * (t[l].x - t[l - 1].x), s = t[l].y - .2 * (t[l].y - t[l - 1].y);
                } else a = t[e + 1].x - .2 * (t[e + 2].x - t[e].x), s = t[e + 1].y - .2 * (t[e + 2].y - t[e].y);
                return n(t, e + 1) && (s = t[e + 1].y), n(t, e) && (o = t[e].y), r(t, e + 1) && (a = t[e + 1].x), 
                r(t, e) && (i = t[e].x), (o >= Math.max(t[e].y, t[e + 1].y) || o <= Math.min(t[e].y, t[e + 1].y)) && (o = t[e].y), 
                (s >= Math.max(t[e].y, t[e + 1].y) || s <= Math.min(t[e].y, t[e + 1].y)) && (s = t[e + 1].y), 
                (i >= Math.max(t[e].x, t[e + 1].x) || i <= Math.min(t[e].x, t[e + 1].x)) && (i = t[e].x), 
                (a >= Math.max(t[e].x, t[e + 1].x) || a <= Math.min(t[e].x, t[e + 1].x)) && (a = t[e + 1].x), 
                {
                    ctrA: {
                        x: i,
                        y: o
                    },
                    ctrB: {
                        x: a,
                        y: s
                    }
                };
            }
            function u(t, e, n) {
                return {
                    x: n.x + t,
                    y: n.y - e
                };
            }
            function f(t, e) {
                if (e) for (;Yt.isCollision(t, e); ) t.start.x > 0 ? t.start.y-- : t.start.x < 0 || t.start.y > 0 ? t.start.y++ : t.start.y--;
                return t;
            }
            function h(t, e, n) {
                var r = 0;
                return t.map(function(t) {
                    if (t.color || (t.color = n.colors[r], r = (r + 1) % n.colors.length), t.index || (t.index = 0), 
                    t.type || (t.type = e.type), void 0 === t.show && (t.show = !0), t.type || (t.type = e.type), 
                    t.pointShape || (t.pointShape = "circle"), !t.legendShape) switch (t.type) {
                      case "line":
                        t.legendShape = "line";
                        break;

                      case "column":
                        t.legendShape = "rect";
                        break;

                      case "area":
                        t.legendShape = "triangle";
                        break;

                      default:
                        t.legendShape = "circle";
                    }
                    return t;
                });
            }
            function d(t, e) {
                var n = 0, r = e - t;
                return n = r >= 1e4 ? 1e3 : r >= 1e3 ? 100 : r >= 100 ? 10 : r >= 10 ? 5 : r >= 1 ? 1 : r >= .1 ? .1 : r >= .01 ? .01 : r >= .001 ? .001 : r >= 1e-4 ? 1e-4 : r >= 1e-5 ? 1e-5 : 1e-6, 
                {
                    minRange: i(t, "lower", n),
                    maxRange: i(e, "upper", n)
                };
            }
            function p(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Xt.fontSize;
                t = (t = String(t)).split("");
                for (var n = 0, r = 0; r < t.length; r++) {
                    var i = t[r];
                    /[a-zA-Z]/.test(i) ? n += 7 : /[0-9]/.test(i) ? n += 5.5 : /\./.test(i) ? n += 2.7 : /-/.test(i) ? n += 3.25 : /[\u4e00-\u9fa5]/.test(i) ? n += 10 : /\(|\)/.test(i) ? n += 3.73 : /\s/.test(i) ? n += 2.5 : /%/.test(i) ? n += 8 : n += 10;
                }
                return n * e / 10;
            }
            function g(t) {
                return t.reduce(function(t, e) {
                    return (t.data ? t.data : t).concat(e.data);
                }, []);
            }
            function y(t, e) {
                for (var n = new Array(e), r = 0; r < n.length; r++) n[r] = 0;
                for (var i = 0; i < t.length; i++) for (r = 0; r < n.length; r++) n[r] += t[i].data[r];
                return t.reduce(function(t, e) {
                    return (t.data ? t.data : t).concat(e.data).concat(n);
                }, []);
            }
            function v(t, e, n) {
                var r, i;
                return t.clientX ? e.rotate ? (i = e.height - t.clientX * e.pixelRatio, r = (t.pageY - n.currentTarget.offsetTop - e.height / e.pixelRatio / 2 * (e.pixelRatio - 1)) * e.pixelRatio) : (r = t.clientX * e.pixelRatio, 
                i = (t.pageY - n.currentTarget.offsetTop - e.height / e.pixelRatio / 2 * (e.pixelRatio - 1)) * e.pixelRatio) : e.rotate ? (i = e.height - t.x * e.pixelRatio, 
                r = t.y * e.pixelRatio) : (r = t.x * e.pixelRatio, i = t.y * e.pixelRatio), {
                    x: r,
                    y: i
                };
            }
            function b(t, e) {
                for (var n = [], r = 0; r < t.length; r++) {
                    var i = t[r];
                    if (null !== i.data[e] && void 0 !== i.data[e] && i.show) {
                        var o = {};
                        o.color = i.color, o.type = i.type, o.style = i.style, o.pointShape = i.pointShape, 
                        o.disableLegend = i.disableLegend, o.name = i.name, o.show = i.show, o.data = i.format ? i.format(i.data[e]) : i.data[e], 
                        n.push(o);
                    }
                }
                return n;
            }
            function m(t) {
                var e = t.map(function(t) {
                    return p(t);
                });
                return Math.max.apply(null, e);
            }
            function x(t) {
                for (var e = 2 * Math.PI / t, n = [], r = 0; r < t; r++) n.push(e * r);
                return n.map(function(t) {
                    return -1 * t + Math.PI / 2;
                });
            }
            function _(t, e, n, r) {
                for (var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}, o = t.map(function(t) {
                    var e = [];
                    return e = r || t.data, {
                        text: i.format ? i.format(t, e[n]) : t.name + ": " + t.data,
                        color: t.color
                    };
                }), a = [], s = {
                    x: 0,
                    y: 0
                }, l = 0; l < e.length; l++) {
                    var c = e[l];
                    void 0 !== c[n] && null !== c[n] && a.push(c[n]);
                }
                for (var u = 0; u < a.length; u++) {
                    var f = a[u];
                    s.x = Math.round(f.x), s.y += f.y;
                }
                return s.y /= a.length, {
                    textList: o,
                    offset: s
                };
            }
            function w(t, e, n, r) {
                var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}, o = t.map(function(t) {
                    return {
                        text: i.format ? i.format(t, r[n]) : t.name + ": " + t.data,
                        color: t.color,
                        disableLegend: !!t.disableLegend
                    };
                });
                o = o.filter(function(t) {
                    if (!0 !== t.disableLegend) return t;
                });
                for (var a = [], s = {
                    x: 0,
                    y: 0
                }, l = 0; l < e.length; l++) {
                    var c = e[l];
                    void 0 !== c[n] && null !== c[n] && a.push(c[n]);
                }
                for (var u = 0; u < a.length; u++) {
                    var f = a[u];
                    s.x = Math.round(f.x), s.y += f.y;
                }
                return s.y /= a.length, {
                    textList: o,
                    offset: s
                };
            }
            function A(t, e, n, r, i, o) {
                var a = o.color.upFill, s = o.color.downFill, l = [ a, a, s, a ], c = [], u = {
                    text: i[r],
                    color: null
                };
                c.push(u), e.map(function(e) {
                    0 == r ? e.data[1] - e.data[0] < 0 ? l[1] = s : l[1] = a : (e.data[0] < t[r - 1][1] && (l[0] = s), 
                    e.data[1] < e.data[0] && (l[1] = s), e.data[2] > t[r - 1][1] && (l[2] = a), e.data[3] < t[r - 1][1] && (l[3] = s));
                    var n = {
                        text: "开盘：" + e.data[0],
                        color: l[0]
                    }, i = {
                        text: "收盘：" + e.data[1],
                        color: l[1]
                    }, o = {
                        text: "最低：" + e.data[2],
                        color: l[2]
                    }, u = {
                        text: "最高：" + e.data[3],
                        color: l[3]
                    };
                    c.push(n, i, o, u);
                });
                for (var f = [], h = {
                    x: 0,
                    y: 0
                }, d = 0; d < n.length; d++) {
                    var p = n[d];
                    void 0 !== p[r] && null !== p[r] && f.push(p[r]);
                }
                return h.x = Math.round(f[0][0].x), {
                    textList: c,
                    offset: h
                };
            }
            function S(t) {
                for (var e = [], n = 0; n < t.length; n++) 1 == t[n].show && e.push(t[n]);
                return e;
            }
            function P(t, e, n, r) {
                var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0, o = -1, a = n.chartData.eachSpacing / 2, s = [];
                if (e.length > 0) {
                    if ("candle" == n.type) for (var l = 0; l < e[0].length; l++) s.push(e[0][l][0].x); else for (var c = 0; c < e[0].length; c++) s.push(e[0][c].x);
                    "line" != n.type && "area" != n.type || "justify" != n.xAxis.boundaryGap || (a = n.chartData.eachSpacing / 2), 
                    n.categories || (a = 0), O(t, n, r) && s.forEach(function(e, n) {
                        t.x + i + a > e && (o = n);
                    });
                }
                return o;
            }
            function T(t, e, n) {
                var r = -1;
                if (k(t, e.area)) {
                    for (var i = e.points, o = -1, a = 0, s = i.length; a < s; a++) for (var l = i[a], c = 0; c < l.length; c++) {
                        o += 1;
                        var u = l[c].area;
                        if (t.x > u[0] && t.x < u[2] && t.y > u[1] && t.y < u[3]) {
                            r = o;
                            break;
                        }
                    }
                    return r;
                }
                return r;
            }
            function k(t, e) {
                return t.x > e.start.x && t.x < e.end.x && t.y > e.start.y && t.y < e.end.y;
            }
            function O(t, e, n) {
                return t.x <= e.width - e.area[1] + 10 && t.x >= e.area[3] - 10 && t.y >= e.area[0] && t.y <= e.height - e.area[2];
            }
            function D(t, e, n) {
                var r = 2 * Math.PI / n, i = -1;
                if (E(t, e.center, e.radius)) {
                    var o = function(t) {
                        return t < 0 && (t += 2 * Math.PI), t > 2 * Math.PI && (t -= 2 * Math.PI), t;
                    }, a = Math.atan2(e.center.y - t.y, t.x - e.center.x);
                    (a *= -1) < 0 && (a += 2 * Math.PI), e.angleList.map(function(t) {
                        return t = o(-1 * t);
                    }).forEach(function(t, e) {
                        var n = o(t - r / 2), s = o(t + r / 2);
                        s < n && (s += 2 * Math.PI), (a >= n && a <= s || a + 2 * Math.PI >= n && a + 2 * Math.PI <= s) && (i = e);
                    });
                }
                return i;
            }
            function C(t, e) {
                for (var n = -1, r = 0, i = e.series.length; r < i; r++) {
                    var o = e.series[r];
                    if (t.x > o.funnelArea[0] && t.x < o.funnelArea[2] && t.y > o.funnelArea[1] && t.y < o.funnelArea[3]) {
                        n = r;
                        break;
                    }
                }
                return n;
            }
            function L(t, e) {
                for (var n = -1, r = 0, i = e.length; r < i; r++) {
                    var o = e[r];
                    if (t.x > o.area[0] && t.x < o.area[2] && t.y > o.area[1] && t.y < o.area[3]) {
                        n = r;
                        break;
                    }
                }
                return n;
            }
            function M(t, e) {
                for (var n = -1, r = e.chartData.mapData, i = e.series, o = It(t.y, t.x, r.bounds, r.scale, r.xoffset, r.yoffset), a = [ o.x, o.y ], s = 0, l = i.length; s < l; s++) if (Nt(a, i[s].geometry.coordinates)) {
                    n = s;
                    break;
                }
                return n;
            }
            function j(t, e) {
                var n = -1;
                if (E(t, e.center, e.radius)) {
                    var r = Math.atan2(e.center.y - t.y, t.x - e.center.x);
                    r = -r;
                    for (var i = 0, o = e.series.length; i < o; i++) {
                        var a = e.series[i];
                        if (s(r, a._start_, a._start_ + 2 * a._proportion_ * Math.PI)) {
                            n = i;
                            break;
                        }
                    }
                }
                return n;
            }
            function E(t, e, n) {
                return Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2) <= Math.pow(n, 2);
            }
            function F(t) {
                var e = [], n = [];
                return t.forEach(function(t, r) {
                    null !== t ? n.push(t) : (n.length && e.push(n), n = []);
                }), n.length && e.push(n), e;
            }
            function I(t, e, n, r) {
                var i = {
                    area: {
                        start: {
                            x: 0,
                            y: 0
                        },
                        end: {
                            x: 0,
                            y: 0
                        },
                        width: 0,
                        height: 0,
                        wholeWidth: 0,
                        wholeHeight: 0
                    },
                    points: [],
                    widthArr: [],
                    heightArr: []
                };
                if (!1 === e.legend.show) return r.legendData = i, i;
                var o = e.legend.padding, a = e.legend.margin, s = e.legend.fontSize, l = 15 * e.pixelRatio, c = 5 * e.pixelRatio, u = Math.max(e.legend.lineHeight * e.pixelRatio, s);
                if ("top" == e.legend.position || "bottom" == e.legend.position) {
                    for (var f = [], h = 0, d = [], g = [], y = 0; y < t.length; y++) {
                        var v = t[y], b = l + c + p(v.name || "undefined", s) + e.legend.itemGap;
                        h + b > e.width - e.padding[1] - e.padding[3] ? (f.push(g), d.push(h - e.legend.itemGap), 
                        h = b, g = [ v ]) : (h += b, g.push(v));
                    }
                    if (g.length) {
                        f.push(g), d.push(h - e.legend.itemGap), i.widthArr = d;
                        var m = Math.max.apply(null, d);
                        switch (e.legend.float) {
                          case "left":
                            i.area.start.x = e.padding[3], i.area.end.x = e.padding[3] + 2 * o;
                            break;

                          case "right":
                            i.area.start.x = e.width - e.padding[1] - m - 2 * o, i.area.end.x = e.width - e.padding[1];
                            break;

                          default:
                            i.area.start.x = (e.width - m) / 2 - o, i.area.end.x = (e.width + m) / 2 + o;
                        }
                        i.area.width = m + 2 * o, i.area.wholeWidth = m + 2 * o, i.area.height = f.length * u + 2 * o, 
                        i.area.wholeHeight = f.length * u + 2 * o + 2 * a, i.points = f;
                    }
                } else {
                    var x = t.length, _ = e.height - e.padding[0] - e.padding[2] - 2 * a - 2 * o, w = Math.min(Math.floor(_ / u), x);
                    switch (i.area.height = w * u + 2 * o, i.area.wholeHeight = w * u + 2 * o, e.legend.float) {
                      case "top":
                        i.area.start.y = e.padding[0] + a, i.area.end.y = e.padding[0] + a + i.area.height;
                        break;

                      case "bottom":
                        i.area.start.y = e.height - e.padding[2] - a - i.area.height, i.area.end.y = e.height - e.padding[2] - a;
                        break;

                      default:
                        i.area.start.y = (e.height - i.area.height) / 2, i.area.end.y = (e.height + i.area.height) / 2;
                    }
                    for (var A = x % w == 0 ? x / w : Math.floor(x / w + 1), S = [], P = 0; P < A; P++) {
                        var T = t.slice(P * w, P * w + w);
                        S.push(T);
                    }
                    if (i.points = S, S.length) {
                        for (var k = 0; k < S.length; k++) {
                            for (var O = S[k], D = 0, C = 0; C < O.length; C++) {
                                var L = l + c + p(O[C].name || "undefined", s) + e.legend.itemGap;
                                L > D && (D = L);
                            }
                            i.widthArr.push(D), i.heightArr.push(O.length * u + 2 * o);
                        }
                        for (var M = 0, j = 0; j < i.widthArr.length; j++) M += i.widthArr[j];
                        i.area.width = M - e.legend.itemGap + 2 * o, i.area.wholeWidth = i.area.width + o;
                    }
                }
                switch (e.legend.position) {
                  case "top":
                    i.area.start.y = e.padding[0] + a, i.area.end.y = e.padding[0] + a + i.area.height;
                    break;

                  case "bottom":
                    i.area.start.y = e.height - e.padding[2] - i.area.height - a, i.area.end.y = e.height - e.padding[2] - a;
                    break;

                  case "left":
                    i.area.start.x = e.padding[3], i.area.end.x = e.padding[3] + i.area.width;
                    break;

                  case "right":
                    i.area.start.x = e.width - e.padding[1] - i.area.width, i.area.end.x = e.width - e.padding[1];
                }
                return r.legendData = i, i;
            }
            function R(t, e, n, r) {
                var i = {
                    angle: 0,
                    xAxisHeight: n.xAxisHeight
                }, o = t.map(function(t) {
                    return p(t, e.xAxis.fontSize || n.fontSize);
                }), a = Math.max.apply(this, o);
                return 1 == e.xAxis.rotateLabel && a + 2 * n.xAxisTextPadding > r && (i.angle = 45 * Math.PI / 180, 
                i.xAxisHeight = 2 * n.xAxisTextPadding + a * Math.sin(i.angle)), i;
            }
            function N(e, n, r) {
                var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : -1, o = g(e), a = [];
                (o = o.filter(function(e) {
                    return "object" === (void 0 === e ? "undefined" : t(e)) && null !== e ? e.constructor.toString().indexOf("Array") > -1 ? null !== e : null !== e.value : null !== e;
                })).map(function(e) {
                    "object" === (void 0 === e ? "undefined" : t(e)) ? e.constructor.toString().indexOf("Array") > -1 ? "candle" == n.type ? e.map(function(t) {
                        a.push(t);
                    }) : a.push(e[0]) : a.push(e.value) : a.push(e);
                });
                var s = 0, l = 0;
                a.length > 0 && (s = Math.min.apply(this, a), l = Math.max.apply(this, a)), i > -1 ? ("number" == typeof n.xAxis.data[i].min && (s = Math.min(n.xAxis.data[i].min, s)), 
                "number" == typeof n.xAxis.data[i].max && (l = Math.max(n.xAxis.data[i].max, l))) : ("number" == typeof n.xAxis.min && (s = Math.min(n.xAxis.min, s)), 
                "number" == typeof n.xAxis.max && (l = Math.max(n.xAxis.max, l))), s === l && (l += l || 10);
                for (var c = s, u = [], f = (l - c) / n.xAxis.splitNumber, h = 0; h <= n.xAxis.splitNumber; h++) u.push(c + f * h);
                return u;
            }
            function $(t, e, n) {
                var r = {
                    angle: 0,
                    xAxisHeight: n.xAxisHeight
                };
                r.ranges = N(t, e, n), r.rangesFormat = r.ranges.map(function(t) {
                    return t = e.xAxis.format ? e.xAxis.format(t) : Yt.toFixed(t, 2);
                });
                var i = r.ranges.map(function(t) {
                    return t = Yt.toFixed(t, 2), t = e.xAxis.format ? e.xAxis.format(Number(t)) : t;
                }), o = (r = Object.assign(r, Q(i, e, n))).eachSpacing, a = i.map(function(t) {
                    return p(t);
                }), s = Math.max.apply(this, a);
                return s + 2 * n.xAxisTextPadding > o && (r.angle = 45 * Math.PI / 180, r.xAxisHeight = 2 * n.xAxisTextPadding + s * Math.sin(r.angle)), 
                !0 === e.xAxis.disabled && (r.xAxisHeight = 0), r;
            }
            function B(t, e, n, r, i) {
                var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1, a = i.extra.radar || {};
                a.max = a.max || 0;
                for (var s = Math.max(a.max, Math.max.apply(null, g(r))), l = [], c = 0; c < r.length; c++) !function(i) {
                    var a = r[i], c = {};
                    c.color = a.color, c.legendShape = a.legendShape, c.pointShape = a.pointShape, c.data = [], 
                    a.data.forEach(function(r, i) {
                        var a = {};
                        a.angle = t[i], a.proportion = r / s, a.position = u(n * a.proportion * o * Math.cos(a.angle), n * a.proportion * o * Math.sin(a.angle), e), 
                        c.data.push(a);
                    }), l.push(c);
                }(c);
                return l;
            }
            function z(t, e) {
                for (var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, r = 0, i = 0, o = 0; o < t.length; o++) {
                    var a = t[o];
                    a.data = null === a.data ? 0 : a.data, r += a.data;
                }
                for (var s = 0; s < t.length; s++) {
                    var l = t[s];
                    l.data = null === l.data ? 0 : l.data, l._proportion_ = 0 === r ? 1 / t.length * n : l.data / r * n, 
                    l._radius_ = e;
                }
                for (var c = 0; c < t.length; c++) {
                    var u = t[c];
                    u._start_ = i, i += 2 * u._proportion_ * Math.PI;
                }
                return t;
            }
            function W(t, e) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                t = t.sort(function(t, e) {
                    return parseInt(e.data) - parseInt(t.data);
                });
                for (var r = 0; r < t.length; r++) t[r].radius = t[r].data / t[0].data * e * n, 
                t[r]._proportion_ = t[r].data / t[0].data;
                return t.reverse();
            }
            function H(t, e, n, r) {
                for (var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, o = 0, a = 0, s = [], l = 0; l < t.length; l++) {
                    var c = t[l];
                    c.data = null === c.data ? 0 : c.data, o += c.data, s.push(c.data);
                }
                for (var u = Math.min.apply(null, s), f = Math.max.apply(null, s), h = r - n, d = 0; d < t.length; d++) {
                    var p = t[d];
                    p.data = null === p.data ? 0 : p.data, 0 === o || "area" == e ? (p._proportion_ = p.data / o * i, 
                    p._rose_proportion_ = 1 / t.length * i) : (p._proportion_ = p.data / o * i, p._rose_proportion_ = p.data / o * i), 
                    p._radius_ = n + h * ((p.data - u) / (f - u));
                }
                for (var g = 0; g < t.length; g++) {
                    var y = t[g];
                    y._start_ = a, a += 2 * y._rose_proportion_ * Math.PI;
                }
                return t;
            }
            function U(t, e) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                1 == n && (n = .999999);
                for (var r = 0; r < t.length; r++) {
                    var i = t[r];
                    i.data = null === i.data ? 0 : i.data;
                    var o = void 0;
                    o = "circle" == e.type ? 2 : e.endAngle < e.startAngle ? 2 + e.endAngle - e.startAngle : e.startAngle - e.endAngle, 
                    i._proportion_ = o * i.data * n + e.startAngle, i._proportion_ >= 2 && (i._proportion_ = i._proportion_ % 2);
                }
                return t;
            }
            function G(t, e, n) {
                for (var r = e - n + 1, i = e, o = 0; o < t.length; o++) t[o].value = null === t[o].value ? 0 : t[o].value, 
                t[o]._startAngle_ = i, t[o]._endAngle_ = r * t[o].value + e, t[o]._endAngle_ >= 2 && (t[o]._endAngle_ = t[o]._endAngle_ % 2), 
                i = t[o]._endAngle_;
                return t;
            }
            function V(t, e, n) {
                for (var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1, i = 0; i < t.length; i++) {
                    var o = t[i];
                    if (o.data = null === o.data ? 0 : o.data, "auto" == n.pointer.color) {
                        for (var a = 0; a < e.length; a++) if (o.data <= e[a].value) {
                            o.color = e[a].color;
                            break;
                        }
                    } else o.color = n.pointer.color;
                    var s = n.startAngle - n.endAngle + 1;
                    o._endAngle_ = s * o.data + n.startAngle, o._oldAngle_ = n.oldAngle, n.oldAngle < n.endAngle && (o._oldAngle_ += 2), 
                    o.data >= n.oldData ? o._proportion_ = (o._endAngle_ - o._oldAngle_) * r + n.oldAngle : o._proportion_ = o._oldAngle_ - (o._oldAngle_ - o._endAngle_) * r, 
                    o._proportion_ >= 2 && (o._proportion_ = o._proportion_ % 2);
                }
                return t;
            }
            function J(t) {
                t = z(t);
                for (var e = 0, n = 0; n < t.length; n++) {
                    var r = t[n], i = r.format ? r.format(+r._proportion_.toFixed(2)) : Yt.toFixed(100 * r._proportion_) + "%";
                    e = Math.max(e, p(i));
                }
                return e;
            }
            function X(t, e, n, r, i, o) {
                return t.map(function(t) {
                    return null === t ? null : (t.width = Math.ceil((e - 2 * i.columePadding) / n), 
                    o.extra.column && o.extra.column.width && +o.extra.column.width > 0 && (t.width = Math.min(t.width, +o.extra.column.width)), 
                    t.width <= 0 && (t.width = 1), t.x += (r + .5 - n / 2) * t.width, t);
                });
            }
            function q(t, e, n, r, i, o, a) {
                return t.map(function(t) {
                    return null === t ? null : (t.width = Math.ceil((e - 2 * i.columePadding) / 2), 
                    o.extra.column && o.extra.column.width && +o.extra.column.width > 0 && (t.width = Math.min(t.width, +o.extra.column.width)), 
                    r > 0 && (t.width -= 2 * a), t);
                });
            }
            function Y(t, e, n, r, i, o, a) {
                return t.map(function(t, n) {
                    return null === t ? null : (t.width = Math.ceil((e - 2 * i.columePadding) / 2), 
                    o.extra.column && o.extra.column.width && +o.extra.column.width > 0 && (t.width = Math.min(t.width, +o.extra.column.width)), 
                    t);
                });
            }
            function Q(t, e, n) {
                var r = e.width - e.area[1] - e.area[3], i = e.enableScroll ? Math.min(e.xAxis.itemCount, t.length) : t.length;
                ("line" == e.type || "area" == e.type) && i > 1 && "justify" == e.xAxis.boundaryGap && (i -= 1);
                var o = r / i, a = [], s = e.area[3], l = e.width - e.area[1];
                return t.forEach(function(t, e) {
                    a.push(s + e * o);
                }), "justify" !== e.xAxis.boundaryGap && (!0 === e.enableScroll ? a.push(s + t.length * o) : a.push(l)), 
                {
                    xAxisPoints: a,
                    startX: s,
                    endX: l,
                    eachSpacing: o
                };
            }
            function K(t, e, n, r, i, o, a) {
                var s = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 1, l = [], c = o.height - o.area[0] - o.area[2];
                return t.forEach(function(t, a) {
                    if (null === t) l.push(null); else {
                        var u = [];
                        t.forEach(function(t, l) {
                            var f = {};
                            f.x = r[a] + Math.round(i / 2);
                            var h = t.value || t, d = c * (h - e) / (n - e);
                            d *= s, f.y = o.height - Math.round(d) - o.area[2], u.push(f);
                        }), l.push(u);
                    }
                }), l;
            }
            function Z(e, n, r, i, o, a, s) {
                var l = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 1, c = "center";
                "line" != a.type && "area" != a.type || (c = a.xAxis.boundaryGap);
                var u = [], f = a.height - a.area[0] - a.area[2], h = a.width - a.area[1] - a.area[3];
                return e.forEach(function(e, s) {
                    if (null === e) u.push(null); else {
                        var d = {};
                        d.color = e.color, d.x = i[s];
                        var p, g, y, v = e;
                        "object" === (void 0 === e ? "undefined" : t(e)) && null !== e && (e.constructor.toString().indexOf("Array") > -1 ? (p = [].concat(a.chartData.xAxisData.ranges), 
                        g = p.shift(), y = p.pop(), v = e[1], d.x = a.area[3] + h * (e[0] - g) / (y - g)) : v = e.value), 
                        "center" == c && (d.x += Math.round(o / 2));
                        var b = f * (v - n) / (r - n);
                        b *= l, d.y = a.height - Math.round(b) - a.area[2], u.push(d);
                    }
                }), u;
            }
            function tt(t, e, n, r, i, o, a, s, l) {
                var c = arguments.length > 9 && void 0 !== arguments[9] ? arguments[9] : 1, u = [], f = o.height - o.area[0] - o.area[2];
                return t.forEach(function(t, a) {
                    if (null === t) u.push(null); else {
                        var h = {};
                        if (h.color = t.color, h.x = r[a] + Math.round(i / 2), s > 0) {
                            for (var d = 0, p = 0; p <= s; p++) d += l[p].data[a];
                            var g = f * (d - e) / (n - e), y = f * (d - t - e) / (n - e);
                        } else d = t, g = f * (d - e) / (n - e), y = 0;
                        var v = y;
                        g *= c, v *= c, h.y = o.height - Math.round(g) - o.area[2], h.y0 = o.height - Math.round(v) - o.area[2], 
                        u.push(h);
                    }
                }), u;
            }
            function et(e, n, r, i) {
                var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : -1, a = [];
                ("stack" == i ? y(e, n.categories.length) : g(e)).filter(function(e) {
                    return "object" === (void 0 === e ? "undefined" : t(e)) && null !== e ? e.constructor.toString().indexOf("Array") > -1 ? null !== e : null !== e.value : null !== e;
                }).map(function(e) {
                    "object" === (void 0 === e ? "undefined" : t(e)) ? e.constructor.toString().indexOf("Array") > -1 ? "candle" == n.type ? e.map(function(t) {
                        a.push(t);
                    }) : a.push(e[1]) : a.push(e.value) : a.push(e);
                });
                var s = 0, l = 0;
                a.length > 0 && (s = Math.min.apply(this, a), l = Math.max.apply(this, a)), o > -1 ? ("number" == typeof n.yAxis.data[o].min && (s = Math.min(n.yAxis.data[o].min, s)), 
                "number" == typeof n.yAxis.data[o].max && (l = Math.max(n.yAxis.data[o].max, l))) : ("number" == typeof n.yAxis.min && (s = Math.min(n.yAxis.min, s)), 
                "number" == typeof n.yAxis.max && (l = Math.max(n.yAxis.max, l))), s === l && (l += l || 10);
                for (var c = d(s, l), u = c.minRange, f = [], h = (c.maxRange - u) / n.yAxis.splitNumber, p = 0; p <= n.yAxis.splitNumber; p++) f.push(u + h * p);
                return f.reverse();
            }
            function nt(t, e, n) {
                var r = qt({}, {
                    type: ""
                }, e.extra.column), i = e.yAxis.data.length, o = new Array(i);
                if (i > 0) {
                    for (var a = 0; a < i; a++) {
                        o[a] = [];
                        for (var s = 0; s < t.length; s++) t[s].index == a && o[a].push(t[s]);
                    }
                    for (var l = new Array(i), c = new Array(i), u = new Array(i), f = 0; f < i; f++) !function(t) {
                        var i = e.yAxis.data[t];
                        1 == e.yAxis.disabled && (i.disabled = !0), l[t] = et(o[t], e, n, r.type, t);
                        var a = i.fontSize || n.fontSize;
                        u[t] = {
                            position: i.position ? i.position : "left",
                            width: 0
                        }, c[t] = l[t].map(function(e) {
                            return e = Yt.toFixed(e, 6), e = i.format ? i.format(Number(e)) : e, u[t].width = Math.max(u[t].width, p(e, a) + 5), 
                            e;
                        });
                        var s = i.calibration ? 4 * e.pixelRatio : 0;
                        u[t].width += s + 3 * e.pixelRatio, !0 === i.disabled && (u[t].width = 0);
                    }(f);
                } else {
                    l = new Array(1), c = new Array(1), u = new Array(1), l[0] = et(t, e, n, r.type), 
                    u[0] = {
                        position: "left",
                        width: 0
                    };
                    var h = e.yAxis.fontSize || n.fontSize;
                    c[0] = l[0].map(function(t) {
                        return t = Yt.toFixed(t, 6), t = e.yAxis.format ? e.yAxis.format(Number(t)) : t, 
                        u[0].width = Math.max(u[0].width, p(t, h) + 5), t;
                    }), u[0].width += 3 * e.pixelRatio, !0 === e.yAxis.disabled ? (u[0] = {
                        position: "left",
                        width: 0
                    }, e.yAxis.data[0] = {
                        disabled: !0
                    }) : e.yAxis.data[0] = {
                        disabled: !1,
                        position: "left",
                        max: e.yAxis.max,
                        min: e.yAxis.min,
                        format: e.yAxis.format
                    };
                }
                return {
                    rangesFormat: c,
                    ranges: l,
                    yAxisWidth: u
                };
            }
            function rt(t, e, n, r, i) {
                for (var o = [].concat(n.chartData.yAxisData.ranges), a = n.height - n.area[0] - n.area[2], s = n.area[0], l = [], c = 0; c < o.length; c++) {
                    var u = o[c].shift(), f = u - (u - o[c].pop()) * (t - s) / a;
                    f = n.yAxis.data[c].format ? n.yAxis.data[c].format(Number(f)) : f.toFixed(0), l.push(String(f));
                }
                return l;
            }
            function it(t, e) {
                for (var n, r, i = e.height - e.area[0] - e.area[2], o = 0; o < t.length; o++) {
                    t[o].yAxisIndex = t[o].yAxisIndex ? t[o].yAxisIndex : 0;
                    var a = [].concat(e.chartData.yAxisData.ranges[t[o].yAxisIndex]);
                    n = a.pop(), r = a.shift();
                    var s = i * (t[o].value - n) / (r - n);
                    t[o].y = e.height - Math.round(s) - e.area[2];
                }
                return t;
            }
            function ot(t, e) {
                !0 !== e.rotateLock ? (t.translate(e.height, 0), t.rotate(90 * Math.PI / 180)) : !0 !== e._rotate_ && (t.translate(e.height, 0), 
                t.rotate(90 * Math.PI / 180), e._rotate_ = !0);
            }
            function at(t, e, n, r, i) {
                r.beginPath(), "hollow" == i.dataPointShapeType ? (r.setStrokeStyle(e), r.setFillStyle(i.background), 
                r.setLineWidth(2 * i.pixelRatio)) : (r.setStrokeStyle("#ffffff"), r.setFillStyle(e), 
                r.setLineWidth(1 * i.pixelRatio)), "diamond" === n ? t.forEach(function(t, e) {
                    null !== t && (r.moveTo(t.x, t.y - 4.5), r.lineTo(t.x - 4.5, t.y), r.lineTo(t.x, t.y + 4.5), 
                    r.lineTo(t.x + 4.5, t.y), r.lineTo(t.x, t.y - 4.5));
                }) : "circle" === n ? t.forEach(function(t, e) {
                    null !== t && (r.moveTo(t.x + 2.5 * i.pixelRatio, t.y), r.arc(t.x, t.y, 3 * i.pixelRatio, 0, 2 * Math.PI, !1));
                }) : "rect" === n ? t.forEach(function(t, e) {
                    null !== t && (r.moveTo(t.x - 3.5, t.y - 3.5), r.rect(t.x - 3.5, t.y - 3.5, 7, 7));
                }) : "triangle" === n && t.forEach(function(t, e) {
                    null !== t && (r.moveTo(t.x, t.y - 4.5), r.lineTo(t.x - 4.5, t.y + 4.5), r.lineTo(t.x + 4.5, t.y + 4.5), 
                    r.lineTo(t.x, t.y - 4.5));
                }), r.closePath(), r.fill(), r.stroke();
            }
            function st(t, e, n, r) {
                var i = t.title.fontSize || e.titleFontSize, o = t.subtitle.fontSize || e.subtitleFontSize, a = t.title.name || "", s = t.subtitle.name || "", l = t.title.color || e.titleColor, c = t.subtitle.color || e.subtitleColor, u = a ? i : 0, f = s ? o : 0;
                if (s) {
                    var h = p(s, o), d = r.x - h / 2 + (t.subtitle.offsetX || 0), g = r.y + o / 2 + (t.subtitle.offsetY || 0);
                    a && (g += (u + 5) / 2), n.beginPath(), n.setFontSize(o), n.setFillStyle(c), n.fillText(s, d, g), 
                    n.closePath(), n.stroke();
                }
                if (a) {
                    var y = p(a, i), v = r.x - y / 2 + (t.title.offsetX || 0), b = r.y + i / 2 + (t.title.offsetY || 0);
                    s && (b -= (f + 5) / 2), n.beginPath(), n.setFontSize(i), n.setFillStyle(l), n.fillText(a, v, b), 
                    n.closePath(), n.stroke();
                }
            }
            function lt(e, n, r, i) {
                var o = n.data;
                e.forEach(function(e, a) {
                    if (null !== e) {
                        i.beginPath(), i.setFontSize(n.textSize || r.fontSize), i.setFillStyle(n.textColor || "#666666");
                        var s = o[a];
                        "object" === t(o[a]) && null !== o[a] && (s = o[a].constructor == Array ? o[a][1] : o[a].value);
                        var l = n.format ? n.format(s) : s;
                        i.fillText(String(l), e.x - p(l, n.textSize || r.fontSize) / 2, e.y - 4), i.closePath(), 
                        i.stroke();
                    }
                });
            }
            function ct(t, e, n, r, i, o) {
                e -= t.width / 2 + i.gaugeLabelTextMargin;
                for (var a = (t.startAngle - t.endAngle + 1) / t.splitLine.splitNumber, s = (t.endNumber - t.startNumber) / t.splitLine.splitNumber, l = t.startAngle, c = t.startNumber, u = 0; u < t.splitLine.splitNumber + 1; u++) {
                    var f = {
                        x: e * Math.cos(l * Math.PI),
                        y: e * Math.sin(l * Math.PI)
                    }, h = t.labelFormat ? t.labelFormat(c) : c;
                    f.x += n.x - p(h) / 2, f.y += n.y;
                    var d = f.x, g = f.y;
                    o.beginPath(), o.setFontSize(i.fontSize), o.setFillStyle(t.labelColor || "#666666"), 
                    o.fillText(h, d, g + i.fontSize / 2), o.closePath(), o.stroke(), (l += a) >= 2 && (l %= 2), 
                    c += s;
                }
            }
            function ut(t, e, n, r, i, o) {
                var a = r.extra.radar || {};
                e += i.radarLabelTextMargin, t.forEach(function(t, s) {
                    var l = {
                        x: e * Math.cos(t),
                        y: e * Math.sin(t)
                    }, c = u(l.x, l.y, n), f = c.x, h = c.y;
                    Yt.approximatelyEqual(l.x, 0) ? f -= p(r.categories[s] || "") / 2 : l.x < 0 && (f -= p(r.categories[s] || "")), 
                    o.beginPath(), o.setFontSize(i.fontSize), o.setFillStyle(a.labelColor || "#666666"), 
                    o.fillText(r.categories[s] || "", f, h + i.fontSize / 2), o.closePath(), o.stroke();
                });
            }
            function ft(t, e, n, r, i, o) {
                for (var a = n.pieChartLinePadding, s = [], l = null, c = t.map(function(t) {
                    var e = t.format ? t.format(+t._proportion_.toFixed(2)) : Yt.toFixed(100 * t._proportion_.toFixed(4)) + "%";
                    return t._rose_proportion_ && (t._proportion_ = t._rose_proportion_), {
                        arc: 2 * Math.PI - (t._start_ + 2 * Math.PI * t._proportion_ / 2),
                        text: e,
                        color: t.color,
                        radius: t._radius_,
                        textColor: t.textColor,
                        textSize: t.textSize
                    };
                }), h = 0; h < c.length; h++) {
                    var d = c[h], g = Math.cos(d.arc) * (d.radius + a), y = Math.sin(d.arc) * (d.radius + a), v = Math.cos(d.arc) * d.radius, b = Math.sin(d.arc) * d.radius, m = g >= 0 ? g + n.pieChartTextPadding : g - n.pieChartTextPadding, x = y, _ = p(d.text, d.textSize || n.fontSize), w = x;
                    l && Yt.isSameXCoordinateArea(l.start, {
                        x: m
                    }) && (w = m > 0 ? Math.min(x, l.start.y) : g < 0 || x > 0 ? Math.max(x, l.start.y) : Math.min(x, l.start.y)), 
                    m < 0 && (m -= _), l = f({
                        lineStart: {
                            x: v,
                            y: b
                        },
                        lineEnd: {
                            x: g,
                            y: y
                        },
                        start: {
                            x: m,
                            y: w
                        },
                        width: _,
                        height: n.fontSize,
                        text: d.text,
                        color: d.color,
                        textColor: d.textColor,
                        textSize: d.textSize
                    }, l), s.push(l);
                }
                for (var A = 0; A < s.length; A++) {
                    var S = s[A], P = u(S.lineStart.x, S.lineStart.y, o), T = u(S.lineEnd.x, S.lineEnd.y, o), k = u(S.start.x, S.start.y, o);
                    r.setLineWidth(1 * e.pixelRatio), r.setFontSize(n.fontSize), r.beginPath(), r.setStrokeStyle(S.color), 
                    r.setFillStyle(S.color), r.moveTo(P.x, P.y);
                    var O = S.start.x < 0 ? k.x + S.width : k.x, D = S.start.x < 0 ? k.x - 5 : k.x + 5;
                    r.quadraticCurveTo(T.x, T.y, O, k.y), r.moveTo(P.x, P.y), r.stroke(), r.closePath(), 
                    r.beginPath(), r.moveTo(k.x + S.width, k.y), r.arc(O, k.y, 2, 0, 2 * Math.PI), r.closePath(), 
                    r.fill(), r.beginPath(), r.setFontSize(S.textSize || n.fontSize), r.setFillStyle(S.textColor || "#666666"), 
                    r.fillText(S.text, D, k.y + 3), r.closePath(), r.stroke(), r.closePath();
                }
            }
            function ht(t, e, n, i) {
                var o = e.extra.tooltip || {};
                o.gridType = void 0 == o.gridType ? "solid" : o.gridType, o.dashLength = void 0 == o.dashLength ? 4 : o.dashLength;
                var a = e.area[0], s = e.height - e.area[2];
                if ("dash" == o.gridType && i.setLineDash([ o.dashLength, o.dashLength ]), i.setStrokeStyle(o.gridColor || "#cccccc"), 
                i.setLineWidth(1 * e.pixelRatio), i.beginPath(), i.moveTo(t, a), i.lineTo(t, s), 
                i.stroke(), i.setLineDash([]), o.xAxisLabel) {
                    var l = e.categories[e.tooltip.index];
                    i.setFontSize(n.fontSize);
                    var c = p(l, n.fontSize), u = t - .5 * c, f = s;
                    i.beginPath(), i.setFillStyle(r(o.labelBgColor || n.toolTipBackground, o.labelBgOpacity || n.toolTipOpacity)), 
                    i.setStrokeStyle(o.labelBgColor || n.toolTipBackground), i.setLineWidth(1 * e.pixelRatio), 
                    i.rect(u - n.toolTipPadding, f, c + 2 * n.toolTipPadding, n.fontSize + 2 * n.toolTipPadding), 
                    i.closePath(), i.stroke(), i.fill(), i.beginPath(), i.setFontSize(n.fontSize), i.setFillStyle(o.labelFontColor || n.fontColor), 
                    i.fillText(String(l), u, f + n.toolTipPadding + n.fontSize), i.closePath(), i.stroke();
                }
            }
            function dt(t, e, n) {
                for (var i = qt({}, {
                    type: "solid",
                    dashLength: 4,
                    data: []
                }, t.extra.markLine), o = t.area[3], a = t.width - t.area[1], s = it(i.data, t), l = 0; l < s.length; l++) {
                    var c = qt({}, {
                        lineColor: "#DE4A42",
                        showLabel: !1,
                        labelFontColor: "#666666",
                        labelBgColor: "#DFE8FF",
                        labelBgOpacity: .8,
                        yAxisIndex: 0
                    }, s[l]);
                    if ("dash" == i.type && n.setLineDash([ i.dashLength, i.dashLength ]), n.setStrokeStyle(c.lineColor), 
                    n.setLineWidth(1 * t.pixelRatio), n.beginPath(), n.moveTo(o, c.y), n.lineTo(a, c.y), 
                    n.stroke(), n.setLineDash([]), c.showLabel) {
                        var u = t.yAxis.format ? t.yAxis.format(Number(c.value)) : c.value;
                        n.setFontSize(e.fontSize);
                        var f = p(u, e.fontSize), h = t.padding[3] + e.yAxisTitleWidth - e.toolTipPadding, d = Math.max(t.area[3], f + 2 * e.toolTipPadding) - h, g = h + (d - f) / 2, y = c.y;
                        n.setFillStyle(r(c.labelBgColor, c.labelBgOpacity)), n.setStrokeStyle(c.labelBgColor), 
                        n.setLineWidth(1 * t.pixelRatio), n.beginPath(), n.rect(h, y - .5 * e.fontSize - e.toolTipPadding, d, e.fontSize + 2 * e.toolTipPadding), 
                        n.closePath(), n.stroke(), n.fill(), n.beginPath(), n.setFontSize(e.fontSize), n.setFillStyle(c.labelFontColor), 
                        n.fillText(String(u), g, y + .5 * e.fontSize), n.stroke();
                    }
                }
            }
            function pt(t, e, n, i, o) {
                var a = qt({}, {
                    gridType: "solid",
                    dashLength: 4
                }, t.extra.tooltip), s = t.area[3], l = t.width - t.area[1];
                if ("dash" == a.gridType && n.setLineDash([ a.dashLength, a.dashLength ]), n.setStrokeStyle(a.gridColor || "#cccccc"), 
                n.setLineWidth(1 * t.pixelRatio), n.beginPath(), n.moveTo(s, t.tooltip.offset.y), 
                n.lineTo(l, t.tooltip.offset.y), n.stroke(), n.setLineDash([]), a.yAxisLabel) for (var c = rt(t.tooltip.offset.y, t.series, t, e, i), u = t.chartData.yAxisData.yAxisWidth, f = t.area[3], h = t.width - t.area[1], d = 0; d < c.length; d++) {
                    n.setFontSize(e.fontSize);
                    var g = p(c[d], e.fontSize), y = void 0, v = void 0, b = void 0;
                    "left" == u[d].position ? (y = f - u[d].width, v = Math.max(y, y + g + 2 * e.toolTipPadding)) : (y = h, 
                    v = Math.max(y + u[d].width, y + g + 2 * e.toolTipPadding));
                    var m = y + ((b = v - y) - g) / 2, x = t.tooltip.offset.y;
                    n.beginPath(), n.setFillStyle(r(a.labelBgColor || e.toolTipBackground, a.labelBgOpacity || e.toolTipOpacity)), 
                    n.setStrokeStyle(a.labelBgColor || e.toolTipBackground), n.setLineWidth(1 * t.pixelRatio), 
                    n.rect(y, x - .5 * e.fontSize - e.toolTipPadding, b, e.fontSize + 2 * e.toolTipPadding), 
                    n.closePath(), n.stroke(), n.fill(), n.beginPath(), n.setFontSize(e.fontSize), n.setFillStyle(a.labelFontColor || e.fontColor), 
                    n.fillText(c[d], m, x + .5 * e.fontSize), n.closePath(), n.stroke(), "left" == u[d].position ? f -= u[d].width + t.yAxis.padding : h += u[d].width + t.yAxis.padding;
                }
            }
            function gt(t, e, n, i, o) {
                var a = qt({}, {
                    activeBgColor: "#000000",
                    activeBgOpacity: .08
                }, e.extra.tooltip), s = e.area[0], l = e.height - e.area[2];
                i.beginPath(), i.setFillStyle(r(a.activeBgColor, a.activeBgOpacity)), i.rect(t - o / 2, s, o, l - s), 
                i.closePath(), i.fill();
            }
            function yt(t, e, n, i, o, a, s) {
                var l = qt({}, {
                    showBox: !0,
                    bgColor: "#000000",
                    bgOpacity: .7,
                    fontColor: "#FFFFFF"
                }, n.extra.tooltip), c = 4 * n.pixelRatio, u = 5 * n.pixelRatio, f = 8 * n.pixelRatio, h = !1;
                "line" != n.type && "area" != n.type && "candle" != n.type && "mix" != n.type || ht(n.tooltip.offset.x, n, i, o), 
                (e = qt({
                    x: 0,
                    y: 0
                }, e)).y -= 8 * n.pixelRatio;
                var d = t.map(function(t) {
                    return p(t.text, i.fontSize);
                }), g = c + u + 4 * i.toolTipPadding + Math.max.apply(null, d), y = 2 * i.toolTipPadding + t.length * i.toolTipLineHeight;
                0 != l.showBox && (e.x - Math.abs(n._scrollDistance_) + f + g > n.width && (h = !0), 
                y + e.y > n.height && (e.y = n.height - y), o.beginPath(), o.setFillStyle(r(l.bgColor || i.toolTipBackground, l.bgOpacity || i.toolTipOpacity)), 
                h ? (o.moveTo(e.x, e.y + 10 * n.pixelRatio), o.lineTo(e.x - f, e.y + 10 * n.pixelRatio - 5 * n.pixelRatio), 
                o.lineTo(e.x - f, e.y), o.lineTo(e.x - f - Math.round(g), e.y), o.lineTo(e.x - f - Math.round(g), e.y + y), 
                o.lineTo(e.x - f, e.y + y), o.lineTo(e.x - f, e.y + 10 * n.pixelRatio + 5 * n.pixelRatio), 
                o.lineTo(e.x, e.y + 10 * n.pixelRatio)) : (o.moveTo(e.x, e.y + 10 * n.pixelRatio), 
                o.lineTo(e.x + f, e.y + 10 * n.pixelRatio - 5 * n.pixelRatio), o.lineTo(e.x + f, e.y), 
                o.lineTo(e.x + f + Math.round(g), e.y), o.lineTo(e.x + f + Math.round(g), e.y + y), 
                o.lineTo(e.x + f, e.y + y), o.lineTo(e.x + f, e.y + 10 * n.pixelRatio + 5 * n.pixelRatio), 
                o.lineTo(e.x, e.y + 10 * n.pixelRatio)), o.closePath(), o.fill(), t.forEach(function(t, n) {
                    if (null !== t.color) {
                        o.beginPath(), o.setFillStyle(t.color);
                        var r = e.x + f + 2 * i.toolTipPadding, a = e.y + (i.toolTipLineHeight - i.fontSize) / 2 + i.toolTipLineHeight * n + i.toolTipPadding + 1;
                        h && (r = e.x - g - f + 2 * i.toolTipPadding), o.fillRect(r, a, c, i.fontSize), 
                        o.closePath();
                    }
                }), t.forEach(function(t, n) {
                    var r = e.x + f + 2 * i.toolTipPadding + c + u;
                    h && (r = e.x - g - f + 2 * i.toolTipPadding + +c + u);
                    var a = e.y + (i.toolTipLineHeight - i.fontSize) / 2 + i.toolTipLineHeight * n + i.toolTipPadding;
                    o.beginPath(), o.setFontSize(i.fontSize), o.setFillStyle(l.fontColor), o.fillText(t.text, r, a + i.fontSize), 
                    o.closePath(), o.stroke();
                }));
            }
            function vt(t, e, n, r) {
                var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, o = e.chartData.xAxisData, a = o.xAxisPoints, s = o.eachSpacing, l = qt({}, {
                    type: "group",
                    width: s / 2,
                    meter: {
                        border: 4,
                        fillColor: "#FFFFFF"
                    }
                }, e.extra.column), c = [];
                r.save();
                var u = -2, f = a.length + 2;
                return e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && (r.translate(e._scrollDistance_, 0), 
                u = Math.floor(-e._scrollDistance_ / s) - 2, f = u + e.xAxis.itemCount + 4), e.tooltip && e.tooltip.textList && e.tooltip.textList.length && 1 === i && gt(e.tooltip.offset.x, e, n, r, s), 
                t.forEach(function(o, h) {
                    var d, p, g;
                    p = (d = [].concat(e.chartData.yAxisData.ranges[o.index])).pop(), g = d.shift();
                    var y = o.data;
                    switch (l.type) {
                      case "group":
                        var v = Z(y, p, g, a, s, e, n, i), b = tt(y, p, g, a, s, e, n, h, t, i);
                        c.push(b), v = X(v, s, t.length, h, n, e);
                        for (var m = 0; m < v.length; m++) {
                            var x = v[m];
                            if (null !== x && m > u && m < f) {
                                r.beginPath(), r.setStrokeStyle(x.color || o.color), r.setLineWidth(1), r.setFillStyle(x.color || o.color);
                                var _ = x.x - x.width / 2, w = e.height - x.y - e.area[2];
                                r.moveTo(_, x.y), r.lineTo(_ + x.width - 2, x.y), r.lineTo(_ + x.width - 2, e.height - e.area[2]), 
                                r.lineTo(_, e.height - e.area[2]), r.lineTo(_, x.y), r.closePath(), r.stroke(), 
                                r.fill();
                            }
                        }
                        break;

                      case "stack":
                        v = tt(y, p, g, a, s, e, n, h, t, i), c.push(v), v = Y(v, s, t.length, h, n, e, t);
                        for (var A = 0; A < v.length; A++) {
                            var S = v[A];
                            if (null !== S && A > u && A < f) {
                                r.beginPath(), r.setFillStyle(S.color || o.color), _ = S.x - S.width / 2 + 1, w = e.height - S.y - e.area[2];
                                var P = e.height - S.y0 - e.area[2];
                                h > 0 && (w -= P), r.moveTo(_, S.y), r.fillRect(_, S.y, S.width - 2, w), r.closePath(), 
                                r.fill();
                            }
                        }
                        break;

                      case "meter":
                        if (v = Z(y, p, g, a, s, e, n, i), c.push(v), v = q(v, s, t.length, h, n, e, l.meter.border), 
                        0 == h) for (var T = 0; T < v.length; T++) {
                            var k = v[T];
                            null !== k && T > u && T < f && (r.beginPath(), r.setFillStyle(l.meter.fillColor), 
                            _ = k.x - k.width / 2, w = e.height - k.y - e.area[2], r.moveTo(_, k.y), r.fillRect(_, k.y, k.width, w), 
                            r.closePath(), r.fill(), l.meter.border > 0 && (r.beginPath(), r.setStrokeStyle(o.color), 
                            r.setLineWidth(l.meter.border * e.pixelRatio), r.moveTo(_ + .5 * l.meter.border, k.y + w), 
                            r.lineTo(_ + .5 * l.meter.border, k.y + .5 * l.meter.border), r.lineTo(_ + k.width - .5 * l.meter.border, k.y + .5 * l.meter.border), 
                            r.lineTo(_ + k.width - .5 * l.meter.border, k.y + w), r.stroke()));
                        } else for (var O = 0; O < v.length; O++) {
                            var D = v[O];
                            null !== D && O > u && O < f && (r.beginPath(), r.setFillStyle(D.color || o.color), 
                            _ = D.x - D.width / 2, w = e.height - D.y - e.area[2], r.moveTo(_, D.y), r.fillRect(_, D.y, D.width, w), 
                            r.closePath(), r.fill());
                        }
                    }
                }), !1 !== e.dataLabel && 1 === i && t.forEach(function(o, c) {
                    var u, f, h;
                    f = (u = [].concat(e.chartData.yAxisData.ranges[o.index])).pop(), h = u.shift();
                    var d = o.data;
                    switch (l.type) {
                      case "group":
                        var p = Z(d, f, h, a, s, e, n, i);
                        lt(p = X(p, s, t.length, c, n, e), o, n, r);
                        break;

                      case "stack":
                        lt(p = tt(d, f, h, a, s, e, n, c, t, i), o, n, r);
                        break;

                      case "meter":
                        lt(p = Z(d, f, h, a, s, e, n, i), o, n, r);
                    }
                }), r.restore(), {
                    xAxisPoints: a,
                    calPoints: c,
                    eachSpacing: s
                };
            }
            function bt(t, e, n, r, i) {
                var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1, a = qt({}, {
                    color: {},
                    average: {}
                }, n.extra.candle);
                a.color = qt({}, {
                    upLine: "#f04864",
                    upFill: "#f04864",
                    downLine: "#2fc25b",
                    downFill: "#2fc25b"
                }, a.color), a.average = qt({}, {
                    show: !1,
                    name: [],
                    day: [],
                    color: r.colors
                }, a.average), n.extra.candle = a;
                var s = n.chartData.xAxisData, l = s.xAxisPoints, u = s.eachSpacing, f = [];
                i.save();
                var h = -2, d = l.length + 2, p = 0, g = n.width + u;
                return n._scrollDistance_ && 0 !== n._scrollDistance_ && !0 === n.enableScroll && (i.translate(n._scrollDistance_, 0), 
                h = Math.floor(-n._scrollDistance_ / u) - 2, d = h + n.xAxis.itemCount + 4, p = -n._scrollDistance_ - u + n.area[3], 
                g = p + (n.xAxis.itemCount + 4) * u), a.average.show && e.forEach(function(t, e) {
                    var a, s, f;
                    s = (a = [].concat(n.chartData.yAxisData.ranges[t.index])).pop(), f = a.shift();
                    for (var h = F(Z(t.data, s, f, l, u, n, r, o)), d = 0; d < h.length; d++) {
                        var y = h[d];
                        if (i.beginPath(), i.setStrokeStyle(t.color), i.setLineWidth(1), 1 === y.length) i.moveTo(y[0].x, y[0].y), 
                        i.arc(y[0].x, y[0].y, 1, 0, 2 * Math.PI); else {
                            i.moveTo(y[0].x, y[0].y);
                            for (var v = 0, b = 0; b < y.length; b++) {
                                var m = y[b];
                                if (0 == v && m.x > p && (i.moveTo(m.x, m.y), v = 1), b > 0 && m.x > p && m.x < g) {
                                    var x = c(y, b - 1);
                                    i.bezierCurveTo(x.ctrA.x, x.ctrA.y, x.ctrB.x, x.ctrB.y, m.x, m.y);
                                }
                            }
                            i.moveTo(y[0].x, y[0].y);
                        }
                        i.closePath(), i.stroke();
                    }
                }), t.forEach(function(t, e) {
                    var s, c, p;
                    c = (s = [].concat(n.chartData.yAxisData.ranges[t.index])).pop(), p = s.shift();
                    var g = t.data, y = K(g, c, p, l, u, n, r, o);
                    f.push(y);
                    for (var v = F(y), b = 0; b < v[0].length; b++) if (b > h && b < d) {
                        var m = v[0][b];
                        i.beginPath(), g[b][1] - g[b][0] > 0 ? (i.setStrokeStyle(a.color.upLine), i.setFillStyle(a.color.upFill), 
                        i.setLineWidth(1 * n.pixelRatio), i.moveTo(m[3].x, m[3].y), i.lineTo(m[1].x, m[1].y), 
                        i.lineTo(m[1].x - u / 4, m[1].y), i.lineTo(m[0].x - u / 4, m[0].y), i.lineTo(m[0].x, m[0].y), 
                        i.lineTo(m[2].x, m[2].y), i.lineTo(m[0].x, m[0].y), i.lineTo(m[0].x + u / 4, m[0].y), 
                        i.lineTo(m[1].x + u / 4, m[1].y), i.lineTo(m[1].x, m[1].y), i.moveTo(m[3].x, m[3].y)) : (i.setStrokeStyle(a.color.downLine), 
                        i.setFillStyle(a.color.downFill), i.setLineWidth(1 * n.pixelRatio), i.moveTo(m[3].x, m[3].y), 
                        i.lineTo(m[0].x, m[0].y), i.lineTo(m[0].x - u / 4, m[0].y), i.lineTo(m[1].x - u / 4, m[1].y), 
                        i.lineTo(m[1].x, m[1].y), i.lineTo(m[2].x, m[2].y), i.lineTo(m[1].x, m[1].y), i.lineTo(m[1].x + u / 4, m[1].y), 
                        i.lineTo(m[0].x + u / 4, m[0].y), i.lineTo(m[0].x, m[0].y), i.moveTo(m[3].x, m[3].y)), 
                        i.closePath(), i.fill(), i.stroke();
                    }
                }), i.restore(), {
                    xAxisPoints: l,
                    calPoints: f,
                    eachSpacing: u
                };
            }
            function mt(t, e, n, i) {
                var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, a = qt({}, {
                    type: "straight",
                    opacity: .2,
                    addLine: !1,
                    width: 2,
                    gradient: !1
                }, e.extra.area), s = e.chartData.xAxisData, l = s.xAxisPoints, u = s.eachSpacing, f = e.height - e.area[2], h = [];
                i.save();
                var d = 0, p = e.width + u;
                return e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && (i.translate(e._scrollDistance_, 0), 
                d = -e._scrollDistance_ - u + e.area[3], p = d + (e.xAxis.itemCount + 4) * u), t.forEach(function(t, s) {
                    var g, y, v;
                    y = (g = [].concat(e.chartData.yAxisData.ranges[t.index])).pop(), v = g.shift();
                    var b = Z(t.data, y, v, l, u, e, n, o);
                    h.push(b);
                    for (var m = F(b), x = 0; x < m.length; x++) {
                        var _ = m[x];
                        if (i.beginPath(), i.setStrokeStyle(r(t.color, a.opacity)), a.gradient) {
                            var w = i.createLinearGradient(0, e.area[0], 0, e.height - e.area[2]);
                            w.addColorStop("0", r(t.color, a.opacity)), w.addColorStop("1.0", r("#FFFFFF", .1)), 
                            i.setFillStyle(w);
                        } else i.setFillStyle(r(t.color, a.opacity));
                        if (i.setLineWidth(a.width * e.pixelRatio), _.length > 1) {
                            var A = _[0], S = _[_.length - 1];
                            i.moveTo(A.x, A.y);
                            var P = 0;
                            if ("curve" === a.type) for (var T = 0; T < _.length; T++) {
                                var k = _[T];
                                if (0 == P && k.x > d && (i.moveTo(k.x, k.y), P = 1), T > 0 && k.x > d && k.x < p) {
                                    var O = c(_, T - 1);
                                    i.bezierCurveTo(O.ctrA.x, O.ctrA.y, O.ctrB.x, O.ctrB.y, k.x, k.y);
                                }
                            } else for (var D = 0; D < _.length; D++) {
                                var C = _[D];
                                0 == P && C.x > d && (i.moveTo(C.x, C.y), P = 1), D > 0 && C.x > d && C.x < p && i.lineTo(C.x, C.y);
                            }
                            i.lineTo(S.x, f), i.lineTo(A.x, f), i.lineTo(A.x, A.y);
                        } else {
                            var L = _[0];
                            i.moveTo(L.x - u / 2, L.y), i.lineTo(L.x + u / 2, L.y), i.lineTo(L.x + u / 2, f), 
                            i.lineTo(L.x - u / 2, f), i.moveTo(L.x - u / 2, L.y);
                        }
                        if (i.closePath(), i.fill(), a.addLine) {
                            if ("dash" == t.lineType) {
                                var M = t.dashLength ? t.dashLength : 8;
                                M *= e.pixelRatio, i.setLineDash([ M, M ]);
                            }
                            if (i.beginPath(), i.setStrokeStyle(t.color), i.setLineWidth(a.width * e.pixelRatio), 
                            1 === _.length) i.moveTo(_[0].x, _[0].y), i.arc(_[0].x, _[0].y, 1, 0, 2 * Math.PI); else {
                                i.moveTo(_[0].x, _[0].y);
                                var j = 0;
                                if ("curve" === a.type) for (var E = 0; E < _.length; E++) {
                                    var I = _[E];
                                    if (0 == j && I.x > d && (i.moveTo(I.x, I.y), j = 1), E > 0 && I.x > d && I.x < p) {
                                        var R = c(_, E - 1);
                                        i.bezierCurveTo(R.ctrA.x, R.ctrA.y, R.ctrB.x, R.ctrB.y, I.x, I.y);
                                    }
                                } else for (var N = 0; N < _.length; N++) {
                                    var $ = _[N];
                                    0 == j && $.x > d && (i.moveTo($.x, $.y), j = 1), N > 0 && $.x > d && $.x < p && i.lineTo($.x, $.y);
                                }
                                i.moveTo(_[0].x, _[0].y);
                            }
                            i.stroke(), i.setLineDash([]);
                        }
                    }
                    !1 !== e.dataPointShape && at(b, t.color, t.pointShape, i, e);
                }), !1 !== e.dataLabel && 1 === o && t.forEach(function(t, r) {
                    var a, s, c;
                    s = (a = [].concat(e.chartData.yAxisData.ranges[t.index])).pop(), c = a.shift(), 
                    lt(Z(t.data, s, c, l, u, e, n, o), t, n, i);
                }), i.restore(), {
                    xAxisPoints: l,
                    calPoints: h,
                    eachSpacing: u
                };
            }
            function xt(t, e, n, r) {
                var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, o = qt({}, {
                    type: "straight",
                    width: 2
                }, e.extra.line);
                o.width *= e.pixelRatio;
                var a = e.chartData.xAxisData, s = a.xAxisPoints, l = a.eachSpacing, u = [];
                r.save();
                var f = 0, h = e.width + l;
                return e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && (r.translate(e._scrollDistance_, 0), 
                f = -e._scrollDistance_ - l + e.area[3], h = f + (e.xAxis.itemCount + 4) * l), t.forEach(function(t, a) {
                    var d, p, g;
                    p = (d = [].concat(e.chartData.yAxisData.ranges[t.index])).pop(), g = d.shift();
                    var y = Z(t.data, p, g, s, l, e, n, i);
                    u.push(y);
                    var v = F(y);
                    if ("dash" == t.lineType) {
                        var b = t.dashLength ? t.dashLength : 8;
                        b *= e.pixelRatio, r.setLineDash([ b, b ]);
                    }
                    r.beginPath(), r.setStrokeStyle(t.color), r.setLineWidth(o.width), v.forEach(function(t, e) {
                        if (1 === t.length) r.moveTo(t[0].x, t[0].y), r.arc(t[0].x, t[0].y, 1, 0, 2 * Math.PI); else {
                            r.moveTo(t[0].x, t[0].y);
                            var n = 0;
                            if ("curve" === o.type) for (var i = 0; i < t.length; i++) {
                                var a = t[i];
                                if (0 == n && a.x > f && (r.moveTo(a.x, a.y), n = 1), i > 0 && a.x > f && a.x < h) {
                                    var s = c(t, i - 1);
                                    r.bezierCurveTo(s.ctrA.x, s.ctrA.y, s.ctrB.x, s.ctrB.y, a.x, a.y);
                                }
                            } else for (var l = 0; l < t.length; l++) {
                                var u = t[l];
                                0 == n && u.x > f && (r.moveTo(u.x, u.y), n = 1), l > 0 && u.x > f && u.x < h && r.lineTo(u.x, u.y);
                            }
                            r.moveTo(t[0].x, t[0].y);
                        }
                    }), r.stroke(), r.setLineDash([]), !1 !== e.dataPointShape && at(y, t.color, t.pointShape, r, e);
                }), !1 !== e.dataLabel && 1 === i && t.forEach(function(t, o) {
                    var a, c, u;
                    c = (a = [].concat(e.chartData.yAxisData.ranges[t.index])).pop(), u = a.shift(), 
                    lt(Z(t.data, c, u, s, l, e, n, i), t, n, r);
                }), r.restore(), {
                    xAxisPoints: s,
                    calPoints: u,
                    eachSpacing: l
                };
            }
            function _t(t, e, n, i) {
                var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, a = e.chartData.xAxisData, s = a.xAxisPoints, l = a.eachSpacing, u = e.height - e.area[2], f = [], h = 0, d = 0;
                t.forEach(function(t, e) {
                    "column" == t.type && (d += 1);
                }), i.save();
                var p = -2, g = s.length + 2, y = 0, v = e.width + l;
                return e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && (i.translate(e._scrollDistance_, 0), 
                p = Math.floor(-e._scrollDistance_ / l) - 2, g = p + e.xAxis.itemCount + 4, y = -e._scrollDistance_ - l + e.area[3], 
                v = y + (e.xAxis.itemCount + 4) * l), t.forEach(function(t, a) {
                    var b, m, x;
                    m = (b = [].concat(e.chartData.yAxisData.ranges[t.index])).pop(), x = b.shift();
                    var _ = Z(t.data, m, x, s, l, e, n, o);
                    if (f.push(_), "column" == t.type) {
                        _ = X(_, l, d, h, n, e);
                        for (var w = 0; w < _.length; w++) {
                            var A = _[w];
                            if (null !== A && w > p && w < g) {
                                i.beginPath(), i.setStrokeStyle(A.color || t.color), i.setLineWidth(1), i.setFillStyle(A.color || t.color);
                                var S = A.x - A.width / 2;
                                e.height, A.y, e.area[2], i.moveTo(S, A.y), i.moveTo(S, A.y), i.lineTo(S + A.width - 2, A.y), 
                                i.lineTo(S + A.width - 2, e.height - e.area[2]), i.lineTo(S, e.height - e.area[2]), 
                                i.lineTo(S, A.y), i.closePath(), i.stroke(), i.fill(), i.closePath(), i.fill();
                            }
                        }
                        h += 1;
                    }
                    if ("area" == t.type) for (var P = F(_), T = 0; T < P.length; T++) {
                        var k = P[T];
                        if (i.beginPath(), i.setStrokeStyle(t.color), i.setFillStyle(r(t.color, .2)), i.setLineWidth(2 * e.pixelRatio), 
                        k.length > 1) {
                            var O = k[0], D = k[k.length - 1];
                            i.moveTo(O.x, O.y);
                            var C = 0;
                            if ("curve" === t.style) for (var L = 0; L < k.length; L++) {
                                var M = k[L];
                                if (0 == C && M.x > y && (i.moveTo(M.x, M.y), C = 1), L > 0 && M.x > y && M.x < v) {
                                    var j = c(k, L - 1);
                                    i.bezierCurveTo(j.ctrA.x, j.ctrA.y, j.ctrB.x, j.ctrB.y, M.x, M.y);
                                }
                            } else for (var E = 0; E < k.length; E++) {
                                var I = k[E];
                                0 == C && I.x > y && (i.moveTo(I.x, I.y), C = 1), E > 0 && I.x > y && I.x < v && i.lineTo(I.x, I.y);
                            }
                            i.lineTo(D.x, u), i.lineTo(O.x, u), i.lineTo(O.x, O.y);
                        } else {
                            var R = k[0];
                            i.moveTo(R.x - l / 2, R.y), i.lineTo(R.x + l / 2, R.y), i.lineTo(R.x + l / 2, u), 
                            i.lineTo(R.x - l / 2, u), i.moveTo(R.x - l / 2, R.y);
                        }
                        i.closePath(), i.fill();
                    }
                    "line" == t.type && F(_).forEach(function(n, r) {
                        if ("dash" == t.lineType) {
                            var o = t.dashLength ? t.dashLength : 8;
                            o *= e.pixelRatio, i.setLineDash([ o, o ]);
                        }
                        if (i.beginPath(), i.setStrokeStyle(t.color), i.setLineWidth(2 * e.pixelRatio), 
                        1 === n.length) i.moveTo(n[0].x, n[0].y), i.arc(n[0].x, n[0].y, 1, 0, 2 * Math.PI); else {
                            i.moveTo(n[0].x, n[0].y);
                            var a = 0;
                            if ("curve" == t.style) for (var s = 0; s < n.length; s++) {
                                var l = n[s];
                                if (0 == a && l.x > y && (i.moveTo(l.x, l.y), a = 1), s > 0 && l.x > y && l.x < v) {
                                    var u = c(n, s - 1);
                                    i.bezierCurveTo(u.ctrA.x, u.ctrA.y, u.ctrB.x, u.ctrB.y, l.x, l.y);
                                }
                            } else for (var f = 0; f < n.length; f++) {
                                var h = n[f];
                                0 == a && h.x > y && (i.moveTo(h.x, h.y), a = 1), f > 0 && h.x > y && h.x < v && i.lineTo(h.x, h.y);
                            }
                            i.moveTo(n[0].x, n[0].y);
                        }
                        i.stroke(), i.setLineDash([]);
                    }), "point" == t.type && (t.addPoint = !0), 1 == t.addPoint && "column" !== t.type && at(_, t.color, t.pointShape, i, e);
                }), !1 !== e.dataLabel && 1 === o && (h = 0, t.forEach(function(t, r) {
                    var a, c, u;
                    c = (a = [].concat(e.chartData.yAxisData.ranges[t.index])).pop(), u = a.shift();
                    var f = Z(t.data, c, u, s, l, e, n, o);
                    "column" !== t.type ? lt(f, t, n, i) : (f = X(f, l, d, h, n, e), lt(f, t, n, i), 
                    h += 1);
                })), i.restore(), {
                    xAxisPoints: s,
                    calPoints: f,
                    eachSpacing: l
                };
            }
            function wt(t, e, n, r, i, o) {
                (t.extra.tooltip || {}).horizentalLine && t.tooltip && 1 === r && ("line" == t.type || "area" == t.type || "column" == t.type || "candle" == t.type || "mix" == t.type) && pt(t, e, n, i, o), 
                n.save(), t._scrollDistance_ && 0 !== t._scrollDistance_ && !0 === t.enableScroll && n.translate(t._scrollDistance_, 0), 
                t.tooltip && t.tooltip.textList && t.tooltip.textList.length && 1 === r && yt(t.tooltip.textList, t.tooltip.offset, t, e, n, i, o), 
                n.restore();
            }
            function At(t, e, n, r) {
                var i = e.chartData.xAxisData, o = i.xAxisPoints, a = i.startX, s = i.endX, c = i.eachSpacing, u = "center";
                "line" != e.type && "area" != e.type || (u = e.xAxis.boundaryGap);
                var f = e.height - e.area[2], h = e.area[0];
                if (e.enableScroll && e.xAxis.scrollShow) {
                    var d = e.height - e.area[2] + n.xAxisHeight, g = s - a, y = c * (o.length - 1), v = g * g / y, b = 0;
                    e._scrollDistance_ && (b = -e._scrollDistance_ * g / y), r.beginPath(), r.setLineCap("round"), 
                    r.setLineWidth(6 * e.pixelRatio), r.setStrokeStyle(e.xAxis.scrollBackgroundColor || "#EFEBEF"), 
                    r.moveTo(a, d), r.lineTo(s, d), r.stroke(), r.closePath(), r.beginPath(), r.setLineCap("round"), 
                    r.setLineWidth(6 * e.pixelRatio), r.setStrokeStyle(e.xAxis.scrollColor || "#A6A6A6"), 
                    r.moveTo(a + b, d), r.lineTo(a + b + v, d), r.stroke(), r.closePath(), r.setLineCap("butt");
                }
                if (r.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && r.translate(e._scrollDistance_, 0), 
                !0 === e.xAxis.calibration && (r.setStrokeStyle(e.xAxis.gridColor || "#cccccc"), 
                r.setLineCap("butt"), r.setLineWidth(1 * e.pixelRatio), o.forEach(function(t, n) {
                    n > 0 && (r.beginPath(), r.moveTo(t - c / 2, f), r.lineTo(t - c / 2, f + 3 * e.pixelRatio), 
                    r.closePath(), r.stroke());
                })), !0 !== e.xAxis.disableGrid && (r.setStrokeStyle(e.xAxis.gridColor || "#cccccc"), 
                r.setLineCap("butt"), r.setLineWidth(1 * e.pixelRatio), "dash" == e.xAxis.gridType && r.setLineDash([ e.xAxis.dashLength, e.xAxis.dashLength ]), 
                e.xAxis.gridEval = e.xAxis.gridEval || 1, o.forEach(function(t, n) {
                    n % e.xAxis.gridEval == 0 && (r.beginPath(), r.moveTo(t, f), r.lineTo(t, h), r.stroke());
                }), r.setLineDash([])), !0 !== e.xAxis.disabled) {
                    var m = t.length;
                    e.xAxis.labelCount && (m = e.xAxis.itemCount ? Math.ceil(t.length / e.xAxis.itemCount * e.xAxis.labelCount) : e.xAxis.labelCount, 
                    m -= 1);
                    for (var x = Math.ceil(t.length / m), _ = [], w = t.length, A = 0; A < w; A++) A % x != 0 ? _.push("") : _.push(t[A]);
                    _[w - 1] = t[w - 1];
                    var S = e.xAxis.fontSize || n.fontSize;
                    0 === n._xAxisTextAngle_ ? _.forEach(function(t, i) {
                        var a = -p(String(t), S) / 2;
                        "center" == u && (a += c / 2);
                        var s = 0;
                        e.xAxis.scrollShow && (s = 6 * e.pixelRatio), r.beginPath(), r.setFontSize(S), r.setFillStyle(e.xAxis.fontColor || "#666666"), 
                        r.fillText(String(t), o[i] + a, f + S + (n.xAxisHeight - s - S) / 2), r.closePath(), 
                        r.stroke();
                    }) : _.forEach(function(t, i) {
                        r.save(), r.beginPath(), r.setFontSize(S), r.setFillStyle(e.xAxis.fontColor || "#666666");
                        var a = -p(String(t), S);
                        "center" == u && (a += c / 2);
                        var s = l(o[i] + c / 2, f + S / 2 + 5, e.height), h = s.transX, d = s.transY;
                        r.rotate(-1 * n._xAxisTextAngle_), r.translate(h, d), r.fillText(String(t), o[i] + a, f + S + 5), 
                        r.closePath(), r.stroke(), r.restore();
                    });
                }
                r.restore(), e.xAxis.axisLine && (r.beginPath(), r.setStrokeStyle(e.xAxis.axisLineColor), 
                r.setLineWidth(1 * e.pixelRatio), r.moveTo(a, e.height - e.area[2]), r.lineTo(s, e.height - e.area[2]), 
                r.stroke());
            }
            function St(t, e, n, r) {
                if (!0 !== e.yAxis.disableGrid) {
                    for (var i = (e.height - e.area[0] - e.area[2]) / e.yAxis.splitNumber, o = e.area[3], a = e.chartData.xAxisData.xAxisPoints, s = e.chartData.xAxisData.eachSpacing * (a.length - 1), l = o + s, c = [], u = 0; u < e.yAxis.splitNumber + 1; u++) c.push(e.height - e.area[2] - i * u);
                    r.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && r.translate(e._scrollDistance_, 0), 
                    "dash" == e.yAxis.gridType && r.setLineDash([ e.yAxis.dashLength, e.yAxis.dashLength ]), 
                    r.setStrokeStyle(e.yAxis.gridColor), r.setLineWidth(1 * e.pixelRatio), c.forEach(function(t, e) {
                        r.beginPath(), r.moveTo(o, t), r.lineTo(l, t), r.stroke();
                    }), r.setLineDash([]), r.restore();
                }
            }
            function Pt(t, e, n, r) {
                if (!0 !== e.yAxis.disabled) {
                    var i = (e.height - e.area[0] - e.area[2]) / e.yAxis.splitNumber, o = e.area[3], a = e.width - e.area[1], s = e.height - e.area[2], l = s + n.xAxisHeight;
                    e.xAxis.scrollShow && (l -= 3 * e.pixelRatio), e.xAxis.rotateLabel && (l = e.height - e.area[2] + 3), 
                    r.beginPath(), r.setFillStyle(e.background || "#ffffff"), e._scrollDistance_ < 0 && r.fillRect(0, 0, o, l), 
                    1 == e.enableScroll && r.fillRect(a, 0, e.width, l), r.closePath(), r.stroke();
                    for (var c = [], u = 0; u <= e.yAxis.splitNumber; u++) c.push(e.area[0] + i * u);
                    for (var f = e.area[3], h = e.width - e.area[1], d = 0; d < e.yAxis.data.length; d++) !function(t) {
                        var i = e.yAxis.data[t];
                        if (!0 !== i.disabled) {
                            var o = e.chartData.yAxisData.rangesFormat[t], a = i.fontSize || n.fontSize, l = e.chartData.yAxisData.yAxisWidth[t];
                            if (o.forEach(function(t, n) {
                                var o = c[n] ? c[n] : s;
                                r.beginPath(), r.setFontSize(a), r.setLineWidth(1 * e.pixelRatio), r.setStrokeStyle(i.axisLineColor || "#cccccc"), 
                                r.setFillStyle(i.fontColor || "#666666"), "left" == l.position ? (r.fillText(String(t), f - l.width, o + a / 2), 
                                1 == i.calibration && (r.moveTo(f, o), r.lineTo(f - 3 * e.pixelRatio, o))) : (r.fillText(String(t), h + 4 * e.pixelRatio, o + a / 2), 
                                1 == i.calibration && (r.moveTo(h, o), r.lineTo(h + 3 * e.pixelRatio, o))), r.closePath(), 
                                r.stroke();
                            }), !1 !== i.axisLine && (r.beginPath(), r.setStrokeStyle(i.axisLineColor || "#cccccc"), 
                            r.setLineWidth(1 * e.pixelRatio), "left" == l.position ? (r.moveTo(f, e.height - e.area[2]), 
                            r.lineTo(f, e.area[0])) : (r.moveTo(h, e.height - e.area[2]), r.lineTo(h, e.area[0])), 
                            r.stroke()), e.yAxis.showTitle) {
                                var u = i.titleFontSize || n.fontSize, d = i.title;
                                r.beginPath(), r.setFontSize(u), r.setFillStyle(i.titleFontColor || "#666666"), 
                                "left" == l.position ? r.fillText(d, f - p(d, u) / 2, e.area[0] - 10 * e.pixelRatio) : r.fillText(d, h - p(d, u) / 2, e.area[0] - 10 * e.pixelRatio), 
                                r.closePath(), r.stroke();
                            }
                            "left" == l.position ? f -= l.width + e.yAxis.padding : h += l.width + e.yAxis.padding;
                        }
                    }(d);
                }
            }
            function Tt(t, e, n, r, i) {
                if (!1 !== e.legend.show) {
                    var o = i.legendData, a = o.points, s = o.area, l = e.legend.padding, c = e.legend.fontSize, u = 15 * e.pixelRatio, f = 5 * e.pixelRatio, h = e.legend.itemGap, d = Math.max(e.legend.lineHeight * e.pixelRatio, c);
                    r.beginPath(), r.setLineWidth(e.legend.borderWidth), r.setStrokeStyle(e.legend.borderColor), 
                    r.setFillStyle(e.legend.backgroundColor), r.moveTo(s.start.x, s.start.y), r.rect(s.start.x, s.start.y, s.width, s.height), 
                    r.closePath(), r.fill(), r.stroke(), a.forEach(function(t, i) {
                        var a = 0, g = 0;
                        a = o.widthArr[i], g = o.heightArr[i];
                        var y = 0, v = 0;
                        "top" == e.legend.position || "bottom" == e.legend.position ? (y = s.start.x + (s.width - a) / 2, 
                        v = s.start.y + l + i * d) : (a = 0 == i ? 0 : o.widthArr[i - 1], y = s.start.x + l + a, 
                        v = s.start.y + l + (s.height - g) / 2), r.setFontSize(n.fontSize);
                        for (var b = 0; b < t.length; b++) {
                            var m = t[b];
                            switch (m.area = [ 0, 0, 0, 0 ], m.area[0] = y, m.area[1] = v, m.area[3] = v + d, 
                            r.beginPath(), r.setLineWidth(1 * e.pixelRatio), r.setStrokeStyle(m.show ? m.color : e.legend.hiddenColor), 
                            r.setFillStyle(m.show ? m.color : e.legend.hiddenColor), m.legendShape) {
                              case "line":
                                r.moveTo(y, v + .5 * d - 2 * e.pixelRatio), r.fillRect(y, v + .5 * d - 2 * e.pixelRatio, 15 * e.pixelRatio, 4 * e.pixelRatio);
                                break;

                              case "triangle":
                                r.moveTo(y + 7.5 * e.pixelRatio, v + .5 * d - 5 * e.pixelRatio), r.lineTo(y + 2.5 * e.pixelRatio, v + .5 * d + 5 * e.pixelRatio), 
                                r.lineTo(y + 12.5 * e.pixelRatio, v + .5 * d + 5 * e.pixelRatio), r.lineTo(y + 7.5 * e.pixelRatio, v + .5 * d - 5 * e.pixelRatio);
                                break;

                              case "diamond":
                                r.moveTo(y + 7.5 * e.pixelRatio, v + .5 * d - 5 * e.pixelRatio), r.lineTo(y + 2.5 * e.pixelRatio, v + .5 * d), 
                                r.lineTo(y + 7.5 * e.pixelRatio, v + .5 * d + 5 * e.pixelRatio), r.lineTo(y + 12.5 * e.pixelRatio, v + .5 * d), 
                                r.lineTo(y + 7.5 * e.pixelRatio, v + .5 * d - 5 * e.pixelRatio);
                                break;

                              case "circle":
                                r.moveTo(y + 7.5 * e.pixelRatio, v + .5 * d), r.arc(y + 7.5 * e.pixelRatio, v + .5 * d, 5 * e.pixelRatio, 0, 2 * Math.PI);
                                break;

                              case "rect":
                                r.moveTo(y, v + .5 * d - 5 * e.pixelRatio), r.fillRect(y, v + .5 * d - 5 * e.pixelRatio, 15 * e.pixelRatio, 10 * e.pixelRatio);
                                break;

                              default:
                                r.moveTo(y, v + .5 * d - 5 * e.pixelRatio), r.fillRect(y, v + .5 * d - 5 * e.pixelRatio, 15 * e.pixelRatio, 10 * e.pixelRatio);
                            }
                            r.closePath(), r.fill(), r.stroke(), y += u + f;
                            var x = .5 * d + .5 * c - 2;
                            r.beginPath(), r.setFontSize(c), r.setFillStyle(m.show ? e.legend.fontColor : e.legend.hiddenColor), 
                            r.fillText(m.name, y, v + x), r.closePath(), r.stroke(), "top" == e.legend.position || "bottom" == e.legend.position ? (y += p(m.name, c) + h, 
                            m.area[2] = y) : (m.area[2] = y + p(m.name, c) + h, y -= u + f, v += d);
                        }
                    });
                }
            }
            function kt(t, e, n, i) {
                var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, a = qt({}, {
                    activeOpacity: .5,
                    activeRadius: 10 * e.pixelRatio,
                    offsetAngle: 0,
                    labelWidth: 15 * e.pixelRatio,
                    ringWidth: 0,
                    border: !1,
                    borderWidth: 2,
                    borderColor: "#FFFFFF"
                }, e.extra.pie), s = {
                    x: e.area[3] + (e.width - e.area[1] - e.area[3]) / 2,
                    y: e.area[0] + (e.height - e.area[0] - e.area[2]) / 2
                };
                0 == n.pieChartLinePadding && (n.pieChartLinePadding = a.activeRadius);
                var l = Math.min((e.width - e.area[1] - e.area[3]) / 2 - n.pieChartLinePadding - n.pieChartTextPadding - n._pieTextMaxLength_, (e.height - e.area[0] - e.area[2]) / 2 - n.pieChartLinePadding - n.pieChartTextPadding);
                t = z(t, l, o);
                var c = a.activeRadius;
                if ((t = t.map(function(t) {
                    return t._start_ += a.offsetAngle * Math.PI / 180, t;
                })).forEach(function(t, n) {
                    e.tooltip && e.tooltip.index == n && (i.beginPath(), i.setFillStyle(r(t.color, e.extra.pie.activeOpacity || .5)), 
                    i.moveTo(s.x, s.y), i.arc(s.x, s.y, t._radius_ + c, t._start_, t._start_ + 2 * t._proportion_ * Math.PI), 
                    i.closePath(), i.fill()), i.beginPath(), i.setLineWidth(a.borderWidth * e.pixelRatio), 
                    i.lineJoin = "round", i.setStrokeStyle(a.borderColor), i.setFillStyle(t.color), 
                    i.moveTo(s.x, s.y), i.arc(s.x, s.y, t._radius_, t._start_, t._start_ + 2 * t._proportion_ * Math.PI), 
                    i.closePath(), i.fill(), 1 == a.border && i.stroke();
                }), "ring" === e.type) {
                    var u = .6 * l;
                    "number" == typeof e.extra.pie.ringWidth && e.extra.pie.ringWidth > 0 && (u = Math.max(0, l - e.extra.pie.ringWidth)), 
                    i.beginPath(), i.setFillStyle(e.background || "#ffffff"), i.moveTo(s.x, s.y), i.arc(s.x, s.y, u, 0, 2 * Math.PI), 
                    i.closePath(), i.fill();
                }
                if (!1 !== e.dataLabel && 1 === o) {
                    for (var f = !1, h = 0, d = t.length; h < d; h++) if (t[h].data > 0) {
                        f = !0;
                        break;
                    }
                    f && ft(t, e, n, i, l, s);
                }
                return 1 === o && "ring" === e.type && st(e, n, i, s), {
                    center: s,
                    radius: l,
                    series: t
                };
            }
            function Ot(t, e, n, i) {
                var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, a = qt({}, {
                    type: "area",
                    activeOpacity: .5,
                    activeRadius: 10 * e.pixelRatio,
                    offsetAngle: 0,
                    labelWidth: 15 * e.pixelRatio,
                    border: !1,
                    borderWidth: 2,
                    borderColor: "#FFFFFF"
                }, e.extra.rose);
                0 == n.pieChartLinePadding && (n.pieChartLinePadding = a.activeRadius);
                var s = {
                    x: e.area[3] + (e.width - e.area[1] - e.area[3]) / 2,
                    y: e.area[0] + (e.height - e.area[0] - e.area[2]) / 2
                }, l = Math.min((e.width - e.area[1] - e.area[3]) / 2 - n.pieChartLinePadding - n.pieChartTextPadding - n._pieTextMaxLength_, (e.height - e.area[0] - e.area[2]) / 2 - n.pieChartLinePadding - n.pieChartTextPadding), c = a.minRadius || .5 * l;
                t = H(t, a.type, c, l, o);
                var u = a.activeRadius;
                if ((t = t.map(function(t) {
                    return t._start_ += (a.offsetAngle || 0) * Math.PI / 180, t;
                })).forEach(function(t, n) {
                    e.tooltip && e.tooltip.index == n && (i.beginPath(), i.setFillStyle(r(t.color, a.activeOpacity || .5)), 
                    i.moveTo(s.x, s.y), i.arc(s.x, s.y, u + t._radius_, t._start_, t._start_ + 2 * t._rose_proportion_ * Math.PI), 
                    i.closePath(), i.fill()), i.beginPath(), i.setLineWidth(a.borderWidth * e.pixelRatio), 
                    i.lineJoin = "round", i.setStrokeStyle(a.borderColor), i.setFillStyle(t.color), 
                    i.moveTo(s.x, s.y), i.arc(s.x, s.y, t._radius_, t._start_, t._start_ + 2 * t._rose_proportion_ * Math.PI), 
                    i.closePath(), i.fill(), 1 == a.border && i.stroke();
                }), !1 !== e.dataLabel && 1 === o) {
                    for (var f = !1, h = 0, d = t.length; h < d; h++) if (t[h].data > 0) {
                        f = !0;
                        break;
                    }
                    f && ft(t, e, n, i, l, s);
                }
                return {
                    center: s,
                    radius: l,
                    series: t
                };
            }
            function Dt(t, e, n, r) {
                var i, o, a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, s = qt({}, {
                    startAngle: .75,
                    endAngle: .25,
                    type: "default",
                    width: 12 * e.pixelRatio,
                    gap: 2 * e.pixelRatio
                }, e.extra.arcbar);
                t = U(t, s, a), i = s.center ? s.center : {
                    x: e.width / 2,
                    y: e.height / 2
                }, s.radius ? o = s.radius : (o = Math.min(i.x, i.y), o -= 5 * e.pixelRatio, o -= s.width / 2);
                for (var l = 0; l < t.length; l++) {
                    var c = t[l];
                    r.setLineWidth(s.width), r.setStrokeStyle(s.backgroundColor || "#E9E9E9"), r.setLineCap("round"), 
                    r.beginPath(), "default" == s.type ? r.arc(i.x, i.y, o - (s.width + s.gap) * l, s.startAngle * Math.PI, s.endAngle * Math.PI, !1) : r.arc(i.x, i.y, o - (s.width + s.gap) * l, 0, 2 * Math.PI, !1), 
                    r.stroke(), r.setLineWidth(s.width), r.setStrokeStyle(c.color), r.setLineCap("round"), 
                    r.beginPath(), r.arc(i.x, i.y, o - (s.width + s.gap) * l, s.startAngle * Math.PI, c._proportion_ * Math.PI, !1), 
                    r.stroke();
                }
                return st(e, n, r, i), {
                    center: i,
                    radius: o,
                    series: t
                };
            }
            function Ct(t, e, n, i, o) {
                var a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1, s = qt({}, {
                    type: "default",
                    startAngle: .75,
                    endAngle: .25,
                    width: 15,
                    splitLine: {
                        fixRadius: 0,
                        splitNumber: 10,
                        width: 15,
                        color: "#FFFFFF",
                        childNumber: 5,
                        childWidth: 5
                    },
                    pointer: {
                        width: 15,
                        color: "auto"
                    }
                }, n.extra.gauge);
                void 0 == s.oldAngle && (s.oldAngle = s.startAngle), void 0 == s.oldData && (s.oldData = 0), 
                t = G(t, s.startAngle, s.endAngle);
                var l = {
                    x: n.width / 2,
                    y: n.height / 2
                }, c = Math.min(l.x, l.y);
                c -= 5 * n.pixelRatio;
                var u = (c -= s.width / 2) - s.width, f = 0;
                if ("progress" == s.type) {
                    var h = c - 3 * s.width;
                    o.beginPath();
                    var d = o.createLinearGradient(l.x, l.y - h, l.x, l.y + h);
                    d.addColorStop("0", r(e[0].color, .3)), d.addColorStop("1.0", r("#FFFFFF", .1)), 
                    o.setFillStyle(d), o.arc(l.x, l.y, h, 0, 2 * Math.PI, !1), o.fill(), o.setLineWidth(s.width), 
                    o.setStrokeStyle(r(e[0].color, .3)), o.setLineCap("round"), o.beginPath(), o.arc(l.x, l.y, u, s.startAngle * Math.PI, s.endAngle * Math.PI, !1), 
                    o.stroke(), f = s.startAngle - s.endAngle + 1, s.splitLine.splitNumber;
                    var p = f / s.splitLine.splitNumber / s.splitLine.childNumber, g = -c - .5 * s.width - s.splitLine.fixRadius, y = -c - s.width - s.splitLine.fixRadius + s.splitLine.width;
                    o.save(), o.translate(l.x, l.y), o.rotate((s.startAngle - 1) * Math.PI);
                    for (var v = s.splitLine.splitNumber * s.splitLine.childNumber + 1, b = e[0].data * a, m = 0; m < v; m++) o.beginPath(), 
                    b > m / v ? o.setStrokeStyle(r(e[0].color, 1)) : o.setStrokeStyle(r(e[0].color, .3)), 
                    o.setLineWidth(3 * n.pixelRatio), o.moveTo(g, 0), o.lineTo(y, 0), o.stroke(), o.rotate(p * Math.PI);
                    o.restore(), e = U(e, s, a), o.setLineWidth(s.width), o.setStrokeStyle(e[0].color), 
                    o.setLineCap("round"), o.beginPath(), o.arc(l.x, l.y, u, s.startAngle * Math.PI, e[0]._proportion_ * Math.PI, !1), 
                    o.stroke();
                    var x = c - 2.5 * s.width;
                    o.save(), o.translate(l.x, l.y), o.rotate((e[0]._proportion_ - 1) * Math.PI), o.beginPath(), 
                    o.setLineWidth(s.width / 3);
                    var _ = o.createLinearGradient(0, .6 * -x, 0, .6 * x);
                    _.addColorStop("0", r("#FFFFFF", 0)), _.addColorStop("0.5", r(e[0].color, 1)), _.addColorStop("1.0", r("#FFFFFF", 0)), 
                    o.setStrokeStyle(_), o.arc(0, 0, x, .85 * Math.PI, 1.15 * Math.PI, !1), o.stroke(), 
                    o.beginPath(), o.setLineWidth(1), o.setStrokeStyle(e[0].color), o.setFillStyle(e[0].color), 
                    o.moveTo(-x - s.width / 3 / 2, -4), o.lineTo(-x - s.width / 3 / 2 - 4, 0), o.lineTo(-x - s.width / 3 / 2, 4), 
                    o.lineTo(-x - s.width / 3 / 2, -4), o.stroke(), o.fill(), o.restore();
                } else {
                    o.setLineWidth(s.width), o.setLineCap("butt");
                    for (var w = 0; w < t.length; w++) {
                        var A = t[w];
                        o.beginPath(), o.setStrokeStyle(A.color), o.arc(l.x, l.y, c, A._startAngle_ * Math.PI, A._endAngle_ * Math.PI, !1), 
                        o.stroke();
                    }
                    o.save();
                    var S = (f = s.startAngle - s.endAngle + 1) / s.splitLine.splitNumber, P = f / s.splitLine.splitNumber / s.splitLine.childNumber, T = -c - .5 * s.width - s.splitLine.fixRadius, k = -c - .5 * s.width - s.splitLine.fixRadius + s.splitLine.width, O = -c - .5 * s.width - s.splitLine.fixRadius + s.splitLine.childWidth;
                    o.translate(l.x, l.y), o.rotate((s.startAngle - 1) * Math.PI);
                    for (var D = 0; D < s.splitLine.splitNumber + 1; D++) o.beginPath(), o.setStrokeStyle(s.splitLine.color), 
                    o.setLineWidth(2 * n.pixelRatio), o.moveTo(T, 0), o.lineTo(k, 0), o.stroke(), o.rotate(S * Math.PI);
                    o.restore(), o.save(), o.translate(l.x, l.y), o.rotate((s.startAngle - 1) * Math.PI);
                    for (var C = 0; C < s.splitLine.splitNumber * s.splitLine.childNumber + 1; C++) o.beginPath(), 
                    o.setStrokeStyle(s.splitLine.color), o.setLineWidth(1 * n.pixelRatio), o.moveTo(T, 0), 
                    o.lineTo(O, 0), o.stroke(), o.rotate(P * Math.PI);
                    o.restore(), e = V(e, t, s, a);
                    for (var L = 0; L < e.length; L++) {
                        var M = e[L];
                        o.save(), o.translate(l.x, l.y), o.rotate((M._proportion_ - 1) * Math.PI), o.beginPath(), 
                        o.setFillStyle(M.color), o.moveTo(s.pointer.width, 0), o.lineTo(0, -s.pointer.width / 2), 
                        o.lineTo(-u, 0), o.lineTo(0, s.pointer.width / 2), o.lineTo(s.pointer.width, 0), 
                        o.closePath(), o.fill(), o.beginPath(), o.setFillStyle("#FFFFFF"), o.arc(0, 0, s.pointer.width / 6, 0, 2 * Math.PI, !1), 
                        o.fill(), o.restore();
                    }
                    !1 !== n.dataLabel && ct(s, c, l, n, i, o);
                }
                return st(n, i, o, l), 1 === a && "gauge" === n.type && (n.extra.gauge.oldAngle = e[0]._proportion_, 
                n.extra.gauge.oldData = e[0].data), {
                    center: l,
                    radius: c,
                    innerRadius: u,
                    categories: t,
                    totalAngle: f
                };
            }
            function Lt(t, e, n, i) {
                var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, a = qt({}, {
                    gridColor: "#cccccc",
                    labelColor: "#666666",
                    opacity: .2,
                    gridCount: 3
                }, e.extra.radar), s = x(e.categories.length), l = {
                    x: e.area[3] + (e.width - e.area[1] - e.area[3]) / 2,
                    y: e.area[0] + (e.height - e.area[0] - e.area[2]) / 2
                }, c = Math.min(l.x - (m(e.categories) + n.radarLabelTextMargin), l.y - n.radarLabelTextMargin);
                c -= e.padding[1], i.beginPath(), i.setLineWidth(1 * e.pixelRatio), i.setStrokeStyle(a.gridColor), 
                s.forEach(function(t) {
                    var e = u(c * Math.cos(t), c * Math.sin(t), l);
                    i.moveTo(l.x, l.y), i.lineTo(e.x, e.y);
                }), i.stroke(), i.closePath();
                for (var f = 1; f <= a.gridCount; f++) !function(t) {
                    var n = {};
                    i.beginPath(), i.setLineWidth(1 * e.pixelRatio), i.setStrokeStyle(a.gridColor), 
                    s.forEach(function(e, r) {
                        var o = u(c / a.gridCount * t * Math.cos(e), c / a.gridCount * t * Math.sin(e), l);
                        0 === r ? (n = o, i.moveTo(o.x, o.y)) : i.lineTo(o.x, o.y);
                    }), i.lineTo(n.x, n.y), i.stroke(), i.closePath();
                }(f);
                return B(s, l, c, t, e, o).forEach(function(t, n) {
                    i.beginPath(), i.setFillStyle(r(t.color, a.opacity)), t.data.forEach(function(t, e) {
                        0 === e ? i.moveTo(t.position.x, t.position.y) : i.lineTo(t.position.x, t.position.y);
                    }), i.closePath(), i.fill(), !1 !== e.dataPointShape && at(t.data.map(function(t) {
                        return t.position;
                    }), t.color, t.pointShape, i, e);
                }), ut(s, c, l, e, n, i), {
                    center: l,
                    radius: c,
                    angleList: s
                };
            }
            function Mt(t, e, n) {
                n = 0 == n ? 1 : n;
                for (var r = [], i = 0; i < n; i++) r[i] = Math.random();
                return Math.floor(r.reduce(function(t, e) {
                    return t + e;
                }) / n * (e - t)) + t;
            }
            function jt(t, e, n, r) {
                for (var i = !1, o = 0; o < e.length; o++) if (e[o].area) {
                    if (!(t[3] < e[o].area[1] || t[0] > e[o].area[2] || t[1] > e[o].area[3] || t[2] < e[o].area[0])) {
                        i = !0;
                        break;
                    }
                    if (t[0] < 0 || t[1] < 0 || t[2] > n || t[3] > r) {
                        i = !0;
                        break;
                    }
                    i = !1;
                }
                return i;
            }
            function Et(t) {
                var e, n = {};
                n.xMin = 180, n.xMax = 0, n.yMin = 90, n.yMax = 0;
                for (var r = 0; r < t.length; r++) for (var i = t[r].geometry.coordinates, o = 0; o < i.length; o++) {
                    1 == (e = i[o]).length && (e = e[0]);
                    for (var a = 0; a < e.length; a++) {
                        var s = {
                            x: e[a][0],
                            y: e[a][1]
                        };
                        n.xMin = n.xMin < s.x ? n.xMin : s.x, n.xMax = n.xMax > s.x ? n.xMax : s.x, n.yMin = n.yMin < s.y ? n.yMin : s.y, 
                        n.yMax = n.yMax > s.y ? n.yMax : s.y;
                    }
                }
                return n;
            }
            function Ft(t, e, n, r, i, o) {
                return {
                    x: (e - n.xMin) * r + i,
                    y: (n.yMax - t) * r + o
                };
            }
            function It(t, e, n, r, i, o) {
                return {
                    x: (e - i) / r + n.xMin,
                    y: n.yMax - (t - o) / r
                };
            }
            function Rt(t, e, n) {
                return e[1] != n[1] && (!(e[1] > t[1] && n[1] > t[1]) && (!(e[1] < t[1] && n[1] < t[1]) && (!(e[1] == t[1] && n[1] > t[1]) && (!(n[1] == t[1] && e[1] > t[1]) && (!(e[0] < t[0] && n[1] < t[1]) && !(n[0] - (n[0] - e[0]) * (n[1] - t[1]) / (n[1] - e[1]) < t[0]))))));
            }
            function Nt(t, e) {
                for (var n = 0, r = 0; r < e.length; r++) {
                    var i = e[r][0];
                    1 == e.length && (i = e[r][0]);
                    for (var o = 0; o < i.length - 1; o++) Rt(t, i[o], i[o + 1]) && (n += 1);
                }
                return n % 2 == 1;
            }
            function $t(t, e, n, i) {
                var o, a, s = qt({}, {
                    border: !0,
                    borderWidth: 1,
                    borderColor: "#666666",
                    fillOpacity: .6,
                    activeBorderColor: "#f04864",
                    activeFillColor: "#facc14",
                    activeFillOpacity: 1
                }, e.extra.map), l = t, c = Et(l), u = e.width / Math.abs(c.xMax - c.xMin), f = e.height / Math.abs(c.yMax - c.yMin), h = u < f ? u : f, d = e.width / 2 - Math.abs(c.xMax - c.xMin) / 2 * h, g = e.height / 2 - Math.abs(c.yMax - c.yMin) / 2 * h;
                i.beginPath(), i.clearRect(0, 0, e.width, e.height), i.setFillStyle(e.background || "#FFFFFF"), 
                i.rect(0, 0, e.width, e.height), i.fill();
                for (var y = 0; y < l.length; y++) {
                    i.beginPath(), i.setLineWidth(s.borderWidth * e.pixelRatio), i.setStrokeStyle(s.borderColor), 
                    i.setFillStyle(r(t[y].color, s.fillOpacity)), e.tooltip && e.tooltip.index == y && (i.setStrokeStyle(s.activeBorderColor), 
                    i.setFillStyle(r(s.activeFillColor, s.activeFillOpacity)));
                    for (var v = l[y].geometry.coordinates, b = 0; b < v.length; b++) {
                        1 == (o = v[b]).length && (o = o[0]);
                        for (var m = 0; m < o.length; m++) a = Ft(o[m][1], o[m][0], c, h, d, g), 0 === m ? (i.beginPath(), 
                        i.moveTo(a.x, a.y)) : i.lineTo(a.x, a.y);
                        i.fill(), 1 == s.border && i.stroke();
                    }
                    if (1 == e.dataLabel) {
                        var x = l[y].properties.centroid;
                        if (x) {
                            a = Ft(x[1], x[0], c, h, d, g);
                            var _ = l[y].textSize || n.fontSize, w = l[y].properties.name;
                            i.beginPath(), i.setFontSize(_), i.setFillStyle(l[y].textColor || "#666666"), i.fillText(w, a.x - p(w, _) / 2, a.y + _ / 2), 
                            i.closePath(), i.stroke();
                        }
                    }
                }
                e.chartData.mapData = {
                    bounds: c,
                    scale: h,
                    xoffset: d,
                    yoffset: g
                }, wt(e, n, i, 1), i.draw();
            }
            function Bt(t, e) {
                var n = t.series.sort(function(t, e) {
                    return parseInt(e.textSize) - parseInt(t.textSize);
                });
                switch (e) {
                  case "normal":
                    for (var r = 0; r < n.length; r++) {
                        for (var i = n[r].name, o = n[r].textSize, a = p(i, o), s = void 0, l = void 0, c = void 0, u = 0; ;) {
                            if (u++, s = Mt(-t.width / 2, t.width / 2, 5) - a / 2, l = Mt(-t.height / 2, t.height / 2, 5) + o / 2, 
                            !jt(c = [ s - 5 + t.width / 2, l - 5 - o + t.height / 2, s + a + 5 + t.width / 2, l + 5 + t.height / 2 ], n, t.width, t.height)) break;
                            if (1e3 == u) {
                                c = [ -100, -100, -100, -100 ];
                                break;
                            }
                        }
                        n[r].area = c;
                    }
                    break;

                  case "vertical":
                    for (var f = 0; f < n.length; f++) {
                        for (var h = n[f].name, d = n[f].textSize, g = p(h, d), y = Math.random() > .7, v = void 0, b = void 0, m = void 0, x = void 0, _ = 0; ;) {
                            _++;
                            var w = void 0;
                            if (y ? (v = Mt(-t.width / 2, t.width / 2, 5) - g / 2, b = Mt(-t.height / 2, t.height / 2, 5) + d / 2, 
                            m = [ b - 5 - g + t.width / 2, -v - 5 + t.height / 2, b + 5 + t.width / 2, -v + d + 5 + t.height / 2 ], 
                            x = [ t.width - (t.width / 2 - t.height / 2) - (-v + d + 5 + t.height / 2) - 5, t.height / 2 - t.width / 2 + (b - 5 - g + t.width / 2) - 5, t.width - (t.width / 2 - t.height / 2) - (-v + d + 5 + t.height / 2) + d, t.height / 2 - t.width / 2 + (b - 5 - g + t.width / 2) + g + 5 ], 
                            w = jt(x, n, t.height, t.width)) : (v = Mt(-t.width / 2, t.width / 2, 5) - g / 2, 
                            b = Mt(-t.height / 2, t.height / 2, 5) + d / 2, m = [ v - 5 + t.width / 2, b - 5 - d + t.height / 2, v + g + 5 + t.width / 2, b + 5 + t.height / 2 ], 
                            w = jt(m, n, t.width, t.height)), !w) break;
                            if (1e3 == _) {
                                m = [ -1e3, -1e3, -1e3, -1e3 ];
                                break;
                            }
                        }
                        y ? (n[f].area = x, n[f].areav = m) : n[f].area = m, n[f].rotate = y;
                    }
                }
                return n;
            }
            function zt(t, e, n, r) {
                var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1;
                qt({}, {
                    type: "normal",
                    autoColors: !0
                }, e.extra.word), r.beginPath(), r.setFillStyle(e.background || "#FFFFFF"), r.rect(0, 0, e.width, e.height), 
                r.fill(), r.save();
                var o = e.chartData.wordCloudData;
                r.translate(e.width / 2, e.height / 2);
                for (var a = 0; a < o.length; a++) {
                    r.save(), o[a].rotate && r.rotate(90 * Math.PI / 180);
                    var s = o[a].name, l = o[a].textSize, c = p(s, l);
                    r.beginPath(), r.setStrokeStyle(o[a].color), r.setFillStyle(o[a].color), r.setFontSize(l), 
                    o[a].rotate ? o[a].areav[0] > 0 && (e.tooltip && e.tooltip.index == a ? r.strokeText(s, (o[a].areav[0] + 5 - e.width / 2) * i - c * (1 - i) / 2, (o[a].areav[1] + 5 + l - e.height / 2) * i) : r.fillText(s, (o[a].areav[0] + 5 - e.width / 2) * i - c * (1 - i) / 2, (o[a].areav[1] + 5 + l - e.height / 2) * i)) : o[a].area[0] > 0 && (e.tooltip && e.tooltip.index == a ? r.strokeText(s, (o[a].area[0] + 5 - e.width / 2) * i - c * (1 - i) / 2, (o[a].area[1] + 5 + l - e.height / 2) * i) : r.fillText(s, (o[a].area[0] + 5 - e.width / 2) * i - c * (1 - i) / 2, (o[a].area[1] + 5 + l - e.height / 2) * i)), 
                    r.stroke(), r.restore();
                }
                r.restore();
            }
            function Wt(t, e, n, i) {
                var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, a = qt({}, {
                    activeWidth: 10,
                    activeOpacity: .3,
                    border: !1,
                    borderWidth: 2,
                    borderColor: "#FFFFFF",
                    fillOpacity: 1,
                    labelAlign: "right"
                }, e.extra.funnel), s = (e.height - e.area[0] - e.area[2]) / t.length, l = {
                    x: e.area[3] + (e.width - e.area[1] - e.area[3]) / 2,
                    y: e.height - e.area[2]
                }, c = a.activeWidth, u = Math.min((e.width - e.area[1] - e.area[3]) / 2 - c, (e.height - e.area[0] - e.area[2]) / 2 - c);
                t = W(t, u, o), i.save(), i.translate(l.x, l.y);
                for (var f = 0; f < t.length; f++) 0 == f ? (e.tooltip && e.tooltip.index == f && (i.beginPath(), 
                i.setFillStyle(r(t[f].color, a.activeOpacity)), i.moveTo(-c, 0), i.lineTo(-t[f].radius - c, -s), 
                i.lineTo(t[f].radius + c, -s), i.lineTo(c, 0), i.lineTo(-c, 0), i.closePath(), i.fill()), 
                t[f].funnelArea = [ l.x - t[f].radius, l.y - s, l.x + t[f].radius, l.y ], i.beginPath(), 
                i.setLineWidth(a.borderWidth * e.pixelRatio), i.setStrokeStyle(a.borderColor), i.setFillStyle(r(t[f].color, a.fillOpacity)), 
                i.moveTo(0, 0), i.lineTo(-t[f].radius, -s), i.lineTo(t[f].radius, -s), i.lineTo(0, 0), 
                i.closePath(), i.fill(), 1 == a.border && i.stroke()) : (e.tooltip && e.tooltip.index == f && (i.beginPath(), 
                i.setFillStyle(r(t[f].color, a.activeOpacity)), i.moveTo(0, 0), i.lineTo(-t[f - 1].radius - c, 0), 
                i.lineTo(-t[f].radius - c, -s), i.lineTo(t[f].radius + c, -s), i.lineTo(t[f - 1].radius + c, 0), 
                i.lineTo(0, 0), i.closePath(), i.fill()), t[f].funnelArea = [ l.x - t[f].radius, l.y - s * (f + 1), l.x + t[f].radius, l.y - s * f ], 
                i.beginPath(), i.setLineWidth(a.borderWidth * e.pixelRatio), i.setStrokeStyle(a.borderColor), 
                i.setFillStyle(r(t[f].color, a.fillOpacity)), i.moveTo(0, 0), i.lineTo(-t[f - 1].radius, 0), 
                i.lineTo(-t[f].radius, -s), i.lineTo(t[f].radius, -s), i.lineTo(t[f - 1].radius, 0), 
                i.lineTo(0, 0), i.closePath(), i.fill(), 1 == a.border && i.stroke()), i.translate(0, -s);
                return i.restore(), !1 !== e.dataLabel && 1 === o && Ht(t, e, i, s, a.labelAlign, c, l), 
                {
                    center: l,
                    radius: u,
                    series: t
                };
            }
            function Ht(t, e, n, r, i, o, a) {
                for (var s = 0; s < t.length; s++) {
                    var l = t[s], c = void 0, u = void 0, f = void 0, h = void 0, d = l.format ? l.format(+l._proportion_.toFixed(2)) : Yt.toFixed(100 * l._proportion_) + "%";
                    "right" == i ? (c = 0 == s ? (l.funnelArea[2] + a.x) / 2 : (l.funnelArea[2] + t[s - 1].funnelArea[2]) / 2, 
                    u = c + 2 * o, f = l.funnelArea[1] + r / 2, h = l.textSize || e.fontSize, n.setLineWidth(1 * e.pixelRatio), 
                    n.setStrokeStyle(l.color), n.setFillStyle(l.color), n.beginPath(), n.moveTo(c, f), 
                    n.lineTo(u, f), n.stroke(), n.closePath(), n.beginPath(), n.moveTo(u, f), n.arc(u, f, 2, 0, 2 * Math.PI), 
                    n.closePath(), n.fill(), n.beginPath(), n.setFontSize(h), n.setFillStyle(l.textColor || "#666666"), 
                    n.fillText(d, u + 5, f + h / 2 - 2), n.closePath(), n.stroke(), n.closePath()) : (c = 0 == s ? (l.funnelArea[0] + a.x) / 2 : (l.funnelArea[0] + t[s - 1].funnelArea[0]) / 2, 
                    u = c - 2 * o, f = l.funnelArea[1] + r / 2, h = l.textSize || e.fontSize, n.setLineWidth(1 * e.pixelRatio), 
                    n.setStrokeStyle(l.color), n.setFillStyle(l.color), n.beginPath(), n.moveTo(c, f), 
                    n.lineTo(u, f), n.stroke(), n.closePath(), n.beginPath(), n.moveTo(u, f), n.arc(u, f, 2, 0, 2 * Math.PI), 
                    n.closePath(), n.fill(), n.beginPath(), n.setFontSize(h), n.setFillStyle(l.textColor || "#666666"), 
                    n.fillText(d, u - 5 - p(d), f + h / 2 - 2), n.closePath(), n.stroke(), n.closePath());
                }
            }
            function Ut(t, e) {
                e.draw();
            }
            function Gt(t) {
                this.isStop = !1, t.duration = void 0 === t.duration ? 1e3 : t.duration, t.timing = t.timing || "linear";
                var e = "undefined" != typeof setTimeout ? function(t, e) {
                    setTimeout(function() {
                        var e = +new Date();
                        t(e);
                    }, e);
                } : "undefined" != typeof requestAnimationFrame ? requestAnimationFrame : function(t) {
                    t(null);
                }, n = null, r = function(i) {
                    if (null === i || !0 === this.isStop) return t.onProcess && t.onProcess(1), void (t.onAnimationFinish && t.onAnimationFinish());
                    if (null === n && (n = i), i - n < t.duration) {
                        var o = (i - n) / t.duration;
                        o = (0, Qt[t.timing])(o), t.onProcess && t.onProcess(o), e(r, 17);
                    } else t.onProcess && t.onProcess(1), t.onAnimationFinish && t.onAnimationFinish();
                };
                r = r.bind(this), e(r, 17);
            }
            function Vt(t, e, n, r) {
                var i = this, a = e.series, s = e.categories;
                a = h(a, e, n);
                var l = e.animation ? e.duration : 0;
                i.animationInstance && i.animationInstance.stop();
                var c = null;
                if ("candle" == t) {
                    var u = qt({}, e.extra.candle.average);
                    u.show ? (c = o(u.day, u.name, u.color, a[0].data), c = h(c, e, n), e.seriesMA = c) : c = e.seriesMA ? e.seriesMA = h(e.seriesMA, e, n) : a;
                } else c = a;
                e._series_ = a = S(a), e.area = new Array(4);
                for (var f = 0; f < 4; f++) e.area[f] = e.padding[f];
                var d = I(c, e, n, e.chartData), p = d.area.wholeHeight, g = d.area.wholeWidth;
                switch (e.legend.position) {
                  case "top":
                    e.area[0] += p;
                    break;

                  case "bottom":
                    e.area[2] += p;
                    break;

                  case "left":
                    e.area[3] += g;
                    break;

                  case "right":
                    e.area[1] += g;
                }
                var y = {}, v = 0;
                if ("line" === e.type || "column" === e.type || "area" === e.type || "mix" === e.type || "candle" === e.type) {
                    if (y = nt(a, e, n), v = y.yAxisWidth, e.yAxis.showTitle) {
                        for (var b = 0, m = 0; m < e.yAxis.data.length; m++) b = Math.max(b, e.yAxis.data[m].titleFontSize ? e.yAxis.data[m].titleFontSize : n.fontSize);
                        e.area[0] += (b + 6) * e.pixelRatio;
                    }
                    for (var x = 0, _ = 0, w = 0; w < v.length; w++) "left" == v[w].position ? (e.area[3] += _ > 0 ? v[w].width + e.yAxis.padding : v[w].width, 
                    _ += 1) : (e.area[1] += x > 0 ? v[w].width + e.yAxis.padding : v[w].width, x += 1);
                } else n.yAxisWidth = v;
                if (e.chartData.yAxisData = y, e.categories && e.categories.length) {
                    e.chartData.xAxisData = Q(e.categories, e, n);
                    var A = R(e.categories, e, n, e.chartData.xAxisData.eachSpacing), P = A.xAxisHeight, T = A.angle;
                    n.xAxisHeight = P, n._xAxisTextAngle_ = T, e.area[2] += P, e.chartData.categoriesData = A;
                } else if ("line" === e.type || "area" === e.type || "points" === e.type) {
                    e.chartData.xAxisData = $(a, e, n);
                    var k = R(s = e.chartData.xAxisData.rangesFormat, e, n, e.chartData.xAxisData.eachSpacing), O = k.xAxisHeight, D = k.angle;
                    n.xAxisHeight = O, n._xAxisTextAngle_ = D, e.area[2] += O, e.chartData.categoriesData = k;
                } else e.chartData.xAxisData = {
                    xAxisPoints: []
                };
                if (e.enableScroll && "right" == e.xAxis.scrollAlign && void 0 === e._scrollDistance_) {
                    var C = 0, L = e.chartData.xAxisData.xAxisPoints, M = e.chartData.xAxisData.startX;
                    C = e.chartData.xAxisData.endX - M - e.chartData.xAxisData.eachSpacing * (L.length - 1), 
                    i.scrollOption = {
                        currentOffset: C,
                        startTouchX: C,
                        distance: 0,
                        lastMoveTime: 0
                    }, e._scrollDistance_ = C;
                }
                switch ("pie" !== t && "ring" !== t && "rose" !== t || (n._pieTextMaxLength_ = !1 === e.dataLabel ? 0 : J(c)), 
                t) {
                  case "word":
                    var j = qt({}, {
                        type: "normal",
                        autoColors: !0
                    }, e.extra.word);
                    1 != e.updateData && void 0 != e.updateData || (e.chartData.wordCloudData = Bt(e, j.type)), 
                    this.animationInstance = new Gt({
                        timing: "easeInOut",
                        duration: l,
                        onProcess: function(t) {
                            r.clearRect(0, 0, e.width, e.height), e.rotate && ot(r, e), zt(a, e, n, r, t), Ut(e, r);
                        },
                        onAnimationFinish: function() {
                            i.event.trigger("renderComplete");
                        }
                    });
                    break;

                  case "map":
                    r.clearRect(0, 0, e.width, e.height), $t(a, e, n, r);
                    break;

                  case "funnel":
                    this.animationInstance = new Gt({
                        timing: "easeInOut",
                        duration: l,
                        onProcess: function(t) {
                            r.clearRect(0, 0, e.width, e.height), e.rotate && ot(r, e), e.chartData.funnelData = Wt(a, e, n, r, t), 
                            Tt(e.series, e, n, r, e.chartData), wt(e, n, r, t), Ut(e, r);
                        },
                        onAnimationFinish: function() {
                            i.event.trigger("renderComplete");
                        }
                    });
                    break;

                  case "line":
                    this.animationInstance = new Gt({
                        timing: "easeIn",
                        duration: l,
                        onProcess: function(t) {
                            r.clearRect(0, 0, e.width, e.height), e.rotate && ot(r, e), St(s, e, n, r), At(s, e, n, r);
                            var i = xt(a, e, n, r, t), o = i.xAxisPoints, l = i.calPoints, c = i.eachSpacing;
                            e.chartData.xAxisPoints = o, e.chartData.calPoints = l, e.chartData.eachSpacing = c, 
                            Pt(a, e, n, r), !1 !== e.enableMarkLine && 1 === t && dt(e, n, r), Tt(e.series, e, n, r, e.chartData), 
                            wt(e, n, r, t, c, o), Ut(e, r);
                        },
                        onAnimationFinish: function() {
                            i.event.trigger("renderComplete");
                        }
                    });
                    break;

                  case "mix":
                    this.animationInstance = new Gt({
                        timing: "easeIn",
                        duration: l,
                        onProcess: function(t) {
                            r.clearRect(0, 0, e.width, e.height), e.rotate && ot(r, e), St(s, e, n, r), At(s, e, n, r);
                            var i = _t(a, e, n, r, t), o = i.xAxisPoints, l = i.calPoints, c = i.eachSpacing;
                            e.chartData.xAxisPoints = o, e.chartData.calPoints = l, e.chartData.eachSpacing = c, 
                            Pt(a, e, n, r), !1 !== e.enableMarkLine && 1 === t && dt(e, n, r), Tt(e.series, e, n, r, e.chartData), 
                            wt(e, n, r, t, c, o), Ut(e, r);
                        },
                        onAnimationFinish: function() {
                            i.event.trigger("renderComplete");
                        }
                    });
                    break;

                  case "column":
                    this.animationInstance = new Gt({
                        timing: "easeIn",
                        duration: l,
                        onProcess: function(t) {
                            r.clearRect(0, 0, e.width, e.height), e.rotate && ot(r, e), St(s, e, n, r), At(s, e, n, r);
                            var i = vt(a, e, n, r, t), o = i.xAxisPoints, l = i.calPoints, c = i.eachSpacing;
                            e.chartData.xAxisPoints = o, e.chartData.calPoints = l, e.chartData.eachSpacing = c, 
                            Pt(a, e, n, r), !1 !== e.enableMarkLine && 1 === t && dt(e, n, r), Tt(e.series, e, n, r, e.chartData), 
                            wt(e, n, r, t, c, o), Ut(e, r);
                        },
                        onAnimationFinish: function() {
                            i.event.trigger("renderComplete");
                        }
                    });
                    break;

                  case "area":
                    this.animationInstance = new Gt({
                        timing: "easeIn",
                        duration: l,
                        onProcess: function(t) {
                            r.clearRect(0, 0, e.width, e.height), e.rotate && ot(r, e), St(s, e, n, r), At(s, e, n, r);
                            var i = mt(a, e, n, r, t), o = i.xAxisPoints, l = i.calPoints, c = i.eachSpacing;
                            e.chartData.xAxisPoints = o, e.chartData.calPoints = l, e.chartData.eachSpacing = c, 
                            Pt(a, e, n, r), !1 !== e.enableMarkLine && 1 === t && dt(e, n, r), Tt(e.series, e, n, r, e.chartData), 
                            wt(e, n, r, t, c, o), Ut(e, r);
                        },
                        onAnimationFinish: function() {
                            i.event.trigger("renderComplete");
                        }
                    });
                    break;

                  case "ring":
                  case "pie":
                    this.animationInstance = new Gt({
                        timing: "easeInOut",
                        duration: l,
                        onProcess: function(t) {
                            r.clearRect(0, 0, e.width, e.height), e.rotate && ot(r, e), e.chartData.pieData = kt(a, e, n, r, t), 
                            Tt(e.series, e, n, r, e.chartData), wt(e, n, r, t), Ut(e, r);
                        },
                        onAnimationFinish: function() {
                            i.event.trigger("renderComplete");
                        }
                    });
                    break;

                  case "rose":
                    this.animationInstance = new Gt({
                        timing: "easeInOut",
                        duration: l,
                        onProcess: function(t) {
                            r.clearRect(0, 0, e.width, e.height), e.rotate && ot(r, e), e.chartData.pieData = Ot(a, e, n, r, t), 
                            Tt(e.series, e, n, r, e.chartData), wt(e, n, r, t), Ut(e, r);
                        },
                        onAnimationFinish: function() {
                            i.event.trigger("renderComplete");
                        }
                    });
                    break;

                  case "radar":
                    this.animationInstance = new Gt({
                        timing: "easeInOut",
                        duration: l,
                        onProcess: function(t) {
                            r.clearRect(0, 0, e.width, e.height), e.rotate && ot(r, e), e.chartData.radarData = Lt(a, e, n, r, t), 
                            Tt(e.series, e, n, r, e.chartData), wt(e, n, r, t), Ut(e, r);
                        },
                        onAnimationFinish: function() {
                            i.event.trigger("renderComplete");
                        }
                    });
                    break;

                  case "arcbar":
                    this.animationInstance = new Gt({
                        timing: "easeInOut",
                        duration: l,
                        onProcess: function(t) {
                            r.clearRect(0, 0, e.width, e.height), e.rotate && ot(r, e), e.chartData.arcbarData = Dt(a, e, n, r, t), 
                            Ut(e, r);
                        },
                        onAnimationFinish: function() {
                            i.event.trigger("renderComplete");
                        }
                    });
                    break;

                  case "gauge":
                    this.animationInstance = new Gt({
                        timing: "easeInOut",
                        duration: l,
                        onProcess: function(t) {
                            r.clearRect(0, 0, e.width, e.height), e.rotate && ot(r, e), e.chartData.gaugeData = Ct(s, a, e, n, r, t), 
                            Ut(e, r);
                        },
                        onAnimationFinish: function() {
                            i.event.trigger("renderComplete");
                        }
                    });
                    break;

                  case "candle":
                    this.animationInstance = new Gt({
                        timing: "easeIn",
                        duration: l,
                        onProcess: function(t) {
                            r.clearRect(0, 0, e.width, e.height), e.rotate && ot(r, e), St(s, e, n, r), At(s, e, n, r);
                            var i = bt(a, c, e, n, r, t), o = i.xAxisPoints, l = i.calPoints, u = i.eachSpacing;
                            e.chartData.xAxisPoints = o, e.chartData.calPoints = l, e.chartData.eachSpacing = u, 
                            Pt(a, e, n, r), !1 !== e.enableMarkLine && 1 === t && dt(e, n, r), Tt(c || e.series, e, n, r, e.chartData), 
                            wt(e, n, r, t, u, o), Ut(e, r);
                        },
                        onAnimationFinish: function() {
                            i.event.trigger("renderComplete");
                        }
                    });
                }
            }
            function Jt() {
                this.events = {};
            }
            var Xt = {
                yAxisWidth: 15,
                yAxisSplit: 5,
                xAxisHeight: 15,
                xAxisLineHeight: 15,
                legendHeight: 15,
                yAxisTitleWidth: 15,
                padding: [ 10, 10, 10, 10 ],
                pixelRatio: 1,
                rotate: !1,
                columePadding: 3,
                fontSize: 13,
                dataPointShape: [ "circle", "circle", "circle", "circle" ],
                colors: [ "#1890ff", "#2fc25b", "#facc14", "#f04864", "#8543e0", "#90ed7d" ],
                pieChartLinePadding: 15,
                pieChartTextPadding: 5,
                xAxisTextPadding: 3,
                titleColor: "#333333",
                titleFontSize: 20,
                subtitleColor: "#999999",
                subtitleFontSize: 15,
                toolTipPadding: 3,
                toolTipBackground: "#000000",
                toolTipOpacity: .7,
                toolTipLineHeight: 20,
                radarLabelTextMargin: 15,
                gaugeLabelTextMargin: 15
            }, qt = function(t) {
                function e(t, n) {
                    for (var r in n) t[r] = t[r] && "[object Object]" === t[r].toString() ? e(t[r], n[r]) : t[r] = n[r];
                    return t;
                }
                for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
                if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                return !r || r.length <= 0 ? t : (r.forEach(function(n) {
                    t = e(t, n);
                }), t);
            }, Yt = {
                toFixed: function(t, e) {
                    return e = e || 2, this.isFloat(t) && (t = t.toFixed(e)), t;
                },
                isFloat: function(t) {
                    return t % 1 != 0;
                },
                approximatelyEqual: function(t, e) {
                    return Math.abs(t - e) < 1e-10;
                },
                isSameSign: function(t, e) {
                    return Math.abs(t) === t && Math.abs(e) === e || Math.abs(t) !== t && Math.abs(e) !== e;
                },
                isSameXCoordinateArea: function(t, e) {
                    return this.isSameSign(t.x, e.x);
                },
                isCollision: function(t, e) {
                    return t.end = {}, t.end.x = t.start.x + t.width, t.end.y = t.start.y - t.height, 
                    e.end = {}, e.end.x = e.start.x + e.width, e.end.y = e.start.y - e.height, !(e.start.x > t.end.x || e.end.x < t.start.x || e.end.y > t.start.y || e.start.y < t.end.y);
                }
            }, Qt = {
                easeIn: function(t) {
                    return Math.pow(t, 3);
                },
                easeOut: function(t) {
                    return Math.pow(t - 1, 3) + 1;
                },
                easeInOut: function(t) {
                    return (t /= .5) < 1 ? .5 * Math.pow(t, 3) : .5 * (Math.pow(t - 2, 3) + 2);
                },
                linear: function(t) {
                    return t;
                }
            };
            Gt.prototype.stop = function() {
                this.isStop = !0;
            }, Jt.prototype.addEventListener = function(t, e) {
                this.events[t] = this.events[t] || [], this.events[t].push(e);
            }, Jt.prototype.trigger = function() {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                var r = e[0], i = e.slice(1);
                this.events[r] && this.events[r].forEach(function(t) {
                    try {
                        t.apply(null, i);
                    } catch (t) {
                        console.error(t);
                    }
                });
            };
            var Kt = function(t) {
                t.pixelRatio = t.pixelRatio ? t.pixelRatio : 1, t.fontSize = t.fontSize ? t.fontSize * t.pixelRatio : 13 * t.pixelRatio, 
                t.title = qt({}, t.title), t.subtitle = qt({}, t.subtitle), t.duration = t.duration ? t.duration : 1e3, 
                t.yAxis = qt({}, {
                    data: [],
                    showTitle: !1,
                    disabled: !1,
                    disableGrid: !1,
                    splitNumber: 5,
                    gridType: "solid",
                    dashLength: 4 * t.pixelRatio,
                    gridColor: "#cccccc",
                    padding: 10,
                    fontColor: "#666666"
                }, t.yAxis), t.yAxis.dashLength *= t.pixelRatio, t.yAxis.padding *= t.pixelRatio, 
                t.xAxis = qt({}, {
                    rotateLabel: !1,
                    type: "calibration",
                    gridType: "solid",
                    dashLength: 4,
                    scrollAlign: "left",
                    boundaryGap: "center",
                    axisLine: !0,
                    axisLineColor: "#cccccc"
                }, t.xAxis), t.xAxis.dashLength *= t.pixelRatio, t.legend = qt({}, {
                    show: !0,
                    position: "bottom",
                    float: "center",
                    backgroundColor: "rgba(0,0,0,0)",
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    padding: 5,
                    margin: 5,
                    itemGap: 10,
                    fontSize: t.fontSize,
                    lineHeight: t.fontSize,
                    fontColor: "#333333",
                    format: {},
                    hiddenColor: "#CECECE"
                }, t.legend), t.legend.borderWidth = t.legend.borderWidth * t.pixelRatio, t.legend.itemGap = t.legend.itemGap * t.pixelRatio, 
                t.legend.padding = t.legend.padding * t.pixelRatio, t.legend.margin = t.legend.margin * t.pixelRatio, 
                t.extra = qt({}, t.extra), t.rotate = !!t.rotate, t.animation = !!t.animation, t.rotate = !!t.rotate;
                var e = JSON.parse(JSON.stringify(Xt));
                if (e.colors = t.colors ? t.colors : e.colors, e.yAxisTitleWidth = !0 !== t.yAxis.disabled && t.yAxis.title ? e.yAxisTitleWidth : 0, 
                "pie" != t.type && "ring" != t.type || (e.pieChartLinePadding = !1 === t.dataLabel ? 0 : t.extra.pie.labelWidth * t.pixelRatio || e.pieChartLinePadding * t.pixelRatio), 
                "rose" == t.type && (e.pieChartLinePadding = !1 === t.dataLabel ? 0 : t.extra.rose.labelWidth * t.pixelRatio || e.pieChartLinePadding * t.pixelRatio), 
                e.pieChartTextPadding = !1 === t.dataLabel ? 0 : e.pieChartTextPadding * t.pixelRatio, 
                e.yAxisSplit = t.yAxis.splitNumber ? t.yAxis.splitNumber : Xt.yAxisSplit, e.rotate = t.rotate, 
                t.rotate) {
                    var r = t.width, i = t.height;
                    t.width = i, t.height = r;
                }
                t.padding = t.padding ? t.padding : e.padding;
                for (var o = 0; o < 4; o++) t.padding[o] *= t.pixelRatio;
                e.yAxisWidth = Xt.yAxisWidth * t.pixelRatio, e.xAxisHeight = Xt.xAxisHeight * t.pixelRatio, 
                t.enableScroll && t.xAxis.scrollShow && (e.xAxisHeight += 6 * t.pixelRatio), e.xAxisLineHeight = Xt.xAxisLineHeight * t.pixelRatio, 
                e.fontSize = t.fontSize, e.titleFontSize = Xt.titleFontSize * t.pixelRatio, e.subtitleFontSize = Xt.subtitleFontSize * t.pixelRatio, 
                e.toolTipPadding = Xt.toolTipPadding * t.pixelRatio, e.toolTipLineHeight = Xt.toolTipLineHeight * t.pixelRatio, 
                e.columePadding = Xt.columePadding * t.pixelRatio, t.$this = t.$this ? t.$this : this, 
                this.context = n.createCanvasContext(t.canvasId, t.$this), t.chartData = {}, this.event = new Jt(), 
                this.scrollOption = {
                    currentOffset: 0,
                    startTouchX: 0,
                    distance: 0,
                    lastMoveTime: 0
                }, this.opts = t, this.config = e, Vt.call(this, t.type, t, e, this.context);
            };
            Kt.prototype.updateData = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                switch (this.opts = qt({}, this.opts, t), this.opts.updateData = !0, t.scrollPosition || "current") {
                  case "current":
                    this.opts._scrollDistance_ = this.scrollOption.currentOffset;
                    break;

                  case "left":
                    this.opts._scrollDistance_ = 0, this.scrollOption = {
                        currentOffset: 0,
                        startTouchX: 0,
                        distance: 0,
                        lastMoveTime: 0
                    };
                    break;

                  case "right":
                    var e = nt(this.opts.series, this.opts, this.config).yAxisWidth;
                    this.config.yAxisWidth = e;
                    var n = 0, r = Q(this.opts.categories, this.opts, this.config), i = r.xAxisPoints, o = r.startX;
                    n = r.endX - o - r.eachSpacing * (i.length - 1), this.scrollOption = {
                        currentOffset: n,
                        startTouchX: n,
                        distance: 0,
                        lastMoveTime: 0
                    }, this.opts._scrollDistance_ = n;
                }
                Vt.call(this, this.opts.type, this.opts, this.config, this.context);
            }, Kt.prototype.zoom = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.opts.xAxis.itemCount;
                if (!0 === this.opts.enableScroll) {
                    var e = Math.round(Math.abs(this.scrollOption.currentOffset) / this.opts.chartData.eachSpacing) + Math.round(this.opts.xAxis.itemCount / 2);
                    this.opts.animation = !1, this.opts.xAxis.itemCount = t.itemCount;
                    var n = nt(this.opts.series, this.opts, this.config).yAxisWidth;
                    this.config.yAxisWidth = n;
                    var r = 0, i = Q(this.opts.categories, this.opts, this.config), o = i.xAxisPoints, a = i.startX, s = i.endX, l = i.eachSpacing, c = l * e, u = s - a, f = u - l * (o.length - 1);
                    (r = u / 2 - c) > 0 && (r = 0), r < f && (r = f), this.scrollOption = {
                        currentOffset: r,
                        startTouchX: r,
                        distance: 0,
                        lastMoveTime: 0
                    }, this.opts._scrollDistance_ = r, Vt.call(this, this.opts.type, this.opts, this.config, this.context);
                } else console.log("请启用滚动条后使用！");
            }, Kt.prototype.stopAnimation = function() {
                this.animationInstance && this.animationInstance.stop();
            }, Kt.prototype.addEventListener = function(t, e) {
                this.event.addEventListener(t, e);
            }, Kt.prototype.getCurrentDataIndex = function(t) {
                var e = null;
                if (e = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0]) {
                    var n = v(e, this.opts, t);
                    return "pie" === this.opts.type || "ring" === this.opts.type || "rose" === this.opts.type ? j({
                        x: n.x,
                        y: n.y
                    }, this.opts.chartData.pieData) : "radar" === this.opts.type ? D({
                        x: n.x,
                        y: n.y
                    }, this.opts.chartData.radarData, this.opts.categories.length) : "funnel" === this.opts.type ? C({
                        x: n.x,
                        y: n.y
                    }, this.opts.chartData.funnelData) : "map" === this.opts.type ? M({
                        x: n.x,
                        y: n.y
                    }, this.opts) : "word" === this.opts.type ? L({
                        x: n.x,
                        y: n.y
                    }, this.opts.chartData.wordCloudData) : P({
                        x: n.x,
                        y: n.y
                    }, this.opts.chartData.calPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
                }
                return -1;
            }, Kt.prototype.getLegendDataIndex = function(t) {
                var e = null;
                if (e = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0]) {
                    var n = v(e, this.opts, t);
                    return T({
                        x: n.x,
                        y: n.y
                    }, this.opts.chartData.legendData);
                }
                return -1;
            }, Kt.prototype.touchLegend = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = null;
                if (n = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0]) {
                    v(n, this.opts, t);
                    var r = this.getLegendDataIndex(t);
                    r >= 0 && (this.opts.series[r].show = !this.opts.series[r].show, this.opts.animation = !!e.animation, 
                    this.opts._scrollDistance_ = this.scrollOption.currentOffset, Vt.call(this, this.opts.type, this.opts, this.config, this.context));
                }
            }, Kt.prototype.showToolTip = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = null;
                (n = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0]) || console.log("touchError");
                var r = v(n, this.opts, t), i = this.scrollOption.currentOffset, o = qt({}, this.opts, {
                    _scrollDistance_: i,
                    animation: !1
                });
                if ("line" === this.opts.type || "area" === this.opts.type || "column" === this.opts.type) {
                    var a = void 0 == e.index ? this.getCurrentDataIndex(t) : e.index;
                    if (a > -1) {
                        var s = b(this.opts.series, a);
                        if (0 !== s.length) {
                            var l = _(s, this.opts.chartData.calPoints, a, this.opts.categories, e), c = l.textList, u = l.offset;
                            u.y = r.y, o.tooltip = {
                                textList: e.textList ? e.textList : c,
                                offset: u,
                                option: e,
                                index: a
                            };
                        }
                    }
                    Vt.call(this, o.type, o, this.config, this.context);
                }
                if ("mix" === this.opts.type) {
                    if ((a = void 0 == e.index ? this.getCurrentDataIndex(t) : e.index) > -1 && (i = this.scrollOption.currentOffset, 
                    o = qt({}, this.opts, {
                        _scrollDistance_: i,
                        animation: !1
                    }), 0 !== (s = b(this.opts.series, a)).length)) {
                        var f = w(s, this.opts.chartData.calPoints, a, this.opts.categories, e);
                        c = f.textList, (u = f.offset).y = r.y, o.tooltip = {
                            textList: e.textList ? e.textList : c,
                            offset: u,
                            option: e,
                            index: a
                        };
                    }
                    Vt.call(this, o.type, o, this.config, this.context);
                }
                "candle" === this.opts.type && ((a = void 0 == e.index ? this.getCurrentDataIndex(t) : e.index) > -1 && (i = this.scrollOption.currentOffset, 
                o = qt({}, this.opts, {
                    _scrollDistance_: i,
                    animation: !1
                }), 0 !== (s = b(this.opts.series, a)).length && (c = (l = A(this.opts.series[0].data, s, this.opts.chartData.calPoints, a, this.opts.categories, this.opts.extra.candle)).textList, 
                (u = l.offset).y = r.y, o.tooltip = {
                    textList: e.textList ? e.textList : c,
                    offset: u,
                    option: e,
                    index: a
                })), Vt.call(this, o.type, o, this.config, this.context)), "pie" !== this.opts.type && "ring" !== this.opts.type && "rose" !== this.opts.type && "funnel" !== this.opts.type || ((a = void 0 == e.index ? this.getCurrentDataIndex(t) : e.index) > -1 && (i = this.scrollOption.currentOffset, 
                o = qt({}, this.opts, {
                    _scrollDistance_: i,
                    animation: !1
                }), s = this.opts._series_[a], c = [ {
                    text: e.format ? e.format(s) : s.name + ": " + s.data,
                    color: s.color
                } ], u = {
                    x: r.x,
                    y: r.y
                }, o.tooltip = {
                    textList: e.textList ? e.textList : c,
                    offset: u,
                    option: e,
                    index: a
                }), Vt.call(this, o.type, o, this.config, this.context)), "map" !== this.opts.type && "word" !== this.opts.type || ((a = void 0 == e.index ? this.getCurrentDataIndex(t) : e.index) > -1 && (i = this.scrollOption.currentOffset, 
                o = qt({}, this.opts, {
                    _scrollDistance_: i,
                    animation: !1
                }), s = this.opts._series_[a], c = [ {
                    text: e.format ? e.format(s) : s.properties.name,
                    color: s.color
                } ], u = {
                    x: r.x,
                    y: r.y
                }, o.tooltip = {
                    textList: e.textList ? e.textList : c,
                    offset: u,
                    option: e,
                    index: a
                }), o.updateData = !1, Vt.call(this, o.type, o, this.config, this.context)), "radar" === this.opts.type && ((a = void 0 == e.index ? this.getCurrentDataIndex(t) : e.index) > -1 && (i = this.scrollOption.currentOffset, 
                o = qt({}, this.opts, {
                    _scrollDistance_: i,
                    animation: !1
                }), 0 !== (s = b(this.opts.series, a)).length && (c = s.map(function(t) {
                    return {
                        text: e.format ? e.format(t) : t.name + ": " + t.data,
                        color: t.color
                    };
                }), u = {
                    x: r.x,
                    y: r.y
                }, o.tooltip = {
                    textList: e.textList ? e.textList : c,
                    offset: u,
                    option: e,
                    index: a
                })), Vt.call(this, o.type, o, this.config, this.context));
            }, Kt.prototype.translate = function(t) {
                this.scrollOption = {
                    currentOffset: t,
                    startTouchX: t,
                    distance: 0,
                    lastMoveTime: 0
                };
                var e = qt({}, this.opts, {
                    _scrollDistance_: t,
                    animation: !1
                });
                Vt.call(this, this.opts.type, e, this.config, this.context);
            }, Kt.prototype.scrollStart = function(t) {
                var e = null, n = v(e = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0], this.opts, t);
                e && !0 === this.opts.enableScroll && (this.scrollOption.startTouchX = n.x);
            }, Kt.prototype.scroll = function(t) {
                0 === this.scrollOption.lastMoveTime && (this.scrollOption.lastMoveTime = Date.now());
                var e = this.opts.extra.touchMoveLimit || 20, n = Date.now();
                if (!(n - this.scrollOption.lastMoveTime < Math.floor(1e3 / e))) {
                    this.scrollOption.lastMoveTime = n;
                    var r = null;
                    if ((r = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0]) && !0 === this.opts.enableScroll) {
                        var i;
                        i = v(r, this.opts, t).x - this.scrollOption.startTouchX;
                        var o = this.scrollOption.currentOffset, s = a(this, o + i, this.opts.chartData, this.config, this.opts);
                        this.scrollOption.distance = i = s - o;
                        var l = qt({}, this.opts, {
                            _scrollDistance_: o + i,
                            animation: !1
                        });
                        return Vt.call(this, l.type, l, this.config, this.context), o + i;
                    }
                }
            }, Kt.prototype.scrollEnd = function(t) {
                if (!0 === this.opts.enableScroll) {
                    var e = this.scrollOption, n = e.currentOffset, r = e.distance;
                    this.scrollOption.currentOffset = n + r, this.scrollOption.distance = 0;
                }
            }, "object" === t(e.exports) && (e.exports = Kt);
        }).call(this, r("543d").default);
    },
    8196: function(t, e, n) {
        (function(t) {
            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            function i(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e && (r = r.filter(function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })), n.push.apply(n, r);
                }
                return n;
            }
            function o(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? i(Object(n), !0).forEach(function(e) {
                        a(t, e, n[e]);
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach(function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                    });
                }
                return t;
            }
            function a(t, e, n) {
                return e in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t;
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var s = r(n("f390")), l = r(n("eecf")), c = r(n("18b0")), u = new s.default({
                baseURL: l.default.baseURL
            });
            u.interceptors.request.use(function(e) {
                var n = t.getStorageSync(l.default.authStorageName);
                return e.header = o({}, e.header), e.header[l.default.authHeaderName] = n, e;
            }, function(t) {
                return Promise.reject(t);
            }), u.interceptors.response.use(function(e) {
                return e.data.code == l.default.authExpireCode && (t.removeStorageSync(l.default.authStorageName), 
                t.navigateTo({
                    url: "/pages/login"
                })), "200101" == e.data.code && c.default.toast(e.data.message), e.header["refresh-auth"] && t.setStorageSync(l.default.authStorageName, e.header["refresh-auth"]), 
                e.data;
            }, function(t) {
                return console.log(t), Promise.reject(t);
            });
            var f = u;
            e.default = f;
        }).call(this, n("543d").default);
    },
    "96cf": function(e, n) {
        !function(n) {
            function r(t, e, n, r) {
                var i = e && e.prototype instanceof o ? e : o, a = Object.create(i.prototype), s = new p(r || []);
                return a._invoke = u(t, n, s), a;
            }
            function i(t, e, n) {
                try {
                    return {
                        type: "normal",
                        arg: t.call(e, n)
                    };
                } catch (t) {
                    return {
                        type: "throw",
                        arg: t
                    };
                }
            }
            function o() {}
            function a() {}
            function s() {}
            function l(t) {
                [ "next", "throw", "return" ].forEach(function(e) {
                    t[e] = function(t) {
                        return this._invoke(e, t);
                    };
                });
            }
            function c(e) {
                function n(r, o, a, s) {
                    var l = i(e[r], e, o);
                    if ("throw" !== l.type) {
                        var c = l.arg, u = c.value;
                        return u && "object" === (void 0 === u ? "undefined" : t(u)) && m.call(u, "__await") ? Promise.resolve(u.__await).then(function(t) {
                            n("next", t, a, s);
                        }, function(t) {
                            n("throw", t, a, s);
                        }) : Promise.resolve(u).then(function(t) {
                            c.value = t, a(c);
                        }, function(t) {
                            return n("throw", t, a, s);
                        });
                    }
                    s(l.arg);
                }
                var r;
                this._invoke = function(t, e) {
                    function i() {
                        return new Promise(function(r, i) {
                            n(t, e, r, i);
                        });
                    }
                    return r = r ? r.then(i, i) : i();
                };
            }
            function u(t, e, n) {
                var r = T;
                return function(o, a) {
                    if (r === O) throw new Error("Generator is already running");
                    if (r === D) {
                        if ("throw" === o) throw a;
                        return y();
                    }
                    for (n.method = o, n.arg = a; ;) {
                        var s = n.delegate;
                        if (s) {
                            var l = f(s, n);
                            if (l) {
                                if (l === C) continue;
                                return l;
                            }
                        }
                        if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                            if (r === T) throw r = D, n.arg;
                            n.dispatchException(n.arg);
                        } else "return" === n.method && n.abrupt("return", n.arg);
                        r = O;
                        var c = i(t, e, n);
                        if ("normal" === c.type) {
                            if (r = n.done ? D : k, c.arg === C) continue;
                            return {
                                value: c.arg,
                                done: n.done
                            };
                        }
                        "throw" === c.type && (r = D, n.method = "throw", n.arg = c.arg);
                    }
                };
            }
            function f(t, e) {
                var n = t.iterator[e.method];
                if (n === v) {
                    if (e.delegate = null, "throw" === e.method) {
                        if (t.iterator.return && (e.method = "return", e.arg = v, f(t, e), "throw" === e.method)) return C;
                        e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method");
                    }
                    return C;
                }
                var r = i(n, t.iterator, e.arg);
                if ("throw" === r.type) return e.method = "throw", e.arg = r.arg, e.delegate = null, 
                C;
                var o = r.arg;
                return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", 
                e.arg = v), e.delegate = null, C) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), 
                e.delegate = null, C);
            }
            function h(t) {
                var e = {
                    tryLoc: t[0]
                };
                1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), 
                this.tryEntries.push(e);
            }
            function d(t) {
                var e = t.completion || {};
                e.type = "normal", delete e.arg, t.completion = e;
            }
            function p(t) {
                this.tryEntries = [ {
                    tryLoc: "root"
                } ], t.forEach(h, this), this.reset(!0);
            }
            function g(t) {
                if (t) {
                    var e = t[_];
                    if (e) return e.call(t);
                    if ("function" == typeof t.next) return t;
                    if (!isNaN(t.length)) {
                        var n = -1, r = function e() {
                            for (;++n < t.length; ) if (m.call(t, n)) return e.value = t[n], e.done = !1, e;
                            return e.value = v, e.done = !0, e;
                        };
                        return r.next = r;
                    }
                }
                return {
                    next: y
                };
            }
            function y() {
                return {
                    value: v,
                    done: !0
                };
            }
            var v, b = Object.prototype, m = b.hasOwnProperty, x = "function" == typeof Symbol ? Symbol : {}, _ = x.iterator || "@@iterator", w = x.asyncIterator || "@@asyncIterator", A = x.toStringTag || "@@toStringTag", S = "object" === (void 0 === e ? "undefined" : t(e)), P = n.regeneratorRuntime;
            if (P) S && (e.exports = P); else {
                (P = n.regeneratorRuntime = S ? e.exports : {}).wrap = r;
                var T = "suspendedStart", k = "suspendedYield", O = "executing", D = "completed", C = {}, L = {};
                L[_] = function() {
                    return this;
                };
                var M = Object.getPrototypeOf, j = M && M(M(g([])));
                j && j !== b && m.call(j, _) && (L = j);
                var E = s.prototype = o.prototype = Object.create(L);
                a.prototype = E.constructor = s, s.constructor = a, s[A] = a.displayName = "GeneratorFunction", 
                P.isGeneratorFunction = function(t) {
                    var e = "function" == typeof t && t.constructor;
                    return !!e && (e === a || "GeneratorFunction" === (e.displayName || e.name));
                }, P.mark = function(t) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(t, s) : (t.__proto__ = s, A in t || (t[A] = "GeneratorFunction")), 
                    t.prototype = Object.create(E), t;
                }, P.awrap = function(t) {
                    return {
                        __await: t
                    };
                }, l(c.prototype), c.prototype[w] = function() {
                    return this;
                }, P.AsyncIterator = c, P.async = function(t, e, n, i) {
                    var o = new c(r(t, e, n, i));
                    return P.isGeneratorFunction(e) ? o : o.next().then(function(t) {
                        return t.done ? t.value : o.next();
                    });
                }, l(E), E[A] = "Generator", E[_] = function() {
                    return this;
                }, E.toString = function() {
                    return "[object Generator]";
                }, P.keys = function(t) {
                    var e = [];
                    for (var n in t) e.push(n);
                    return e.reverse(), function n() {
                        for (;e.length; ) {
                            var r = e.pop();
                            if (r in t) return n.value = r, n.done = !1, n;
                        }
                        return n.done = !0, n;
                    };
                }, P.values = g, p.prototype = {
                    constructor: p,
                    reset: function(t) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = v, this.done = !1, this.delegate = null, 
                        this.method = "next", this.arg = v, this.tryEntries.forEach(d), !t) for (var e in this) "t" === e.charAt(0) && m.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = v);
                    },
                    stop: function() {
                        this.done = !0;
                        var t = this.tryEntries[0].completion;
                        if ("throw" === t.type) throw t.arg;
                        return this.rval;
                    },
                    dispatchException: function(t) {
                        function e(e, r) {
                            return o.type = "throw", o.arg = t, n.next = e, r && (n.method = "next", n.arg = v), 
                            !!r;
                        }
                        if (this.done) throw t;
                        for (var n = this, r = this.tryEntries.length - 1; r >= 0; --r) {
                            var i = this.tryEntries[r], o = i.completion;
                            if ("root" === i.tryLoc) return e("end");
                            if (i.tryLoc <= this.prev) {
                                var a = m.call(i, "catchLoc"), s = m.call(i, "finallyLoc");
                                if (a && s) {
                                    if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
                                    if (this.prev < i.finallyLoc) return e(i.finallyLoc);
                                } else if (a) {
                                    if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
                                } else {
                                    if (!s) throw new Error("try statement without catch or finally");
                                    if (this.prev < i.finallyLoc) return e(i.finallyLoc);
                                }
                            }
                        }
                    },
                    abrupt: function(t, e) {
                        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                            var r = this.tryEntries[n];
                            if (r.tryLoc <= this.prev && m.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                                var i = r;
                                break;
                            }
                        }
                        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
                        var o = i ? i.completion : {};
                        return o.type = t, o.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, 
                        C) : this.complete(o);
                    },
                    complete: function(t, e) {
                        if ("throw" === t.type) throw t.arg;
                        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, 
                        this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), 
                        C;
                    },
                    finish: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var n = this.tryEntries[e];
                            if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), d(n), C;
                        }
                    },
                    catch: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var n = this.tryEntries[e];
                            if (n.tryLoc === t) {
                                var r = n.completion;
                                if ("throw" === r.type) {
                                    var i = r.arg;
                                    d(n);
                                }
                                return i;
                            }
                        }
                        throw new Error("illegal catch attempt");
                    },
                    delegateYield: function(t, e, n) {
                        return this.delegate = {
                            iterator: g(t),
                            resultName: e,
                            nextLoc: n
                        }, "next" === this.method && (this.arg = v), C;
                    }
                };
            }
        }(function() {
            return this || "object" === ("undefined" == typeof self ? "undefined" : t(self)) && self;
        }() || Function("return this")());
    },
    a34a: function(t, e, n) {
        t.exports = n("bbdd");
    },
    a96b: function(t, e, n) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = function(t, e) {
            return t && !(0, i.default)(e) ? (0, o.default)(t, e) : e;
        };
        var i = r(n("e0e5")), o = r(n("d99b"));
    },
    aebf: function(e, n, r) {
        (function(n) {
            function r(t) {
                return "http" === t.substring(0, 4) && "https" !== t.substring(0, 5) && "http://store" !== t.substring(0, 12) && "http://tmp" !== t.substring(0, 10) && "http://usr" !== t.substring(0, 10) && (t = "https" + t.substring(4, t.length)), 
                t;
            }
            var i = console.log;
            i = function() {};
            var o = {
                log: function(t) {
                    i();
                },
                showLoading: function(t, e) {
                    n.showLoading({
                        title: t,
                        mask: e || !1
                    });
                },
                hideLoading: function() {
                    n.hideLoading();
                },
                showToast: function(t, e) {
                    n.showToast({
                        title: t,
                        icon: e || "none"
                    });
                },
                getPosterUrl: function(t) {
                    var e = t.backgroundImage, n = t.type;
                    return t.formData, new Promise(function(t, r) {
                        var i;
                        if (e) i = e; else switch (n) {
                          case 1:
                            i = "";
                            break;

                          default:
                            i = "/static/1.png";
                        }
                        i ? t(i) : r("背景图片路径不存在");
                    });
                },
                shareTypeListSheetArray: {
                    array: [ 0, 1, 2, 3, 4, 5 ]
                },
                isArray: function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t);
                },
                isObject: function(t) {
                    return "[object Object]" === Object.prototype.toString.call(t);
                },
                isPromise: function(e) {
                    return !!e && ("object" === (void 0 === e ? "undefined" : t(e)) || "function" == typeof e) && "function" == typeof e.then;
                },
                isNull: function(t) {
                    return null === t;
                },
                isUndefined: function(t) {
                    return void 0 === t;
                },
                isUndef: function(t) {
                    return void 0 === t;
                },
                isNotNull_string: function(t) {
                    return null !== t && void 0 !== t && "" !== t;
                },
                isFn: function(t) {
                    return t && "function" == typeof t;
                },
                getStorage: function(t, e, r) {
                    n.getStorage({
                        key: t,
                        success: function(t) {
                            t.data && "" != t.data ? e && e(t.data) : r && r();
                        },
                        fail: function() {
                            r && r();
                        }
                    });
                },
                setStorage: function(t, e) {
                    i(), i(), i(JSON.stringify(e)), n.setStorage({
                        key: t,
                        data: e
                    });
                },
                setStorageSync: function(t, e) {
                    n.setStorageSync(t, e);
                },
                getStorageSync: function(t) {
                    return n.getStorageSync(t);
                },
                clearStorageSync: function() {
                    n.clearStorageSync();
                },
                removeStorageSync: function(t) {
                    n.removeStorageSync(t);
                },
                getImageInfo: function(t, e, i) {
                    t = r(t), n.getImageInfo({
                        src: t,
                        success: function(t) {
                            e && "function" == typeof e && e(t);
                        },
                        fail: function(t) {
                            i && "function" == typeof i && i(t);
                        }
                    });
                },
                downloadFile: function(t, e) {
                    t = r(t), n.downloadFile({
                        url: t,
                        success: function(t) {
                            e && "function" == typeof e && e(t);
                        }
                    });
                },
                downloadFile_PromiseFc: function(t) {
                    return new Promise(function(e, o) {
                        "http" !== t.substring(0, 4) ? e(t) : (t = r(t), i(), n.downloadFile({
                            url: t,
                            success: function(t) {
                                t && t.tempFilePath ? e(t.tempFilePath) : o("not find tempFilePath");
                            },
                            fail: function(t) {
                                o(t);
                            }
                        }));
                    });
                },
                saveFile: function(t) {
                    n.saveFile({
                        tempFilePath: t,
                        success: function(t) {
                            i(JSON.stringify(t));
                        }
                    });
                },
                downLoadAndSaveFile_PromiseFc: function(t) {
                    return new Promise(function(e, o) {
                        i(), "http" === t.substring(0, 4) ? (t = r(t), n.downloadFile({
                            url: t,
                            success: function(t) {
                                i(JSON.stringify(t)), t && t.tempFilePath ? n.saveFile({
                                    tempFilePath: t.tempFilePath,
                                    success: function(n) {
                                        i(JSON.stringify(n)), e(n && n.savedFilePath ? n.savedFilePath : t.tempFilePath);
                                    },
                                    fail: function(n) {
                                        e(t.tempFilePath);
                                    }
                                }) : o("not find tempFilePath");
                            },
                            fail: function(t) {
                                o(t);
                            }
                        })) : e(t);
                    });
                },
                checkFile_PromiseFc: function(t) {
                    return new Promise(function(e, r) {
                        n.getSavedFileList({
                            success: function(n) {
                                var r = n.fileList.findIndex(function(e) {
                                    return e.filePath === t;
                                });
                                e(r);
                            },
                            fail: function(t) {
                                r(t);
                            }
                        });
                    });
                },
                removeSavedFile: function(t) {
                    n.getSavedFileList({
                        success: function(e) {
                            e.fileList.findIndex(function(e) {
                                return e.filePath === t;
                            }) >= 0 && n.removeSavedFile({
                                filePath: t
                            });
                        }
                    });
                },
                fileNameInPath: function(t) {
                    var e = t.split("/");
                    return e[e.length - 1];
                },
                getImageInfo_PromiseFc: function(t) {
                    return new Promise(function(e, o) {
                        i(), t = r(t), n.getImageInfo({
                            src: t,
                            success: function(t) {
                                i(JSON.stringify(t)), e(t);
                            },
                            fail: function(t) {
                                i(JSON.stringify(t)), o(t);
                            }
                        });
                    });
                },
                previewImage: function(t) {
                    "string" == typeof t && (t = [ t ]), n.previewImage({
                        urls: t
                    });
                },
                actionSheet: function(t, e) {
                    for (var n = [], r = 0; r < t.array.length; r++) switch (t.array[r]) {
                      case "sinaweibo":
                        n[r] = "新浪微博";
                        break;

                      case "qq":
                        n[r] = "QQ";
                        break;

                      case "weixin":
                        n[r] = "微信";
                        break;

                      case "WXSceneSession":
                        n[r] = "微信好友";
                        break;

                      case "WXSenceTimeline":
                        n[r] = "微信朋友圈";
                        break;

                      case "WXSceneFavorite":
                        n[r] = "微信收藏";
                        break;

                      case 0:
                        n[r] = "图文链接";
                        break;

                      case 1:
                        n[r] = "纯文字";
                        break;

                      case 2:
                        n[r] = "纯图片";
                        break;

                      case 3:
                        n[r] = "音乐";
                        break;

                      case 4:
                        n[r] = "视频";
                        break;

                      case 5:
                        n[r] = "小程序";
                    }
                    this.showActionSheet(n, e);
                },
                showActionSheet: function(t, e) {
                    n.showActionSheet({
                        itemList: t,
                        success: function(t) {
                            e && "function" == typeof e && e(t.tapIndex);
                        }
                    });
                },
                getProvider: function(t, e, r) {
                    var i = this;
                    n.getProvider({
                        service: t,
                        success: function(n) {
                            if (r) {
                                var o = {};
                                o.array = n.provider, i.actionSheet(o, function(t) {
                                    e && "function" == typeof e && e(n.provider[t]);
                                });
                            } else if ("payment" == t) {
                                for (var a = n.provider, s = [], l = 0; l < a.length; l++) "wxpay" == a[l] ? s[l] = {
                                    name: "微信支付",
                                    value: a[l],
                                    img: "/static/image/wei.png"
                                } : "alipay" == a[l] && (s[l] = {
                                    name: "支付宝支付",
                                    value: a[l],
                                    img: "/static/image/ali.png"
                                });
                                e && "function" == typeof e && e(s);
                            } else e && "function" == typeof e && e(n);
                        }
                    });
                }
            };
            e.exports = o;
        }).call(this, r("543d").default);
    },
    b544: function(t, e) {},
    bbdd: function(e, n, r) {
        var i = function() {
            return this || "object" === ("undefined" == typeof self ? "undefined" : t(self)) && self;
        }() || Function("return this")(), o = i.regeneratorRuntime && Object.getOwnPropertyNames(i).indexOf("regeneratorRuntime") >= 0, a = o && i.regeneratorRuntime;
        if (i.regeneratorRuntime = void 0, e.exports = r("96cf"), o) i.regeneratorRuntime = a; else try {
            delete i.regeneratorRuntime;
        } catch (t) {
            i.regeneratorRuntime = void 0;
        }
    },
    bd69: function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var r = {
            baseURL: "",
            header: {},
            method: "GET",
            dataType: "json",
            responseType: "text",
            custom: {},
            timeout: 3e4,
            validateStatus: function(t) {
                return t >= 200 && t < 300;
            }
        };
        e.default = r;
    },
    c8ba: function(e, n) {
        var r;
        r = function() {
            return this;
        }();
        try {
            r = r || new Function("return this")();
        } catch (e) {
            "object" === ("undefined" == typeof window ? "undefined" : t(window)) && (r = window);
        }
        e.exports = r;
    },
    d99b: function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = function(t, e) {
            return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t;
        };
    },
    e0e5: function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = function(t) {
            return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
        };
    },
    eecf: function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var r = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(n("7886"));
        r.default.baseURL = r.default.prodHost, r.default.baseLbsUrl = r.default.prodLbsHost, 
        r.default.carterXcx.envVersion = "release", r.default.huishihuoXcx.envVersion = "release";
        var i = r.default;
        e.default = i;
    },
    f0c5: function(t, e, n) {
        function r(t, e, n, r, i, o, a, s, l, c) {
            var u, f = "function" == typeof t ? t.options : t;
            if (l) {
                f.components || (f.components = {});
                var h = Object.prototype.hasOwnProperty;
                for (var d in l) h.call(l, d) && !h.call(f.components, d) && (f.components[d] = l[d]);
            }
            if (c && ((c.beforeCreate || (c.beforeCreate = [])).unshift(function() {
                this[c.__module] = this;
            }), (f.mixins || (f.mixins = [])).push(c)), e && (f.render = e, f.staticRenderFns = n, 
            f._compiled = !0), r && (f.functional = !0), o && (f._scopeId = "data-v-" + o), 
            a ? (u = function(t) {
                (t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), 
                i && i.call(this, t), t && t._registeredComponents && t._registeredComponents.add(a);
            }, f._ssrRegister = u) : i && (u = s ? function() {
                i.call(this, this.$root.$options.shadowRoot);
            } : i), u) if (f.functional) {
                f._injectStyles = u;
                var p = f.render;
                f.render = function(t, e) {
                    return u.call(e), p(t, e);
                };
            } else {
                var g = f.beforeCreate;
                f.beforeCreate = g ? [].concat(g, u) : [ u ];
            }
            return {
                exports: t,
                options: f
            };
        }
        n.d(e, "a", function() {
            return r;
        });
    },
    f2d7: function(e, n, r) {
        (function(n) {
            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            function o(t) {
                return c(t) || l(t) || s(t) || a();
            }
            function a() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function s(t, e) {
                if (t) {
                    if ("string" == typeof t) return u(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? u(t, e) : void 0;
                }
            }
            function l(t) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
            }
            function c(t) {
                if (Array.isArray(t)) return u(t);
            }
            function u(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
                return r;
            }
            function f(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e && (r = r.filter(function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })), n.push.apply(n, r);
                }
                return n;
            }
            function h(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? f(Object(n), !0).forEach(function(e) {
                        d(t, e, n[e]);
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : f(Object(n)).forEach(function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                    });
                }
                return t;
            }
            function d(t, e, n) {
                return e in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t;
            }
            function p(t, e, n, r, i, o, a) {
                try {
                    var s = t[o](a), l = s.value;
                } catch (t) {
                    return void n(t);
                }
                s.done ? e(l) : Promise.resolve(l).then(r, i);
            }
            function g(t) {
                return function() {
                    var e = this, n = arguments;
                    return new Promise(function(r, i) {
                        function o(t) {
                            p(s, r, i, o, a, "next", t);
                        }
                        function a(t) {
                            p(s, r, i, o, a, "throw", t);
                        }
                        var s = t.apply(e, n);
                        o(void 0);
                    });
                };
            }
            function y(t) {
                var e = t.type, r = t.formData, i = t.background, a = t.posterCanvasId, s = t.backgroundImage, l = t.reserve, c = t.textArray, u = t.drawArray, f = t.qrCodeArray, d = t.imagesArray, p = t.setCanvasWH, y = t.setCanvasToTempFilePath, b = t.setDraw, m = t.bgScale, x = t.Context, _ = t._this, A = t.delayTimeScale, S = t.drawDelayTime;
                return new Promise(function() {
                    var t = g(H.default.mark(function t(g, P) {
                        var k, O, D, C, L, M, j, E, F, I, R, N, B;
                        return H.default.wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                if (t.prev = 0, U.default.showLoading("正在准备海报数据"), x || (U.default.log("没有画布对象,创建画布对象"), 
                                x = n.createCanvasContext(a, _ || null)), !(i && i.width && i.height)) {
                                    t.next = 7;
                                    break;
                                }
                                k = i, t.next = 10;
                                break;

                              case 7:
                                return t.next = 9, $({
                                    backgroundImage: s,
                                    type: e,
                                    formData: r
                                });

                              case 9:
                                k = t.sent;

                              case 10:
                                if (m = m || q, k.width = k.width * m, k.height = k.height * m, U.default.log("获取背景图信息对象成功:" + JSON.stringify(k)), 
                                O = {
                                    bgObj: k,
                                    type: e,
                                    bgScale: m,
                                    getBgObj: function() {
                                        return O.bgObj;
                                    },
                                    setBgObj: function(t) {
                                        var e = h(h({}, O.bgObj), t);
                                        O.bgObj = e, k = e;
                                    }
                                }, !d) {
                                    t.next = 23;
                                    break;
                                }
                                return "function" == typeof d && (d = d(O)), U.default.showLoading("正在生成需绘制图片的临时路径"), 
                                U.default.log("准备设置图片"), t.next = 21, T(d);

                              case 21:
                                d = t.sent, U.default.hideLoading();

                              case 23:
                                if (c && ("function" == typeof c && (c = c(O)), c = w(x, c)), !f) {
                                    t.next = 38;
                                    break;
                                }
                                "function" == typeof f && (f = f(O)), U.default.showLoading("正在生成需绘制图片的临时路径"), D = 0;

                              case 28:
                                if (!(D < f.length)) {
                                    t.next = 37;
                                    break;
                                }
                                if (U.default.log(D), !f[D].image) {
                                    t.next = 34;
                                    break;
                                }
                                return t.next = 33, U.default.downloadFile_PromiseFc(f[D].image);

                              case 33:
                                f[D].image = t.sent;

                              case 34:
                                D++, t.next = 28;
                                break;

                              case 37:
                                U.default.hideLoading();

                              case 38:
                                if (!u) {
                                    t.next = 99;
                                    break;
                                }
                                if ("function" == typeof u && (u = u(O)), !U.default.isPromise(u)) {
                                    t.next = 44;
                                    break;
                                }
                                return t.next = 43, u;

                              case 43:
                                u = t.sent;

                              case 44:
                                if (!(U.default.isArray(u) && u.length > 0)) {
                                    t.next = 99;
                                    break;
                                }
                                C = !1, L = 0;

                              case 47:
                                if (!(L < u.length)) {
                                    t.next = 79;
                                    break;
                                }
                                M = u[L], U.default.isFn(M.allInfoCallback) && !C && (C = !0), M[X] = L, j = void 0, 
                                t.t0 = M.type, t.next = "image" === t.t0 ? 55 : "text" === t.t0 ? 59 : "qrcode" === t.t0 ? 61 : "custom" === t.t0 ? 67 : "fillrect" === t.t0 ? 68 : "strokeRect" === t.t0 ? 69 : "roundStrokeRect" === t.t0 ? 70 : "roundFillRect" === t.t0 ? 71 : 72;
                                break;

                              case 55:
                                return t.next = 57, T(M);

                              case 57:
                                return j = t.sent, t.abrupt("break", 74);

                              case 59:
                                return j = w(x, M), t.abrupt("break", 74);

                              case 61:
                                if (!M.image) {
                                    t.next = 66;
                                    break;
                                }
                                return t.next = 64, U.default.downloadFile_PromiseFc(M.image);

                              case 64:
                                t.t1 = t.sent, j = {
                                    image: t.t1
                                };

                              case 66:
                              case 67:
                              case 68:
                              case 69:
                              case 70:
                              case 71:
                                return t.abrupt("break", 74);

                              case 72:
                                return U.default.log("未识别的类型"), t.abrupt("break", 74);

                              case 74:
                                j && U.default.isObject(j) && (u[L] = h(h({}, M), j));

                              case 76:
                                L++, t.next = 47;
                                break;

                              case 79:
                                if (!C) {
                                    t.next = 99;
                                    break;
                                }
                                U.default.log("----------------hasAllInfoCallback----------------"), (E = o(u)).sort(function(t, e) {
                                    return (U.default.isUndef(t.serialNum) || U.default.isNull(t.serialNum) ? Number.NEGATIVE_INFINITY : Number(t.serialNum)) - (U.default.isUndef(e.serialNum) || U.default.isNull(e.serialNum) ? Number.NEGATIVE_INFINITY : Number(e.serialNum));
                                }), U.default.log("开始for循环"), F = 0;

                              case 85:
                                if (!(F < E.length)) {
                                    t.next = 98;
                                    break;
                                }
                                if (I = h({}, E[F]), !U.default.isFn(I.allInfoCallback)) {
                                    t.next = 95;
                                    break;
                                }
                                if (R = I.allInfoCallback({
                                    drawArray: u
                                }), !U.default.isPromise(R)) {
                                    t.next = 93;
                                    break;
                                }
                                return t.next = 92, R;

                              case 92:
                                R = t.sent;

                              case 93:
                                N = I[X], U.default.isUndef(N) ? console.log("程序错误 找不到idKey!!!\t...这不应该啊") : u[I[X]] = h(h({}, I), R);

                              case 95:
                                F++, t.next = 85;
                                break;

                              case 98:
                                U.default.log("for循环结束");

                              case 99:
                                if (console.log("params:" + JSON.stringify(O)), !p || "function" != typeof p) {
                                    t.next = 103;
                                    break;
                                }
                                return t.next = 103, new Promise(function(t, e) {
                                    p(O), setTimeout(function() {
                                        t();
                                    }, 50);
                                });

                              case 103:
                                return t.next = 105, v({
                                    Context: x,
                                    type: e,
                                    posterCanvasId: a,
                                    reserve: l,
                                    drawArray: u,
                                    textArray: c,
                                    imagesArray: d,
                                    bgObj: k,
                                    qrCodeArray: f,
                                    setCanvasToTempFilePath: y,
                                    setDraw: b,
                                    bgScale: m,
                                    _this: _,
                                    delayTimeScale: A,
                                    drawDelayTime: S
                                });

                              case 105:
                                B = t.sent, U.default.hideLoading(), g({
                                    bgObj: k,
                                    poster: B,
                                    type: e
                                }), t.next = 113;
                                break;

                              case 110:
                                t.prev = 110, t.t2 = t.catch(0), P(t.t2);

                              case 113:
                              case "end":
                                return t.stop();
                            }
                        }, t, null, [ [ 0, 110 ] ]);
                    }));
                    return function(e, n) {
                        return t.apply(this, arguments);
                    };
                }());
            }
            function v(t) {
                var e = t.Context, r = t.type, i = t.posterCanvasId, o = t.reserve, a = t.bgObj, s = t.drawArray, l = t.textArray, c = t.qrCodeArray, u = t.imagesArray, f = t.setCanvasToTempFilePath, d = t.setDraw, p = t.bgScale, g = t._this, y = t.delayTimeScale, v = t.drawDelayTime, w = {
                    Context: e,
                    bgObj: a,
                    type: r,
                    bgScale: p
                };
                return y = void 0 !== y ? y : 15, v = void 0 !== v ? v : 100, new Promise(function(t, p) {
                    try {
                        if (U.default.showLoading("正在绘制海报"), U.default.log("背景对象:" + JSON.stringify(a)), 
                        a && a.path ? (U.default.log("背景有图片路径"), e.drawImage(a.path, 0, 0, a.width, a.height)) : (U.default.log("背景没有图片路径"), 
                        a.backgroundColor ? (U.default.log("背景有背景颜色:" + a.backgroundColor), e.setFillStyle(a.backgroundColor), 
                        e.fillRect(0, 0, a.width, a.height)) : U.default.log("背景没有背景颜色")), U.default.showLoading("绘制图片"), 
                        u && u.length > 0 && j(e, u), U.default.showLoading("绘制自定义内容"), d && "function" == typeof d && d(w), 
                        U.default.showLoading("绘制文本"), l && l.length > 0 && D(e, l, a), U.default.showLoading("绘制二维码"), 
                        c && c.length > 0) for (var A = 0; A < c.length; A++) N(e, c[A]);
                        if (U.default.showLoading("绘制可控层级序列"), s && s.length > 0) for (var S = 0; S < s.length; S++) {
                            var P = s[S];
                            switch (U.default.log("绘制可控层级序列, drawArrayItem:" + JSON.stringify(P)), P.type) {
                              case "image":
                                U.default.log("绘制可控层级序列, 绘制图片"), j(e, P);
                                break;

                              case "text":
                                U.default.log("绘制可控层级序列, 绘制文本"), D(e, P, a);
                                break;

                              case "qrcode":
                                U.default.log("绘制可控层级序列, 绘制二维码"), N(e, P);
                                break;

                              case "custom":
                                U.default.log("绘制可控层级序列, 绘制自定义内容"), P.setDraw && "function" == typeof P.setDraw && P.setDraw(e);
                                break;

                              case "fillRect":
                                U.default.log("绘制可控层级序列, 绘制填充直角矩形"), b(e, P);
                                break;

                              case "strokeRect":
                                U.default.log("绘制可控层级序列, 绘制线条直角矩形"), m(e, P);
                                break;

                              case "roundStrokeRect":
                                U.default.log("绘制可控层级序列, 绘制线条圆角矩形"), x(e, P);
                                break;

                              case "roundFillRect":
                                U.default.log("绘制可控层级序列, 绘制填充圆角矩形"), _(e, P);
                                break;

                              default:
                                U.default.log("未识别的类型");
                            }
                        }
                        U.default.showLoading("绘制中"), setTimeout(function() {
                            U.default.log("准备执行draw方法"), U.default.log("Context:" + e);
                            e.draw("boolean" == typeof o && o, function() {
                                U.default.showLoading("正在输出图片");
                                var e, o = f || {};
                                o && "function" == typeof o && (o = f(a, r));
                                var d = h({
                                    x: 0,
                                    y: 0,
                                    width: Number(a.width),
                                    height: Number(a.height),
                                    destWidth: Number(a.width),
                                    destHeight: Number(a.height),
                                    quality: .8,
                                    fileType: "jpg"
                                }, o);
                                console.log("canvasToTempFilePath的data对象:" + JSON.stringify(d)), e = function() {
                                    var e = h(h({}, d), {}, {
                                        canvasId: i,
                                        success: function(e) {
                                            U.default.hideLoading(), t(e);
                                        },
                                        fail: function(t) {
                                            U.default.hideLoading(), console.log("输出图片失败"), U.default.log("输出图片失败:" + JSON.stringify(t)), 
                                            p("输出图片失败:" + JSON.stringify(t));
                                        }
                                    });
                                    n.canvasToTempFilePath(e, g || null);
                                };
                                var v = 0;
                                c && c.forEach(function(t) {
                                    t.text && (v += Number(t.text.length));
                                }), u && u.forEach(function() {
                                    v += y;
                                }), l && l.forEach(function() {
                                    v += y;
                                }), s && s.forEach(function(t) {
                                    switch (t.type) {
                                      case "text":
                                        t.text && (v += t.text.length);
                                        break;

                                      default:
                                        v += y;
                                    }
                                }), U.default.log("延时系数:" + y), U.default.log("总计延时:" + v), setTimeout(e, v);
                            });
                        }, v);
                    } catch (t) {
                        U.default.hideLoading(), p(t);
                    }
                });
            }
            function b(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                U.default.log("进入绘制填充直角矩形方法, drawArrayItem:" + JSON.stringify(e)), t.setFillStyle(e.backgroundColor || "black"), 
                t.setGlobalAlpha(e.alpha || 1), t.fillRect(e.dx || 0, e.dy || 0, e.width || 0, e.height || 0), 
                t.setGlobalAlpha(1);
            }
            function m(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                t.setStrokeStyle(e.color || "black"), t.setLineWidth(e.lineWidth || 1), t.strokeRect(e.dx, e.dy, e.width, e.height);
            }
            function x(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = e.dx, r = e.dy, i = e.width, o = e.height, a = e.r, s = e.lineWidth, l = e.color;
                i < 2 * (a = a || .1 * i) && (a = i / 2), i < 2 * a && (a = i / 2), t.beginPath(), 
                t.moveTo(n + a, r), t.arcTo(n + i, r, n + i, r + o, a), t.arcTo(n + i, r + o, n, r + o, a), 
                t.arcTo(n, r + o, n, r, a), t.arcTo(n, r, n + i, r, a), t.closePath(), t.setLineWidth(s || 1), 
                t.setStrokeStyle(l || "black"), t.stroke();
            }
            function _(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = e.dx, r = e.dy, i = e.width, o = e.height, a = e.r, s = e.backgroundColor;
                i < 2 * (a = a || .1 * i) && (a = i / 2), i < 2 * a && (a = i / 2), t.beginPath(), 
                t.moveTo(n + a, r), t.arcTo(n + i, r, n + i, r + o, a), t.arcTo(n + i, r + o, n, r + o, a), 
                t.arcTo(n, r + o, n, r, a), t.arcTo(n, r, n + i, r, a), t.closePath(), t.setFillStyle(s), 
                t.fill();
            }
            function w(t, e) {
                if (U.default.log("进入设置文字方法, texts:" + JSON.stringify(e)), e && U.default.isArray(e)) {
                    if (U.default.log("texts是数组"), e.length > 0) for (var n = 0; n < e.length; n++) U.default.log("字符串信息-初始化之前:" + JSON.stringify(e[n])), 
                    e[n] = A(t, e[n]);
                } else U.default.log("texts是对象"), e = A(t, e);
                return U.default.log("返回texts:" + JSON.stringify(e)), e;
            }
            function A(t, e) {
                if (U.default.log("进入设置文字方法, textItem:" + JSON.stringify(e)), U.default.isNotNull_string(e.text)) {
                    e.text = String(e.text), e.alpha = void 0 !== e.alpha ? Number(e.alpha) : 1, e.color = e.color || "black", 
                    e.size = void 0 !== e.size ? Number(e.size) : 10, e.textAlign = e.textAlign || "left", 
                    e.textBaseline = e.textBaseline || "middle", e.dx = Number(e.dx) || 0, e.dy = Number(e.dy) || 0, 
                    e.size = Math.ceil(Number(e.size)), U.default.log("字符串信息-初始化默认值后:" + JSON.stringify(e));
                    var n = S(t, {
                        text: e.text,
                        size: e.size
                    });
                    U.default.log("字符串信息-初始化时的文本长度:" + n);
                    var r = {};
                    e.infoCallBack && "function" == typeof e.infoCallBack && (r = e.infoCallBack(n)), 
                    e = h(h({}, e), {}, {
                        textLength: n
                    }, r), U.default.log("字符串信息-infoCallBack后:" + JSON.stringify(e));
                }
                return e;
            }
            function S(t, e) {
                U.default.log("计算文字长度, obj:" + JSON.stringify(e));
                var n, r = e.text, i = e.size;
                t.setFontSize(i);
                try {
                    n = t.measureText(r);
                } catch (t) {
                    n = {};
                }
                if (n = {}, U.default.log("measureText计算文字长度, textLength:" + JSON.stringify(n)), 
                !(n = n && n.width ? n.width : 0)) {
                    for (var o = 0, a = 0; a < r.length; a++) {
                        var s = P(r.substr(a, 1));
                        U.default.log("计算文字宽度系数:" + s), o += s;
                    }
                    U.default.log("文字宽度总系数:" + o), n = o * i;
                }
                return n;
            }
            function P(t) {
                return /a/.test(t) ? .552734375 : /b/.test(t) ? .638671875 : /c/.test(t) ? .50146484375 : /d/.test(t) ? .6396484375 : /e/.test(t) ? .5673828125 : /f/.test(t) ? .3466796875 : /g/.test(t) ? .6396484375 : /h/.test(t) ? .61572265625 : /i/.test(t) ? .26611328125 : /j/.test(t) ? .26708984375 : /k/.test(t) ? .54443359375 : /l/.test(t) ? .26611328125 : /m/.test(t) ? .93701171875 : /n/.test(t) ? .6162109375 : /o/.test(t) ? .6357421875 : /p/.test(t) ? .638671875 : /q/.test(t) ? .6396484375 : /r/.test(t) ? .3818359375 : /s/.test(t) ? .462890625 : /t/.test(t) ? .37255859375 : /u/.test(t) ? .6162109375 : /v/.test(t) ? .52490234375 : /w/.test(t) ? .78955078125 : /x/.test(t) ? .5068359375 : /y/.test(t) ? .529296875 : /z/.test(t) ? .49169921875 : /A/.test(t) ? .70361328125 : /B/.test(t) ? .62744140625 : /C/.test(t) ? .6689453125 : /D/.test(t) ? .76171875 : /E/.test(t) ? .5498046875 : /F/.test(t) ? .53125 : /G/.test(t) ? .74365234375 : /H/.test(t) ? .7734375 : /I/.test(t) ? .2939453125 : /J/.test(t) ? .39599609375 : /K/.test(t) ? .634765625 : /L/.test(t) ? .51318359375 : /M/.test(t) ? .97705078125 : /N/.test(t) ? .81298828125 : /O/.test(t) ? .81494140625 : /P/.test(t) ? .61181640625 : /Q/.test(t) ? .81494140625 : /R/.test(t) ? .65283203125 : /S/.test(t) ? .5771484375 : /T/.test(t) ? .5732421875 : /U/.test(t) ? .74658203125 : /V/.test(t) ? .67626953125 : /W/.test(t) ? 1.017578125 : /X/.test(t) ? .64501953125 : /Y/.test(t) ? .603515625 : /Z/.test(t) ? .6201171875 : /[0-9]/.test(t) ? .58642578125 : /[\u4e00-\u9fa5]/.test(t) ? 1 : / /.test(t) ? .2958984375 : /\`/.test(t) ? .294921875 : /\~/.test(t) ? .74169921875 : /\!/.test(t) ? .3125 : /\@/.test(t) ? 1.03125 : /\#/.test(t) ? .63818359375 : /\$/.test(t) ? .58642578125 : /\%/.test(t) ? .8896484375 : /\^/.test(t) ? .74169921875 : /\&/.test(t) ? .8701171875 : /\*/.test(t) ? .455078125 : /\(/.test(t) || /\)/.test(t) ? .333984375 : /\_/.test(t) ? .4482421875 : /\-/.test(t) ? .4326171875 : /\+/.test(t) || /\=/.test(t) ? .74169921875 : /\|/.test(t) ? .26904296875 : /\\/.test(t) ? .416015625 : /\[/.test(t) || /\]/.test(t) ? .333984375 : /\;/.test(t) ? .24072265625 : /\'/.test(t) ? .25634765625 : /\,/.test(t) || /\./.test(t) ? .24072265625 : /\//.test(t) ? .42724609375 : /\{/.test(t) || /\}/.test(t) ? .333984375 : /\:/.test(t) ? .24072265625 : /\"/.test(t) ? .435546875 : /\</.test(t) || /\>/.test(t) ? .74169921875 : /\?/.test(t) ? .48291015625 : 1;
            }
            function T(t) {
                return U.default.log("进入设置图片数据方法"), new Promise(function() {
                    var e = g(H.default.mark(function e(n, r) {
                        var i;
                        return H.default.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (e.prev = 0, !t || !U.default.isArray(t)) {
                                    e.next = 14;
                                    break;
                                }
                                U.default.log("images是一个数组"), i = 0;

                              case 4:
                                if (!(i < t.length)) {
                                    e.next = 12;
                                    break;
                                }
                                return U.default.log("设置图片数据循环中:" + i), e.next = 8, O(t[i]);

                              case 8:
                                t[i] = e.sent;

                              case 9:
                                i++, e.next = 4;
                                break;

                              case 12:
                                e.next = 18;
                                break;

                              case 14:
                                return U.default.log("images是一个对象"), e.next = 17, O(t);

                              case 17:
                                t = e.sent;

                              case 18:
                                n(t), e.next = 24;
                                break;

                              case 21:
                                e.prev = 21, e.t0 = e.catch(0), r(e.t0);

                              case 24:
                              case "end":
                                return e.stop();
                            }
                        }, e, null, [ [ 0, 21 ] ]);
                    }));
                    return function(t, n) {
                        return e.apply(this, arguments);
                    };
                }());
            }
            function k(t) {
                return /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i.test(t) ? (0, 
                V.base64ToPath)(t) : Promise.resolve(t);
            }
            function O(t) {
                return new Promise(function() {
                    var e = g(H.default.mark(function e(n, r) {
                        var i, o, a;
                        return H.default.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (!t.url) {
                                    e.next = 20;
                                    break;
                                }
                                return e.next = 3, k(t.url);

                              case 3:
                                return t.url = e.sent, i = t.url, e.next = 7, U.default.downloadFile_PromiseFc(i);

                              case 7:
                                return i = e.sent, t.url = i, o = t.infoCallBack && "function" == typeof t.infoCallBack, 
                                a = {}, e.next = 13, U.default.getImageInfo_PromiseFc(i);

                              case 13:
                                a = e.sent, o && (t = h(h({}, t), t.infoCallBack(a))), t.dx = Number(t.dx) || 0, 
                                t.dy = Number(t.dy) || 0, t.dWidth = Number(t.dWidth || a.width), t.dHeight = Number(t.dHeight || a.height), 
                                t = h(h({}, t), {}, {
                                    imageInfo: a
                                });

                              case 20:
                                n(t);

                              case 21:
                              case "end":
                                return e.stop();
                            }
                        }, e);
                    }));
                    return function(t, n) {
                        return e.apply(this, arguments);
                    };
                }());
            }
            function D(t, e, n) {
                U.default.isArray(e) ? U.default.log("遍历文本方法, 是数组") : (U.default.log("遍历文本方法, 不是数组"), 
                e = [ e ]), U.default.log("遍历文本方法, textArray:" + JSON.stringify(e));
                var r = [];
                if (e && e.length > 0) for (var i = 0; i < e.length; i++) {
                    var o = e[i];
                    if (o.text && o.lineFeed) {
                        var a = -1, s = n.width, l = o.size, c = o.dx;
                        if (U.default.isObject(o.lineFeed)) {
                            var u = o.lineFeed;
                            a = void 0 !== u.lineNum && "number" == typeof u.lineNum && u.lineNum >= 0 ? u.lineNum : a, 
                            s = void 0 !== u.maxWidth && "number" == typeof u.maxWidth ? u.maxWidth : s, l = void 0 !== u.lineHeight && "number" == typeof u.lineHeight ? u.lineHeight : l, 
                            c = void 0 !== u.dx && "number" == typeof u.dx ? u.dx : c;
                        }
                        for (var f = o.text.split(""), d = "", p = [], g = 0, y = f.length; g < y; g++) S(t, {
                            text: d,
                            size: o.size
                        }) <= s && S(t, {
                            text: d + f[g],
                            size: o.size
                        }) <= s ? (d += f[g], g == f.length - 1 && p.push(d)) : (p.push(d), d = f[g]);
                        U.default.log("循环出的文本数组:" + JSON.stringify(p));
                        for (var v = a >= 0 && a < p.length ? a : p.length, b = 0; b < v; b++) {
                            var m = p[b];
                            b == v - 1 && v < p.length && (m = m.substring(0, m.length - 1) + "...");
                            var x = h(h({}, o), {}, {
                                text: m,
                                dx: 0 === b ? o.dx : c >= 0 ? c : o.dx,
                                dy: o.dy + b * l,
                                textLength: S(t, {
                                    text: m,
                                    size: o.size
                                })
                            });
                            U.default.log("重新组成的文本对象:" + JSON.stringify(x)), r.push(x);
                        }
                    } else r.push(o);
                }
                U.default.log("绘制文本新数组:" + JSON.stringify(r)), L(t, r);
            }
            function C() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (t.font && "string" == typeof t.font) return U.default.log(t.font), t.font;
                var e = "normal", n = "normal", r = "normal", i = t.size || 10, o = "sans-serif";
                return i = Math.ceil(Number(i)), t.fontStyle && "string" == typeof t.fontStyle && (e = t.fontStyle.trim()), 
                t.fontVariant && "string" == typeof t.fontVariant && (n = t.fontVariant.trim()), 
                !t.fontWeight || "string" != typeof t.fontWeight && "number" != typeof t.fontWeight || (r = t.fontWeight.trim()), 
                t.fontFamily && "string" == typeof t.fontFamily && (o = t.fontFamily.trim()), e + " " + n + " " + r + " " + i + "px " + o;
            }
            function L(t, e) {
                if (U.default.log("准备绘制文本方法, texts:" + JSON.stringify(e)), e && U.default.isArray(e)) {
                    if (U.default.log("准备绘制文本方法, 是数组"), e.length > 0) for (var n = 0; n < e.length; n++) M(t, e[n]);
                } else U.default.log("准备绘制文本方法, 不是数组"), M(t, e);
            }
            function M(t, e) {
                if (U.default.log("进入绘制文本方法, textItem:" + JSON.stringify(e)), e && U.default.isObject(e) && e.text) {
                    if (t.font = C(e), t.setFillStyle(e.color), t.setGlobalAlpha(e.alpha), t.setTextAlign(e.textAlign), 
                    t.setTextBaseline(e.textBaseline), t.fillText(e.text, e.dx, e.dy), e.lineThrough && U.default.isObject(e.lineThrough)) {
                        U.default.log("有删除线");
                        var n, r, i = e.lineThrough;
                        switch (i.alpha = void 0 !== i.alpha ? i.alpha : e.alpha, i.style = i.style || e.color, 
                        i.width = void 0 !== i.width ? i.width : e.size / 10, i.cap = void 0 !== i.cap ? i.cap : "butt", 
                        U.default.log("删除线对象:" + JSON.stringify(i)), t.setGlobalAlpha(i.alpha), t.setStrokeStyle(i.style), 
                        t.setLineWidth(i.width), t.setLineCap(i.cap), e.textAlign) {
                          case "left":
                            n = e.dx;
                            break;

                          case "center":
                            n = e.dx - e.textLength / 2;
                            break;

                          default:
                            n = e.dx - e.textLength;
                        }
                        switch (e.textBaseline) {
                          case "top":
                            r = e.dy + .5 * e.size;
                            break;

                          case "middle":
                            r = e.dy;
                            break;

                          default:
                            r = e.dy - .5 * e.size;
                        }
                        t.beginPath(), t.moveTo(n, r), t.lineTo(n + e.textLength, r), t.stroke(), t.closePath(), 
                        U.default.log("删除线完毕");
                    }
                    t.setGlobalAlpha(1), t.font = "10px sans-serif";
                }
            }
            function j(t, e) {
                if (U.default.log("判断图片数据类型:" + JSON.stringify(e)), e && U.default.isArray(e)) {
                    if (e.length > 0) for (var n = 0; n < e.length; n++) E(t, e[n]);
                } else E(t, e);
            }
            function E(t, e) {
                U.default.log("判断绘制图片形状, img:" + JSON.stringify(e)), e.url && (e.circleSet ? I(t, e) : e.roundRectSet ? R(t, e) : F(t, e));
            }
            function F(t, e) {
                if (U.default.log("进入绘制默认图片方法, img:" + JSON.stringify(e)), e.url) {
                    var n = !U.default.isUndef(e.alpha);
                    e.alpha = Number(U.default.isUndef(e.alpha) ? 1 : e.alpha), t.setGlobalAlpha(e.alpha), 
                    U.default.log("绘制默认图片方法, 有url"), e.dWidth && e.dHeight && e.sx && e.sy && e.sWidth && e.sHeight ? (U.default.log("绘制默认图片方法, 绘制第一种方案"), 
                    t.drawImage(e.url, Number(e.sx) || !1, Number(e.sy) || !1, Number(e.sWidth) || !1, Number(e.sHeight) || !1, Number(e.dx || 0), Number(e.dy || 0), Number(e.dWidth) || !1, Number(e.dHeight) || !1)) : e.dWidth && e.dHeight ? (U.default.log("绘制默认图片方法, 绘制第二种方案"), 
                    t.drawImage(e.url, Number(e.dx || 0), Number(e.dy || 0), Number(e.dWidth) || !1, Number(e.dHeight) || !1)) : (U.default.log("绘制默认图片方法, 绘制第三种方案"), 
                    t.drawImage(e.url, Number(e.dx || 0), Number(e.dy || 0))), n && t.setGlobalAlpha(1);
                }
                U.default.log("绘制默认图片方法, 绘制完毕");
            }
            function I(e, n) {
                U.default.log("进入绘制圆形图片方法, obj:" + JSON.stringify(n));
                var r, i, o, a, s = n.dx, l = n.dy, c = n.dWidth, u = n.dHeight, f = n.circleSet;
                n.imageInfo, "object" === (void 0 === f ? "undefined" : t(f)) && (r = f.x, i = f.y, 
                o = f.r), o || (a = c > u ? u : c, o = a / 2), r = r ? s + r : (s || 0) + o, i = i ? l + i : (l || 0) + o, 
                e.save(), e.beginPath(), e.arc(r, i, o, 0, 2 * Math.PI, !1), e.closePath(), e.setGlobalAlpha(0), 
                e.fillStyle = "#FFFFFF", e.fill(), e.setGlobalAlpha(1), e.clip(), F(e, n), U.default.log("默认图片绘制完毕"), 
                e.restore();
            }
            function R(e, n) {
                U.default.log("进入绘制矩形图片方法, obj:" + JSON.stringify(n)), e.save();
                var r, i = n.dx, o = n.dy, a = n.dWidth, s = n.dHeight, l = n.roundRectSet;
                n.imageInfo, "object" === (void 0 === l ? "undefined" : t(l)) && (r = l.r), a < 2 * (r = r || .1 * a) && (r = a / 2), 
                s < 2 * r && (r = s / 2), e.beginPath(), e.moveTo(i + r, o), e.arcTo(i + a, o, i + a, o + s, r), 
                e.arcTo(i + a, o + s, i, o + s, r), e.arcTo(i, o + s, i, o, r), e.arcTo(i, o, i + a, o, r), 
                e.closePath(), e.setGlobalAlpha(0), e.fillStyle = "#FFFFFF", e.fill(), e.setGlobalAlpha(1), 
                e.clip(), F(e, n), e.restore(), U.default.log("进入绘制矩形图片方法, 绘制完毕");
            }
            function N(t, e) {
                U.default.log("进入绘制二维码方法"), U.default.showLoading("正在生成二维码");
                for (var n = [], r = {
                    text: String(e.text || "") || "",
                    size: Number(e.size || 0) || 200,
                    background: String(e.background || "") || "#ffffff",
                    foreground: String(e.foreground || "") || "#000000",
                    pdground: String(e.pdground || "") || "#000000",
                    correctLevel: Number(e.correctLevel || 0) || 3,
                    image: String(e.image || "") || "",
                    imageSize: Number(e.imageSize || 0) || 40,
                    dx: Number(e.dx || 0) || 0,
                    dy: Number(e.dy || 0) || 0
                }, i = null, o = 0, a = 0, s = n.length; a < s; a++) if (o = a, n[a].text == r.text && n[a].text.correctLevel == r.correctLevel) {
                    i = n[a].obj;
                    break;
                }
                o == s && (i = new G.default(r.text, r.correctLevel), n.push({
                    text: r.text,
                    correctLevel: r.correctLevel,
                    obj: i
                }));
                for (var l = i.getModuleCount(), c = r.size, u = r.imageSize, f = (c / l).toPrecision(4), h = (c / l).toPrecision(4), d = 0; d < l; d++) for (var p = 0; p < l; p++) {
                    var g = Math.ceil((p + 1) * f) - Math.floor(p * f), y = Math.ceil((d + 1) * f) - Math.floor(d * f), v = function(t) {
                        var e = t.options;
                        return e.pdground && (t.row > 1 && t.row < 5 && t.col > 1 && t.col < 5 || t.row > t.count - 6 && t.row < t.count - 2 && t.col > 1 && t.col < 5 || t.row > 1 && t.row < 5 && t.col > t.count - 6 && t.col < t.count - 2) ? e.pdground : e.foreground;
                    }({
                        row: d,
                        col: p,
                        count: l,
                        options: r
                    });
                    t.setFillStyle(i.modules[d][p] ? v : r.background), t.fillRect(r.dx + Math.round(p * f), r.dy + Math.round(d * h), g, y);
                }
                if (r.image) {
                    var b = r.dx + Number(((c - u) / 2).toFixed(2)), m = r.dy + Number(((c - u) / 2).toFixed(2));
                    (function(t, e, n, i, o, a, s, l, c) {
                        t.setLineWidth(s), t.setFillStyle(r.background), t.setStrokeStyle(r.background), 
                        t.beginPath(), t.moveTo(e + a, n), t.arcTo(e + i, n, e + i, n + a, a), t.arcTo(e + i, n + o, e + i - a, n + o, a), 
                        t.arcTo(e, n + o, e, n + o - a, a), t.arcTo(e, n, e + a, n, a), t.closePath(), l && t.fill(), 
                        c && t.stroke();
                    })(t, b, m, u, u, 2, 6, !0, !0), t.drawImage(r.image, b, m, u, u);
                }
                U.default.log("进入绘制二维码方法完毕"), U.default.hideLoading();
            }
            function $(t) {
                return t.backgroundImage, t.type, new Promise(function() {
                    var e = g(H.default.mark(function e(n, r) {
                        var i;
                        return H.default.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.prev = 0, U.default.showLoading("正在获取海报背景图"), e.next = 4, W(t);

                              case 4:
                                i = e.sent, U.default.hideLoading(), n(i), e.next = 15;
                                break;

                              case 9:
                                e.prev = 9, e.t0 = e.catch(0), U.default.hideLoading(), U.default.showToast("获取分享用户背景图失败:" + JSON.stringify(e.t0)), 
                                U.default.log(JSON.stringify(e.t0)), r(e.t0);

                              case 15:
                              case "end":
                                return e.stop();
                            }
                        }, e, null, [ [ 0, 9 ] ]);
                    }));
                    return function(t, n) {
                        return e.apply(this, arguments);
                    };
                }());
            }
            function B(t, e) {
                U.default.setStorage(z(t), e);
            }
            function z(t) {
                return J + (t || "default");
            }
            function W(t, e) {
                var n = t.backgroundImage, r = t.type;
                return U.default.log("获取分享背景图, 尝试清空本地数据"), new Promise(function() {
                    var e = g(H.default.mark(function e(i, o) {
                        var a, s, l, c;
                        return H.default.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (e.prev = 0, U.default.showLoading("正在下载海报背景图"), U.default.log("没有从后端获取的背景图片路径, 尝试从后端获取背景图片路径"), 
                                !n) {
                                    e.next = 7;
                                    break;
                                }
                                e.t0 = n, e.next = 10;
                                break;

                              case 7:
                                return e.next = 9, U.default.getPosterUrl(t);

                              case 9:
                                e.t0 = e.sent;

                              case 10:
                                return a = e.t0, e.next = 13, k(a);

                              case 13:
                                return a = e.sent, U.default.log("尝试下载并保存背景图:" + a), e.next = 17, U.default.downLoadAndSaveFile_PromiseFc(a);

                              case 17:
                                if (!(s = e.sent)) {
                                    e.next = 32;
                                    break;
                                }
                                return U.default.log("下载并保存背景图成功:" + s), e.next = 22, U.default.getImageInfo_PromiseFc(s);

                              case 22:
                                l = e.sent, U.default.log("获取图片信息成功"), c = {
                                    path: s,
                                    width: l.width,
                                    height: l.height,
                                    name: U.default.fileNameInPath(a)
                                }, U.default.log("拼接背景图信息对象成功:" + JSON.stringify(c)), B(r, h({}, c)), U.default.hideLoading(), 
                                U.default.log("返回背景图信息对象"), i(h({}, c)), e.next = 34;
                                break;

                              case 32:
                                U.default.hideLoading(), o("not find savedFilePath");

                              case 34:
                                e.next = 39;
                                break;

                              case 36:
                                e.prev = 36, e.t1 = e.catch(0), o(e.t1);

                              case 39:
                              case "end":
                                return e.stop();
                            }
                        }, e, null, [ [ 0, 36 ] ]);
                    }));
                    return function(t, n) {
                        return e.apply(this, arguments);
                    };
                }());
            }
            var H = i(r("a34a")), U = i(r("aebf")), G = i(r("21a2")), V = r("5ca1"), J = "ShrePosterBackground_", X = "QSSHAREPOSTER_IDKEY", q = 1;
            e.exports = {
                getSharePoster: function(t) {
                    return new Promise(function() {
                        var e = g(H.default.mark(function e(n, r) {
                            var i, o;
                            return H.default.wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                  case 0:
                                    return e.prev = 0, e.next = 3, y(t);

                                  case 3:
                                    i = e.sent, n(i), e.next = 21;
                                    break;

                                  case 7:
                                    return e.prev = 7, e.t0 = e.catch(0), e.prev = 9, t.bgScale ? t.bgScale = Number(t.bgScale) - .1 : q -= .1, 
                                    console.log("------------清除缓存后, 开始第二次尝试------------"), e.next = 14, y(t);

                                  case 14:
                                    o = e.sent, n(o), e.next = 21;
                                    break;

                                  case 18:
                                    e.prev = 18, e.t1 = e.catch(9), r(e.t1);

                                  case 21:
                                  case "end":
                                    return e.stop();
                                }
                            }, e, null, [ [ 0, 7 ], [ 9, 18 ] ]);
                        }));
                        return function(t, n) {
                            return e.apply(this, arguments);
                        };
                    }());
                },
                setText: w,
                setImage: T,
                drawText: D,
                drawImage: j,
                drawQrCode: N,
                drawFillRect: b,
                drawStrokeRect: m,
                drawRoundStrokeRect: x,
                drawRoundFillRect: _
            };
        }).call(this, r("543d").default);
    },
    f390: function(t, e, n) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function i(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(t);
                e && (r = r.filter(function(e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                })), n.push.apply(n, r);
            }
            return n;
        }
        function o(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? i(Object(n), !0).forEach(function(e) {
                    a(t, e, n[e]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach(function(e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                });
            }
            return t;
        }
        function a(t, e, n) {
            return e in t ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t;
        }
        function s(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function l(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(t, r.key, r);
            }
        }
        function c(t, e, n) {
            return e && l(t.prototype, e), n && l(t, n), t;
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var u = r(n("29da")), f = r(n("5930")), h = r(n("03a0")), d = r(n("bd69")), p = n("fe81"), g = function() {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                s(this, t), (0, p.isPlainObject)(e) || (e = {}, console.warn("设置全局参数必须接收一个Object")), 
                this.config = o(o({}, d.default), e), this.interceptors = {
                    request: new f.default(),
                    response: new f.default()
                };
            }
            return c(t, [ {
                key: "setConfig",
                value: function(t) {
                    this.config = t(this.config);
                }
            }, {
                key: "middleware",
                value: function(t) {
                    t = (0, h.default)(this.config, t);
                    var e = [ u.default, void 0 ], n = Promise.resolve(t);
                    for (this.interceptors.request.forEach(function(t) {
                        e.unshift(t.fulfilled, t.rejected);
                    }), this.interceptors.response.forEach(function(t) {
                        e.push(t.fulfilled, t.rejected);
                    }); e.length; ) n = n.then(e.shift(), e.shift());
                    return n;
                }
            }, {
                key: "request",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return this.middleware(t);
                }
            }, {
                key: "get",
                value: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return this.middleware(o({
                        url: t,
                        method: "GET"
                    }, e));
                }
            }, {
                key: "post",
                value: function(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return this.middleware(o({
                        url: t,
                        data: e,
                        method: "POST"
                    }, n));
                }
            }, {
                key: "put",
                value: function(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return this.middleware(o({
                        url: t,
                        data: e,
                        method: "PUT"
                    }, n));
                }
            }, {
                key: "delete",
                value: function(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return this.middleware(o({
                        url: t,
                        data: e,
                        method: "DELETE"
                    }, n));
                }
            }, {
                key: "connect",
                value: function(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return this.middleware(o({
                        url: t,
                        data: e,
                        method: "CONNECT"
                    }, n));
                }
            }, {
                key: "head",
                value: function(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return this.middleware(o({
                        url: t,
                        data: e,
                        method: "HEAD"
                    }, n));
                }
            }, {
                key: "options",
                value: function(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return this.middleware(o({
                        url: t,
                        data: e,
                        method: "OPTIONS"
                    }, n));
                }
            }, {
                key: "trace",
                value: function(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return this.middleware(o({
                        url: t,
                        data: e,
                        method: "TRACE"
                    }, n));
                }
            }, {
                key: "upload",
                value: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return e.url = t, e.method = "UPLOAD", this.middleware(e);
                }
            }, {
                key: "download",
                value: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return e.url = t, e.method = "DOWNLOAD", this.middleware(e);
                }
            } ]), t;
        }();
        e.default = g;
    },
    fe81: function(e, n, r) {
        function i(t) {
            return "[object Array]" === s.call(t);
        }
        function o(e, n) {
            if (null !== e && void 0 !== e) if ("object" !== (void 0 === e ? "undefined" : t(e)) && (e = [ e ]), 
            i(e)) for (var r = 0, o = e.length; r < o; r++) n.call(null, e[r], r, e); else for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && n.call(null, e[a], a, e);
        }
        function a() {
            for (var e = {}, n = 0, r = arguments.length; n < r; n++) o(arguments[n], function(n, r) {
                "object" === t(e[r]) && "object" === (void 0 === n ? "undefined" : t(n)) ? e[r] = a(e[r], n) : e[r] = "object" === (void 0 === n ? "undefined" : t(n)) ? a({}, n) : n;
            });
            return e;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.isArray = i, n.isObject = function(e) {
            return null !== e && "object" === (void 0 === e ? "undefined" : t(e));
        }, n.isDate = function(t) {
            return "[object Date]" === s.call(t);
        }, n.isURLSearchParams = function(t) {
            return "undefined" != typeof URLSearchParams && t instanceof URLSearchParams;
        }, n.forEach = o, n.isBoolean = function(t) {
            return "boolean" == typeof t;
        }, n.isPlainObject = function(t) {
            return "[object Object]" === Object.prototype.toString.call(t);
        }, n.deepMerge = a;
        var s = Object.prototype.toString;
    }
} ]);