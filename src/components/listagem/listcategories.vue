<template>
<div>
    <br>
    <v-row><div class='px-3 text-gray-500 shadow-xl' style="padding:10px;background-color:white;width:100%;border-radius:10px 10px 0px 0px;font-size:30px;margin-bottom:10px;"><span style='float:left;' class="font-bold text-3xl text-gray-900 text-sky-600">CATEGORIAS:</span> <span style='float:right;margin-right:10px;font-size:40px;' id='add' @click='addcat()' class="font-bold text-3xl text-gray-900 text-sky-600">+</span><br>
        <table class="divide-y divide-gray-300 "  width='100%' style=''>
                    <thead class="bg-blue-200">
                        <tr>
                            <th class="px-6 py-2 text-xs text-gray-500 text-left">
                                ID
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500 text-left">
                                NOME
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500 text-left">
                                CRIADO EM
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500 text-left">
                                
                            </th>
                        
                            <th class="px-6 py-2 text-xs text-gray-500 text-left">
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-300">
                        <tr class="whitespace-nowrap"
                        v-for="(cats, i) in isCat"
                        :key="i"
                        cols="12"
                        md="4"
                        lg="2">
                            <td class="px-6 py-4 text-sm text-gray-500">
                                {{cats.id}}
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">
                                    {{cats.cat_name}}
                                </div>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                                {{cats.created_at}}
                            </td>
                            <td class="px-6 py-4 text-right">
                                <router-link v-bind:to="{ name: 'editcat', params: {id: cats.id} }">
                                    <a href="#" class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full" >Editar</a>
                                </router-link>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full" @click='deletecat(cats.id,cats.cat_name)'>Excluir</a>
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
                
                store.dispatch('load-categories');
            }
       
    },
    computed: {
        isEmail() {
            return store.state.auth.user.email
        },
        isCat(){
            return store.state.categories;
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
         deletecat(id, cat_name){
             if (confirm('Deseja excluir a categoria ' +cat_name+ ' permanentemente?')){
              const req = fetch(`http://localhost:3000/categories/${id}`,{
                method: "DELETE"
              });
                
                // store.dispatch('load-depts');
             };
             location.reload(true);
             alert('Categoria excluida com sucesso!')
        },
        addcat(){
                this.$router.push({name: 'cadastrocategorias'});
            }
    },
    
  
}
</script>

<style scoped>
.mx-auto{
    text-align: justify;
}
</style>