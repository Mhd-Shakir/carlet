const LocationCard = () => {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="w-full h-[400px] md:h-[450px] relative hover:scale-[1.005] transition-transform duration-300 ease-in-out">
        <iframe
          title="Carlet by TrueChoice Location"
          src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=carlet by true choice&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full"
          style={{ filter: "grayscale(10%) contrast(110%)" }}
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Carlet by TrueChoice
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Makkaraparamba, Kerala
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
