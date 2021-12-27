<template>
    <div>
    Você está logado com E-mail: {{ isEmail }}, e se encontra na sua tela de estante de livros cadastrado.
    <br>
    <br>

    <select v-model="selected" name="fil_autor" id="fil_autor" :onChange="filtro()"> 
                <option :value='0'>Desconhecido/todos</option>
                <option v-for="option in options" v-bind:key="option.id" :value="option.id" > 
                    {{ option.name }}
                </option>
    </select>
     <br>
    <v-row>
        <v-col
            v-for="(book, i) in isLivros"
            :key="i"
            cols="12"
            md="4"
            lg="2"
            >
            <v-card class="mx-auto">
                <v-card-title>{{ book.name }}</v-card-title>
                <v-card-text>Autor:{{ book.author }}
                            Descrição:{{ book.description }}
                </v-card-text>
                    

                <v-card-actions>
                    <v-btn text small color="primary" @click="deletelivro(book.id)"> Excluir </v-btn>
                    <router-link v-bind:to="{ name: 'editarlivro', params: {id: book.id} }">
                        <v-btn text small color="primary"> Editar </v-btn>
                    </router-link>
                    
                </v-card-actions>
            </v-card>  
        </v-col>
    </v-row>
        
    </div>
</template>

<script>

import store from '../store.js';
import { Autor, Livro } from '../services/resources';
import axios from 'axios';


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
                
                // store.dispatch('load-livros', this.selected);
                //console.log('entrou')
                
                // const res = axios.get('http://localhost:3000/livros');
                // console.log(res),

                Autor.query().then(response => {
                this.options = response.data.autores
                // this.id_livro = response.data.id 
                })
            }
       
    },
    computed: {
        isEmail() {
            return store.state.auth.user.email
        },
        isLivros(){
            return store.state.livros;
        },
        isAuth() {
            return store.state.auth.check;
        },
    },
    methods: {
        filtro(){
            
            console.log(this.selected)
            store.dispatch('load-livros', this.selected);
            return false;
            // console.log(this.selected)
        },
        abrir() {
            this.menuPerfil = this.menuPerfil == false ? true : false;
            },
        // User() {
        //     return User.get(id)
        // },
        // MethoddeTextoTeste() {
        //     return 'TESTE'
        // }
         deletelivro(id){
             if (confirm('Deseja excluir este livro?')){
              const req = fetch(`http://localhost:3000/livros/${id}`,{
                method: "DELETE"
              });
   
             }
        },
        editarlivro(id){
             if (confirm('Deseja editar este livro?')){
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
    text-align: justify;
}
</style>