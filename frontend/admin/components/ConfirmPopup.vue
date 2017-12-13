<template>
  <Modal ref="modal" :title="title">
    <span>{{message}}</span>
    <button
      slot="primaryButton"
      class="btn"
      :class="primary.class || 'btn-success'"
      @click="primaryButtonClick">
      {{primary.label || 'OK'}}
    </button>
  </Modal>
</template>

<script>
import Modal from './Modal.vue';
export default {
  props: ['title', 'message', 'primary'],
  components: {
    Modal
  },
  methods: {
    primaryButtonClick() {
      this.$refs.modal.close();
      this.$emit('ok');
    },
    open() {
      this.$refs.modal.open();
    }
  }
}
</script>
