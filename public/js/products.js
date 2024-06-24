const socket = io();

function updateProductsList ( products ) {
  const productList = document.querySelector( '.products-list' );
  productList.innerHTML = '';

  products.forEach( ( product ) => {
    productList.innerHTML += `
          <li class='product-item' data-id='${product._id}'>
              <img src='${product.thumbnails[ 0 ]}' alt='Image of ${product.title}' class='product-item__image' />
              <div class='product-item__body'>
                  <p class='ff-secondary fs-2 ls-1'>${product.title}</p>
                  <p>${product.category}</p>
                  <p>${product.shortDescription}</p>
                  <p>Price: ${product.price}</p>
              </div>
              <div class='product-item__buttons'>
                  <button class='btn-addToCart ff-secondary fs-2'>Add to Cart</button>
              </div>
          </li>
      `;
  } );
}
socket.on( 'update-products', updateProductsList );