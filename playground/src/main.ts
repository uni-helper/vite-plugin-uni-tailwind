import { createSSRApp } from 'vue';
import App from './App.vue';
import './styles/preflight.css';
import './styles/tailwind.css';

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
