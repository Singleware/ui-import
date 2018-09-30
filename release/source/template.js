"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const DOM = require("@singleware/jsx");
const Control = require("@singleware/ui-control");
/**
 * Import template class.
 */
let Template = class Template extends Control.Component {
    /**
     * Default constructor.
     * @param properties Import properties.
     * @param children Import children.
     */
    constructor(properties, children) {
        super(properties, children);
        /**
         * Import states.
         */
        this.states = {
            path: ''
        };
        /**
         * Import wrapper.
         */
        this.wrapper = DOM.create("div", null);
        /**
         * Import skeleton.
         */
        this.skeleton = (DOM.create("div", { slot: this.properties.slot, class: this.properties.class }, this.children));
        DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.wrapper);
        this.bindProperties();
        this.assignProperties();
    }
    /**
     * Load the current path.
     */
    async load() {
        const response = await fetch(this.path);
        if (response.status === 200 || response.status === 304) {
            const content = await response.text();
            Class.perform(this, () => {
                DOM.append(DOM.clear(this.wrapper), content);
            });
        }
    }
    /**
     * Bind exposed properties to the custom element.
     */
    bindProperties() {
        this.bindComponentProperties(this.skeleton, ['path']);
    }
    /**
     * Assign all element properties.
     */
    assignProperties() {
        this.assignComponentProperties(this.properties, ['path']);
    }
    /**
     * Get imported path.
     */
    get path() {
        return this.states.path;
    }
    /**
     * Set import path.
     */
    set path(path) {
        this.states.path = path;
        this.load();
    }
    /**
     * Import element.
     */
    get element() {
        return this.skeleton;
    }
};
__decorate([
    Class.Private()
], Template.prototype, "states", void 0);
__decorate([
    Class.Private()
], Template.prototype, "wrapper", void 0);
__decorate([
    Class.Private()
], Template.prototype, "skeleton", void 0);
__decorate([
    Class.Private()
], Template.prototype, "load", null);
__decorate([
    Class.Private()
], Template.prototype, "bindProperties", null);
__decorate([
    Class.Private()
], Template.prototype, "assignProperties", null);
__decorate([
    Class.Public()
], Template.prototype, "path", null);
__decorate([
    Class.Public()
], Template.prototype, "element", null);
Template = __decorate([
    Class.Describe()
], Template);
exports.Template = Template;
