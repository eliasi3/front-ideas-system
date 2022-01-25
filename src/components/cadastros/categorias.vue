<template>
<div>
<link rel="stylesheet" href="vue-modal.css">

        <div class="col">
            <span style='float:right;margin-right:10px;font-size:40px;margin-top:-15px;' id='pointmouser' @click="showModal=true" class="font-bold text-3xl text-gray-900 text-sky-600">+</span>  
        </div>

        <FormModal :based-on="showModal" style='width:800px;'  title="CADASTRAR CATEGORIA" @close="showModal = false">
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
                                <div class="text-center">
                                    <div class="w-full px-3 mb-5 text-left"> 
                                        <label for="" class="text-xs font-semibold px-3">NOME</label>
                                            <div class="text-center flex items-center border-b border-gray-500 py-2" style=''>
                                                <input v-model="cat.cat_name" type="text" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Digite o nome da categoria" >
                                            </div><br>
                                    </div>
                                </div>
            
                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-5">
                                        <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" v-if="!cat_id">CADASTRAR</button>
                                        <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" v-if="cat_id">ATUALIZAR</button>
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
                cat_id: this.$route.params.id,
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
            if(this.cat_id){
                Catid.query({id: this.cat_id}).then(response => {
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
                if(!this.cat_id){
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
                        Catid.update({id: this.cat_id}, {category: this.cat}).then(response => {
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