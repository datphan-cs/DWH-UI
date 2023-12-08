"use client";
import { useEffect, useState } from 'react';
import Product from '../components/Product';
import Header from '../components/Header';
export default function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://api.sampleapis.com/beers/ale')
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    return (
        <div>
            <Header />
            <div className='grid grid-cols-4 gap-4 mx-auto max-w-fit pt-10 pb-24 sm:px-4'>
                {data.map((item) => (
                    <Product key={item.id} product={item} />
                ))}
            </div>
        </div>
    )
}