<!-- Routing Setup
===============================================================

-We use the router-view component which tells the router that this is the place where the selected routed to component should be loaded

-Therefore we replace  <component :is="activePage"></component> with <router-view></router-view> special component

-And therefore we can now remove TeamsList/UsersList which we had registered here because we have already registered them globally in the main.js and therefore no need to register them locally in App.vue

-We still see nothing because we are still at our domain

-->

<!-- Rendering Multiple Routes With Named Router Views
===============================================================

-If multiple <router-view></router-view> are used , then we need to name them and then leave one unnamed which will be treated as default;

  <main>
    <router-view></router-view>
    </main>

<footer>
  <router-view name="footer"></router-view>
  </footer>

-->


<template>
  <the-navigation ></the-navigation>
  <main>
   <router-view></router-view>
  </main>

  <footer>
    <router-view name="footer"></router-view>
  </footer>

</template>

<script>
import TheNavigation from './components/nav/TheNavigation.vue';

export default {
  components: {
    TheNavigation,
  },
  data() {
    return {
      teams: [
        { id: 't1', name: 'Frontend Engineers', members: ['u1', 'u2'] },
        { id: 't2', name: 'Backend Engineers', members: ['u1', 'u2', 'u3'] },
        { id: 't3', name: 'Client Consulting', members: ['u4', 'u5'] },
      ],
      users: [
        { id: 'u1', fullName: 'Max Schwarz', role: 'Engineer' },
        { id: 'u2', fullName: 'Praveen Kumar', role: 'Engineer' },
        { id: 'u3', fullName: 'Julie Jones', role: 'Engineer' },
        { id: 'u4', fullName: 'Alex Blackfield', role: 'Consultant' },
        { id: 'u5', fullName: 'Marie Smith', role: 'Consultant' },
      ],
    };
  },
  provide() {
    return {
      teams: this.teams,
      users: this.users,
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>