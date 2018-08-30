/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 *
 * The proposal of this example is to show how to use the basic import element.
 */
import * as Import from '../source';
import * as DOM from '@singleware/jsx';

const external = <Import.Template path="data.txt" /> as Import.Element;
