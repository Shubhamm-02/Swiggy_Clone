'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const BASE = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660';

// Derive URL slug from name (lowercase, non-alphanumeric → single hyphen)
function slugFromName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'restaurant';
}

// Restaurant list from Swiggy Bangalore listing (user HTML) – we use 75% of this list
const ALL_RESTAURANTS: Array<{ name: string; rating: string; time: string; cuisines: string; location: string; offer: string; img: string; slug?: string }> = [
  { name: 'Virinchi Cafe', rating: '4.6', time: '30-35 mins', cuisines: 'South Indian, Fast Food, fastfood', location: 'Ashok Nagar', offer: '', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/8/5/91212eda-d369-492f-98bc-bdc92fed2e56_471009%20(1).jpg` },
  { name: 'Airlines Hotel', rating: '4.5', time: '30-35 mins', cuisines: 'South Indian, North Indian', location: 'Central Bangalore', offer: 'ITEMS AT ₹49', img: `${BASE}/b1iffaxblxghqqyrmbkp` },
  { name: 'Parijata pure veg', rating: '4.5', time: '30-35 mins', cuisines: 'South Indian', location: 'Richmond Town', offer: '20% OFF ', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/2/21/2a8aae89-cf1b-4025-8d1d-0b8fe863bc2f_303283.jpg` },
  { name: 'Hotel Chandrika', rating: '4.5', time: '35-40 mins', cuisines: 'South Indian, Chinese, Juices, Chaat, Ice Cream', location: 'Central Bangalore', offer: 'ITEMS AT ₹49', img: `${BASE}/bjsywjtbostst0h5cojy` },
  { name: 'IDC Kitchen', rating: '4.7', time: '35-40 mins', cuisines: 'South Indian, Indian', location: 'Basavanagudi', offer: '', img: `${BASE}/v8jgifosg3vdzrgsv1sw` },
  { name: 'Bangalore Thindies', rating: '4.4', time: '30-35 mins', cuisines: 'South Indian', location: 'Shivaji Nagar', offer: '₹200 OFF ABOVE ₹799', img: `${BASE}/gmusbb8jn3ocox01hnc7` },
  { name: 'Sanman Restaurant', rating: '4.7', time: '35-40 mins', cuisines: 'South Indian, Indian, Chinese', location: 'Malleshwaram', offer: 'ITEMS AT ₹89', img: `${BASE}/jadgqpxezfyr7ciwvezw` },
  { name: 'Third Wave Coffee', rating: '4.5', time: '25-30 mins', cuisines: 'Beverages, Bakery, Continental', location: 'Lavelle Road', offer: '50% OFF ', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/7/15/c22a42eb-709e-452d-aa71-526749983f29_533773.jpg` },
  { name: 'Blue Tokai Coffee Roasters', rating: '4.6', time: '30-35 mins', cuisines: 'Cafe, Coffee, Beverages', location: 'Central Bangalore', offer: '', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/12/5/618ae150-5ed6-4693-bcfa-e1bbdb872503_966182.JPG` },
  { name: 'Cafe Amudham', rating: '4.6', time: '30-40 mins', cuisines: 'South Indian, Snacks', location: 'Majestic', offer: '₹100 OFF ABOVE ₹549', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/8/22/79a61e0c-9dd1-4ce1-8c86-dfcb8d9e32bc_124178.JPG` },
  { name: 'New Udupi Upahar', rating: '4.6', time: '35-40 mins', cuisines: 'North Indian, South Indian, Chinese, Tandoor, Chaat, Beverages', location: 'Richmond Town', offer: '', img: `${BASE}/b14cd9fc40129fcfb97aa7e621719d07` },
  { name: 'Chaayos Chai+Snacks=Relax', rating: '4.6', time: '35-40 mins', cuisines: 'Beverages, Chaat, Snacks, Bakery, Street Food, healthy, Home Food, Maharashtrian, Italian, Desserts', location: 'Central Bangalore', offer: 'ITEMS AT ₹199', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/17/dfbcecfc-b380-4648-930a-b9b56b21e781_435405.JPG` },
  { name: 'Cafe Coffee Day', rating: '4.5', time: '35-40 mins', cuisines: 'Beverages, Cafe, Snacks, Desserts, Burgers, Ice Cream, Bakery, Fast Food', location: 'Shivaji Nagar', offer: '50% OFF UPTO ₹100', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/8/21/534ced2e-4af3-4907-bd02-f2527a93b3df_304274.JPG` },
  { name: 'Great Indian Khichdi by EatFit', rating: '4.3', time: '35-45 mins', cuisines: 'Home Food, Indian, North Indian, Healthy Food, Snacks, Desserts, Rajasthani, South Indian, Maharashtrian, Sweets', location: 'Central Bangalore', offer: 'ITEMS AT ₹34', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2026/1/21/9eb4c855-dd0d-4f68-9f32-392e3eab42a4_440123.JPG` },
  { name: 'Chai Point', rating: '4.4', time: '30-35 mins', cuisines: 'Bakery, Beverages, Maharashtrian, Snacks, Street Food, South Indian, Punjabi, Chaat, Indian, American', location: 'Ashok Nagar', offer: 'ITEMS AT ₹68', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2026/1/7/e4676e4c-09c3-4020-b322-94e28bd15913_69274.JPG` },
  { name: 'Wow! China', rating: '3.9', time: '30-35 mins', cuisines: 'Chinese, Asian, fastfood, Beverages, Snacks', location: 'Church Street', offer: 'ITEMS AT ₹99', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/10/22/0a619a1f-e105-416b-9cbb-723af5fdeda6_264240.JPG` },
  { name: 'Theobroma', rating: '4.7', time: '20-25 mins', cuisines: 'Desserts, Bakery, Beverages', location: 'Vittal Mallya Road', offer: '50% OFF ', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2026/1/6/bf430b2f-9106-4a52-8fe9-3a0032e667c2_426730.JPG` },
  { name: 'Murugan Cafe', rating: '4.6', time: '40-45 mins', cuisines: 'South Indian', location: 'Basavanagudi', offer: 'ITEMS AT ₹99', img: `${BASE}/b8672fe52944c3599ea324d99d608300` },
  { name: 'Kink Coffee', rating: '4.6', time: '30-35 mins', cuisines: 'Beverages', location: 'Ashok Nagar', offer: '30% OFF UPTO ₹75', img: `${BASE}/45d360c8676d0dbf7b5c5e8f19847a61` },
  { name: 'Sri Udupi Food Hub', rating: '4.4', time: '35-40 mins', cuisines: 'South Indian, North Indian, Indian, Chinese, Chaat, Ice Cream, Desserts, Beverages', location: 'Gandhi Nagar', offer: 'ITEMS AT ₹97', img: `${BASE}/ce50bf23b8dde777f72a753c1d8775e8` },
  { name: 'Natraj Chole Bhature', rating: '4.2', time: '35-40 mins', cuisines: 'North Indian, Indian, Chaat, Beverages, Combs', location: 'Commercial Street', offer: '', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/11/22/0b6743d9-2c1f-4b35-a2ff-1df495dd1ab2_1269491.jpg` },
  { name: 'Sangam Sweets', rating: '4.6', time: '35-40 mins', cuisines: 'Desserts, indian snacks, Sweets', location: 'Majestic', offer: '', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2026/1/12/8e8a76cc-7588-465a-bd7d-113667b67e22_70008.JPG` },
  { name: 'Biggies Burger', rating: '4.4', time: '30-35 mins', cuisines: 'Burgers, American, Fast Food, Beverages', location: 'Church Street', offer: '30% OFF UPTO ₹75', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/6/3/c8ddab21-589f-4d14-833c-1181d4d17d7a_273161.jpg` },
  { name: 'Cookie Man', rating: '4.3', time: '35-40 mins', cuisines: 'Desserts, Ice Cream, Bakery', location: 'Ashok Nagar', offer: 'ITEMS AT ₹45', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2026/1/21/a2d8b72f-a4e9-4f83-901c-50dc41a595e6_58527.JPG`, slug: 'cookie-man' },
  { name: "Glen's Bakehouse", rating: '4.6', time: '35-45 mins', cuisines: 'Desserts, Bakery, Beverages, Continental, Italian', location: 'Ashok Nagar', offer: '', img: `${BASE}/m6jahioyu7zrodei5pcq` },
  { name: 'Krispy Kreme - Doughnuts & Coffee', rating: '4.8', time: '25-30 mins', cuisines: 'Desserts, Cafe, Bakery, Coffee, Beverages, Snacks', location: 'St. Marks Road', offer: '50% OFF ', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2026/1/8/e46bab6b-703f-49d0-9664-22b7b8629956_1066083.JPG` },
  { name: 'MTR', rating: '4.6', time: '25-30 mins', cuisines: 'South Indian', location: 'St. Marks Road', offer: '', img: `${BASE}/tladdzgke7gic8xjng4z` },
  { name: 'Salad Days', rating: '4.6', time: '35-40 mins', cuisines: 'Salads', location: 'Central Bangalore', offer: '40% OFF UPTO ₹80', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2024/12/20/51195588-58c4-4018-8a65-1e0a654a5db9_1011691.jpg` },
  { name: 'Magnolia Bakery', rating: '4.7', time: '25-30 mins', cuisines: 'Bakery, Desserts, Ice Cream', location: 'Central Bangalore', offer: '', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2024/12/20/51195588-58c4-4018-8a65-1e0a654a5db9_1011691.jpg` },
  { name: 'Starbucks Coffee', rating: '4.4', time: '20-25 mins', cuisines: 'Beverages, Cafe, Snacks, Desserts, Bakery, Ice Cream', location: 'Ashok Nagar', offer: '₹100 OFF ABOVE ₹199', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/8/22/79a61e0c-9dd1-4ce1-8c86-dfcb8d9e32bc_124178.JPG` },
  { name: "McDonald's Gourmet Burger Collection", rating: '4.4', time: '25-30 mins', cuisines: 'Burgers, Beverages, Cafe, Desserts', location: 'Central Bangalore', offer: '', img: `${BASE}/rqdtdkc3iqzxodv6vtyf` },
  { name: 'Juice Junction', rating: '4.5', time: '25-30 mins', cuisines: 'Juices', location: 'St. Marks Road', offer: 'ITEMS AT ₹109', img: `${BASE}/pyzapmfvt8n8rbgiq0tj` },
  { name: 'Subway', rating: '4.5', time: '30-35 mins', cuisines: 'sandwich, Salads, wrap, Healthy Food', location: 'Vittal Mallya Road', offer: '25% OFF UPTO ₹125', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/6/12/f4848952-184f-414f-bbe3-7a39faeddec9_69876.jpg` },
  { name: 'Udupi Upahara', rating: '4', time: '35-40 mins', cuisines: 'Chinese, South Indian', location: 'Central Bangalore', offer: '', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2024/9/22/b5a87d03-a8b9-47d9-9c6b-740402030dfe_960477.jpg` },
  { name: 'Cothas Coffee Co', rating: '4.9', time: '45-50 mins', cuisines: 'Snacks', location: 'Chickpet', offer: '', img: `${BASE}/e9frdesabbufu6yberlh` },
  { name: 'Veena Stores', rating: '4.7', time: '40-45 mins', cuisines: 'South Indian', location: 'Malleshwaram', offer: '', img: `${BASE}/vt1mquaxmeugaf9dl5pp` },
  { name: 'Paakashala', rating: '4.5', time: '40-45 mins', cuisines: 'Indian, South Indian, North Indian, Chinese, Chaat, Juices, Desserts, Tea', location: 'MG Road', offer: 'ITEMS AT ₹69', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2024/6/24/9e2db547-55df-40ee-ac51-bba86ebb11d1_205813.jpg` },
  { name: 'The Rameshwaram Cafe', rating: '4.6', time: '50-60 mins', cuisines: 'South Indian, Beverages', location: 'Indiranagar', offer: '', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/11/22/0b6743d9-2c1f-4b35-a2ff-1df495dd1ab2_1269491.jpg` },
  { name: 'Smoke House Deli', rating: '4.6', time: '25-30 mins', cuisines: 'Italian, Continental, Fast Food, Salads, Healthy Food, Pizzas, Desserts', location: 'Central Bangalore', offer: 'ITEMS AT ₹199', img: `${BASE}/zzkjr3jcrl1pqop1pybu` },
  { name: 'Nandhini Deluxe', rating: '4.4', time: '20-25 mins', cuisines: 'Andhra, Biryani, Chinese, North Indian', location: 'St. Marks Road', offer: 'ITEMS AT ₹49', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2024/11/3/7f19aaac-7299-4b54-a22d-69fd67f8fb65_3434.jpg` },
  { name: 'Jose Mess', rating: '4.4', time: '50-60 mins', cuisines: 'South Indian', location: 'BTM', offer: 'ITEMS AT ₹6', img: `${BASE}/lltunkievzpxrrcarfmy` },
  { name: 'Sri Udupi Park (100ft Road)', rating: '4.5', time: '55-65 mins', cuisines: 'South Indian, North Indian, Chaat, Beverages, Chinese', location: 'Indiranagar', offer: '', img: `${BASE}/jxp8y1chnqljwqylpkov` },
  { name: 'Sree Krishna Kafe', rating: '4.7', time: '50-60 mins', cuisines: 'South Indian', location: 'Koramangala', offer: '', img: `${BASE}/us72sjlfo9opsmi8fi6u` },
  { name: 'Thatte Idli Junction', rating: '4.4', time: '50-60 mins', cuisines: 'South Indian', location: 'Jai Bharath Nagar', offer: 'ITEMS AT ₹99', img: `${BASE}/23053edeaa096530da8bed1e8f713d7a` },
  { name: 'The Meenakshi Coffee Bar', rating: '4.5', time: '45-50 mins', cuisines: 'South Indian, Sweets, Snacks, Home Food, Healthy Food, Navratri Special, Fast Food, Cafe', location: 'Basaveshwaranagar', offer: 'ITEMS AT ₹99', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2024/12/9/c3959ff9-36bc-4603-9374-8036b910dd4c_949550.jpg` },
  { name: 'Vishnu Garden', rating: '4.6', time: '45-50 mins', cuisines: 'Chinese, South Indian', location: 'Sanjay Nagar, New BEL Road', offer: 'ITEMS AT ₹39', img: `${BASE}/q1yoajwctcy33cjhregi` },
  { name: 'Chalukya Samrat Since 1977', rating: '4.5', time: '35-40 mins', cuisines: 'South Indian', location: 'Malleshwaram', offer: '', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/9/30/d87eab54-505c-4994-9a3e-6dfe7f190a92_1222295.jpg` },
  { name: 'Paragon Restaurant Since 1939', rating: '4.5', time: '40-45 mins', cuisines: 'Kerala, South Indian, Indian, Chinese', location: 'Central Bangalore', offer: '', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2024/5/13/069de1d3-5d52-470e-92b0-021b17642b51_884006.jpg` },
  { name: 'A2B - Adyar Ananda Bhavan', rating: '4.6', time: '40-45 mins', cuisines: 'South Indian, North Indian, Sweets, Chinese', location: 'Shanti Nagar', offer: 'ITEMS AT ₹33', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2026/1/7/394d4bca-db65-43a2-9372-12543611d33a_12808.JPG`, slug: 'a2b-adyar-ananda-bhavan' },
  { name: 'Irani Std. Tea', rating: '4.4', time: '50-60 mins', cuisines: 'Beverages, Snacks, Fast Food', location: 'Indiranagar', offer: 'ITEMS AT ₹69', img: `${BASE}/1e756ee8d230b65d570f7e8e70f7062c` },
  { name: 'Thirtha', rating: '4.6', time: '35-40 mins', cuisines: 'North Indian, South Indian, Chinese, Snacks, Desserts, Beverages', location: 'Central Bangalore', offer: '', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/9/27/b4cf8af1-5763-4919-bca2-cd99c5e75057_1208881%20(1).jpg` },
  { name: 'Palmgrove Ballal Residency', rating: '4.6', time: '40-45 mins', cuisines: 'Chinese, Coastal, Desserts, Jain, South Indian', location: 'Ashok Nagar', offer: '', img: `${BASE}/wf83wrssazu2prtt7rss` },
  { name: 'Marwadi chaat & Tiffin Services (Jodhpur wala)', rating: '4.2', time: '45-50 mins', cuisines: 'North Indian, Snacks, Rajasthani, Chaat', location: 'Central Bangalore', offer: 'ITEMS AT ₹45', img: `${BASE}/e8f48a82caf1cdc428448f64dba7b61e` },
  { name: 'Kanti Sweets', rating: '4.7', time: '25-30 mins', cuisines: 'Sweets', location: 'Central Bangalore', offer: '', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/2/13/aa4b203a-ac9e-49e0-83e8-c4910f309395_48230.jpg` },
  { name: 'Samosa Party', rating: '4.4', time: '30-35 mins', cuisines: 'Fast Food, Snacks, Beverages, Chaat, North Indian, Street Food, Sweets, Desserts, Punjabi, Bakery', location: 'Central Bangalore', offer: 'ITEMS AT ₹99', img: `${BASE}/ixgxvfu6ggvw1w1awgr1` },
  { name: 'Poha on wheel', rating: '4.6', time: '45-50 mins', cuisines: 'Snacks, Sweets, Chaat, Beverages', location: 'Koramangala', offer: 'ITEMS AT ₹39', img: `${BASE}/5523dd549125869c5070365641b42ef7` },
  { name: 'Sri Nayvedya Veg', rating: '4.4', time: '40-45 mins', cuisines: 'South Indian', location: 'Jayanagar', offer: '₹100 OFF ABOVE ₹999', img: `${BASE}/hljbvcwexdml5cllguis` },
  { name: 'Hotel Kadamba Veg', rating: '4.5', time: '50-60 mins', cuisines: 'South Indian, North Indian, Chinese, Sweets', location: 'Rajajinagar', offer: 'ITEMS AT ₹49', img: `${BASE}/RX_THUMBNAIL/IMAGES/VENDOR/2025/9/27/b4cf8af1-5763-4919-bca2-cd99c5e75057_1208881.jpg` },
];

