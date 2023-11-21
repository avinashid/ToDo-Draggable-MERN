const LoadingPopup = ({ isLoading }) => {
  return (
    <div
      className={`fixed top-20 right-0  p-2 px-4 rounded-l-xl shadow-xl border   bg-gray-white bg-opacity-50 ${
        isLoading ? "animate-slide-in" : "hidden"
      }`}
    >
      <p>Loading...</p>
    </div>
  );
};

export default LoadingPopup;
