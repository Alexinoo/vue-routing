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

-Also let's do the same for the users routes config {

}


===============================================================
Controlling Scroll Behavior
===============================================================

-We can use a scrollBehavior() {} which we add to  our createRouter()

-This methods takes 3 parameters:

    - to :- Shows the content of (this.$route) that you are currently in
    -from : - Shows the content of (this.$route) that you were coming from

    -The following return means that content will always be displayed at the top without the users scrolling to top to see the contents of View Members

    {
        left : 0 ,
        top : 0 ,
    }

    
    -savedPosition :-Retuns the position that the user was currently in from a previous page

===============================================================
Introducing Navigation Guards - Works like a Middleware
===============================================================

-Navigation guards are used with features like Authentication to allow the user to access a certain route if he/she is not authenticated

-Guards are functions/methods which are called automatically by Vue-router when a navigation action is started

-we can call beforeEach( function( to , from , next  ){} ) which takes in a function as an argument 

-This function is called by vue-router whenever we navigate from one page to the other

-Takes 3 parameters :

    1.) to - Route object of the page we are going to

    2.) from - Route object of the page we are coming from

    3. next() - Is a function which we have to call to either Confirm/Cancell this navigation action

-At the moment we call next() like this ; ANd this means we allow the navigation/confirm navigation

-You can pass false to next(false) - which cancels the navigation or true

-You can also pass a string with url next('/users) which needs to be defined in the routes property in the createRouter({  }) configuration object
    .e.g. next('/users')

-Or a configuration object {}
    .e.g. next({ name : 'team-members' , params : { teamId : 't2' } })

-Is useful because it allows us to deny the user access to proceed further  if they are not authenticated

-DIVING DEEPER INTO Navigation Guards
=================================================================

1.) beforeEach()
----------------------------

-Global beforeEach() runs on any navigation no matter which route is being used

-You can also set beforeEach on single route e.g Configure on single routes

2.) beforeEnter()
-------------------

-We call beforeEnter() on single route objects which is also a function that takes (to,from,next)

        {  
            path : '/users',
            components: {                
                default : UsersList ,
                footer : UsersFooter            
            },
            beforeEnter( to , from , next ){
                
            }     
        
        },

3.) beforeRouteEnter()
-------------------

-we call beforeRouteEnter() on a component which also takes in to,from and next() parameters

-in this case let's call in our UsersList component

beforeRouteEnter(to,from,next){
  console.log('UsersList Cmp beforeRouteEnter');
  console.log(to ,from);
  next()
},

-And this method will be called anytime UsersList Component is rendered/loading

3.) beforeRouteUpdate()
-------------------
-Called directly inside a component - inside a component which are re-used i.e TeamMembers in our case

-Vue will call this method whenever this component is about to be re-used with new data because the route changed

-Takes to,from and next() parameters and you can deny/confirm navigation using the next() and besides that you can utilize to by which you can call params.teamId to the navigated team object

-Using beforeRouteUpdate() can be used as an alternative of using watchers though it is strictly used with routing ; i.e We use props instead of route params to make our component more flexible


4.) afterEach()
-------------------

-Takes only 2 arguments to , from

-Because it runs once a navigation has been confirmed

-Therefore we can't deny/confirm navigation which can only be done with before gurads

-Could be useful for sending analytics data to your serve to log every navigation action 

    i.e. When a user changes pages

-We dont use it to control what the user sees on the screen since it is too late at this point 


5.) beforeRouteLeave()
-------------------

-before guards are run before navigation action

-beforeRouteLeave() guard however is used when a user is leaving

-A good use case will be when a user is entering some data to a form and then wants to switch to another page/route

-Very useful since we can alert the user that there are unsaved changes and if the user confirms that , then he is allowed to navigate to the next page/route;

-Still works if the user clicks the back button

-Implemented in UsersList component; The user must click Save changes button for him to be allowed to switch to some other change 

-Very useful for providing best User's experience

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
                footer: TeamsFooter ,
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
            },
            beforeEnter(to, from, next) {
                console.log('Users beforeEnter');
                console.log(to , from);
                next();

            }           
        
        },

        { path: '/:notFound(.*)',  component : NotFound } ,
    ] ,
    linkActiveClass : 'active' ,

    scrollBehavior (_, _2, savedPosition) {

        // console.log(to , from , savedPosition);
        
        if(savedPosition){
            return savedPosition;
        }
        return {
            left : 0 ,
            top : 0 ,
        }
    }

})



router.beforeEach(function (to, from, next  ){

    console.log('Global Before Each');
    console.log( to , from );
    // if( to.name === 'team-members' ){

    //     next();
    // }else{
    //     next({ name: 'team-members', params: { teamId: 't2' } })
    // }
    next()

})

router.afterEach(( to, from)=>{

    //sending analytics data
    console.log('Global afterEach() called..');
    console.log(to , from);
})

const app = createApp(App)

app.use(router);

app.mount('#app');
