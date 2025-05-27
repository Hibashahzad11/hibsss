// Get the cart items from localStorage, or initialize as empty array if none
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Get reference to the cart items list element
const cartList = document.getElementById('cart-items');

// Get reference to the total price display element
const totalSpan = document.getElementById('total');

// Function to display the cart items on the page
function displayCart() {
    // Clear the current list display
    cartList.innerHTML = '';
    // Initialize total price to zero
    let total = 0;

    // Loop through each item in the cart
    cartItems.forEach((item, index) => {
        // Create a new list item element
        const li = document.createElement('li');
        // Set the text content to show item name and price
        li.textContent = `${item.name} - AED ${item.price.toFixed(2)}`;

        // Create a "Remove" button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        // Add left margin to the button for spacing
        removeBtn.style.marginLeft = '10px';
        // Set the button click event to remove this item
        removeBtn.onclick = function () {
            removeFromCart(index);
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);
        // Append the list item to the cart list in the DOM
        cartList.appendChild(li);
        // Add the item price to the total
        total += item.price;
    });

    // Update the total price display
    totalSpan.textContent = total.toFixed(2);
}

// Function to remove an item from the cart
function removeFromCart(index) {
    // Remove the item from the cartItems array
    cartItems.splice(index, 1);
    // Update the localStorage with the new cart data
    localStorage.setItem('cart', JSON.stringify(cartItems));
    // Refresh the cart display
    displayCart();
}

// Function to add a new item to the cart
function addToCart(name, price) {
    // Push the new item (name and price) into the cartItems array
    cartItems.push({ name, price });
    // Update localStorage with the new cart data
    localStorage.setItem('cart', JSON.stringify(cartItems));
    // Show alert that item was added
    alert(`${name} added to cart!`);
    // Refresh the cart display
    displayCart();
}

// Function to handle placing the order
function placeOrder() {
    // Get customer name input value and trim whitespace
    const name = document.getElementById('name').value.trim();
    // Get customer phone input value and trim whitespace
    const phone = document.getElementById('phone').value.trim();
    // Get customer address input value and trim whitespace
    const address = document.getElementById('address').value.trim();
    // Get optional notes input value and trim whitespace
    const notes = document.getElementById('notes').value.trim();

    // Check if required fields are filled
    if (!name || !phone || !address) {
        alert('Please fill in all required fields.');
        return; // Stop if any required field is missing
    }

    // Show confirmation alert with order details
    alert(`Thank you, ${name}! Your order has been placed.\nTotal: AED ${totalSpan.textContent}\nItems: ${cartItems.map(i => i.name).join(', ')}`);

    // Clear the cart from localStorage
    localStorage.removeItem('cart');
    // Reset the cartItems array
    cartItems = [];
    // Refresh the cart display
    displayCart();
    // Reset the order form fields
    document.getElementById('order-form').reset();
}

// Display the cart items when the page first loads
displayCart();

/// Add event listener to handle review form submission (only if reviewForm exists)
const reviewForm = document.getElementById("reviewForm");
if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const message = document.getElementById("message").value;
        const ratingInput = document.querySelector('input[name="rating"]:checked');

        if (!ratingInput) {
            alert("Please select a rating.");
            return;
        }

        const rating = ratingInput.value;
        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

        alert("Thank you for your review.");

        const reviewDiv = document.createElement("div");
        reviewDiv.classList.add("review");
        reviewDiv.innerHTML = `
            <h3>${name}</h3>
            <div class="star-display">${stars}</div>
            <p>${message}</p>
        `;

        const reviewList = document.getElementById("reviewList");
        reviewList.prepend(reviewDiv);

        reviewForm.reset();
    });
}

// Function to handle menu search
function searchMenu() {
    // Get the search term input and convert to lowercase
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    // Get all menu item elements
    const menuItems = document.querySelectorAll('.menu-item');
    // Flag to track if any match is found
    let found = false;
    // Loop through each menu item
    menuItems.forEach(item => {
        // Get the text content of the item, in lowercase
        const itemText = item.textContent.toLowerCase();
        // Check if search term is not empty and matches item text
        if (searchTerm !== "" && itemText.includes(searchTerm)) {
            // Show the item if it matches
            item.style.display = 'block';
            found = true;
        } else {
            // Hide the item if it does not match
            item.style.display = 'none';
        }
    });
    // If no match was found and search term is not empty, show alert
    if (!found && searchTerm !== "") {
        alert('No matching dishes found!');
    }
}
