<template>
 
<div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5" style="margin-top:15px; margin-bottom:-90px"> 
    <div class="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:600px">
        <div class="md:flex w-full">
            
            <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                <div class="text-center mb-100">
                    <h1 class="font-bold text-3xl text-gray-900 text-sky-600">CADASTRAR MISSÃO</h1>
                </div><br>
                <form @submit.prevent="cadastrar()" method="POST">
                <div>
                    <div class="text-center">
                        <div class="w-full px-3 mb-5 text-left">

                                <label for="" class="text-xs font-semibold px-3">NOME</label>
                                <div class="text-center flex items-center border-b border-gray-500 py-2">
                                <input type="text" v-model="miss.mis_name" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Nome da Missão" >
                                </div><br>

                                <label for="" class="text-xs font-semibold px-3">DESCRIÇÃO</label>
                                <div class="text-center flex items-center border-b border-gray-500 py-2">
                                <textarea type="text" v-model="miss.mis_description" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Adicione uma descrição" ></textarea>
                                </div><br>

                                

                                <label for="" class="text-xs font-semibold px-3">USUÁRIO</label>
                                <div class="text-center flex items-center border-gray-500 py-2" >
                                     <b>{{userId.user_name}}</b>, você será o criador desta missão
                                </div><br>

                                <label for="" class="text-xs font-semibold px-3">DEPARTAMENTO</label>
                                <div class="text-center flex items-center border-gray-500 py-2" >
                                     Esta missão ficará ligada ao departamento: <b> {{userId.dept.dep_name}}</b>
                                </div><br>

                                <label for="avatar" class="text-xs font-semibold px-3">ADICIONAR CAPA</label>
                                <div class="flex items-center justify-center pt-5" >
                                    <input type="file" id="avatar" name="avatar" @change='onFilesSelected'>
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
    import axios from 'axios'; 
    export default {
        data(){
            return {
                miss: {
                    mis_name: '',
                    mis_description: '',
                    dept_id: store.state.auth.user.dept.id,
                    user_id: store.state.auth.user.id,
                    mis_image: null
                    
                },
               
                    
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
            userId() {
            return store.state.auth.user ? store.state.auth.user : {'user_name': ''}; 
            },
            isDept(){
            return  store.state.depts;
            },
        },
        methods: {
            
            onFilesSelected(event){
                this.miss.mis_image = event.target.files[0]
            },

            cadastrar(){
              
                
                if(this.miss.mis_name.length <= 4){
                    alert('Preencha no mínimo 5 caracteres no nome da missão!');
                }else{
                  if(this.miss.mis_description.length <= 10){
                    alert('Preencha no mínimo 11 caracteres no campo de descrição da missão!');
                    }else{ 

                       // alert('continua');
                        const formData = new FormData();

                        formData.append('file', this.miss.mis_image);
                        const headers = { 'Content-Type': 'multipart/form-data' };

                        console.log('cadastrado com sucesso!', formData)
                        // axios.post('http://localhost:3000/missions', formData, { headers }).then((res) => {
                        //         res.data; // binary representation of the file
                        //         res.status; // HTTP status
                        // });
                    
                        
                    }
                 }     
                
            }
        }
    }
</script>