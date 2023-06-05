<script setup>
import {reactive} from "vue";
import {isRequired, isEmail, isMin, isSame} from "intus/rules";
import useFormValidation from "@/composables/useForm";
import useAuth from "@/composables/useAuth";

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const rules = {
  name: [isRequired()],
  email: [isRequired(), isEmail()],
  password: [isRequired(), isMin(6)],
  password_confirmation: [isRequired(), isSame("password")],
};

const {validation} = useFormValidation(form, rules);
const {register: registerUser, loading} = useAuth();

const register = async () => {
  if (validation.value.passes()) {
    await registerUser(form);
  }
};
</script>
<template>
  <v-card class="auth-card">
    <v-form @submit.prevent="register">
      <v-card-title>Register</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="form.name"
          label="Name"
          :error-messages="validation.errors().name"
        ></v-text-field>
        <v-text-field
          v-model="form.email"
          label="Email"
          type="email"
          :error-messages="validation.errors().email"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          :error-messages="validation.errors().password"
        ></v-text-field>
        <v-text-field
          v-model="form.password_confirmation"
          label="Password Confirmation"
          type="password"
          :error-messages="validation.errors().password_confirmation"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" :loading="loading" :disabled="loading">
          <span v-if="!loading">Register</span>
          <span v-else>Loading...</span>
        </v-btn>
        <router-link :to="{name: 'login'}">Login Here</router-link>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<style lang="scss" scoped>
.auth-card {
  width: 400px;
}
</style>
