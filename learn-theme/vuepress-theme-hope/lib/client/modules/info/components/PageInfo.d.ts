import { type PropType, type VNode } from "vue";
import { type ReadingTime, type ReadingTimeLocale } from "vuepress-plugin-reading-time2/client";
import { type AuthorInfo as AuthorInfoType } from "vuepress-shared/client";
import { type PageCategory, type PageTag } from "@theme-hope/modules/info/utils/index";
import { type PageInfo } from "../../../../shared/index.js";
import "balloon-css/balloon.css";
import "../styles/page-info.scss";
export interface PageInfoProps {
    /**
     * Authors of article
     *
     * 文章作者
     */
    author?: AuthorInfoType[];
    /**
     * Categories of article
     *
     * 文章分类
     */
    category?: PageCategory[];
    /**
     * Tags of article
     *
     * 文章标签
     */
    tag?: PageTag[];
    /**
     * Writing Date
     *
     * 写作日期
     */
    date?: Date | null;
    /**
     * Writing Date
     *
     * 写作日期
     */
    localizedDate?: string | null;
    /**
     * Whether the article is original
     *
     * 文章是否原创
     */
    isOriginal?: boolean;
    /**
     * Whether enable pageview
     *
     * If the value is a string, it will use as search id
     *
     * 是否启用访问量
     *
     * 如果值为字符串，会用做查询 id
     */
    pageview?: string | boolean;
    /**
     * ReadingTime info
     *
     * 阅读时间
     */
    readingTime?: ReadingTime | null;
    /**
     * ReadingTime Locales
     *
     * 阅读时间多语言
     */
    readingTimeLocale?: ReadingTimeLocale | null;
}
declare const _default: import("vue").DefineComponent<{
    /**
     * Article information to display
     *
     * 待展示的文章信息
     */
    items: {
        type: PropType<false | PageInfo[]>;
        default: () => PageInfo[];
    };
    /**
     * Article information
     *
     * 文章信息配置
     */
    info: {
        type: PropType<PageInfoProps>;
        required: true;
    };
}, () => VNode | null, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Article information to display
     *
     * 待展示的文章信息
     */
    items: {
        type: PropType<false | PageInfo[]>;
        default: () => PageInfo[];
    };
    /**
     * Article information
     *
     * 文章信息配置
     */
    info: {
        type: PropType<PageInfoProps>;
        required: true;
    };
}>>, {
    items: false | PageInfo[];
}, {}>;
export default _default;
