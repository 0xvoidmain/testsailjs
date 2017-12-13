<template>
  <tr>
    <td v-for="col in columns" :key="item.id + col.key">
      <Cell v-if="!col.children" :item="item" :column="col" />
      <Cell v-else v-for="e in col.children"
        :key="item.id + col.key + e.key"
        :item="item"
        :column="e" />
    </td>
    <td>
      <slot />
    </td>
  </tr>
</template>

<script>
import Cell from './Cell.vue';

export default {
  props: ['item', 'columns', 'class', 'style'],
  components: {
    Cell
  },
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
