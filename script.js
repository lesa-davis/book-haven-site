document.addEventListener('DOMContentLoaded', () => {
  // Subscribe Form
  const subscribeForm = document.getElementById('subscribeForm');
  const subscriberEmail = document.getElementById('subscriberEmail');
  if (subscribeForm && subscriberEmail) {
    const savedEmail = sessionStorage.getItem('subscriberEmail');
    if (savedEmail) subscriberEmail.value = savedEmail;

    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = subscriberEmail.value;
      sessionStorage.setItem('subscriberEmail', email);
      alert(`Thank you for subscribing, ${email}!`);
      subscribeForm.reset();
    });
  }

  // Add to Cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        const bookTitle = button.getAttribute('data-title');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(bookTitle);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Item has been added. Please proceed to checkout.");
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

  // Cart Page View
  const cartItemsContainer = document.getElementById('cartItems');
  if (cartItemsContainer) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = cart.length === 0
      ? '<p>Your cart is empty.</p>'
      : `<ul>${cart.map(item => `<li>${item}</li>`).join('')}</ul>
         <button onclick="clearCart()">Clear Cart</button>
         <button onclick="processOrder()">Process Order</button>`;
  }

  // Feedback Form
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackText = document.getElementById('feedbackText');
  if (feedbackForm && feedbackText) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thanks for your feedback!');
      feedbackForm.reset();
    });
  }

  // Custom Order Form
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
        sessionStorage.setItem('customOrder', JSON.stringify(orderDetails));
        confirmation.innerHTML = `<p>Thank you, ${orderDetails.name}! We've received your request for <strong>${orderDetails.title}</strong>.</p>`;
        customOrderForm.reset();
      }
    });
  }

  // Collaboration Form
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

function clearCart() {
  localStorage.removeItem('cart');
  alert("Cart cleared.");
  location.reload();
}

function processOrder() {
  alert("Thank you for your order.");
  localStorage.removeItem('cart');
  location.reload();
}

window.addEventListener('beforeunload', () => {
  sessionStorage.clear();
});
