import { useEffect, useState } from "react";
import { addToCart } from "../../utils/shoppingSlice";
import { useDispatch } from "react-redux";
import EcommerceSearch from "./EcommerceSearch";
import EcommerceCard from "./EcommerceCard";

function EcommerceDisplay() {
  const dispatch = useDispatch();
  const [dinos, setDinos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const getRandomDinos = (dinos, count) => {
    const shuffled = [...dinos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    async function getDinos() {
      try {
        const res = await fetch("https://api-example-wg44.onrender.com");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setDinos(data);
        setFiltered(getRandomDinos(data));
      } catch (error) {
        console.error("Error fetching dinos", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    }
    getDinos();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: item._id, // Use _id from API data
        name: item.name,
        price: item.price,
        inStock: item.inStock,
        quantity: 1,
        imageSrc: item.imageSrc, // Include imageSrc here
      }),
    );
  };

  // Calculate the dinos to be displayed based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="m-10 flex flex-col items-center gap-6">
      <div className="w-full p-4 text-center md:max-w-[50rem]">
        <h1 className="mb-3 text-4xl">Dino online shop</h1>
        <p>
          Buy your favorite dinosaur toys, figures, and merchandise for yourself
          and your children from our wide selection of products.
        </p>
      </div>

      <section className="bg-bgColor flex w-full flex-col items-center gap-6 rounded-lg bg-gray-100 p-4 md:max-w-[50rem]">
        {/* search and filters */}
        <EcommerceSearch dinos={dinos} setFiltered={setFiltered} setCurrentPage={setCurrentPage} />

        {/* responsive grid */}
        {loading ? (
          <div className="flex h-96 w-[40rem] items-center justify-center text-2xl">
            Fetching data...
          </div>
        ) : currentItems.length === 0 ? (
          <div className="flex h-96 w-[40rem] items-center justify-center text-2xl">
            No dinosaurs found.
          </div>
        ) : (
          <>
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {currentItems.map((dino) => (
                <EcommerceCard
                  key={dino._id}
                  item={dino}
                  handleAddToCart={handleAddToCart}
                />
              ))}
            </div>
            {/* Pagination controls */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 mx-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default EcommerceDisplay;
