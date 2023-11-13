/*! jQuery Validation Plugin - v1.15.0 - 2/24/2016
 * http://jqueryvalidation.org/
 * Copyright (c) 2016 Jörn Zaefferer; Licensed MIT */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
    a.extend(a.fn, {
        validate: function(b) {
            if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var c = a.data(this[0], "validator");
            return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function(b) {
                c.settings.submitHandler && (c.submitButton = b.target), a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0)
            }), this.on("submit.validate", function(b) {
                function d() {
                    var d, e;
                    return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), e = c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), void 0 !== e ? e : !1) : !0
                }
                return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
            })), c)
        },
        valid: function() {
            var b, c, d;
            return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function() {
                b = c.element(this) && b, b || (d = d.concat(c.errorList))
            }), c.errorList = d), b
        },
        rules: function(b, c) {
            if (this.length) {
                var d, e, f, g, h, i, j = this[0];
                if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                    case "add":
                        a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                        break;
                    case "remove":
                        return c ? (i = {}, a.each(c.split(/\s/), function(b, c) {
                            i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required")
                        }), i) : (delete e[j.name], f)
                }
                return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({
                    required: h
                }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, {
                    remote: h
                })), g
            }
        }
    }), a.extend(a.expr[":"], {
        blank: function(b) {
            return !a.trim("" + a(b).val())
        },
        filled: function(b) {
            var c = a(b).val();
            return null !== c && !!a.trim("" + c)
        },
        unchecked: function(b) {
            return !a(b).prop("checked")
        }
    }), a.validator = function(b, c) {
        this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init()
    }, a.validator.format = function(b, c) {
        return 1 === arguments.length ? function() {
            var c = a.makeArray(arguments);
            return c.unshift(b), a.validator.format.apply(this, c)
        } : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() {
                return c
            })
        }), b)
    }, a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(a) {
                this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)))
            },
            onfocusout: function(a) {
                this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a)
            },
            onkeyup: function(b, c) {
                var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === c.which && "" === this.elementValue(b) || -1 !== a.inArray(c.keyCode, d) || (b.name in this.submitted || b.name in this.invalid) && this.element(b)
            },
            onclick: function(a) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
            },
            highlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d)
            },
            unhighlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d)
            }
        },
        setDefaults: function(b) {
            a.extend(a.validator.defaults, b)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}."),
            step: a.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function b(b) {
                    var c = a.data(this.form, "validator"),
                        d = "on" + b.type.replace(/^validate/, ""),
                        e = c.settings;
                    e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b)
                }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var c, d = this.groups = {};
                a.each(this.settings.groups, function(b, c) {
                    "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) {
                        d[c] = b
                    })
                }), c = this.settings.rules, a.each(c, function(b, d) {
                    c[b] = a.validator.normalizeRule(d)
                }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                return this.valid()
            },
            element: function(b) {
                var c, d, e = this.clean(b),
                    f = this.validationTargetFor(e),
                    g = this,
                    h = !0;
                return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function(a, b) {
                    b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a))), e && e.name in g.invalid && (g.currentElements.push(e), h = h && g.check(e)))
                }), c = this.check(f) !== !1, h = h && c, c ? this.invalid[f.name] = !1 : this.invalid[f.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h
            },
            showErrors: function(b) {
                if (b) {
                    var c = this;
                    a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function(a, b) {
                        return {
                            message: a,
                            element: c.findByName(b)[0]
                        }
                    }), this.successList = a.grep(this.successList, function(a) {
                        return !(a.name in b)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(b)
            },
            resetElements: function(a) {
                var b;
                if (this.settings.unhighlight)
                    for (b = 0; a[b]; b++) this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);
                else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(a) {
                var b, c = 0;
                for (b in a) a[b] && c++;
                return c
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(a) {
                a.not(this.containers).text(""), this.addWrapper(a).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (b) {}
            },
            findLastActive: function() {
                var b = this.lastActive;
                return b && 1 === a.grep(this.errorList, function(a) {
                    return a.element.name === b.name
                }).length && b
            },
            elements: function() {
                var b = this,
                    c = {};
                return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    var d = this.name || a(this).attr("name");
                    return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0]), d in c || !b.objectLength(a(this).rules()) ? !1 : (c[d] = !0, !0)
                })
            },
            clean: function(b) {
                return a(b)[0]
            },
            errors: function() {
                var b = this.settings.errorClass.split(" ").join(".");
                return a(this.settings.errorElement + "." + b, this.errorContext)
            },
            resetInternals: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([])
            },
            reset: function() {
                this.resetInternals(), this.currentElements = a([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(a) {
                this.reset(), this.toHide = this.errorsFor(a)
            },
            elementValue: function(b) {
                var c, d, e = a(b),
                    f = b.type;
                return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && "undefined" != typeof b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = b.hasAttribute("contenteditable") ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/"), d >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c)) : "string" == typeof c ? c.replace(/\r/g, "") : c)
            },
            check: function(b) {
                b = this.validationTargetFor(this.clean(b));
                var c, d, e, f = a(b).rules(),
                    g = a.map(f, function(a, b) {
                        return b
                    }).length,
                    h = !1,
                    i = this.elementValue(b);
                if ("function" == typeof f.normalizer) {
                    if (i = f.normalizer.call(b, i), "string" != typeof i) throw new TypeError("The normalizer should return a string value.");
                    delete f.normalizer
                }
                for (d in f) {
                    e = {
                        method: d,
                        parameters: f[d]
                    };
                    try {
                        if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) {
                            h = !0;
                            continue
                        }
                        if (h = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b)));
                        if (!c) return this.formatAndAdd(b, e), !1
                    } catch (j) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j instanceof TypeError && (j.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), j
                    }
                }
                if (!h) return this.objectLength(f) && this.successList.push(b), !0
            },
            customDataMessage: function(b, c) {
                return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg")
            },
            customMessage: function(a, b) {
                var c = this.settings.messages[a];
                return c && (c.constructor === String ? c : c[b])
            },
            findDefined: function() {
                for (var a = 0; a < arguments.length; a++)
                    if (void 0 !== arguments[a]) return arguments[a]
            },
            defaultMessage: function(b, c) {
                var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"),
                    e = /\$?\{(\d+)\}/g;
                return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d
            },
            formatAndAdd: function(a, b) {
                var c = this.defaultMessage(a, b);
                this.errorList.push({
                    message: c,
                    element: a,
                    method: b.method
                }), this.errorMap[a.name] = c, this.submitted[a.name] = c
            },
            addWrapper: function(a) {
                return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
            },
            defaultShowErrors: function() {
                var a, b, c;
                for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight)
                    for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return a(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(b, c) {
                var d, e, f, g, h = this.errorsFor(b),
                    i = this.idOrName(b),
                    j = a(b).attr("aria-describedby");
                h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), e = this.groups[b.name], e && (g = this, a.each(g.groups, function(b, c) {
                    c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id"))
                })))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h)
            },
            errorsFor: function(b) {
                var c = this.escapeCssMeta(this.idOrName(b)),
                    d = a(b).attr("aria-describedby"),
                    e = "label[for='" + c + "'], label[for='" + c + "'] *";
                return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e)
            },
            escapeCssMeta: function(a) {
                return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1")
            },
            idOrName: function(a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
            },
            validationTargetFor: function(b) {
                return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0]
            },
            checkable: function(a) {
                return /radio|checkbox/i.test(a.type)
            },
            findByName: function(b) {
                return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']")
            },
            getLength: function(b, c) {
                switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                }
                return b.length
            },
            depend: function(a, b) {
                return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0
            },
            dependTypes: {
                "boolean": function(a) {
                    return a
                },
                string: function(b, c) {
                    return !!a(b, c.form).length
                },
                "function": function(a, b) {
                    return a(b)
                }
            },
            optional: function(b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
            },
            startRequest: function(b) {
                this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0)
            },
            stopRequest: function(b, c) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(b, c) {
                return a.data(b, "previousValue") || a.data(b, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(b, {
                        method: c
                    })
                })
            },
            destroy: function() {
                this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(b, c) {
            b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
        },
        classRules: function(b) {
            var c = {},
                d = a(b).attr("class");
            return d && a.each(d.split(" "), function() {
                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
            }), c
        },
        normalizeAttributeRule: function(a, b, c, d) {
            /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0)
        },
        attributeRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d);
            return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e
        },
        dataRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d);
            return e
        },
        staticRules: function(b) {
            var c = {},
                d = a.data(b.form, "validator");
            return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
        },
        normalizeRules: function(b, c) {
            return a.each(b, function(d, e) {
                if (e === !1) return void delete b[d];
                if (e.param || e.depends) {
                    var f = !0;
                    switch (typeof e.depends) {
                        case "string":
                            f = !!a(e.depends, c.form).length;
                            break;
                        case "function":
                            f = e.depends.call(c, c)
                    }
                    f ? b[d] = void 0 !== e.param ? e.param : !0 : (a.data(c.form, "validator").resetElements(a(c)), delete b[d])
                }
            }), a.each(b, function(d, e) {
                b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e
            }), a.each(["minlength", "maxlength"], function() {
                b[this] && (b[this] = Number(b[this]))
            }), a.each(["rangelength", "range"], function() {
                var c;
                b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]))
            }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b
        },
        normalizeRule: function(b) {
            if ("string" == typeof b) {
                var c = {};
                a.each(b.split(/\s/), function() {
                    c[this] = !0
                }), b = c
            }
            return b
        },
        addMethod: function(b, c, d) {
            a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
        },
        methods: {
            required: function(b, c, d) {
                if (!this.depend(d, c)) return "dependency-mismatch";
                if ("select" === c.nodeName.toLowerCase()) {
                    var e = a(c).val();
                    return e && e.length > 0
                }
                return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0
            },
            email: function(a, b) {
                return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)
            },
            url: function(a, b) {
                return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)
            },
            date: function(a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString())
            },
            dateISO: function(a, b) {
                return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)
            },
            number: function(a, b) {
                return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
            },
            digits: function(a, b) {
                return this.optional(b) || /^\d+$/.test(a)
            },
            minlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d
            },
            maxlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || d >= e
            },
            rangelength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d[0] && e <= d[1]
            },
            min: function(a, b, c) {
                return this.optional(b) || a >= c
            },
            max: function(a, b, c) {
                return this.optional(b) || c >= a
            },
            range: function(a, b, c) {
                return this.optional(b) || a >= c[0] && a <= c[1]
            },
            step: function(b, c, d) {
                var e = a(c).attr("type"),
                    f = "Step attribute on input type " + e + " is not supported.",
                    g = ["text", "number", "range"],
                    h = new RegExp("\\b" + e + "\\b"),
                    i = e && !h.test(g.join());
                if (i) throw new Error(f);
                return this.optional(c) || b % d === 0
            },
            equalTo: function(b, c, d) {
                var e = a(d);
                return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                    a(c).valid()
                }), b === e.val()
            },
            remote: function(b, c, d, e) {
                if (this.optional(c)) return "dependency-mismatch";
                e = "string" == typeof e && e || "remote";
                var f, g, h, i = this.previousValue(c, e);
                return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && {
                    url: d
                } || d, h = a.param(a.extend({
                    data: b
                }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, {
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: g,
                    context: f.currentForm,
                    success: function(a) {
                        var d, g, h, j = a === !0 || "true" === a;
                        f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, {
                            method: e,
                            parameters: b
                        }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j)
                    }
                }, d)), "pending")
            }
        }
    });
    var b, c = {};
    a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, d) {
        var e = a.port;
        "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d)
    }) : (b = a.ajax, a.ajax = function(d) {
        var e = ("mode" in d ? d : a.ajaxSettings).mode,
            f = ("port" in d ? d : a.ajaxSettings).port;
        return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments)
    })
});
/*
 * Copyright (C) 2012 PrimeBox
 * 
 * This work is licensed under the Creative Commons
 * Attribution 3.0 Unported License. To view a copy
 * of this license, visit
 * http://creativecommons.org/licenses/by/3.0/.
 * 
 * Documentation available at:
 * http://www.primebox.co.uk/projects/cookie-bar/
 * 
 * When using this software you use it at your own risk. We hold
 * no responsibility for any damage caused by using this plugin
 * or the documentation provided.
 */
