/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as DOM from '@singleware/jsx';
import * as Control from '@singleware/ui-control';

import { Properties } from './properties';
import { Element } from './element';
import { States } from './states';

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
  } as States;

  /**
   * Import wrapper.
   */
  @Class.Private()
  private wrapper = <div /> as HTMLElement;

  /**
   * Import skeleton.
   */
  @Class.Private()
  private skeleton = (
    <div slot={this.properties.slot} class={this.properties.class}>
      {this.children}
    </div>
  ) as Element;

  /**
   * Load the current path.
   */
  @Class.Private()
  private async load(): Promise<void> {
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
  @Class.Private()
  private bindProperties(): void {
    this.bindComponentProperties(this.skeleton, ['path']);
  }

  /**
   * Assign all element properties.
   */
  @Class.Private()
  private assignProperties(): void {
    this.assignComponentProperties(this.properties, ['path']);
  }

  /**
   * Default constructor.
   * @param properties Import properties.
   * @param children Import children.
   */
  constructor(properties?: Properties, children?: any[]) {
    super(properties, children);
    DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.wrapper);
    this.bindProperties();
    this.assignProperties();
  }

  /**
   * Get imported path.
   */
  @Class.Public()
  public get path(): string {
    return this.states.path;
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
