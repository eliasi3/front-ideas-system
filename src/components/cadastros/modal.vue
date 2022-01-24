<template>
    <div>
        <link rel="stylesheet" href="vue-modal.css">

        <div class="col">
            <button type="button" class="btn btn-primary"  @click="showModal=true">Open a modal</button>
        </div>

        <Modal :based-on="showModal" style='width:800px;'  title="Comentários" @close="showModal = false">
            <p>Olá {{id}}</p>
        </Modal>

    </div>
</template>
<script>
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
import Vue from 'vue'

Vue.component('Modal', VueModal)

export default {
    name: 'ModalForm',
    props: [
        'id'
    ],
        data(){
            return {  
                showModal: false,
                showSecondModal: false
            }
    },
    components: {
        'Modal': VueModal
    }
}
</script>

