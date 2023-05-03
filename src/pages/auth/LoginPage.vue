<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="bg-grey-2">
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md q-pr-md q-pt-sm">
            <q-card flat class="bg-white text-black">
              <div class="row">
                <div class="col-md-6 col-xs-12 q-pa-md">
                  <div class="row items-center justify-center">
                    <q-img src="../../../logo.png" height="60px" width="60px" />
                  </div>
                </div>
                <div class="col-md-6 col-xs-12">
                  <div class="q-pa-md">
                    <div class="text-h6 q-pb-md text-blue-8 text-center text-weight-bolder">
                      HIS-DD
                    </div>
                    <div class="text-center q-m-xs">Become a leader in digital health information!</div>
                    <div class="q-pa-md q-gutter-md">
                      <q-input v-model="email" outline label="User name" stack-label
                        :error-message="errors.email.errorMsg" :error="errors.email.errorType" />

                      <q-input v-model="password" outline label="Password" stack-label
                        :error-message="errors.password.errorMsg" :error="errors.password.errorType" />

                      <div class="row justify-end">
                        <q-btn size="lg" class="full-width" color="black" label="Login" @click="login" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/user-store'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const $q = useQuasar()

const email = ref('')
const password = ref('')

const errors = reactive({
  email: { errorMsg: null, errorType: null },
  password: { errorMsg: null, errorType: null }
})

const isValidEmail = (val) => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return !emailPattern.test(val)
}

const validation = () => {
  let isError = false

  // Email
  /*
  if (email.value.length < 1) {
    errors.email.errorMsg = 'Please enter your email'
    errors.email.errorType = true
    isError = true
  } else if (email.value.length > 0 && isValidEmail(email.value)) {
    errors.email.errorMsg = 'The email you entered is not valid'
    errors.email.errorType = true
    isError = true
  } else {
    errors.email.errorMsg = null
    errors.email.errorType = null
  }
  */
  // Email END

  // Password
  if (password.value.length < 1) {
    errors.password.errorMsg = 'Please enter your password'
    errors.password.errorType = true
    isError = true
  } else if (password.value.length > 0 && password.value.length < 8) {
    errors.password.errorMsg = 'The minimum password length is 8 characters'
    errors.password.errorType = true
    isError = true
  } else {
    errors.password.errorMsg = null
    errors.password.errorType = null
  }
  // Password END

  return isError
}

const login = async () => {
  const isError = validation()

  if (isError) return false

  try {
    // Get the tokens/cookies
    await userStore.getSanctumCookie()
    // Login user
    await userStore.login(email.value, password.value)

    const user = await userStore.fetchUser()
    // Set user data in localstorage (PINIA)
    userStore.setUser(user.data)

    router.push('/')

    $q.notify({
      type: 'positive',
      position: 'top-left',
      icon: 'check_circle',
      message: 'Welcome back, ' + userStore.getUserName + '!'
    })
  } catch (error) {
    $q.dialog({
      title: 'Login failed',
      message: 'Your login was unsuccessful. Please make sure that your details are correct.',
      persistent: true
    })
  }
}

</script>

<style lang="scss">
#loginPage {
  @import '../../assets/form-styles.scss';
}
</style>
