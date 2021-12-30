import Vue from 'vue';
import Vuex from 'vuex';
import {TimeModel} from './time-model';
import {DeptosModel} from './deptos-model';
import {AutoresModel} from './autores-model';
import JwtToken from './services/jwt-token';
import {Deptos, User} from './services/resources';
import SessionStorage from './services/session-storage';


Vue.use(Vuex);


const state = {
    depts: [],
    auth: {
        check: JwtToken.token != null,
        user: SessionStorage.getObject('user')
    },
    
};

const mutations = {
    'set-deptos'(state, depts){
        state.depts = depts;
        // console.log(state.livros);
    },
    update(state, time){
        let index = state.times.findIndex(element => time.id == element.id);
        if (index != -1) {
            state.times[index] = time;
        }
    },
    setUser(state,user){
        SessionStorage.setObject('user', user);
        state.auth.user = user;
    },
    authenticated(state){
        state.auth.check = true;
    },
    unauthenticated(state){
        state.auth.check = false;
        state.auth.user = null;
        SessionStorage.remove('user');
        JwtToken.token = null;
    }
};

const actions = {
    'load-depts'(context){
        // if(filtro != 0){
            // Deptos.query({author: filtro}).then(response => {
            
            // var an_obj = response.data.data;
            //     // console.log(an_obj)
            // var responseobj = Object.values(an_obj);
            //     // console.log(responseobj)
            // let livros = responseobj.map(element => new LivrosModel(element.id, element.name, element.author, element.description));  
            // context.commit('set-livros', livros);
            
            // });
        // }else {
            Deptos.query().then(response => {
                var an_obj = response.data;
                // console.log(an_obj)
                    // console.log(an_obj)
                var responseobj = Object.values(an_obj);
                    // console.log(responseobj)
                let depts = responseobj.map(element => new DeptosModel(element.id, element.dep_name, element.created_at));  
                context.commit('set-deptos', depts);
            
            });
        // }
    },
   

    login(context, {email, password_digest}){
        console.log(email, password_digest)
        return JwtToken.accessToken(email, password_digest)
            .then(response => {
                context.commit('authenticated');
                context.dispatch('getUser');
            return response;
        })
    },

    saveuser(context, user){
        User.save({user: user}).then(response => {
            console.log('Cadastro feito com sucesso!')
            // success callback
            console.log(response.data)
        }, response => {    
            // error callback
            console.log('erro no cadastro')
        });
    },
    
    
    getUser(context){
        User.query().then(response => {
            context.commit('setUser', response.data.user);
        })
    },
};

export default new Vuex.Store({
    state,
    getters: {
        timesLibertadores: state => state.times.slice(0, 6),
        timesRebaixados: state => state.times.slice(16, 20),
    },
    mutations,
    actions
});