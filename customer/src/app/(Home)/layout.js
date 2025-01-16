'use client'
import Footer from "@/components/webcomponent/Footer";
import Navbar from "@/components/webcomponent/NavBar";

export default function HomeLayout({ children }) {
  return (
  <main>
    <Navbar/>
    {children}
    <Footer/>
    </main>
  )
}