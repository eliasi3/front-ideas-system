<template>
    <div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5" style="margin-top:-100px; margin-bottom:-90px"> 
    <div class="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:600px">
        <div class="md:flex w-full">
            
            <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                <div class="text-center mb-100">
                    <h2 class="font-bold text-3xl text-gray-900 text-sky-600">EDIÇÃO DE CATEGORIA: <br> {{ cats.cat_name.toUpperCase() }} </h2>
                </div>
                <form  @submit.prevent="updatecat()" method="POST">
                <div>
                    <div class="text-center">
                        <div class="w-full px-3 mb-5 text-left">
                            
                            <label for="" class="text-xs font-semibold px-3">CATERGORIA</label>
                            <div class="text-center flex items-center border-b border-gray-500 py-2" style=''>
                                <input v-model="cats.cat_name" type="text" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Nome da categoria" >
                            </div><br>
                            
                        </div>
                    </div>
 
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <router-link v-bind:to="{ name: 'listcat'}">
                                    <a href="#" class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-center text-white rounded-lg px-3 py-3 font-semibold" >CANCELAR</a>
                            </router-link>
                        </div>
                        <div class="w-full px-3 mb-5">
                            <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" >CONCLUIR EDIÇÃO</button>
                        </div>
                    </div>
                </div>
                </form>
                </div>
        </div>
    </div>
</div>
</template>

<script>
import store from '../../store';
import { Catid } from '../../services/resources';
   export default {
    name: 'Editarcat',
    data(){
        return {
          cats: {
            cat_name: null,
          },
          options: [],
          cat_id: this.$route.params.id,
          msg: null,    
        }
    },
     created() {

            if(!this.cat_id){
                    this.$router.push({name: 'listcat'});     
                } 

            store.dispatch('load-categories');

            Catid.query({id: this.cat_id}).then(response => {
                this.cats.cat_name = response.data.cat_name
                //console.log(reponse.data.cat_name)
                // this.id_livro = response.data.id 
            })
    },

     computed: {
            isDept(){
            return  store.state.cats;
            }
     },
     methods: {  
      updatecat() { 
            if(confirm("Deseja realmente editar esse categoria?")){
            Catid.update({id: this.cat_id}, {category: this.cats}).then(response => {
              // success callback
            console.log(this.cat_id)
            // return response.data.msg
            location.reload(true);
            alert('Categoria atualizada com sucesso!')
            }, response => {    
              // error callback
            console.log('DEU ERRADO!')
            // return response.data.msg
            });

          // store.dispatch('savelivro', this.livro)
             
          this.$router.push({name: 'listcat'});
          }else{

          }
          
          },
          
          
      },
   }  
    
    
</script>

