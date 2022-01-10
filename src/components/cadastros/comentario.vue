<template>
<form  @submit.prevent="cadastrar()" method="POST">
    <div class="text-center flex items-center border-b border-gray-500 py-2">
        <textarea  class="resize rounded-md appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Adicione um comentario" v-model="com.com_description" ></textarea>
    </div>
    <label for="" class="text-xs font-semibold px-3">USUÁRIO</label>
       <div class="text-center flex items-center border-gray-500 py-2" >
            <b>{{userId.user_name}}</b>, você será o criador desse comentario
        </div><br>

    <label for="" class="text-xs font-semibold px-3">IDEIA</label>
        <div class="text-center flex items-center border-gray-500 py-2" >
            Você fará um comentario sobre: <b> {{com.idea_id}}</b>
    </div><br>  
                            
        <span style='float:right;'>
            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"> Adicionar comentário </button>
        </span>
</form>
    
</template>


<script type="text/javascript">
    import store from '../../store';
    import { Ideid } from '../../services/resources';
    // import Deptos from '../../services/resources.js';

    export default {
        data(){
            return {
                com: {
                    com_description: '',
                    com_image: '',
                    user_id: store.state.auth.user.id,
                    idea_id: this.$route.params.idcom,
                    //idea_name: null
                },

            
            }
        },
        created(){
            store.dispatch('load-users');
            store.dispatch('load-comments');
            store.dispatch('load-ideas');
            Ideid.query({id: this.com.idea_id}).then(response => {
               this.com.idea.idea_name = response.data.idea_name
            // console.log(reponse.data)

            // this.id_livro = response.data.id 
        })
        },
        computed: {
            isUser(){
                return  store.state.users;
            },
            userId() {
            return store.state.auth.user ? store.state.auth.user : {'user_name': ''}; 
            },
            isCats(){
                return  store.state.categories;
            },
          

        },
        methods: {
            cadastrar(){
                console.log(this.com)
                if(this.com.com_description.length <= 4){
                    alert('Preencha no mínimo 5 caracteres no comentario!');
                }else{
                    store.dispatch('savecomment', this.com)
                    .then((response) => {
                        this.$router.push({name: 'listcomments'});
                        //location.reload(true);
                        alert('Comentario  cadastrado com sucesso!')
                        })
                    .catch((responseError) => {
                    console.log('erro no cadastro de Comentario: /comentario.vue')
                })
              }    
                
            }
        }
    }
</script>

<style>

</style>