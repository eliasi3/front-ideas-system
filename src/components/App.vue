<template>
  <div> 
    <div class="min-h-full">
        <nav  v-if="isAuth" class='bg-blue-700'>
            <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                    <!-- Logo tipo da empresa -->
                    <div class="flex-shrink-0">
                        <img class="hidden lg:block h-6 w-auto" src="../assets/logoi3.png" alt="Workflow">
                    </div>
                    <div class="hidden md:block">
                        <div class="flex items-baseline ml-10 space-x-4">

                      <!-- dropdaw de menu cadastro -->
                       <div id="cadastro" class="relative ml-3"> 
                         <div> 
                            <button type="button" @click="cadastro()" id="cadastro-menu-button" aria-expanded="false" aria-haspopup="true">
                                <span class="sr-only">Open user menu</span>
                                <router-link id='hoverbottom' class="px-3 py-2 text-sm font-medium text-white rounded-md" :to="{name: ''}">CADASTROS</router-link>
                            </button>
                         </div>

                         <div v-if="menuCadastro" id="menucadastro" class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="cadastro-menu-button" tabindex="-1">
                         <!-- Active: "bg-gray-100", Not Active: "" -->
                            
                                
                                <span class='block px-4 py-2 text-sm text-gray-700'><router-link class="btn btn-primary" :to="{name: 'cadastromissoes'}">Missões</router-link></span>

                                <span class='block px-4 py-2 text-sm text-gray-700'><router-link class="btn btn-primary" :to="{name: 'cadastrousuarios'}">Usuários</router-link></span>
                                
                                <span class='block px-4 py-2 text-sm text-gray-700'><router-link class="btn btn-primary" :to="{name: 'cadastrodepartamentos'}">Departamentos</router-link></span>

                                <span class='block px-4 py-2 text-sm text-gray-700'><router-link class="btn btn-primary" :to="{name: 'cadastrocategorias'}">Categorias</router-link></span>

                                <span class='block px-4 py-2 text-sm text-gray-700'><router-link class="btn btn-primary" :to="{name: 'uploadimagem'}">Upload de Imagem</router-link></span>

                                
                            
                        </div>
                    </div>
                    
                    <!-- dropdaw de menu movimentos -->

                    <div class="relative ml-3">
                        <div> 
                            <button type="button" @click="movimento()" id="cadastro-menu-button" aria-expanded="false" aria-haspopup="true">
                                <span class="sr-only">Open user menu</span>
                                <router-link id='hoverbottom' class="px-3 py-2 text-sm font-medium text-white rounded-md" :to="{name: ''}">MOVIMENTOS</router-link>
                            </button>
                        </div>

                         <div v-if="menuMovimento" class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="cadastro-menu-button" tabindex="-1">
                         <!-- Active: "bg-gray-100", Not Active: "" -->
                                <span class='block px-4 py-2 text-sm text-gray-700'><router-link class="btn btn-primary" :to="{name: 'listmiss'}">Missões</router-link></span>

                                <span class='block px-4 py-2 text-sm text-gray-700'><router-link class="btn btn-primary" :to="{name:'listideas'}">Ideias</router-link></span>

                                <span class='block px-4 py-2 text-sm text-gray-700'><router-link class="btn btn-primary" :to="{name: ''}">Comentario</router-link></span>
                            
                        </div>
                     </div>


                     <div class="relative ml-3">
                        <div> 
                            <button type="button" @click="menuLista()" id="cadastro-menu-button" aria-expanded="false" aria-haspopup="true">
                                <span class="sr-only">Open user menu</span>
                                <router-link id='hoverbottom' class="px-3 py-2 text-sm font-medium text-white rounded-md" :to="{name: ''}">LISTAGEM</router-link>
                            </button>
                        </div>

                         <div v-if="menuList" class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="cadastro-menu-button" tabindex="-1">
                         <!-- Active: "bg-gray-100", Not Active: "" -->

                                <span class='block px-4 py-2 text-sm text-gray-700'><router-link class="btn btn-primary" :to="{name: 'listdep'}">Departamentos</router-link></span>

                                <span class='block px-4 py-2 text-sm text-gray-700'><router-link class="btn btn-primary" :to="{name: 'listuser'}">Usuários</router-link></span>

                                <span class='block px-4 py-2 text-sm text-gray-700'><router-link class="btn btn-primary" :to="{name: 'listcat'}">Categorias</router-link></span>
                            
                        </div>
                     </div>
                   </div>
                </div>
               </div>
                <div class="hidden md:block">
                 <div class="flex items-center ml-4 md:ml-6">
                        

                        <!-- Profile dropdown --> 
                        
                        <span id='nameuser' style='color:white;'>Seja bem-vindo, {{ userId.user_name.toUpperCase() }}</span>
                        <div class="relative ml-3">
                          
                        <div> 
                            <button type="button" @click="abrir()" class="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                <span class="sr-only">Open user menu</span>
                                <img class="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                            </button>
                        </div>

                         <div v-if="menuPerfil" class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                         <!-- Active: "bg-gray-100", Not Active: "" -->
                            
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>

                                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>

                                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2"><router-link class="btn btn-primary" :to="{name: 'auth.logout'}">Log out</router-link></a>
                            
                        </div>
                    </div>
                    </div>
                    </div>
                    <div class="flex -mr-2 md:hidden">
                    <!-- Mobile menu button -->
                    <button type="button" class="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <!--
                        Heroicon name: outline/menu

                        Menu open: "hidden", Menu closed: "block"
                        -->
                        <svg class="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <!--
                        Heroicon name: outline/x

                        Menu open: "block", Menu closed: "hidden"
                        -->
                        <svg class="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    </div>
                </div>
                </div>

                <!-- Mobile menu, show/hide based on menu state. -->
                <div class="md:hidden" id="mobile-menu">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                    <a href="#" class="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md" aria-current="page">Dashboard</a>

                    <a href="#" class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Team</a>

                    <a href="#" class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Projects</a>

                    <a href="#" class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Calendar</a>

                    <a href="#" class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Reports</a>
                </div>
                </div>
            </nav>

            <!-- <header class="bg-white shadow">
                <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold text-gray-900">
                        
                    </h1>
                </div>
            </header> -->

            <main>
                <div class="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <!-- Replace with your content -->
                <div class="px-4 py-6 sm:px-0">
                    <div>
                        <router-view> </router-view>
                    </div>
                </div>
                <!-- /End replace -->
                </div>
            </main>
    </div>  
  
  </div>
  
</template>

<script>
    
import store from '../store';
    
export default {
    name: 'app',
    data () {
        return {
            menuPerfil: false,
            menuCadastro: false,
            menuMovimento: false,
            menuList: false,
            }
    },
    methods: {
        
        abrir() {
            this.menuPerfil = this.menuPerfil == false ? true : false;
        },
        cadastro() {
            this.menuCadastro = this.menuCadastro == false ? true : false;
        },
        movimento() {
            this.menuMovimento = this.menuMovimento == false ? true : false;
        },
        menuLista() {
            this.menuList = this.menuList == false ? true : false;
        },
    },
    computed:{
        isAuth() {
            return store.state.auth.check;
        },
        userId() {
            return store.state.auth.user ? store.state.auth.user : {'user_name': ''}; 
        }
    }
}

</script>

<style>
body{
    background: #eaebed;
 }

#hoverbottom:hover {
    background-color: rgba(0, 62, 156, 0.212);
}
#nameuser:hover {
    cursor: pointer;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>