<template>
    <div id="accountProfile">
        <q-toolbar class="bg-blue-9 text-white">
            <q-toolbar-title>Profile</q-toolbar-title>
        </q-toolbar>

        <div class="text-h6 q-pa-xl text-center">
            <q-avatar size="60px" color="green">RC</q-avatar>
            <div>Rachet Subsan</div>
        </div>

        <div class="menu">
            <q-separator inset />
            <q-list class="q-mx-md">
                <q-item clickable v-ripple @click="router.push('/account/my-details')">
                    <q-item-section avatar>
                        <q-avatar rounded color="primary" text-color="white" icon="account_box" />
                    </q-item-section>
                    <q-item-section class="text-size">My Details</q-item-section>
                    <q-item-section side>
                        <q-icon name="arrow_right" size="35px"></q-icon>
                    </q-item-section>
                </q-item>
            </q-list>

            <q-separator inset />

            <q-list class="q-mx-md">
                <q-item clickable v-ripple @click="logout">
                    <q-item-section avatar>
                        <q-avatar rounded color="red" text-color="white" icon="logout" />
                    </q-item-section>
                    <q-item-section class="text-size">Logout</q-item-section>
                    <q-item-section side>
                        <q-icon name="arrow_right" size="35px"></q-icon>
                    </q-item-section>
                </q-item>
            </q-list>

            <q-separator inset />
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const usercode = ref(null)
const password = ref(null)
</script>

<style lang="scss">
#accountProfile {
    .menu {
        margin: 0 auto;
        width: 500px;
    }

    .text-size {
        font-size: 18px;
    }
}
</style>