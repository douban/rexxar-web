declare const _default: (ns: string) => (name: string) => (callback: Function) => string;
/**
 * Curry function for callback register
 *
 * callbackListener('Rexxar.Widget.AlertDialog')('clickHandler')(()=>{}))
 */
export default _default;
