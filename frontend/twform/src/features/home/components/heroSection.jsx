const HomeHeroSection = ({ images }) => {
  return (
    <div className="h-115 relative bg-indigo-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-30"
          src={images.researchHero}
          alt="Research background"
        />
        <div className="absolute inset-0 bg-blue-700 mix-blend-multiply"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white px-4">
          St. Michael`s College of Iligan
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-1xl font-extrabold tracking-tight text-white px-4">
          Research Management Office
        </h1>
        <p className=" sm:mt-3 text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto px-4">
          Fostering innovation and excellence in academic research
        </p>
      </div>
    </div>
  );
};

export default HomeHeroSection;
