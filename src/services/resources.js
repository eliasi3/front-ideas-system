import Vue from 'vue';
import VueResource from 'vue-resource';
// import AxiosPlugin from 'axios';
 
// Vue.use(AxiosPlugin)

// var cors = require('cors')
// Vue.use(cors);

Vue.use(VueResource);


require('./interceptors');

export class Jwt{

    static accessToken(email, password){
        return Vue.http.post('http://localhost:3000/auth', {
            email,
            password
        });
    }

    static refreshToken(){
        return Vue.http.post('http://localhost:3000/api/refresh_token');
    }
}

//const Time = Vue.resource('http://localhost:3000/api/times');

const User = Vue.resource('http://localhost:3000/users');

export {Time, User};