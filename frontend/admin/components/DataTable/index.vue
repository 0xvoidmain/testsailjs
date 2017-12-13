<template>
  <div class="ibox data-table">
    <div class="ibox-title" style="padding: 7px 15px 7px 15px;">
      <h5 style="padding-top: 8px">{{setting.model.toUpperCase()}} (Total: {{total}})</h5>
      <div class="ibox-tools form-inline">
        <button
          v-if="f(setting.addable)"
          class="btn btn-primary btn-sm"
          @click="showAddModal">
          <i class="fa fa-plus"></i>&nbsp;Add new
        </button>
      </div>
    </div>
    <div class="ibox-content">
      <div v-if="!items || !items.length">
        <h2 class="text-center" style="color: #ababab">Empty data</h2>
      </div>
      <div v-else class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th v-for="e in setting.table.columns" :key="e.key" :style="{width: e.width}">
                {{e.label}}
              </th>
              <th style="width: 90px">
              </th>
            </tr>
          </thead>
          <tbody>
            <Row v-for="e in items" :key="e.id" :item="e" :columns="setting.table.columns">
              <div class="pull-right">
                <button v-if="f(setting.table.editable, e)" class="btn btn-outline btn-success btn-circle" v-on:click="showEditModal(e)">
                  <i class="fa fa-pencil"></i>
                </button>
                <button v-if="f(setting.table.deleteable, e)" class="btn btn-outline btn-danger btn-circle" v-on:click="confirmDelete(e)">
                  <i class="fa fa-close"></i>
                </button>
              </div>
            </Row>
          </tbody>
        </table>
        <div class="pull-right">
          <paginate
            :page-count="Math.round(total / query.limit + 0.5) || 1"
            :click-handler="nextPage"
            :prev-text="'«'"
            :next-text="'»'"
            :container-class="'pagination'">
          </paginate>
        </div>
      </div>
    </div>
    <ConfirmPopup
      ref="deleteConfirmPopup"
      title="Delete"
      message="Are you sure you want to delete this record?"
      @ok="deleteRow"
      :primary="{label: 'Delete', class: 'btn-danger'}" />

    <FormModal
      ref="formModal"
      @submit="submit"
      :isEditing="isEditing"
      :form="setting.form"
      :data="formData"/>
  </div>
</template>

<script>
import axios from 'axios';
import deep from 'deep-obj';
import _ from 'lodash';
import DateRangePicker from '../DateRangePicker.vue';
import Paginate from 'vuejs-paginate';
import ConfirmPopup from '../ConfirmPopup.vue';
import FormModal from './FormModal.vue';
import Row from './Row.vue';
import CONST from '../../../../const';

export default {
  components: {
    DateRangePicker,
    Paginate,
    ConfirmPopup,
    Row,
    FormModal
  },
  data() {
    return {
      setting: setting,
      isEditing: false,
      rowSelected: null,
      items: [],
      total: 0,
      formData: {},
      query: {
        where: {
          game: 'thanhtho'
        },
        limit: 50,
        skip: 0,
        sort: 'createdAt DESC',
        populate: 'gifts'
      }
    }
  },
  created() {
    this.$Progress.start();
    axios.get(`/api/${this.setting.model}`)
    .then(({data}) => {
      this.items = data;
      this.$Progress.finish();
    });
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
    },
    copyData(from, to) {
      for (var key in from) {
        to[key] = from[key];
      }
    },
    toast(type, msg, title) {
      toastr[type](msg, title);
    },
    confirmDelete(e) {
      this.rowSelected = e;
      this.$refs.deleteConfirmPopup.open();
    },
    deleteRow() {
      var id = this.rowSelected.id;
      this.$Progress.start();
      axios.delete(`/api/${this.setting.model}/${id}`)
        .then(() => {
          this.items = this.items.filter(e => e.id != id);
          this.toast('success', 'Deleted');
          this.$Progress.finish();
        })
        .catch(err => {
          var msg = getErrorMessage(err);
          this.toast('error', msg, 'Error');
          this.$Progress.finish();
        });
    },
    defaultValue() {
      var form = this.setting.form;
      var result = {};
      form.fields.forEach(e => {
        result[e.key] = e.default;
      });
      return result;
    },
    showEditModal(e) {
      this.isEditing = true;
      this.rowSelected = e;
      this.formData = _.clone(e);
      this.$refs.formModal.open();
    },
    showAddModal(e) {
      this.isEditing = false;
      this.formData = this.defaultValue();
      this.$refs.formModal.open();
    },
    submit(data) {
      if (this.isEditing) {
        this.copyData(data, this.rowSelected);
        this.isEditing = false;
        this.rowSelected = null;
      }
      else {
        data.id = new Date().getTime() + '';
        this.items.push(data);
      }
      this.toast('success', 'Saved');
      this.$refs.formModal.close();
      this.$refs.formModal.reset();
    }
  }
}

const setting = {
  model: 'manager',
  addable: true,
  table: {
    deleteable: true,
    editable: true,
    columns: [
      {
        key: 'name',
        label: 'Name'
      },
      {
        key: 'email',
        label: 'Email',
        width: '250px'
      },
      {
        key: 'phoneNumber',
        label: 'Phone Number',
        width: '250px'
      },
      {
        key: 'role',
        label: 'Role',
        width: '100px'
      }
    ]
  },
  form: {
    fields: [
      {
        key: 'name',
        label: 'Name',
        type: 'text',
        default: '',
        addable: true,
        editable: true,
        required: true
      },
      {
        key: 'email',
        label: 'Email',
        type: 'email',
        default: '',
        addable: true,
        editable: true,
        required: true
      },
      {
        key: 'phoneNumber',
        label: 'Phone',
        type: 'tel',
        default: '',
        addable: true,
        editable: true
      },
      {
        key: 'role',
        label: 'Role',
        type: 'options',
        default: CONST.ROLE_ADMIN,
        options: [
          {
            value: CONST.ROLE_ADMIN,
            label: 'Admin'
          },
          {
            value: CONST.ROLE_SUPER_ADMIN,
            label: "Super Admin"
          }
        ],
        addable: true,
        editable: true,
        required: true
      },
      {
        key: 'password',
        label: 'Password',
        type: 'text',
        default: '',
        addable: true,
        editable: false,
        required: true
      }
    ]
  }
}
</script>
