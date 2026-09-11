const signinTab = document.getElementById("signin-tab");
const signupTab = document.getElementById("signup-tab");
const signinForm = document.getElementById("signin-form");
const signupForm = document.getElementById("signup-form");

signinTab.addEventListener("click", () => {
  signinTab.classList.add("active");
  signupTab.classList.remove("active");
  signinForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
});

signupTab.addEventListener("click", () => {
  signupTab.classList.add("active");
  signinTab.classList.remove("active");
  signupForm.classList.remove("hidden");
  signinForm.classList.add("hidden");
});
