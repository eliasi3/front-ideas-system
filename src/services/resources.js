import Vue from 'vue';
import VueResource from 'vue-resource';
// import AxiosPlugin from 'axios';
 
// Vue.use(AxiosPlugin)

// var cors = require('cors')
// Vue.use(cors);

Vue.use(VueResource);


require('./interceptors');

export class Jwt{

    static accessToken(email, password_digest){
        return Vue.http.post('http://localhost:3000/auth', {
            email,
            password_digest
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
export class Criarautor{

    static criarautor(name, description){
        return Vue.http.post('http://localhost:3000/autores', {
            name,
            description
        });
    }
    
}


// const Time = Vue.resource('http://localhost:3000/api/times');
// const Livroaut = Vue.resource(`http://localhost:3000/livros/?author={author}`);
// const Livroid = Vue.resource(`http://localhost:3000/livros{/id}`);

const User = Vue.resource('http://localhost:3000/users');
const Deptos = Vue.resource(`http://localhost:3000/depts`);
const Categories = Vue.resource(`http://localhost:3000/categories`);
const Ideas = Vue.resource(`http://localhost:3000/ideas`);
const Missions = Vue.resource(`http://localhost:3000/missions`);

const Userid = Vue.resource(`http://localhost:3000/users{/id}`);
const Deptosid = Vue.resource(`http://localhost:3000/depts{/id}`);
const Catid = Vue.resource(`http://localhost:3000/categories{/id}`);
const Ideid = Vue.resource(`http://localhost:3000/ideas{/id}`);
const Missionid = Vue.resource(`http://localhost:3000/missions{/id}`);

const Idemis = Vue.resource(`http://localhost:3000/ideas/?mission_id={id}`);






export {User, Deptos, Userid, Categories, Deptosid, Ideas, Catid, Missions, Ideid, Missionid, Idemis};
