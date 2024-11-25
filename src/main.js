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
        },
        colorScheme: {
            light: {
                primary: {
                    color: '#D89831',
                    inverseColor: '#ffffff',
                    hoverColor: '#c0882c', // Slightly darker for hover
                    activeColor: '#a77027' // Even darker for active state
                },
                highlight: {
                    background: '#D89831',
                    focusBackground: '#c0882c',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                },
                surface: {
                    0: '#ffffff', // Pure white
                    50: '#f9f9f9', // Light gray
                    100: '#f2f2f2',
                    200: '#ebebeb',
                    300: '#e4e4e4',
                    400: '#dddddd',
                    500: '#d6d6d6',
                    600: '#cfcfcf',
                    700: '#c8c8c8',
                    800: '#c1c1c1',
                    900: '#bababa',
                    950: '#b3b3b3' // Darkest light gray
                }
                
            },
            dark: {
                primary: {
                    color: '#D89831',
                    inverseColor: '#ffffff',
                    hoverColor: '#c0882c',
                    activeColor: '#a77027'
                },
                highlight: {
                    background: '#D89831',
                    focusBackground: '#c0882c',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                }
            }
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
