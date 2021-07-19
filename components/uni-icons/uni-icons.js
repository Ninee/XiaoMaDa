(global.webpackJsonp = global.webpackJsonp || []).push([ [ "components/uni-icons/uni-icons" ], {
    "19e0": function(n, e, t) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var o = function(n) {
            return n && n.__esModule ? n : {
                default: n
            };
        }(t("5786")), c = {
            name: "UniIcons",
            props: {
                type: {
                    type: String,
                    default: ""
                },
                color: {
                    type: String,
                    default: "#333333"
                },
                size: {
                    type: [ Number, String ],
                    default: 16
                }
            },
            data: function() {
                return {
                    icons: o.default
                };
            },
            methods: {
                _onClick: function() {
                    this.$emit("click");
                }
            }
        };
        e.default = c;
    },
    "1de5": function(n, e, t) {},
    "9d35": function(n, e, t) {
        t.d(e, "b", function() {
            return o;
        }), t.d(e, "c", function() {
            return c;
        }), t.d(e, "a", function() {});
        var o = function() {
            var n = this;
            n.$createElement;
            n._self._c;
        }, c = [];
    },
    b15d: function(n, e, t) {
        t.r(e);
        var o = t("19e0"), c = t.n(o);
        for (var u in o) "default" !== u && function(n) {
            t.d(e, n, function() {
                return o[n];
            });
        }(u);
        e.default = c.a;
    },
    bbf0: function(n, e, t) {
        var o = t("1de5");
        t.n(o).a;
    },
    f639: function(n, e, t) {
        t.r(e);
        var o = t("9d35"), c = t("b15d");
        for (var u in c) "default" !== u && function(n) {
            t.d(e, n, function() {
                return c[n];
            });
        }(u);
        t("bbf0");
        var i = t("f0c5"), a = Object(i.a)(c.default, o.b, o.c, !1, null, "5b29356a", null, !1, o.a, void 0);
        e.default = a.exports;
    }
} ]), (global.webpackJsonp = global.webpackJsonp || []).push([ "components/uni-icons/uni-icons-create-component", {
    "components/uni-icons/uni-icons-create-component": function(n, e, t) {
        t("543d").createComponent(t("f639"));
    }
}, [ [ "components/uni-icons/uni-icons-create-component" ] ] ]);