<template>
 
<div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5" style="margin-top:; margin-bottom:-90px"> 
    <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:600px">
        <div class="md:flex w-full">
            
            <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                <div class="text-center mb-100">
                    <h1 class="font-bold text-3xl text-gray-900 text-sky-600">CADASTRAR USUÁRIO</h1>
                    <br><br>
                </div>
                <form  @submit.prevent="cadastrar()" method="POST">
                <div>
                    <div class="text-center">
                        <div class="w-full px-3 mb-5 text-left">
                            
                                <label for="" class="text-xs font-semibold px-3">USUÁRIO</label>
                                <div class="text-center flex items-center border-b border-gray-500 py-2" style=''>
                                <input v-model="user.username" type="text" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Username do Usuário" >
                                </div><br>

                                <label for="" class="text-xs font-semibold px-3">SENHA</label>
                                <div class="text-center items-center border-b border-gray-500 py-2">
                                <input v-model="user.password_digest" required='' type="password" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Digite a Senha" >
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
                                <input v-model="user.user_phone" type="text" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Telefone do usuário" >
                                </div><br>

                                <label for="" class="text-xs font-semibold px-3">DEPARTAMENTO</label>
                                <div class="text-center flex items-center border border-gray-500 py-2" >
                                <select v-model="user.dept_id" required='' class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                                <option v-for="depto in isDept" :key='depto.id' :value='depto.id'>{{depto.dep_name}}</option>
                                </select>    
                                </div><br>
                        </div>
                    </div>
 
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" >CADASTRAR</button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES -->

   
</template>

<script type="text/javascript">
    import store from '../../store';
    // import Deptos from '../../services/resources.js';

    export default {
        data(){
            return {
                user: {
                    username: '',
                    user_name: '',
                    email: '',
                    password_digest: '',
                    user_phone: '',
                    dept_id: '',
                },
                options: [],
                id_depto: null,

            }
        },
        created(){
            store.dispatch('load-depts');
        },
        computed: {
            isDept(){
            return  store.state.depts;
            },
        },
        methods: {
            cadastrar(){
              
                //alert('Comunicando com o Servidor API....');
                // console.log( this.user)
                if(this.user.username.length <= 4){
                    alert('Preencha no mínimo 5 caracteres no username!');
                }else{
                  if(this.user.email.length <= 7){
                    alert('Preencha no mínimo 8 caracteres no campo de email!');
                    }else{
                        if(this.user.password_digest.length <= 5){
                            alert('Preencha no mínimo 6 caracteres no campo de senha!');
                        }else{
                           if(this.user.user_name.length <= 3){
                            alert('Preencha no mínimo 4 caracteres no campo de nome de usuário!');
                            }else{
                                store.dispatch('saveuser', this.user)
                                .then((response) => {
                                    this.$router.push({name: 'listuser'});
                                })
                                .catch((responseError) => {
                                    console.log('erro no cadastro de user: /usuarios.vue')
                                })
                            }
                        }
                    }
                 }        
                
                
                
            }
        }
    }
</script>

<style>

</style>