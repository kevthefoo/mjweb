"use client";
// import Image from "next/image";

export default function Explore() {
    const fetchImage = async () => {
        try {
            const response = await fetch("/api/gallery");
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            console.log(data.images[0].metadata.webp_url);
        } catch (error) {
            console.error(error);
            console.log("fuckkkkkkkkkkkk");
            return;
        }
    };

    return (
        <section className="w-full h-full overflow-y-scroll">
            <div className="columns-5 gap-0">
                <div onClick={fetchImage}>fetchImage</div>
                {/* <div className="border-2 border-white">
                    <Image
                        src="https://mjgallery.s3.us-east-1.amazonaws.com/4cdd4076-9f19-446a-af71-3b10d433bfb7.webp"
                        alt="ad"
                        height={1000}
                        width={1000}
                        priority={true}
                        style={{ height: "100%", width: "100%" }}
                    />
                </div> */}
            </div>
        </section>
    );
}
