// import { useState, useEffect } from "react";
// import Image from "next/image";

// function ExplorePage({ initialImages }) {
//     const [images, setImages] = useState(initialImages);
//     const [loading, setLoading] = useState(false);

//     const loadMoreImages = async () => {
//         setLoading(true);
//         const newImages = await fetchImages(images.length, 30);
//         setImages((prevImages) => [...prevImages, ...newImages]);
//         setLoading(false);
//     };

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
//                 loadMoreImages();
//             }
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, [loading]);

//     return (
//         <section className="w-full h-full overflow-y-scroll">
//             <div className="columns-5 gap-0">
//                 {images.map((image, index) => (
//                     <div key={index} className="border-2 border-white">
//                         <Image
//                             src={image.url}
//                             alt={`Image ${index + 1}`}
//                             height={1000}
//                             width={1000}
//                             priority={index < 5}
//                             style={{ height: "100%", width: "100%" }}
//                         />
//                     </div>
//                 ))}
//             </div>
//             {loading && <div>Loading more images...</div>}
//         </section>
//     );
// }

// async function fetchImages(start: number, count: number) {
//     // Replace this with your actual API call to fetch images from S3
//     const response = await fetch(`/api/images?start=${start}&count=${count}`);
//     const data = await response.json();
//     return data.images;
// }

// export default ExplorePage;