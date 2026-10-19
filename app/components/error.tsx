export interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className="w-full max-w-lg mx-auto bg-amber-50 border-l-4 border-amber-600 rounded-r-xl p-4 shadow-sm my-4">
      <div className="flex items-start gap-3">
        <span className="text-xl">⚠️</span>
        <div>
          <h4 className="text-sm font-serif font-bold text-amber-900">
            A Tragic Complication
          </h4>
          <p className="text-xs sm:text-sm text-amber-800 font-sans mt-0.5">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}