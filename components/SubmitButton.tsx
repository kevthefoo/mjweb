import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  isUploaded: boolean;
}

export default function SubmitButton({ isUploaded }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || !isUploaded}
      className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-500 max-lg_mobile:text-sm"
    >
      {pending ? "Generating description..." : "Generate Description"}
    </button>
  );
}
