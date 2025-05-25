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

      <p class="birthday-text">*Enter your birthday to receive special offers on your special day!</p>
      
      <Datepicker 
        v-model="birthday" 
        id="pickup-date" 
        :enable-time="false" 
        :month-change-on-scroll="false"
        :enable-time-picker="false"
        format="MM-dd-yyyy"
        :class="['birthday-date-picker', { invalid: birthdayError }]"
        auto-apply
      />
      <p v-if="birthdayError" class="error-text">{{ birthdayError }}</p>

      <button class="create-account-btn" type="submit">Create Account</button>
    </form>

    <div @click="signIn" class="sign-in-link">Sign In</div>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
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

const birthday = ref('');
const birthdayError = ref('');

const validateField = (field) => {
  if (!field.value.trim()) {
    field.error = `${field.placeholder.replace("*", "").trim().replace(" (XXX) XXX-XXXX", "")} is required.`;
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

const validateBirthday = () => {
  if (!birthday.value) {
    birthdayError.value = 'Birthday is required.';
    return false;
  }
  birthdayError.value = '';
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

const createAccount = async () => {
  let isValid = true;

  const firstNameField = fields.value[0];
  const lastNameField = fields.value[1];
  const emailField = fields.value[2];
  const phoneNumberField = fields.value[3];
  const usernameField = fields.value[4];
  const passwordField = fields.value[5];

  if (!validateField(firstNameField)) isValid = false;
  if (!validateField(lastNameField)) isValid = false;
  if (!validateField(emailField)) isValid = false;
  if (!validateField(phoneNumberField)) isValid = false;
  if (!validateField(usernameField)) isValid = false;
  if (!validateField(passwordField)) isValid = false;
  if (!validateBirthday()) isValid = false;

  if (!isValid) return;

  // Print field values and birthday
  console.log("Account Details:");
  console.log(`First Name: ${firstNameField.value}`);
  console.log(`Last Name: ${lastNameField.value}`);
  console.log(`Email: ${emailField.value}`);
  console.log(`Phone Number: ${phoneNumberField.value}`);
  console.log(`Username: ${usernameField.value}`);
  console.log(`Password: ${passwordField.value}`);
  console.log(`Birthday: ${formatBirthday(birthday.value)}`);

  const newUser = {
    firstName: firstNameField.value.trim(),
    lastName: lastNameField.value.trim(),
    email: emailField.value.trim(),
    phoneNumber: phoneNumberField.value.trim(),
    username: usernameField.value.trim(),
    password: passwordField.value.trim(),
    birthday: formatBirthday(birthday.value)
  }

  try {
    console.log("User creation successful:", response.data);
    alert("Account Successfully created!");
    authStore.login(response.data);
  } catch (error) {
    if (error.response) {
      alert("ERROR OCCURRED!");
    } else {
      alert("An unexpected error occurred");
    }
  }

  router.push({
    path: successRoute,
    query: successRouteProp,
  });
};

const formatBirthday = (date) => {
  if (!date) {
    return ""
  }

  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();

  return `${year}-${month}-${day}`;
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

.birthday-date-picker {
  border: 1px solid darkslategray;
  /* margin-bottom: 16px; */
  width: 500px;
  margin: 0 auto;
  /* height: 300px; */
}

.birthday-date-picker.invalid {
  border-color: red !important;
}

.birthday-text {
  text-align: left;
  color: #525252;
  font-size: 18px;
  margin: 0 auto;
  width: 500px;
  padding-bottom: 5px;
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
  margin-top: 15px;
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
  button.create-account-btn {
    max-width: 90%;
  }

  .input-field {
    max-width: 340px;
  }

  .birthday-text {
    padding-bottom: 10px;
  }

  .birthday-text,
  .birthday-date-picker {
    width: 340px;
    margin: 0 auto;
  }

  button.create-account-btn {
    width: 340px;
    margin-top: 20px;
  }
  
  button.create-account-btn:hover {
    background-color: #0056b3;
  }

}

</style>
