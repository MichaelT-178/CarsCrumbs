<template>
  <p class="title">Account Settings</p>
  <div class="account-info">
    <div class="view-mode" v-if="!isEditing">
			<p>
        <strong>Full Name:</strong>
        <br />
        {{ account.firstName }} {{ account.lastName}}
      </p>
      <p>
        <strong>Username:</strong>
        <br />
        {{ account.username }}
      </p>
      <p>
        <strong>Email:</strong>
        <br />
        {{ account.email }}
      </p>
      <p>
        <strong>Phone Number:</strong>
        <br />
        {{ account.phone_number }}
      </p>
      <p>
        <strong>Number of Points:</strong>
        <br />
        {{ account.numOfPoints }}
      </p>
      <p>
        <strong>Birthday:</strong>
        <br />
        {{ account.birthday }}
      </p>
      <div class="button-group">
        <button class="primary-button" @click="editMode">Edit Account Info</button>
        <button class="secondary-button delete-button" @click="deleteAccount">
          Delete Account
        </button>
      </div>
    </div>

    <div class="edit-mode" v-else>
      <label>
        <span>First Name:</span>
        <input v-model="editAccount.firstName" type="text" />
      </label>
      <label>
        <span>Last Name:</span>
        <input v-model="editAccount.lastName" type="text" />
      </label>
      <label>
        <span>Username:</span>
        <input v-model="editAccount.username" type="text" />
      </label>
      <label>
        <span>Email:</span>
        <input v-model="editAccount.email" type="email" />
      </label>
      <label>
        <span>Phone Number:</span>
        <input 
          v-model="editAccount.phone_number" 
          type="text" 
          @input="maskPhoneNumber" 
          placeholder="(XXX) XXX-XXXX"
        />
      </label>
      <label>
        <span>Number of Points:</span>
        <input v-model.number="editAccount.numOfPoints" type="number" />
      </label>
      <div class="button-group">
        <button class="primary-button" @click="saveChanges">Save</button>
        <button class="secondary-button" @click="cancelEdit">Cancel</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const account = reactive({
  username: "john_doe",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone_number: "(814) 920-1238",
  numOfPoints: 100,
  birthday: "01-01-1990",
});

const isEditing = ref(false);
const editAccount = reactive({ ...account });

const editMode = () => {
  isEditing.value = true;
  Object.assign(editAccount, account);
};

const saveChanges = () => {
  Object.assign(account, editAccount);
  isEditing.value = false;
};

const maskPhoneNumber = (event) => {
  let input = event.target.value.replace(/\D/g, "");

  if (input.length > 3 && input.length <= 6) {
    input = `(${input.slice(0, 3)}) ${input.slice(3)}`;
  } else if (input.length > 6) {
    input = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
  }

  editAccount.phone_number = input;
};


const cancelEdit = () => {
  isEditing.value = false;
};

const deleteAccount = () => {
  alert("Account deleted!");
};

</script>


<style scoped>
.account-info {
  font-family: "Segoe UI", Arial, sans-serif;
  width: 500px;
  margin: 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}


label {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label span {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s ease-in-out;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

input[readonly] {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

button {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.primary-button {
  background-color: #007bff;
  color: #fff;
}

.primary-button:hover {
  background-color: #0056b3;
}

.secondary-button {
  background-color: #6c757d;
  color: #fff;
}

.secondary-button:hover {
  background-color: #565e64;
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #a71d2a;
}

.button-group {
  display: flex;
  gap: 10px;
}

.title {
  color: #ff8c00;
  font-family: "Segoe UI", Arial, sans-serif;
  margin-bottom: 20px;
  font-size: 36px;
  font-weight: 800;
}

.view-mode p {
  margin: 15px 0;
  font-size: 16px;
}

.edit-mode {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (max-width: 800px) {
  .title {
    text-align: center;
    margin-top: 15px;
  }

	.account-info {
		width: 350px;
		margin-left: 10px;
	}

  .account-info {
    margin: 0 auto;
    margin-bottom: 50px;
  }
}

</style>
