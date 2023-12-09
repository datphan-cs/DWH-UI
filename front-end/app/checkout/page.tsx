"use client";
import Head from "next/head";
import Header from "../components/Header";
// import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { selectBasketItems, selectBasketTotal } from "../../redux/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Product from "../components/Product";

function Checkout() {
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const router = useRouter();
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
        {} as { [key: string]: Product[] }
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.productId] = results[item.productId] || []).push(item);
            return results;
        }, {} as { [key: string]: Product[] });

        setGroupedItemsInBasket(groupedItems);
    }, [items]);

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/items/recommendation', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "itemList": items.map(item => item.productId),
                "pageBy": 10
            }), // body data type must match "Content-Type" header
        })
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    return (
        <div className="min-h-screen overflow-hidden bg-[#E7ECEE]">
            <Header />
            <main className="mx-auto max-w-5xl pb-24">
                <div className="px-5">
                    <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
                        {items.length > 0 ? "Review your bag." : "Your bag is empty."}
                    </h1>
                    <p className="my-4">Free delivery and free returns.</p>

                    {items.length === 0 && (
                        <Button
                            title="Continue Shopping"
                            onClick={() => router.push("/products")}
                        />
                    )}
                </div>

                {items.length > 0 && (
                    <div className="mx-5 md:mx-8">
                        {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                            <CheckoutProduct key={key} items={items} id={items[0]} />
                        ))}

                        <div className="my-12 mt-6 ml-auto">
                            <div className="divide-y divide-gray-300">
                                <div className="pb-4">
                                    <div className="flex justify-between">
                                        <p>Subtotal</p>
                                        ${basketTotal.toFixed(2)}
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Shipping</p>
                                        <p>FREE</p>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4 text-xl font-semibold">
                                    <h4>Total</h4>
                                    <h4>
                                        ${basketTotal.toFixed(2)}
                                    </h4>
                                </div>
                            </div>

                            <div className="my-14 space-y-4">
                                <h4 className="text-xl font-semibold">
                                    How would you like to check out?
                                </h4>
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center">
                                        <h4 className="mb-4 flex flex-col text-xl font-semibold">
                                            <span>Pay Monthly</span>
                                            <span>with Visa Card</span>
                                            <span>
                                                ${(basketTotal / 3).toFixed(2)}/mo. at 0% APR
                                            </span>
                                        </h4>
                                        <Button title="Check Out with Visa Card Monthly Installments" />
                                    </div>

                                    <div className="flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2">
                                        <h4 className="mb-4 flex flex-col text-xl font-semibold">
                                            Pay in full
                                            <span>
                                                ${basketTotal.toFixed(2)}
                                            </span>
                                        </h4>

                                        <Button
                                            noIcon
                                            loading={loading}
                                            title="Check Out"
                                            width="w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div>
                            Recommended for you
                            <div className='grid grid-cols-4 gap-20 max-w-fit pt-10 pb-24 sm:px-4'>
                                {data.map((item) => (
                                    <Product key={item.productId} product={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Checkout;