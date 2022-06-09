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

*/


import { createApp } from 'vue';

import { createRouter  , createWebHistory} from 'vue-router';

import App from './App.vue';

import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';

const router = createRouter({
    history: createWebHistory() ,
    routes : [
        {
            path : '/teams',
            component: TeamsList
        },
        {
            path : '/users',
            component: UsersList
        },
    ] ,

})

const app = createApp(App)

app.use(router);

app.mount('#app');
