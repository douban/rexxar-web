/**
 * IMPORTANT: This is deprecated
 */
/**
 * Accept sheme and host as configrations, Returns a base class for Widget inheritance.
 * See `example` folder as an example of the RexxarWidget Usage.
 */
interface Config {
    schema: 'douban';
    host: 'rexxar-container';
}
interface RexxarWidgetCall {
    (params: string | null | undefined): void;
}
interface RexxarWidget {
    name: string;
    call: RexxarWidgetCall;
}
declare const _default: (config: Config) => RexxarWidget;
export default _default;
