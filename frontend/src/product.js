
const fetchProducts = async () => {
    const res = await fetch('/api/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await res.json()
    console.log("Data fetched:",data)
    return data.data
}

export default fetchProducts;