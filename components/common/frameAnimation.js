(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/common/frameAnimation" ], {
    "0cad": function(n, e, t) {
        t.r(e);
        var o = t("78ee"), a = t("4d0b");
        for (var i in a) "default" !== i && function(n) {
            t.d(e, n, function() {
                return a[n];
            });
        }(i);
        t("79c2");
        var c = t("f0c5"), u = Object(c.a)(a.default, o.b, o.c, !1, null, null, null, !1, o.a, void 0);
        e.default = u.exports;
    },
    "4d0b": function(n, e, t) {
        t.r(e);
        var o = t("63a3"), a = t.n(o);
        for (var i in o) "default" !== i && function(n) {
            t.d(e, n, function() {
                return o[n];
            });
        }(i);
        e.default = a.a;
    },
    "63a3": function(n, e, t) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var o = {
            name: "frameAnimation",
            props: {
                url: {
                    type: String,
                    value: ""
                },
                count: {
                    type: String,
                    value: 3
                },
                width: {
                    type: String,
                    value: 360
                },
                height: {
                    type: String,
                    value: 300
                },
                duration: {
                    type: String,
                    value: .3
                },
                playNumber: {
                    type: String,
                    value: "infinite",
                    default: "infinite"
                }
            },
            mounted: function() {
                this.playNumber > 0 && setTimeout(function() {}, this.playNumber * this.duration * 1e3);
            },
            methods: {
                end: function() {
                    console.log("动画结束 ---------------");
                }
            }
        };
        e.default = o;
    },
    "78ee": function(n, e, t) {
        t.d(e, "b", function() {
            return o;
        }), t.d(e, "c", function() {
            return a;
        }), t.d(e, "a", function() {});
        var o = function() {
            var n = this;
            n.$createElement;
            n._self._c;
        }, a = [];
    },
    "79c2": function(n, e, t) {
        var o = t("ac39");
        t.n(o).a;
    },
    ac39: function(n, e, t) {}
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/common/frameAnimation-create-component", {
    "components/common/frameAnimation-create-component": function(n, e, t) {
        t("543d").createComponent(t("0cad"));
    }
}, [ [ "components/common/frameAnimation-create-component" ] ] ]);