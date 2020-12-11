import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './theme.css'


// const App = {
//   // template: `
//   //   <div class="container">
//   //     <div class="card">
//   //       <h1>Hello Vue</h1>
//   //       <button>
//   //     </div>
//   //   </div>
//   // `
//   data() { return { counter: 42 } },
//   methods: { click() {this.counter++} },
//   render() {
//     return h('div', {className: 'container'},
//       h('div', {className: 'card'},
//         [
//           h('h1', null, this.counter),
//           h('button', {
//             className: 'btn',
//             onClick: this.click
//           }, 'Click me!'),
//
//         ]
//       ),
//     )
//   }
// }

createApp(App)
  .use(router)
  .mount('#app')
