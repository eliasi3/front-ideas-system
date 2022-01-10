<template>
<div>
    <v-row>
        <div class="mb-3 xl:w-35">
        <select class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal 
        text-gray-700 bg-white bg-clip-padding bg-no-repeat rounded transition ease-in-out m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-xl" 
        v-model="selectedcategorie" @change="filtrarcategory()">
                <option value="">Selecionar categoria</option>
                <option :value="categories.id" v-for="(categories, i) in isCategories" :key="i">{{categories.cat_name}}</option>
        </select>
        </div>&nbsp&nbsp
        
        <div class="mb-3 xl:w-35">
        <select class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal 
        text-gray-700 bg-white bg-clip-padding bg-no-repeat rounded transition ease-in-out m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-xl" 
        v-model="selectedmission" @change="filtrarmis()">
                <option value="">Selecionar Missão</option>
                <option :value="missions.id" v-for="(missions, i) in isMissions" :key="i">{{missions.mis_name}}</option>
        </select>
        </div>
        
        <div class='px-3 text-gray-500' style="padding:10px;background-color:white;width:100%;height:60px;border-radius:10px 10px 0px 0px;font-size:30px;margin-bottom: 10px;">
            <span style='float:left;' class="font-bold text-3xl text-gray-900 text-sky-600">IDEIAS</span> <span style='float:right;margin-right:10px;font-size:40px; ' id='pointmouser' class="font-bold text-3xl text-gray-900 text-sky-600"></span></div>
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
                            
                        
                        <div style='float:left;margin-right:10px;width:230px;'>

                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" style='position: relative;' alt="">

                        </div>
                        <div style='margin:10px;text-align: justify'>
                            <span>{{ideas.idea_description}} </span>
                        
                        </div>
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
            
            <div class='px-3 text-gray-500' style="padding:10px;background-color:white;width:100%;height:60px;border-radius:10px 10px 0px 0px;font-size:30px;margin-bottom: 10px;">
                        <span style='float:left;' class="font-bold text-3xl text-gray-900 text-sky-600">COMENTARIOS</span> 
                    </div>
                    <div style='background-color:white; border-radius:10px; width:100%;padding:10px;margin-bottom:10px;' v-for="(com, i) in isCom" :key="i">
                        <table class="border-collapse table-auto w-full text-sm">
                            <tbody class="bg-white bg-gray-800">
                                <tr>
                                    <td class="border-b border-gray-100 dark:border-gray-700 p-2 pl-3 text-gray-500 dark:text-gray-400" colspan='3'>
                                        <span style='font-size:25px;'>#Título do comentario: <br></span><br>
                                            <b>Comentario:</b>{{com.com_description}}, 
                                            <!-- <b> imagem: </b> {{com.com_image}}, -->
                                            <b> User: </b> {{com.user.user_name}},
                                            <b> Ideia: </b> {{com.idea.idea_name}}
                            
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
            }
    },
    created(){
            if(this.isAuth) {     
                store.dispatch('load-ideas', this.mission_id);
            }  
            
            console.log(this.com.idea_id)
            store.dispatch('load-comments', this.com.idea_id);

            Idcom.query({id: this.com.idea_id}).then(response => {
               this.com.idea_id = response.data
               
               //console.log(response.data)

            // this.id_livro = response.data.id 
        })
                store.dispatch('load-categories');
                store.dispatch('load-missions');
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
    },
    methods: {

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
        filtrarcategory(){
            this.selectedmission = ""
            store.dispatch('load-ideasfiltrocategorie', this.selectedcategorie);
            // alert(this.selectedcategorie);
        },
        filtrarmis(){
            this.selectedcategorie = ""
            store.dispatch('load-ideasfiltromission', this.selectedmission);
        }
        }
}
</script>

<style>

</style>