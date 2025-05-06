import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
        <p className="text-white text-lg">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
        <p className="text-red-300 text-lg">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
        <p className="text-white text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 py-8">
      <div className="container mx-auto px-6">
        <Link
          to="/products"
          className="inline-block mb-6 text-yellow-300 hover:text-yellow-400 transition duration-300"
        >
          ← Back to Products
        </Link>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                {product.title}
              </h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-2xl font-semibold text-gray-800 mb-4">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Category:</span>{" "}
                {product.category}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Brand:</span> {product.brand}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Rating:</span> {product.rating} /
                5
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Stock:</span> {product.stock}{" "}
                units
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Discount:</span>{" "}
                {product.discountPercentage}%
              </p>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Images
                </h3>
                <div className="flex space-x-4 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
