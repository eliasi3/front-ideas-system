<template>
    <div>
        <a class='mr-2' v-for="(count, i) in countResults" :key="i" v-on:click.prevent="filtrardept(count-1)"> PAGINA {{count}}</a><br><br>
        <v-row>
            <div class="mb-3 xl:w-35" style="padding:5px;">
                <select  class=" bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none" v-model="selectedept" ref='dept_id' id='dept_id' @change="filtrardept()">
                    <option value="">Selecione Departamento</option>
                    <option :value="depts.id" v-for="(depts, i) in isDepts" :key="i">{{depts.dep_name}}</option>
                </select>
            </div>
            
            <div class="relative mx-auto text-gray-600"  style="float:left; margin-left:120px; padding:5px;">  
                <input class="border-8 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" ref='search' id='search' type="search" placeholder="Busca" @keyup="filtrardept()">
            </div>

                <br><br>  

            <div class='px-3 text-gray-500 shadow-xl ' style="padding:10px;background-color:white;width:100%;border-radius:10px 10px 0px 0px;font-size:30px;margin-bottom:10px;">
                <span style='float:left;margin-left:10px;' class="font-bold text-3xl text-gray-900 text-sky-600" >USUÁRIOS:</span> 

                <Usuarios :id="false"/>

                <table class="divide-y divide-gray-300"  width='100%' style=''>
                    <thead class="bg-blue-200">
                        <tr>
                            <th class="px-6 py-2 text-xs text-gray-500 text-left">
                                ID
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500 text-left">
                                NOME DO USUÁRIO
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500 text-left">
                                EMAIL
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500 text-left">
                                TELEFONE
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500 text-left">
                                DEPARTAMENTO
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500 text-left">
                                
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500 text-left">
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-300">
                        <tr class="whitespace-nowrap"
                        v-for="(users, i) in isUser"
                        :key="i"
                        cols="12"
                        md="4"
                        lg="2">
                            <td class="px-6 py-4 text-sm text-gray-500">
                                {{users.id}}
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">
                                    {{users.user_name}}
                                </div>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                                <div class="text-sm text-gray-900">
                                    {{users.email}}
                                </div>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                                <div class="text-sm text-gray-900">
                                    {{users.user_phone}}
                                </div>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                                <div class="text-sm text-gray-900">
                                    {{users.dept.dep_name}}
                                </div>
                            </td>
                            <td class="px-6 py-4 text-right">
                                
                                <Usuarios :id="users.id" />
                    
                            </td>
                            <td class="px-6 py-4">
                                <a href="#"  @click='deleteuser(users.id, users.user_name), reRender()' class="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Excluir</a>
                            </td>
                            
                        </tr>
                    </tbody>
                </table>    
            </div>
        </v-row>   
    </div>
</template>

<script>

import store from '../../store.js';
import Usuarios from '../cadastros/usuarios.vue'


export default {
    
    data () {
        return {
            menuPerfil: false,
            selectedept: "",
            countpage: Math.ceil(store.state.users.length/2),
            // index: this.selected
            }
    },
    created(){
            if(this.isAuth) {
                
                store.dispatch('load-users');
                store.dispatch('load-depts')
            }
       
    },
     components: {
        'Usuarios': Usuarios
    },
    computed: {
        isUser(){
            return store.state.users;
            
        },
        isAuth() {
            return store.state.auth.check;
        },
        isDepts() {
            return store.state.depts;
        },
        countResults(){
            return this.countpage
        },
    },
    methods: {
       reRender(){
           store.dispatch('load-users');
        },
    
        abrir() {
            this.menuPerfil = this.menuPerfil == false ? true : false;
            },

        deleteuser(id, user_name){
            if (confirm('Deseja excluir o usuário ' +user_name+ ' permanentemente?')){
                const req = fetch(`http://localhost:3000/users/${id}`,{
                    method: "DELETE"
                });
            alert('Excluido com sucesso');
            }
        },
        
        adduser(){
            
            this.$router.push({name: 'cadastrousuarios'});
        },
    
        filtrardept(page){
            store.dispatch('load-userfiltrodept', page);
            
        }
      }
    }
    
  

</script>

<style scoped>
.mx-auto{
    text-align: justify;
}
#add:hover{
    cursor:pointer;
}
</style>