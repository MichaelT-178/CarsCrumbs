<template>
  <div class="create-account-container">
    <img 
      :src="YellowSquareLogo" 
      alt="Yellow Square Crumbs Logo" 
      class="yellow-square-logo"
    />
    <div class="text-container">
      <p class="welcome-text">Create your Crumbs Account</p>
      <p class="create-account-text">
        Enter your details here to create a Cars Crumbs account and join our Rewards Program.
      </p>
      <p class="required-fields-text">*Required Fields</p>
    </div>

    <form @submit.prevent="createAccount">
      <div v-for="(field, key) in fields" :key="key" class="field-container">
        <input 
          :type="field.type"
          :placeholder="field.placeholder"
          v-model="field.value"
          @input="handleInput(field)"
          class="input-field"
          :class="{ invalid: field.error }"
        />
        <p v-if="field.error" class="error-text">{{ field.error }}</p>
      </div>

      <button class="create-account-btn" type="submit">Create Account</button>
    </form>

    <div @click="signIn" class="sign-in-link">Sign In</div>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import YellowSquareLogo from "../assets/logos/yellow-square-logo.png";
import { useAuthStore } from "../stores/auth";
import { useRouter, useRoute } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const successRoute = route.query.successRoute || "/";
const successRouteProp = route.query.successRouteProp
                        ? JSON.parse(route.query.successRouteProp)
                        : null;

const fields = ref([
  { key: "firstName", value: "", type: "text", placeholder: "*First Name", error: "" },
  { key: "lastName", value: "", type: "text", placeholder: "*Last Name", error: "" },
  { key: "email", value: "", type: "email", placeholder: "*Email Address", error: "" },
  { key: "phoneNumber", value: "", type: "text", placeholder: "*Phone Number (XXX) XXX-XXXX", error: "" },
  { key: "username", value: "", type: "text", placeholder: "*Username", error: "" },
  { key: "password", value: "", type: "password", placeholder: "*Password", error: "" },
]);

const validateField = (field) => {
  if (!field.value.trim()) {
    field.error = `${field.placeholder.replace("*", "").trim()} is required.`;
    return false;
  }

  if (field.key === "firstName" || field.key === "lastName") {
    if (!/^[a-zA-Z]+$/.test(field.value)) {
      field.error = `${field.placeholder.replace("*", "").trim()} must contain only letters.`;
      return false;
    }
  }

  if (field.key === "email" && !/\S+@\S+\.\S+/.test(field.value)) {
    field.error = "Please enter a valid email address.";
    return false;
  }

  if (field.key === "phoneNumber" && !/^\(\d{3}\) \d{3}-\d{4}$/.test(field.value)) {
    field.error = "Phone number must follow the format (XXX) XXX-XXXX.";
    return false;
  }

  field.error = "";
  return true;
};


const handleInput = (field) => {
  if (field.key === "phoneNumber") {
    let cleaned = field.value.replace(/\D/g, "");

    if (cleaned.length > 3 && cleaned.length <= 6) {
      field.value = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else if (cleaned.length > 6) {
      field.value = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else {
      field.value = cleaned;
    }
  }
};


const createAccount = () => {
  let isValid = true;

  fields.value.forEach((field) => {
    if (!validateField(field)) isValid = false;
  });

  if (!isValid) return;

  router.push({
    path: successRoute,
    query: successRouteProp,
  });
};

const signIn = () => {
  router.push("/sign-in");
};

onMounted(() => {
  authStore.setSpecialNavBar(true);
});

onUnmounted(() => {
  authStore.setSpecialNavBar(false);
});

</script>


<style scoped>
.create-account-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.text-container {
  width: 500px;
  text-align: left;
}

.yellow-square-logo {
  width: 200px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.welcome-text {
  font-weight: 600;
  font-size: 25px;
  margin-bottom: 15px;
}

.create-account-text {
  font-size: 18px;
  color: darkslategray;
}

.required-fields-text {
  margin-top: 12px;
  color: #525252;
}

.field-container {
  width: 100%;
}

.input-field {
  width: 500px;
  padding: 15px;
  font-size: 1rem;
  margin-bottom: 16px;
  border: 1px solid darkslategray;
  background-color: white;
}

.input-field.invalid {
  border-color: red;
}

.error-text {
  color: red;
  font-size: 16px;
  margin-top: -11px;
  margin-bottom: 20px;
  text-align: left;
}

button.create-account-btn {
  width: 500px;
  padding: 15px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button.create-account-btn:hover {
  background-color: #0056b3;
}

.sign-in-link {
  color: #0041c2;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 50px;
}

.sign-in-link:hover {
  color: #00308f;
}

@media (max-width: 520px) {
  .text-container,
  .input-field {
    width: 340px;
  }

  button.create-account-btn {
    width: 340px;
  }
}

</style>
