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
export class Criarlivro{

    static criarlivro(name, author, description){
        return Vue.http.post('http://localhost:3000/livros', {
            name,
            author,
            description
        });
    }
    
}


//const Time = Vue.resource('http://localhost:3000/api/times');

const User = Vue.resource('http://localhost:3000/users');
const Livro = Vue.resource('http://localhost:3000/livros');

export { User, Livro};