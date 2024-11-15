<template>
  <Dialog 
    header="MangaMeter"
    v-model:visible="visible"
    modal
    :closable="false"
    :style="{ width: '500px' }">
    <template #default>
      <TabView>
        <!-- Login Tab -->
        <TabPanel header="Login">
          <div class="p-fluid">
            <div class="p-field" style="display: flex;">
              <label for="username" class="textlabel">Username</label>
              <InputText id="username" v-model="username" placeholder="Enter your username" class="inputfield"/>
            </div>
            <div class="p-field" style="display: flex;">
              <label for="password" class="textlabel">Password</label>
              <Password id="password" v-model="password" placeholder="Enter your password" :feedback="false" class="inputfield" inputStyle="width: 100% ;" toggleMask />
            </div>
            <div class="horizontal-stack">
              <Button label="Login" class="p-button-primary" @click="handleLogin" />
      
              <Button
              label="Login with Google"
              icon="pi pi-google"
              class="p-button-outlined p-button-secondary"
              @click="loginWithGoogle"
            />
            </div>
            
          </div>
        </TabPanel>

        <!-- Signup Tab -->
        <TabPanel header="Signup">
          <div class="p-fluid">
            <div class="p-field" style="display: flex;">
              <label for="username" class="textlabel">Username</label>
              <InputText id="username-signup" v-model="username" placeholder="Enter your username" class="inputfield"/>
            </div>
            <div class="p-field" style="display: flex;">
              <label for="password" class="textlabel">Password</label>
              <Password id="password-signup" v-model="password" placeholder="Enter your password" class="inputfield" inputStyle="width: 100% ;" toggleMask />
            </div>
            <div class="p-field" style="display: flex;">
              <label for="confirmPassword" class="textlabel">Confirm Password</label>
              <Password
                id="confirmPassword"
                v-model="confirmPassword"
                placeholder="Confirm your password"
                class="inputfield" inputStyle="width: 100% ;"
                toggleMask
              />
            </div>
            <div class="horizontal-stack">
              <Button label="Signup" class="p-button-primary" @click="handleSignup" />
            
              <Button
                label="Login with Google"
                icon="pi pi-google"
                class="p-button-outlined p-button-secondary"
                @click="loginWithGoogle"
              />
            </div>
            
          </div>
        </TabPanel>
      </TabView>
    </template>
    <template #footer>
      <Button label="Close" class="p-button-secondary" @click="closePopup" />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useAccountStore } from '@/stores/AccountStore';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

const accountStore = useAccountStore();
const { visible } = defineProps();
const emit = defineEmits();

const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const loginWithGoogle = async () => {
  await accountStore.loginWithGoogle();
  if (accountStore.user) {
    emit('close');
  }
};

const handleLogin = async () => {
  await accountStore.login(username.value, password.value);
  if (accountStore.user) {
    emit('close');
  }
};

const handleSignup = async () => {
  if (password.value !== confirmPassword.value) {
    console.error('Passwords do not match');
    return;
  }
  await accountStore.signup(username.value, password.value);
  if (accountStore.user) {
    emit('close');
  }
};

function closePopup() {
  emit('close');
}
</script>

<style scoped>
.p-fluid .p-field {
  margin-bottom: 1rem;
}
.textlabel{
    float:left;
    padding-right: 10px ;
}
.inputfield{
  flex: 1;
}
.inputfield input{
  width: 100% ;
}
.spacer{
  width: 10px;
  height: 10px;
}
.horizontal-stack {
  display: flex;
  flex-direction: row;
  gap: 10px; /* Adjust space between items */
  align-items: center; /* Align items vertically if needed */
}
</style>
