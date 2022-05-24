import React from 'react';
import type { IconButtonProps } from './icon-button.props';
export declare const getIconSizeWithSquare: (sizeName?: "xs" | "sm" | "md" | "lg" | "xl" | undefined, square?: boolean | undefined) => number;
declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default IconButton;
