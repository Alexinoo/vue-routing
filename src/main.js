/* --INSTALLING vue-router Package
===============================

-Import createRouter from vue-router ; i.e the package that we have just installed using
    npm install --save vue-router@next 
    
-@next is optional but to get the latest package use @next

USAGE
======

-createRouter() takes in a JavaScript Object that needs some configurations which we store in a constant

-e.g It needs to know which different Url's we wanna support and much more

-We have 2 important options that we can set

        1.) history 
        - Tells the router how to manage the routing history in this app i.e When a user clicks on a route , it's added to the routing history and if the user clicks a Back button , the history makes the router know what the last page/route was.
        -For that to happen , we need to import the createWebHistory() which we call here as a history option

        -We are basically telling the browser here use the built-in browser support

        2.) routes
         - Register different routes/urls that we want to support in [] coz it's not just 1 route but several
         -Basically we are telling the router which components shd be loaded and at what url's


REGISTERING & RENDERING THE ROUTES
============================

-We pass JavaScript Object {} with each object representing 1 route and the configuration for that route;

-One thing we need to specify here :

    1.) path option - Specifies the path of the url a certain component should be loaded
    2.) component option - Specifies the component that should be loaded in that path when the user visits '/teams'

-Finally we need to make our Vue App aware of const router which holds this routes

-And we do this by calling app.use() which is a built in method that allows us to connect our Vue app with a 3rd party package with some other functionality

-But still app.use(router); is not enough because Vue does not know where to this component shd be rendered

-Instead we need to use a special component to let the vue-router know where to render it ;

-continued ..at App.vue

PASSING DATA WITH ROUTE PARAMS DYNAMICALLY
============================

-Use /:id to dynamically add a dynamic parameter

-We register another route with /teams/:teamID and this will be used to filter that we wanna filter for the teamMember with teamID specified

-The dynamic id can therefore be accessible from the Component that we want to be loaded by that url by using
    e.g. this.$route.params.teamId



 PASSING PARAMS AS PROPS
============================

-We have another property that we can pass to our routes configure object

-And that is props;

-If we set it to true i.e. props : true , this means that the dynamic /:teamId will be passed to TeamMembers Component  

  {
            path: '/teams/:teamId',
            component: TeamMembers,
            props : true
        },

-continued in TeamMembers....



REDIRECTING & "Catch All " routes
============================

-We can define an object with a path that loads a component OR redirects to another Component when https://127.0.0.1:8080 is visited

-There are several ways we can use to achieve that:

1.) Add the component to be loaded in that path

            e.g.     // { path : '/',   component: TeamsList }, 
            -Loads TeamsList component but however the url does not change to reflect this

   2.) Use redirect : property and point out which url we want to be redirected to

            e.g.     // { path : '/', redirect : '/teams' }, 
            -Works perfect and the url is updated

   3.) Add alias: '/' property and specify that root page is also an alias of TeamsMember component

            e.g.     {
                path : '/teams',
                component: TeamsList ,
                alias : '/'
            },
            -However the url does not change to reflect this which is a different to a redirect

Catch All - UnHandled Routes
---------
-Upto now we have not handled the case of a route not found ; i.e Users can still enter anything and get a blank page

-So, we handle this by adding :notFound or :catchAll and then pass (.*) to it
     e.g. { path : '/:notFound(.*)' }

-This means any character combination should be handled by { path : '/:notFound(.*)' }

-Must be added as the last path so that it does not overwite the rest of the paths

-Then provide the Component that you want to be loaded; 

    e.g.     { path : '/:notFound(.*)'  , component : TeamsMembers } ,

-Or redirect to '/teams' for any invalid value entered

    e.g.     { path : '/:notFound(.*)'  , redirect : '/teams' } ,

-Alternatively , you can create a NotFound component which should be loaded if the url cannot be found

    e.g.  { path: '/:notFound(.*)',  component : NotFound } ,


USING NESTED ROUTES
============================

-Suppose we want a scenario where when we click View Members , we don want to be redirected to another page but rather loads TeamsMembers above the list on the same page;

-We can achieve this using Vue-router 

-We have {  path: '/teams/:teamId',component: TeamMembers,  props : true }, which when we click takes us to another page you could say

-Currently it's stand alone and we can use the component where this componet is called and add children property which takes in an []

    e.g. {  path : '/teams', component: TeamsList , children : []

-In the children's array , we specify the roues we want to be called inside the parent path

 e.g. {  path : '/teams', component: TeamsList , children : [

    {  path: '/teams/:teamId',component: TeamMembers,  props : true },
] },

-So inside our teams route we have a child route which is   {  path: '/teams/:teamId',component: TeamMembers,  props : true },

-And in the children route ,we don't need to repeat path: '/teams/:teamId' , we can add :teamId and this will work too

-And we can have more than one route inside children's array which will be reached as
    /teams/t1
    /teams/t2
    /teams/t3

-But once we save this, the vue-router still does not know where to render this anymore because the children path is not directly registered inside routes : [] but rather a child route of another route

-Instead we need to add <router-view></router-view> in  the component where  {  path: '/teams/:teamId',component: TeamMembers,  props : true }, is defined as the child 

-i.e In our case , that will be in the TeamsList component

-so we can add <router-view></router-view> just above the <ul></ul>


NAMED ROUTES
====================================================
-We can add name property to name that route

-we can also add name property to the children routes as well and then use these names as leverage

  { 
    name : 'teams'
    path : '/teams',
    component: TeamsList , 
    children : [

            {  
                name : 'teamMemebers
                path: ':teamId',
                component: TeamMembers,
                props : true
             },

        ] 
 },

-continued in TeamsItem.vue.....



===============================================================
Rendering Multiple Routes With Named Router Views
===============================================================

-In your route config , you can register more than one component for route;

-instead of having component , we can have components which takes in an object

    e.g. components : {
         key : value
    }

-Where : -

    -keys - identify different router views
    
    -values are the components that should be loaded into this router views

-Only work if we give this <router-view></router-view> names just as you can give names to slots

-You are allowed to have one unnamed which will be treated as default but also need to specify which component should be loaded as default
    e.g. 
         {  
            name : 'teams',
            path : '/teams',
            components: {

                default: TeamsList ,
                footer: TeamsFooter
            } , 
            children : [

            { name : 'team-members', path: ':teamId',component: TeamMembers,  props : true },

            ] 
    },

-Also let's do the same for the users routes config

*/


import { createApp } from 'vue';

import { createRouter  , createWebHistory} from 'vue-router';

import App from './App.vue';

import TeamsList from './components/teams/TeamsList.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersList from './components/users/UsersList.vue';
import UsersFooter from './components/users/UsersFooter.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue'

const router = createRouter({

    history: createWebHistory() ,

    routes : [

        { path : '/', redirect : '/teams' },


        {  
            name : 'teams',
            path : '/teams',
            components: {

                default: TeamsList ,
                footer: TeamsFooter
            } , 
            children : [

            { name : 'team-members', path: ':teamId',component: TeamMembers,  props : true },

            ] 
    },

        {  
            path : '/users',
            components: {
                
                default : UsersList ,
                footer : UsersFooter
            
            }
        
        
        },


        { path: '/:notFound(.*)',  component : NotFound } ,
    ] ,
    linkActiveClass : 'active' ,

})

const app = createApp(App)

app.use(router);

app.mount('#app');
