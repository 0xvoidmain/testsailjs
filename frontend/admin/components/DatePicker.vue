<template>
  <input ref="input" type="text" class="input-sm form-control"
      v-bind:disabled="disabled"
      v-bind:required="required"
      v-model="value"
      v-on:change="dateChange">
</template>

<script>
export default {
  props: ['value', 'disabled', 'required'],
  mounted() {
    $(this.$refs.input).datepicker({
      keyboardNavigation: false,
      keepEmptyValues: true,
      todayHighlight: true,
      assumeNearbyYear: false,
      forceParse: false,
      autoclose: true,
      zIndexOffset: 1000000,
      weekStart: 1
    }).on(
      "changeDate", (e) => {
        if (e.date) {
          const newDate = e.date.toLocaleDateString();
          if (this.value != newDate) {
            this.value = newDate;
            this.dateChange();
          }
        }
      }
		);
  },

  methods: {
    dateChange() {
      this.$emit('input', this.value);
    }
  }
}
</script>
