/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as DOM from '@singleware/jsx';
import * as Control from '@singleware/ui-control';

import { Properties } from './properties';
import { Element } from './element';

/**
 * Import template class.
 */
@Class.Describe()
export class Template extends Control.Component<Properties> {
  /**
   * Import states.
   */
  @Class.Private()
  private states = {
    path: ''
  };

  /**
   * Import wrapper.
   */
  @Class.Private()
  private wrapper: HTMLDivElement = <div /> as Element;

  /**
   * Import skeleton.
   */
  @Class.Private()
  private skeleton: Element = (
    <div slot={this.properties.slot} class={this.properties.class}>
      {this.children}
    </div>
  ) as Element;

  /**
   * Import elements.
   */
  @Class.Private()
  private elements: ShadowRoot = DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.wrapper) as ShadowRoot;

  /**
   * Load the current path.
   */
  @Class.Private()
  private async load(): Promise<void> {
    const response = await fetch(this.path);
    if (response.status === 200 || response.status === 304) {
      const content = await response.text();
      Class.perform(this, () => {
        DOM.clear(this.wrapper);
        DOM.append(this.wrapper, content);
      });
    }
  }

  /**
   * Bind exposed properties to the custom element.
   */
  @Class.Private()
  private bindProperties(): void {
    Object.defineProperties(this.skeleton, {
      path: super.bindDescriptor(this, Template.prototype, 'path')
    });
  }

  /**
   * Assign all element properties.
   */
  @Class.Private()
  private assignProperties(): void {
    Control.assignProperties(this, this.properties, ['path']);
  }

  /**
   * Default constructor.
   * @param properties Import properties.
   * @param children Import children.
   */
  constructor(properties?: Properties, children?: any[]) {
    super(properties, children);
    this.bindProperties();
    this.assignProperties();
  }

  /**
   * Get imported path.
   */
  @Class.Public()
  public get path(): string {
    return this.states.path || '';
  }

  /**
   * Set import path.
   */
  public set path(path: string) {
    this.states.path = path;
    this.load();
  }

  /**
   * Import element.
   */
  @Class.Public()
  public get element(): Element {
    return this.skeleton;
  }
}
