<template>
    <div class="container">
        <div class="row">
            <form id="livro-form" @submit.prevent="updatelivro()" method="post">
             <div class="input-container">
                 <h2 style='font-size:30px;border-bottom:4px solid darkblue; border-top:4px solid darkblue;border-radius:10px;padding:10px;align:center;'>Edição do Livro {{id_livro}}</h2><br>
                <label for="name">Nome do Livro </label>
                <input type="text" id="name" name="name" v-model="livro.name" placeholder="Digite o nome do livro">
            </div>
            <div class="input-container">
                <label for="author">Autor</label>
                <input type="text" id="author" name="author" v-model="livro.author" placeholder="Digite nome do autor">
            </div>
            <div class="input-container">
                <label for="description">Descrição</label>
                <textarea type="text" id="description" name="description" v-model="livro.description" placeholder="Digite a descrição" rows="5" cols="33"/>
            </div>
            <div class="input-container">
                <input class="submit-btn" type="submit" value="Atualizar">
            </div>
            
        </form>
            
        </div>
    </div>
</template>

<script>
// import store from '../store';
import { Livroid } from '../services/resources';
   export default {
    name: 'Editarlivro',
    data(){
        return {
          livro: {
            name: null,
            author: null,
            description: null,
          },
          id_livro: this.$route.params.id,
          msg: null,    
        }
    },
     created() {
      // this.getLivros(this.$route.params.id);
      Livroid.query({id: this.id_livro}).then(response => {
            this.livro.name = response.data.name,
            this.livro.author = response.data.author,
            this.livro.description = response.data.description
            // this.id_livro = response.data.id 
        })
    },

     methods: {  
      updatelivro() { 
            if(confirm("deseja realmente editar esse cadatro?")){
            Livroid.update({id: this.id_livro}, {livro: this.livro}).then(response => {
              // success callback
            console.log(this.id_livro)
            // return response.data.msg
            
            }, response => {    
              // error callback
            console.log('DEU ERRADO!')
            // return response.data.msg
            });

          // store.dispatch('savelivro', this.livro)
             
          this.$router.push({name: 'dashboard'});
          }else{

          }
          
          },
          cancel(){
              this.$router.push({name: 'dashboard'});
          }
          
          
      },
   }  
    
    
</script>

<style scoped>
.logo {
  margin-top: -160px
}

h1{
  color: rgb(0, 0, 0);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 20px;
  margin-top: -190px;
  margin-left: 150px;
}
  #livro-form {
    max-width: 400px;
    margin: 0 auto;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;;
    padding: 5px 10px;
    border-left: 4px solid #0d5f69;
  }

  input, select {
    padding: 5px 10px;
    width: 300px;
  }

  #opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
  }

  #opcionais-title {
    width: 100%;
  }

  .checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
  }

  .checkbox-container span,
  .checkbox-container input {
    width: auto;
  }

  .checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
  }

  .submit-btn {
    background-color: #222;
    color:#42b983;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }

  .submit-btn:hover {
    background-color: transparent;
    color: #222;
  }
</style>