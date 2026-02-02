import React from 'react';

const Cities = () => {
    const cities = [
        "Bangalore", "Gurgaon", "Hyderabad", "Delhi",
        "Mumbai", "Pune", "Kolkata", "Chennai",
        "Ahmedabad", "Chandigarh", "Jaipur"
    ];

    const CityGrid = ({ type, items }: { type: string, items: string[] }) => (
        <div className="mb-12">
            <h2 className="text-2xl font-extrabold text-[#02060c] mb-4">Cities with {type} delivery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {items.map((city, index) => (
                    <div key={index} className="border border-[#e2e2e7] rounded-xl p-4 flex items-center justify-center cursor-pointer hover:shadow-sm transition-shadow">
                        <span className="text-[#02060c] font-bold text-sm truncate opacity-90">Order {type} {type === 'food' ? 'online' : 'delivery'} in {city}</span>
                    </div>
                ))}
                <div className="border border-[#e2e2e7] rounded-xl p-4 flex items-center justify-center cursor-pointer hover:shadow-sm transition-shadow">
                    <span className="text-[#ff5200] font-bold text-sm flex items-center gap-1">
                        Show More <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <section className="container-max mx-auto px-4 md:px-20 py-8">
            <CityGrid type="food" items={cities} />
            <CityGrid type="grocery" items={cities} />
        </section>
    );
};

export default Cities;
