<script setup>
import {reactive, ref} from "vue";
import {isRequired, isEmail, isMin} from "intus/rules";
import useFormValidation from "@/composables/useForm";
import useAuth from "@/composables/useAuth";
import useZiggy from "@/composables/useZiggy";

const form = reactive({
  email: "",
  password: "",
});
const rules = {
  email: [isRequired(), isEmail()],
  password: [isRequired(), isMin(6)],
};

const {validation} = useFormValidation(form, rules);
const {login: loginUser, loading} = useAuth();
const {vRoute} = useZiggy();

const login = async () => {
  if (validation.value.passes()) {
    await loginUser(form);
  }
};
</script>
<template>
  <v-form @submit.prevent="login">
    <v-card class="auth-card">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="form.email"
          :error-messages="validation.errors().email"
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          :error-messages="validation.errors().password"
          label="Password"
          type="password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" :loading="loading" :disabled="loading">
          <span v-if="!loading">Login</span>
          <span v-else>Loading...</span>
        </v-btn>
        <router-link :to="vRoute('register')">Create an account</router-link>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<style lang="scss" scoped>
.auth-card {
  width: 400px;
}
</style>