(function($) {
    $.cookieBar = function(options, val) {
        if (options == 'cookies') {
            var doReturn = 'cookies';
        } else if (options == 'set') {
            var doReturn = 'set';
        } else {
            var doReturn = false;
        }
        var defaults = {
            message: 'We use cookies for usage tracking and a better user experience. By continuing to use our website, you agree to our use of cookies.', //Message displayed on bar
            acceptButton: true, //Set to true to show accept/enable button
            acceptText: 'I understand', //Text on accept/enable button
            acceptFunction: function(cookieValue) {
                if (cookieValue != 'enabled' && cookieValue != 'accepted') window.location = window.location.href;
            }, //Function to run after accept
            declineButton: false, //Set to true to show decline/disable button
            declineText: 'Disable Cookies', //Text on decline/disable button
            declineFunction: function(cookieValue) {
                if (cookieValue == 'enabled' || cookieValue == 'accepted') window.location = window.location.href;
            }, //Function to run after decline
            policyButton: true, //Set to true to show Privacy Policy button
            policyText: 'Privacy Policy', //Text on Privacy Policy button
            policyURL: 'gr/en/privacy/', //URL of Privacy Policy
            autoEnable: true, //Set to true for cookies to be accepted automatically. Banner still shows
            acceptOnContinue: false, //Set to true to accept cookies when visitor moves to another page
            acceptOnScroll: false, //Set to true to accept cookies when visitor scrolls X pixels up or down
            acceptAnyClick: false, //Set to true to accept cookies when visitor clicks anywhere on the page
            expireDays: 365, //Number of days for cookieBar cookie to be stored for
            renewOnVisit: false, //Renew the cookie upon revisit to website
            forceShow: false, //Force cookieBar to show regardless of user cookie preference
            effect: 'slide', //Options: slide, fade, hide
            element: 'body', //Element to append/prepend cookieBar to. Remember "." for class or "#" for id.
            append: false, //Set to true for cookieBar HTML to be placed at base of website. Actual position may change according to CSS
            fixed: false, //Set to true to add the class "fixed" to the cookie bar. Default CSS should fix the position
            bottom: false, //Force CSS when fixed, so bar appears at bottom of website
            zindex: '', //Can be set in CSS, although some may prefer to set here
            domain: String(window.location.hostname), //Location of privacy policy
            referrer: String(document.referrer) //Where visitor has come from
        };
        var options = $.extend(defaults, options);

        //Sets expiration date for cookie
        var expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + (options.expireDays * 86400000));
        expireDate = expireDate.toGMTString();

        var cookieEntry = 'cb-enabled={value}; expires=' + expireDate + '; path=/';

        //Retrieves current cookie preference
        var i, cookieValue = '',
            aCookie, aCookies = document.cookie.split('; ');
        for (i = 0; i < aCookies.length; i++) {
            aCookie = aCookies[i].split('=');
            if (aCookie[0] == 'cb-enabled') {
                cookieValue = aCookie[1];
            }
        }
        //Sets up default cookie preference if not already set
        if (cookieValue == '' && doReturn != 'cookies' && options.autoEnable) {
            cookieValue = 'enabled';
            document.cookie = cookieEntry.replace('{value}', 'enabled');
        } else if ((cookieValue == 'accepted' || cookieValue == 'declined') && doReturn != 'cookies' && options.renewOnVisit) {
            document.cookie = cookieEntry.replace('{value}', cookieValue);
        }
        if (options.acceptOnContinue) {
            if (options.referrer.indexOf(options.domain) >= 0 && String(window.location.href).indexOf(options.policyURL) == -1 && doReturn != 'cookies' && doReturn != 'set' && cookieValue != 'accepted' && cookieValue != 'declined') {
                doReturn = 'set';
                val = 'accepted';
            }
        }
        if (doReturn == 'cookies') {
            //Returns true if cookies are enabled, false otherwise
            if (cookieValue == 'enabled' || cookieValue == 'accepted') {
                return true;
            } else {
                return false;
            }
        } else if (doReturn == 'set' && (val == 'accepted' || val == 'declined')) {
            //Sets value of cookie to 'accepted' or 'declined'
            document.cookie = cookieEntry.replace('{value}', val);
            if (val == 'accepted') {
                return true;
            } else {
                return false;
            }
        } else {
            //Sets up enable/accept button if required
            var message = options.message.replace('{policy_url}', options.policyURL);

            if (options.acceptButton) {
                var acceptButton = '<a href="" class="cb-enable">' + options.acceptText + '</a>';
            } else {
                var acceptButton = '';
            }
            //Sets up disable/decline button if required
            if (options.declineButton) {
                var declineButton = '<a href="" class="cb-disable">' + options.declineText + '</a>';
            } else {
                var declineButton = '';
            }
            //Sets up privacy policy button if required
            if (options.policyButton) {
                var policyButton = '<a href="' + options.policyURL + '" class="cb-policy">' + options.policyText + '</a>';
            } else {
                var policyButton = '';
            }
            //Whether to add "fixed" class to cookie bar
            if (options.fixed) {
                if (options.bottom) {
                    var fixed = ' class="fixed bottom"';
                } else {
                    var fixed = ' class="fixed"';
                }
            } else {
                var fixed = '';
            }
            if (options.zindex != '') {
                var zindex = ' style="z-index:' + options.zindex + ';"';
            } else {
                var zindex = '';
            }

            //Displays the cookie bar if arguments met
            if (options.forceShow || cookieValue == 'enabled' || cookieValue == '') {
                if (options.append) {
                    $(options.element).append('<div id="cookie-bar"' + fixed + zindex + '><p>' + message + '</p>' + acceptButton + declineButton + policyButton + '</div>');
                } else {
                    $(options.element).prepend('<div id="cookie-bar"' + fixed + zindex + '><p>' + message + '</p>' + acceptButton + declineButton + policyButton + '</div>');
                }
            }

            var removeBar = function(func) {
                if (options.acceptOnScroll) $(document).off('scroll');
                if (typeof(func) === 'function') func(cookieValue);
                if (options.effect == 'slide') {
                    $('#cookie-bar').slideUp(300, function() {
                        $('#cookie-bar').remove();
                    });
                } else if (options.effect == 'fade') {
                    $('#cookie-bar').fadeOut(300, function() {
                        $('#cookie-bar').remove();
                    });
                } else {
                    $('#cookie-bar').hide(0, function() {
                        $('#cookie-bar').remove();
                    });
                }
                $(document).unbind('click', anyClick);
            };
            var cookieAccept = function() {
                document.cookie = cookieEntry.replace('{value}', 'accepted');
                removeBar(options.acceptFunction);
            };
            var cookieDecline = function() {
                var deleteDate = new Date();
                deleteDate.setTime(deleteDate.getTime() - (864000000));
                deleteDate = deleteDate.toGMTString();
                aCookies = document.cookie.split('; ');
                for (i = 0; i < aCookies.length; i++) {
                    aCookie = aCookies[i].split('=');
                    if (aCookie[0].indexOf('_') >= 0) {
                        document.cookie = aCookie[0] + '=0; expires=' + deleteDate + '; domain=' + options.domain.replace('www', '') + '; path=/';
                    } else {
                        document.cookie = aCookie[0] + '=0; expires=' + deleteDate + '; path=/';
                    }
                }
                document.cookie = cookieEntry.replace('{value}', 'declined');
                removeBar(options.declineFunction);
            };
            var anyClick = function(e) {
                if (!$(e.target).hasClass('cb-policy')) {
                    cookieAccept();
                }
            };

            $('#cookie-bar .cb-enable').click(function() {
                cookieAccept();
                return false;
            });
            $('#cookie-bar .cb-disable').click(function() {
                cookieDecline();
                return false;
            });
            if (options.acceptOnScroll) {
                var scrollStart = $(document).scrollTop(),
                    scrollNew, scrollDiff;
                $(document).on('scroll', function() {
                    scrollNew = $(document).scrollTop();
                    if (scrollNew > scrollStart) {
                        scrollDiff = scrollNew - scrollStart;
                    } else {
                        scrollDiff = scrollStart - scrollNew;
                    }
                    if (scrollDiff >= Math.round(options.acceptOnScroll)) {
                        cookieAccept();
                    }
                });
            }
            if (options.acceptAnyClick) {
                $(document).bind('click', anyClick);
            }
        }
    };
})(jQuery);
// JavaScript Document

