<template>
    <div class="container">
        <div class="row">
            <form id="livro-form" @submit.prevent="saveautor()" method="post">
             <div class="input-container">
                <label for="name">Nome do Autor</label>
                <input type="text" id="name" name="name" v-model="autor.name" placeholder="Digite o nome do livro">
            </div>
            <div class="input-container">
                <label for="description">Descrição</label>
                <textarea type="text" id="description" name="description" v-model="autor.description" placeholder="Digite a descrição" rows="5" cols="33"/>
            </div>
            <div class="input-container">
                <input class="submit-btn" type="submit" value="Cadastrar">
            </div>
        </form>
            
        </div>
    </div>
</template>

<script>
 //import store from '../store';
import { Autor } from '../services/resources';
   export default {
    name: 'Pgtest',
    data(){
        return {
          autor: {
            name: null,
            description: null,
          },
          msg: null,
        }
    },
     methods: {  
      saveautor() { 
         var msg = '';
         
         if ( this.autor.name == null) {
		        msg += "\n Voce deve informar um nome com pelo menos 2 carecteres ";
	        }

          if (msg.length < 2) {
          Autor.save({}, {autor: this.autor}).then(response => {
            // success callback
            return response.data.msg
            
            }, response => {    
            // error callback
            return response.data.msg
            });
           } else {
		        alert(msg);
	        }

          // store.dispatch('savelivro', this.livro)
             
          //this.$router.push({name: 'dashboard'});
          },
          
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