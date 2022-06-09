<!-- NAVIGATING WITH router-link
=========================

- Instead we will now navigate differently;

-We will not use the button anymore but use another built-in component that comes with the vue-router

-<router-link></router-link> is a little bit similar to the <a></a> tag HTM element but is a special anchor tag which will not load the entire page or reload the entire app.

-You can still pass any Text or any HTML element because router link internally uses slots
    e.g. <router-link>Teams</router-link>
    OR  <router-link><h2></h2></router-link>

-And now we need to configure router link with the to="" prop which it expects

-The to="" props takes various diff values and the simplest way to use is to provide a path which you wanna go to
  e.g <router-link to="/teams">Teams</router-link>

-'/teams' has to be one of the routes you are supporting in your createRouter configuration

-replace button styles with a because router-link under the hood will render an achor tag

-And this works..

-If you inspect some css classes are also added when you switch on btwn the routes and these are ; 
    e.g. class="router-link-active router-link-exact-active"

-And we only have them under the current link that we are currently on

-These are added automatically by the router-link for the link that is currently active so that you can actually style these links based on the selection to give the user the feedback regarding the link which they are currently on
 -->

 <!-- STYLING ACTIVE LINKS
=========================

-Add a.router-link-active to css classes - Apply some/specified styles to the link that has this class on it

-Diff between .router-link-active and .router-link-exact-active

  -.router-link-active - Applied on routes with Teams e.g. /teams

  -.router-link-exact-active - Applied on nested routes with Teams e.g /teams/team/id

-You can also do the configuration in the createRouter({}) by adding linkActiveClass and the linkExactActiveClass options and then use names of classes you would like instead of the .router-link-active which would be the default in the main.js

-And this still works
 -->


<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/teams">Teams</router-link>
        </li>
        <li>
          <router-link to="/users">Users</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>


<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #11005c;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 2rem;
}

a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

a:hover,
a:active,
a.active{
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
</style>