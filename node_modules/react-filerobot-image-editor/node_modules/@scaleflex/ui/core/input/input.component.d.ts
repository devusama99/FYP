import React from 'react';
import PT from 'prop-types';
import type { InputProps } from './input.props';
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLDivElement>>;
export declare const defaultProps: {
    size: "md";
    background: "primary";
    error: boolean;
    fullWidth: boolean;
    readOnly: boolean;
};
export declare const propTypes: {
    size: PT.Requireable<"sm" | "md">;
    iconStart: PT.Requireable<string | number | boolean | {} | PT.ReactElementLike | PT.ReactNodeArray>;
    iconEnd: PT.Requireable<string | number | boolean | {} | PT.ReactElementLike | PT.ReactNodeArray>;
    error: PT.Requireable<boolean>;
    fullWidth: PT.Requireable<boolean>;
    value: PT.Requireable<any>;
    readOnly: PT.Requireable<boolean>;
    iconClickStart: PT.Requireable<(...args: any[]) => any>;
    iconClickEnd: PT.Requireable<(...args: any[]) => any>;
    background: PT.Requireable<"primary" | "secondary">;
    focusOnMount: PT.Requireable<boolean>;
    focusOnClick: PT.Requireable<boolean>;
};
export default Input;
