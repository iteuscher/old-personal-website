! function(e) {
    e.fn.tagSort = function(t) {
        var s = {
            items: ".item-tagsort",
            tagElement: "span",
            tagClassPrefix: !1,
            itemTagsView: !1,
            itemTagsSeperator: " ",
            itemTagsElement: !1,
            sortType: "exclusive",
            fadeTime: 0,
            reset: !1
        };
        t = e.extend(s, t);
        var i = {
            generateTags: function(s) {
                var a = {},
                    n = {
                        pointers: [],
                        tags: []
                    },
                    o = e(document.createElement(t.tagElement));
                return s.each(function(s) {
                    $element = e(this);
                    var r = $element.data("item-tags"),
                        c = r.match(/,\s+/) ? r.split(", ") : r.split(",");
                    e.each(c, function(n, r) {
                        var c = r.toLowerCase();
                        a[c] || (a[c] = [], i.container.append(t.tagClassPrefix !== !1 ? o.clone().text(r).addClass((t.tagClassPrefix + r.toLowerCase()).replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, "")) : o.clone().text(r))), t.itemTagsView !== !1 && (t.itemTagsElement !== !1 ? $element.find(t.itemTagsView).append(e(document.createElement(t.itemTagsElement)).clone().text(r)) : $element.find(t.itemTagsView).append(n > 0 ? t.itemTagsSeperator + r : r)), a[c].push(s)
                    }), "exclusive" == t.sortType && (n.pointers.push(s), n.tags.push(c))
                }), "inclusive" == t.sortType || "single" == t.sortType ? a : "exclusive" == t.sortType ? n : void 0
            },
            exclusiveSort: function(t) {
                var s = [
                    [],
                    []
                ];
                return e.each(t.pointers, function(a, n) {
                    var o = !0;
                    i.container.find(".tagsort-active").each(function(i) {
                        -1 == t.tags[a].indexOf(e(this).text()) && (o = !1, s[0].push(n))
                    }), 1 == o && s[1].push(n)
                }), s
            },
            inclusiveSort: function(t, s) {
                var a = [s, []];
                return i.container.find(".tagsort-active").each(function(s) {
                    e.each(t[e(this).text().toLowerCase()], function(e, t) {
                        a[0].splice(a[0].indexOf(t), 1), a[1].push(t)
                    })
                }), a
            },
            showElements: function(s, i) {
                e.each(s, function(e, s) {
                    i.eq(s).fadeIn(t.fadeTime)
                })
            },
            hideElements: function(s, i) {
                e.each(s, function(e, s) {
                    i.eq(s).fadeOut(t.fadeTime)
                })
            },
            inititalize: function(s) {
                i.container = s;
                for (var a, n = e(t.items), o = [], r = t.reset, c = 0; c < n.length; c++) o.push(c);
                i.tags = i.generateTags(n, i.container);
                var l = i.container.find(t.tagElement);
                l.click(function() {
                    "single" == t.sortType ? e(this).hasClass("tagsort-active") ? e(this).toggleClass("tagsort-active") : (e(".tagsort-active").removeClass("tagsort-active"), e(this).toggleClass("tagsort-active"), a = i.inclusiveSort(i.tags, o.slice())) : (e(this).toggleClass("tagsort-active"), a = "inclusive" == t.sortType ? i.inclusiveSort(i.tags, o.slice()) : i.exclusiveSort(i.tags)), l.hasClass("tagsort-active") || (a = [
                        [], o.slice()
                    ]), a[0].length > 0 && i.hideElements(a[0], n), a[1].length > 0 && i.showElements(a[1], n)
                }), r && e(r).click(function() {
                    e(".tagsort-active").removeClass("tagsort-active"), a = [
                        [], o.slice()
                    ], i.showElements(a[1], n)
                })
            }
        };
        return i.inititalize(this), e(this)
    }
}(jQuery);
