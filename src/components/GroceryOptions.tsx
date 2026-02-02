'use client';
import React from 'react';

const GroceryOptions = () => {
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

    // Using placeholders or generic images since specific Instamart category IDs might change
    const categories = [
        { name: 'Fresh Vegetables', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/43e3c412-4ca9-4894-82ba-24b69da80aa6_06c0d2a9-804c-4bf1-8725-7ebd234e144a' },
        { name: 'Fresh Fruits', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/a1493d81-f21e-415f-9875-f78383590fc2_9f3f0f68-4fbe-40f6-8f5d-5472a03469bd' },
        { name: 'Dairy, Bread', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/6dea6676-ce07-45e6-b60c-a099c01c5462_6d33297a-5828-48ff-aa2a-c052ae97669e' },
        { name: 'Rice, Atta', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/097900ca-5d2d-4bb0-8e54-aede1e58dfd8_eab3796c-ac17-48fd-bfc7-6356c6f89783' },
        { name: 'Masalas', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/64714677-e6b6-41c1-b533-6644d43e55f7_76ef86af-0483-41a5-8387-37901bf4ca6a' },
        { name: 'Munchies', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2024/7/6/73e018a7-d342-475e-aaca-ec5cd3d0c59f_228ff3d4-ff21-44db-9768-7a369c65ce6a' },
        { name: 'Sweet Tooth', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2024/7/6/83a9b71b-1db7-4cbe-a9f7-ead650d26326_3afbe8c8-f5c8-4dd7-8357-f5711f80646b' },
        { name: 'Cold Drinks', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2024/7/6/37d399b1-52d2-47ef-bdd8-8951e51819fc_0361a93d-e864-49be-a57d-46c958eb7b56' },
        { name: 'Biscuits', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2024/7/6/76a7104c-0f11-4182-aa51-0d48efc2be7f_aae098f9-aaff-4504-a222-bf13595d58cd' },
        { name: 'Instant Food', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/1a08f110-17b6-4785-92d4-404825b75f2d_869c1986-d9c1-4d46-b1c3-10c79a052a59' },
        { name: 'Meat', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/25be4b2d-a9de-495e-a9a4-9a6d6a3d13c0_5f571281-eef0-4820-9982-d8bdd9af91c6' },
        { name: 'Breakfast', img: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/012beae1-c31a-4360-9b32-173080b64652_aa07a04e-5f2e-4c00-86f6-297344906f01' }
    ];

    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800">Shop groceries on Instamart</h2>
                <div className="flex gap-2">
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
                className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
            >
                {categories.map((item, index) => (
                    <div key={index} className="flex flex-col items-center cursor-pointer flex-shrink-0 min-w-[124px]">
                        <div className="w-[124px] h-[160px] relative mb-2 bg-[#f4f5f7] rounded-2xl overflow-hidden flex items-center justify-center">
                            <img src={item.img} alt={item.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 transform scale-90" />
                        </div>
                        <span className="text-[#02060c] font-bold text-center text-base leading-tight w-full px-2">{item.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GroceryOptions;
