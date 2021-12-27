/* Lista dos componentes da aplicação
 * usados nas rotas e com os devidos 
 * controle de segurançã usando o JWT
 * autor: Antonio Junior Data: 10/12/2021 13:06
 */

// Importes dos componentes da pasta de components
import LoginComponent from './components/auth/Login.vue';
import LogoutComponent from './components/auth/Logout.vue';
import Pgtest from './components/Pgtest.vue';
import Dashboard from './components/Dashboard.vue';
import Caixas from './components/Caixas.vue';
import Autores from './components/Autores.vue';
import Editarlivro from './components/Editarlivro.vue';
// import Axios from './components/Axios.vue';


export default [
    {
        name: 'auth.login',
        path: '/',
        component: LoginComponent,
        meta: {auth: false}
    },
    {
        name: 'auth.logout',
        path: '/logout',
        component: LogoutComponent,
        meta: {auth: true}
    },
    {
        name: 'pgtest',
        path: '/pg',
        component : Pgtest,
        meta: {auth: true}
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component : Dashboard,
        meta: {auth: true}
    },
    {
        name: 'caixas',
        path: '/caixas',
        component : Caixas,
        meta: {auth: true}
    },
    {
        name: 'autores',
        path: '/autores',
        component : Autores,
        meta: {auth: true}
    },
    {
        name: 'editarlivro',
        path: '/editarlivro',
        component : Editarlivro,
        meta: {auth: true}
    }
    // {
    //     name: 'axios',
    //     path: '/axios',
    //     component : Axios,
    //     meta: {auth: true}
    // },
];