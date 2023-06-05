<script setup>

</script>

<template>
  <v-card>
    <v-card-title> Create Blog </v-card-title>
    <v-card-text>
      <v-form @submit="submitForm">
        <v-text-field v-model="title" label="Title"></v-text-field>
        <v-textarea v-model="body" label="Body"></v-textarea>
        <v-file-input v-model="image" label="Image"></v-file-input>
        <v-btn type="submit" color="primary">Submit</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {
  width: 600px;
}
</style>
