<!--
  NAVIGATION AND DYNAMIC PATHS
  ============================

  -Replace anchor tags with <router-link></router-link>

  -Then bind :to="" property so that we can pass the id dynamically

  -Expect id from the TeamsList which will be passed as a prop

  OPTIONAL
  -----------

  -We can add a computed property

  computed : {

    teamMemberLink() {

      return '/teams/' +this.id
    }
  }

  -And then point to it in the to="teamMemberLink" inside <router-link></router-link>

  <router-link to="teamMemberLink"></router-link>

  NAMED ROUTES - ( continuation )
====================================================

-Now instead of   ( return '/teams/' + this.id ) we can retun an object with the name of the route we want to load.

-This makes it clear that  teamMemberLink() will load team-members link

Then we pass in the params since our TeamMembers expect teamId as an object

e.g. 
 
 return {
        name : 'team-members' ,
        params : {
          teamId : this.id
        }
      }
    }

    -This would be as same as doing the following which works as well

    this.$router.push({  name : 'team-members' , params : {teamId : this.id } })

 USING QUERY PARAMS 
====================================================

-Query params - Optional route parameters which are not needed to find or load a component but may be used to add extra info in that cmpnt 

-Added after ? mark 
      e.g. ?sort=asc

-You can either add this manually  by adding '?sort=asc'
 
  e.g
     return '/teams/' +this.id+ '?sort=asc'

-But if we use the object form it's actually more convinient

-We add   to our return object

      query : {
                sort : 'asc
              }

      return {
              name : 'team-members' ,
              params : { teamId : this.id },
              query : {  sort : 'asc'   }
            }
          }

-can be accessible from TeamMembers through   ( this.$route.query ) 

     // console.log(this.$route.query);

 -->



<template>
  <li>
    <h3>{{ name }}</h3>
    <div class="team-members">{{ memberCount }} Members</div>
    <router-link :to="teamMemberLink">View Members</router-link>
  </li>
</template>

<script>
export default {
  props: ['id','name', 'memberCount'],

  computed: {

    teamMemberLink() {
    
      return {
        name : 'team-members' ,
        params : {  teamId : this.id  } ,
        query : { sort : 'asc' }
      }
      // Would be same as:
    //  return  this.$router.push({  name : 'team-members' , params : {teamId : this.id } })
    }
  }
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
}

li h3 {
  margin: 0.5rem 0;
  font-size: 1.25rem;
}

li .team-members {
  margin: 0.5rem 0;
}

a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #11005c;
}

a:hover,
a:active {
  background-color: #220a8d;
}
</style>