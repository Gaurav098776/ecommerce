
import ProductGrid from "@/components/webcomponent/Product";
import TestiMonialCrousel from "@/components/webcomponent/TestiMonialCrousel";
import ReviewCarousel from "@/components/webcomponent/ReviewCrousel";

import Navbar from "@/components/webcomponent/NavBar";
import Footer from "@/components/webcomponent/Footer";

export default function Home() {
  return (
    <>
      <Navbar/>
      <TestiMonialCrousel />
      <div className="min-h-fit w-full flex justify-start items-center mt-4 shadow-2xl overflow-hidden	">
        <h1 className="text-4xl p-4 text-black">Top selling product</h1>
      </div>
      <ProductGrid />
      <ReviewCarousel />
      <Footer/>
    </>
  );
}
