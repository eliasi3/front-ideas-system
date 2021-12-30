<template>
<div>
    <br>
    <v-row><span class='px-3 text-gray-500 ' style="font-size:30px;">USUÁRIOS: </span>
        <table class="divide-y divide-gray-300 "  width='100%' style=''>
                    <thead class="bg-blue-200">
                        <tr>
                            <th class="px-6 py-2 text-xs text-gray-500 text-left">
                                ID
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500 text-left">
                                NOME DO USUÁRIO
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500 text-left">
                                USERNAME
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
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">
                                    {{users.username}}
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
                                    {{users.dept_id}}
                                </div>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <a href="#" class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full" >Editar</a>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" @click='deletedepto(users.id, users.user_name)' class="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Deletar</a>
                            </td>
                        </tr>
                    </tbody>
                </table>    
    </v-row>   
    </div>
</template>

<script>

import store from '../../store.js';
// import { Autor, Livro } from '../services/resources';

export default {
    
    data () {
        return {
            menuPerfil: false,
            selected: '0',
            options: [],
            // index: this.selected
            }
    },
    created(){
            if(this.isAuth) {
                
                store.dispatch('load-users');
                //console.log('entrou')
                
                // const res = axios.get('http://localhost:3000/livros');
                // console.log(res),

                // Autor.query().then(response => {
                // this.options = response.data.autores
                // this.id_livro = response.data.id 
                // })
            }
       
    },
    computed: {
        isUser(){
            return store.state.users;
        },
        isAuth() {
            return store.state.auth.check;
        },
    },
    methods: {
        // filtro(){
            
        //     console.log(this.selected)
        //     store.dispatch('load-livros', this.selected);
        //     return false;
        //     // console.log(this.selected)
        // },
        abrir() {
            this.menuPerfil = this.menuPerfil == false ? true : false;
            },
        // User() {
        //     return User.get(id)
        // },
        // MethoddeTextoTeste() {
        //     return 'TESTE'
        // }
         deletedepto(id, user_name){
             if (confirm('Deseja excluir o usuário ' +user_name+ ' permanentemente?')){
                const req = fetch(`http://localhost:3000/livros/${id}`,{
                method: "DELETE"
              });
                alert('Excluido com sucesso');
                location.reload(true);
              }
            },
        }
    }
    
  

</script>

<style scoped>
.mx-auto{
    text-align: justify;
}
</style>