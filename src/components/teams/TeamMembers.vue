<!--
PASSING DATA WITH ROUTE PARAMS DYNAMICALLY
============================

-We can therefore access the value of the route params and store it in a constant by the following syntax
    e.g. const teamID =  this.$route.params.teamId

-We inject ['teams','users'] which has been provided by App.vue and therefore now we have access to teams / users data

-Thus we can find the id of the team that matches the route params from the teams []

        const selectedTeam = this.teams.find(team => team.id === teamID);

-If found , that means we have access to members property from the selectedTeam results which we can store in a constant variable

        const members = selectedTeam.members

-We can loop through the members[] and search/find from the users [] if the ID matches

-We can define an empty array and push each member to this array if there is a user match

-Then update members and teamName in the DOM

 -->

<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject : ['teams','users'],
  components: {
    UserItem
  },
  data() {
    return {
        teamName : '',
        members : []
    };
  },

  created(){

    const path = this.$route.path   
    
    console.log(path); // '/teams/t1'

    const teamID = this.$route.params.teamId 

    console.log(teamID); // 't1'

    const selectedTeam = this.teams.find(team => team.id === teamID);

    const members = selectedTeam.members

    const selectedMembers = []

    for( const member of members ){
      const selectedUser =  this.users.find(user => user.id === member)
      selectedMembers.push(selectedUser)
    }
    this.members = selectedMembers
    this.teamName = selectedTeam.name
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>