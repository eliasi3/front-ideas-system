<template>
    <center>
        <div class='px-3 text-gray-500' style="padding:10px;background-color:white;width:100%;height:60px;border-radius:10px 10px 0px 0px;font-size:30px;">
            <span style='float:left;' class="font-bold text-3xl text-gray-900 text-sky-600">MISSÃO: {{miss.mis_name}}</span>

        <span style='float:right;'>
            <router-link v-if='excluir' v-bind:to="{ name: 'listmiss'}">
                <a href="#" style='font-size:15px;' class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full" > Excluir</a>
            </router-link>

            <router-link v-bind:to="{ name: 'listmiss'}">
                <a href="#" style='font-size:15px;' class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full" > Voltar</a>
            </router-link>

        </span></div>
        <div style='background-color:white; border-radius:10px; width:100%;padding:10px;margin-top:10px;'>
            <table class="border-collapse table-auto w-full text-sm">
            <tbody class="bg-white bg-gray-800">
                
                    <tr class='bg-blue-100'>
                        
                            
                        <td width='50%' class="border-b border-gray-100 dark:border-gray-700 p-2 pl-3 text-gray-500 dark:text-gray-400">
                           <div class='bg-blue-100' style='border-radius:10px;width:100%;text-align:left;'> 

                                <p><b>CRIADOR DA MISSÃO: {{ miss.user_name }}</b></p>
                                <p><b>CRIADO EM: {{ miss.criado }}</b></p>

                            </div>
                        </td>
                        <td width='50%' class="border-b border-gray-100 dark:border-gray-700 p-2 pl-3 text-gray-500 dark:text-gray-400">
                            <div style='padding:10px;border-radius:10px;width:100%;text-align:right;'> 
 
                                <router-link v-bind:to="{ name: '', params: {} }">
                                    <a href="#" class="px-4 py-1 text-sm text-white bg-orange-400 rounded-full" >+ Adicionar Ideia</a>
                                </router-link>

                            </div>
                        </td>
                        
                    </tr>
                    <tr>
                        
                        <td class="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400" colspan='3'>
                            
                       <center> 
                        <div style='float:left;margin-right:10px;width:260px;'>

                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" style='position: relative;' alt="">

                        </div><div style='float:left;margin-right:10px;width:260px;'>

                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" style='position: relative;' alt="">

                        </div><div style='float:left;margin-right:10px;width:260px;'>

                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" style='position: relative;' alt="">

                        </div><div style='float:left;margin-right:10px;width:260px;'>

                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" style='position: relative;' alt="">

                        </div>
                        </center>
                        </td>
                    
                    </tr>                
                    <tr>
                        <td class="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400" colspan='2' style='text-align:left;width:85%;'>
                            <span> {{miss.mis_description}} </span>
                        </td>
                    </tr>
                
            </tbody>
            </table>
        </div>
        
        <div class='px-3 text-gray-500' style="padding:10px;background-color:white;width:100%;height:60px;border-radius:0px 0px 10px 10px ;font-size:30px;margin-top:10px;">
            <span style='float:left;' class="font-bold text-3xl text-gray-900 text-sky-600">IDEIAS DA MISSÃO:</span>

        </div>

    </center>
</template>

<script>
import store from '../../store';

import { Missionid } from '../../services/resources';
export default {
    name: 'Detalhesmissoes',
    data () {
        return {
            miss: {
                mis_description: null,
                user_name: null,
                criado: null,
                mis_name: null
            },
            
            mission_id: this.$route.params.id,
            user_id: store.state.auth.user.id,
            criador: null,
            excluir: false
            }
    },
    created(){
                
                
                store.dispatch('load-missions');

                Missionid.query({id: this.mission_id}).then(response => {
                this.miss.mis_description = response.data.mis_description,
                this.miss.user_name = response.data.user.user_name,
                this.miss.criado = response.data.created_at,
                this.miss.mis_name = response.data.mis_name,
                this.criador = response.data.user.id
                

                if(this.user_id == this.criador){
                    this.excluir = true
                }
        })
            
    },
    methods: {
        
        }
}
</script>

<style>

#add:hover{
    cursor:pointer;
}
</style>