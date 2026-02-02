'use client';
import React from 'react';

const FoodOptions = () => {
    const scrollContainer = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainer.current) {
            const scrollAmount = 500;
            scrollContainer.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const foodItems = [
        { name: 'Cake', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Cake.png' },
        { name: 'Pizza', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pizza.png' },
        { name: 'Burger', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Burger.png' },
        { name: 'Biryani', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Biryani.png' },
        { name: 'Rolls', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Rolls.png' },
        { name: 'Salad', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Salad.png' },
        { name: 'Samosa', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Samosa.png' },
        { name: 'Dosa', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Dosa.png' },
        { name: 'Tea', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Tea.png' },
        { name: 'Idli', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Idli.png' },
        { name: 'Noodles', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Noodles.png' },
        { name: 'Shawarma', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Shawarma.png' },
        { name: 'Pasta', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pasta.png' },
        { name: 'Momo', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Momo.png' },
        { name: 'Pastry', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pastry.png' },
        { name: 'Shake', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Shake.png' },
        { name: 'Juice', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Juice.png' },
        { name: 'Vada', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Vada.png' },
        { name: 'Parotta', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Parotta.png' },
        { name: 'Khichdi', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Khichdi.png' }
    ];

    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-extrabold text-[#02060c] tracking-tight">Order our best food options</h2>
                <div className="flex gap-3">
                    <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 disabled:opacity-50 hover:bg-gray-300 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 disabled:opacity-50 hover:bg-gray-300 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            <div
                ref={scrollContainer}
                className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto no-scrollbar pb-4"
            >
                {foodItems.map((item, index) => (
                    <div key={index} className="flex-shrink-0 cursor-pointer">
                        <div style={{ width: '144px', height: '180px' }} className="relative">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FoodOptions;
