import React from 'react';
import PT from 'prop-types';
import type { LabelProps } from './label.props';
declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;
export declare const propTypes: {
    type: PT.Requireable<"default" | "localization">;
    iconStart: PT.Requireable<string | number | boolean | {} | PT.ReactElementLike | PT.ReactNodeArray>;
    iconEnd: PT.Requireable<string | number | boolean | {} | PT.ReactElementLike | PT.ReactNodeArray>;
    error: PT.Requireable<boolean>;
    htmlFor: PT.Requireable<string>;
};
export default Label;
