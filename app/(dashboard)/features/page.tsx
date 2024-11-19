import Image from "next/image";
import image1 from "@/assets/1.png";
import gptlogo from "@/assets/gptlogo.png";
export default async function Features() {
    return (
        <section className="w-full h-full overflow-x-hidden over-flow-y-scroll">
            <div className="">
                <div className="flex justify-around items-center">
                    <div className="">
                        <h1>High Quality AI Image</h1>
                        <p>
                            Say hello to Johnny, the text-to-image AI bot that
                            brings your words to life! Whether you are looking
                            to visualize your wildest dreams, create stunning
                            artwork, or simply have fun with text prompts,
                            Johnny is here to transform your ideas into
                            beautiful images. With cutting-edge AI technology
                            and a friendly interface, Johnny makes it easy and
                            enjoyable to turn your imagination into reality. Let
                            Johnny be your creative companion and watch as your
                            words become vivid, captivating visuals!
                        </p>
                    </div>
                    <Image src={image1} width={250} alt="" />
                </div>

                <div className="flex justify-around items-center">
                    <Image
                        src={gptlogo}
                        alt="gpt_logo"
                        width={250}
                        className="gpt_logo_image"
                    />
                    <div>
                        <h1>Customizable Outputs</h1>
                        <p>
                            Refine your images with customizable settings like
                            resolution, color tones, and artistic filters to
                            ensure your creation stands out.
                        </p>
                    </div>
                </div>
                <div className="flex justify-around items-center">
                    <div>
                        <h1> Convenient Discord Integration</h1>
                        <p>
                            No extra apps or downloads needed! Our powerful
                            Text-to-Image AI lives right on Discord. Simply use
                            bot commands in your favorite server to generate
                            amazing artwork.
                        </p>
                    </div>
                    <Image
                        src={gptlogo}
                        alt="gpt_logo"
                        width={250}
                        className="gpt_logo_image"
                    />
                </div>
                <div className="flex justify-around items-center">
                    <div>
                        <h1> Unlimited GPT-4o Use</h1>
                        <p>
                            To provide better user experience, we have been
                            integrating the latest GPT models to our Discord
                            bot, enhancing its conversational abilities and
                            ensuring more accurate, context-aware responses.
                            These upgrades allow our bot to understand and
                            respond to user queries more effectively, offering
                            personalized interactions and support. Additionally,
                            the integration of these advanced models improves
                            the bot&aposs ability to handle a wider range of
                            topics, from casual conversations to complex
                            technical assistance. The latest model is 4o, and we
                            will be continuously updating our bot if there is a
                            newest model released.
                        </p>
                    </div>
                    <Image
                        src={gptlogo}
                        alt="gpt_logo"
                        width={250}
                        className="gpt_logo_image"
                    />
                </div>
            </div>
        </section>
    );
}
