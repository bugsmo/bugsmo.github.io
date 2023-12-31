import { type PropType, type VNode } from "vue";
import { type PageCategory } from "@theme-hope/modules/info/utils/index";
import "../styles/category-info.scss";
declare const _default: import("vue").DefineComponent<{
    /**
     * Category information
     *
     * 分类信息
     */
    category: {
        type: PropType<PageCategory[]>;
        required: true;
    };
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: BooleanConstructor;
}, () => VNode | null, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Category information
     *
     * 分类信息
     */
    category: {
        type: PropType<PageCategory[]>;
        required: true;
    };
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: BooleanConstructor;
}>>, {
    pure: boolean;
}, {}>;
export default _default;
