"use client";
import { useEffect, useState } from 'react';
import Category from '../components/Category';
import Header from '../components/Header';
export default function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/subcategories')
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    console.log(data)

    return (
        <div>
            <Header />
            <div className='grid grid-cols-4 gap-4 mx-auto max-w-fit pt-10 pb-24 sm:px-4'>
                {data.map((item) => (
                    <Category key={item.subcategoryId} category={item} />
                ))}
            </div>
        </div>
    )
}