var keydown_timeout;
var keydown_xhr;

function contactForm() {
    var validateEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    $('.send').hover(function() {
        if ($('#email_input').val() == '') {
            $(this).addClass('invalid');
            $('.cross').text(lang.check_email);
            $('#email_input').addClass('invalid');
        }
        if ($("#name_input").val() == '') {
            $(this).addClass('invalid');
            $('.cross').text(lang.check_name);
            $('#name_input').addClass('invalid');
        }
    }, function() {
        $('.invalid').removeClass('invalid');
        $('.send').removeClass("shake_it_baby");
        $('.send').removeClass("highlighted");
        $('.envelope').fadeIn();
    });

    $('.send').click(function(e) {
        e.preventDefault();
        if (!$(this).hasClass('invalid')) {
            $('.send').addClass('sending');
            // wishlist to send
            var name = $("#name_input").val();
            var email = $('#email_input').val();
            var lang = $("#language_input").val() || 'ru';

            var ajaxurl = 'mail.php?name=' + name + '&email=' + email + '&lang=' + lang;


            $.ajax({
                data: $('form[name="contact-form"]').serialize(),
                success: function(data) {
                    if (data.status == 'ok') {

                        $('.send').addClass('success');
                        setTimeout(function() {
                            $('.send').removeClass('sending').removeClass('success');
                            $('#email_input').val('');
                        }, 2000);

                    } else if (data.status == 'error') {
                        form_submit_response('form[name="contact-form"]', 'error', data.error);
                    } else {
                        form_submit_response('form[name="contact-form"]', 'error', 'An unknown error occurred. Please try again later');
                    }
                }
            });
        } else {
            $('.send').addClass("highlighted");
            $('.envelope').hide();
            $('.send').addClass("shake_it_baby");
            $('.invalid').addClass("highlighted");
            setTimeout(function() {
                $('input.highlighted').removeClass("highlighted");

            }, 1500);
        }
    });


    $.ajax({
        url: 'https://www.google.com/recaptcha/api.js',
        dataType: "script"
    });

    $('form[name="contact-form"]').validate({

        submitHandler: function() {
            $.ajax({
                data: $('form[name="contact-form"]').serialize(),
                success: function(data) {
                    if (data.status == 'ok') {

                        ga('send', 'pageview', '/contact-success.html');

                        form_submit_response('form[name="contact-form"]', 'success', data.message, true);
                    } else if (data.status == 'error') {
                        form_submit_response('form[name="contact-form"]', 'error', data.error);
                    } else {
                        form_submit_response('form[name="contact-form"]', 'error', 'An unknown error occurred. Please try again later');
                    }
                }
            });
        }
    });
}

