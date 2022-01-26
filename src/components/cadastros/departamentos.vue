<template>
<div>
    <link rel="stylesheet" href="vue-modal.css">

        <div class="col">
            <span style='float:right;margin-right:10px;font-size:40px;margin-top:-15px;' id='pointmouser' @click="showModal=true" class="font-bold text-3xl text-gray-900 text-sky-600" v-if="!id">+</span> 
            <a href="#" class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full" @click="showModal=true" v-if="id">Editar</a> 
        </div>

        <FormModal :based-on="showModal" style='width:600px;'  :title="id==false?'CADASTRAR DEPARTAMENTO':'ATUALIZAR DEPARTAMENTO'" @close="showModal = false">
            <div class="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:900px">
                <div class="md:flex w-full">
                    
                    <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                        <!-- <div class="text-center mb-100">
                            <h1 class="font-bold text-3xl text-gray-900 text-sky-600"  v-if="!dept_id">CADASTRAR DEPARTAMENTO</h1>
                            <h1 class="font-bold text-3xl text-gray-900 text-sky-600" v-if="dept_id">ATUALIZAR DEPARTAMENTO</h1>
                            <br>
                        </div> -->
                        <form  @submit.prevent="cadastrar()" method="POST">
                        <div>
                            <div class="text-center">
                                <div class="w-full px-3 mb-5 text-left">
                                    <label for="" class="text-xs font-semibold px-3">NOME</label>
                                    <div class="text-center flex items-center border-b border-gray-500 py-2">
                                        <input  v-model="dep.dep_name" type="text"  class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Nome do departamento" >
                                    </div>
                                </div>
                            </div><br>
        
                            <div class="flex -mx-3">
                                <div class="w-full px-3 mb-5">
                                    <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" v-if="!id" >CADASTRAR</button>
                                    <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" v-if="id">ATUALIZAR</button>
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
    import VueModal from '@kouts/vue-modal'
    import '../vue-modal.css'
    import Vue from 'vue'

    import store from '../../store';
    import { Deptosid } from '../../services/resources';
    
    Vue.component('FormModal', VueModal)
    export default {
        name: 'Departamentos',
        props: [
            'id'
        ],
        data(){
            return {
                showModal: false,
                dep: {
                    dep_name: null,
                },
                options: [],
                id_depto: null,
            }
        },
        components: {
        'FormModal': VueModal
         },
        created(){
        
            if(this.id){
                Deptosid.query({id: this.id}).then(response => {
                this.dep.dep_name = response.data.dep_name
               
                })
            }
            store.dispatch('load-depts');
        },
        computed: {
            isDept(){
            return  store.state.depts;
            },
        },
        methods: {
            cadastrar(){
                if(!this.id){
                store.dispatch('savedep', this.dep)
                    .then((response) => {
                        this.$router.push({name: 'listdep'});
                        location.reload(true);
                        alert('Departamento cadastrado com sucesso!')
                        
                    })
                    .catch((responseError) => {
                        console.log('erro no cadastro de departamento: /departamento.vue')
                    })
                }else{
                    Deptosid.update({id: this.id}, {dept: this.dep}).then(response => {
                        location.reload(true);
                            alert('Departamento atualizado com sucesso!')
                            }, response => {  
                            alert('DEU ERRADO!')  
                    });   
                    this.$router.push({name: 'listdep'});

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
