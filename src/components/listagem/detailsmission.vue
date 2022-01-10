<template>
    <center>
        <div class='px-3 text-gray-500' style="padding:10px;background-color:white;width:100%;height:60px;border-radius:10px 10px 0px 0px;font-size:30px;">
            <span style='float:left;' class="font-bold text-3xl text-gray-900 text-sky-600">MISSÃO: {{miss.mis_name}}</span>

        <span style='float:right;'>
                <a href="#" v-if='excluir' @click='excluirmissao(mission_id, miss.mis_name)' style='font-size:15px;' class="px-4 py-1 text-sm text-white bg-red-700 rounded-full" > Excluir </a>

            <router-link v-bind:to="{ name: 'listmiss'}">
                <a href="#" style='font-size:15px;' class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full" > Voltar</a>
            </router-link>

        </span></div>
        <div style='background-color:white; border-radius:10px; width:100%;padding:10px;margin-top:10px;'>
            <table class="border-collapse table-auto w-full text-sm">
            <tbody class="bg-white bg-gray-800">
                
                    <tr class='bg-blue-100'>
                        
                            
                        <td width='50%' class="border-b border-gray-100 dark:border-gray-700 p-2 pl-3 text-gray-500 dark:text-gray-400">
                           <div class='bg-blue-100' style='border-radius:10px;width:100%;text-align:left;'> 

                                <p><b>CRIADOR DA MISSÃO: {{ miss.user_name }}</b></p>
                                <p><b>CRIADO EM: {{ miss.criado }}</b></p>

                            </div>
                        </td>
                        <td width='50%' class="border-b border-gray-100 dark:border-gray-700 p-2 pl-3 text-gray-500 dark:text-gray-400">
                            <div style='padding:10px;border-radius:10px;width:100%;text-align:right;'> 
 
                                <router-link v-bind:to="{ name: 'cadastroidea', params: {id: user_id, idmis: mission_id}}">
                                    <a href="#" class="px-4 py-1 text-sm text-white bg-orange-400 rounded-full" >+ Adicionar Ideia</a>
                                </router-link>

                            </div>
                        </td>
                        
                    </tr>
                    <tr>
                        
                        <td class="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400" colspan='3'>
                            
                       <center> 
                        <div style='float:left;margin-right:10px;width:490px;'>

                            <img :src="getImgUrl(miss.mis_image)" style='position: relative;width:600px;height:300px;' alt="">

                        </div>
                        </center>
                        </td>
                    
                    </tr>                
                    <tr>
                        <td class="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400" colspan='2' style='text-align:left;width:85%;'>
                            <span> {{miss.mis_description}} </span>
                        </td>
                    </tr>
                
            </tbody>
            </table>
        </div>
        <br>
        
        <!-- LISTAGEM DAS IDEIAS  -->

        <div class='px-3 text-gray-500' style="padding:10px;background-color:white;width:100%;height:60px;border-radius:10px 10px 0px 0px;font-size:30px;margin-bottom:10px;">
            <span style='float:left;' class="font-bold text-3xl text-gray-900 text-sky-600">IDEIAS DA MISSÃO:</span></div>
            <div style='background-color:white; border-radius:10px; width:100%;padding:10px; margin-bottom:10px;'
       v-for="(ideas, i) in isIdea" :key="i">
            
            <table class="border-collapse table-auto w-full text-sm">
                <tbody class="bg-white bg-gray-800">
                
                    <tr>
                        <td class="border-b border-gray-100 dark:border-gray-700 p-2 pl-3 text-gray-500 dark:text-gray-400" colspan='3'>
                            <span style='font-size:25px;'>#Título da ideia: {{ideas.idea_name.toUpperCase()}}<br></span><br>
                            <b>CRIADOR:</b>{{ideas.user.user_name}},
                            <b>CATEGORIA:</b> {{ideas.category.cat_name}},
                            <b>MISSÃO:</b>  {{ideas.mission.mis_name}}
                        </td>
                    </tr>

                    <tr>
                        <td class="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400" colspan='3'>
                            
                        
                            <div style='float:left;margin-right:10px;width:230px;'>
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" style='position: relative;' alt="">

                            </div>
                            <div style='margin:10px;text-align: justify'>
                                <span>{{ideas.idea_description}} </span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400" colspan='2' style='text-align:right;width:85%;'>
                            <router-link v-bind:to="{ name: 'editarideia', params: {id: ideas.id} }">
                                <a href="#" v-if='editar' class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full" >Editar</a>
                            </router-link>
                            <a href="#" class="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full" v-if='excluir' @click='deleteidea(ideas.id,ideas.idea_name)'>Excluir</a>
                
                        </td>
                    </tr>

                    <tr>
                        <td style='padding:10px;border-radius:10px;width:100%;text-align:right;'>
                             <router-link v-bind:to="{ name: 'listcomments', params: {id: user_id, idcom: ideas.id}}">
                                    <a href="#" class="px-4 py-1 text-sm text-white bg-orange-400 rounded-full" >Ver comentarios</a>
                                </router-link> 
                        </td>
                    </tr>
            
                </tbody>
            </table>

            </div>    
     </center>
