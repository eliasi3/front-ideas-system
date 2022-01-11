<template>
    <center>
        <div class='px-3 text-gray-500' style="padding:10px;background-color:white;width:100%;height:60px;border-radius:10px 10px 0px 0px;font-size:30px;margin-bottom: 10px;">
            <span style='float:left;'  class="font-bold text-3xl text-gray-900 text-sky-600">COMENTARIOS</span> 
            <span style='float:left;' v-if='comentario' class="font-bold text-3xl text-gray-900 text-sky-600">SEM COMENTARIOS</span> 
             <router-link v-bind:to="{ name: 'cadastrocomment', params: {id: user_id, idcom: idea_id}}">
                    <a href="#" style='float:right;margin-right:10px;font-size:40px; ' id='pointmouser' class="font-bold text-3xl text-gray-900 text-sky-600" >+ </a>
            </router-link>
        </div> 
        <div style='background-color:white; border-radius:10px; width:100%;padding:10px;margin-bottom:10px;'
       v-for="(com, i) in isCom" :key="i">
            <table class="border-collapse table-auto w-full text-sm">
            <tbody class="bg-white bg-gray-800">
                
                    <tr>
                        <td class="border-b border-gray-100 dark:border-gray-700 p-2 pl-3 text-gray-500 dark:text-gray-400" colspan='3'>
                            <span style='font-size:25px;'>#Título do comentario: <br></span><br>
                            <b>Comentario:</b>{{com.com_description}}, 
                            <b> imagem: </b> {{com.com_image}},
                            <b> User: </b> {{com.user.user_name}},
                            <b> Ideia: </b> {{com.idea.idea_name}}
                            
                        </td>
                    </tr>
                
            </tbody>
            </table>
        </div>
    
        

    </center>
</template>

<script>
import store from '../../store';
//import { Idcom } from '../../services/resources';
export default {
    name: 'Listcomments',
    data () {
        return {
            comentario:false,
            
            idea_id: this.$route.params.idcom

            }
    },
    created(){
        // alert(this.idea_id)
            if(this.isAuth) {  
            store.dispatch('load-comments', this.idea_id);
            }
    },
    computed: {
        isEmail() {
            return store.state.auth.user.email
        },
        isCom(){
            return store.state.comments;
        },
        isAuth() {
            return store.state.auth.check;
        },
    },
    methods: {

        // deleteidea(id, idea_name){
        //      if (confirm('Deseja excluir a ideia ' +idea_name+ ' permanentemente?')){
        //       const req = fetch(`http://localhost:3000/ideas/${id}`,{
        //         method: "DELETE"
        //       });
                
        //         // store.dispatch('load-depts');
        //      };
        //      location.reload(true);
        //      alert('Ideia excluida com sucesso!')
        // },
        
        }
}
</script>

<style>

</style>