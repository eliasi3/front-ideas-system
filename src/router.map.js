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
    }
];