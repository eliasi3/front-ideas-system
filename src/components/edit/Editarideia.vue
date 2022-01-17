<template>
    <div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5" style="margin-top:; margin-bottom:-90px"> 
    <div class="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:600px">
        <div class="md:flex w-full">
            
            <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                <div class="text-center mb-100">
                    <h2 class="font-bold text-3xl text-gray-900 text-sky-600">EDIÇÃO DE IDEIA: <br>{{ idea.idea_name.toUpperCase() }}</h2>
                    <br><br>
                </div>
                <form  @submit.prevent="updateidea()" method="POST">
                <div>
                    <div class="text-center">
                        <div class="w-full px-3 mb-5 text-left">
                            
                            <label for="" class="text-xs font-semibold px-3"> NOME</label>
                            <div class="text-center flex items-center border-b border-gray-500 py-2" style=''>
                                <input v-model="idea.idea_name" type="text" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" >
                            </div><br>
                            <label for="" class="text-xs font-semibold px-3">DESCRIÇÃO</label>
                            <div class="text-center flex items-center border-b border-gray-500 py-2">
                                <textarea v-model="idea.idea_description" type="text" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" ></textarea>
                            </div><br>

                            <label for="" class="text-xs font-semibold px-3">USUARIO</label>
                                <div class="text-center flex items-center border-b border-gray-500 py-2">
                                <select v-model="idea.user_id" required='' class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                                <option v-for="users in isUser" :key='users.id' :value='users.id'>{{users.user_name}}</option>
                                </select>
                            </div><br>
                            
                            <label for="" class="text-xs font-semibold px-3">CATEGORIA</label>
                                <div class="text-center flex items-center border-b border-gray-500 py-2">
                                <select v-model="idea.category_id" required='' class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                                <option v-for="cat in isCats" :key='cat.id' :value='cat.id'>{{cat.cat_name}}</option> 
                                </select>   
                            </div><br>

                            <label for="" class="text-xs font-semibold px-3">MISSÃO</label>
                                <div class="text-center flex items-center border-b border-gray-500 py-2">
                                <select v-model="idea.mission_id" required='' class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                                <option v-for="mis in isMiss" :key='mis.id' :value='mis.id'>{{mis.mis_name}}</option> 
                                </select>   
                            </div><br>
                            
                        </div>
                    </div>
 
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <router-link v-bind:to="{ name: 'listideas'}">
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
import { Ideid } from '../../services/resources';
   export default {
    name: 'Editarideia',
    data(){
        return {
         idea: {
                idea_name: null,
                idea_description:null,
                user_id: null,
                category_id: null,
                mission_id:null,
          },
          options: [],
          idea_id: this.$route.params.id,
          msg: null,    
        }
    },
     created() {
       if(!this.idea_id){
                this.$router.push({name: 'listmiss'});     
                }


        store.dispatch('load-users');
        store.dispatch('load-categories');
        store.dispatch('load-missions');
      // this.getLivros(this.$route.params.id);
        Ideid.query({id: this.idea_id}).then(response => {
            this.idea.idea_name = response.data.idea_name,
            this.idea.idea_description = response.data.idea_description,
            this.idea.user_id = response.data.user_id,
            this.idea.category_id = response.data.category_id,
            this.idea.mission_id = response.data.mission_id
            // console.log(reponse.data)

            // this.id_livro = response.data.id 
        })
    },
     computed: {
            isUser(){
                return  store.state.users;
            },
            isCats(){
                return  store.state.categories;
            },
            isMiss(){
               return  store.state.missions; 
            }
     },
     methods: {  
      updateidea() { 
            if(confirm("Deseja realmente editar essa ideia?")){
            Ideid.update({id: this.idea_id}, {idea: this.idea}).then(response => {
              // success callback
            console.log(this.idea_id)
            // return response.data.msg
            location.reload(true);
            alert('Ideia atualizado com sucesso!')
            }, response => {    
              // error callback
            console.log('DEU ERRADO!')
            // return response.data.msg
            });

          // store.dispatch('savelivro', this.livro)
             
          this.$router.push({name: 'listideas'});
          }else{

          }
          
          },
          
          
      },
   }  
    
    
</script>

<style scoped>
.logo {
  margin-top: -160px
}

h1{
  color: rgb(0, 0, 0);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 20px;
  margin-top: -190px;
  margin-left: 150px;
}
  #livro-form {
    max-width: 400px;
    margin: 0 auto;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;;
    padding: 5px 10px;
    border-left: 4px solid #0d5f69;
  }

  input, select {
    padding: 5px 10px;
    width: 300px;
  }

  #opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
  }

  #opcionais-title {
    width: 100%;
  }

  .checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
  }

  .checkbox-container span,
  .checkbox-container input {
    width: auto;
  }

  .checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
  }

  .submit-btn {
    background-color: #222;
    color:#42b983;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }

  .submit-btn:hover {
    background-color: transparent;
    color: #222;
  }
</style>