<template>
<div>
    <br>
    <v-row>
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
                                <a href="#" class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Edit</a>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full" @click='deletedepto(depts.id)'>Delete</a>
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
    name:'listcategories',
    
    data () {
        return {
            menuPerfil: false,
            selected: '0',
            catsd: [],
            // index: this.selected
            }
            
    },
    created(){
            if(this.isAuth) {
                
                store.dispatch('load-cat');
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
         deletedepto(id){
             if (confirm('Deseja excluir este departamento?')){
              const req = fetch(`http://localhost:3000/depts/${id}`,{
                method: "DELETE"
              });
                alert('Departamento excluido com sucesso!')
                // store.dispatch('load-depts');
             }this.$router.push({name: 'dashboard'});
        },
        editarlivro(id){
             if (confirm('Deseja editar este departamento?')){
              const req = fetch(`http://localhost:3000/livros/${id}`,{
                method: "GET"
              });
             }
             
        }
    },
    
  
}
</script>

<style scoped>
.mx-auto{
    text-align: justif