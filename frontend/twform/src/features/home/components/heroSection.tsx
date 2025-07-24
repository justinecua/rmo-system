const HomeHeroSection = ({ images }) => {
  return (
    <div className="relative bg-indigo-800 overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-30"
          src={images.researchHero}
          alt="Research background"
        />
        <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          SMCII Research Management Office
        </h1>
        <p className="mt-2 text-xl text-indigo-100 max-w-3xl mx-auto">
          Fostering innovation and excellence in academic research
        </p>
      </div>
    </div>
  );
};

export default HomeHeroSection;
