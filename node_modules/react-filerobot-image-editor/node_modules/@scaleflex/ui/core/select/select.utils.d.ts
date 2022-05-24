import type { ReactNode } from 'react';
import type { RenderOption, RenderValue, SelectSimpleValueType } from './select.props';
export declare const getIconSize: (size?: "sm" | "md" | undefined) => number;
export declare const renderIcon: (_icon: ReactNode, size?: "sm" | "md" | undefined) => JSX.Element | undefined;
export declare const renderOption: (menuItem: JSX.Element, { value, multiple, size, onClose, onChange }: RenderOption) => JSX.Element;
export declare const renderValue: ({ value, multiple, children, }: RenderValue) => SelectSimpleValueType;
