<template>
 
<div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5" style="margin-top:15px; margin-bottom:-90px"> 
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

                                <center>
                                <input type="hidden" name="hm_deptos">
                                <select multiple size="10" name="deptosfora" v-model="deptosfora" style="padding:5px; width:40%;border:1px solid gray;">
                                   
                                    <option v-for="depto in isDept" :key='depto.id' :value='depto.id'>{{depto.dep_name}}</option>

                                </select>

                                <select multiple size="10" name="deptosdentro" v-model="deptosdentro" style="padding:5px;width:40%;border:1px solid gray;">
                                    
                                </select><br>
                                
                                <input type="checkbox" v-model="op" name='opcionais' value='1' @change='opc'>
                                <input type="checkbox" v-model="op" name='opcionais' value='2' @change='opc'>
                                <input type="checkbox" v-model="op" name='opcionais' value='3' @change='opc'>
                                <input type="checkbox" v-model="op" name='opcionais' value='4' @change='opc'>
                                <input type="checkbox" v-model="op" name='opcionais' value='5' @change='opc'>

                                <input type="button" value=">" id='btn' @click="adddeptos()">
                                <input type="button" value="<" id='btn' @click="removedeptos()">
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
    </div>
</div>

<!-- BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES -->

   
</template>

<script type="text/javascript">
    import store from '../../store';
    // import axios from 'axios'; 
    export default {
        data(){
            return {   
                op: []  
            }
        }, 
        created(){
            store.dispatch('load-depts');
        },
        computed: {
            isDept(){
            return  store.state.depts;
            },
        },
        methods: {
            opc(){
                alert(this.op)
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
                    //oque é o deptos1?????????
                    if (form.deptosfora.options[fl].selected && deptos1.indexOf( "," + form.deptosfora.options[fl].value + "," ) == -1) {
                        var t = form.deptosdentro.length
                        opt = new Option( form.deptosfora.options[fl].text, form.deptosfora.options[fl].value );
                        form.deptosdentro.options[t] = opt
	                }
	            }
            },
            removedeptos(){
                alert('remove')
            },

            cadastrar(){
                alert('op:', this.opcionais)
                
            }
        }
    }
</script>
<style>
#btn {
    background-color:rgb(219, 219, 219);
    padding: 5px;
}
</style>