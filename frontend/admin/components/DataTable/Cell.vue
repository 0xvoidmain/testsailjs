<template>
  <div :class="f(column.class, item)">
    <i v-if="column.icon" style="width: 22px; opacity: 0.7" class="fa" :class="column.icon"></i>
    <a v-if="column.type == 'link'" :href="f(column.href, item)" target="__blank">
      {{t(column.text, item, item[column.key])}}
    </a>
    <span v-else>
      {{t(column.text, item, item[column.key])}}
    </span>
  </div>
</template>

<script>
export default {
  props: ['item', 'column'],
  methods: {
    f(func, item) {
      if (typeof func == 'function') {
        return func(item);
      }
      else {
        return func;
      }
    },
    t(func, item, text) {
      if (typeof func == 'function') {
        return func(item);
      }
      else {
        return text;
      }
    }
  }
}
</script>
