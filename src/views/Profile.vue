<template>
  <div>
    <h2>Profile</h2>
    <div class="form-item">
      <div class="label">
        <label>Name: </label>
      </div>
      <div class="editor">
        <input v-model="profile.name" placeholder="Name">
      </div>
    </div>
    <div class="form-item">
      <div class="label">
        <label>Birthday: </label>
      </div>
      <div class="editor">
        <input v-model.number="profile.birthday.year" placeholder="YYYY">/<input v-model.number="profile.birthday.month" placeholder="MM">/<input v-model.number="profile.birthday.day" placeholder="DD">
      </div>
    </div>
    <div class="form-item">
      <button @click="save" class="button">Save</button>
    </div>
  </div>
</template>

<script>
  import Api from "../api";

  export default {
    data() {
      return {
        profile:{
          name: '',
          birthday: {
            year: 1980,
            month: 1,
            day: 1,
          }
        }
      }
    },
    methods: {
      save() {
        Api.updateProfile(this.profile)
      }
    },
    beforeMount() {
      let profile = Api.getProfile()
      if (profile !== null) {
        this.profile = profile
      }
    }
  }
</script>