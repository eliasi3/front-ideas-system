<template>
 
<div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5" style="margin-top:-40px; margin-bottom:-90px"> 
    <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:500px">
        <div class="md:flex w-full">
            
            <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                <div class="text-center mb-100">
                    <h1 class="font-bold text-3xl text-gray-900 text-sky-600">CADASTRAR MISSÕES</h1>
                </div>
                <form  @submit.prevent="login()" method="POST">
                <div>
                    <label for="avatar" class="text-xs font-semibold px-3">ADICIONAR CAPA</label>

                    <div class="flex items-center justify-center pt-5" >
                    <input type="file"
                        id="avatar" name="avatar"
                        accept="image/png, image/jpeg">
                    </div><br>

                    <div class="text-center">
                        <div class="w-full px-3 mb-5 text-left">
                            <label for="" class="text-xs font-semibold px-3">NOME</label>
                            <div class="text-center flex items-center border-b border-gray-500 py-2">
                                <input type="text"  class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Nome do departamento" >
                            </div><br>

                            <label for="" class="text-xs font-semibold px-3">DESCRIÇÃO</label>
                            <div class="text-center flex items-center border-b border-gray-500 py-2">
                                <input type="text"  class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Adicione uma descrição" >
                            </div><br>

                              <label for="" class="text-xs font-semibold px-3">DEPARTAMENTO</label>
                            <div class="text-center flex items-center border border-gray-500 py-2" >
                                <select v-model="user.dept_id" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                                    <option v-for="depto in isDept" :key='depto.id' :value='depto.id'>{{depto.dep_name}}</option>
                                </select>    
                            </div><br>
                            <label for="" class="text-xs font-semibold px-3">USUÁRIO</label>
                            <div class="text-center flex items-center border border-gray-500 py-2" >
                                <select v-model="user.user_id" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                                    <option v-for="user in isUser" :key='user.id' :value='user.id'>{{user.user_name}}</option>
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

    export default {
        data(){
            return {
                user: {
                    email: '',
                    password_digest: ''
                },
                error: {
                    error: false,
                    message: 'Digite o nome do departamento!'
                }
            }
        }, 
        created(){
            store.dispatch('load-users');
            store.dispatch('load-depts');
        },
        computed: {
            isUser(){
            return  store.state.users;
            },
            isDept(){
            return  store.state.depts;
            },
        },
        methods: {
            login(){
              
                //alert('Comunicando com o Servidor API....');
                
                store.dispatch('login', this.user)
                    .then((response) => {
                        this.$router.push({name: 'dashboard'});
                    })
                    .catch((responseError) => {
                        this.error.error = true;
                        if (responseError.status === 400) {
                            this.error.message = responseError.data.error;
                        } else {
                            this.error.message = 'Login inválido!'
                        }
                    })
            }
        }
    }
</script>