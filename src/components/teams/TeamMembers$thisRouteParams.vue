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



 <!-- UPDATING PARAMS DATA WITH WATCHERS - An intended behavior
 =====================================================================
 
 -Note we have added a <router-link to="/teams/t2"></router-link> that redirects us to somewhere when we are in a certain route - say /teams/t2;

 -However , the route is changing but the data is not rendered for that specific component 

 -This is because the vue-router does not destroy and recreate the component just because the url changed

 -Therefore the code created does not run again when the url changed

 -Hence if you are on a page that you want to load again but with diff data with diff parameter , by default the vue-router will do nothing 

 -So how can we react to this change of url;

 -Well we noted that this.$route.params will always hold the latest parameter 

 -And therefore we can add a watcher that watches for changes in the this.$route.params 
 
 
  -->

<template>
    <section>
        <h2>{{ teamName }}</h2>
        <ul>
            <user-item v-for="member in members" :key="member.id" :name="member.fullName" :role="member.role">
            </user-item>
        </ul>

        <router-link to="/teams/t2"> Go To Team 2</router-link>

    </section>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
    inject: ['teams', 'users'],
    components: {
        UserItem
    },
    data() {
        return {
            teamName: '',
            members: []
        };
    },

    methods: {

        loadTeamMembers(route) {

            console.log(route);

            const path = route.path

            console.log(path); // '/teams/t1'

            const teamID = route.params.teamId

            console.log(teamID); // 't1'

            const selectedTeam = this.teams.find(team => team.id === teamID);

            if (!selectedTeam) {
                return;
            }

            const members = selectedTeam.members

            const selectedMembers = []

            for (const member of members) {
                const selectedUser = this.users.find(user => user.id === member)
                selectedMembers.push(selectedUser)
            }
            this.members = selectedMembers
            this.teamName = selectedTeam.name
        }
    },

    created() {

        this.loadTeamMembers(this.$route)

    },

    watch: {
        $route(newRoute) {

            this.loadTeamMembers(newRoute)
        }
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