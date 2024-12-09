// declaracao inicial
const productList = document.getElementById('product-list')
const filterInput = document.getElementById('filter-input')
let products = []

// função para consumo da API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/')
        products = await response.json()
        displayProducts(products)
    } catch (error) {
        productList.innerHTML = '<p>Erro ao carregar os produtos. Tente novamente.</p>'
    }
}

// função para exibir produtos
function displayProducts(filteredProducts) {
    productList.innerHTML = ""
    if (filteredProducts.length === 0) {
      productList.innerHTML = "<p>Nenhum produto encontrado.</p>"
      return;
    }
  
    filteredProducts.forEach((product) => {
      const productElement = document.createElement("div")
      productElement.className = "product"
  
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <div class="product-details">
          <strong>${product.title}</strong>
          <span>Categoria: ${product.category}</span>
          <span>Preço: $${product.price.toFixed(2)}</span>
        </div>
      `
  
      productList.appendChild(productElement)
    })
  }

filterInput.addEventListener('input', () => {
    const searchTerm = filterInput.value.toLowerCase()
    const filtered = products.filter((product) => {
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    })
    displayProducts(filtered)
})

fetchProducts()