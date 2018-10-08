<template>
  <header class="clearfix">
    <router-link to="/">Home</router-link>
    <div @click="goToProfile" style="cursor: pointer;float: right">{{profileCaption}}</div>
  </header>
</template>

<style>
  .clearfix::after {
    content: "";
    clear: both;
    display: table;
  }
  header {
    padding-bottom: 50px;
  }
</style>

<script>
  import TimeProvider from "../domain/timeProvider";

  export default {
    data() {
      return {
        profile: { name: 'Jackson', birthday: {month: 10, day: 18}},
        today: new Date()
      }
    },
    computed: {
      profileCaption() {
        return this.profile.name === '' ? 'Profile' : `${this.profile.name}${this._isBirthday() ? '🎂' : ''}`
      }
    },
    methods: {
      _isBirthday() {
        return this.today.getMonth() === this.profile.birthday.month - 1 && this.today.getDate() === this.profile.birthday.day
      },
      goToProfile(){
        this.$router.push('/profile')
      },
    },
    beforeMount() {
      TimeProvider.getDatePromise().then(today => this.today = today)
    }
  }
</script>