</template>

<script>
import store from '../../store';

import { Missionid, Ideid } from '../../services/resources';
export default {
    name: 'Detalhesmissoes',
    data () {
        return {
            miss: {
                mis_description: null,
                user_name: null,
                criado: null,
                mis_name: null,
                mis_image: null
            },
            com: {
                com_description: '',
                com_image: '',
                user_id: store.state.auth.user.id,
                idea_id: ''
            },
            //idea_id: this.$route.params.id,

            mission_id: this.$route.params.id,
            user_id: store.state.auth.user.id,
            criador: null,
            excluir: false,
            editar: false
            }
    },
    created(){
        store.dispatch('load-comments', this.com.idea_id);
        Ideid.query({id: this.com.idea_id}).then(response => {
               this.com.idea_id = response.data
               
               console.log(response.data)

            // this.id_livro = response.data.id 
        })
        store.dispatch('load-users');

        store.dispatch('load-ideas', this.mission_id);       
                if(!this.mission_id){
                   this.$router.push({name: 'listmiss'});     
                }   
                         
                store.dispatch('load-missions');

                Missionid.query({id: this.mission_id}).then(response => {
                    this.miss.mis_description = response.data.mis_description,
                    this.miss.user_name = response.data.user.user_name,
                    this.miss.criado = response.data.created_at,
                    this.miss.mis_name = response.data.mis_name,
                    this.criador = response.data.user.id
                    this.miss.mis_image = response.data.mis_image
                

                if(this.user_id == this.criador){
                    this.excluir = true
                    this.editar = true
                }
        });
            
    },
    computed: {
        isEmail() {
            return store.state.auth.user.email
        },
        isIdea(){
            return store.state.ideas;
        },
        isAuth() {
            return store.state.auth.check;
        },

        isUser(){
            return  store.state.users;
        },
        userId() {
            return store.state.auth.user ? store.state.auth.user : {'user_name': ''}; 
        },
        isCom(){
            return store.state.comments;
        },
    },

    methods: {
        getImgUrl(pet) {
            
            return 'http://localhost:3000/missions?img=' + pet;
            
        },
        
        excluirmissao(mission_id, mis_name){
            if (confirm('Deseja excluir a missão ' +mis_name+ ' permanentemente?')){
                const req = fetch(`http://localhost:3000/missions/${mission_id}`,{
                method: "DELETE"
                });
            alert('Excluido com sucesso');
            location.reload(true);
            }
        },

        deleteidea(id, idea_name){
             if (confirm('Deseja excluir a ideia ' +idea_name+ ' permanentemente?')){
              const req = fetch(`http://localhost:3000/ideas/${id}`,{
                method: "DELETE"
              });
                
                // store.dispatch('load-depts');
             };
             location.reload(true);
             alert('Ideia excluida com sucesso!')
        },
        addidea(){
                this.$router.push({name: 'cadastroidea'});
        },
        
        cadastrar(){
            console.log(this.com)
            if(this.com.com_description.length <= 4){
                alert('Preencha no mínimo 5 caracteres no comentario!');
            }else{
                store.dispatch('savecomment', this.com)
                .then((response) => {
                    this.$router.push({name: 'listcomments'});
                    location.reload(true);
                    alert('Comentario  cadastrado com sucesso!')
                    })
                .catch((responseError) => {
                console.log('erro no cadastro de Comentario: /comentario.vue')
            })
            } 
           }
        }
    }
</script>

<style>

#add:hover{
    cursor:pointer;
}
</style>