"use client";

import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { CiMedicalCross } from "react-icons/ci";
 
const handleCopyToClipboard = (prompt: string) => {
  navigator.clipboard
    .writeText(prompt)
    .then(() => {
      toast.success("Prompt copied to clipboard");
    })
    .catch(() => {
      toast.error("Prompt copied to clipboard");
    });
};

export default function Vision() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setDescription(null);
    setError(null);

    try {
      const response = await fetch("/api/describe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imagePreview }),
      });

      if (!response.ok) {
        throw new Error("Failed to call GPT API");
      }

      const data = await response.json();
      console.log(data);

      const descrivedText = JSON.parse(
        data.result.content.replaceAll("json", "").replaceAll("```", ""),
      ).text;

      setDescription(descrivedText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="max-rg_tablet:pb-12 flex h-full w-full flex-col justify-between bg-neutral-800">
      <form
        action={handleSubmit}
        className="flex h-full flex-col items-center justify-center"
      >
        <h1 className="mb-4 text-center text-3xl max-lg_mobile:text-xl">Image to Text</h1>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          id="upload_input"
          className="absolute hidden"
        />
        <label
          htmlFor="upload_input"
          className="max-rg_tablet:h-1/3 relative mb-8 flex h-1/2 w-1/2 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-white font-bold"
        >
          <div className="max-rg_tablet:text-[100px] mb-4 text-[150px]">
            <CiMedicalCross />
          </div>
          {imagePreview ? (
            <p className="mb-4"></p>
          ) : (
            <p className="mb-4">Upload Your Image</p>
          )}

          {imagePreview && (
            <Image
              src={decodeURIComponent(imagePreview)}
              alt="Preview"
              fill={true}
              className="absolute h-full w-full object-contain"
            />
          )}
        </label>

        <SubmitButton />
        {description ? (
          <div
            className="max-lg_mobile:block max-lg_mobile:text-sm hidden cursor-pointer rounded-xl border-2 border-white px-4 py-2 text-slate-300 hover:text-slate-50"
            onClick={() => handleCopyToClipboard(description)}
          >
            Copy Prompt
          </div>
        ) : (
          <div className="max-lg_mobile:block hidden px-4 py-2  h-10"></div>
        )}
      </form>

      <div className="max-lg_mobile:hidden flex h-1/6 bg-neutral-700">
        <div className="w-full overflow-y-scroll">
          {description && (
            <p
              className="cursor-pointer px-4 py-2 text-slate-300 hover:text-slate-50"
              onClick={() => handleCopyToClipboard(description)}
            >
              {description}
            </p>
          )}
          <p>{error}</p>
        </div>
      </div>
    </section>
  );
}
