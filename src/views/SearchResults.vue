<template>
    <div>
      <h1>Search Results for "{{ searchQuery || 'No Results Found' }}"</h1>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const searchQuery = ref(route.params.SearchQuery);
  
  watch(() => route.params.SearchQuery, (newQuery) => {
    searchQuery.value = newQuery;
  });
  
  </script>
  