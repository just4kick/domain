(function() {
    'use strict';

    // DOM elements
    const modal = document.getElementById('contact-modal');
    const modalTriggers = document.querySelectorAll('.contact-modal-trigger');
    const scrollToContactElements = document.querySelectorAll('.scroll-to-contact');
    const closeBtn = document.querySelector('.modal-close');
    const contactForm = document.getElementById('contact-form');
    const contactSection = document.querySelector('.s-contact');
    

    // using emailjs to send email
    (function() {
        // Add EmailJS script dynamically if not already present
        if (!window.emailjs) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
            script.async = true;
            document.head.appendChild(script);
            
            script.onload = function() {
                // Initialize EmailJS with your public key
                emailjs.init('-ztaRgKkFhIHrONhd');
            };
        } else {
            // If already loaded, just initialize
            emailjs.init('-ztaRgKkFhIHrONhd');
        }
    })();


    // Add ID to contact section if not present
    if (contactSection && !contactSection.id) {
        contactSection.id = 'contact';
    }
    
    // Handle all scroll-to-contact buttons
    if (scrollToContactElements && scrollToContactElements.length > 0) {
        scrollToContactElements.forEach(function(element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                
                // First scroll to contact section
                if (contactSection) {
                    const position = contactSection.offsetTop;
                    
                    window.scrollTo({
                        top: position,
                        behavior: 'smooth'
                    });
                    
                    // After scrolling is complete, open the modal
                    setTimeout(function() {
                        if (modal) {
                            modal.classList.add('is-visible');
                            document.body.classList.add('modal-open');
                        }
                    }, 800);
                }
            });
        });
    }
    
    // Open modal when any modal trigger is clicked
    if (modalTriggers && modalTriggers.length > 0) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.add('is-visible');
                document.body.classList.add('modal-open');
            });
        });
    }
    
    // Close modal when close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
            closeModal();
        }
    });
    
    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const projectType = document.getElementById('project-type').value;
            const message = document.getElementById('message').value;
            
            // Get phone if it exists
            const phone = document.getElementById('phone') ? document.getElementById('phone').value : 'Not provided';
            
            // Prepare form submission state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Prepare template parameters
            const templateParams = {
                name: name,
                email: email,
                project_type: projectType, 
                phone: phone, 
                time: new Date().toLocaleString(),
                message:message
            };
            
            // Send email using EmailJS
            const serviceID = 'service_nel80ch';
            const templateID = 'template_nakamet';
            
            emailjs.send(serviceID, templateID, templateParams)
                .then(function() {
                    // Success - display success message
                    let successMsg = document.createElement('div');
                    successMsg.className = 'message-success';
                    successMsg.innerHTML = `
                        <h4>Thank you for your message!</h4>
                        <p>We've received your inquiry and will get back to you shortly.</p>
                    `;
                    
                    // Hide form and show success message
                    contactForm.style.display = 'none';
                    contactForm.parentNode.appendChild(successMsg);
                    
                    // Show success message with animation
                    setTimeout(() => {
                        successMsg.classList.add('is-visible');
                    }, 100);
                    
                    // Reset form for future use
                    contactForm.reset();
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Close modal after delay
                    setTimeout(() => {
                        closeModal();
                        // Remove success message and show form again after modal closes
                        setTimeout(() => {
                            successMsg.remove();
                            contactForm.style.display = 'block';
                        }, 500);
                    }, 3000);
                    
                    console.log('Email sent successfully!');
                })
                .catch(function(error) {
                    // Error handling
                    console.error('Error sending email:', error);
                    
                    // Create error message
                    let errorMsg = document.createElement('div');
                    errorMsg.className = 'message-error';
                    errorMsg.innerHTML = `
                        <h4>Oops! Something went wrong.</h4>
                        <p>Please try again later or contact us directly at hello@flare.com</p>
                    `;
                    
                    // Hide form and show error message
                    contactForm.style.display = 'none';
                    contactForm.parentNode.appendChild(errorMsg);
                    
                    // Show error message with animation
                    setTimeout(() => {
                        errorMsg.classList.add('is-visible');
                    }, 100);
                    
                    // Reset button
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Close modal after delay
                    setTimeout(() => {
                        closeModal();
                        // Remove error message and show form again after modal closes
                        setTimeout(() => {
                            errorMsg.remove();
                            contactForm.style.display = 'block';
                        }, 500);
                    }, 4000);
                });
        });
    }
    
    // Function to close modal
    function closeModal() {
        modal.classList.remove('is-visible');
        document.body.classList.remove('modal-open');
    }

})();