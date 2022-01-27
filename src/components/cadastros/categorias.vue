<template>
<div>
<link rel="stylesheet" href="vue-modal.css">

        <div class="col">
            <span style='float:right;margin-right:10px;font-size:40px;margin-top:-15px;' id='pointmouser' @click="showModal=true" class="font-bold text-3xl text-gray-900 text-sky-600" v-if="!id">+</span>  
            <a href="#" class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full" @click="showModal=true" v-if="id">Editar</a>
        </div>

        <FormModal :based-on="showModal" style='width:800px;'  :title="id==false?'CADASTRAR CATEGORIA':'ATUALIZAR CATEGORIA'" @close="showModal = false">
            <div class="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:900px">
                <div class="md:flex w-full">
                    
                    <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                            <!-- <div class="text-center mb-100">
                                <h1 class="font-bold text-3xl text-gray-900 text-sky-600" v-if="!cat_id">CADASTRAR CATEGORIA</h1>
                                <h1 class="font-bold text-3xl text-gray-900 text-sky-600" v-if="cat_id">ATUALIZAR CATEGORIA</h1>
                                <br>
                            </div> -->
                        <form  @submit.prevent="cadastrar()" method="POST">
                            <div>
                                <div class="md:flex items-center mt-12">
                                    <div class="w-full md:w-1/2 flex flex-col">
                                        <label class="font-semibold leading-none">Nome</label>
                                        <input type="text" v-model="cat.cat_name" class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200" />
                                    </div>
                                </div>
                                <br>           
                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-5">
                                        <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" v-if="!id">CADASTRAR</button>
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
    import { Catid } from '../../services/resources';

    Vue.component('FormModal', VueModal)
  
    export default {
        name: 'Categorias',
        props: [
              'id'
            ],
        data(){
            return {
                showModal: false,
                cat: {
                    cat_name: null,
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
                Catid.query({id: this.id}).then(response => {
                this.cat.cat_name = response.data.cat_name
            
            })
            }
            store.dispatch('load-categories');
        },
        computed: {
            isDept(){
            return  store.state.categories;
            },
        },
        methods: {
            cadastrar(){
                if(!this.id){
                if(this.cat.cat_name.length <= 4){
                    alert('Preencha no mínimo 5 caracteres no nome da categoria!');
                }else{
                    store.dispatch('savecat', this.cat)
                    .then((response) => {
                        this.$router.push({name: 'listcat'});
                        location.reload(true);
                        alert('Categoria cadastrada com sucesso!')
                    })
                    .catch((responseError) => {
                        console.log('erro no cadastro de categoria: /categorias.vue')
                    })
                }
                }else{
                     if(confirm("Deseja realmente editar esse categoria?")){
                        Catid.update({id: this.id}, {category: this.cat}).then(response => {
                        console.log(this.cat_id)
                        location.reload(true);
                        alert('Categoria atualizada com sucesso!')
                        }, response => {    
                        console.log('DEU ERRADO!')
                        });

                        
                    this.$router.push({name: 'listcat'});
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