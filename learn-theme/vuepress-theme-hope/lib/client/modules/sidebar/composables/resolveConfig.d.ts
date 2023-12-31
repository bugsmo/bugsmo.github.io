import { type PageHeader } from "@vuepress/client";
import { type SidebarArrayOptions, type SidebarObjectOptions } from "../../../../shared/index.js";
import { type ResolvedSidebarHeaderItem, type ResolvedSidebarItem } from "../utils/index.js";
/**
 * Util to transform page header to sidebar item
 */
export declare const headerToSidebarItem: (header: PageHeader, headerDepth: number) => ResolvedSidebarHeaderItem;
export declare const headersToSidebarItemChildren: (headers: PageHeader[], headerDepth: number) => ResolvedSidebarHeaderItem[];
/**
 * Resolve sidebar items if the config is `heading`
 */
export declare const resolveHeadingSidebarItems: (headerDepth: number) => ResolvedSidebarHeaderItem[];
/**
 * Resolve sidebar items if the config is an array
 */
export declare const resolveArraySidebarItems: (sidebarConfig: SidebarArrayOptions, headerDepth: number, prefix?: string) => ResolvedSidebarItem[];
/**
 * Resolve sidebar items if the config is a key -> value (path-prefix -> array) object
 */
export declare const resolveMultiSidebarItems: (sidebarConfig: SidebarObjectOptions, headerDepth: number) => ResolvedSidebarItem[];
/**
 * Resolve sidebar items global computed
 *
 * It should only be resolved and provided once
 */
export declare const resolveSidebarItems: () => ResolvedSidebarItem[];
