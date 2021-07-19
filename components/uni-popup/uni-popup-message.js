(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/uni-popup/uni-popup-message" ], {
    "0f00": function(e, n, t) {
        t.r(n);
        var o = t("3025"), u = t.n(o);
        for (var p in o) "default" !== p && function(e) {
            t.d(n, e, function() {
                return o[e];
            });
        }(p);
        n.default = u.a;
    },
    "2fe6": function(e, n, t) {
        var o = t("3173");
        t.n(o).a;
    },
    3025: function(e, n, t) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var o = {
            name: "UniPopupMessage",
            props: {
                type: {
                    type: String,
                    default: "success"
                },
                message: {
                    type: String,
                    default: ""
                },
                duration: {
                    type: Number,
                    default: 3e3
                }
            },
            inject: [ "popup" ],
            data: function() {
                return {};
            },
            created: function() {
                this.popup.childrenMsg = this;
            },
            methods: {
                open: function() {
                    var e = this;
                    0 !== this.duration && (clearTimeout(this.popuptimer), this.popuptimer = setTimeout(function() {
                        e.popup.close();
                    }, this.duration));
                },
                close: function() {
                    clearTimeout(this.popuptimer);
                }
            }
        };
        n.default = o;
    },
    3173: function(e, n, t) {},
    "47f7": function(e, n, t) {
        t.d(n, "b", function() {
            return o;
        }), t.d(n, "c", function() {
            return u;
        }), t.d(n, "a", function() {});
        var o = function() {
            var e = this;
            e.$createElement;
            e._self._c;
        }, u = [];
    },
    de7f: function(e, n, t) {
        t.r(n);
        var o = t("47f7"), u = t("0f00");
        for (var p in u) "default" !== p && function(e) {
            t.d(n, e, function() {
                return u[e];
            });
        }(p);
        t("2fe6");
        var i = t("f0c5"), a = Object(i.a)(u.default, o.b, o.c, !1, null, "319d6a3f", null, !1, o.a, void 0);
        n.default = a.exports;
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/uni-popup/uni-popup-message-create-component", {
    "components/uni-popup/uni-popup-message-create-component": function(e, n, t) {
        t("543d").createComponent(t("de7f"));
    }
}, [ [ "components/uni-popup/uni-popup-message-create-component" ] ] ]);