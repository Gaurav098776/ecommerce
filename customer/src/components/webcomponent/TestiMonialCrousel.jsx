// 'use client';
// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// const reviews = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     role: "Marketing Director",
//     content: "This product has completely transformed our workflow. The interface is intuitive and the features are exactly what we needed.",
//     rating: 5,
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     role: "Software Engineer",
//     content: "Outstanding service and support. The team went above and beyond to ensure our success.",
//     rating: 5,
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
//   },
//   {
//     id: 3,
//     name: "Emily Rodriguez",
//     role: "Product Manager",
//     content: "A game-changer for our organization. The results speak for themselves.",
//     rating: 4,
//     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
//   }
// ];

// const ReviewCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000); // Change slide every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="relative w-full max-w-4xl bg- mx-auto px-4 py-16">
//       <div className="overflow-hidden relative rounded-xl bg-white shadow-xl">
//         <div 
//           className="flex transition-transform duration-500 ease-out"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {reviews.map((review) => (
//             <div
//               key={review.id}
//               className="w-full flex-shrink-0 p-8"
//             >
//               <div className="flex flex-col items-center text-center">
//                 <img
//                   src={review.image}
//                   alt={review.name}
//                   className="w-20 h-20 rounded-full object-cover mb-4"
//                 />
//                 <div className="flex gap-1 mb-4">
//                   {[...Array(review.rating)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 italic mb-6">"{review.content}"</p>
//                 <h3 className="font-semibold text-lg">{review.name}</h3>
//                 <p className="text-gray-500">{review.role}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={prevSlide}
//           className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
//         >
//           <ChevronLeft className="w-6 h-6" />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
//         >
//           <ChevronRight className="w-6 h-6" />
//         </button>

//         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//           {reviews.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               className={`w-2 h-2 rounded-full transition-all ${
//                 index === currentIndex ? 'bg-blue-600 w-4' : 'bg-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewCarousel;


"use client";
import { useEffect } from "react";
import "./testi.css";

export default function FrontPage() {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUserName(decodedToken.user_name);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    //- Slider functionality
    const items = document.querySelectorAll(".item"),
      controls = document.querySelectorAll(".control"),
      headerItems = document.querySelectorAll(".item-header"),
      descriptionItems = document.querySelectorAll(".item-description"),
      activeDelay = 0.76,
      interval = 5000;
    let current = 0;
    const slider = {
      init: () => {
        controls.forEach((control) =>
          control.addEventListener("click", (e) => {
            slider.clickedControl(e);
          })
        );
        controls[current].classList.add("active");
        items[current].classList.add("active");
      },
      nextSlide: () => {
        slider.reset();
        if (current === items.length - 1) current = -1;
        current++;
        controls[current].classList.add("active");
        items[current].classList.add("active");
        slider.transitionDelay(headerItems);
        slider.transitionDelay(descriptionItems);
      },
      clickedControl: (e) => {
        slider.reset();
        clearInterval(intervalF);
        const control = e.target,
          dataIndex = Number(control.dataset.index);
        control.classList.add("active");
        items.forEach((item, index) => {
          if (index === dataIndex) {
            item.classList.add("active");
          }
        });
        current = dataIndex;
        slider.transitionDelay(headerItems);
        slider.transitionDelay(descriptionItems);
        intervalF = setInterval(slider.nextSlide, interval);
      },
      reset: () => {
        items.forEach((item) => item.classList.remove("active"));
        controls.forEach((control) => control.classList.remove("active"));
      },
      transitionDelay: (items) => {
        let seconds;
        items.forEach((item) => {
          const children = item.childNodes;
          let count = 1,
            delay;
          item.classList.value === "item-header"
            ? (seconds = 0.015)
            : (seconds = 0.007);
          children.forEach((child) => {
            if (child.classList) {
              item.parentNode.classList.contains("active")
                ? (delay = count * seconds + activeDelay)
                : (delay = count * seconds);
              child.firstElementChild.style.transitionDelay = `${delay}s`;
              count++;
            }
          });
        });
      },
    };
    let intervalF = setInterval(slider.nextSlide, interval);
    slider.init();

  });



  return (
    <main>
      <>
        <div className="slideshow">
          <div className="slideshow-items">
            <div className="item">
              <div className="item-image-container">
                <img
                  className="item-image"
                  src="https://i.ibb.co/d7Rn88d/slide1.jpg"
                />
              </div>
              <div className="item-header">
                <span className="vertical-part">
                  <b>
                    Striking Deals On <em>Men's FootWare</em>
                  </b>
                </span>
              </div>
              <div className="item-description">
                <span className="vertical-part desc">
                  <b>Offers you cannot miss! upto 80% off</b>
                </span>
              </div>
            </div>
            <div className="item">
              <div className="item-image-container">
                <img
                  className="item-image"
                  src="https://i.ibb.co/fQrPPpR/slide2.jpg"
                />
              </div>
              <div className="item-header">
                <span className="vertical-part">
                  <b>
                    Top Deals On <em>Cook Ware</em>
                  </b>
                </span>
              </div>
              <div className="item-description">
                <span className="vertical-part desc">
                  <b>
                    Upto 10% off on cart value more than{" "}
                    <i className="fa fa-rupee" />
                    5000
                  </b>
                </span>
              </div>
            </div>
            <div className="item">
              <div className="item-image-container">
                <img
                  className="item-image"
                  src="https://i.ibb.co/GJ9C3kV/slide3.jpg"
                />
              </div>
              <div className="item-header">
                <span className="vertical-part" style={{ color: "#fff" }}>
                  <b>
                    ShopNow On <em>ShopFushion</em>
                  </b>
                </span>
              </div>
              <div className="item-description">
                <span className="vertical-part desc" style={{ color: "#fff" }}>
                  <b>Get upto 70% off.</b>
                </span>
              </div>
            </div>
          </div>
          <div className="controls">
            <ul>
              <li className="control" data-index={0} />
              <li className="control" data-index={1} />
              <li className="control" data-index={2} />
            </ul>
          </div>
        </div>
      </>
    </main>
  );
}
