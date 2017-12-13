<template>
  <Modal
    ref="modal"
    :title="isEditing ? 'Edit' : 'Add'"
    isForm="true"
    @submit="submit"
    >
    <div class="form-horizontal">
      <div v-for="e in form.fields"
        :key="e.key"
        v-if="isEditing ? true : e.addable"
        class="form-group" >
        <label class="col-sm-3 control-label">
          {{e.label}}
          <span v-if="e.required" class="text-danger">*</span>
        </label>
        <div class="col-sm-9">
          <input
            v-if="e.type == 'text'"
            type="text"
            class="form-control"
            :disabled="e.editable ? false : !!isEditing"
            :required="e.required"
            v-model="data[e.key]">
          <input
            v-if="e.type == 'number'"
            type="number"
            class="form-control"
            :disabled="e.editable ? false : !!isEditing"
            :required="e.required"
            v-model="data[e.key]">
          <input
            v-if="e.type == 'email'"
            type="email"
            class="form-control"
            :disabled="e.editable ? false : !!isEditing"
            :required="e.required"
            v-model="data[e.key]">
          <input
            v-if="e.type == 'tel'"
            type="tel"
            class="form-control"
            :disabled="e.editable ? false : !!isEditing"
            :required="e.required"
            v-model="data[e.key]">
          <input
            v-if="e.type == 'password'"
            type="password"
            class="form-control"
            :disabled="e.editable ? false : !!isEditing"
            :required="e.required"
            v-model="data[e.key]">
          <textarea
            v-if="e.type == 'textarea'"
            :rows="(data[e.key] || '').split('\n').length"
            class="form-control"
            :disabled="e.editable ? false : !!isEditing"
            :required="e.required"
            v-model="data[e.key]" />
          <select
            v-if="e.type == 'options'"
            class="form-control"
            :name="e.key"
            :disabled="e.editable ? false : !!isEditing"
            :required="e.required"
            v-model="data[e.key]">
            <option v-for="o in e.options" :key="o.value" :value="o.value">{{o.label}}</option>
          </select>
          <div
            v-if="e.type == 'html'" class="ibox float-e-margins">
            <div class="ibox-content" style="border-style: solid; border-width: 1px; background: #eeeeee;">
              <div v-html="data[e.key]" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      slot="primaryButton"
      type="submit" class="btn btn-primary" @click="save">Save</button>
  </Modal>
</template>

<script>
import Modal from '../Modal.vue';
export default {
  props: ['data', 'form', 'isEditing'],
  components: {
    Modal
  },
  methods: {
    submit() {
      this.$emit('submit', this.data);
    },
    reset() {
      this.$refs.modal.resetForm();
    },
    open() {
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    }
  }
}
</script>

