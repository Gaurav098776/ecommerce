"use client";
// import React, { useEffect } from "react";
// import $ from "jquery";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel";
// import "./reviewcrousel.css";


// export default function ReviewCarousel() {

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//           const interval = setInterval(() => {
//             if ($('.card-slider').length) {
//               $('.card-slider').slick({
//                 dots: true,
//                 infinite: true,
//                 speed: 500,
//                 slidesToShow: 3,
//                 slidesToScroll: 1,
//                 autoplay: true,
//                 autoplaySpeed: 1000,
//                 arrows: true,
//                 responsive: [
//                   {
//                     breakpoint: 600,
//                     settings: {
//                       slidesToShow: 2,
//                       slidesToScroll: 1,
//                     },
//                   },
//                   {
//                     breakpoint: 400,
//                     settings: {
//                       arrows: false,
//                       slidesToShow: 1,
//                       slidesToScroll: 1,
//                     },
//                   },
//                 ],
//               });
//               clearInterval(interval);
//             }
//           }, 100);
//         }
//       }, []);



//   return (
//     <div className="container">
//       <div className="card-slider ">
//       <div className="col-lg-12">
//           <div className="card w-100">
//             <img
//               className="card-img-top"
//               src="https://picsum.photos/seed/picsum/200/200"
//               alt="Card image cap"
//             />
//             <div className="card-body">
//               <h5 className="card-title">Card title</h5>
//               <p className="card-text">
//                 Some quick example text to build on the card title and make up the
//                 bulk of the card's content.
//               </p>
//               <a href="#" className="btn btn-primary">
//                 Go somewhere
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="col-lg-12">
//           <div className="card">
//             <img
//               className="card-img-top"
//               src="https://picsum.photos/seed/picsum/200/200"
//               alt="Card image cap"
//             />
//             <div className="card-body">
//               <h5 className="card-title">Card title</h5>
//               <p className="card-text">
//                 Some quick example text to build on the card title and make up
//                 the bulk of the card's content.
//               </p>
//               <a href="#" className="btn btn-primary">
//                 Go somewhere
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="col-lg-12">
//           <div className="card w-100">
//             <img
//               className="card-img-top img-fluid"
//               src="https://picsum.photos/seed/picsum/200/200"
//               alt="Card image cap"
//             />
//             <div className="card-body">
//               <h5 className="card-title">Card title</h5>
//               <p className="card-text">
//                 Some quick example text to build on the card title and make up
//                 the bulk of the card's content.
//               </p>
//               <a href="#" className="btn btn-primary">
//                 Go somewhere
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="col-lg-12">
//           <div className="card w-100">
//             <img
//               className="card-img-top"
//               src="https://picsum.photos/seed/picsum/200/200"
//               alt="Card image cap"
//             />
//             <div className="card-body">
//               <h5 className="card-title">Card title</h5>
//               <p className="card-text">
//                 Some quick example text to build on the card title and make up
//                 the bulk of the card's content.
//               </p>
//               <a href="#" className="btn btn-primary">
//                 Go somewhere
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="col-lg-12">
//           <div className="card w-100">
//             <img
//               className="card-img-top"
//               src="https://picsum.photos/seed/picsum/200/200"
//               alt="Card image cap"
//             />
//             <div className="card-body">
//               <h5 className="card-title">Card title</h5>
//               <p className="card-text">
//                 Some quick example text to build on the card title and make up
//                 the bulk of the card's content.
//               </p>
//               <a href="#" className="btn btn-primary">
//                 Go somewhere
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Quote } from 'lucide-react';

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200 -mr-5"
  >
    <ChevronRight className="w-6 h-6 text-gray-600" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200 -ml-5"
  >
    <ChevronLeft className="w-6 h-6 text-gray-600" />
  </button>
);




// Shared Tailwind CSS classes
// const cardClasses = "bg-white dark:bg-card rounded-lg shadow-lg p-6 max-w-xs text-center";
// const textMutedForeground = "text-muted-foreground";
// const imageClasses = "w-16 h-16 rounded-full mx-auto mb-4";
// const textPrimary = "text-primary font-semibold";

const testimonials =[
  {
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    name: "James Smith",
    company: "Evernote",
    position: "Senior Developer",
    feedback: "This platform has transformed how we handle our development workflow. The integration capabilities are outstanding.",
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    name: "Sarah Johnson",
    company: "Dropbox",
    position: "Product Manager",
    feedback: "The attention to detail and user experience is remarkable. It's made our team's collaboration seamless.",
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    name: "Michael Chen",
    company: "Airbnb",
    position: "Tech Lead",
    feedback: "We've seen a significant improvement in our development cycle since implementing this solution.",
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    name: "Emily Davis",
    company: "Spotify",
    position: "Engineering Manager",
    feedback: "The robust feature set and intuitive interface have made this an invaluable tool for our team.",
  }
];

const Carousel = () => {


  const TestimonialCard = ({ testimonial }) => {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 mx-3 h-[400px] flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
        <div className="absolute inset-0 bg-blue-500 opacity-10 rounded-full"></div>
      </div>
      
      <Quote className="text-blue-500 w-10 h-10 mb-6 opacity-30" />
      
      <div className="flex flex-col flex-1">
        <p className="text-gray-700 text-lg leading-relaxed mb-6 flex-1 italic">
          "{testimonial.feedback}"
        </p>
        
        <div className="flex items-center mt-auto">
          <img 
            className="w-14 h-14 rounded-full object-cover ring-4 ring-blue-50" 
            src={testimonial.imgSrc} 
            alt={testimonial.name} 
          />
          <div className="ml-4">
            <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
            <div className="flex flex-col">
              <span className="text-blue-600 font-medium">{testimonial.company}</span>
              <span className="text-sm text-gray-500">{testimonial.position}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          What Our Clients Say
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover why companies trust us to deliver exceptional results
        </p>
      </div>
      
      <div className="relative px-6">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;

