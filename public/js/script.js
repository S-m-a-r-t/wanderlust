// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();

const themeToggle = document.getElementById('checkbox');
const body = document.body;

// Function to set the theme
function setTheme(isDarkMode) {
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
        localStorage.setItem('theme', 'dark'); // Save theme preference
    } else {
        body.classList.remove('dark-mode');
        themeToggle.checked = false;
        localStorage.setItem('theme', 'light'); // Save theme preference
    }
}

// Listener for the toggle switch
themeToggle.addEventListener('change', () => {
    setTheme(themeToggle.checked);
});

// Check for saved theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    // Set theme based on saved preference or system preference
    if (savedTheme === 'dark') {
        setTheme(true);
    } else if (savedTheme === 'light') {
        setTheme(false);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Fallback to user's system preference if no saved theme
        setTheme(true);
    }
});