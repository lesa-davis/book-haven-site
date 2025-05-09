document.addEventListener('DOMContentLoaded', () => {
  // Subscribe Form using localStorage
  const subscribeForm = document.getElementById('subscribeForm');
  const subscriberEmail = document.getElementById('subscriberEmail');
  if (subscribeForm && subscriberEmail) {
    const savedEmail = localStorage.getItem('subscriberEmail');
    if (savedEmail) subscriberEmail.value = savedEmail;

    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = subscriberEmail.value;
      localStorage.setItem('subscriberEmail', email);
      alert(`Thank you for subscribing, ${email}!`);
      subscribeForm.reset();
    });
  }

  // Add to Cart buttons (save to localStorage and sessionStorage)
const addToCartButtons = document.querySelectorAll('.add-to-cart');
if (addToCartButtons.length > 0) {
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const bookTitle = button.getAttribute('data-title');

      // Save to localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(bookTitle);
      localStorage.setItem('cart', JSON.stringify(cart));

      // Save to sessionStorage
      let sessionCart = JSON.parse(sessionStorage.getItem('cart')) || [];
      sessionCart.push(bookTitle);
      sessionStorage.setItem('cart', JSON.stringify(sessionCart));

      alert(`"${bookTitle}" has been added to your cart. Please proceed to checkout.`);
    });
  });
}


  // View Cart button to open modal
  const viewCartBtn = document.getElementById('viewCart');
  const cartModal = document.getElementById('cartModal');
  const cartOverlay = document.querySelector('.modal-overlay');
  const closeCart = document.getElementById('closeCart');
  const cartList = document.getElementById('cartList');

  if (viewCartBtn && cartModal && cartOverlay && closeCart && cartList) {
    viewCartBtn.addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cartList.innerHTML = cart.length
        ? `<ul>${cart.map(item => `<li>${item}</li>`).join('')}</ul>`
        : '<p>Your cart is empty.</p>';
      cartModal.style.display = 'block';
      cartOverlay.style.display = 'block';
    });

    closeCart.addEventListener('click', () => {
      cartModal.style.display = 'none';
      cartOverlay.style.display = 'none';
    });
  }

  // Cart Page View (if on Cart page)
  const cartItemsContainer = document.getElementById('cartItems');
  if (cartItemsContainer) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = cart.length === 0
      ? '<p>Your cart is empty.</p>'
      : `<ul>${cart.map(item => `<li>${item}</li>`).join('')}</ul>
         <button onclick="clearCart()">Clear Cart</button>
         <button onclick="processOrder()">Process Order</button>`;
  }

  // Feedback Form saving to localStorage
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackName = document.getElementById('feedbackName');
  const feedbackEmail = document.getElementById('feedbackEmail');
  const feedbackText = document.getElementById('feedbackText');

  if (feedbackForm && feedbackName && feedbackEmail && feedbackText) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const feedbackDetails = {
        name: feedbackName.value,
        email: feedbackEmail.value,
        message: feedbackText.value
      };

      localStorage.setItem('feedback', JSON.stringify(feedbackDetails));

      alert(`Thanks for your feedback, ${feedbackDetails.name}!`);
      feedbackForm.reset();
    });
  }

  // Custom Order Form saving to localStorage
  const customOrderForm = document.getElementById('customOrderForm');
  if (customOrderForm) {
    customOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('customerName');
      const titleInput = document.getElementById('bookTitle');
      const genreInput = document.getElementById('genre');
      const notesInput = document.getElementById('notes');
      const confirmation = document.getElementById('orderConfirmation');

      if (nameInput && titleInput && confirmation) {
        const orderDetails = {
          name: nameInput.value,
          title: titleInput.value,
          genre: genreInput?.value || '',
          notes: notesInput?.value || ''
        };

        localStorage.setItem('customOrder', JSON.stringify(orderDetails));

        alert(`Thank you, ${orderDetails.name}! We've received your request for "${orderDetails.title}".`);

        confirmation.innerHTML = `<p>Thank you, ${orderDetails.name}! We've received your request for <strong>${orderDetails.title}</strong>.</p>`;
        customOrderForm.reset();
      }
    });
  }

  // Collaboration Form (alert only)
  const collabForm = document.getElementById('collabForm');
  if (collabForm) {
    collabForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('partnerName').value;
      const email = document.getElementById('partnerEmail').value;
      const details = document.getElementById('partnershipDetails').value;
      alert(`Thanks ${name}! We received your proposal and will follow up at ${email}.`);
      collabForm.reset();
    });
  }
});

// Clear Cart Function (clear both storages)
function clearCart() {
  localStorage.removeItem('cart');
  sessionStorage.removeItem('cart');
  alert("Cart cleared.");
  location.reload();
}

// Process Order Function (save lastOrder, clear cart from both)
function processOrder() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  localStorage.setItem('lastOrder', JSON.stringify(cart));
  sessionStorage.setItem('lastOrder', JSON.stringify(cart));

  alert("Thank you for your order.");

  localStorage.removeItem('cart');
  sessionStorage.removeItem('cart');

  location.reload();
}
