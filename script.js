document.addEventListener('DOMContentLoaded', () => {
    // 1. Product Data (Simulated)
    const productData = {
        id: 'TSHIRT001',
        name: 'Awesome Cotton T-Shirt',
        description: 'Our classic cotton t-shirt, made from 100% premium organic cotton. Soft, breathable, and perfect for everyday wear. Available in multiple colors and sizes.',
        variants: [
            {
                color: 'blue',
                size: 'S',
                price: 24.99,
                sku: 'TSHIRT-BLUE-S',
                images: { front: 'images/tshirt-blue-front.webp', back: 'images/tshirt-blue-back.webp' }
            },
            {
                color: 'blue',
                size: 'M',
                price: 24.99,
                sku: 'TSHIRT-BLUE-M',
                images: { front: 'images/tshirt-blue-front.webp', back: 'images/tshirt-blue-back.webp' }
            },
            {
                color: 'blue',
                size: 'L',
                price: 24.99,
                sku: 'TSHIRT-BLUE-L',
                images: { front: 'images/tshirt-blue-front.webp', back: 'images/tshirt-blue-back.webp' }
            },
            {
                color: 'blue',
                size: 'XL',
                price: 26.99, // Slightly higher price for XL
                sku: 'TSHIRT-BLUE-XL',
                images: { front: 'images/tshirt-blue-front.webp', back: 'images/tshirt-blue-back.webp' }
            },
            {
                color: 'red',
                size: 'S',
                price: 24.99,
                sku: 'TSHIRT-RED-S',
                images: { front: 'images/tshirt-red-front.webp', back: 'images/tshirt-red-back.webp' }
            },
            {
                color: 'red',
                size: 'M',
                price: 24.99,
                sku: 'TSHIRT-RED-M',
                images: { front: 'images/tshirt-red-front.webp', back: 'images/tshirt-red-back.webp' }
            },
            {
                color: 'red',
                size: 'L',
                price: 24.99,
                sku: 'TSHIRT-RED-L',
                images: { front: 'images/tshirt-red-front.webp', back: 'images/tshirt-red-back.webp' }
            },
            {
                color: 'red',
                size: 'XL',
                price: 26.99,
                sku: 'TSHIRT-RED-XL',
                images: { front: 'images/tshirt-red-front.webp', back: 'images/tshirt-red-back.webp' }
            },
            {
                color: 'green',
                size: 'S',
                price: 25.99,
                sku: 'TSHIRT-GREEN-S',
                images: { front: 'images/tshirt-green-front.webp', back: 'images/tshirt-green-back.webp' }
            },
            {
                color: 'green',
                size: 'M',
                price: 25.99,
                sku: 'TSHIRT-GREEN-M',
                images: { front: 'images/tshirt-green-front.webp', back: 'images/tshirt-green-back.webp' }
            },
            // Add more variants as needed
        ]
    };

    // 2. Get DOM Elements
    const mainProductImage = document.getElementById('main-product-image');
    const currentPriceSpan = document.getElementById('current-price');
    const productSKUSpan = document.getElementById('product-sku');
    const colorOptionsDiv = document.getElementById('color-options');
    const sizeOptionsDiv = document.getElementById('size-options');
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');
    const quantityInput = document.getElementById('quantity');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const cartCountSpan = document.getElementById('cart-count');

    // 3. State Variables
    let selectedColor = 'blue'; // Default selected color
    let selectedSize = 'S';     // Default selected size
    let selectedImageSrc = 'front'; // Default image view

    // 4. Helper Function to Update Product Display
    function updateProductDisplay() {
        // Find the matching variant
        const matchingVariant = productData.variants.find(variant =>
            variant.color === selectedColor && variant.size === selectedSize
        );

        if (matchingVariant) {
            // Update main image (based on current view: front/back)
            mainProductImage.src = matchingVariant.images[selectedImageSrc];
            mainProductImage.alt = `${productData.name} ${selectedColor} ${selectedImageSrc}`;

            // Update price
            currentPriceSpan.textContent = matchingVariant.price.toFixed(2);

            // Update SKU
            productSKUSpan.textContent = matchingVariant.sku;

            // Update active state for thumbnails
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
                if (thumb.dataset.color === selectedColor && thumb.dataset.view === selectedImageSrc) {
                    thumb.classList.add('active');
                }
            });

        } else {
            // Handle case where variant doesn't exist (e.g., disable add to cart, show out of stock)
            currentPriceSpan.textContent = 'N/A';
            productSKUSpan.textContent = 'OUT OF STOCK';
            mainProductImage.src = 'images/unavailable.webp'; // Placeholder for unavailable
            console.warn(`Variant not found for Color: ${selectedColor}, Size: ${selectedSize}`);
        }
    }

    // 5. Event Listeners for Color Selection
    colorOptionsDiv.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('color-swatch')) {
            // Remove active class from all color swatches
            document.querySelectorAll('.color-swatch').forEach(swatch => swatch.classList.remove('active'));
            // Add active class to the clicked swatch
            target.classList.add('active');
            // Update selected color state
            selectedColor = target.dataset.color;
            // Update display
            updateProductDisplay();
            // Also update thumbnails based on new color
            updateThumbnailsForColor(selectedColor);
        }
    });

    // Function to update thumbnail gallery based on selected color
    function updateThumbnailsForColor(color) {
        thumbnailGallery.innerHTML = ''; // Clear existing thumbnails
        const colorVariants = productData.variants.filter(v => v.color === color);
        
        // Use a Set to get unique image views for the current color
        const uniqueImageViews = new Set();
        colorVariants.forEach(v => {
            if (v.images.front) uniqueImageViews.add('front');
            if (v.images.back) uniqueImageViews.add('back');
            // Add other views like 'side' etc. if they exist in your data
        });

        uniqueImageViews.forEach(view => {
            const variantWithImage = colorVariants.find(v => v.images[view]);
            if (variantWithImage) {
                const img = document.createElement('img');
                img.src = variantWithImage.images[view];
                img.alt = `Thumbnail ${color} ${view}`;
                img.classList.add('thumbnail');
                img.dataset.color = color;
                img.dataset.view = view;
                thumbnailGallery.appendChild(img);
            }
        });
        // Re-attach thumbnail event listeners after updating gallery
        attachThumbnailListeners();
        // Ensure the active thumbnail is set
        updateProductDisplay(); // This will handle setting the active class
    }

    // 6. Event Listeners for Size Selection
    sizeOptionsDiv.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('size-button')) {
            // Remove active class from all size buttons
            document.querySelectorAll('.size-button').forEach(button => button.classList.remove('active'));
            // Add active class to the clicked button
            target.classList.add('active');
            // Update selected size state
            selectedSize = target.dataset.size;
            // Update display
            updateProductDisplay();
        }
    });

    // 7. Event Listener for Thumbnail Clicks
    function attachThumbnailListeners() {
        document.querySelectorAll('.thumbnail').forEach(thumbnail => {
            thumbnail.removeEventListener('click', handleThumbnailClick); // Prevent duplicate listeners
            thumbnail.addEventListener('click', handleThumbnailClick);
        });
    }

    function handleThumbnailClick(event) {
        const target = event.target;
        if (target.classList.contains('thumbnail')) {
            // Update selected image source view
            selectedImageSrc = target.dataset.view;
            // Update main image and active thumbnail
            updateProductDisplay();
        }
    }


    // 8. Add to Cart Logic
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        if (isNaN(quantity) || quantity <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }

        const matchingVariant = productData.variants.find(variant =>
            variant.color === selectedColor && variant.size === selectedSize
        );

        if (matchingVariant) {
            // Retrieve current cart from localStorage or initialize if empty
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if item already exists in cart
            const existingItemIndex = cart.findIndex(item =>
                item.sku === matchingVariant.sku
            );

            if (existingItemIndex > -1) {
                // Update quantity of existing item
                cart[existingItemIndex].quantity += quantity;
            } else {
                // Add new item to cart
                cart.push({
                    id: productData.id,
                    name: productData.name,
                    color: matchingVariant.color,
                    size: matchingVariant.size,
                    price: matchingVariant.price,
                    sku: matchingVariant.sku,
                    quantity: quantity,
                    image: matchingVariant.images.front // Use front image for cart display
                });
            }

            // Save updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update cart count display
            updateCartCountDisplay();
            alert(`${quantity} x ${productData.name} (${matchingVariant.color}, ${matchingVariant.size}) added to cart!`);
        } else {
            alert('This product variant is currently unavailable.');
        }
    });

    // 9. Update Cart Count Display
    function updateCartCountDisplay() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountSpan.textContent = totalItems;
    }

    // Initial load: Set up default selection and display
    function initializeProductPage() {
        // Ensure initial active classes are set for default color/size
        document.querySelector(`.color-swatch[data-color="${selectedColor}"]`).classList.add('active');
        document.querySelector(`.size-button[data-size="${selectedSize}"]`).classList.add('active');

        // Initial update of thumbnails based on default color
        updateThumbnailsForColor(selectedColor);
        // Initial update of product display
        updateProductDisplay();
        // Update cart count on page load
        updateCartCountDisplay();
    }

    initializeProductPage(); // Call the initialization function
});
