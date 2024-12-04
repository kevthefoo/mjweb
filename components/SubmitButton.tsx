import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="max-lg_mobile:text-sm mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-500"
    >
      {pending ? "Generating description..." : "Generate Description"}
    </button>
  );
}
