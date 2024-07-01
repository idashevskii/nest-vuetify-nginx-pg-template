<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import { mdiAccountPlus, mdiAlertCircle, mdiCardAccountDetails, mdiCardBulleted, mdiFormSelect, mdiFormatParagraphSpacing, mdiLogin, mdiTable, mdiViewDashboard } from '@mdi/js';

</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavGroup
    :item="{
      title: 'Dashboards',
      badgeContent: '5',
      badgeClass: 'bg-error',
      icon: mdiViewDashboard,
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Analytics',
        to: '/dashboard',
      }"
    />
   
  </VerticalNavGroup>

  <!-- 👉 Apps & Pages -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Apps & Pages',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Account',
      icon: mdiCardAccountDetails,
      to: '/account-settings',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Login',
      icon: mdiLogin,
      to: '/login',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Register',
      icon: mdiAccountPlus,
      to: '/register',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Error',
      icon: mdiAlertCircle,
      to: '/no-existence',
    }"
  />

  <!-- 👉 User Interface -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'User Interface',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Typography',
      icon: mdiFormatParagraphSpacing,
      to: '/typography',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Cards',
      icon: mdiCardBulleted,
      to: '/cards',
    }"
  />

  <!-- 👉 Forms & Tables -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Forms & Tables',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Form Layouts',
      icon: mdiFormSelect,
      to: '/form-layouts',
    }"
  />
  
  <VerticalNavLink
    :item="{
      title: 'Tables',
      icon: mdiTable,
      to: '/tables',
    }"
  />

</template>
