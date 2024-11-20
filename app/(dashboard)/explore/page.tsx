import Image from "next/image";
// import image1 from "@/assets/1.png";
// import image2 from "@/assets/2.png";
// import image3 from "@/assets/3.png";
// import image4 from "@/assets/4.png";
// import image5 from "@/assets/5.png";
// import image6 from "@/assets/6.png";
// import image7 from "@/assets/7.png";
// import image8 from "@/assets/8.png";
// import image9 from "@/assets/9.png";

export default async function Explore() {
    return (
        <section className="w-full h-full overflow-y-scroll">
            <div className="columns-5 gap-0">
                <div className="border-2 border-white">
                    <Image
                        src="https://mjgallery.s3.us-east-1.amazonaws.com/0_0_384_N.webp"
                        alt="ad"
                        height={100}
                        width={100}
                        priority={true}
                        style={{ height: "100%", width: "100%" }}
                    />
                </div>
            </div>
        </section>
    );
}
