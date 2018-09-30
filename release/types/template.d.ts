import * as Control from '@singleware/ui-control';
import { Properties } from './properties';
import { Element } from './element';
/**
 * Import template class.
 */
export declare class Template extends Control.Component<Properties> {
    /**
     * Import states.
     */
    private states;
    /**
     * Import wrapper.
     */
    private wrapper;
    /**
     * Import skeleton.
     */
    private skeleton;
    /**
     * Load the current path.
     */
    private load;
    /**
     * Bind exposed properties to the custom element.
     */
    private bindProperties;
    /**
     * Assign all element properties.
     */
    private assignProperties;
    /**
     * Default constructor.
     * @param properties Import properties.
     * @param children Import children.
     */
    constructor(properties?: Properties, children?: any[]);
    /**
     * Get imported path.
     */
    /**
    * Set import path.
    */
    path: string;
    /**
     * Import element.
     */
    readonly element: Element;
}
