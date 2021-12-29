/* Lista dos componentes da aplicação
 * usados nas rotas e com os devidos 
 * controle de segurançã usando o JWT
 * autor: Antonio Junior Data: 10/12/2021 13:06
 */

// Importes dos componentes da pasta de components
import LoginComponent from './components/auth/Login.vue';
import Pgtest from './components/Pgtest.vue';
import Dashboard from './components/Dashboard.vue';
import LogoutComponent from './components/auth/Logout.vue';
import DepartamentosCadastro from './components/cadastros/departamentos.vue';
import CategoriasCadastro from './components/cadastros/categorias.vue';
import UsuariosCadastro from './components/cadastros/usuarios.vue';

// import Axios from './components/Axios.vue';


export default [
    {
        name: 'auth.login',
        path: '/',
        component: LoginComponent,
        meta: {auth: false}
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
        name: 'auth.logout',
        path: '/logout',
        component: LogoutComponent,
        meta: {auth: true}
    },
    {
        name: 'cadastrodepartamentos',
        path: '/departamentos',
        component: DepartamentosCadastro,
        meta: {auth: true}
    },
    {
        name: 'cadastrocategorias',
        path: '/categorias',
        component: CategoriasCadastro,
        meta: {auth: true}
    },
    {
        name: 'cadastrousuarios',
        path: '/usuarios',
        component: UsuariosCadastro,
        meta: {auth: true}
    },
];
