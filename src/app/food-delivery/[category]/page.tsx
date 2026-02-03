import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CartCountBadge } from '../../../components/CartCountBadge';

type PageProps = { params: Promise<{ category: string }> };

function categoryTitleFromSlug(slug: string): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const title = categoryTitleFromSlug(category);
  return {
    title: `Order ${title} from Restaurants Near You | Swiggy`,
    description: `Order ${title.toLowerCase()} online from restaurants and get it delivered. Serving in Bangalore, Hyderabad, Delhi and more.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const title = categoryTitleFromSlug(category);

  return (
    <>
      {/* Top navigation – same as food-delivery listing (Swiggy global nav) */}
      <header
        className="sticky top-0 left-0 right-0 z-[1000] h-20 bg-white px-5 will-change-transform contain-[size_layout_style] transition-transform duration-300 ease-[ease]"
        style={{ boxShadow: '0 15px 40px -20px rgba(40,44,63,.15)' }}
      >
        <div className="max-w-[1200px] min-w-0 mx-auto h-20 flex items-center">
          <Link href="/food-delivery" className="flex-shrink-0 mr-4 block transition-transform duration-300 ease-[cubic-bezier(.215,.61,.355,1)] hover:scale-110">
            <svg className="h-[49px] w-auto block" viewBox="0 0 61 61" fill="none" stroke="currentColor" strokeWidth="0" aria-hidden>
              <path fill="#ff5200" d="M.32 30.5c0-12.966 0-19.446 3.498-23.868a16.086 16.086 0 0 1 2.634-2.634C10.868.5 17.354.5 30.32.5s19.446 0 23.868 3.498c.978.774 1.86 1.656 2.634 2.634C60.32 11.048 60.32 17.534 60.32 30.5s0 19.446-3.498 23.868a16.086 16.086 0 0 1-2.634 2.634C49.772 60.5 43.286 60.5 30.32 60.5s-19.446 0-23.868-3.498a16.086 16.086 0 0 1-2.634-2.634C.32 49.952.32 43.466.32 30.5Z" />
              <path fill="#FFF" fillRule="evenodd" d="M32.317 24.065v-6.216a.735.735 0 0 0-.732-.732.735.735 0 0 0-.732.732v7.302c0 .414.336.744.744.744h.714c10.374 0 11.454.54 10.806 2.73-.03.108-.066.21-.102.324-.006.024-.012.048-.018.066-2.724 8.214-10.092 18.492-12.27 21.432a.764.764 0 0 1-1.23 0c-1.314-1.776-4.53-6.24-7.464-11.304-.198-.462-.294-1.542 2.964-1.542h3.984c.222 0 .402.18.402.402v3.216c0 .384.282.738.666.768a.73.73 0 0 0 .582-.216.701.701 0 0 0 .216-.516v-4.362a.76.76 0 0 0-.756-.756h-8.052c-1.404 0-2.256-1.2-2.814-2.292-1.752-3.672-3.006-7.296-3.006-10.152 0-7.314 5.832-13.896 13.884-13.896 7.17 0 12.6 5.214 13.704 11.52.006.054.048.294.054.342.288 3.096-7.788 2.742-11.184 2.76a.357.357 0 0 1-.36-.36v.006Z" clipRule="evenodd" />
            </svg>
          </Link>
          <button type="button" className="group relative flex items-center ml-6 md:ml-[30px] max-w-[300px] h-[30px] cursor-pointer mb-[-1px] pr-[10px] bg-transparent border-0 p-0 text-left">
            <span className="relative font-semibold text-[rgba(2,6,12,.9)] group-hover:text-[#ff5200] after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:h-0.5 after:w-full after:bg-[rgba(2,6,12,.9)] group-hover:after:bg-[#ff5200]">
              Other
            </span>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#ff5200] font-extrabold text-[.9rem] leading-none" aria-hidden>▼</span>
          </button>
          <div className="flex-1 min-w-0 flex flex-row-reverse items-center h-full mr-[-16px]">
            <CartCountBadge />
            <a href="#" className="flex items-center h-full pl-7 text-base font-normal text-[rgba(2,6,12,.9)] hover:text-[#ff5200] transition-colors group">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Sign In
            </a>
            <a href="#" className="flex items-center h-full pl-7 text-base font-normal text-[rgba(2,6,12,.9)] hover:text-[#ff5200] transition-colors group">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Search
            </a>
          </div>
        </div>
      </header>

      {/* Swiggy collection page layout – from provided HEAD/CSS: ._34HUK, main#seo-core-layout, #container-grid-filter-sort */}
      <div
        className="relative w-full max-w-[1260px] min-w-0 mx-auto flex-wrap"
        style={{ minHeight: 'calc(100vh - 70px)' }}
      >
        <div>
          <main
            id="seo-core-layout"
            className="flex w-full flex-row flex-wrap justify-start items-start"
            style={{ height: '100%' }}
          >
            <div
              id="container-grid-filter-sort"
              className="w-full"
              style={{ margin: '0 16px' }}
            >
              {/* #collection-mast-header – display none per CSS */}
              <div id="collection-mast-header" className="hidden" aria-hidden />

              {/* #sort-container – position absolute z-index 1002 */}
              <div id="sort-container" className="absolute z-[1002]" style={{ position: 'absolute' }} />

              {/* ._1hfCK – padding 0 20px, min-height 100vh, overflow */}
              <div
                className="px-5 min-h-screen overflow-x-hidden overflow-y-auto"
                style={{ padding: '0 20px', height: '100%' }}
              >
                {/* ._3g31e – title row: max-width 1200px, padding-top 60px, padding-bottom 8px, flex, justify-between */}
                <div
                  className="max-w-[1200px] min-w-0 mx-auto text-[#02060c] flex items-center justify-between pl-4"
                  style={{
                    paddingTop: 60,
                    paddingBottom: 8,
                    maxWidth: 1260,
                    minWidth: 1260,
                    paddingLeft: 16,
                  }}
                >
                  <div>
                    {/* ._3qgcs – font-size 40px, font-weight 600 */}
                    <h1 className="text-[40px] font-semibold" style={{ fontSize: 40, fontWeight: 600 }}>
                      {title}
                    </h1>
                    {/* ._39rxh – font-size 18px, opacity 0.9, margin-top 8px, max-width 800px */}
                    <p
                      className="text-lg mt-2 max-w-[800px]"
                      style={{ fontSize: 18, opacity: 0.9, marginTop: 8 }}
                    >
                      Restaurants curated for {title.toLowerCase()}
                    </p>
                    {/* ._22Y5B – display flex, align-items center, margin-top 9px */}
                    <div className="flex items-center mt-[9px]">
                      {/* ._2Ganl – filter tabs: Delivery Time, Relevance, Rating, etc. */}
                      <span className="text-base font-extralight capitalize text-[rgba(2,6,12,.7)] ml-[35px] cursor-pointer relative flex items-center">
                        Delivery Time
                      </span>
                      <span className="text-base font-extralight capitalize text-[rgba(2,6,12,.7)] ml-[35px] cursor-pointer relative flex items-center after:content-[''] after:absolute after:left-0 after:right-0 after:h-0.5 after:top-[41px] after:bg-[#02060c]">
                        Relevance
                      </span>
                      <span className="text-base font-extralight capitalize text-[rgba(2,6,12,.7)] ml-[35px] cursor-pointer relative flex items-center">
                        Rating
                      </span>
                      <span className="text-base font-extralight capitalize text-[rgba(2,6,12,.7)] ml-[35px] cursor-pointer relative flex items-center">
                        Cost: Low to High
                      </span>
                      <span className="text-base font-extralight capitalize text-[rgba(2,6,12,.7)] ml-[35px] cursor-pointer relative flex items-center">
                        Cost: High to Low
                      </span>
                    </div>
                  </div>
                </div>

                {/* ._1-NQu – filter/sort bar: border-bottom, margin-bottom 40px, padding-bottom 10px */}
                <div
                  className="flex items-center justify-between border-b border-[rgba(40,44,63,.1)] mb-10 pb-2.5"
                  style={{ marginBottom: 40, paddingBottom: 10 }}
                />

                {/* Body placeholder – user will send in next prompt; match Swiggy grid container structure */}
                <div
                  id="collection-mast-content"
                  className="max-w-[1200px] min-w-[1200px] mx-auto"
                  style={{ position: 'relative' }}
                >
                  {/* Restaurant list area – exact body to be provided in next prompt */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="restaurant_list" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
