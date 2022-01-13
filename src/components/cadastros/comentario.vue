<template>
<center>
  <div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5" style="margin-top:-80px; margin-bottom:-100px"> 
    <div class="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:600px">
        <div class="md:flex w-full">
            <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                <div class="text-center mb-100">
                    <h1 class="font-bold text-3xl text-gray-900 text-sky-600">CADASTRAR COMENTARIO</h1>
                    <br>
                </div>
                 <form  @submit.prevent="cadastrar()" method="POST">
                    <div>
                         <div class="text-center">
                            <div class="w-full px-3 mb-5 text-left">

                            <div class="text-center flex items-center border-b border-gray-500 py-2">
                                <textarea  class="resize rounded-md appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Adicione um comentario" v-model="com_description" ></textarea>
                            </div>

                            <label for="" class="text-xs font-semibold px-3">USUÁRIO</label>
                            <div class="text-center flex items-center border-gray-500 py-2" >
                                <b>{{userId.user_name}}</b>, você será o criador desse comentario
                            </div><br>

                            <label for="" class="text-xs font-semibold px-3">IDEIA</label>
                            <div class="text-center flex items-center border-gray-500 py-2" >
                                Você fará um comentario sobre: <b> {{idea_id}}</b>
                            </div><br>

                            <label for="avatar" class="text-xs font-semibold px-3">ADICIONAR CAPA</label>
                            <div class="flex items-left justify-left pt-5" >
                                <input type="file" id="avatar" name="avatar" @change="handleFileUpload( $event )">
                            </div><br>
                                                    
                            <span style='float:right;'>
                                <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"> Adicionar comentário </button>
                            </span>
                        </div>
                    </div> 
                  </div>
                </form>
            </div>
        </div>
       </div>
    </div>
 </center>    
</template> 


<script type="text/javascript">
    import store from '../../store';
    import { Ideid } from '../../services/resources';
    // import Deptos from '../../services/resources.js';

    export default {
        data(){
            return {
                com_description: '',
                user_id: store.state.auth.user.id,
                idea_id: this.$route.params.idcom,

                com_image: null
            }
        },
        created(){
            store.dispatch('load-users');
            store.dispatch('load-comments');
            store.dispatch('load-ideas');
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
            handleFileUpload( event ){
                this.com_image = event.target.files[0];
            },

            cadastrar(){
                //console.log(this.com)
                if(this.com_description.length <= 4){
                    alert('Preencha no mínimo 5 caracteres no comentario!');
                }else{

                    let formData = new FormData();

                        formData.append('file', this.com_image);
                        formData.append('com_description', this.com_description);
                        formData.append('idea_id', this.idea_id);
                        formData.append('user_id', this.user_id);

                    store.dispatch('savecomment', formData)
                    .then((response) => {
                        this.$router.push({name: 'listcomments'});
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