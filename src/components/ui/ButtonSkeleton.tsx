const ButtonSkeleton = () => {
  return (
    <div
      role="status"
      className="animate-pulse flex flex-col gap-3">
      <div className="h-10 bg-gray-300 rounded-md dark:bg-gray-300 w-32"></div>
    </div>
  );
};

export default ButtonSkeleton;
