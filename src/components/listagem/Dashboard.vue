<template>
<div>
    <br>
    <v-row><div class='px-3 text-gray-500 shadow-xl' style="padding:10px;background-color:white;width:100%;border-radius:10px 10px 0px 0px;font-size:30px;margin-bottom:10px;"><span style='float:left;' class="font-bold text-3xl text-gray-900 text-sky-600">DEPARTAMENTOS:</span> <span style='float:right;margin-right:10px;font-size:40px;' id='add' @click='adddep()' class="font-bold text-3xl text-gray-900 text-sky-600">+</span><br>
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
                        v-for="(depts, i) in isDept"
                        :key="i"
                        cols="12"
                        md="4"
                        lg="2">
                            <td class="px-6 py-4 text-sm text-gray-500">
                                {{depts.id}}
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">
                                    {{depts.dep_name}}
                                </div>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                                {{depts.created_at}}
                            </td>
                            <td class="px-6 py-4 text-right">
                               <router-link v-bind:to="{ name: 'cadastrodepartamentos', params: {id: depts.id} }">
                                    <a href="#" class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full" >Editar</a>
                                </router-link>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full" @click='deletedepto(depts.id, depts.dep_name)'>Excluir</a>
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
                
                store.dispatch('load-depts');
                
                //console.log('entrou')
                
                // const res = axios.get('http://localhost:3000/depts');
                // console.log(res),

                // Autor.query().then(response => {
                // this.options = response.data.autores
                // this.id_livro = response.data.id 
                // })
            }
       
    },
    computed: {
        isDept(){
            return store.state.depts;
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
         deletedepto(id, dep_name){
             if (confirm('Deseja excluir o departamento '+ dep_name +' permanentemente?')){
              const req = fetch(`http://localhost:3000/depts/${id}`,{
                method: "DELETE"
              });
              };
                
                // store.dispatch('load-depts');
                location.reload(true);
                alert('Departamento excluido com sucesso!')
             },
        adddep(){
                this.$router.push({name: 'cadastrodepartamentos'});
            }
    },
    
  
}
</script>

<style scoped>
.mx-auto{
    text-align: justify;
}
</style>