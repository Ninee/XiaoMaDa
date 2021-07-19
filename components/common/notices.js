(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/common/notices" ], {
    "1c3c": function(n, o, t) {
        t.r(o);
        var e = t("2871"), c = t.n(e);
        for (var a in e) "default" !== a && function(n) {
            t.d(o, n, function() {
                return e[n];
            });
        }(a);
        o.default = c.a;
    },
    2871: function(n, o, t) {
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.default = void 0;
        var e = {
            name: "notices",
            props: {
                msgs: {
                    type: Array,
                    default: []
                },
                icon_urls: {
                    type: String,
                    default: "firstPage"
                }
            },
            data: function() {
                return {};
            }
        };
        o.default = e;
    },
    "726a": function(n, o, t) {
        t.d(o, "b", function() {
            return e;
        }), t.d(o, "c", function() {
            return c;
        }), t.d(o, "a", function() {});
        var e = function() {
            var n = this;
            n.$createElement;
            n._self._c;
        }, c = [];
    },
    "92bc": function(n, o, t) {},
    e43d: function(n, o, t) {
        t.r(o);
        var e = t("726a"), c = t("1c3c");
        for (var a in c) "default" !== a && function(n) {
            t.d(o, n, function() {
                return c[n];
            });
        }(a);
        t("fdd8");
        var u = t("f0c5"), r = Object(u.a)(c.default, e.b, e.c, !1, null, null, null, !1, e.a, void 0);
        o.default = r.exports;
    },
    fdd8: function(n, o, t) {
        var e = t("92bc");
        t.n(e).a;
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/common/notices-create-component", {
    "components/common/notices-create-component": function(n, o, t) {
        t("543d").createComponent(t("e43d"));
    }
}, [ [ "components/common/notices-create-component" ] ] ]);