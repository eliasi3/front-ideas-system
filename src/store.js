import Vue from 'vue';
import Vuex from 'vuex';
import {TimeModel} from './time-model';
import {LivrosModel} from './livros-model';
import JwtToken from './services/jwt-token';
import {Livro, User} from './services/resources';
import SessionStorage from './services/session-storage';


Vue.use(Vuex);


const state = {
    times: [],
    livros: [],
    auth: {
        check: JwtToken.token != null,
        user: SessionStorage.getObject('user')
    },
    
};

const mutations = {
    'set-times'(state, times){
        state.times = times;
    },
    'set-livros'(state, livros){
        state.livros = livros;
        console.log(state.livros);
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
    'load-times'(context){
        Time.query().then(response => {
            let times = response.data.map(element => new TimeModel(element.id, element.nome, element.escudo));
            context.commit('set-times', times);
        });
    },
    'load-livros'(context){
        Livro.query().then(response => {

            var an_obj = response.data.data;

                // console.log(an_obj)

            var responseobj = Object.values(an_obj);

                // console.log(responseobj)

            let livros = responseobj.map(element => new LivrosModel(element.id, element.name, element.author, element.description));  
            context.commit('set-livros', livros);
            
        });
    },

    login(context, {email, password}){
        
        return JwtToken.accessToken(email, password)
            .then(response => {
                context.commit('authenticated');
                context.dispatch('getUser');
            return response;
        })
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