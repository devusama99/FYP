declare type Keys<O> = (keyof O)[];
/**
 * Type-safe Object.keys
 */
export declare function objectKeys<O>(object: O): Keys<O>;
export {};
