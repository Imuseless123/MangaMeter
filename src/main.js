import './assets/color.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import 'primeicons/primeicons.css';
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";   

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#fbfae7',
            100: '#efe99d',
            200: '#e7db5e',
            300: '#e0c441',
            400: '#D89831',
            500: '#d07423',
            600: '#d07423',
            700: '#d07423',
            800: '#d07423',
            900: '#d07423',
            950: '#d07423'
        }
        
    },

    
});


const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: MyPreset
    }
});
app.use(PrimeVue);
app.use(ToastService);
app.component("Toast", Toast);
app.use(createPinia())
app.use(router)

app.mount('#app')
