const apiUrl = `https://striveschool-api.herokuapp.com/api/product`
const tokenApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTYyNGU5OTIxMDU5ZjAwMTVlMjNhMGEiLCJpYXQiOjE3ODQ4Mjc1NDUsImV4cCI6MTc4NjAzNzE0NX0.hU2-WP90xDW0IybVUNXNyMVLGle1Jog_qy0doYLJRkg'

//getElement
const inputSearch = document.getElementById("input-search")
const btnSearch = document.getElementById("btn-search")
const containerCards = document.getElementById('container-cards')
const containerFilters = document.getElementById('container-filters')

let allProducts = []

//fetch GET
const getProducts = async () => {
    try {
        const result = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${tokenApi}`
            }
        })
        const data = await result.json()
        allProducts = data
        displayProducts(allProducts)
        displayFilters(allProducts)
    } catch (e) {
        console.log(e)
    }
}
getProducts()

//creazione card prodotti
const createCardProduct = ({ name, price, imageUrl, brand, _id }) => {
    const colCard = document.createElement('div')
    colCard.setAttribute('class', 'col-12 col-md-6 col-lg-4 my-3')

    const cardProduct = document.createElement('div')
    cardProduct.classList.add('card', 'd-flex', 'border-0', 'rounded-0')
    colCard.appendChild(cardProduct)

    const cardImg = document.createElement('img')
    cardImg.classList.add('card-img-top', 'img-fluid', 'w-100', 'object-fit-cover')
    cardImg.style.height = '250px'
    cardImg.src = imageUrl
    cardImg.alt = name

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body', 'ps-1', 'pb-0')


    const cardBrand = document.createElement('span')
    cardBrand.classList.add('card-text', 'text-dark')
    cardBrand.style.fontSize = 'small'
    cardBrand.style.fontWeight = '300'
    cardBrand.innerText = brand

    const cardName = document.createElement('h5')
    cardName.classList.add('card-title', 'text-warning', 'mb-1')
    cardName.style.fontSize = 'medium'
    cardName.style.fontWeight = '400'
    cardName.innerText = name

    const cardPrice = document.createElement('span')
    cardPrice.classList.add('card-text', 'text-dark')
    cardPrice.innerText = `€ ${price}`
    cardPrice.style.fontWeight = '200'

    const cardFooter = document.createElement('div')
    cardFooter.classList.add('ps-1', 'pt-2')

    const cardInfoBtn = document.createElement('a')
    cardInfoBtn.classList.add('btn', 'ps-0', 'border-0')
    cardInfoBtn.innerHTML = `<ion-icon name="information-circle-outline"></ion-icon>`
    cardInfoBtn.href = `details.html?id=${_id}`
    const cardPayBtn = document.createElement('button')
    cardPayBtn.classList.add('btn', 'border-0')
    cardPayBtn.innerHTML = `<ion-icon name="bag-add-outline"></ion-icon>`



    cardBody.append(cardBrand, cardName, cardPrice)

    cardFooter.append(cardInfoBtn, cardPayBtn)

    cardProduct.append(cardImg, cardBody, cardFooter)

    return colCard
}

//mostra prodotti
const displayProducts = (products) => {
    containerCards.innerHTML = ""
    if (products.length === 0) {
        containerCards.innerHTML = `<p>No products</p>`
        return
    }
    const productsCol = products.map(product => createCardProduct(product))
    containerCards.append(...productsCol)
}

//ricerca prodotti al click
btnSearch.addEventListener('click', (e) => {
    e.preventDefault()
    searchProducts()
})
//cerca prodotti all'input inserito
inputSearch.addEventListener('input', (e) => {
    e.preventDefault()
    searchProducts()
})
//filtra e mostra i prodotti 
const searchProducts = () => {
    const productSearch = inputSearch.value.trim().toLowerCase()
    const productFiltered = allProducts.filter(product => {
        return product.name.toLowerCase().includes(productSearch)
    })
    displayProducts(productFiltered)
}
// crea le checkbox con i nomi dei Brand
const createFiltersCheckbox = (brand) => {
    // <div class="form-check">
    //   <input class="form-check-input" type="radio" name="radioDefault" id="radioDefault1">
    //   <label class="form-check-label" for="radioDefault1">
    //     Default radio
    //   </label>
    // </div>
    const colFilter = document.createElement('div')
    colFilter.classList.add('row','mt-3','ps-3')

    const formFilter = document.createElement('div')
    formFilter.classList.add('form-check')
    
    const inputFilter = document.createElement('input')
    inputFilter.classList.add('form-check-input')
    inputFilter.setAttribute('type','radio')
    inputFilter.setAttribute('name','inputFilterBrand')
    inputFilter.setAttribute('id','inputFilterBrand')

    const labelFilter = document.createElement('label')
    labelFilter.classList.add('form-check-label')
    labelFilter.setAttribute('for','inputFilterBrand')
    labelFilter.innerText= brand

    formFilter.append(inputFilter,labelFilter)
    colFilter.appendChild(formFilter)
    return colFilter
}
// mostrare filtri Brand
const displayFilters = (products)=>{
    containerFilters.innerText=''
    const allBrands = products.map(product=>product.brand).filter(Boolean)
    const uniqueBrands =[...new Set(allBrands)]
    const filtersCol = uniqueBrands.map(brand => createFiltersCheckbox(brand))
    containerFilters.append(...filtersCol)
}