/* Arquivo usado para trabalhar com token usando os recursos do JWT
 * pegando a informação dentro do storage que foi armazenado previamente
 * Autor: Antonio Junior Data: 10/12/2021 16:54
 */ 

//importar o arquivo que faz o controle da sessão com informação do token
import SessionStorage from './session-storage';

//importar a class que faz o controle da biblioteca JWT
import {Jwt} from './resources';
import store from '../store';
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
    accessToken(email, password){
        // console.log(email, password)
        return Jwt.accessToken(email, password).then((response) => {
            console.log('console jwt', response.data)
            this.token = response.data.token;
            // console.log(response.data.id)
            store.dispatch('getUser', response.data.id);
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
}