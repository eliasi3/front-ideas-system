<template>
 
<div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5" style="margin-top:-180px; margin-bottom:-90px"> 
    <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:500px">
        <div class="md:flex w-full">
            
            <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                <div class="text-center mb-100">
                    <h1 class="font-bold text-3xl text-gray-900">CADASTRAR DEPARTAMENTO</h1>
                    <p>{{ error.message }}</p>
                </div>
                <form  @submit.prevent="login()" method="POST">
                <div>
                    <div class="text-center">
                        <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">Nome</label>
                            <div class="text-center">
                                <input type="text"  class=" -ml-10 pl-10 pr-3 py-2 border-5 border-black-500 outline-none focus:border-indigo-500 text-center" placeholder="nome do departamento" >
                            </div>
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