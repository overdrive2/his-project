<template>
  <q-page class="q-pa-md" id="newOrder">
    <div :class="$q.screen.lt.md ? '' : 'row'">
      <div class="col q-pa-sm">
        <div class="text-h6 text-center">One day</div>
        <q-tabs v-model="tab" inline-label class="bg-primary text-white shadow-2">
          <q-tab name="diet" icon="mail" label="Diet" @click="showMedium()" />
          <q-tab name="alarms" icon="alarm" label="Alarms" />
          <q-tab name="movies" icon="movie" label="Movies" />
          <q-tab name="photos" icon="photo" label="Photos" />
          <q-tab name="videos" icon="slow_motion_video" label="Videos" />
          <q-tab name="addressbook" icon="people" label="Address Book" />
        </q-tabs>
        <q-scroll-area :class="$q.screen.lt.md ? 'list-sm' : 'list-lg'">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur
                  adipiscit elit.</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>5 min ago</q-item-label>
                <q-icon name="star" color="yellow" />
              </q-item-section>
            </q-item>

            <q-separator spaced inset />

            <q-item>
              <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
                  elit.</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>Voted!</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator spaced inset />

            <q-item>
              <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
                  elit.</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-badge color="teal" label="10k" />
              </q-item-section>
            </q-item>

            <q-separator spaced inset />

            <q-item>
              <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
                  elit.</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>2 min ago</q-item-label>
                <div class="text-orange">
                  <q-icon name="star" />
                  <q-icon name="star" />
                  <q-icon name="star" />
                </div>
              </q-item-section>
            </q-item>

            <q-separator spaced inset />

            <q-item>
              <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
                  elit.</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>meta</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
      <div class="col q-pa-sm">
        <div class="text-h6 text-center">Continue</div>
        <q-tabs v-model="tab" inline-label class="bg-primary text-white shadow-2">
          <q-tab name="diet" icon="mail" label="Diet" @click="showMedium()" />
          <q-tab name="alarms" icon="alarm" label="Alarms" />
          <q-tab name="movies" icon="movie" label="Movies" />
          <q-tab name="photos" icon="photo" label="Photos" />
          <q-tab name="videos" icon="slow_motion_video" label="Videos" />
          <q-tab name="addressbook" icon="people" label="Address Book" />
        </q-tabs>
      </div>
    </div>

    <q-dialog v-model="medium">
      <diet-from @openSearch="openSearch" />
    </q-dialog>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import DietFrom from './DietFrom.vue'

const medium = ref(false)
const dialog = ref(false)

const showMedium = () => {
  medium.value = true
}

const openSearch = () => {
  dialog.value = true
}
</script>

<style lang="scss">
#newOrder {
  .section-title {
    padding: 12px 10px 8px 10px;
    max-width: 500px;
    margin: 0 auto;
  }

  .info {
    font-size: 16px;
  }

  .borderBottom {
    border-bottom: 1px solid rgb(201, 201, 201);
  }

  .list-lg {
    margin: 0 auto;
    height: calc(100vh - 250px);
    width: 100%;
  }

  .list-sm {
    margin: 0 auto;
    height: calc(30vh);
    width: 100%;
  }
}
</style>