function form_submit_response(target, type, message, r) {
    "use strict";
    /*var redirect = r || false;
    $('#growls').empty();
    if (type == 'error') {
        $.growl.error({ duration:6000,title:'',message: message, location: 'tr',size:'large'  });
    } else if (type == 'warning') {
        $.growl.warning({ duration:6000,title:'',message: message, location: 'tr',size:'large'   });
    } else if (type == 'success') {
        $.growl.notice({ duration:6000,title: '', message: message, location: 'tr',size:'large'  });
    } else {
        $.growl({duration:6000,title: '', message: message, location: 'tr',size:'large'  });
    }
    if (redirect) {
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    }*/
    alert(message);
}

$(function() {
    "use strict";
    $.validator.setDefaults({
        debug: false,
        errorPlacement: function(error) {
            error.hide();
        },
        highlight: function(element, errorClass, validClass) {

            if ($(element).is(':radio')) {
                $(element).parent().parent().find('.form-control-feedback').remove();
                $(element).parent().parent().append('<span class=" form-control-feedback" style="right:-20px"><i class="fa fa-times"></i></span>');
                $(element).parent().parent().addClass('has-error has-feedback');
            } else {
                $(element).addClass('invalid').removeClass('valid');
            }

        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('invalid').addClass('valid');
        }
    });
});

