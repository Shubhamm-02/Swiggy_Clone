import React from 'react';

const Hero = () => {
    // Images URLs
    const leftImage = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png";
    const rightImage = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png";

    return (
        <div className="w-full relative bg-swiggy-orange min-h-[560px] flex flex-col justify-end pt-32 pb-16">
            {/* Background Images - positioned absolutely */}
            <div className="absolute left-0 top-0 h-full w-[200px] xl:w-[350px] z-10 hidden lg:block">
                <img src={leftImage} alt="Vegetables" className="w-full h-full object-cover object-right-top opacity-90" />
            </div>
            <div className="absolute right-0 top-0 h-full w-[200px] xl:w-[350px] z-10 hidden lg:block">
                <img src={rightImage} alt="Sushi" className="w-full h-full object-cover object-left-top opacity-90" />
            </div>

            <div className="container-max relative z-20 flex flex-col items-center px-4">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-[40px] leading-[1.2] font-semibold text-white tracking-tight mb-2">
                        Order food & groceries. Discover <br /> best restaurants. Swiggy it!
                    </h1>
                </div>

                {/* Search Bar Container */}
                <div className="flex flex-col md:flex-row items-center gap-4 mb-14 w-full max-w-[800px]">
                    {/* Location Input */}
                    <div className="flex-1 w-full md:w-auto flex items-center bg-white rounded-2xl px-5 h-14 cursor-pointer hover:shadow-lg transition-shadow">
                        <span className="text-swiggy-orange mr-3">
                            <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                <path d="M16 0c-5.523 0-10 4.477-10 10 0 1.637.387 3.179 1.073 4.545l.039.076.024.043c2.724 4.508 8.864 12.338 8.864 12.338s6.14-7.83 8.864-12.338l.024-.043.039-.076c.686-1.366 1.073-2.908 1.073-4.545 0-5.523-4.477-10-10-10zM16 14c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"></path>
                            </svg>
                        </span>
                        <input type="text" placeholder="Enter your delivery location" className="w-full outline-none text-gray-700 font-medium placeholder-gray-400 text-sm" />
                        <span className="text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </span>
                    </div>
                    {/* Search Input */}
                    <div className="flex-[1.5] w-full md:w-auto flex items-center bg-white rounded-2xl px-5 h-14 relative hover:shadow-lg transition-shadow">
                        <input type="text" placeholder="Search for restaurant, item or more" className="w-full outline-none text-gray-700 font-medium placeholder-gray-400 text-sm" />
                        <span className="absolute right-5 text-gray-500">
                            <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </span>
                    </div>
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-[1000px]">
                    {/* Food Delivery Card */}
                    <div className="relative cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                        <a href="https://www.swiggy.com/restaurants">
                            <img
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png"
                                alt="Food Delivery"
                                className="w-full h-auto object-contain rounded-3xl"
                            />
                        </a>
                    </div>

                    {/* Instamart Card */}
                    <div className="relative cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                        <a href="https://www.swiggy.com/instamart">
                            <img
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png"
                                alt="Instamart"
                                className="w-full h-auto object-contain rounded-3xl"
                            />
                        </a>
                    </div>

                    {/* Dineout Card */}
                    <div className="relative cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                        <a href="https://www.swiggy.com/dineout">
                            <img
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png"
                                alt="Dineout"
                                className="w-full h-auto object-contain rounded-3xl"
                            />
                        </a>
                    </div>
                </div>

                {/* Decorative Scrollbar */}
                <div className="w-full max-w-[1000px] mt-12 flex items-center gap-4">
                    <div className="cursor-pointer opacity-80 hover:opacity-100">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M5 9L1 5L5 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div className="h-[4px] flex-1 bg-white/30 rounded-full relative overflow-hidden">
                        <div className="absolute left-0 top-0 h-full w-[25%] bg-white rounded-full"></div>
                    </div>
                    <div className="cursor-pointer opacity-80 hover:opacity-100">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 9L5 5L1 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
