const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const heroTitle = document.getElementById('heroTitle');
const heroSubtitle = document.getElementById('heroSubtitle');
const valueCards = document.querySelectorAll('.value-card');
const valueModal = document.getElementById('valueModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');
const ctaButton = document.getElementById('ctaButton');
const contactModal = document.getElementById('contactModal');
const closeContactModal = document.getElementById('closeContactModal');
const contactForm = document.getElementById('contactForm');
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const usersStat = document.getElementById('usersStat');
const partnersStat = document.getElementById('partnersStat');
const loansStat = document.getElementById('loansStat');
const navLinkItems = document.querySelectorAll('.nav-link');

// Value details for modals
const valueDetails = {
    accessibility: {
        title: "Accessibility",
        content: `<p>At Ngwino, accessibility means ensuring that financial services are within reach for all Rwandans, regardless of their economic background or status. We're committed to:</p>
                  <ul style="margin-left: 20px; margin-top: 10px;">
                      <li>Lowering barriers to entry for financial services</li>
                      <li>Creating user-friendly interfaces that work across different devices</li>
                      <li>Offering educational resources to improve financial literacy</li>
                      <li>Working with partners who share our vision of inclusive finance</li>
                  </ul>`
    },
    innovation: {
        title: "Innovation",
        content: `<p>Innovation is at the heart of the Ngwino project. As students from Rwanda Coding Academy, we apply cutting-edge technology to solve real financial challenges:</p>
                  <ul style="margin-left: 20px; margin-top: 10px;">
                      <li>Developing algorithms that assess creditworthiness beyond traditional metrics</li>
                      <li>Creating secure, efficient platforms for financial transactions</li>
                      <li>Continuously iterating our solutions based on user feedback</li>
                      <li>Staying ahead of financial technology trends to better serve Rwandans</li>
                  </ul>`
    },
    integrity: {
        title: "Integrity",
        content: `<p>Integrity is fundamental to building trust in financial services. At Ngwino, we demonstrate integrity through:</p>
                  <ul style="margin-left: 20px; margin-top: 10px;">
                      <li>Transparent processes that users can understand and trust</li>
                      <li>Clear communication about terms, conditions, and expectations</li>
                      <li>Secure handling of sensitive financial information</li>
                      <li>Ethical partnerships with financial institutions that share our values</li>
                      <li>Accountability in all our operations and interactions</li>
                  </ul>`
    },
    community: {
        title: "Community",
        content: `<p>The Ngwino project is built on a foundation of community. We believe that financial empowerment strengthens the entire Rwandan society:</p>
                  <ul style="margin-left: 20px; margin-top: 10px;">
                      <li>Supporting local entrepreneurship and economic development</li>
                      <li>Creating networks between borrowers, lenders, and investors</li>
                      <li>Celebrating success stories from our community</li>
                      <li>Contributing to Rwanda's vision for a knowledge-based economy</li>
                      <li>Building a supportive ecosystem for financial growth and stability</li>
                  </ul>`
    }
};

// Initialize animations
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (heroTitle) heroTitle.classList.add('fade-in');
        if (heroSubtitle) heroSubtitle.classList.add('fade-in');
    }, 300);
    
    checkScroll();
});

// Modified navigation link handling - FIXED ISSUE WITH LINKS
navLinkItems.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only apply special handling to in-page anchor links
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu if it's open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        } else {
            // For normal page links, just close the mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            // Allow default link behavior to navigate to other pages
        }
    });
});

// Mobile menu toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Sticky header on scroll
window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    checkScroll();
});

// Check elements in viewport for animation
function checkScroll() {
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('fade-in');
        }
    });
    
    // Check if stats are visible and animate them
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer && usersStat) {
        const statsPosition = statsContainer.getBoundingClientRect().top;
        if (statsPosition < window.innerHeight && !usersStat.getAttribute('data-animated')) {
            animateStats();
            usersStat.setAttribute('data-animated', 'true');
        }
    }
}

// Animate statistics with counting effect
function animateStats() {
    if (usersStat) animateCounter(usersStat, 5000);
    if (partnersStat) animateCounter(partnersStat, 25);
    if (loansStat) animateCounter(loansStat, 3500);
}

function animateCounter(element, target) {
    let start = 0;
    const duration = 2000; // 2 seconds
    const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const value = Math.floor(progress * target);
        element.innerText = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Value cards modal interaction
if (valueCards.length > 0 && valueModal) {
    valueCards.forEach(card => {
        card.addEventListener('click', () => {
            const valueType = card.getAttribute('data-value');
            const details = valueDetails[valueType];
            
            modalTitle.textContent = details.title;
            modalContent.innerHTML = details.content;
            
            valueModal.classList.add('show');
        });
    });

    // Modal close button
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            valueModal.classList.remove('show');
        });
    }

    // Close modal when clicking outside content
    valueModal.addEventListener('click', (e) => {
        if (e.target === valueModal) {
            valueModal.classList.remove('show');
        }
    });
}

// CTA Button - Show contact form
if (ctaButton && contactModal) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.classList.add('show');
    });
}

// Close contact modal
if (closeContactModal) {
    closeContactModal.addEventListener('click', () => {
        contactModal.classList.remove('show');
    });
}

// Close contact modal when clicking outside
if (contactModal) {
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.classList.remove('show');
        }
    });
}

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (name && email && message) {
            // In a real application, you'd send this data to your server
            // For demo purposes, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been received. We'll contact you soon.`);
            contactForm.reset();
            contactModal.classList.remove('show');
        } else {
            alert('Please fill out all fields.');
        }
    });
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (valueModal) valueModal.classList.remove('show');
        if (contactModal) contactModal.classList.remove('show');
    }
});