/*!
 * parallax.js v1.5.0 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */
! function(t, i, e, s) {
    function o(i, e) {
        var h = this;
        "object" == typeof e && (delete e.refresh, delete e.render, t.extend(this, e)), this.$element = t(i), !this.imageSrc && this.$element.is("img") && (this.imageSrc = this.$element.attr("src"));
        var r = (this.position + "").toLowerCase().match(/\S+/g) || [];
        if (r.length < 1 && r.push("center"), 1 == r.length && r.push(r[0]), "top" != r[0] && "bottom" != r[0] && "left" != r[1] && "right" != r[1] || (r = [r[1], r[0]]), this.positionX !== s && (r[0] = this.positionX.toLowerCase()), this.positionY !== s && (r[1] = this.positionY.toLowerCase()), h.positionX = r[0], h.positionY = r[1], "left" != this.positionX && "right" != this.positionX && (isNaN(parseInt(this.positionX)) ? this.positionX = "center" : this.positionX = parseInt(this.positionX)), "top" != this.positionY && "bottom" != this.positionY && (isNaN(parseInt(this.positionY)) ? this.positionY = "center" : this.positionY = parseInt(this.positionY)), this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px"), navigator.userAgent.match(/(iPod|iPhone|iPad)/)) return this.imageSrc && this.iosFix && !this.$element.is("img") && this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position
        }), this;
        if (navigator.userAgent.match(/(Android)/)) return this.imageSrc && this.androidFix && !this.$element.is("img") && this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position
        }), this;
        this.$mirror = t("<div />").prependTo(this.mirrorContainer);
        var a = this.$element.find(">.parallax-slider"),
            n = !1;
        0 == a.length ? this.$slider = t("<img />").prependTo(this.$mirror) : (this.$slider = a.prependTo(this.$mirror), n = !0), this.$mirror.addClass("parallax-mirror").css({
            visibility: "hidden",
            zIndex: this.zIndex,
            position: "fixed",
            top: 0,
            left: 0,
            overflow: "hidden"
        }), this.$slider.addClass("parallax-slider").one("load", function() {
            h.naturalHeight && h.naturalWidth || (h.naturalHeight = this.naturalHeight || this.height || 1, h.naturalWidth = this.naturalWidth || this.width || 1), h.aspectRatio = h.naturalWidth / h.naturalHeight, o.isSetup || o.setup(), o.sliders.push(h), o.isFresh = !1, o.requestRender()
        }), n || (this.$slider[0].src = this.imageSrc), (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || a.length > 0) && this.$slider.trigger("load")
    }! function() {
        for (var t = 0, e = ["ms", "moz", "webkit", "o"], s = 0; s < e.length && !i.requestAnimationFrame; ++s) i.requestAnimationFrame = i[e[s] + "RequestAnimationFrame"], i.cancelAnimationFrame = i[e[s] + "CancelAnimationFrame"] || i[e[s] + "CancelRequestAnimationFrame"];
        i.requestAnimationFrame || (i.requestAnimationFrame = function(e) {
            var s = (new Date).getTime(),
                o = Math.max(0, 16 - (s - t)),
                h = i.setTimeout(function() {
                    e(s + o)
                }, o);
            return t = s + o, h
        }), i.cancelAnimationFrame || (i.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        })
    }(), t.extend(o.prototype, {
        speed: .2,
        bleed: 0,
        zIndex: -100,
        iosFix: !0,
        androidFix: !0,
        position: "center",
        overScrollFix: !1,
        mirrorContainer: "body",
        refresh: function() {
            this.boxWidth = this.$element.outerWidth(), this.boxHeight = this.$element.outerHeight() + 2 * this.bleed, this.boxOffsetTop = this.$element.offset().top - this.bleed, this.boxOffsetLeft = this.$element.offset().left, this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
            var t, i = o.winHeight,
                e = o.docHeight,
                s = Math.min(this.boxOffsetTop, e - i),
                h = Math.max(this.boxOffsetTop + this.boxHeight - i, 0),
                r = this.boxHeight + (s - h) * (1 - this.speed) | 0,
                a = (this.boxOffsetTop - s) * (1 - this.speed) | 0;
            r * this.aspectRatio >= this.boxWidth ? (this.imageWidth = r * this.aspectRatio | 0, this.imageHeight = r, this.offsetBaseTop = a, t = this.imageWidth - this.boxWidth, "left" == this.positionX ? this.offsetLeft = 0 : "right" == this.positionX ? this.offsetLeft = -t : isNaN(this.positionX) ? this.offsetLeft = -t / 2 | 0 : this.offsetLeft = Math.max(this.positionX, -t)) : (this.imageWidth = this.boxWidth, this.imageHeight = this.boxWidth / this.aspectRatio | 0, this.offsetLeft = 0, t = this.imageHeight - r, "top" == this.positionY ? this.offsetBaseTop = a : "bottom" == this.positionY ? this.offsetBaseTop = a - t : isNaN(this.positionY) ? this.offsetBaseTop = a - t / 2 | 0 : this.offsetBaseTop = a + Math.max(this.positionY, -t))
        },
        render: function() {
            var t = o.scrollTop,
                i = o.scrollLeft,
                e = this.overScrollFix ? o.overScroll : 0,
                s = t + o.winHeight;
            this.boxOffsetBottom > t && this.boxOffsetTop <= s ? (this.visibility = "visible", this.mirrorTop = this.boxOffsetTop - t, this.mirrorLeft = this.boxOffsetLeft - i, this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed)) : this.visibility = "hidden", this.$mirror.css({
                transform: "translate3d(" + this.mirrorLeft + "px, " + (this.mirrorTop - e) + "px, 0px)",
                visibility: this.visibility,
                height: this.boxHeight,
                width: this.boxWidth
            }), this.$slider.css({
                transform: "translate3d(" + this.offsetLeft + "px, " + this.offsetTop + "px, 0px)",
                position: "absolute",
                height: this.imageHeight,
                width: this.imageWidth,
                maxWidth: "none"
            })
        }
    }), t.extend(o, {
        scrollTop: 0,
        scrollLeft: 0,
        winHeight: 0,
        winWidth: 0,
        docHeight: 1 << 30,
        docWidth: 1 << 30,
        sliders: [],
        isReady: !1,
        isFresh: !1,
        isBusy: !1,
        setup: function() {
            function s() {
                if (p == i.pageYOffset) return i.requestAnimationFrame(s), !1;
                p = i.pageYOffset, h.render(), i.requestAnimationFrame(s)
            }
            if (!this.isReady) {
                var h = this,
                    r = t(e),
                    a = t(i),
                    n = function() {
                        o.winHeight = a.height(), o.winWidth = a.width(), o.docHeight = r.height(), o.docWidth = r.width()
                    },
                    l = function() {
                        var t = a.scrollTop(),
                            i = o.docHeight - o.winHeight,
                            e = o.docWidth - o.winWidth;
                        o.scrollTop = Math.max(0, Math.min(i, t)), o.scrollLeft = Math.max(0, Math.min(e, a.scrollLeft())), o.overScroll = Math.max(t - i, Math.min(t, 0))
                    };
                a.on("resize.px.parallax load.px.parallax", function() {
                    n(), h.refresh(), o.isFresh = !1, o.requestRender()
                }).on("scroll.px.parallax load.px.parallax", function() {
                    l(), o.requestRender()
                }), n(), l(), this.isReady = !0;
                var p = -1;
                s()
            }
        },
        configure: function(i) {
            "object" == typeof i && (delete i.refresh, delete i.render, t.extend(this.prototype, i))
        },
        refresh: function() {
            t.each(this.sliders, function() {
                this.refresh()
            }), this.isFresh = !0
        },
        render: function() {
            this.isFresh || this.refresh(), t.each(this.sliders, function() {
                this.render()
            })
        },
        requestRender: function() {
            var t = this;
            t.render(), t.isBusy = !1
        },
        destroy: function(e) {
            var s, h = t(e).data("px.parallax");
            for (h.$mirror.remove(), s = 0; s < this.sliders.length; s += 1) this.sliders[s] == h && this.sliders.splice(s, 1);
            t(e).data("px.parallax", !1), 0 === this.sliders.length && (t(i).off("scroll.px.parallax resize.px.parallax load.px.parallax"), this.isReady = !1, o.isSetup = !1)
        }
    });
    var h = t.fn.parallax;
    t.fn.parallax = function(s) {
        return this.each(function() {
            var h = t(this),
                r = "object" == typeof s && s;
            this == i || this == e || h.is("body") ? o.configure(r) : h.data("px.parallax") ? "object" == typeof s && t.extend(h.data("px.parallax"), r) : (r = t.extend({}, h.data(), r), h.data("px.parallax", new o(this, r))), "string" == typeof s && ("destroy" == s ? o.destroy(this) : o[s]())
        })
    }, t.fn.parallax.Constructor = o, t.fn.parallax.noConflict = function() {
        return t.fn.parallax = h, this
    }, t(function() {
        t('[data-parallax="scroll"]').parallax()
    })
}(jQuery, window, document);
var $body, $modal, $secondaryModal, $window, sidebar_pos, sidebar_width, ajax_contents, scroll_from_top, menu_scroll;
var timeout = false;
var rtime;
var delta = 500;
$(function() {
    "use strict";
    setTimeout(function() {
        $('body').removeClass("loading");
        $('body').addClass('loaded');
    }, 2000);


    if ("ontouchstart" in window || navigator.msMaxTouchPoints) {
        $('body').addClass('touch');
    } else {
        $('body').addClass('no-touch');
    }

    if ($('section').length > 0) {
        var anchors = [];
        var nav = [];
        var section_names = [];
        $('section').each(function() {
            anchors.push($(this).data('anchor'));
            section_names.push($(this).data('label'));

            if ($(this).data('nav')) {
                $('.top-menu .nav-right').prepend('<div class="menu-item pull-right"><a href="#' + $(this).data('anchor') + '">' + $(this).data('label') + '</a></div>');
                $('.responsive-nav ul').append('<li class="menu-item"><a href="#' + $(this).data('anchor') + '">' + $(this).data('label') + '</a></li>');
            }
        });
    } else {
        $('.burger').addClass('hidden');
    }

    $(document).on("click", ".burger", function(e) {
        $("body").toggleClass('show-responsive');
        e.preventDefault();
    });
    $(document).on("click", ".responsive-nav-overlay", function(e) {
        $("body").removeClass('show-responsive');
        e.preventDefault();
    });

    $(document).on("click", ".slide-to", function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000);
    });

    $(document).on("click", ".top-menu .nav-right a,.responsive-nav a", function(e) {
        e.preventDefault();
        $("body").removeClass('show-responsive');
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000);
    });

    $(document).on("click", ".logo", function(e) {
        if ($("body").hasClass('section-home')) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 1000);
        }

    });

    $(".top-menu").addClass('visible');

    var waypoints = $('.way-point-animate').waypoint(function(direction) {
        $(this.element).addClass('shown');
    }, {
        offset: '90%'
    });
    var waypoints = $('.way-point-animate-left').waypoint(function(direction) {
        $(this.element).addClass('shown');
    }, {
        offset: '90%'
    });
    var waypoints = $('.way-point-animate-right').waypoint(function(direction) {
        $(this.element).addClass('shown');
    }, {
        offset: '90%'
    });

    $.cookieBar({
        element: 'body',
        zindex: '999999',
        message: 'This website uses cookies to ensure the best user experience. By using this website you agree to our use of cookies.',
        acceptText: '',
        //policyText: 'MORE',
        //policyURL: '#,
        domain: 'www.http://armatus.ch',
        referrer: 'www.http://armatus.ch'
    });
    callbacks();
});

