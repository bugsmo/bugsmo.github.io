import { defineComponent, h, onMounted, ref, } from "vue";
import PasswordModal from "@theme-hope/modules/encrypt/components/PasswordModal";
import { usePathEncrypt } from "@theme-hope/modules/encrypt/composables/index";
export default defineComponent({
    name: "LocalEncrypt",
    slots: Object,
    setup(_props, { slots }) {
        const { status, validate } = usePathEncrypt();
        const isMounted = ref(false);
        onMounted(() => {
            isMounted.value = true;
        });
        return () => {
            const { isEncrypted, isDecrypted } = status.value;
            return isEncrypted
                ? isMounted.value
                    ? isDecrypted
                        ? slots.default() || null
                        : h(PasswordModal, { full: true, onVerify: validate })
                    : null
                : slots.default() || null;
        };
    },
});
//# sourceMappingURL=LocalEncrypt.js.map