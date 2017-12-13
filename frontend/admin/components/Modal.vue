<template>
  <div class="admin-modal">
    <div class="modal inmodal fade"
      :class="classModal"
      :style="{display: visible ? 'block' : 'none'}">
      <div class="modal-dialog">
        <component :is="isForm ? 'form' : 'div'" ref="form" class="modal-content"  @submit.prevent="submit">
          <div class="modal-header">
            <button type="button" class="close" @click="close">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title">{{title}}</h4>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default btn-outline" @click="close">Cancel</button>
            <slot name="primaryButton"></slot>
          </div>
        </component>
      </div>
    </div>
    <div class="modal-backdrop fade" :class="classModal" :style="{display: visible ? 'block' : 'none'}"></div>
  </div>
</template>

<script>
export default {
  props: ['title', 'isForm'],
  data() {
    return {
      visible: false,
      classModal: ''
    }
  },
  methods: {
    close() {
      this.classModal = 'out';
      setTimeout(() => {
        this.visible = false;
      }, 200);
      this.$emit('close');
    },
    open() {
      this.visible = true;
      setTimeout(() => {
        this.classModal = 'in';
      }, 100);
      this.$emit('open');
    },
    submit() {
      this.$emit('submit');
    },
    resetForm() {
      this.$refs.form && this.$refs.form.reset && this.$refs.form.reset();
    }
  }
}
</script>

<style lang="stylus">
  .admin-modal
    .modal-footer
      .btn
        min-width 100px
</style>
