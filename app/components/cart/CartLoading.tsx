export default function CartLoading() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 animate-pulse">
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="w-24 h-8 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-8 border-t border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/6"></div>
        </div>
        <div className="flex justify-between items-center mb-8">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/5"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
      </div>
    </div>
  );
}
