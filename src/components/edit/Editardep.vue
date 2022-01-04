<template>
    <div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5" style="margin-top:-100px; margin-bottom:-90px"> 
    <div class="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:600px">
        <div class="md:flex w-full">
            
            <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                <div class="text-center mb-100">
                    <h2 class="font-bold text-3xl text-gray-900 text-sky-600">EDIÇÃO DE DEPARTAMENTO: <br> {{ depts.dep_name.toUpperCase() }} </h2>
                </div>
                <form  @submit.prevent="updatedep()" method="POST">
                <div>
                    <div class="text-center">
                        <div class="w-full px-3 mb-5 text-left">
                            
                            <label for="" class="text-xs font-semibold px-3">DEPARTAMENTO</label>
                            <div class="text-center flex items-center border-b border-gray-500 py-2" style=''>
                                <input v-model="depts.dep_name" type="text" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Nome do departamento" >
                            </div><br>
                            
                        </div>
                    </div>
 
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <router-link v-bind:to="{ name: 'listdep'}">
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
import { Deptosid } from '../../services/resources';
   export default {
    name: 'Editardep',
    data(){
        return {
          depts: {
            dep_name: null,
          },
          options: [],
          dep_id: this.$route.params.id,
          msg: null,    
        }
    },
     created() {
      store.dispatch('load-depts');


      // this.getLivros(this.$route.params.id);
       Deptosid.query({id: this.dep_id}).then(response => {
            this.depts.dep_name = response.data.dep_name
            // console.log(reponse.data)

            // this.id_livro = response.data.id 
        })
    },

     computed: {
            isDept(){
            return  store.state.depts;
            }
     },
     methods: {  
      updatedep() { 
            if(confirm("Deseja realmente editar esse departamento?")){
            Deptosid.update({id: this.dep_id}, {dept: this.depts}).then(response => {
              // success callback
            console.log(this.dep_id)
            // return response.data.msg
            location.reload(true);
            alert('Departamento atualizado com sucesso!')
            }, response => {    
              // error callback
            console.log('DEU ERRADO!')
            // return response.data.msg
            });

          // store.dispatch('savelivro', this.livro)
             
          this.$router.push({name: 'listdep'});
          }else{

          }
          
          },
          
          
      },
   }  
    
    
</script>

