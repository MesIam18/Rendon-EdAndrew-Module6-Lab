function isValidStudentNumber(value) {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  const studentNumRegex = /^\d{2}-\d{4}-\d{3}$/;
  return studentNumRegex.test(trimmed);
}

function isValidPassword(value) {
  if (typeof value !== 'string') return false;
  if (/\s/.test(value)) return false;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!])[A-Za-z\d@$!]{8,}$/;
  return passwordRegex.test(value);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isValidStudentNumber,
    isValidPassword
  };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const studentNumberInput = document.getElementById('studentNumber');
    const emailInput = document.getElementById('email');
    const mobileNumberInput = document.getElementById('mobileNumber');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const courseSelect = document.getElementById('course');
    const termsCheckbox = document.getElementById('terms');

    const successMessage = document.getElementById('successMessage');
    const registrationSummary = document.getElementById('registrationSummary');

    const summaryName = document.getElementById('summaryName');
    const summaryStudentNumber = document.getElementById('summaryStudentNumber');
    const summaryEmail = document.getElementById('summaryEmail');
    const summaryMobileNumber = document.getElementById('summaryMobileNumber');
    const summaryCourse = document.getElementById('summaryCourse');

    function setError(inputElement, errorElementId, message) {
      const errorSpan = document.getElementById(errorElementId);
      if (errorSpan) errorSpan.textContent = message;
      if (inputElement) inputElement.setAttribute('aria-invalid', 'true');
    }

    function clearError(inputElement, errorElementId) {
      const errorSpan = document.getElementById(errorElementId);
      if (errorSpan) errorSpan.textContent = '';
      if (inputElement) inputElement.setAttribute('aria-invalid', 'false');
    }

    function validateFullName() {
      const trimmed = fullNameInput.value.trim();
      if (trimmed.length < 2) {
        setError(fullNameInput, 'fullNameError', 'Full name is required and must be at least 2 characters.');
        return false;
      }
      clearError(fullNameInput, 'fullNameError');
      return true;
    }

    function validateStudentNumber() {
      if (!isValidStudentNumber(studentNumberInput.value)) {
        setError(studentNumberInput, 'studentNumberError', 'Enter a student number in the format 24-1234-123.');
        return false;
      }
      clearError(studentNumberInput, 'studentNumberError');
      return true;
    }

    function validateEmail() {
      const trimmed = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        setError(emailInput, 'emailError', 'Enter a valid email address.');
        return false;
      }
      clearError(emailInput, 'emailError');
      return true;
    }

    function validateMobileNumber() {
      const trimmed = mobileNumberInput.value.trim();
      const mobileRegex = /^(09\d{9}|\+639\d{9})$/;
      if (!mobileRegex.test(trimmed)) {
        setError(mobileNumberInput, 'mobileNumberError', 'Enter a valid mobile number (e.g., 09123456789 or +639123456789).');
        return false;
      }
      clearError(mobileNumberInput, 'mobileNumberError');
      return true;
    }

    function validatePassword() {
      if (!isValidPassword(passwordInput.value)) {
        setError(passwordInput, 'passwordError', 'Password must be at least 8 chars, contain an uppercase letter, a digit, and @, $, or !.');
        return false;
      }
      clearError(passwordInput, 'passwordError');
      return true;
    }

    function validateConfirmPassword() {
      if (confirmPasswordInput.value === '' || confirmPasswordInput.value !== passwordInput.value) {
        setError(confirmPasswordInput, 'confirmPasswordError', 'Passwords do not match.');
        return false;
      }
      clearError(confirmPasswordInput, 'confirmPasswordError');
      return true;
    }

    function validateCourse() {
      if (courseSelect.value !== 'BSIT' && courseSelect.value !== 'BSCS') {
        setError(courseSelect, 'courseError', 'Please select a valid course.');
        return false;
      }
      clearError(courseSelect, 'courseError');
      return true;
    }

    function validateTerms() {
      if (!termsCheckbox.checked) {
        setError(termsCheckbox, 'termsError', 'You must agree to the terms.');
        return false;
      }
      clearError(termsCheckbox, 'termsError');
      return true;
    }

    fullNameInput.addEventListener('blur', validateFullName);

    passwordInput.addEventListener('input', () => {
      const feedback = document.getElementById('passwordFeedback');
      if (isValidPassword(passwordInput.value)) {
        feedback.textContent = 'Strong password criteria met.';
        feedback.style.color = '#28a745';
      } else {
        feedback.textContent = 'Password must be 8+ chars with uppercase, number, and (@, $, !).';
        feedback.style.color = '#0275d8';
      }
      if (confirmPasswordInput.value !== '') {
        validateConfirmPassword();
      }
    });

    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    courseSelect.addEventListener('change', validateCourse);
    termsCheckbox.addEventListener('change', validateTerms);

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      successMessage.textContent = '';
      registrationSummary.hidden = true;

      const isNameValid = validateFullName();
      const isStudentNumValid = validateStudentNumber();
      const isEmailValid = validateEmail();
      const isMobileValid = validateMobileNumber();
      const isPasswordValid = validatePassword();
      const isConfirmValid = validateConfirmPassword();
      const isCourseValid = validateCourse();
      const isTermsValid = validateTerms();

      const isFormValid = isNameValid && isStudentNumValid && isEmailValid &&
                          isMobileValid && isPasswordValid && isConfirmValid &&
                          isCourseValid && isTermsValid;

      if (isFormValid) {
        successMessage.textContent = 'Registration details validated successfully!';

        summaryName.textContent = fullNameInput.value.trim();
        summaryStudentNumber.textContent = studentNumberInput.value.trim();
        summaryEmail.textContent = emailInput.value.trim();
        summaryMobileNumber.textContent = mobileNumberInput.value.trim();
        summaryCourse.textContent = courseSelect.value;

        registrationSummary.hidden = false;
      }
    });

    form.addEventListener('reset', () => {
      const errorSpans = document.querySelectorAll('.error-msg');
      errorSpans.forEach(span => span.textContent = '');

      const inputs = form.querySelectorAll('input, select');
      inputs.forEach(input => input.removeAttribute('aria-invalid'));

      document.getElementById('passwordFeedback').textContent = '';

      successMessage.textContent = '';
      registrationSummary.hidden = true;
      summaryName.textContent = '';
      summaryStudentNumber.textContent = '';
      summaryEmail.textContent = '';
      summaryMobileNumber.textContent = '';
      summaryCourse.textContent = '';
    });
  });
}