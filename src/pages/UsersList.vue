<!-- Programmatic Navigation - this.$router.push('/path')
============================

-Let's say for example we have a button in the UsersList component and we wanna use it to navigate to some page

-We have this.$router.push() which we can use inside our export default {} - for programmatic Navigation

-Idearly adding to the webHistory the route you wanna go to

-And then specify which link we want to go to
  e.g. this.$router.push('/teams') - Redirects to teams page
        this.$router.back() - Redirects to current page
        this.$router.forward() - Emulate backward/forward buttons in the browser and much more
-->

<template>
<button @click="confirmInput"> Confirm</button>
<button @click="saveChanges"> Save Changes</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {

  inject: ['users'],

  components: {
    UserItem,
  },

  data(){
    return {
      changesSaved : false
    }
  },

methods : {
  confirmInput(){
    //do something..say navigate to teams page

    this.$router.push('/teams')
  },

  saveChanges(){
    this.changesSaved = true
  }
},

beforeRouteEnter(to,from,next){
  console.log('UsersList Cmp beforeRouteEnter');
  console.log(to ,from);
  next()
},

beforeRouteLeave(to,from,next){
  console.log('UsersList Cmp beforeRouteLeave');
  console.log(to ,from);

  if (this.changesSaved){

    next()
  }else{
    const userWantsToLeave = confirm('Are you sure  ? You got unsaved changes')
    next(userWantsToLeave)
  }
},

unmounted(){
  console.log('unmounted');
}

};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>