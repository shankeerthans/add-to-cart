import fetchProducts from "./product.js";
import {useEffect, useState} from "react";
import {VStack, Heading, SimpleGrid, Box, Text, Button, Container, Icon, Badge, HStack} from "@chakra-ui/react";
import {Toaster, toaster} from './components/ui/toaster.jsx'
import {FaShoppingCart} from "react-icons/fa";

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleAddProduct = (product) => {
        addToCart()
        toaster.create({
            title: `${product.name} added to Cart!`,
            type: "success",
            }
        )
    }
    const [cartCount, setCartCount] = useState(0);

    const addToCart = () => {
        setCartCount(cartCount + 1);
    };
    const [color1, color2] = ['#02AABD', '#00CDAC']

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
            <Container h="70vh" w="200vh" maxW="none">
                <Toaster />
                <VStack gap={10}>
                   <HStack gap={10}>
                    <Heading fontSize={'4xl'} fontWeight='bold' bgGradient="to-r" gradientFrom={color1} gradientTo={color2} bgClip={'text'}>Product List</Heading>
                       <Box position="relative" display="inline-block">
                           <FaShoppingCart size='32' color={color2} />
                           {cartCount > 0 && (
                               <Badge
                                   position="absolute"
                                   top="-2"
                                   right="-3"
                                   bg="red.500"
                                   color="white"
                                   rounded="full"
                                   px="2"
                               >
                                   {cartCount}
                               </Badge>
                           )}
                       </Box>
                   </HStack>
                    <SimpleGrid columns={2} gap="50px">
                        {products.map(product => (
                            <VStack gap={2} key={product.id}>
                            <Box rounded={'lg'}
                                 key={product.id}
                                 bgGradient="to-r" gradientFrom={color1} gradientTo={color2}
                                 height={'100px'}
                                 width={'240px'}
                                 alignContent={'center'}
                            >
                                <VStack p={4} align={'left'} spacing={2}>
                                    <Text fontWeight={'bold'}>Product: {product.name}</Text>
                                    <Text fontWeight={'bold'}>Price: {product.price}</Text>
                                </VStack>
                            </Box>
                            <Button fontWeight={'bold'} bg={color2} color='white' onClick={() => handleAddProduct(product)}>add to cart</Button>
                            </VStack>
                        ))}
                    </SimpleGrid>

                </VStack>
            </Container>
            )
        }
}

export default App
