import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { timelineEvents } from "../utils/data";

function Timeline() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = () => {
    if (selectedIndex < timelineEvents.length - 1) {
      setSelectedIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center py-32 p-8 bg-bgcolor">
      <div className="flex items-center justify-between w-full max-w-4xl">
        <button
          onClick={handlePrev}
          disabled={selectedIndex === 0}
          className="p-3 rounded-custom border-2 border-grayOne text-lg hover:border-primary transition-all hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-grayOne disabled:hover:text-dark"
        >
          <IoIosArrowBack />
        </button>

        <div className="relative flex-1 mx-4">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-grayOne transform -translate-y-1/2">
            <div
              className="h-1 bg-primary transition-all duration-500"
              style={{
                width: `${
                  (selectedIndex / (timelineEvents.length - 1)) * 100
                }%`,
              }}
            ></div>
          </div>

          <div className="flex justify-between items-center relative z-10">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className="relative py-1 cursor-pointer flex flex-col items-center"
              >
                <span
                  className={`absolute -top-16 p-2 text-center w-23 text-sm  ${
                    index === selectedIndex ? "text-primary" : "text-dark"
                  }`}
                >
                  {event.title}
                </span>

                <div
                  className={`w-5 h-5 rounded-full ${
                    index <= selectedIndex
                      ? "bg-primary delay-300 border-primary"
                      : "bg-bgcolor delay-0 border-grayOne hover:bg-primary"
                  } border-2 transform -translate-y-0 transition-colors`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selectedIndex === timelineEvents.length - 1}
          className="p-3 rounded-custom border-2 border-grayOne text-lg hover:border-primary transition-all hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-grayOne disabled:hover:text-dark"
        >
          <IoIosArrowForward />
        </button>
      </div>

      <div className="mt-10 p-6 text-dark flex flex-col gap-4 w-full max-w-4xl">
        <h2 className="text-5xl font-titles">
          {timelineEvents[selectedIndex].title}
        </h2>
        <p className="italic text-dark/50 textsize">
          - {timelineEvents[selectedIndex].time}
        </p>
        <p className="mt-4 text-textsize text-lg">
          {timelineEvents[selectedIndex].description}
        </p>
      </div>
    </div>
  );
}

export default Timeline;
