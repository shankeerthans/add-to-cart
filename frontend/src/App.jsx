import fetchProducts from "./product.js";
import {useEffect, useState} from "react";
import {VStack, Heading, SimpleGrid, Box, Text, Button, Container} from "@chakra-ui/react";
import {Toaster, toaster} from './components/ui/toaster.jsx'

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleAddProduct = (product) => {
        toaster.create({
            title: `${product.name} Added to Cart!`,
            status: "success",
            }
        )
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await fetchProducts();
                setProducts(products);
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])
        if (loading) {
            return (
                <></>
            )
        } else {
            return (
            <Container maxW="container.xl">
                <Toaster />
                <VStack padding="100px" verticalAlign="middle" spacing={12} >
                    <Heading>Product List</Heading>
                    <SimpleGrid columns={2} gap="40px">
                        {products.map(product => (
                            <VStack spacing={2} key={product.id}>
                            <Box rounded={'lg'}
                                 key={product.id}
                                 bg={'blackAlpha.500'}
                                 height={'100px'}
                                 width={'150px'}
                                 alignContent={'center'}
                            >
                                <VStack spacing={2}>
                                    <Text>{product.name}</Text>
                                    <Text>{product.price}</Text>
                                </VStack>
                            </Box>
                            <Button color='white' onClick={() => handleAddProduct(product)}>add to cart</Button>
                            </VStack>
                        ))}
                    </SimpleGrid>

                </VStack>
            </Container>
            )
        }
}

export default App
