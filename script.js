document.addEventListener("DOMContentLoaded", () => {
  /**
   * 1. NAVIGATION
   * Handles both the mobile burger menu and desktop dropdowns.
   */
  const handleNavigation = () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const mobileNav = document.querySelector(".mobile-nav");
    const closeBtn = document.querySelector(".close-btn");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

    if (burgerMenu && mobileNav) {
      burgerMenu.addEventListener("click", () => {
        mobileNav.classList.add("open");
      });
    }

    if (closeBtn && mobileNav) {
      closeBtn.addEventListener("click", () => {
        mobileNav.classList.remove("open");
      });
    }
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) {
                mobileNav.classList.remove('open');
            }
        });
    });

    // Desktop Dropdown Menu
    const dropdowns = document.querySelectorAll(".nav-links .dropdown");
    if (dropdowns.length > 0) {
      dropdowns.forEach((dropdown) => {
        const link = dropdown.querySelector(".nav-link");
        link.addEventListener("click", (event) => {
          if (window.innerWidth < 768) {
             event.preventDefault();
          }
          dropdown.classList.toggle("active");
        });
      });

      document.addEventListener("click", (event) => {
        dropdowns.forEach((dropdown) => {
          if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("active");
          }
        });
      });
    }
  };

  /**
   * 2. MODALS
   * Handles the feedback modal.
   */
  const handleModal = () => {
    const openModalBtn = document.getElementById("open-feedback-modal");
    const modal = document.getElementById("feedback-modal");
    const closeModalBtn = modal ? modal.querySelector(".close-modal") : null;
    const modalOverlay = modal ? modal.querySelector(".modal-overlay") : null;

    if(openModalBtn && modal) {
        openModalBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if(closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

     if(modalOverlay && modal) {
        modalOverlay.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
  };


  /**
   * 3. MEDIA AND ANIMATION
   */

  //  Hero Slider (Home Page)
  const handleHeroSlider = () => {
    const heroSection = document.querySelector(".hero-section");
    if (!heroSection) return;

    const slides = [
      {
        title: "Unlock Your Potential",
        subtitle: "Learn the latest skills from industry experts to advance your career.",
        background: "public/tq_yqtxufnh94-ygp-1500w.png",
      },
      {
        title: "Learn at Your Own Pace",
        subtitle: "Flexible online courses designed for busy professionals.",
        background: "public/tq_vvjkdbxtsr-q3r5-1500h.png",
      },
      {
        title: "Join 50,000+ Students",
        subtitle: "Be part of a thriving community of learners worldwide.",
        background: "public/tq_993sjum-0v-1yi-1500h.png",
      },
    ];

    let currentSlide = 0;
    const heroContent = heroSection.querySelector(".hero-content");
    const titleEl = heroContent.querySelector("h1");
    const subtitleEl = heroContent.querySelector("p");
    const backgroundEl = heroSection.querySelector(".hero-background");
    const nextBtn = heroSection.querySelector(".slider-arrow.next");
    const prevBtn = heroSection.querySelector(".slider-arrow.prev");
    const dotsContainer = heroSection.querySelector(".slider-dots");

    function showSlide(index) {
        titleEl.textContent = slides[index].title;
        subtitleEl.textContent = slides[index].subtitle;
        backgroundEl.style.backgroundImage = `url('${slides[index].background}')`;
        currentSlide = index;
        
        updateDots(index);
    }
    
    function updateDots(index) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === index) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => showSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    nextBtn.addEventListener('click', () => {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    });

    prevBtn.addEventListener('click', () => {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    });

    setInterval(() => {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }, 3000);

    showSlide(0);
  };
  
  const handleSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
  };


  /**
   * 4. FORMS
   * Handles validation for the contact form.
   */
  const handleContactForm = () => {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      clearErrors();

      let isValid = true;

      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const subject = form.querySelector("#subject");
      const message = form.querySelector("#message");

      if (name.value.trim() === "") {
        showError(name, "Your Name is required.");
        isValid = false;
      }

      if (email.value.trim() === "") {
        showError(email, "Email Address is required.");
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        showError(email, "Please enter a valid email address.");
        isValid = false;
      }
      
      if (subject.value.trim() === "") {
        showError(subject, "Subject is required.");
        isValid = false;
      }

      if (message.value.trim() === "") {
        showError(message, "Message is required.");
        isValid = false;
      }

      if (isValid) {
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.innerHTML = "Message Sent!";
        submitButton.style.backgroundColor = "#16a34a";
        form.reset();
        
        setTimeout(() => {
             submitButton.innerHTML = `<img src="public/component1i266-vphc.svg" alt="Send Icon" /> Send Message`;
             submitButton.style.backgroundColor = "";
        }, 3000);
      }
    });

    const showError = (input, message) => {
        const formGroup = input.parentElement;
        input.style.borderColor = '#ef4444';
        const error = document.createElement('p');
        error.className = 'error-message';
        error.style.color = '#ef4444';
        error.style.fontSize = '12px';
        error.style.marginTop = '4px';
        error.textContent = message;
        formGroup.appendChild(error);
    };

    const clearErrors = () => {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        form.querySelectorAll('input, textarea').forEach(input => input.style.borderColor = '');
    };

    const isValidEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };
  };

  /**
   * 5. DYNAMIC CONTENT
   */

  const handleFaqAccordion = () => {
    const accordion = document.querySelector(".faq-accordion");
    if (!accordion) return;

    const details = accordion.querySelectorAll("details");
    details.forEach((targetDetail) => {
      targetDetail.addEventListener("click", () => {
        details.forEach((detail) => {
          if (detail !== targetDetail) {
            detail.removeAttribute("open");
          }
        });
      });
    });
  };

  const handleCourseFiltering = () => {
      const coursesGrid = document.querySelector('.courses-grid');
      if (!coursesGrid || typeof courses === 'undefined') return;

      const filters = document.querySelector('.filters-sidebar');
      const sortSelect = document.getElementById('sort-by');

      const renderCourses = (coursesToRender) => {
          coursesGrid.innerHTML = '';
          if (coursesToRender.length === 0) {
              coursesGrid.innerHTML = `<p>No courses match your criteria.</p>`;
              return;
          }
          coursesToRender.forEach(course => {
              const courseCard = `
                <div class="course-card">
                    <div class="course-image-container">
                        <img src="${course.imageUrl}" alt="${course.title}">
                        <span class="course-price">$${course.price}</span>
                    </div>
                    <div class="course-content">
                        <div class="course-tags">
                            <span class="tag-blue">${course.category}</span>
                            <span class="tag-gray">${course.difficulty}</span>
                        </div>
                        <h3 class="course-title">${course.title}</h3>
                        <p class="course-description">${course.description}</p>
                        <div class="course-meta">
                            <span>⭐ ${course.rating}</span>
                            <span>👥 ${course.students.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
              `;
              coursesGrid.innerHTML += courseCard;
          });
      };

      const filterAndSortCourses = () => {
          let filteredCourses = [...courses];
          
          // Get filter values
          const category = document.querySelector('input[name="category"]:checked').parentElement.textContent.trim();
          const difficulty = document.querySelector('input[name="difficulty"]:checked').parentElement.textContent.trim();
          const price = document.querySelector('input[name="price"]:checked').parentElement.textContent.trim();
          const sortBy = sortSelect.value;
          
          // Apply category filter
          if (category !== 'All Categories') {
              filteredCourses = filteredCourses.filter(c => c.category === category);
          }
          // Apply difficulty filter
          if (difficulty !== 'All Levels') {
              filteredCourses = filteredCourses.filter(c => c.difficulty === difficulty);
          }
          // Apply price filter
          if (price !== 'All Prices') {
              if (price === 'Under $75') filteredCourses = filteredCourses.filter(c => c.price < 75);
              if (price === '$75 - $100') filteredCourses = filteredCourses.filter(c => c.price >= 75 && c.price <= 100);
              if (price === '$100 - $150') filteredCourses = filteredCourses.filter(c => c.price >= 100 && c.price <= 150);
              if (price === 'Over $150') filteredCourses = filteredCourses.filter(c => c.price > 150);
          }

          // Apply sorting
          switch(sortBy) {
              case 'popular':
                  filteredCourses.sort((a, b) => b.students - a.students);
                  break;
              case 'newest':
                  filteredCourses.sort((a, b) => b.id - a.id); // Assuming higher ID is newer
                  break;
              case 'price-asc':
                  filteredCourses.sort((a, b) => a.price - b.price);
                  break;
              case 'price-desc':
                  filteredCourses.sort((a, b) => b.price - a.price);
                  break;
          }
          
          renderCourses(filteredCourses);
      };

      // Add event listeners
      filters.addEventListener('change', filterAndSortCourses);
      sortSelect.addEventListener('change', filterAndSortCourses);

      // Initial render on page load
      filterAndSortCourses();
  };


  // --- INITIALIZE ALL HANDLERS ---
  handleNavigation();
  handleModal();
  handleHeroSlider();
  handleSmoothScroll();
  handleContactForm();
  handleFaqAccordion();
  handleCourseFiltering();
  handleAuth();

});