function initShares() {
    "use strict";
    $('.close-share-this').click(function() {
        $('.modal.in').modal('hide');
        return false;
    });

    var clipboard = new Clipboard('.clipboardButton');
    clipboard.on('success', function(e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);

        $('.clipboardButton .copy-label').text(' copied!');

        e.clearSelection();
    });
    clipboard.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);

    });

}

function callbacks(c) {
    "use strict";
    var container = c || '';
    //ajaxContent(container + ' .ajax-content');

    $(container + ' .callbacks').each(function() {
        if (!$(this).hasClass('callbacks-executed')) {
            if (container !== '' || !$(this).hasClass('callbacks-executed')) {
                var c = $(this).data();
                for (var i in c) {
                    if (i.indexOf('fn') === 0 && c[i] !== '') {
                        var fn = c[i];
                        var params = c['params' + i] || null;

                        try {
                            if (c['after' + i] && typeof(window[c['after' + i]]) === 'function') {

                                var callbackAfter = c['after' + i];
                                var callbackAfterParams = c['after' + i + 'Params'] || null;

                                window[fn](params, function() {
                                    window[callbackAfter](callbackAfterParams);
                                });
                            } else {
                                window[fn](params);
                            }
                            $(this).addClass('callbacks-executed');
                        } catch (Error) {
                            console.log(Error + ' ' + fn);
                        }
                    }
                }
            }
        }
    });
}

