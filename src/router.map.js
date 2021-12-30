/* Lista dos componentes da aplicação
 * usados nas rotas e com os devidos 
 * controle de segurançã usando o JWT
 * autor: Antonio Junior Data: 10/12/2021 13:06
 */
// Importes dos componentes da pasta de components
// import Axios from './components/Axios.vue';

import Pgtest from './components/Pgtest.vue';

import LoginComponent from './components/auth/Login.vue';
import LogoutComponent from './components/auth/Logout.vue';

import DepartamentosCadastro from './components/cadastros/departamentos.vue';
import CategoriasCadastro from './components/cadastros/categorias.vue';
import UsuariosCadastro from './components/cadastros/usuarios.vue';

import Listamissions from './components/listagem/listamissions.vue';
import Listacategories from './components/listagem/listcategories.vue';
import Listausers from './components/listagem/listusers.vue';
import ListaDeptos from './components/listagem/Dashboard.vue';


export default [
    {
        name: 'listmiss',
        path: '/listamissions',
        component: Listamissions,
        meta: {auth: false}
    },
    {
        name: 'listcat',
        path: '/listcategories',
        component: Listacategories,
        meta: {auth: false}
    },
    {
        name: 'listuser',
        path: '/listusers',
        component: Listausers,
        meta: {auth: false}
    },
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
        name: 'listdep',
        path: '/listdeptos',
        component : ListaDeptos,
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
