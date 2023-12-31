import { type PropType, type VNode } from "vue";
import { type AuthorInfo } from "vuepress-shared/client";
import "../styles/author-info.scss";
declare const _default: import("vue").DefineComponent<{
    /**
     * Author information
     *
     * 作者信息
     */
    author: {
        type: PropType<AuthorInfo[]>;
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
     * Author information
     *
     * 作者信息
     */
    author: {
        type: PropType<AuthorInfo[]>;
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
