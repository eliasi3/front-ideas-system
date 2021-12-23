<template>
    <div>
    Você está logado com E-mail: {{ isEmail }}, e se encontra na sua tela de estante de livros cadastrado.
    <br>
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
                store.dispatch('load-livros');
                //console.log('entrou')
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
            

        }
    },
    
  
}
</script>

<style scoped>
.mx-auto{
    text-align: justify;
}
</style>