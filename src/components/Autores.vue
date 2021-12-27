<template>
    <div>
    Listas de autores
    <br>
    <br>
    <v-row>
        <v-col
            v-for="(book, i) in isAutores"
            :key="i"
            cols="12"
            md="4"
            lg="2"
            >
            <v-card class="mx-auto">
                <v-card-title>{{ book.name }}</v-card-title>
                <v-card-text>
                            Descrição:{{ book.description }}
                </v-card-text>
                    

                <v-card-actions>
                     <v-btn text small color="primary" @click="deleteautor(book.id)"> Excluir </v-btn>
                    <!-- <v-btn text small color="primary" @click="editarlivro(book.id)"> Editar </v-btn> -->
                    </v-card-actions>
                </v-card>  
             </v-col>
    </v-row>
        
    </div>
</template>

<script>

import store from '../store.js';

export default {
    
    data () {
        return {
            menuPerfil: false,
            }
    },
    created(){
            if(this.isAuth) {
                store.dispatch('load-autores');
                //console.log('entrou')
            }
    },
    computed: {
        isEmail() {
            return store.state.auth.user.email
        },
        isAutores(){
            return store.state.autores;
        },
        isAuth() {
            return store.state.auth.check;
        },
    },
    methods: {
        abrir() {
            this.menuPerfil = this.menuPerfil == false ? true : false;
            },
        // User() {
        //     return User.get(id)
        // },
        // MethoddeTextoTeste() {
        //     return 'TESTE'
        // }
         deleteautor(id){
            if (confirm('Deseja excluir este autor?')){
               const req = fetch(`http://localhost:3000/autores/${id}`,{
                method: "DELETE"
              });
   
          }
         },
        // editarlivro(id){
        //      if (confirm('Deseja editar este livro?')){
        //       const req = fetch(`http://localhost:3000/livros/${id}`,{
        //         method: "GET"
        //       });
   
        //      }
        // }
    },
    
  
}
</script>

<style scoped>
.mx-auto{
    text-align: justify;
}
</style>