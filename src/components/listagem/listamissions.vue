<template>
    <div>
        <a class='mr-2' v-for="(count, i) in countResults" :key="i" v-on:click.prevent="filtrardept(count-1)"> PAGINA {{count}}</a><br><br>

          <div class="mb-3 xl:w-35" style="float:left">
            <select class="form-select mr-3 border-slate-300 p-2" v-model="selectedept" ref='dept_id' id='dept_id' @change="filtrardept()">
                <option value="">Selecione Departamento</option>
                <option :value="depts.id" v-for="(depts, i) in isDepts" :key="i">{{depts.dep_name}}</option>
            </select>
          </div>

        <div class="mb-3 xl:w-60 border-slate-300"  style="float:left">    
            <input class="form-select p-2" ref='search' id='search' type="text" placeholder="Busca" @change="filtrardept()">
       </div>


    <center>
        
        <div class='px-3 text-gray-500' style="padding:10px;float:left;background-color:white;width:100%;height:60px;border-radius:10px 10px 0px 0px;font-size:30px;">
            <span style='float:left;' class="font-bold text-3xl text-gray-900 text-sky-600">MISSÕES:</span> <span style='float:right;margin-right:10px;font-size:40px;' id='pointmouser' @click='addMission()' class="font-bold text-3xl text-gray-900 text-sky-600">+</span></div>
        <center>

        <div style='background-color:white; border-radius:10px; width:49%;margin-right:10px;padding:10px;margin-top:10px;float:left'
        v-for="(missions, i) in isMission" :key="i">
            <table class="border-collapse table-auto w-full text-sm">
            <tbody class="bg-white bg-gray-800">
                
                    <tr style=''>
                        <router-link v-bind:to="{ name: 'detalhesmiss', params: {id: missions.id} }">
                            <div class='bg-blue-200' style='border-radius:10px;' id='pointmouser' >
                                <td class="border-b border-gray-100 dark:border-gray-700 p-2 pl-3 text-gray-500 dark:text-gray-400">
                                        <span style='font-size:20px;' class='flex-auto text-lg font-semibold text-gray-900'>
                                            <span style='float:left;margin-right:7px;' class="font-bold text-white-900 text-sky-600">
                                                TÍTULO: 
                                            </span> {{missions.mis_name.toUpperCase()}}
                                        </span><br>
                                        <b>CRIADOR: </b> {{missions.user.user_name}}, {{missions.dept.dep_name}}
                        
                                </td>
                            </div>
                        </router-link>
                    </tr>
                    <tr>
                        
                        <td class="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400">
                            
                        
                        <div style='float:left;margin-right:10px;width:230px;'>

                            <img :src="getImgUrl(missions.mis_image)" style='' alt="">
                                
                        </div>
                        <div style='margin:10px;' align="justify">
                            <span >{{missions.mis_description | truncate(280, '...')}} </span>
                        
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400" colspan='2' style='text-align:right;width:85%;'>
                            <router-link v-bind:to="{ name: 'cadastroidea', params: {id: missions.user.id, idmis: missions.id} }">
                                <a href="#" class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full" >+ Adicionar Ideia</a>
                            </router-link>
                            <router-link v-bind:to="{ name: 'detalhesmiss', params: {id: missions.id} }">
                                <a href="#" class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full" >Ver detalhes</a>
                            </router-link>
                        </td>
                    </tr>
                
            </tbody>
            </table>
        </div>
        </center>
        
        

        </center>

    </div>
</template>

<script>
import store from '../../store';
export default {
    name: 'Listamissoes',
    data () {
        return {
            selectedept: "",
            countpage: Math.ceil(store.state.missions.length/2)
            }
    },
    created(){
        
            if(this.isAuth) {     
                store.dispatch('load-missions');
                store.dispatch('load-depts')
            }
    },
    computed: {
        isMission(){
            return store.state.missions; 
        },
        isAuth() {
            return store.state.auth.check;
        },
        isDepts() {
            return store.state.depts;
        },
        countResults(){
            return this.countpage
        },

    },
    methods: {
        getImgUrl(pet) {
            
            return 'http://localhost:3000/missions?img=' + pet;
            
        },

        deleteMission(id, mission_name){
            if (confirm('Deseja excluir a missão ' +mission_name+ ' permanentemente?')){
                const req = fetch(`http://localhost:3000/users/${id}`,{
                method: "DELETE"
                });
            alert('Excluido com sucesso');
            location.reload(true);
            }
        },
        addMission(){
                this.$router.push({name: 'cadastromissoes'});
            },
        filtrardept(page){
        
        store.dispatch('load-missionfiltrodept', page);
        
        }
        
        },
    filters: {
    truncate: function (text, length, suffix) {
        return text.substring(0, length) + suffix;
        },
    },
}
</script>

<style>

#pointmouser:hover{
    cursor:pointer;
}
</style>