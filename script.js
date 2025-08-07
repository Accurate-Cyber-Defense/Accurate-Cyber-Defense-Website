document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
            }
        });
    });
    
    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Shopping Cart Functionality
    const cart = [];
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    // Add to Cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseInt(this.getAttribute('data-price'));
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.product === product);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    product: product,
                    price: price,
                    quantity: 1
                });
            }
            
            updateCart();
            cartModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close Modal
    closeModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Update Cart
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotalElement.textContent = 'MWK 0';
            return;
        }
        
        let total = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <h5>${item.product}</h5>
                    <p>MWK ${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
                <div class="cart-item-price">MWK ${itemTotal.toLocaleString()}</div>
                <span class="remove-item" data-index="${index}"><i class="fas fa-times"></i></span>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        cartTotalElement.textContent = `MWK ${total.toLocaleString()}`;
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
    
    // Payment Buttons
    const paypalBtn = document.getElementById('paypal-btn');
    const bankBtn = document.getElementById('bank-btn');
    const bitcoinBtn = document.getElementById('bitcoin-btn');
    
    paypalBtn.addEventListener('click', function() {
        processPayment('PayPal');
    });
    
    bankBtn.addEventListener('click', function() {
        processPayment('Bank Transfer');
    });
    
    bitcoinBtn.addEventListener('click', function() {
        processPayment('Bitcoin');
    });
    
    function processPayment(method) {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // In a real implementation, this would redirect to the payment processor
        alert(`Redirecting to ${method} payment gateway...`);
        
        // Simulate payment processing
        setTimeout(() => {
            alert('Payment successful! Thank you for your purchase.');
            cart.length = 0;
            updateCart();
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 1000);
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real implementation, this would send the data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input').value;
            
            // In a real implementation, this would send the data to a server
            console.log('Newsletter subscription:', email);
            
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
});