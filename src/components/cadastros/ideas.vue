<template>
 
<div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5" style="margin-top:; margin-bottom:-90px"> 
    <div class="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:600px">
        <div class="md:flex w-full">
            
            <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                <div class="text-center mb-100">
                    <h1 class="font-bold text-3xl text-gray-900 text-sky-600">CADASTRAR IDEIA</h1>
                    <br><br>
                </div>
                <form  @submit.prevent="cadastrar()" method="POST">
                <div>
                    <div class="text-center">
                        <div class="w-full px-3 mb-5 text-left">
                            
                                <label for="" class="text-xs font-semibold px-3">IDEIA</label>
                                <div class="text-center flex items-center border-b border-gray-500 py-2" style=''>
                                <input v-model="idea.idea_name" type="text" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Nome da ideia" >
                                </div><br>

                                <label for="" class="text-xs font-semibold px-3">DESCRIÇÃO</label>
                                <div class="text-center flex items-center border-b border-gray-500 py-2">
                                <textarea v-model="idea.idea_description" type="text" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Descrição da ideia" ></textarea>
                                </div><br>

                                <label for="" class="text-xs font-semibold px-3">USUARIO</label>
                                <div class="text-center flex items-center border border-gray-500 py-2" >
                                <select v-model="idea.user_id" required='' class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                                <option v-for="users in isUser" :key='users.id' :value='users.id'>{{users.user_name}}</option>
                                </select>
                                </div><br>  
                            
                                <label for="" class="text-xs font-semibold px-3">CATEGORIA</label>
                                <div class="text-center flex items-center border border-gray-500 py-2" >
                                <select v-model="idea.category_id" required='' class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                                <option v-for="cat in isCats" :key='cat.id' :value='cat.id'>{{cat.cat_name}}</option> 
                                </select>   
                                </div><br>

                                <label for="" class="text-xs font-semibold px-3">MISSÃO</label>
                                <div class="text-center flex items-center border border-gray-500 py-2" >
                                <select v-model="idea.mission_id" required='' class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                                <option v-for="mis in isMiss" :key='mis.id' :value='mis.id'>{{mis.mis_name}}</option> 
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
                idea: {
                    idea_name: '',
                    idea_description: '',
                    user_id: '',
                    category_id: '',
                    mission_id: '',
                },
                options: [],
                id_user: null,
                category_id: null,
                mission_id: null,


            }
        },
        created(){
            store.dispatch('load-users');
            store.dispatch('load-categories');
            store.dispatch('load-missions');
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
            cadastrar(){
                if(this.idea.idea_name.length <= 4){
                    alert('Preencha no mínimo 5 caracteres na ideia!');
                }else{
                    //console.log(this.idea)
                    store.dispatch('saveidea', this.idea)
                    .then((response) => {
                        this.$router.push({name: 'listideas'});
                        location.reload(true);
                        alert('Ideia cadastrada com sucesso!')
                        })
                    .catch((responseError) => {
                    console.log('erro no cadastro de ideia: /ideas.vue')
                })
              }    
                
            }
        }
    }
</script>

<style>

</style>