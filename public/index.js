const API = {
  products: '/api/products',
  categories: '/api/categories',
  byCategory: (categoryId) => `/api/categories/${categoryId}/products`,
  search: (name) => `/api/products/search?name=${encodeURIComponent(name)}`
}

window.API = API




async function renderProducts(products) {

  const productGrid = document.getElementById('productGrid')
  const productsLoading = document.getElementById('productsLoading')
  const productsEmpty = document.getElementById('productsEmpty')

  productGrid.innerHTML = ''
  productsLoading.hidden = true

  if (!products.length) {
    productsEmpty.hidden = false
    return
  }

  productsEmpty.hidden = true

  products.forEach((product) => {
    const productCard = document.createElement('div')
    productCard.className = 'product-card'
    productCard.innerHTML = `
    <div class="product-image">
    <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-info">
    <h3>${product.name}</h3>
    <p class="product-desc">${product.description}</p>
    <div class="price-row">
    <span class="buy-price">Buy: ${product.buy_price} BDT</span>
    <span class="sale-price">Sale: ${product.sale_price} BDT</span>
    </div>
    <span class="stock">Stock: ${product.stock}</span>
    <div class="card-actions">
    <button type="button" class="add-cart-btn">Add to Cart</button>
    </div>
      </div>
      `
    productGrid.appendChild(productCard)
  })

}

async function AllProductsButton() {
  const categoryRow = document.getElementById('categoryRow')
  categoryRow.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return

    const categoryId = e.target.dataset.category

    categoryRow.querySelectorAll('.category-chip').forEach((button) => {
      button.classList.remove('active')
    })
    e.target.classList.add('active')

    if (!categoryId) {
      getProductUI()
      return
    }

    getProductBYCategory(categoryId)
  })
}


async function getProductUI() {
  const response = await fetch(API.products)
  const products = await response.json()
  renderProducts(products)
  return products
}


async function fetchCategories() {
  const response = await fetch(API.categories)
  const categories = await response.json()
  const categoryRow = document.getElementById('categoryRow')
  categoryRow.innerHTML = ''

  const allButton = document.createElement('button')
  allButton.textContent = 'All'
  allButton.className = 'category-chip active'
  allButton.dataset.category = ''
  allButton.type = 'button'
  categoryRow.appendChild(allButton)
  categories.forEach((category) => {
    const button = document.createElement('button')
    button.textContent = category.name
    button.className = 'category-chip'
    button.dataset.category = category.id
    
    categoryRow.appendChild(button)
  })
  return categories
}

async function getProductBYCategory(categoryId) {
  const response = await fetch(API.byCategory(categoryId))
  const products = await response.json()
  renderProducts(products)
}

async function searchProducts() {
  const shopSearch = document.getElementById('shopSearch')
  shopSearch.addEventListener('input', async (e) => {
    const name = e.target.value
    if (!name) return getProductUI()
    const response = await fetch(API.search(name))
    const products = await response.json()
    renderProducts(products)
  })
}

fetchCategories()
getProductUI()
AllProductsButton()
searchProducts()
