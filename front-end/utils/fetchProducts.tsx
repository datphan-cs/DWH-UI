export const fetchProducts = async () => {
    const res = await fetch(
        "localhost:8000/items"
    );

    const data = await res.json();
    const products: Product[] = data.items;

    return products;
};