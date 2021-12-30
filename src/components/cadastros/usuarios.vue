<template>
 
<div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5" style="margin-top:; margin-bottom:-90px"> 
    <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:600px">
        <div class="md:flex w-full">
            
            <div class="w-full md:w-1/1 py-10 px-5 md:px-10" >
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
                                    <option value='1'>exemple</option>
                                    <option value='2'>exemple 2</option>
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
                    username: null,
                    user_name: null,
                    email: null,
                    password_digest: null,
                    user_phone: null,
                    dept_id: null,
                },
                
            }
        },
        methods: {
            cadastrar(){
              
                //alert('Comunicando com o Servidor API....');
                // console.log( this.user)
                store.dispatch('saveuser', this.user)
                    .then((response) => {
                        // this.$router.push({name: 'dashboard'});
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

<style>

</style>