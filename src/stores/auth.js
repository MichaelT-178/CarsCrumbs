import { defineStore } from 'pinia';
import { ref, reactive, watch } from 'vue';

export const useAuthStore = defineStore('auth', () => {

  const user = reactive({
    username: localStorage.getItem('username') || null,
    email: localStorage.getItem('email') || null,
    userId: localStorage.getItem('userId') || null,
    firstName: localStorage.getItem('firstName') || null,
    lastName: localStorage.getItem('lastName') || null,
    phoneNumber: localStorage.getItem('phoneNumber') || null,
    birthday: localStorage.getItem('birthday') || null,
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false, 
  });

  const isSpecialNavBar = ref(
    JSON.parse(localStorage.getItem('isSpecialNavBar')) || false
  );

  function login(userData) {
    logout();

    user.username = userData.user.username;
    user.email = userData.user.email;
    user.userId = userData.user.id;
    user.firstName = userData.user.first_name;
    user.lastName = userData.user.last_name;
    user.phoneNumber = userData.user.phone_number;
    user.birthday = userData.user.birthday;
    user.isLoggedIn = true;

    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
    localStorage.setItem('userId', user.userId);
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
    localStorage.setItem('phoneNumber', user.phoneNumber);
    localStorage.setItem('birthday', user.birthday);
    localStorage.setItem('isLoggedIn', true);
  }


  function logout() {
    Object.keys(user).forEach((key) => {
      if (key === 'isLoggedIn') {
        user[key] = false;
      } else {
        user[key] = null;
      }
    });

    // Clear localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('birthday');
    localStorage.removeItem('isLoggedIn');
  }

  watch(
    () => user.isLoggedIn,
    (newValue) => {
      localStorage.setItem('isLoggedIn', JSON.stringify(newValue));
    }
  );

  watch(
    () => isSpecialNavBar.value,
    (newValue) => {
      localStorage.setItem('isSpecialNavBar', JSON.stringify(newValue));
    }
  );

  const getUsername = () => user.username;
  const getEmail = () => user.email;
  const getUserId = () => user.userId;
  const getFirstName = () => user.firstName;
  const getLastName = () => user.lastName;
  const getPhoneNumber = () => user.phoneNumber;
  const getBirthday = () => user.birthday;
  const getIsLoggedIn = () => user.isLoggedIn;

  const setSpecialNavBar = (status) => {
    isSpecialNavBar.value = status;
  };

  return {
    user,
    isSpecialNavBar,
    login,
    logout,
    getUsername,
    getEmail,
    getUserId,
    getFirstName,
    getLastName,
    getPhoneNumber,
    getBirthday,
    getIsLoggedIn,
    setSpecialNavBar,
  };
});
