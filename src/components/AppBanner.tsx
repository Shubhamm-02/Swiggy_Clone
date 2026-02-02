import React from 'react';

const AppBanner = () => {
    return (
        <section className="w-full my-8">
            <a href="https://www.swiggy.com/app" target="_blank" rel="noopener noreferrer" className="block w-full">
                <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/App_download_banner.png"
                    alt="Get the Swiggy App"
                    className="w-full h-auto object-contain"
                />
            </a>
        </section>
    );
};

export default AppBanner;
