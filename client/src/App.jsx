import { Routes, Route, Navigate } from "react-router-dom";
import CreateRecipePage from "./pages/CreateRecipePage.jsx";
import SavedRecipePage from "./pages/SavedRecipePage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./ui/Navbar.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

// Sample recipe data
const recipes = [
  { name: "Masala Dosa", category: "Indian" },
  { name: "Pizza", category: "Italian" },
  { name: "Sushi", category: "Japanese" },
  { name: "Pasta", category: "Italian" },
  { name: "Biryani", category: "Indian" },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setFilteredCategory(event.target.value);
  };

  const handleSearch = () => {
    let result = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredCategory !== "All") {
      result = result.filter((recipe) => recipe.category === filteredCategory);
    }
    setFilteredRecipes(result);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ReactQueryDevtools initialIsOpen={false} />
      <Navbar />

      <div className="container mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Navigate replace to="/home" />
              }
            />
            <Route
              path="/home"
              element={
                <div>
                  {/* Search Box and Filters */}
                  <div className="flex justify-center gap-4 mt-4 mb-8">
                    <input
                      type="text"
                      placeholder="Search Recipes"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <select
                      value={filteredCategory}
                      onChange={handleCategoryChange}
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="All">All Categories</option>
                      <option value="Indian">Indian</option>
                      <option value="Italian">Italian</option>
                      <option value="Japanese">Japanese</option>
                    </select>
                    <button
                      onClick={handleSearch}
                      className="p-2 bg-blue-500 text-white rounded"
                    >
                      Search
                    </button>
                  </div>

                  {/* Displaying the filtered recipe list */}
                  <h1 className="text-center text-2xl font-bold mb-4">
                    Recipe List
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredRecipes.length > 0 ? (
                      filteredRecipes.map((recipe, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded shadow-lg"
                        >
                          <h2 className="font-bold">{recipe.name}</h2>
                          <p>{recipe.category}</p>
                        </div>
                      ))
                    ) : (
                      <p>No recipes found</p>
                    )}
                  </div>
                </div>
              }
            />
            <Route path="/create-recipe" element={<CreateRecipePage />} />
            <Route path="/saved-recipes" element={<SavedRecipePage />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: " #374151",
          },
        }}
      />
    </div>
  );
};

export default App;