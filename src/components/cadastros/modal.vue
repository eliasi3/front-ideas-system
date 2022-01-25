<template>
    <div>
        <link rel="stylesheet" href="vue-modal.css">

        <div class="col">
            <span style='float:right;margin-right:10px;font-size:40px;margin-top:-15px;' id='pointmouser' @click="showModal=true" class="font-bold text-3xl text-gray-900 text-sky-600">+</span>  
        </div>

        <Modal :based-on="showModal" style='width:800px;'  title="CADASTRAR MISSÃO" @close="showModal = false">
            
            <div class="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:900px">
                <div class="md:flex w-full">
                    
                    <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                        <form @submit.prevent="cadastrar()" method="POST" name='editFrm'>
                        <div>
                            <div class="text-center">
                                <div class=" px-6 mb-5 text-left">
                                    <div class="flex">
                                        <div class=" w-1/2 text-left flex items-center border-b border-gray-500 py-2">
                                        <label for="" class="text-xs font-semibold px-3">NOME DA MISSÃO</label>
                                        <input type="text" v-model="mis_name" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Nome da Missão" >
                                        </div>

                                        <div class=" w-1/2 text-center flex items-center border-b border-gray-500 py-2">
                                        <label for="" class="text-xs font-semibold px-3">DESCRIÇÃO</label>
                                            <textarea type="text" v-model="mis_description" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Adicione uma descrição" ></textarea>
                                        </div><br>
                                    </div>
                                    <br>

                                    <label for="" class="text-xs font-semibold px-3">USUÁRIO</label>
                                    <div class="text-center flex items-center border-gray-500 py-2" >
                                        <b>{{userId.user_name}}</b>, você será o criador desta missão
                                    </div><br>

                                    <label for="" class="text-xs font-semibold px-3">DATA LIMITE {{dat_limite}}</label>
                                    <div class="text-left items-center py-2">
                                    <input type="date" v-model="dat_limite" class="" required=''>
                                    </div><br>

                                        <div>
                                            <input type="checkbox" v-model="ies_multi" id="scales" @change="formatCheckMultiDepts(ies_multi)" name="scales" value='1'>
                                            <label for="scales">Multiplos departamentos podem responder: {{ies_multi}}</label>

                                            <input style='margin-left:30px;' type="checkbox" id="scales" @change="formatCheckAtivo(ies_ativo)" name="scales" value='1' checked>
                                            <label for="scales">Ativo {{ies_ativo}}</label>
                                            
                                        </div>
                                        <br>
                                            
                                        <center>
                                            <input type="hidden" name="hm_deptos">

                                            <select multiple size="10" name="deptosfora" v-model="deptosfora" style="padding:5px; width:40%;border:1px solid gray;">
                                            
                                                <option v-for="depto in isDept" :key='depto.id' :value='depto.id'>{{depto.dep_name}}</option>

                                            </select>

                                            <select multiple size="10" name="deptosdentro" v-model="deptosdentro" style="padding:5px;width:40%;border:1px solid gray;">
                                                
                                                <option v-for="fim in final" :key='fim.dept_id' :value='fim.dept_id'>{{fim.dep_name}}</option>

                                            </select><br>

                                            <input type="button" value=">" id='btn' @click="adddeptos()">
                                            <input type="button" value="<" id='btn' @click="removedeptos()">
                                        </center>

                                    <br><label for="" class="text-xs font-semibold px-3">DEPARTAMENTO</label>
                                        <div class="text-center flex items-center border border-gray-500 py-2" >
                                        <select v-model="dept_id" required='' class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                                            <option v-for="depto in isDept" :key='depto.id' :value='depto.id'>{{depto.dep_name}}</option>
                                        </select>    
                                        </div><br>  

                                        <label for="avatar" class="text-xs font-semibold px-3">ADICIONAR CAPA</label>
                                        <div class="flex items-center justify-center pt-5" >
                                            <input type="file" id="avatar" name="avatar" @change="handleFileUpload( $event )">
                                        </div><br>
                                </div>
                            </div>
        
                            <div class="flex -mx-3">
                                <div class="w-full px-3 mb-5">
                                    <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" v-if="!mission_id">CADASTRAR</button>
                                    <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" v-if="mission_id">ATUALIZAR</button>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>   
        </Modal>

    </div>
</template>
<script>
import VueModal from '@kouts/vue-modal'
import '../vue-modal.css'
import Vue from 'vue'
import store from '../../store';


Vue.component('Modal', VueModal)

