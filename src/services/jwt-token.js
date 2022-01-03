/* Arquivo usado para trabalhar com token usando os recursos do JWT
 * pegando a informação dentro do storage que foi armazenado previamente
 * Autor: Antonio Junior Data: 10/12/2021 16:54
 */ 

//importar o arquivo que faz o controle da sessão com informação do token
import SessionStorage from './session-storage';

//importar a class que faz o controle da biblioteca JWT
import {Jwt, Criarlivro} from './resources';

export default {

    //getter token retorna session storage
    get token() {
        return SessionStorage.get('token')
    },

    //setter token grava caso não tenha token ou remove
    set token(value) {
        return value ? SessionStorage.set('token', value) : SessionStorage.remove('token');
    },

    //acesso ao token
    accessToken(email, password_digest){
        // console.log(email, password_digest)
        return Jwt.accessToken(email, password_digest).then((response) => {
            // console.log(response.data)
            this.token = response.data.token;
            // user_id = response.data.id;
        });
    },

    //atualiza o token quando é expirado
    refreshToken(){
        return Jwt.refreshToken().then(response => {
            this.token = response.data.token;
            return response;
        })
    },

    //getter o header com informação do token passado para o servidor backend da aplicação
    getAuthorizationHeader(){
        
        return `Bearer ${this.token}`;
    },
    criarlivro(){
        return Criarlivro.criarlivro(name, author, description).then((response) => {
            this.livro = response.data.livro;
        });  
    }
}