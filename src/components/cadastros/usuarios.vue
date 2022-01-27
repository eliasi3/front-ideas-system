<template>
    <div>
        <link rel="stylesheet" href="vue-modal.css">

        <div class="col">
            <span style='float:right;margin-right:10px;font-size:40px;margin-top:-15px;' id='pointmouser' @click="showModal=true" class="font-bold text-3xl text-gray-900 text-sky-600" v-if="!id">+</span> 
            <a href="#" class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full" @click="showModal=true" v-if="id">Editar</a>  
        </div>

        <FormModal :based-on="showModal" style='width:900px;'  :title="id==false?'CADASTRAR USUÁRIO':'ATUALIZAR USUÁRIO'"  @close="showModal = false"> 
            <div class="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:900px">
                <div class="md:flex w-full">
                    
                    <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                        <form  @submit.prevent="cadastrar()" method="POST">
                            <div>
                                <div class="md:flex items-center mt-12">
                                    <div class="w-full md:w-1/2 flex flex-col">
                                        <label class="font-semibold leading-none">USUÁRIO</label>
                                        <input type="text" v-model="user.username" class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200" />
                                    </div>
                                    <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                                        <label class="font-semibold leading-none">NOME</label>
                                        <input type="text" v-model="user.user_name" class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"/>
                                    </div>
                                </div>
                                <div class="md:flex items-center mt-12">
                                    <div class="w-full md:w-1/2 flex flex-col">
                                        <label class="font-semibold leading-none">E-MAIL</label>
                                        <input type="text" v-model="user.email" class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200" />
                                    </div>
                                    <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4" v-if="!id">
                                        <label class="font-semibold leading-none">SENHA</label>
                                        <input v-model="user.password" required='' type="password" class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"/>
                                    </div>
                                </div>
                                <div class="md:flex items-center mt-12">
                                    <div class="w-full md:w-1/2 flex flex-col">
                                        <label class="font-semibold leading-none">TELEFONE</label>
                                        <input type="text" v-model="user.user_phone" class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200" />
                                    </div>
                                    <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                                        <table>
                                            <tr>
                                                <td style="padding-left: 10px;">
                                                    <input style='margin-left:30px;' type="checkbox" id="scales"  @change="formatCheckAtivo(ies_ativo)" name="scales" value='1' checked>
                                                    <label for="scales">Ativo {{user.ies_ativo}}</label><br>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <br>
                                <table>
                                    <tr>
                                        <td>
                                            <label for="" class="font-semibold leading-none">DEPARTAMENTO</label>
                                            <div class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200">
                                                <select v-model="user.dept_id" required='' class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                                                    <option value="">Selecione Departamento</option>
                                                    <option v-for="depto in isDept" :key='depto.id' :value='depto.id'>{{depto.dep_name}}</option>
                                                </select>    
                                            </div><br>
                                        </td>
                                    </tr>
                                </table>
            
                                <div class="flex -mx-3"  v-if="!id">
                                    <div class="w-full px-3 mb-5">
                                        <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" >CADASTRAR</button>
                                    </div>
                                </div>
                                <div class="flex -mx-3" v-if="id">
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
        </FormModal>
    </div>  
</template>

<script type="text/javascript">
    import store from '../../store';
    import VueModal from '@kouts/vue-modal'
    import '../vue-modal.css'
    import Vue from 'vue'
    import { Userid } from '../../services/resources';

    Vue.component('FormModal', VueModal)
    export default {
        name: 'Usuarios',
            props: [
                'id'
            ],
        data(){
            return {
                showModal: false,
                user: {
                    username: '',
                    user_name: '',
                    email: '',
                    password: '',
                    user_phone: '',
                    dept_id: '',
                    ies_ativo: 1
                },
                options: [],
                id_depto: null,
               

            }
        },
        components: {
        'FormModal': VueModal
         },
        created(){
            store.dispatch('load-depts');

            if(this.id){
               Userid.query({id: this.id}).then(response => {
                this.user.username = response.data.username,
                this.user.user_name = response.data.user_name,
                //this.user.password = response.data.password_digest
                this.user.email = response.data.email
                this.user.user_phone = response.data.user_phone
                this.user.dept_id = response.data.dept_id
               
            })
            }
            
        },
        computed: {
            isDept(){
            return  store.state.depts;
            },
        },
        methods: {
            formatCheckAtivo(CheckAT) {
                if (CheckAT == false){
                    this.user.ies_ativo = 1
                }else{
                    this.user.ies_ativo = 0
                }
                
            },
            cadastrar(){
               if (!this.id){
               if(this.user.username.length <= 4){
                    alert('Preencha no mínimo 5 caracteres no username!');
                }else{
                  if(this.user.email.length <= 7){
                    alert('Preencha no mínimo 8 caracteres no campo de email!');
                    }else{
                        if(this.user.password.length <= 5){
                            alert('Preencha no mínimo 6 caracteres no campo de senha!');
                        }else{
                           if(this.user.user_name.length <= 3){
                            alert('Preencha no mínimo 4 caracteres no campo de nome de usuário!');
                            }else{
                                store.dispatch('saveuser', this.user)
                                .then((response) => {
                                    alert('Cadastrado com sucesso!')
                                    this.$router.push({name: 'listuser'});
                                })
                                .catch((responseError) => {
                                    console.log('erro no cadastro de user: /usuarios.vue')
                                })
                            }
                        }
                    }
                }
                }else{
                    if(confirm("Deseja realmente editar esse usuário?")){
                        Userid.update({id: this.id}, {user: this.user}).then(response => {
                            location.reload(true);
                            alert('Usuário atualizado com sucesso!')
                            }, response => {    
                            console.log('DEU ERRADO!')
                            });
                                
                            this.$router.push({name: 'listuser'});
                        }else{

                    }

                }          
            }
        }
    }
</script>

<style scoped>

#pointmouser:hover{
    cursor:pointer;
}
</style>
