import { type ComputedRef } from "vue";
import { type AutoLinkOptions, type NavGroup } from "../../../../shared/index.js";
/**
 * Get navbar config of select language dropdown
 */
export declare const useNavbarLanguageDropdown: () => ComputedRef<NavGroup<AutoLinkOptions> | null>;
