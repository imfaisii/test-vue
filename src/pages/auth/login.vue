<script setup>
import { reactive, ref } from "vue";
import { isRequired, isEmail, isMin } from 'intus/rules';
import { useUserStore } from '@/stores/user'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import axios from "@/libs/axios";
import useFormValidation from '@/composables/useForm';
import useZiggy from '@/composables/useZiggy';

const form = reactive({
    email: '',
    password: ''
})
const rules = {
    email: [isRequired(), isEmail()],
    password: [isRequired(), isMin(6)]
}

const { validation } = useFormValidation(form, rules)
const { vRoute } = useZiggy()
const router = useRouter()
const isLoading = ref(false)
const toast = useToast();
const userStore = useUserStore()

const login = async () => {
    if (validation.value.passes()) {
        try {
            isLoading.value = true
            const { data } = await axios.post(vRoute('login'), form)

            userStore.setUser(data.user, data.access_token);
            userStore.isloggedIn = true;
            router.push({ name: 'dashboard' });
        } catch (e) {
            toast.error(e?.response?.data?.message ?? e?.message)
        } finally {
            isLoading.value = false
        }

    }
}

</script>
<template>
    <v-card class="auth-card">
        <v-card-title>Login</v-card-title>
        <v-card-text>
            <v-text-field v-model="form.email" :error-messages="validation.errors().email" label="Email"></v-text-field>
            <v-text-field v-model="form.password" :error-messages="validation.errors().password" label="Password"
                type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn :loading="isLoading" :disabled="isLoading" @click="login">
                <span v-if="!isLoading">Login</span>
                <span v-else>Loading...</span>
            </v-btn>
            <router-link :to="vRoute('register')">Create an account</router-link>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped>
.auth-card {
    width: 400px;
}
</style>