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
        profile: { name: 'Jackson', birthday: {month: 10, day: 18}}
      }
    },
    computed: {
      profileCaption() {
        return this.profile.name === '' ? 'Profile' : `${this.profile.name}${this._isBirthday() ? '🎂' : ''}`
      }
    },
    methods: {
      _isBirthday() {
        let today = {date: ''}
        TimeProvider.getDateCallback(now => today.date = now)
        today = today.date
        return today.getMonth() === this.profile.birthday.month - 1 && today.getDate() === this.profile.birthday.day
      },
      goToProfile(){
        this.$router.push('/profile')
      },
    }
  }
</script>