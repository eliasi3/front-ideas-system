<template>
    <div style='padding:10px'>
        Logado com E-mail: {{ isEmail }}
    </div>
</template>

<script>

import store from '../store.js';
// import {User} from '../services/resources.js';

export default {
    
    data () {
        return {
            menuPerfil: false,
            }
    },
    computed: {
        isEmail() {
            return store.state.auth.user.email
        }
    },
    methods: {
        abrir() {
            this.menuPerfil = this.menuPerfil == false ? true : false;
        },
        // User() {
        //     return User.get(id)
        // },
        // MethoddeTextoTeste() {
        //     return 'TESTE'
        // }
    }
  
}
</script>