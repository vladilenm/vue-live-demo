<template>
  <div class="card">
    <ul class="list" v-if="list.length !== 0">
      <li
        v-for="(note, idx) in list"
        class="list-item"
        :class="{ active: note.done }"
      >
        {{ note.title }}

        <div>
          <button class="btn danger" @click="removeItem(note.id)">&times;</button>
          <button class="btn primary" @click="$emit('mark', note.id)">V</button>
        </div>
      </li>
    </ul>
    <p v-else>No notes in list</p>
  </div>
</template>

<script>
export default {
  props: ['list'],
  emits: ['remove-item', 'mark'],
  methods: {
    removeItem(idx) {
      this.$emit('remove-item', idx)
    }
  }
}
</script>

<style scoped>

</style>