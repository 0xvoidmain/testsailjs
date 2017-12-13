<template>
  <div ref="input" class="input-daterange input-group" style="width: 100%" id="datepicker">
    <input type="text" class="input-sm form-control" name="start" placeholder="start date" v-model="value.startDate" v-on:change="dateChange">
    <span class="input-group-addon" style="border-left: none; border-right: none; background: #E5E6E7;">to</span>
    <input type="text" class="input-sm form-control" name="end" placeholder="end date" v-model="value.endDate" v-on:change="dateChange">
  </div>
</template>

<script>
export default {
  props: ['value', 'keyStart', 'keyEnd'],
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
          var keyStart = this.keyStart || 'startDate';
          var keyEnd = this.keyEnd || 'endDate';

          if (e.target && e.target.name) {
            if (e.target.name == 'start') {
              if (this.value[keyStart] != newDate) {
                this.value[keyStart] = newDate;
                this.dateChange();
              }
            }
            else {
              if (this.value[keyEnd] != newDate) {
                this.value[keyEnd] = newDate;
                this.dateChange();
              }
            }
          }
        }
      }
		);
  },

  methods: {
    dateChange() {
      var keyStart = this.keyStart || 'startDate';
      var keyEnd = this.keyEnd || 'endDate';
      var newValue = {};
      newValue[keyStart] = this.value[keyStart];
      newValue[keyEnd] = this.value[keyEnd];
      this.value = Object.assign({}, this.value, newValue);
      this.$emit('input', this.value);
    }
  }
}
</script>
