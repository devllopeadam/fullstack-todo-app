const Skeleton = () => {
  return (
    <div
      role="status"
      className="animate-pulse flex flex-col gap-3">
      <div className="flex items-center justify-between px-4 py-5 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <div className="h-3 bg-gray-300 rounded-md dark:bg-gray-300 w-4"></div>
          <div className="h-3 bg-gray-300 rounded-md dark:bg-gray-300 w-24"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 bg-gray-300 rounded-md dark:bg-gray-300 w-12"></div>
          <div className="h-8 bg-gray-300 rounded-md dark:bg-gray-300 w-12"></div>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-5 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <div className="h-3 bg-gray-300 rounded-md dark:bg-gray-300 w-4"></div>
          <div className="h-3 bg-gray-300 rounded-md dark:bg-gray-300 w-24"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 bg-gray-300 rounded-md dark:bg-gray-300 w-12"></div>
          <div className="h-8 bg-gray-300 rounded-md dark:bg-gray-300 w-12"></div>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-5 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <div className="h-3 bg-gray-300 rounded-md dark:bg-gray-300 w-4"></div>
          <div className="h-3 bg-gray-300 rounded-md dark:bg-gray-300 w-24"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 bg-gray-300 rounded-md dark:bg-gray-300 w-12"></div>
          <div className="h-8 bg-gray-300 rounded-md dark:bg-gray-300 w-12"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