function initContactForm() {

    $('.contact-form').validate({
        submitHandler: function() {
            var data = $('.contact-form').serialize();
            var object = {
                'success': function(response) {
                    $('.contact-form .form-response').removeClass('alert-success');
                    $('.contact-form .form-response').removeClass('alert-danger');

                    if (response['status'] == 'ok') {
                        $('.contact-form .form-response').addClass('alert-success').show().html(response['message']);
                    } else {
                        $('.contact-form .form-response').addClass('alert-danger').show().html(response['error']);
                    }
                },
                'data': data
            };
            $.ajax(object);
            return false;
        },
        errorPlacement: function(error, element) {
            // error.hide();
        },
        highlight: function(element, errorClass, validClass) {
            $(element).parent().find('.form-control-feedback').remove();
            $(element).closest('.form-group').append('<span class=" form-control-feedback"><i class="fa fa-exclamation-triangle"></i></span>');
            $(element).parent().addClass('has-error has-feedback');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parent().find('.form-control-feedback').remove();
            $(element).parent().removeClass('has-error has-feedback');
        }
    });
}

function initEmailAlert() {

    $('.email-alert-form').validate({
        submitHandler: function() {
            var data = $('.email-alert-form').serialize();
            var object = {
                'success': function(response) {
                    $('.email-alert-form .form-response').removeClass('alert-success');
                    $('.email-alert-form .form-response').removeClass('alert-danger');

                    if (response['status'] == 'ok') {
                        $('.email-alert-form .form-response').addClass('alert-success').show().html(response['message']);
                    } else {
                        $('.email-alert-form .form-response').addClass('alert-danger').show().html(response['error']);
                    }
                },
                'data': data
            };
            $.ajax(object);
            return false;
        },
        errorPlacement: function(error, element) {
            // error.hide();
        },
        highlight: function(element, errorClass, validClass) {
            $(element).parent().find('.form-control-feedback').remove();
            $(element).closest('.form-group').append('<span class=" form-control-feedback"><i class="fa fa-exclamation-triangle"></i></span>');
            $(element).parent().addClass('has-error has-feedback');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parent().find('.form-control-feedback').remove();
            $(element).parent().removeClass('has-error has-feedback');
        }
    });
}




function initContactMap() {
    "use strict";
    $.ajax({
        url: '//maps.googleapis.com/maps/api/js?key=AIzaSyAPyGu0Ic6jqnDfIlKJWn3jjX2tJxTIcPE',
        dataType: "script",
        success: function() {
            if (typeof $('#map-container-contact')[0] !== "undefined") {

                var map_styling = [{
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#444444"
                        }]
                    }, {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#254169"
                        }]
                    }, {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [{
                            "visibility": "on"
                        }, {
                            "lightness": 45
                        }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels",
                        "stylers": [{
                            "visibility": "off"
                        }, {
                            "lightness": 45
                        }]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [{
                            "visibility": "simplified"
                        }]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [{

                            "visibility": "off"
                        }]
                    },

                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [{
                            "color": "#254169"
                        }, {
                            "visibility": "on"
                        }]
                    }
                ];



                var myLatlng_contact = new google.maps.LatLng(38.0474733, 23.8029528);
                var infowindow = new google.maps.InfoWindow({});
                var options = {
                    zoom: 16,
                    center: myLatlng_contact,
                    styles: map_styling,
                    scrollwheel: false,
                    navigationControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    draggable: false,
                    disableDoubleClickZoom: true,
                    zoomControl: false,
                    disableDefaultUI: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map_contact = new google.maps.Map($('#map-container-contact')[0], options);
                var markerImage = new google.maps.MarkerImage(
                    MAP_MARKER
                );

                var contentString =
                    '<div id="content" class="maps_infobox">' +
                    '<div id="siteNotice">' + '</div>' +
                    '<img id="firstHeading" src="' + SKIN + 'img/logo.png" class="firstHeading">' +
                    '<div id="bodyContent">' +
                    '<p>&nbsp;</p>' +
                    '<p><b>Star Bulk Carriers Corp.</b></p>' +
                    '<p>c/o Star Bulk Management Inc.</p>' +
                    '<p>40, Agiou Konstantinou Str., Maroussi 15124,</p>' +
                    '<p>Athens, Greece</p>' +
                    '<a target="_blank" href="https://maps.google.com?saddr=Current+Location&daddr=38.0478457,23.8040864">View Directions</a>'
                '</div>' +
                '</div>';
                infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                var marker = new google.maps.Marker({
                    position: myLatlng_contact,
                    map: map_contact,
                    icon: markerImage
                });

                marker.addListener('click', function() {
                    infowindow.open(map_contact, marker);
                });


            }

        }

    });

}



