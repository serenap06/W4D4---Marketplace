const apiUrl = `https://striveschool-api.herokuapp.com/api/product`
const tokenApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTYyNGU5OTIxMDU5ZjAwMTVlMjNhMGEiLCJpYXQiOjE3ODQ4Mjc1NDUsImV4cCI6MTc4NjAzNzE0NX0.hU2-WP90xDW0IybVUNXNyMVLGle1Jog_qy0doYLJRkg'

//getElement
const inputSearch = document.getElementById("input-search")
const btnSearch = document.getElementById("btn-search")
const containerCards = document.getElementById('container-cards')

let allProducts = []

const getProducts = async () => {
    try {
        const result = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${tokenApi}`
            }
        })
        const data = await result.json()
        allProducts = data
        displayProductsCol(data)
    } catch (e) {
        console.log(e)
    }
}
getProducts()


const createCardProduct = ({ name, price, imageUrl, brand, _id }) => {

    /* <div class="card" style="width: 18rem;">
         <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
        <p class="card-text">
         <h5 class="card-title">Card title</h5>
         <a href="#" class="btn btn-primary">Go somewhere</a>
         <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div> */

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

const displayProductsCol = (products) => {
    containerCards.innerHTML = ""
    if (products.length===0){
        containerCards.innerHTML=`<p>No products</p>`
        return
    }
    const productsCol = products.map(product => createCardProduct(product))
    containerCards.append(...productsCol)
}

//funzione che cerca i prodotti

btnSearch.addEventListener('click', (e) => {
    e.preventDefault()
    searchProducts()
})

inputSearch.addEventListener('input',(e)=>{
    e.preventDefault()
    searchProducts()
})

const searchProducts = ()=>{
    const productSearch = inputSearch.value.trim().toLowerCase()
    const productFiltered = allProducts.filter(product => {
       return product.name.toLowerCase().includes(productSearch)
    })
    displayProductsCol(productFiltered)
}