import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#f0f0f5] text-[#02060c] pt-16 pb-8 mt-0 w-full z-50 relative">
            <div className="container-max mx-auto px-4 md:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10">
                    {/* Column 1: Logo & Copyright */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="" viewBox="0 0 61 61" height="48" width="48"><g clipPath="url(#a)"><path fill="#FF5200" d="M.32 30.5c0-12.966 0-19.446 3.498-23.868a16.086 16.086 0 0 1 2.634-2.634C10.868.5 17.354.5 30.32.5s19.446 0 23.868 3.498c.978.774 1.86 1.656 2.634 2.634C60.32 11.048 60.32 17.534 60.32 30.5s0 19.446-3.498 23.868a16.086 16.086 0 0 1-2.634 2.634C49.772 60.5 43.286 60.5 30.32 60.5s-19.446 0-23.868-3.498a16.086 16.086 0 0 1-2.634-2.634C.32 49.952.32 43.466.32 30.5Z"></path><path fill="#FFF" fillRule="evenodd" d="M32.317 24.065v-6.216a.735.735 0 0 0-.732-.732.735.735 0 0 0-.732.732v7.302c0 .414.336.744.744.744h.714c10.374 0 11.454.54 10.806 2.73-.03.108-.066.21-.102.324-.006.024-.012.048-.018.066-2.724 8.214-10.092 18.492-12.27 21.432a.764.764 0 0 1-1.23 0c-1.314-1.776-4.53-6.24-7.464-11.304-.198-.462-.294-1.542 2.964-1.542h3.984c.222 0 .402.18.402.402v3.216c0 .384.282.738.666.768a.73.73 0 0 0 .582-.216.701.701 0 0 0 .216-.516v-4.362a.76.76 0 0 0-.756-.756h-8.052c-1.404 0-2.256-1.2-2.814-2.292-1.752-3.672-3.006-7.296-3.006-10.152 0-7.314 5.832-13.896 13.884-13.896 7.17 0 12.6 5.214 13.704 11.52.006.054.048.294.054.342.288 3.096-7.788 2.742-11.184 2.76a.357.357 0 0 1-.36-.36v.006Z" clipRule="evenodd"></path></g><defs><clipPath id="a"><path fill="#fff" d="M.32.5h60v60h-60z"></path></clipPath></defs></svg>
                            <span className="text-[#ff5200] font-bold text-2xl tracking-tighter">Swiggy</span>
                        </div>
                        <p className="text-[#02060c99] text-base">© 2025 Swiggy Limited</p>
                    </div>

                    {/* Column 2: Company */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-[#02060c]">Company</h4>
                        <ul className="space-y-4 text-[#02060c99] text-base font-medium">
                            <li className="hover:text-black cursor-pointer">About Us</li>
                            <li className="hover:text-black cursor-pointer">Swiggy Corporate</li>
                            <li className="hover:text-black cursor-pointer">Careers</li>
                            <li className="hover:text-black cursor-pointer">Team</li>
                            <li className="hover:text-black cursor-pointer">Swiggy One</li>
                            <li className="hover:text-black cursor-pointer">Swiggy Instamart</li>
                            <li className="hover:text-black cursor-pointer">Swiggy Dineout</li>
                            <li className="hover:text-black cursor-pointer">Minis</li>
                            <li className="hover:text-black cursor-pointer">Pyng</li>
                        </ul>
                    </div>

                    {/* Column 3: Contact & Legal */}
                    <div className="flex flex-col gap-12">
                        <div>
                            <h4 className="font-bold text-lg mb-4 text-[#02060c]">Contact us</h4>
                            <ul className="space-y-4 text-[#02060c99] text-base font-medium">
                                <li className="hover:text-black cursor-pointer">Help & Support</li>
                                <li className="hover:text-black cursor-pointer">Partner With Us</li>
                                <li className="hover:text-black cursor-pointer">Ride With Us</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-4 text-[#02060c]">Legal</h4>
                            <ul className="space-y-4 text-[#02060c99] text-base font-medium">
                                <li className="hover:text-black cursor-pointer">Terms & Conditions</li>
                                <li className="hover:text-black cursor-pointer">Cookie Policy</li>
                                <li className="hover:text-black cursor-pointer">Privacy Policy</li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 4: Available in */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-[#02060c]">Available in:</h4>
                        <ul className="space-y-4 text-[#02060c99] text-base font-medium mb-4">
                            <li className="hover:text-black cursor-pointer">Bangalore</li>
                            <li className="hover:text-black cursor-pointer">Gurgaon</li>
                            <li className="hover:text-black cursor-pointer">Hyderabad</li>
                            <li className="hover:text-black cursor-pointer">Delhi</li>
                            <li className="hover:text-black cursor-pointer">Mumbai</li>
                            <li className="hover:text-black cursor-pointer">Pune</li>
                        </ul>
                        <div className="border border-[#02060c99] rounded-lg px-3 py-2 text-[#02060c99] inline-flex items-center gap-2 cursor-pointer hover:bg-white text-sm font-bold">
                            685 cities <span className="text-xs">▼</span>
                        </div>
                    </div>

                    {/* Column 5: Life at Swiggy & Social */}
                    <div className="flex flex-col gap-12">
                        <div>
                            <h4 className="font-bold text-lg mb-4 text-[#02060c]">Life at Swiggy</h4>
                            <ul className="space-y-4 text-[#02060c99] text-base font-medium">
                                <li className="hover:text-black cursor-pointer">Explore With Swiggy</li>
                                <li className="hover:text-black cursor-pointer">Swiggy News</li>
                                <li className="hover:text-black cursor-pointer">Snackables</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-4 text-[#02060c]">Social Links</h4>
                            <div className="flex gap-4">
                                <a href="https://www.linkedin.com/company/swiggy-in/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                                    <img alt="Linkedin" src="https://media-assets.swiggy.com/portal/testing/seo-home/Linkedin.svg" className="w-6 h-6" />
                                </a>
                                <a href="https://www.instagram.com/swiggyindia/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                                    <img alt="Instagram" src="https://media-assets.swiggy.com/portal/testing/seo-home/icon-instagram.svg" className="w-6 h-6" />
                                </a>
                                <a href="https://www.facebook.com/swiggy.in/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                                    <img alt="Facebook" src="https://media-assets.swiggy.com/portal/testing/seo-home/icon-facebook.svg" className="w-6 h-6" />
                                </a>
                                <a href="https://in.pinterest.com/swiggyindia/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                                    <img alt="Pinterest" src="https://media-assets.swiggy.com/portal/testing/seo-home/icon-pinterest.svg" className="w-6 h-6" />
                                </a>
                                <a href="https://twitter.com/Swiggy?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                                    <img alt="Twitter" src="https://media-assets.swiggy.com/portal/testing/seo-home/Twitter.svg" className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-[#02060c1f] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <h3 className="text-[#02060c] font-extrabold text-xl md:text-2xl tracking-tighter text-center md:text-left">
                        For better experience, download the Swiggy app now
                    </h3>
                    <div className="flex gap-4">
                        <a href="#" className="block transition-transform hover:scale-105">
                            <img
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png"
                                alt="Get it on Google Play"
                                className="h-12 w-auto"
                            />
                        </a>
                        <a href="#" className="block transition-transform hover:scale-105">
                            <img
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png"
                                alt="Download on the App Store"
                                className="h-12 w-auto"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