/**
 * 6. AUTHENTICATION SIMULATION
 * Manages the simulated login/logout state using localStorage.
 */
const handleAuth = () => {
    const loginForm = document.querySelector(".login-form");
    const signupForm = document.querySelector(".signup-form");
    const logoutButton = document.getElementById("logout-btn");

    // Function to check login status and update the UI
    const checkLoginStatus = () => {
        if (localStorage.getItem("isLoggedIn") === "true") {
            document.body.classList.add("logged-in");
        } else {
            document.body.classList.remove("logged-in");
        }
    };

    // --- Event Listener for Login Form ---
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // For simulation, we assume login is successful.
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "profile.html";
        });
    }
    
    // --- NEW: Event Listener for Sign Up Form ---
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const password = signupForm.querySelector("#password");
            const confirmPassword = signupForm.querySelector("#confirm-password");

            // Simple validation: check if passwords match
            if (password.value !== confirmPassword.value) {
                alert("Passwords do not match. Please try again.");
                return; // Stop the function
            }
            
            // Simple validation: check if password is long enough
            if (password.value.length < 8) {
                alert("Password must be at least 8 characters long.");
                return;
            }

            // If validation passes, simulate successful registration
            // by logging the user in immediately.
            localStorage.setItem("isLoggedIn", "true");

            // Redirect to the profile page
            window.location.href = "profile.html";
        });
    }


    // --- Event Listener for Logout Button ---
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "home.html";
        });
    }
    
    // Check the login status every time a page loads
    checkLoginStatus();
};

  // --- DEDICATED LOGIC FOR COURSES PAGE ---
  const coursesGridContainer = document.querySelector('.courses-grid');

  // Check if we are on the courses page AND if the `courses` variable from data.js is loaded
  if (coursesGridContainer && typeof courses !== 'undefined') {
    
    const filters = document.querySelector('.filters-sidebar');
    const sortSelect = document.getElementById('sort-by');

    const renderCourses = (coursesToRender) => {
      coursesGridContainer.innerHTML = ''; // Clear previous content
      if (coursesToRender.length === 0) {
        coursesGridContainer.innerHTML = `<p style="grid-column: 1 / -1;">No courses match your criteria.</p>`;
        return;
      }
      coursesToRender.forEach(course => {
        const courseCardHTML = `
          <div class="course-card">
            <div class="course-image-container">
                <img src="${course.imageUrl}" alt="${course.title}">
                <span class="course-price">$${course.price.toFixed(2)}</span>
            </div>
            <div class="course-content">
                <div class="course-tags">
                    <span class="tag-blue">${course.category}</span>
                    <span class="tag-gray">${course.difficulty}</span>
                </div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span>⭐ ${course.rating}</span>
                    <span>👥 ${course.students.toLocaleString()}</span>
                </div>
            </div>
          </div>
        `;
        coursesGridContainer.insertAdjacentHTML('beforeend', courseCardHTML);
      });
    };

    const filterAndSortCourses = () => {
      let filteredCourses = [...courses];
      
      const category = document.querySelector('input[name="category"]:checked').value;
      const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
      const price = document.querySelector('input[name="price"]:checked').value;
      const sortBy = sortSelect.value;
      
      if (category !== 'All') {
        filteredCourses = filteredCourses.filter(c => c.category === category);
      }
      if (difficulty !== 'All') {
        filteredCourses = filteredCourses.filter(c => c.difficulty === difficulty);
      }
      
      switch(price) {
        case 'under-75':
          filteredCourses = filteredCourses.filter(c => c.price < 75);
          break;
        case '75-100':
          filteredCourses = filteredCourses.filter(c => c.price >= 75 && c.price <= 100);
          break;
        case '100-150':
          filteredCourses = filteredCourses.filter(c => c.price >= 100 && c.price <= 150);
          break;
        case 'over-150':
          filteredCourses = filteredCourses.filter(c => c.price > 150);
          break;
      }

      switch(sortBy) {
        case 'popular':
          filteredCourses.sort((a, b) => b.students - a.students);
          break;
        case 'newest':
          filteredCourses.sort((a, b) => b.id - a.id);
          break;
        case 'price-asc':
          filteredCourses.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredCourses.sort((a, b) => b.price - a.price);
          break;
      }
      
      renderCourses(filteredCourses);
    };

    // Add event listeners and trigger the initial render
    filters.addEventListener('change', filterAndSortCourses);
    sortSelect.addEventListener('change', filterAndSortCourses);
    filterAndSortCourses(); // This is the crucial call that draws the courses on page load
  }


  // --- INITIALIZE ALL HANDLERS ---
  handleNavigation();
  handleContactForm();
  handleFaqAccordion();
  handleAuth();