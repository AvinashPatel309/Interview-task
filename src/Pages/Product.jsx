import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("https://dummyjson.com/products", {
          params: {
            limit: productsPerPage,
            skip: (currentPage - 1) * productsPerPage,
          },
        });
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / productsPerPage));
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 py-8">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-center text-white mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
            Our Products
          </span>
        </h2>
        {error && <p className="text-red-300 text-center mb-4">{error}</p>}
        {loading ? (
          <p className="text-white text-center">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-gray-500 mt-1 line-clamp-2">
                  {product.description}
                </p>
              </Link>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-2 px-4 py-2 bg-yellow-300 text-gray-800 rounded-lg hover:bg-yellow-400 disabled:opacity-50 transition duration-300"
          >
            Previous
          </button>
          <span className="mx-4 text-white text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-2 px-4 py-2 bg-yellow-300 text-gray-800 rounded-lg hover:bg-yellow-400 disabled:opacity-50 transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
