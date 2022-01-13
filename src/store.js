import Vue from 'vue';
import Vuex from 'vuex';
import {DeptosModel} from './deptos-model';
import {UsersModel} from './users-model';
import {CategoriesModel} from './categories-model';
import {IdeasModel} from './ideas-model';
import {CommentModel} from './comment-model';
import JwtToken from './services/jwt-token';
import {MissionModel} from './mission-model';
import {Deptos, User, Categories, Userid, Ideas, Missions, Comments, Idemis, Idcom, Userdept, Idecat, Idept} from './services/resources';
import SessionStorage from './services/session-storage';
import axios from 'axios';

Vue.use(Vuex);


const state = {
    depts: [],
    categories: [],
    users: [],
    ideas: [],
    missions: [],
    comments: [],
    auth: {
        check: JwtToken.token != null,
        user: SessionStorage.getObject('user')
    },
    
};

const mutations = {
    'set-categories'(state, categories){
        state.categories = categories;
        // console.log(state.livros);
    },
    'set-deptos'(state, depts){
        state.depts = depts;
        // console.log(state.depts);
    },
    'set-mission'(state, missions){
        state.missions = missions;
        // console.log(state.depts);
    },
    'set-users'(state, user){
        state.users = user;
        // console.log(state.users);
    },
    'set-ideas'(state, ideas){
        state.ideas = ideas;
        // console.log(state.users);
    },
    'set-comments'(state, comments){
        state.comments = comments;
        // console.log(state.users);
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
    'recuperar-senha'(context, email){
        User.query({email: email}).then(response => {
            
            console.log(response.data)
        });
    },
    'load-ideasfiltrocategorie'(context, page){
        var cat = document.getElementById('category_id').value;
        var miss = document.getElementById('mission_id').value;
        var search_up = document.getElementById('search').value;
        

                    // alert('Existe uma categoria');
            // console.log('?category_id='+cat+'&mission_id='+miss+'&search='+search)
            
            Idecat.query({category_id: cat, mission_id: miss, search: search_up, page: page}).then(response => {
                
                
                var an_obj = response.data;
                // console.log(an_obj)
                var responseobj = Object.values(an_obj);
                // console.log(responseobj)
                let ideas = responseobj.map(element => new IdeasModel(element.id, element.idea_name, element.idea_description, element.user, element.category, element.mission));  
                context.commit('set-ideas', ideas);

            });    


        
    },
    'load-missionfiltrodept'(context, dept){
        var dept = document.getElementById('dept_id').value;
        var search_up = document.getElementById('search').value;
        
        Idept.query({dept_id: dept, search: search_up}).then(response => {
            var an_obj = response.data;
            // console.log(an_obj)
                // console.log(an_obj)
            var responseobj = Object.values(an_obj);
                // console.log(responseobj)
            let missions = responseobj.map(element => new MissionModel(element.id, element.mis_name, element.mis_description, element.mis_image, element.dept, element.user));  
            // console.log('load', user)
            context.commit('set-mission', missions);

            });    
    },

    'load-userfiltrodept'(context, dept){
        var dept = document.getElementById('dept_id').value;
        var search_up = document.getElementById('search').value;
        
        Userdept.query({dept_id: dept, search: search_up}).then(response => {
            var an_obj = response.data;
            // console.log(an_obj)
                // console.log(an_obj)
            var responseobj = Object.values(an_obj);
                // console.log(responseobj)
            let users = responseobj.map(element => new UsersModel(element.id, element.dept, element.username, element.email, element.user_name, element.user_phone, element.dept_id));   
            // console.log('load', user)
            context.commit('set-users', users);

            });    
    },


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
    'load-categories'(context){
        Categories.query().then(response => {
                var an_obj = response.data;
                // console.log(an_obj)
                    // console.log(an_obj)
                var responseobj = Object.values(an_obj);
                    // console.log(responseobj)
                let categories = responseobj.map(element => new CategoriesModel(element.id, element.cat_name, element.created_at));  
                context.commit('set-categories', categories);
            
            });
        // }
    },

    'load-ideas'(context, idea){
        //console.log(idea)
        if(!idea){
            //console.log('não existe uma ideia');
            Ideas.query().then(response => {
                var an_obj = response.data;
                // console.log(an_obj)
                    // console.log(an_obj)
                var responseobj = Object.values(an_obj);
                    // console.log(responseobj)
                let ideas = responseobj.map(element => new IdeasModel(element.id, element.idea_name, element.idea_description, element.user, element.category, element.mission));  
                context.commit('set-ideas', ideas);
            
            });
            
        }else{
            //console.log('Existe uma ideia');
            Idemis.query({mission_id: idea}).then(response => {
                
                var an_obj = response.data;
                //console.log(an_obj)
                var responseobj = Object.values(an_obj);
                // console.log(responseobj)
                let ideas = responseobj.map(element => new IdeasModel(element.id, element.idea_name, element.idea_description, element.user, element.category, element.mission));  
                context.commit('set-ideas', ideas);
                
            });    

            
        }
    },   

    //     Ideas.query().then(response => {
    //             var an_obj = response.data;
    //             // console.log(an_obj)
    //                 // console.log(an_obj)
    //             var responseobj = Object.values(an_obj);
    //                 // console.log(responseobj)
    //             let ideas = responseobj.map(element => new IdeasModel(element.id, element.idea_name, element.idea_description, element.user, element.category, element.mission));  
    //             context.commit('set-ideas', ideas);
            
    //         });
    //     // }
    // },
    'load-users'(context){
            User.query().then(response => {
                var response = response.data;
                // console.log(response)
                var responseinobj = Object.values(response);
                    
                let user = responseinobj.map(element => new UsersModel(element.id, element.dept, element.username, element.email, element.user_name, element.user_phone, element.dept_id));  
                // console.log('load', user)
                context.commit('set-users', user);
            
            });
        // }
    },
    'load-missions'(context){
            Missions.query().then(response => {
                var response = response.data;
                
                // console.log('resposta em json:', response)
                var responseinobj = Object.values(response);
                // console.log('transformado em OBJECT: ', responseinobj);
                let missions = responseinobj.map(element => new MissionModel(element.id, element.mis_name, element.mis_description, element.mis_image, element.dept, element.user));  
                // console.log('load', user)
                context.commit('set-mission', missions);
            
            });
        // }
    },
    'load-comments'(context, comm){
        console.log(comm)
        if(!comm){
       // console.log('não existe um comentario');
        Comments.query().then(response => {
            var response = response.data;
            
            //console.log('resposta em json:', response )
            var responseinobj = Object.values(response);
            // console.log('transformado em OBJECT: ', responseinobj);
            let comments = responseinobj.map(element => new CommentModel(element.id, element.com_description, element.com_image, element.idea, element.user));  
            // console.log('load', user)
            context.commit('set-comments', comments);
        
        });
    }else{
        //console.log('Existe um commentario');
        Idcom.query({idea_id: comm }).then(response => {
            var response = response.data;
            
            //console.log('resposta em json:', response )
            var responseinobj = Object.values(response);
            // console.log('transformado em OBJECT: ', responseinobj);
            let comments = responseinobj.map(element => new CommentModel(element.id, element.com_description, element.com_image, element.idea, element.user));  
            // console.log('load', user)
            context.commit('set-comments', comments);
        });
    }
    // }
},


    login(context, {email, password_digest}){
        // console.log(email, password_digest)
        
        return JwtToken.accessToken(email, password_digest)
            .then(response => {
                context.commit('authenticated');
                // context.dispatch('getUser', response.data.id);

                return response;
        })
    },


    getUser(context, user_id){
        // console.log('getUser', Userid);
        Userid.query({id: user_id}).then(response => {
            context.commit('setUser', response.data);
        })
    },


    saveuser(context, user){
        User.save({user: user}).then(response => {
            console.log('Cadastro feito com sucesso!')
            // success callback
        }, response => {    
            // error callback
            alert('erro no cadastro');
        });
    },

    savemission(context, miss){
        // console.log(mis_image)
        axios.post('http://localhost:3000/missions', miss, { headers: {
            'Content-Type': 'multipart/form-data'
        }})
        .then(response => {
            alert('Adicionado com sucesso!')
            this.$router.push({name: 'listmiss'});

        })
        .catch(error => {
            console.log('Erro no cadastro')
        })
    },
    
    saveidea(context, idea){
        console.log(idea)
        Ideas.save({idea: idea}).then(response => {
            console.log('Cadastro feito com sucesso!')
            // success callback
        }, response => {    
            // error callback
            alert('erro no cadastro');
        });
    },

    savecomment(context, comment){
        axios.post('http://localhost:3000/comments', comment, { headers: {
            'Content-Type': 'multipart/form-data'
        }})
        .then(response => {
            alert('Adicionado com sucesso!')
            this.$router.push({name: 'listcomments'});

        })
        .catch(error => {
            console.log('Erro no cadastro')
        })
    },


    
    savecat(context, category){
        Categories.save({category: category}).then(response => {
            console.log('Cadastro feito com sucesso!')
            // success callback
            console.log(response.data)
        }, response => {    
            // error callback
            console.log('erro no cadastro')
        });
    },

    savedep(context, dept){
        Deptos.save({dept: dept}).then(response => {
            console.log('Cadastro feito com sucesso!')
            // success callback
            console.log(response.data)
        }, response => {    
            // error callback
            console.log('erro no cadastro')
        });
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