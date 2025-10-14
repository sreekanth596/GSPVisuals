// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Handle form submission
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            event: document.getElementById('event').value,
            message: document.getElementById('message').value
        };

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Using EmailJS to send the email
            // You'll need to sign up at https://www.emailjs.com/ to get your service ID and template ID
            await emailjs.send(
                'service_bwq5g1b', // Replace with your EmailJS service ID
                'template_ixv3leb', // Replace with your EmailJS template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    event_type: formData.event,
                    message: formData.message,
                    to_email: 'visualstoriesbygsp@gmail.com' // Replace with your email
                },
                'B4O_bUIkmxxOA7720' // Replace with your EmailJS public key
            );

            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Failed to send message:', error);
            showNotification('Failed to send message. Please try again later.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // Function to show notification
    function showNotification(message, type) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
});