var scrollTop;
var elementOffset;
$(function() {
    $('header .burger-btn').click(function() {
        $('body').toggleClass('show-mobile-nav');
    });

    $('.responsive-nav-overlay').click(function() {
        $('body').removeClass('show-mobile-nav');
    });
});

$(window).on('resize', function() {
    "use strict";
    if ($('.navigation').offset() !== undefined) {
        //var navInitDistance = $('.navigation').offset().top;
        var threshold = $('header').height();

        if ($('body').hasClass('section-global-positioning')) {
            $('.navigation').addClass('fixed');
            $('.navigation').css('top', threshold);

            var h = $('header').height() + $('.navigation').height();
            var adjust = $('.map').height() - (h + $('footer').height());
            $('.map').css('margin-top', h);
            $('.map').css('height', adjust);

        }
    }
});
$(window).load(function() {
    "use strict";
    if ($(document).scrollTop() > 50) {
        $('header').addClass('small');
    } else {
        $('header').removeClass('small');
    }
    setTimeout(function() {
        if ($('.navigation').offset() !== undefined) {
            //var navInitDistance = $('.navigation').offset().top;
            var threshold = $('header').height();

            if ($('body').hasClass('section-global-positioning')) {
                $('.navigation').addClass('fixed');
                $('.navigation').css('top', threshold);

                var h = $('header').height() + $('.navigation').height();
                var adjust = $('.map').height() - (h + $('footer').height());
                console.log($('footer').height());
                $('.map').css('margin-top', h);
                $('.map').css('height', adjust);

            }
        }

        $(window).scroll(function() {
            if (!$('body').hasClass('without-hero')) {
                if ($(document).scrollTop() > 200) {
                    $('header').addClass('small');
                } else {
                    $('header').removeClass('small');
                }
                scrollTop = $(window).scrollTop();
                elementOffset = $('.heros').innerHeight() - $('header').innerHeight();
                if (scrollTop >= elementOffset) {
                    $('.navigation').addClass('fixed');
                } else {
                    $('.navigation').removeClass('fixed');
                }
            } else {
                if ($(document).scrollTop() > 50) {
                    $('header').addClass('small');
                } else {
                    $('header').removeClass('small');
                }
                scrollTop = $(window).scrollTop();
                elementOffset = $('header').innerHeight();
                if (scrollTop >= elementOffset) {
                    $('.navigation').addClass('fixed');
                } else {
                    $('.navigation').removeClass('fixed');
                }
            }
        });

    }, 500);
});

$(function() {
    "use strict";
    setEqualHeights('.pressroom-highlight .item .caption');
});
$(window).on('resize', function() {
    "use strict";
    setEqualHeights('.pressroom-highlight .item .caption');
});

function setEqualHeights(target) {
    "use strict";
    var highestBox = 0;
    $(target).css('min-height', 0);
    $(target).each(function() {
        if ($(this).height() > highestBox) {
            highestBox = $(this).height();
        }
    });
    $(target).css('min-height', highestBox + 15);
}

/*function initHighlight(){
    "use strict";
	
	var carousel = $(".pressroom-highlight .pressroom-highlight-carousel");
	carousel.slick({
		speed: 500,
		appendDots:$('.pressroom-highlight .slide-dots'),
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		appendArrows:$('.pressroom-highlight .slide-dots'),
		nextArrow:'<a class="next-slide" href="#"><i class="fa fa-angle-right" aria-hidden="true"></i></a>',
		prevArrow:'<a class="prev-slide" href="#"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
		dots: true,
		
		responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3				
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 2
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1
			  }
			}
		  ]
	});
}*/


/*function scrollable(){
	$(".scrollable_nav a").click(function() {
		$('.section.scrollable .scrolable-content').animate({
			scrollTop: $($(this).data('href')).offset().top
		}, 500);
	});
	
	$(".scrollable_nav a").click(function() {
		var $this = $(this);
		var childPos = $($this.data('href')).offset();
		var parentPos = $($this.data('href')).parent().offset();
		$('.scrollable_nav a.active').removeClass('active');
		$this.addClass('active');		
		var childOffset = {
			top: childPos.top - parentPos.top,
			left: childPos.left - parentPos.left
		};
		$('.section.scrollable .fp-scrollable').slimScroll({ scrollTo: childOffset.top+'px' });
	});	
}
function checkVisibleSections(e, pos){
	$('.scrolable-content .subsection').each(function(){
		var $this = $(this);
		var $this_top = $this.offset().top - $('.scrolable-content').offset().top;
		if(pos >= $this_top){
			var $this_id = $(this).attr('id');	   
			$('.scrollable_nav a').removeClass('active');
		 	$('.scrollable_nav a[data-href="#'+$this_id+'"]').addClass('active');
		}else if(Number($('.scrolable-content').innerHeight()) === pos+$(window).innerHeight()){
			var $last_id = $('.scrolable-content .subsection:last').attr('id');	   
			$('.scrollable_nav a').removeClass('active');
		 	$('.scrollable_nav a[data-href="#'+$last_id+'"]').addClass('active');
		}
	});	
}*/
function services_slider() {
    var $services_slider = $('.services-content .slick-slider').slick({
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        slidesToShow: 1,
        adaptiveHeight: false
    });

    $('.section-services .services-nav ul li').click(function() {
        var $this = $(this);
        $('.section-services .services-nav ul li').removeClass('active');
        $this.addClass('active');
        $services_slider.slick('slickGoTo', parseInt($this.data('index')));
    });
}



//# sourceMappingURL=compiled.script.js.map