<template>
    <div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5" style="margin-top:; margin-bottom:-90px"> 
    <div class="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:600px">
        <div class="md:flex w-full">
            
            <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                <div class="text-center mb-100">
                    <h2 class="font-bold text-3xl text-gray-900 text-sky-600">EDIÇÃO DO USUÁRIO: <br>{{ user.user_name.toUpperCase() }}</h2>
                    <br><br>
                </div>
                <form  @submit.prevent="updateuser()" method="POST">
                <div>
                    <div class="text-center">
                        <div class="w-full px-3 mb-5 text-left">
                            
                            <label for="" class="text-xs font-semibold px-3">USUÁRIO</label>
                            <div class="text-center flex items-center border-b border-gray-500 py-2" style=''>
                                <input v-model="user.username" type="text" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Username do Usuário" >
                            </div><br>
                            <label for="" class="text-xs font-semibold px-3">SENHA</label>
                            <div class="text-center flex items-center border-b border-gray-500 py-2">
                                <input v-model="user.password_digest" type="password" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Nome e Sobrenome do Usuário" >
                            </div><br>
                            <label for="" class="text-xs font-semibold px-3">NOME</label>
                            <div class="text-center flex items-center border-b border-gray-500 py-2">
                                <input v-model="user.user_name" type="text" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Nome e Sobrenome do Usuário" >
                            </div><br>
                            <label for="" class="text-xs font-semibold px-3">E-MAIL</label>
                            <div class="text-center flex items-center border-b border-gray-500 py-2">
                                <input v-model="user.email" type="email" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="E-mail do usuário" >
                            </div><br>
                            <label for="" class="text-xs font-semibold px-3">TELEFONE</label>
                            <div class="text-center flex items-center border-b border-gray-500 py-2">
                                <input v-model="user.user_phone" type="text" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="E-mail do usuário" >
                            </div><br>
                            <label for="" class="text-xs font-semibold px-3">DEPARTAMENTO</label>
                            <div class="text-center flex items-center border-b border-gray-500 py-2">
                                <select v-model="user.dept_id" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                                    <option v-for="depto in isDept" :key='depto.id' :value='depto.id'>{{depto.dep_name}}</option>
                                </select>    
                            </div><br>
                            
                        </div>
                    </div>
 
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <router-link v-bind:to="{ name: 'listuser'}">
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
import { Userid } from '../../services/resources';
   export default {
    name: 'Editaruser',
    data(){
        return {
          user: {
            username: null,
            user_name: null,
            password_digest: null,
            email: null,
            user_phone: null,
            dept_id: null,
          },
          options: [],
          user_id: store.state.auth.user.id,
          msg: null,    
        }
    },
     created() {
        if(!this.user_id){
                this.$router.push({name: 'listuser'});     
                }


      store.dispatch('load-depts');
      // this.getLivros(this.$route.params.id);
      Userid.query({id: this.user_id}).then(response => {
            this.user.username = response.data.username,
            this.user.user_name = response.data.user_name,
            this.user.password_digest = response.data.password_digest
            this.user.email = response.data.email
            this.user.user_phone = response.data.user_phone
            this.user.dept_id = response.data.dept_id
            // console.log(reponse.data)

            // this.id_livro = response.data.id 
        })
    },
     computed: {
            isDept(){
            return  store.state.depts;
            },
     },
     methods: {  
      updateuser() { 
            if(confirm("Deseja realmente editar esse usuário?")){
                Userid.update({id: this.user_id}, {user: this.user}).then(response => {
                // success callback
                console.log(this.user_id)
                // return response.data.msg
                alert('Usuário atualizado com sucesso!')
                }, response => {    
                // error callback
                console.log('DEU ERRADO!')
                // return response.data.msg
                });

            // store.dispatch('savelivro', this.livro)
                
            this.$router.push({name: 'listuser'});
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