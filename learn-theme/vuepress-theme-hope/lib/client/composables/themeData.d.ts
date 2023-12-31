import { type ThemeDataRef, type ThemeLocaleDataRef } from "@vuepress/plugin-theme-data/client";
import { type ComputedRef } from "vue";
import { type AuthorInfo } from "vuepress-shared/client";
import { type ThemeData, type ThemeLocaleConfig } from "../../shared/index.js";
export declare const useThemeData: () => ThemeDataRef<ThemeData>;
export declare const useThemeLocaleData: () => ThemeLocaleDataRef<ThemeLocaleConfig>;
export declare const useThemeAuthor: () => ComputedRef<AuthorInfo[]>;
export declare const usePure: () => ComputedRef<boolean>;
