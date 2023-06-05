import { ref, watch } from 'vue';
import intus from 'intus';

export default function useFormValidation(form, rules) {
    const validation = ref(intus.validate(form, rules));

    watch(
        () => form,
        (newForm) => {
            validation.value = intus.validate(newForm, rules);
        },
        { deep: true }
    );

    return { validation };
}