export { ALL_RESTAURANTS };
// 75% of the list
const RESTAURANTS = ALL_RESTAURANTS.slice(0, Math.ceil(ALL_RESTAURANTS.length * 0.75));

function StoreRatingStar({ id }: { id: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="9" fill={`url(#${id})`} />
      <path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white" />
      <defs>
        <linearGradient id={id} x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#21973B" />
          <stop offset="1" stopColor="#128540" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const RestaurantList = () => {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <>
      <div id="container-grid-filter-sort" className="sc-kNlxZa gVUnbB mt-10 md:mt-12">
        <div>
          <div className="sc-jNUliw keEiJS">
            <div data-testid="filter_widget" className="sc-doOioq dyWdxa">
              <div className="sc-cAkrUM hbXQNP">
                <button
                  type="button"
                  data-testid="dropdown-chip"
                  className="sc-jMakVo EBXsX flex items-center gap-1.5 px-3 py-2 border border-[#e9e9eb] rounded-lg bg-white text-[#02060c] font-medium text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSortOpen((o) => !o)}
                  aria-expanded={sortOpen}
                >
                  <span className="sc-aXZVg hwUmr">Sort By</span>
                  <span className="sc-iMTnTL hpuwEP flex items-center">
                    <svg aria-hidden height={12} width={12} className="sc-dcJsrY dnGnZy" style={{ fillOpacity: 1 }} viewBox="0 0 12 12" fill="currentColor">
                      <path d="M2.5 4.5L6 8l3.5-3.5" fill="currentColor" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div />
        </div>
      </div>

      <div className="sc-iBTApF sc-fXRJzk dIHtgG jnFtOt">
        <div>
          <div data-testid="restaurant_list" className="sc-kOHTFB iynxeh grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {RESTAURANTS.map((r, idx) => (
              <div key={r.name} data-testid="restaurant_list_card">
                <Link href={`/restaurant/${r.slug ?? slugFromName(r.name)}`} className="sc-hkaVUD kCcAII block no-underline text-inherit">
                  <div className="sc-jRUPCi gFZfmz flex">
                    <div className="sc-dCFHLb cwwyro flex-shrink-0 rounded-xl overflow-hidden w-[120px] h-[120px]">
                      <div className="sc-fhzFiK kmcVQW w-full h-full relative">
                        <div className="sc-cWSHoV qMwEb w-full h-full">
                          <img className="sc-eeDRCY nODVy w-full h-full object-cover" src={r.img} alt={r.name} width="100%" height="100%" />
                          <div data-theme="dark" className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-4 pb-1.5 px-1.5">
                            <div className="sc-dtInlm cBdWXe sc-eBMEME dkBijF flex items-center justify-between gap-0.5 text-white text-[10px] font-semibold">
                              <span className="sc-aXZVg iwOBvp sc-kOPcWz aKTld" />
                              <span className="sc-aXZVg kCePhW sc-kOPcWz aKTld truncate">{r.offer || ' '}</span>
                              <span className="sc-aXZVg cZfNzk sc-kOPcWz aKTld" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col min-w-0 ml-3" style={{ marginLeft: 12 }}>
                      <div>
                        <div className="sc-aXZVg brETgz font-bold text-[#02060c] text-base truncate">{r.name}</div>
                      </div>
                      <div className="sw-restaurant-card-subtext-container flex items-center gap-1 flex-wrap mt-0.5">
                        <div className="flex items-center" style={{ marginTop: -2 }}>
                          <StoreRatingStar id={`res-star-${idx}`} />
                        </div>
                        <div className="sc-aXZVg bKIGLW text-[13px] text-[#686b78]" style={{ marginTop: -4 }}>
                          <span className="sc-aXZVg cbhbwm font-semibold text-[#02060c]">{r.rating} • </span>
                          {r.time}
                        </div>
                      </div>
                      <div className="sw-restaurant-card-descriptions-container mt-0.5">
                        <div className="sc-aXZVg OyTrl text-[13px] text-[#686b78] truncate">{r.cuisines}</div>
                        <div className="sc-aXZVg OyTrl text-[13px] text-[#686b78] truncate">{r.location}</div>
                      </div>
                    </div>
                  </div>
                </Link>
                <div />
              </div>
            ))}
          </div>
          <div />
          <div />
        </div>
      </div>
    </>
  );
};

export default RestaurantList;
