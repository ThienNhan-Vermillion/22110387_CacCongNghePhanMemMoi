// Main JavaScript file for CRUD App

document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const themeToggle = document.getElementById('toggle-theme');
  const body = document.body;
  
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = body.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
  
  function updateThemeIcon(theme) {
    const icon = themeToggle?.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
    }
  }
  
  // Form validation and enhancement
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Allow form to submit normally without any interference
      console.log('Form submitting to:', form.action);
      console.log('Form data:', new FormData(form));
    });
  });
  
  // Auto-resize textareas
  const textareas = document.querySelectorAll('textarea');
  textareas.forEach(textarea => {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
  });
  
  // Enhanced delete confirmation
  const deleteLinks = document.querySelectorAll('a[href*="delete-user"]');
  deleteLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const confirmed = confirm('Bạn có chắc chắn muốn xóa user này? Hành động này không thể hoàn tác.');
      if (!confirmed) {
        e.preventDefault();
      }
    });
  });
  
  // Table row hover effects
  const tableRows = document.querySelectorAll('.table tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.01)';
      this.style.transition = 'transform 0.2s ease';
    });
    
    row.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Input focus effects
  const inputs = document.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
  
  // Toast notifications (if needed)
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Add show class after a small delay
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
  
  // Expose showToast globally for use in other scripts
  window.showToast = showToast;
  
  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + N for new user
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      const newUserLink = document.querySelector('a[href="/"]');
      if (newUserLink) {
        newUserLink.click();
      }
    }
    
    // Ctrl/Cmd + L for user list
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
      e.preventDefault();
      const userListLink = document.querySelector('a[href="/users"]');
      if (userListLink) {
        userListLink.click();
      }
    }
    
    // Escape key to close modals or go back
    if (e.key === 'Escape') {
      const modals = document.querySelectorAll('.modal.show');
      if (modals.length > 0) {
        // Close modal logic here if needed
      } else {
        // Go back in history
        window.history.back();
      }
    }
  });
  
  // Add loading states to buttons (but not for submit buttons)
  const buttons = document.querySelectorAll('.btn:not([type="submit"])');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      if (!this.disabled && !this.classList.contains('btn-outline-secondary')) {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="bi bi-hourglass-split"></i> Loading...';
        this.disabled = true;
        
        // Reset after a delay (for demo purposes)
        setTimeout(() => {
          this.innerHTML = originalText;
          this.disabled = false;
        }, 2000);
      }
    });
  });
  
  // Initialize tooltips if Bootstrap is available
  if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
  
  console.log('🚀 CRUD App initialized successfully!');
});
