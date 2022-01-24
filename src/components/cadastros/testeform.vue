<template>
 
<div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5" style="margin-bottom:-90px"> 
    <link rel="stylesheet" href="vue-modal.css">
    <div class="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:600px">
        <div class="md:flex w-full">
            
            <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                <div class="text-center mb-100">
                    <h1 class="font-bold text-3xl text-gray-900 text-sky-600">CADASTRAR VARIOS DEPTOS</h1>
                    
                </div><br>
                <form @submit.prevent="cadastrar()" method="POST" name='editFrm'>
                <div>
                    <div class="text-center">
                        <div class="w-full px-3 mb-5 text-left">                             

                                SELECT MULTIPLE
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
                                
                                <hr><br>
                                VALOR MOEDA
                                <input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "text" maxlength = "11" v-model="moeda" value='' id='moeda' style='border: 1px solid gray' @keyup="formataDinheiro();">
                                R$ {{moedas}}
                                <br><br><hr><br>
                                
                                
                                    <select style='border:1px solid gray' name='selectpai' v-model="firstOption" @change='alterstatus(firstOption)'>
                                        <option v-for="(item, i) in status" :key='i' :value='item.id'>{{ item.name }}</option>
                                    </select>
                                    
                                    <select style='border:1px solid gray' name='selectpai' v-model="firstOption">
                                        <option v-for="(item, i) in carregarstatus" :key='i'>{{ item.razao_name }}</option>
                                    </select>

                                <br><hr><br>
                                </center>
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
        <hr>

        <ModalForm id='1'/>
 
    </div>
</div>
   
</template>

<script type="text/javascript" >
    import ModalForm from './modal.vue'

    import store from '../../store';
    import axios from 'axios'; 
    export default {
        data(){
            return { 
                idea_id: this.$route.params.idcom,

                showModal: false,
                showSecondModal: false,

                 moedas: null,
                 componentKey: 0,
                 final: [],
                
                 firstOption: 'A',
                 secondOption: '',

                 status: [
                     {'id': 'A', 'name': 'Aberto'}, 
                     {'id': 'X', 'name': 'Arquivado'}, 
                     {'id': 'F', 'name': 'Finalizado'}, 
                     {'id': 'C', 'name': 'Em coleta'}, 
                 ],

            }

        },
         components: {
        'ModalForm': ModalForm
        },
        created(){
            store.dispatch('load-depts');
            store.dispatch('load-razaos', this.firstOption);
            store.dispatch('load-comments', this.idea_id);
        },
        computed: {
            isDept(){
                return store.state.depts;
            },
            carregarstatus(){
                return store.state.razaos;
            },
            isCom(){
            return store.state.comments;
            },
        },
        methods: {
            getImgUrl(pet) {
                return 'http://localhost:3000/comments?img=' + pet;
            
            },
            alterstatus(stat){
                store.dispatch('load-razaos', stat);
            },

            formataDinheiro() {
                var n = document.getElementById("moeda").value
                var v = n.replace(/\D/g,'');
                v = (v/100).toFixed(2) + '';
                v = v.replace(".", ",");
                v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
                v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
                this.moedas = v
                document.getElementById("moeda").value = this.moedas
                console.log('moedas ', this.moedas)
                console.log('n ', document.getElementById("moeda").value)
                console.log('v ',v)
            },
            update(){
                this.componentKey += 1;
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

            cadastrar(){
                console.log(this.final)
                var form = document.editFrm;
                var hm_depto = '';
                var fl = this.final.length -1;

                for (fl; fl > -1; fl--) {
                    hm_depto = ',' + hm_depto + ',' + form.deptosdentro.options[fl].value
                }
                    form.hm_deptos.value = hm_depto

                axios.post('http://localhost:3000/missions', form, { headers: {
                    'Content-Type': 'multipart/form-data'
                }})
                .then(response => {
                    console.log(response.data)
                    alert('Adicionado com sucesso!');
                })
                .catch(error => {
                    console.log('Erro no cadastro')
                })
                
            }, 
        }
    }
</script>
<style>
#btn {
    background-color:rgb(219, 219, 219);
    padding: 5px;
}
.overflow-hidden {
  overflow: hidden;
}
.modal-footer {
  padding: 15px 0px 0px 0px;
  border-top: 1px solid #e5e5e5;
  margin-left: -14px;
  margin-right: -14px;
}

</style>