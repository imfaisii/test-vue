<script setup>
import {reactive, ref} from "vue";
import {isRequired, isMin} from "intus/rules";
import useFormValidation from "@/composables/useForm";
import useBlogs from "@/composables/useBlogs";

const props = defineProps({
  blog: {
    required: false,
    default: null,
  },
});

const {loading, create, update} = useBlogs();
const file = ref(null);

const form = reactive({
  title: props?.blog?.title ?? "",
  body: props?.blog?.body ?? "",
  image: props?.blog?.image_url ?? null,
});

const rules = {
  title: [isRequired()],
  body: [isRequired(), isMin(6)],
  image: [isRequired()],
};

const {validation} = useFormValidation(form, rules);

const store = async () => {
  if (validation.value.passes()) {
    if (!props.blog) {
      await create(form);
    } else {
      await update(props.blog.id, form);
    }
  }
};

const onFileChange = (event) => {
  form.image = event.target.files[0];
};
</script>

<template>
  <v-card>
    <v-card-title> Blog Details </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="store">
        <v-text-field
          v-model="form.title"
          :error-messages="validation.errors().title"
          label="Title"
        ></v-text-field>
        <v-textarea
          v-model="form.body"
          :error-messages="validation.errors().body"
          label="Body"
        ></v-textarea>
        <v-file-input
          small-chips
          prepend-icon="mdi-camera"
          show-size
          v-model="file"
          label="Image"
          accept="image/*"
          :error-messages="validation.errors().image"
          @change="onFileChange"
        ></v-file-input>
        <v-img
          v-if="props?.blog"
          :src="blog.image_url"
          width="80"
          height="80"
        ></v-img>
        <v-btn
          type="submit"
          color="primary"
          :loading="loading"
          :disabled="loading"
        >
          <span v-if="!loading">Submit</span>
          <span v-else>Please wait...</span>
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {
  width: 600px;
}
</style>