export default {
    name: 'ModalForm',
    props: [
        'id'
    ],
        data(){
            return {  
                showModal: false,
                showSecondModal: false,
                mission_id: this.$route.params.id,
                
                mis_description: '',
                dept_id: null,
                user_id: store.state.auth.user.id,
                mis_name: '',
                mis_image: null,

                dat_limite: null,
                ies_multi: 0,
                ies_ativo: 1,
                mission_deptos: null,
                final: [],
                componentKey: 0
            
            }
        },
    components: {
        'Modal': VueModal
    },
    created(){
            
            if(this.mission_id){
                Missionid.query({id: this.mission_id}).then(response => {
                this.mis_description = response.data.mis_description,
                this.dept_id = response.data.dept_id,
                this.user_id = response.data.user_id
                this.mis_name = response.data.mis_name
                this.mis_image = response.data.mis_image
                this.dat_limite = response.data.dat_limite
                this.ies_multi = response.data.ies_multi
                this.ies_ativo = response.data.ies_ativo
            })

            }
            
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
            update(){
                this.componentKey += 1;
            },
            newDept(cod, text){
             
                var ndep = [{'dept_id': cod,'dep_name': text}]
                var fn = this.final.concat(ndep)
                // console.log('vai inserir:', ndep)
                
                this.final = fn
                // console.log('lado direito:', fn)
            },
            removedeptos(){
                var form = document.editFrm;
                var fl = this.final.length -1;
                
                for (fl; fl > -1; fl--) {
                    if (form.deptosdentro.options[fl].selected) {
                        this.final.splice(fl, 1);
                    }
                }
            },
            adddeptos(){
                var form = document.editFrm;
                var fl = form.deptosfora.length -1;
                var au = form.deptosdentro.length -1;
                var deptos_adic = "x";
                
                for (au; au > -1; au--) {
		          deptos_adic = deptos_adic + "," + form.deptosdentro.options[au].value + ","
	            }
                for (fl; fl > -1; fl--) {
                    if (form.deptosfora.options[fl].selected && deptos_adic.indexOf( "," + form.deptosfora.options[fl].value + "," ) == -1) {
                        var t = form.deptosdentro.length
                        
                        this.newDept(form.deptosfora.options[fl].value, form.deptosfora.options[fl].text)
	                }
	            }
            },
            

            formatCheckMultiDepts(CheckMD) {
                if (CheckMD == false){
                    this.ies_multi = 0
                }else{
                    this.ies_multi = 1
                }
                
            },
            formatCheckAtivo(CheckAT) {
                if (CheckAT == false){
                    this.ies_ativo = 1
                }else{
                    this.ies_ativo = 0
                }
                
            },

            handleFileUpload( event ){
                    this.mis_image = event.target.files[0];
                    console.log('imagens:', this.mis_image)
            },

            cadastrar(){
              
                
                if(this.mis_name.length <= 4){
                    alert('Preencha no mínimo 5 caracteres no nome da missão!');
                }else{
                  if(this.mis_description.length <= 10){
                    alert('Preencha no mínimo 11 caracteres no campo de descrição da missão!');
                    }else{ 
                        
                        if(!this.mission_id){
                            // alert('você está criando')

                            var form = document.editFrm;
                            var hm_depto = '';
                            var fl = this.final.length -1;

                            for (fl; fl > -1; fl--) {
                                hm_depto = ',' + hm_depto + ',' + form.deptosdentro.options[fl].value
                            }
                                form.hm_deptos.value = hm_depto
                                this.mission_deptos = form.hm_deptos.value
                           

                            let formData = new FormData();

                            // console.log(this.miss)
                            formData.append('file', this.mis_image);
                            formData.append('mis_name', this.mis_name);
                            formData.append('mis_description', this.mis_description);
                            formData.append('dept_id', this.dept_id);
                            formData.append('user_id', this.user_id);
                            formData.append('mission_deptos', this.mission_deptos);

                            formData.append('dat_limite', this.dat_limite);
                            formData.append('ies_ativo', this.ies_ativo);
                            formData.append('ies_multi', this.ies_multi);
                            
                            console.log([...formData])
                            store.dispatch('savemission', formData)
                            .then(response => {
                                this.$router.push({name: 'listmiss'});
                            })    
                        
                        }else{

                            alert('ATENÇÃO: A parte de edição ainda está em manutenção, volte mais tarde')

                            // let formData = new FormData();

                            // formData.append('mis_name', this.mis_name);
                            // formData.append('mis_description', this.mis_description);
                            // formData.append('dept_id', this.dept_id);
                            // formData.append('user_id', this.user_id);
                            
                            // formData.append('dat_limite', this.dat_limite);
                            // formData.append('ies_ativo', this.ies_ativo);
                            // formData.append('ies_multi', this.ies_multi);

                            // Missionid.update({id: this.mission_id}, {mission: formData.mis_name}).then(response => {
                            //     console.log(response.data)
                            //     alert('Missão atualizada com sucesso!')
                            // }, response => {    
                            //     alert('DEU ERRADO!')
                            // });
                            
                            // this.$router.push({name: 'listmiss'});

                        }
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
