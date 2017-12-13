<template>
  <div id="wrapper">
    <Menu />
    <div id="page-wrapper" class="gray-bg dashbard-1">
      <CenterBar header="Dashboard"/>
      <div class="wrapper wrapper-content">
        <div class="row">
          <div class="col-lg-12">
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '../components/Menu.vue';
import CenterBar from '../components/CenterBar.vue';
import axios from 'axios';
import DataTable from '../components/DataTable/index.vue';

export default {
  components: {
    Menu,
    CenterBar,
    DataTable
  }
}
</script>
