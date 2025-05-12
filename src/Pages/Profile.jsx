import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user || !user.id) {
        setError("User information not found");
        setLoading(false);
        return;
      }

      try {
        // Fetch complete user details
        const response = await axios.get(
          `https://dummyjson.com/users/${user.id}`
        );
        setUserDetails(response.data);

        // Fetch some products for the user
        const productsResponse = await axios.get(
          "https://dummyjson.com/products?limit=4"
        );
        setUserProducts(productsResponse.data.products);
      } catch (err) {
        console.error(err);
        setError("Failed to load user profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
        <div className="text-white text-lg">Loading profile...</div>
      </div>
    );
  }

  if (error || !userDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
        <div className="text-red-300 text-lg">
          {error || "User not found. Please try logging in again."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-32 sm:h-48"></div>

          <div className="relative px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center">
              <img
                src={userDetails.image}
                alt={`${userDetails.firstName} ${userDetails.lastName}`}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white -mt-12 sm:-mt-16 shadow-lg object-cover"
              />

              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {userDetails.firstName} {userDetails.lastName}
                </h1>
                <p className="text-gray-600">@{userDetails.username}</p>
                <p className="text-gray-500 mt-1">{userDetails.email}</p>
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-auto">
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>

            {/* User Details */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-500 sm:w-32">Full Name:</span>
                    <span className="font-medium text-gray-800">
                      {userDetails.firstName} {userDetails.maidenName}{" "}
                      {userDetails.lastName}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-500 sm:w-32">Gender:</span>
                    <span className="font-medium text-gray-800">
                      {userDetails.gender}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-500 sm:w-32">Birth Date:</span>
                    <span className="font-medium text-gray-800">
                      {new Date(userDetails.birthDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-500 sm:w-32">Phone:</span>
                    <span className="font-medium text-gray-800">
                      {userDetails.phone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Address
                </h2>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-500 sm:w-32">Street:</span>
                    <span className="font-medium text-gray-800">
                      {userDetails.address.address}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-500 sm:w-32">City:</span>
                    <span className="font-medium text-gray-800">
                      {userDetails.address.city}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-500 sm:w-32">State:</span>
                    <span className="font-medium text-gray-800">
                      {userDetails.address.state}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-500 sm:w-32">Postal Code:</span>
                    <span className="font-medium text-gray-800">
                      {userDetails.address.postalCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* User's Products Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  My Products
                </h2>
                <Link
                  to="/products"
                  className="text-indigo-600 hover:text-indigo-800 flex items-center transition duration-300"
                >
                  View All Products
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {userProducts.map((product) => (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:scale-105"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-indigo-600 font-medium">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-gray-500 mt-1 text-sm line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
