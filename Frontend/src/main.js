import './assets/main.css'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

import router from './router';
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.use(router);
app.use(VueAwesomePaginate);
app.mount('#app');

