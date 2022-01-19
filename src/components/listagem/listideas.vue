<template>
<div>
   
        
        <a class='mr-2' v-for="(count, i) in countResults" :key="i" v-on:click.prevent="filtrarcategory(count-1)"> PAGINA {{count}}</a><br><br>
       <v-row>  

        <div class="mb-3 xl:w-35">
        <select class="form-select mr-3 border-slate-300 p-2" 
        v-model="selectedcategorie" ref='category_id' id='category_id' @change="filtrarcategory()">
                <option value="">Selecionar categoria</option>
                <option :value="categories.id" v-for="(categories, i) in isCategories" :key="i">{{categories.cat_name}}</option>
        </select>
        </div>
        
        <div class="mb-3 xl:w-35">
        <select class="form-select p-2 border-slate-300 mr-3" 
        v-model="selectedmission" ref='mission_id' id='mission_id' @change="filtrarcategory()">
                <option value="">Selecionar Missão</option>
                <option :value="missions.id" v-for="(missions, i) in isMissions" :key="i">{{missions.mis_name}}</option>
        </select>
        </div>

        <div class="mb-3 xl:w-60 border-slate-300" >    
            <input class="form-select p-2" ref='search' id='search' type="text" placeholder="Busca" @change="filtrarcategory()">

        </div>
        
        
        <div class='px-3 text-gray-500' style="padding:10px;background-color:white;width:100%;height:60px;border-radius:10px 10px 0px 0px;font-size:30px;margin-bottom: 10px;">
            <span style='float:left;' class="font-bold text-3xl text-gray-900 text-sky-600">IDEIAS {{countResults}}</span>  <span style='float:right;margin-right:10px;font-size:40px; ' id='pointmouser' class="font-bold text-3xl text-gray-900 text-sky-600"></span></div>
        <div style='background-color:white; border-radius:10px; width:100%;padding:10px;margin-bottom:10px;'
       v-for="(ideas, i) in isIde" :key="i">
            <table class="border-collapse table-auto w-full text-sm">
            <tbody class="bg-white bg-gray-800">
                
                    <tr>
                        <td class="border-b border-gray-100 dark:border-gray-700 p-2 pl-3 text-gray-500 dark:text-gray-400" colspan='3'>
                            <span style='font-size:25px;'>#Título da ideia: {{ideas.idea_name.toUpperCase()}}<br></span><br>
                            <b>CRIADOR:</b>{{ideas.user.user_name}},
                            <b>CATEGORIA:</b> {{ideas.category.cat_name}},
                            <b>MISSÃO:</b>  {{ideas.mission.mis_name}}
                        </td>
                    </tr>
                    <tr>
                        
                        <td class="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400" colspan='3'>
                                            
                        <tr>
                            <span v-for="(img, i) in getIdeaFile" :key="i" style=''>
                                <img v-if="img.idea_id == ideas.id" :src="getImgUrl(`${img.idea_id == ideas.id ? img.idea_file : ''}`)" style='float:left;width:280px;height:190px;margin-left:8px;margin-bottom:10px;'>
                            </span>
                        </tr>
                        <span><b>DESCRIÇÃO:</b> {{ideas.idea_description}} </span>
                    

                        </td>
                    </tr>
                    <tr>
                        <td class="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400" colspan='2' style='text-align:right;width:85%;'>
                            <router-link v-bind:to="{ name: 'editarideia', params: {id: ideas.id} }">
                                <a href="#" class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full" >Editar</a>
                            </router-link>
                            <a href="#" class="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full" @click='deleteidea(ideas.id, ideas.idea_name)'>Excluir</a>
                        </td>
                    </tr>
                
            </tbody>
            </table>
            <!-- <div class='px-3 text-gray-500' style="padding:10px;background-color:white;width:100%;height:60px;border-radius:10px 10px 0px 0px;font-size:30px;margin-bottom: 10px;">
                        <span style='float:left;' class="font-bold text-3xl text-gray-900 text-sky-600">COMENTARIOS</span> 
                    </div> -->
                    <!-- <div style='background-color:white; border-radius:10px; width:100%;padding:10px;margin-bottom:10px;' v-for="(com, i) in isCom" :key="i">
                        <table class="border-collapse table-auto w-full text-sm">
                            <tbody class="bg-white bg-gray-800">
                                <tr>
                                    <td class="border-b border-gray-100 dark:border-gray-700 p-2 pl-3 text-gray-500 dark:text-gray-400" colspan='3'>
                                        <span style='font-size:25px;'>#Título do comentario: <br></span><br>
                                            <b>Comentario:</b>{{com.com_description}}, 
                                            
                                            <b> User: </b> {{com.user.user_name}},
                                            <b> Ideia: </b> {{com.idea.idea_name}}
                            
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> -->
        </div>
        <!-- listando os comentarios das ideias  -->
                    
    
        
        </v-row> 
        </div>
</template>

<script>

import store from '../../store';
import { Idcom } from '../../services/resources';
export default {
    name: 'Listaideas',
    data () {
        return {
            com: {
                com_description: '',
                com_image: '',
                user_id: store.state.auth.user.id,
                idea_id: ''
            },
                //idea_id: this.$route.params.id,
            mission_id: null,
            selectedcategorie: "",
            selectedmission: "",
            mission_id: null,
            countpage: Math.ceil(store.state.ideas.length/2)
            }
    },
    created(){
             
            if(this.isAuth) {     
                store.dispatch('load-ideas', this.mission_id);
            }  
            
            //console.log(this.com.idea_id)
            store.dispatch('load-comments', this.com.idea_id);

            Idcom.query({id: this.com.idea_id}).then(response => {
               this.com.idea_id = response.data
            })
                store.dispatch('load-categories');
                store.dispatch('load-missions');
                store.dispatch('load-ideasfiles');
            
            },
    
    computed: {
         
        isEmail(){
            return store.state.auth.user.email
        },
        isIde(){
            return store.state.ideas;
        },

        isAuth() {
            return store.state.auth.check;
        },
        isCom(){
            return store.state.comments;
        },
        isCategories() {
            return store.state.categories;
        },
        isMissions() {
            return store.state.missions;
           
        },
        countResults(){
            return this.countpage;
        },
        getIdeaFile() {
            return store.state.ideas_file;
        },

    },
    methods: {
        
        getImgUrl(pet) {
             if(pet){
                return 'http://localhost:3000/idea_files?img=' + pet;
             }
              
        },
        deleteidea(id, idea_name){
             if (confirm('Deseja excluir a ideia ' +idea_name+ ' permanentemente?')){
              const req = fetch(`http://localhost:3000/ideas/${id}`,{
                method: "DELETE"
              });
                
                // store.dispatch('load-depts');
             };
             location.reload(true);
             alert('Ideia excluida com sucesso!')
        },
        addidea(){
                this.$router.push({name: 'cadastroidea'});
            },
        filtrarcategory(page){
            
            // alert(page)
            store.dispatch('load-ideasfiltrocategorie', page);
           
        }
        }
}
</script>

<style>

</style>