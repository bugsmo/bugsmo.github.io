import { type VNode } from "vue";
declare const _default: import("vue").DefineComponent<{
    /**
     * Whether show pageview and it's path
     *
     * 是否显示浏览量以及其路径
     */
    pageview: {
        type: (BooleanConstructor | StringConstructor)[];
        default: boolean;
    };
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: BooleanConstructor;
}, () => VNode | null, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Whether show pageview and it's path
     *
     * 是否显示浏览量以及其路径
     */
    pageview: {
        type: (BooleanConstructor | StringConstructor)[];
        default: boolean;
    };
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: BooleanConstructor;
}>>, {
    pageview: string | boolean;
    pure: boolean;
}, {}>;
export default _default;
