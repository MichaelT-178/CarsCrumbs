<template>
  <div class="sign-in-container">
    <img 
      :src="CircleLogo" 
      alt="Circle Crumbs Logo" 
      class="circle-crumbs-logo"
    />
    <div class="text-container">
      <p class="welcome-text">Welcome to Cars Crumbs</p>
      <p class="sign-in-text">Sign in to your account</p>
    </div>
    <div>
      <input 
        type="email" 
        placeholder="Email" 
        class="input-field" 
        :class="{ invalid: emailError }"
        v-model="email"
      />
      <p v-if="emailError" class="error-text">{{ emailError }}</p>
    </div>
    <div>
      <input 
        type="password" 
        placeholder="Password" 
        class="input-field" 
        :class="{ invalid: passwordError }"
        v-model="password"
      />
      <p v-if="passwordError" class="error-text">{{ passwordError }}</p>
    </div>
    <button 
      class="sign-in-btn"
      @click="signIn"
    >Sign In</button>

    <div class="divider-container">
      <div class="line"></div>
      <p class="dont-have-account-text">Don't have an account?</p>
      <div class="line"></div>
    </div>

    <button 
      class="create-account-btn"
      @click="createAccount"
    >Create Account</button>
    <div @click="backToHome" class="home-link">Back to Home</div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import CircleLogo from "../assets/logos/CircleLogo.png";
import { onMounted, onUnmounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter, useRoute } from 'vue-router';
import axiosInstance from "../lib/axios";

const authStore = useAuthStore();
const router = useRouter();


const route = useRoute();

const successRoute = route.query.successRoute || "/";
const successRouteProp = route.query.successRouteProp
                       ? JSON.parse(route.query.successRouteProp)
                       : null;

const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");

const signIn = async () => {

  emailError.value = "";
  passwordError.value = "";

  if (!email.value) {
    emailError.value = "Email is required";
  }
  if (!password.value) {
    passwordError.value = "Password is required";
  }

  if (email.value && password.value) {
    console.log("SIGN IN");
    console.log("Email:", email.value);
    console.log("Password:", password.value);

    const loginData = {
      email_or_username: email.value,
      password: password.value
    }

    try {
      const response = await axiosInstance.post("/login_user/", loginData);
      console.log("Login successful:", response.data.user.id);
      
      authStore.login(response.data);

      router.push({
        path: successRoute,
        query: successRouteProp,
      });
    } catch (error) {
      handleLoginError(error);
    }

  }
};

const handleLoginError = (error) => {
  alert("ERROR OCCURRED!!!!!");
  console.log(error);
}

const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    signIn();
  }
};

const createAccount = () => {
  console.log("CREATE ACCOUNT");
  router.push("/create-account");
};

const backToHome = () => {
  router.push('/');
}

onMounted(() => {
  authStore.setSpecialNavBar(true);
  window.addEventListener("keydown", handleKeyPress);
});

onUnmounted(() => {
  authStore.setSpecialNavBar(false);
  window.removeEventListener("keydown", handleKeyPress);
});

</script>


<style scoped>
.sign-in-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  gap: 1rem;
}

.text-container {
  width: 500px;
  text-align: left;
}

.circle-crumbs-logo {
  width: 100px;
}

.welcome-text {
  font-weight: 600;
  font-family: Fellix, Arial, sans-serif;
  font-size: 25px;
  margin-bottom: 15px;
}

.sign-in-text {
  font-size: 18px;
  color: darkslategray;
}


.input-field {
  width: 500px;
  padding: 15px;
  font-size: 1rem;
  border: 1px solid darkslategray;
  border-radius: 8px;
}

.dont-have-account-text {
  color: darkslategray;
  font-size: 17px;
  padding-left: 7px;
  padding-right: 7px;
}

.divider-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 5px 0;
  width: 500px;
}

.line {
  height: 1px;
  background-color: darkslategray;
  flex-grow: 1;
}

button {
  width: 500px;
  padding: 15px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button.sign-in-btn {
  background-color: #007bff;
  color: white;
}

button.sign-in-btn:hover {
  background-color: #0056b3;
}

button.create-account-btn {
  background-color: white;
  color: #007bff;
  border: 1px solid #007bff;
}

button.create-account-btn:hover {
  background-color: #e5f1fc;
  color: #0056b3;
  border: 1px solid #0056b3;
}
.error-text {
  color: red;
  font-size: 16px;
  margin-top: 5px;
  text-align: left;
  width: 100%;
}

.input-field.invalid {
  border-color: red;
}

.home-link {
  color: #0041c2;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 50px;
}

.home-link:hover {
  color: #00308f;
}

@media (max-width: 520px) {
  .text-container,
  .input-field,
  .divider-container {
    width: 340px;
  }

  button {
    width: 340px;
  }

}

</style>
