<script setup>
import { reactive } from "vue";

const form = reactive({
    name: '',
    email: '',
    password: '',
    passowrd_confirmation: ''
})

const login = () => {
    alert("login")
}
</script>
<template>
    <v-card class="auth-card">
        <v-card-title>Register</v-card-title>
        <v-card-text>
            <v-text-field v-model="form.name" label="Name"></v-text-field>
            <v-text-field v-model="form.email" label="Email" type="email"></v-text-field>
            <v-text-field v-model="form.password" label="Password" type="password"></v-text-field>
            <v-text-field v-model="form.passowrd_confirmation" label="Password Confirmation" type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="register">Register</v-btn>
            <router-link :to="{ name: 'login' }">Login Here.</router-link>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped>
.auth-card {
    width: 400px;
}
</style>