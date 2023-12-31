import { type PropType, type SlotsType, type VNode } from "vue";
import "../styles/toc.scss";
declare const _default: import("vue").DefineComponent<{
    /**
     * TOC items config
     *
     * TOC 项目配置
     */
    items: {
        type: PropType<import("@mdit-vue/types").MarkdownItHeader[]>;
        default: () => never[];
    };
    /**
     * Max header nesting depth
     *
     * 最大的标题嵌套深度
     */
    headerDepth: {
        type: NumberConstructor;
        default: number;
    };
}, () => VNode | null, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * TOC items config
     *
     * TOC 项目配置
     */
    items: {
        type: PropType<import("@mdit-vue/types").MarkdownItHeader[]>;
        default: () => never[];
    };
    /**
     * Max header nesting depth
     *
     * 最大的标题嵌套深度
     */
    headerDepth: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    headerDepth: number;
    items: import("@mdit-vue/types").MarkdownItHeader[];
}, SlotsType<{
    before?: () => VNode | VNode[];
    after?: () => VNode | VNode[];
}>>;
export default _default;
