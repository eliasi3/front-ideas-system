<template>
    <div class="container">
        <div class="text-center row">
            Efetuando logout...
        </div>
    </div>
</template>

<script type="text/javascript">

    import store from '../../store';
    
    export default {
        mounted(){
            setTimeout(() => {
                this.logout();
            },1000)
        },
        methods: {
            logout(){
                alert('Volte sempre!');
                store.commit('unauthenticated');
                this.$router.push({name: 'auth.login'});
            }
            
        }
    }
</script>