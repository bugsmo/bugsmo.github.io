import { type PropType, type SlotsType, type VNode } from "vue";
import { PageInfoProps } from "@theme-hope/modules/info/components/PageInfo";
import { type ArticleInfo } from "../../../../shared/index.js";
import "../styles/article-item.scss";
declare const _default: import("vue").DefineComponent<{
    /**
     * Article information
     *
     * 文章信息
     */
    info: {
        type: PropType<ArticleInfo>;
        required: true;
    };
    /**
     * Article path
     *
     * 文章路径
     */
    path: {
        type: StringConstructor;
        required: true;
    };
}, () => VNode, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Article information
     *
     * 文章信息
     */
    info: {
        type: PropType<ArticleInfo>;
        required: true;
    };
    /**
     * Article path
     *
     * 文章路径
     */
    path: {
        type: StringConstructor;
        required: true;
    };
}>>, {}, SlotsType<{
    cover?: (props: {
        cover: string | undefined;
    }) => VNode | VNode[];
    title?: (props: {
        title: string;
        isEncrypted?: boolean;
        type: string;
    }) => VNode | VNode[];
    excerpt?: (props: {
        excerpt: string | undefined;
    }) => VNode | VNode[];
    info?: (props: {
        info: PageInfoProps;
    }) => VNode | VNode[];
}>>;
export default _default;
