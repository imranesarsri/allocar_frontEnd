<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import * as bootstrap from 'bootstrap';

export default {
  name: 'ModalsComponent',
  setup() {
    const form = ref({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    });
    const error = ref('');
    const success = ref('');
    const showPassword = ref(false);
    const showPassword2 = ref(false);
    const isLoggedIn = ref(false); // Track login state
    const user = ref(null); // Store user data

    // Show password
    const togglePasswordVisibility = (id) => {
      if (id === 'togglePassword') {
        showPassword.value = !showPassword.value;
        document.getElementById('password').type = showPassword.value ? 'text' : 'password';
      } else if (id === 'togglePassword2') {
        showPassword2.value = !showPassword2.value;
        document.getElementById('password2').type = showPassword2.value ? 'text' : 'password';
      }
    };

    // Register
    const handleRegister = async () => {
      if (form.value.password !== form.value.passwordConfirmation) {
        error.value = 'Password and Confirm Password do not match';
        return;
      }
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/en/register`, {
          first_name: form.value.firstName,
          last_name: form.value.lastName,
          email: form.value.email,
          password: form.value.password,
          password_confirmation: form.value.passwordConfirmation, // Ensure this is sent
        }, {
          headers: {
            'Accept': 'application/json', // Fixed typo from 'application/jsoj'
          },
        });
        if (response.data.status) {
          success.value = response.data.message;
          error.value = '';
          localStorage.setItem('token', response.data.token);
          isLoggedIn.value = true; // Set logged-in state
          // Fetch user profile
          await fetchProfile();
          // Close modal after a delay
          setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('signUpModal01'));
            modal.hide();
          }, 2000);
        } else {
          error.value = response.data.message || 'Registration failed';
          success.value = '';
        }
      } catch (err) {
        error.value = err.response?.data?.message || 'An error occurred during registration';
        success.value = '';
        console.error('Registration error:', err);
      }
    };

    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/profile`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.data.status) {
          user.value = response.data.user;
        } else {
          console.error('Profile fetch failed:', response.data.message);
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
      }
    };

    // Check login state on mount
    onMounted(() => {
      const token = localStorage.getItem('token');
      if (token) {
        isLoggedIn.value = true;
        fetchProfile();
      }
    });

    return {
      form,
      error,
      success,
      showPassword,
      showPassword2,
      togglePasswordVisibility,
      handleRegister,
      isLoggedIn,
      user,
    };
  },
};
</script>

<template>
    <div class="modals-wrapper">
      <!-- signUpModal01 -->
      <div class="modal signUp-modal fade" id="signUpModal01">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="signUpModal01Label">Sign Up</h4>
              <p>Already have an account? <button type="button" data-bs-toggle="modal" data-bs-target="#logInModal01">Log In</button></p>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x"></i></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="handleRegister">
                <div class="row g-4">
                  <div class="col-md-6">
                    <div class="form-inner">
                      <label>First Name*</label>
                      <input v-model="form.firstName" type="text" placeholder="Daniel" required>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-inner">
                      <label>Last Name*</label>
                      <input v-model="form.lastName" type="text" placeholder="Last name" required>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-inner">
                      <label>Enter your email address*</label>
                      <input v-model="form.email" type="email" placeholder="Type email" required>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-inner">
                      <label>Password*</label>
                      <input v-model="form.password" id="password" type="password" placeholder="*** ***" required>
                      <i class="bi bi-eye-slash" id="togglePassword" @click="togglePasswordVisibility('togglePassword')"></i>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-inner">
                      <label>Confirm Password*</label>
                      <input v-model="form.passwordConfirmation" id="password2" type="password" placeholder="*** ***" required>
                      <i class="bi bi-eye-slash" id="togglePassword2" @click="togglePasswordVisibility('togglePassword2')"></i>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-inner">
                      <button class="primary-btn2" type="submit">Sign Up Now</button>
                    </div>
                    <p v-if="error" class="text-danger">{{ error }}</p>
                    <p v-if="success" class="text-success">{{ success }}</p>
                    <!-- Profile Icon -->
                    <div v-if="isLoggedIn" class="profile-icon mt-3">
                      <i class="bi bi-person-circle" style="font-size: 2rem; color: #007bff;"></i>
                      <span v-if="user" class="ms-2">{{ user.first_name }} {{ user.last_name }}</span>
                    </div>
                  </div>
                </div>
                <div class="terms-conditon">
                  <p>By sign up, you agree to the <a href="#">'terms & conditions'</a></p>
                </div>
                <ul class="social-icon">
                  <li><a href="#"><img src="/assets/img/icon/google.svg" alt=""></a></li>
                  <li><a href="#"><img src="/assets/img/icon/facebook.svg" alt=""></a></li>
                  <li><a href="#"><img src="/assets/img/icon/twiter.svg" alt=""></a></li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

