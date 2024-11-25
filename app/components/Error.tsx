import { AlertCircle } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  message: string;
  retry?: () => void;
}

export default function Error({ message, retry }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-red-50 border border-red-100 rounded-lg">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-red-700 text-lg font-semibold mb-4">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
      <Link href="/" className="mt-4 text-red-600 hover:underline">
        Return to Home
      </Link>
    </div>
  );
}
