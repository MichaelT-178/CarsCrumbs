import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isSpecialNavBar = ref(JSON.parse(localStorage.getItem('isSpecialNavBar')) || false);

  const setSpecialNavBar = (status) => {
    isSpecialNavBar.value = status;
    localStorage.setItem('isSpecialNavBar', JSON.stringify(status));
  };

  watch(isSpecialNavBar, (newValue) => {
    localStorage.setItem('isSpecialNavBar', JSON.stringify(newValue));
  });

  return {
    isSpecialNavBar,
    setSpecialNavBar
  };
});