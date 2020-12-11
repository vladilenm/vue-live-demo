<template>
  <header class="navbar">
    <h3>Notes App</h3>

    <ul class="navbar-menu">
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
    </ul>
  </header>
  <div class="container with-nav">
    <router-view />
    <div class="card">
      <h1>Notes App</h1>

      <div class="form-control">
        <input
          type="text"
          v-model="inputValue"
          placeholder="Please enter note title"
          v-on:keydown.enter="createNote"
        >
      </div>
    </div>

    <div class="loader" v-if="loading"></div>

    <notes-list
      v-else
      :list="notes"
      @remove-item="removeNote"
      @mark="markCompleted"
    ></notes-list>
  </div>
</template>

<script>
import NotesList from './NotesList'

export default {
  data() {
    return {
      inputValue: '',
      notes: [],
      loading: false
    }
  },
  async mounted() {
    this.loading = true
    const response = await fetch('https://vue-crash-live-course-default-rtdb.firebaseio.com/notes.json')
    const data = await response.json()

    this.notes = Object.keys(data).map(key => {
      return {...data[key], id: key}
    })

    this.loading = false
  },
  methods: {
    async createNote() {
      const newNote = {
        title: this.inputValue,
        done: false
      }

      const response = await fetch('https://vue-crash-live-course-default-rtdb.firebaseio.com/notes.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      })
      const data = await response.json()

      this.notes.push({...newNote, id: data.name})
      this.inputValue = ''
    },
    async removeNote(id) {
      await fetch(`https://vue-crash-live-course-default-rtdb.firebaseio.com/notes/${id}.json`, {
        method: 'DELETE'
      })
      this.notes = this.notes.filter(note => note.id !== id)
    },
    async markCompleted(id) {
      const note = this.notes.find(note => note.id === id)
      note.done = true
      await fetch(`https://vue-crash-live-course-default-rtdb.firebaseio.com/notes/${id}.json`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(note)
      })
    }
  },
  components: { NotesList }
}
</script>
