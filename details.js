const params = new URLSearchParams(location.search)
const id = params.get('id')

const apiUrl = `https://striveschool-api.herokuapp.com/api/product/${id}`
const tokenApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTYyNGU5OTIxMDU5ZjAwMTVlMjNhMGEiLCJpYXQiOjE3ODQ4Mjc1NDUsImV4cCI6MTc4NjAzNzE0NX0.hU2-WP90xDW0IybVUNXNyMVLGle1Jog_qy0doYLJRkg'

const productName = document.getElementById('product-name')
const productBrand = document.getElementById('product-brand')
const productPrice = document.getElementById('product-price')
const productDescription = document.getElementById('product-description')
const productImage = document.getElementById('product-image')



const getDetailsProduct = async (id) => {
    try {
        const result = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${tokenApi}`
            }
        })
        const product = await result.json()
        console.log(product)
        productName.innerText = product.name
        productBrand.innerText = product.brand
        productPrice.innerText = `€ ${product.price}`
        productDescription.innerText = product.description
        productImage.src = product.imageUrl
    } catch (error) {
        console.log(error)
    }
}

getDetailsProduct(id)