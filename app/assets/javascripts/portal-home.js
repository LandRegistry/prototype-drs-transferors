/*! For license information please see main.min.js.LICENSE.txt */
( () => {
    "use strict";
    
    function t(t, e={}) {
        var n;
        const o = t.getAttribute("tabindex");
        function i() {
            var n;
            null == (n = e.onBlur) || n.call(t),
            o || t.removeAttribute("tabindex")
        }
        o || t.setAttribute("tabindex", "-1"),
        t.addEventListener("focus", function() {
            t.addEventListener("blur", i, {
                once: !0
            })
        }, {
            once: !0
        }),
        null == (n = e.onBeforeFocus) || n.call(t),
        t.focus()
    }
    function e(t=document.body) {
        return !!t && t.classList.contains("govuk-frontend-supported")
    }
    function n(t) {
        return !!t && "object" == typeof t && !function(t) {
            return Array.isArray(t)
        }(t)
    }
    function o(t) {
        return !!t && (t instanceof Element || t instanceof Document)
    }
    function i(t, e) {
        return `${t.moduleName}: ${e}`
    }
    class s extends Error {
        constructor(...t) {
            super(...t),
            this.name = "GOVUKFrontendError"
        }
    }
    class r extends s {
        constructor(t=document.body) {
            const e = "noModule" in HTMLScriptElement.prototype ? 'GOV.UK Frontend initialised without `<body class="govuk-frontend-supported">` from template `<script>` snippet' : "GOV.UK Frontend is not supported in this browser";
            super(t ? e : 'GOV.UK Frontend initialised without `<script type="module">`'),
            this.name = "SupportError"
        }
    }
    class c extends s {
        constructor(...t) {
            super(...t),
            this.name = "ConfigError"
        }
    }
    class l extends s {
        constructor(t) {
            let e = "string" == typeof t ? t : "";
            if (n(t)) {
                const {component: n, identifier: o, element: s, expectedType: r} = t;
                e = o,
                e += s ? ` is not of type ${null != r ? r : "HTMLElement"}` : " not found",
                n && (e = i(n, e))
            }
            super(e),
            this.name = "ElementError"
        }
    }
    class a extends s {
        constructor(t) {
            super("string" == typeof t ? t : i(t, "Root element (`$root`) already initialised")),
            this.name = "InitError"
        }
    }
    class d {
        get $root() {
            return this._$root
        }
        constructor(t) {
            this._$root = void 0;
            const e = this.constructor;
            if ("string" != typeof e.moduleName)
                throw new a("`moduleName` not defined in component");
            if (!(t instanceof e.elementType))
                throw new l({
                    element: t,
                    component: e,
                    identifier: "Root element (`$root`)",
                    expectedType: e.elementType.name
                });
            this._$root = t,
            e.checkSupport();
            // * this.checkInitialised();
            const n = e.moduleName;
            this.$root.setAttribute(`data-${n}-init`, "")
        }
        /* checkInitialised() {
            const t = this.constructor
              , e = t.moduleName;
            if (e && function(t, e) {
                return t instanceof HTMLElement && t.hasAttribute(`data-${e}-init`)
            }(this.$root, e))
                throw new a(t)
        } */
        static checkSupport() {
            if (!e())
                throw new r
        }
    }
    d.elementType = HTMLElement;
    const u = Symbol.for("configOverride");
    class h extends d {
        [u](t) {
            return {}
        }
        get config() {
            return this._config
        }
        constructor(t, e) {
            super(t),
            this._config = void 0;
            const o = this.constructor;
            if (!n(o.defaults))
                throw new c(i(o, "Config passed as parameter into constructor but no defaults defined"));
            const s = function(t, e) {
                if (!n(t.schema))
                    throw new c(i(t, "Config passed as parameter into constructor but no schema defined"));
                const o = {}
                  , s = Object.entries(t.schema.properties);
                for (const n of s) {
                    const [i,s] = n
                      , r = i.toString();
                    r in e && (o[r] = m(e[r], s)),
                    "object" === (null == s ? void 0 : s.type) && (o[r] = g(t.schema, e, i))
                }
                return o
            }(o, this._$root.dataset);
            this._config = p(o.defaults, null != e ? e : {}, this[u](s), s)
        }
    }
    function m(t, e) {
        const n = t ? t.trim() : "";
        let o, i = null == e ? void 0 : e.type;
        switch (i || (["true", "false"].includes(n) && (i = "boolean"),
        n.length > 0 && isFinite(Number(n)) && (i = "number")),
        i) {
        case "boolean":
            o = "true" === n;
            break;
        case "number":
            o = Number(n);
            break;
        default:
            o = t
        }
        return o
    }
    function p(...t) {
        const e = {};
        for (const o of t)
            for (const t of Object.keys(o)) {
                const i = e[t]
                  , s = o[t];
                n(i) && n(s) ? e[t] = p(i, s) : e[t] = s
            }
        return e
    }
    function g(t, e, o) {
        const i = t.properties[o];
        if ("object" !== (null == i ? void 0 : i.type))
            return;
        const s = {
            [o]: {}
        };
        for (const [t,i] of Object.entries(e)) {
            let e = s;
            const r = t.split(".");
            for (const [s,c] of r.entries())
                n(e) && (s < r.length - 1 ? (n(e[c]) || (e[c] = {}),
                e = e[c]) : t !== o && (e[c] = m(i)))
        }
        return s[o]
    }
    function f(t, i, s) {
        let c;
        const a = function(t) {
            let e, i = document;
            if (n(t)) {
                const n = t;
                (o(n.scope) || null === n.scope) && (i = n.scope),
                "function" == typeof n.onError && (e = n.onError)
            }
            return o(t) ? i = t : null === t ? i = null : "function" == typeof t && (e = t),
            {
                scope: i,
                onError: e
            }
        }(s);
        try {
            var d;
            if (!e())
                throw new r;
            if (null === a.scope)
                throw new l({
                    element: a.scope,
                    component: t,
                    identifier: "Scope element (`$scope`)"
                });
            c = null == (d = a.scope) ? void 0 : d.querySelectorAll(`[data-module="${t.moduleName}"]`)
        } catch (e) {
            return a.onError ? a.onError(e, {
                component: t,
                config: i
            }) : console.log(e),
            []
        }
        return Array.from(null != c ? c : []).map(e => {
            try {
                return void 0 !== i ? new t(e,i) : new t(e)
            } catch (n) {
                return a.onError ? a.onError(n, {
                    element: e,
                    component: t,
                    config: i
                }) : console.log(n),
                null
            }
        }
        ).filter(Boolean)
    }
    class v {
        constructor(t={}, e={}) {
            var n;
            this.translations = void 0,
            this.locale = void 0,
            this.translations = t,
            this.locale = null != (n = e.locale) ? n : document.documentElement.lang || "en"
        }
        t(t, e) {
            if (!t)
                throw new Error("i18n: lookup key missing");
            let o = this.translations[t];
            if ("number" == typeof (null == e ? void 0 : e.count) && n(o)) {
                const n = o[this.getPluralSuffix(t, e.count)];
                n && (o = n)
            }
            if ("string" == typeof o) {
                if (o.match(/%{(.\S+)}/)) {
                    if (!e)
                        throw new Error("i18n: cannot replace placeholders in string if no option data provided");
                    return this.replacePlaceholders(o, e)
                }
                return o
            }
            return t
        }
        replacePlaceholders(t, e) {
            const n = Intl.NumberFormat.supportedLocalesOf(this.locale).length ? new Intl.NumberFormat(this.locale) : void 0;
            return t.replace(/%{(.\S+)}/g, function(t, o) {
                if (Object.prototype.hasOwnProperty.call(e, o)) {
                    const t = e[o];
                    return !1 === t || "number" != typeof t && "string" != typeof t ? "" : "number" == typeof t ? n ? n.format(t) : `${t}` : t
                }
                throw new Error(`i18n: no data found to replace ${t} placeholder in string`)
            })
        }
        hasIntlPluralRulesSupport() {
            return Boolean("PluralRules" in window.Intl && Intl.PluralRules.supportedLocalesOf(this.locale).length)
        }
        getPluralSuffix(t, e) {
            if (e = Number(e),
            !isFinite(e))
                return "other";
            const o = this.translations[t]
              , i = this.hasIntlPluralRulesSupport() ? new Intl.PluralRules(this.locale).select(e) : "other";
            if (n(o)) {
                if (i in o)
                    return i;
                if ("other" in o)
                    return console.warn(`i18n: Missing plural form ".${i}" for "${this.locale}" locale. Falling back to ".other".`),
                    "other"
            }
            throw new Error(`i18n: Plural form ".other" is required for "${this.locale}" locale`)
        }
    }
    class w extends h {
        constructor(t, e={}) {
            super(t, e),
            this.i18n = void 0,
            this.controlsClass = "govuk-accordion__controls",
            this.showAllClass = "govuk-accordion__show-all",
            this.showAllTextClass = "govuk-accordion__show-all-text",
            this.sectionClass = "govuk-accordion__section",
            this.sectionExpandedClass = "govuk-accordion__section--expanded",
            this.sectionButtonClass = "govuk-accordion__section-button",
            this.sectionHeaderClass = "govuk-accordion__section-header",
            this.sectionHeadingClass = "govuk-accordion__section-heading",
            this.sectionHeadingDividerClass = "govuk-accordion__section-heading-divider",
            this.sectionHeadingTextClass = "govuk-accordion__section-heading-text",
            this.sectionHeadingTextFocusClass = "govuk-accordion__section-heading-text-focus",
            this.sectionShowHideToggleClass = "govuk-accordion__section-toggle",
            this.sectionShowHideToggleFocusClass = "govuk-accordion__section-toggle-focus",
            this.sectionShowHideTextClass = "govuk-accordion__section-toggle-text",
            this.upChevronIconClass = "govuk-accordion-nav__chevron",
            this.downChevronIconClass = "govuk-accordion-nav__chevron--down",
            this.sectionSummaryClass = "govuk-accordion__section-summary",
            this.sectionSummaryFocusClass = "govuk-accordion__section-summary-focus",
            this.sectionContentClass = "govuk-accordion__section-content",
            this.$sections = void 0,
            this.$showAllButton = null,
            this.$showAllIcon = null,
            this.$showAllText = null,
            this.i18n = new v(this.config.i18n);
            const n = this.$root.querySelectorAll(`.${this.sectionClass}`);
            if (!n.length)
                throw new l({
                    component: w,
                    identifier: `Sections (\`<div class="${this.sectionClass}">\`)`
                });
            this.$sections = n,
            this.initControls(),
            this.initSectionHeaders(),
            this.updateShowAllButton(this.areAllSectionsOpen())
        }
        initControls() {
            this.$showAllButton = document.createElement("button"),
            this.$showAllButton.setAttribute("type", "button"),
            this.$showAllButton.setAttribute("class", this.showAllClass),
            this.$showAllButton.setAttribute("aria-expanded", "false"),
            this.$showAllIcon = document.createElement("span"),
            this.$showAllIcon.classList.add(this.upChevronIconClass),
            this.$showAllButton.appendChild(this.$showAllIcon);
            const t = document.createElement("div");
            t.setAttribute("class", this.controlsClass),
            t.appendChild(this.$showAllButton),
            this.$root.insertBefore(t, this.$root.firstChild),
            this.$showAllText = document.createElement("span"),
            this.$showAllText.classList.add(this.showAllTextClass),
            this.$showAllButton.appendChild(this.$showAllText),
            this.$showAllButton.addEventListener("click", () => this.onShowOrHideAllToggle()),
            "onbeforematch" in document && document.addEventListener("beforematch", t => this.onBeforeMatch(t))
        }
        initSectionHeaders() {
            this.$sections.forEach( (t, e) => {
                const n = t.querySelector(`.${this.sectionHeaderClass}`);
                if (!n)
                    throw new l({
                        component: w,
                        identifier: `Section headers (\`<div class="${this.sectionHeaderClass}">\`)`
                    });
                this.constructHeaderMarkup(n, e),
                this.setExpanded(this.isExpanded(t), t),
                n.addEventListener("click", () => this.onSectionToggle(t)),
                this.setInitialState(t)
            }
            )
        }
        constructHeaderMarkup(t, e) {
            const n = t.querySelector(`.${this.sectionButtonClass}`)
              , o = t.querySelector(`.${this.sectionHeadingClass}`)
              , i = t.querySelector(`.${this.sectionSummaryClass}`);
            if (!o)
                throw new l({
                    component: w,
                    identifier: `Section heading (\`.${this.sectionHeadingClass}\`)`
                });
            if (!n)
                throw new l({
                    component: w,
                    identifier: `Section button placeholder (\`<span class="${this.sectionButtonClass}">\`)`
                });
            const s = document.createElement("button");
            s.setAttribute("type", "button"),
            s.setAttribute("aria-controls", `${this.$root.id}-content-${e + 1}`);
            for (const t of Array.from(n.attributes))
                "id" !== t.name && s.setAttribute(t.name, t.value);
            const r = document.createElement("span");
            r.classList.add(this.sectionHeadingTextClass),
            r.id = n.id;
            const c = document.createElement("span");
            c.classList.add(this.sectionHeadingTextFocusClass),
            r.appendChild(c),
            Array.from(n.childNodes).forEach(t => c.appendChild(t));
            const a = document.createElement("span");
            a.classList.add(this.sectionShowHideToggleClass),
            a.setAttribute("data-nosnippet", "");
            const d = document.createElement("span");
            d.classList.add(this.sectionShowHideToggleFocusClass),
            a.appendChild(d);
            const u = document.createElement("span")
              , h = document.createElement("span");
            if (h.classList.add(this.upChevronIconClass),
            d.appendChild(h),
            u.classList.add(this.sectionShowHideTextClass),
            d.appendChild(u),
            s.appendChild(r),
            s.appendChild(this.getButtonPunctuationEl()),
            i) {
                const t = document.createElement("span")
                  , e = document.createElement("span");
                e.classList.add(this.sectionSummaryFocusClass),
                t.appendChild(e);
                for (const e of Array.from(i.attributes))
                    t.setAttribute(e.name, e.value);
                Array.from(i.childNodes).forEach(t => e.appendChild(t)),
                i.remove(),
                s.appendChild(t),
                s.appendChild(this.getButtonPunctuationEl())
            }
            s.appendChild(a),
            o.removeChild(n),
            o.appendChild(s)
        }
        onBeforeMatch(t) {
            const e = t.target;
            if (!(e instanceof Element))
                return;
            const n = e.closest(`.${this.sectionClass}`);
            n && this.setExpanded(!0, n)
        }
        onSectionToggle(t) {
            const e = !this.isExpanded(t);
            this.setExpanded(e, t),
            this.storeState(t, e)
        }
        onShowOrHideAllToggle() {
            const t = !this.areAllSectionsOpen();
            this.$sections.forEach(e => {
                this.setExpanded(t, e),
                this.storeState(e, t)
            }
            ),
            this.updateShowAllButton(t)
        }
        setExpanded(t, e) {
            const n = e.querySelector(`.${this.upChevronIconClass}`)
              , o = e.querySelector(`.${this.sectionShowHideTextClass}`)
              , i = e.querySelector(`.${this.sectionButtonClass}`)
              , s = e.querySelector(`.${this.sectionContentClass}`);
            if (!s)
                throw new l({
                    component: w,
                    identifier: `Section content (\`<div class="${this.sectionContentClass}">\`)`
                });
            if (!n || !o || !i)
                return;
            const r = t ? this.i18n.t("hideSection") : this.i18n.t("showSection");
            o.textContent = r,
            i.setAttribute("aria-expanded", `${t}`);
            const c = []
              , a = e.querySelector(`.${this.sectionHeadingTextClass}`);
            a && c.push(a.textContent.trim());
            const d = e.querySelector(`.${this.sectionSummaryClass}`);
            d && c.push(d.textContent.trim());
            const u = t ? this.i18n.t("hideSectionAriaLabel") : this.i18n.t("showSectionAriaLabel");
            c.push(u),
            i.setAttribute("aria-label", c.join(" , ")),
            t ? (s.removeAttribute("hidden"),
            e.classList.add(this.sectionExpandedClass),
            n.classList.remove(this.downChevronIconClass)) : (s.setAttribute("hidden", "until-found"),
            e.classList.remove(this.sectionExpandedClass),
            n.classList.add(this.downChevronIconClass)),
            this.updateShowAllButton(this.areAllSectionsOpen())
        }
        isExpanded(t) {
            return t.classList.contains(this.sectionExpandedClass)
        }
        areAllSectionsOpen() {
            return Array.from(this.$sections).every(t => this.isExpanded(t))
        }
        updateShowAllButton(t) {
            this.$showAllButton && this.$showAllText && this.$showAllIcon && (this.$showAllButton.setAttribute("aria-expanded", t.toString()),
            this.$showAllText.textContent = t ? this.i18n.t("hideAllSections") : this.i18n.t("showAllSections"),
            this.$showAllIcon.classList.toggle(this.downChevronIconClass, !t))
        }
        getIdentifier(t) {
            const e = t.querySelector(`.${this.sectionButtonClass}`);
            return null == e ? void 0 : e.getAttribute("aria-controls")
        }
        storeState(t, e) {
            if (!this.config.rememberExpanded)
                return;
            const n = this.getIdentifier(t);
            if (n)
                try {
                    window.sessionStorage.setItem(n, e.toString())
                } catch (t) {}
        }
        setInitialState(t) {
            if (!this.config.rememberExpanded)
                return;
            const e = this.getIdentifier(t);
            if (e)
                try {
                    const n = window.sessionStorage.getItem(e);
                    null !== n && this.setExpanded("true" === n, t)
                } catch (t) {}
        }
        getButtonPunctuationEl() {
            const t = document.createElement("span");
            return t.classList.add("govuk-visually-hidden", this.sectionHeadingDividerClass),
            t.textContent = ", ",
            t
        }
    }
    w.moduleName = "govuk-accordion",
    w.defaults = Object.freeze({
        i18n: {
            hideAllSections: "Hide all sections",
            hideSection: "Hide",
            hideSectionAriaLabel: "Hide this section",
            showAllSections: "Show all sections",
            showSection: "Show",
            showSectionAriaLabel: "Show this section"
        },
        rememberExpanded: !0
    }),
    w.schema = Object.freeze({
        properties: {
            i18n: {
                type: "object"
            },
            rememberExpanded: {
                type: "boolean"
            }
        }
    });
    class b extends h {
        constructor(t, e={}) {
            super(t, e),
            this.debounceFormSubmitTimer = null,
            this.$root.addEventListener("keydown", t => this.handleKeyDown(t)),
            this.$root.addEventListener("click", t => this.debounce(t))
        }
        handleKeyDown(t) {
            const e = t.target;
            " " === t.key && e instanceof HTMLElement && "button" === e.getAttribute("role") && (t.preventDefault(),
            e.click())
        }
        debounce(t) {
            if (this.config.preventDoubleClick)
                return this.debounceFormSubmitTimer ? (t.preventDefault(),
                !1) : void (this.debounceFormSubmitTimer = window.setTimeout( () => {
                    this.debounceFormSubmitTimer = null
                }
                , 1e3))
        }
    }
    b.moduleName = "govuk-button",
    b.defaults = Object.freeze({
        preventDoubleClick: !1
    }),
    b.schema = Object.freeze({
        properties: {
            preventDoubleClick: {
                type: "boolean"
            }
        }
    });
    class E extends h {
        constructor(e, n={}) {
            super(e, n),
            this.config.disableAutoFocus || t(this.$root),
            this.$root.addEventListener("click", t => this.handleClick(t))
        }
        handleClick(t) {
            const e = t.target;
            e && this.focusTarget(e) && t.preventDefault()
        }
        focusTarget(t) {
            if (!(t instanceof HTMLAnchorElement))
                return !1;
            const e = t.hash.replace("#", "");
            if (!e)
                return !1;
            const n = document.getElementById(e);
            if (!n)
                return !1;
            const o = this.getAssociatedLegendOrLabel(n);
            return !!o && (o.scrollIntoView(),
            n.focus({
                preventScroll: !0
            }),
            !0)
        }
        getAssociatedLegendOrLabel(t) {
            var e;
            const n = t.closest("fieldset");
            if (n) {
                const e = n.getElementsByTagName("legend");
                if (e.length) {
                    const n = e[0];
                    if (t instanceof HTMLInputElement && ("checkbox" === t.type || "radio" === t.type))
                        return n;
                    const o = n.getBoundingClientRect().top
                      , i = t.getBoundingClientRect();
                    if (i.height && window.innerHeight && i.top + i.height - o < window.innerHeight / 2)
                        return n
                }
            }
            return null != (e = document.querySelector(`label[for='${t.getAttribute("id")}']`)) ? e : t.closest("label")
        }
    }
    E.moduleName = "govuk-error-summary",
    E.defaults = Object.freeze({
        disableAutoFocus: !1
    }),
    E.schema = Object.freeze({
        properties: {
            disableAutoFocus: {
                type: "boolean"
            }
        }
    });
    class y extends h {
        constructor(e, n={}) {
            super(e, n),
            "alert" !== this.$root.getAttribute("role") || this.config.disableAutoFocus || t(this.$root)
        }
    }
    y.moduleName = "govuk-notification-banner",
    y.defaults = Object.freeze({
        disableAutoFocus: !1
    }),
    y.schema = Object.freeze({
        properties: {
            disableAutoFocus: {
                type: "boolean"
            }
        }
    });
    class A extends d {
        constructor(t) {
            super(t),
            this.$inputs = void 0;
            const e = this.$root.querySelectorAll('input[type="radio"]');
            if (!e.length)
                throw new l({
                    component: A,
                    identifier: 'Form inputs (`<input type="radio">`)'
                });
            this.$inputs = e,
            this.$inputs.forEach(t => {
                const e = t.getAttribute("data-aria-controls");
                if (e) {
                    if (!document.getElementById(e))
                        throw new l({
                            component: A,
                            identifier: `Conditional reveal (\`id="${e}"\`)`
                        });
                    t.setAttribute("aria-controls", e),
                    t.removeAttribute("data-aria-controls")
                }
            }
            ),
            window.addEventListener("pageshow", () => this.syncAllConditionalReveals()),
            this.syncAllConditionalReveals(),
            this.$root.addEventListener("click", t => this.handleClick(t))
        }
        syncAllConditionalReveals() {
            this.$inputs.forEach(t => this.syncConditionalRevealWithInputState(t))
        }
        syncConditionalRevealWithInputState(t) {
            const e = t.getAttribute("aria-controls");
            if (!e)
                return;
            const n = document.getElementById(e);
            if (null != n && n.classList.contains("govuk-radios__conditional")) {
                const e = t.checked;
                t.setAttribute("aria-expanded", e.toString()),
                n.classList.toggle("govuk-radios__conditional--hidden", !e)
            }
        }
        handleClick(t) {
            const e = t.target;
            if (!(e instanceof HTMLInputElement) || "radio" !== e.type)
                return;
            const n = document.querySelectorAll('input[type="radio"][aria-controls]')
              , o = e.form
              , i = e.name;
            n.forEach(t => {
                const e = t.form === o;
                t.name === i && e && this.syncConditionalRevealWithInputState(t)
            }
            )
        }
    }
    A.moduleName = "govuk-radios";
    class k extends d {
        constructor(t) {
            super(t),
            this.$menuButton = void 0,
            this.$menu = void 0,
            this.menuIsOpen = !1,
            this.mql = null;
            const e = this.$root.querySelector(".govuk-js-service-navigation-toggle");
            if (!e)
                return this;
            const n = e.getAttribute("aria-controls");
            if (!n)
                throw new l({
                    component: k,
                    identifier: 'Navigation button (`<button class="govuk-js-service-navigation-toggle">`) attribute (`aria-controls`)'
                });
            const o = document.getElementById(n);
            if (!o)
                throw new l({
                    component: k,
                    element: o,
                    identifier: `Navigation (\`<ul id="${n}">\`)`
                });
            this.$menu = o,
            this.$menuButton = e,
            this.setupResponsiveChecks(),
            this.$menuButton.addEventListener("click", () => this.handleMenuButtonClick())
        }
        setupResponsiveChecks() {
            const t = function() {
                const t = "--govuk-breakpoint-tablet";
                return {
                    property: t,
                    value: window.getComputedStyle(document.documentElement).getPropertyValue(t) || void 0
                }
            }();
            if (!t.value)
                throw new l({
                    component: k,
                    identifier: `CSS custom property (\`${t.property}\`) on pseudo-class \`:root\``
                });
            this.mql = window.matchMedia(`(min-width: ${t.value})`),
            "addEventListener" in this.mql ? this.mql.addEventListener("change", () => this.checkMode()) : this.mql.addListener( () => this.checkMode()),
            this.checkMode()
        }
        checkMode() {
            this.mql && this.$menu && this.$menuButton && (this.mql.matches ? (this.$menu.removeAttribute("hidden"),
            function(t, e) {
                for (const n in e)
                    t.setAttribute(n, e[n])
            }(this.$menuButton, C)) : (function(t, e) {
                for (const n of e)
                    t.removeAttribute(n)
            }(this.$menuButton, Object.keys(C)),
            this.$menuButton.setAttribute("aria-expanded", this.menuIsOpen.toString()),
            this.menuIsOpen ? this.$menu.removeAttribute("hidden") : this.$menu.setAttribute("hidden", "")))
        }
        handleMenuButtonClick() {
            this.menuIsOpen = !this.menuIsOpen,
            this.checkMode()
        }
    }
    k.moduleName = "govuk-service-navigation";
    const C = {
        hidden: "",
        "aria-hidden": "true"
    };
    class S extends d {
        constructor(e) {
            var n;
            super(e);
            const o = this.$root.hash
              , i = null != (n = this.$root.getAttribute("href")) ? n : "";
            if (this.$root.origin !== window.location.origin || this.$root.pathname !== window.location.pathname)
                return;
            const s = o.replace("#", "");
            if (!s)
                throw new l(`Skip link: Target link (\`href="${i}"\`) has no hash fragment`);
            const r = document.getElementById(s);
            if (!r)
                throw new l({
                    component: S,
                    element: r,
                    identifier: `Target content (\`id="${s}"\`)`
                });
            this.$root.addEventListener("click", () => t(r, {
                onBeforeFocus() {
                    r.classList.add("govuk-skip-link-focused-element")
                },
                onBlur() {
                    r.classList.remove("govuk-skip-link-focused-element")
                }
            }))
        }
    }
    S.elementType = HTMLAnchorElement,
    S.moduleName = "govuk-skip-link",
    f(w),
    f(b),
    f(E),
    f(y),
    f(A),
    f(k),
    f(S),
    document.addEventListener("DOMContentLoaded", () => {
        const t = () => window.matchMedia("(min-width: 641px)").matches;
        document.querySelectorAll(".portal-dropdown__toggle").forEach(e => {
            const n = document.getElementById(e.getAttribute("aria-controls"));
            if (!n)
                return;
            const o = e.closest(".portal-dropdown");
            if (!o)
                return;
            const i = () => {
                e.setAttribute("aria-expanded", "false"),
                n.hidden = !0
            }
            ;
            e.addEventListener("click", () => {
                const t = "true" === e.getAttribute("aria-expanded");
                e.setAttribute("aria-expanded", String(!t)),
                n.hidden = t,
                t || (e.getBoundingClientRect().left + 250 > window.innerWidth ? o.classList.add("portal-dropdown--align-right") : o.classList.remove("portal-dropdown--align-right"))
            }
            ),
            document.addEventListener("click", e => {
                o.contains(e.target) || !t() && e.target.closest(".portal-dropdown") || i()
            }
            ),
            document.addEventListener("focusin", e => {
                if (!t())
                    return;
                const n = e.target.closest(".govuk-service-navigation__item");
                n && n.parentElement === o.parentElement && !o.contains(n) && i()
            }
            ),
            document.addEventListener("keydown", t => {
                "Escape" === t.key && o.contains(document.activeElement) && "true" === e.getAttribute("aria-expanded") && (i(),
                e.focus())
            }
            )
        }
        ),
        window.addEventListener("pagehide", () => {
            document.querySelectorAll(".portal-dropdown__toggle").forEach(t => {
                const e = document.getElementById(t.getAttribute("aria-controls"));
                e && (t.setAttribute("aria-expanded", "false"),
                e.hidden = !0)
            }
            )
        }
        )
    }
    ),
    document.addEventListener("DOMContentLoaded", () => {
        const t = document.querySelector(".portal-services");
        if (!t)
            return;
        const e = () => window.matchMedia("(min-width: 641px)").matches
          , n = t => document.getElementById(t.getAttribute("aria-controls"))
          , o = t => {
            const e = n(t);
            e && (t.setAttribute("aria-expanded", "false"),
            e.hidden = !0)
        }
          , i = e => {
            const n = e.closest("ul");
            n && t.querySelectorAll(".portal-services__submenu-toggle").forEach(t => {
                t !== e && t.closest("ul") === n && o(t)
            }
            )
        }
        ;
        t.addEventListener("click", s => {
            if (s.target.closest(".portal-services__toggle"))
                return void t.querySelectorAll(".portal-services__submenu-toggle").forEach(o);
            const r = s.target.closest(".portal-services__submenu-toggle");
            if (!r)
                return;
            const c = n(r);
            if (!c)
                return;
            const l = "true" === r.getAttribute("aria-expanded");
            e() && i(r),
            r.setAttribute("aria-expanded", String(!l)),
            c.hidden = l
        }
        ),
        t.addEventListener("focusin", n => {
            if (!e())
                return;
            const s = n.target.closest(".portal-services__submenu-toggle");
            if (s)
                return void i(s);
            const r = n.target.closest(".portal-services__link");
            if (!r)
                return;
            const c = r.closest("ul");
            c && t.querySelectorAll(".portal-services__submenu-toggle").forEach(t => {
                t.closest("ul") === c && o(t)
            }
            )
        }
        ),
        window.addEventListener("pagehide", () => {
            t.querySelectorAll(".portal-services__submenu-toggle").forEach(o)
        }
        )
    }
    ),
    window.addEventListener("load", function() {
        const t = window.google_tag_manager
          , e = document.getElementById("r2rLink")
          , n = document.querySelector(".portal-user-details__toggle")
          , o = document.querySelectorAll("#services-menu > .portal-services__item > .portal-services__link")
          , i = Array.from(o).find(t => "Reply to Requisition" === t.textContent.trim());
        e && e.addEventListener("click", function() {
            t && gtag("event", "r2rLinkClick", {
                event_label: "r2rLinkHomepage"
            })
        }),
        i && i.addEventListener("click", function() {
            t && gtag("event", "r2rservicesHomeBtnClick", {
                event_label: "r2rservicesHome",
                event_category: "r2rservices"
            })
        }),
        n && n.addEventListener("click", function() {
            t && "true" === n.getAttribute("aria-expanded") && gtag("event", "UserDetailMenuBtnClick", {
                event_label: "UserDetailMenuBtn",
                event_category: "UserDetailMenu"
            })
        })
    });
    const $ = document.getElementById("form-error-data");
    if ($) {
        const t = JSON.parse($.innerHTML)
          , e = $.getAttribute("data-form-name");
        t.forEach(t => {
            t.errors.forEach(n => {
                window.gtag("event", `${e} : ${t.name}`, {
                    event_category: "FormValidation"
                })
            }
            )
        }
        )
    }
    window.onload = function() {
        const t = window.google_tag_manager;
        function e(e) {
            if (!t)
                return;
            const n = e.target;
            gtag("event", "newsItemLinkSelected", {
                event_category: "newsItems",
                event_label: n.dataset.articleLabel,
                event_url: n.href
            })
        }
        document.querySelectorAll(".js-select-article-link").forEach(t => {
            t.addEventListener("click", e)
        }
        )
    }
    ,
    window.addEventListener("load", function() {
        const t = window.google_tag_manager
          , e = document.getElementById("req-va-summary-link");
        null !== e && e.addEventListener("click", function() {
            t && gtag("event", "requisitionVASummaryClick", {
                event_label: "reqVASummary"
            })
        })
    });
    class L {
        constructor(t) {
            this.container = t,
            this.trigger = t.querySelector("[data-tooltip-trigger]"),
            this.tooltip = t.querySelector("[role=tooltip]"),
            this.globalEscapeBound = this.globalEscape.bind(this),
            this.globalPointerDownBound = this.globalPointerDown.bind(this),
            this.bindEvents()
        }
        openTooltip() {
            this.showTooltip(),
            this.attachGlobalListener()
        }
        closeTooltip() {
            this.hideTooltip(),
            this.removeGlobalListener()
        }
        bindEvents() {
            this.container.addEventListener("mouseenter", this.openTooltip.bind(this), {
                passive: !1
            }),
            this.container.addEventListener("touchstart", this.openTooltip.bind(this), {
                passive: !1
            }),
            this.trigger.addEventListener("focus", this.openTooltip.bind(this), {
                passive: !1
            }),
            this.container.addEventListener("mouseleave", this.closeTooltip.bind(this), {
                passive: !1
            }),
            this.trigger.addEventListener("blur", this.closeTooltip.bind(this), {
                passive: !1
            })
        }
        attachGlobalListener() {
            document.addEventListener("keydown", this.globalEscapeBound, {
                passive: !1
            }),
            document.addEventListener("pointerdown", this.globalPointerDownBound, {
                passive: !1
            })
        }
        removeGlobalListener() {
            document.removeEventListener("keydown", this.globalEscapeBound, {
                passive: !1
            }),
            document.removeEventListener("pointerdown", this.globalPointerDownBound, {
                passive: !1
            })
        }
        globalEscape(t) {
            "Escape" !== t.key && "Esc" !== t.key || this.closeTooltip()
        }
        globalPointerDown(t) {
            switch (t.target) {
            case this.container:
            case this.trigger:
            case this.tooltip:
                t.preventDefault();
                break;
            default:
                this.closeTooltip(),
                this.trigger.blur()
            }
        }
        showTooltip() {
            this.tooltip.classList.remove("tooltip--hidden")
        }
        hideTooltip() {
            this.tooltip.classList.add("tooltip--hidden")
        }
    }
    Array.from(document.querySelectorAll(".tooltip-container")).forEach(t => new L(t));
    const _ = document.getElementById("editServicesButton")
      , x = document.getElementById("editServicesForm")
      , B = document.getElementById("currentServices");
    document.getElementsByClassName("govuk-error-summary").length > 0 && null !== x && (B.classList.add("is-hidden"),
    x.classList.add("is-visible"));
    null !== _ && _.addEventListener("click", t => {
        t.preventDefault(),
        B.classList.toggle("is-hidden"),
        B.toggleAttribute("hidden"),
        x.classList.toggle("is-visible"),
        x.toggleAttribute("hidden")
    }
    )
}
)();
//# sourceMappingURL=main.min.js.map?bee402864980326b0bd9
