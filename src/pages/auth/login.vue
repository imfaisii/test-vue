<script setup>
import { reactive, ref } from "vue";
import { isRequired, isEmail, isMin } from 'intus/rules';
import { useUserStore } from '@/stores/user'
import { useToast } from "vue-toastification";
import axios from "@/libs/axios";
import useFormValidation from '@/composables/useForm';

const form = reactive({
    email: '',
    password: ''
})
const rules = {
    email: [isRequired(), isEmail()],
    password: [isRequired(), isMin(6)]
}

const { validation } = useFormValidation(form, rules)
const toast = useToast();
const userStore = useUserStore()

const login = async () => {
    if (validation.value.passes()) {
        try {
            const { data } = await axios.post('/api/login', form)

            userStore.setUser(data.user);
            userStore.isloggedIn = true;
        } catch (e) {
            toast.error(e?.response?.data?.message ?? e?.message)
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
            <v-btn color="primary" @click="login">Login</v-btn>
            <router-link :to="{ name: 'register' }">Create an account</router-link>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped>
.auth-card {
    width: 400px;
}
</style>