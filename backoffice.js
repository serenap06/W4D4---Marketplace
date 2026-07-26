const productRow = document.getElementById('product-row')
const nameProduct = document.getElementById('name')
const priceProduct = document.getElementById('price')
const imageUrlProduct = document.getElementById('imgUrl')
const brandProduct = document.getElementById('brand')
const descriptionProduct = document.getElementById('description')
const addProductBtn = document.getElementById('add-btn')

const editName = document.getElementById('editName')
const editPrice = document.getElementById('editPrice')
const editImgUrl = document.getElementById('editImgUrl')
const editBrand = document.getElementById('editBrand')
const editDescription = document.getElementById('editDescription')
const editBtn = document.getElementById('edit-btn')

let currentEditId = null
const apiUrl = 'https://striveschool-api.herokuapp.com/api/product'
const tokenApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTYyNGU5OTIxMDU5ZjAwMTVlMjNhMGEiLCJpYXQiOjE3ODQ4Mjc1NDUsImV4cCI6MTc4NjAzNzE0NX0.hU2-WP90xDW0IybVUNXNyMVLGle1Jog_qy0doYLJRkg'
//FETCH
const getProducts = async () => {
    try {
        const result = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${tokenApi}`
            }
        })
        const data = await result.json()
        displayTableProducts(data)
    } catch (e) {
        console.log(e)
    }
}
getProducts()

// funzione riga prodotto
const createProductRow = ({ name, price, imageUrl, brand, description, _id }) => {
    const trProduct = document.createElement('tr')

    const tdName = document.createElement('td')
    tdName.innerText = name //title>name

    const tdPrice = document.createElement('td')
    tdPrice.innerText = `€ ${price}`

    const tdImage = document.createElement('td')

    const imgProduct = document.createElement('img')
    imgProduct.classList.add('img-fluid')
    imgProduct.src = imageUrl //image>imageUrl
    imgProduct.style.width = "50px"
    imgProduct.style.height = "50px"
    tdImage.appendChild(imgProduct)
    const tdBrand = document.createElement('td')
    tdBrand.innerText = brand //category>brand

    const tdDescription = document.createElement('td')
    tdDescription.innerText = description
    tdDescription.classList.add('w-50')
    const tdButtons = document.createElement('td')
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = `<i class="bi bi-trash3"></i>`
    deleteBtn.classList.add('btn')
    const openEditModalBtn = document.createElement('button')
    openEditModalBtn.innerHTML = `<i class="bi bi-pencil-square"></i>`
    openEditModalBtn.classList.add('btn')
    openEditModalBtn.setAttribute('data-bs-toggle', 'modal')
    openEditModalBtn.setAttribute('data-bs-target', '#editForm')
    tdButtons.append(deleteBtn, openEditModalBtn)


    console.log(_id)
    // addEventListener
    deleteBtn.addEventListener('click', () => {
        deleteProduct(_id)
    })

    openEditModalBtn.addEventListener('click', () => {
        currentEditId = _id
        populateEditProductForm(_id)
    })

    trProduct.append(tdName, tdPrice, tdImage, tdBrand, tdDescription, tdButtons)
    return trProduct
}

editBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (currentEditId) {
        editProduct(currentEditId, generateEditProductPayload())
        const modalForm = document.getElementById('editForm')
        const modalInstance = bootstrap.Modal.getInstance(modalForm)
        if (modalInstance) {
            modalInstance.hide()
        }
    }
})

// funzione creazione HTML

const displayTableProducts = (products) => {
    productRow.innerHTML = ''
    const productRows = products.map(product => createProductRow(product))
    productRow.append(...productRows)
}

//funzione aggiungi prodotto

addProductBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const payLoad = {
        name: nameProduct.value,
        price: priceProduct.value,
        imageUrl: imageUrlProduct.value,
        brand: brandProduct.value,
        description: descriptionProduct.value,
    }
    addProduct(payLoad)
        .then(res => console.log(res))
})

// funzione POST 

const addProduct = async (product) => {
    try {
        const data = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${tokenApi}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        return await data.json()
    } catch (e) {
        console.log(e)
    } finally {
        getProducts()
    }
}

// funzione eliminare prodotto
const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${tokenApi}`
                }
            }
        )
        return await response.json()
    } catch (e) {
        console.log(e)
    } finally {
        getProducts()
    }
}

const getSingleProduct = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${tokenApi}`
                }
            }
        )
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}
getSingleProduct('6a6256fd89db1e00155da322')
    .then(res => console.log(res))

const populateEditProductForm = async (id) => {
    const productData = await getSingleProduct(id)

    editName.value = productData.name
    editPrice.value = productData.price
    editImgUrl.value = productData.imageUrl
    editBrand.value = productData.brand
    editDescription.value = productData.description
}

const editProduct = async (id, payLoad) => {
    try {
        const response = await fetch(`${apiUrl}/${id}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${tokenApi}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payLoad)
            })
        return await response.json()
    } catch (error) {
        console.log(error)
    } finally {
        getProducts()

    }
}

const generateEditProductPayload = () => {
    return {
        name: editName.value,
        price: editPrice.value,
        imageUrl: editImgUrl.value,
        brand: editBrand.value,
        description: editDescription.value
    }
}

