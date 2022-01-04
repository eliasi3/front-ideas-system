<template>
    <center>
        <div class='px-3 text-gray-500' style="padding:10px;background-color:white;width:100%;height:60px;border-radius:10px 10px 0px 0px;font-size:30px;"><span style='float:left;' class="font-bold text-3xl text-gray-900 text-sky-600">MISSÕES:</span> <span style='float:right;margin-right:10px;font-size:40px;' id='add' @click='addMission()' class="font-bold text-3xl text-gray-900 text-sky-600">+</span></div>
        <div style='background-color:white; border-radius:10px; width:100%;padding:10px;margin-top:10px;'
        v-for="(missions, i) in isMission" :key="i">
            <table class="border-collapse table-auto w-full text-sm">
            <tbody class="bg-white bg-gray-800">
                
                    <tr style='' >
                        <div class='bg-blue-100' style='border-radius:10px;'>
                        <td class="border-b border-gray-100 dark:border-gray-700 p-2 pl-3 text-gray-500 dark:text-gray-400" colspan='3'><span style='font-size:25px;' ><span style='float:left;margin-right:7px;' class="font-bold text-white-900 text-sky-600">TÍTULO: </span> {{missions.mis_name.toUpperCase()}}</span><br><b>CRIADOR: </b> {{missions.user.user_name}}, {{missions.dept.dep_name}}
                        
                        </td>
                        </div>
                    </tr>
                    <tr>
                        
                        <td class="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400" colspan='3'>
                            
                        
                        <div style='float:left;margin-right:10px;width:230px;'>

                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" style='position: relative;' alt="">

                        </div>
                        <div style='margin:10px;'>
                            <span>{{missions.mis_description}} </span>
                        
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400" colspan='2' style='text-align:right;width:85%;'>
                            <router-link v-bind:to="{ name: '', params: {id: missions.user.id} }">
                                <a href="#" class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full" >+ Adicionar Ideia</a>
                            </router-link>
                            <router-link v-bind:to="{ name: '', params: {id: missions.user.id} }">
                                <a href="#" class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full" >Ver detalhes</a>
                            </router-link>
                        </td>
                    </tr>
                
            </tbody>
            </table>
        </div>
        
        

    </center>
</template>

<script>
import store from '../../store';
export default {
    name: 'Listamissoes',
    data () {
        return {

            }
    },
    created(){
        
            if(this.isAuth) {     
                store.dispatch('load-missions');
            }
    },
    computed: {
        isMission(){
            return store.state.missions; 
        },
        isAuth() {
            return store.state.auth.check;
        },
    },
    methods: {

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
            }
        
        }
}
</script>

<style>

#add:hover{
    cursor:pointer;
}
</style>