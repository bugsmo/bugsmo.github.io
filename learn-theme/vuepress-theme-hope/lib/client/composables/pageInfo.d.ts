import { type ComputedRef } from "vue";
import { type AuthorInfo } from "vuepress-shared/client";
import { type PageInfoProps } from "@theme-hope/modules/info/components/PageInfo";
import { type PageCategory, type PageTag } from "@theme-hope/modules/info/utils/index";
import { type PageInfo } from "../../shared/index.js";
export declare const usePageAuthor: () => ComputedRef<AuthorInfo[]>;
export declare const usePageCategory: () => ComputedRef<PageCategory[]>;
export declare const usePageTag: () => ComputedRef<PageTag[]>;
export declare const usePageDate: () => ComputedRef<Date | null>;
export declare const usePageInfo: () => {
    info: ComputedRef<PageInfoProps>;
    items: ComputedRef<PageInfo[] | false | null>;
};
