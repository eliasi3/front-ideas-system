/* Lista dos componentes da aplicação
 * usados nas rotas e com os devidos 
 * controle de segurançã usando o JWT
 * autor: Antonio Junior Data: 10/12/2021 13:06
 */
// Importes dos componentes da pasta de components
// import Axios from './components/Axios.vue';

// import Pgtest from './components/Pgtest.vue';

import LoginComponent from './components/auth/Login.vue';
import LogoutComponent from './components/auth/Logout.vue';

import DepartamentosCadastro from './components/cadastros/departamentos.vue';
import CategoriasCadastro from './components/cadastros/categorias.vue';
import UsuariosCadastro from './components/cadastros/usuarios.vue';
import MissoesCadastro from './components/cadastros/missoes.vue';
import CadastroIdea from './components/cadastros/ideas.vue';
import CadastroComment from './components/cadastros/comentario.vue'


import Listamissions from './components/listagem/listamissions.vue';
import Listacategories from './components/listagem/listcategories.vue';
import Listausers from './components/listagem/listusers.vue';
import ListaDeptos from './components/listagem/Dashboard.vue';
import Listaideas from './components/listagem/listideas.vue';
import Listcomments from './components/listagem/listcomments.vue';
import Detalhesmiss from './components/listagem/detailsmission.vue';

import UsuariosEditar from './components/edit/Editaruser.vue';
import Editardep from './components/edit/Editardep.vue';
import Editarcat from './components/edit/Editarcat.vue';
import Editarideia from './components/edit/Editarideia.vue';



export default [
    
    
    {
        name: 'listmiss',
        path: '/listamissions',
        component: Listamissions,
        meta: {auth: true}
    },
    {
        name: 'listcat',
        path: '/listcategories',
        component: Listacategories,
        meta: {auth: true}
    },
    {
        name: 'listuser',
        path: '/listusers',
        component: Listausers,
        meta: {auth: true}
    },
    {
        name: 'auth.login',
        path: '/',
        component: LoginComponent,
        meta: {auth: false}
    },
    {
        name: 'listdep',
        path: '/listdeptos',
        component : ListaDeptos,
        meta: {auth: true}
    },
    {
        name: 'listideas',
        path: '/listideas',
        component : Listaideas,
        meta: {auth: true}
    },
    {
        name: 'listcomments',
        path: '/listcomments',
        component : Listcomments,
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
    {
        name: 'cadastromissoes',
        path: '/missoes',
        component: MissoesCadastro,
        meta: {auth: true}
    },

    {
        name: 'cadastroidea',
        path: '/ideas',
        component: CadastroIdea,
        meta: {auth: true}
    },
    {
        name: 'cadastrocomment',
        path: '/comment',
        component: CadastroComment,
        meta: {auth: true}
    },
    {
        name: 'editusuarios',
        path: '/editusuarios',
        component: UsuariosEditar,
        meta: {auth: true}
    },
    {
        name: 'editdep',
        path: '/editdep',
        component: Editardep,
        meta: {auth: true}
    },
    {
        name: 'editcat',
        path: '/editcat',
        component: Editarcat,
        meta: {auth: true}
    },
    {
        name: 'editarideia',
        path: '/editarideia',
        component: Editarideia,
        meta: {auth: true}
    },
    {
        name: 'detalhesmiss',
        path: '/detalhesmissao',
        component: Detalhesmiss,
        meta: {auth: true}
    },    
];
