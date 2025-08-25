import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import ProductCard from './../components/ProductCard'
import { Search, Filter } from 'lucide-react'
import { BACKEND_URL } from './../config/config'

const ProductsPage = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "";

  // Pagination states
  const [pagination, setPagination] = useState({})
  const [categories, setCategories] = useState([])

  const goToPage = (page) => {
    setSearchParams({
      page: page.toString(),
      ...(searchQuery && { search: searchQuery }),
      ...(categoryFilter && { category: categoryFilter })
    })
  }

  const handleSearch = (searchTerm) => {
    setSearchParams({
      search: searchTerm,
      page: "1" // Reset to first page on search
    })
  }

  const handleCategoryFilter = (category) => {
    setSearchParams({
      category: category === categoryFilter ? "" : category,
      page: "1" // Reset to first page on filter change
    })
  }

  const fetchProducts = async (pageNo = 1, search = "", category = "") => {
    try {
      setLoading(true)
      let url = `${BACKEND_URL}/api/products?page=${pageNo}`;

      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }

      let res = await fetch(url);
      let data = await res.json();

      // Debug: Log the response to see the data structure
      console.log('API Response:', data);
      console.log('Products:', data.products);
      if (data.products && data.products.length > 0) {
        console.log('First product:', data.products[0]);
        console.log('First product images:', data.products[0].images);
        console.log('First product mainImage:', data.products[0].mainImage);
      }

      setProducts(data.products)
      setPagination(data.pagination)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      let res = await fetch(`${BACKEND_URL}/api/products/categories/list`);
      let data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts(currentPage, searchQuery, categoryFilter);
  }, [currentPage, searchQuery, categoryFilter])

  useEffect(() => {
    fetchCategories();
  }, [])

  if (loading) {
    return (
      <section className='py-10'>
        <div className="container max-w-7xl mx-auto">
          {/* Header */}
          <div className="heading mb-8">
            <h3 className="heading text-3xl font-bold mb-2">Products</h3>
            <p className='text-gray-600'>Find the best products for you!</p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            {/* Search Bar Skeleton */}
            <div className="relative max-w-md">
              <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Category Filters Skeleton */}
            <div className="flex flex-wrap gap-2">
              <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-24 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Skeleton Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                {/* Image Skeleton */}
                <div className="w-full h-64 bg-gray-200 rounded-md animate-pulse mb-3"></div>

                {/* Content Skeleton */}
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="flex justify-between items-center">
                    <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='py-10'>
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="heading mb-8">
          <h3 className="heading text-3xl font-bold mb-2">Products</h3>
          <p className='text-gray-600'>Find the best products for you!</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filters */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <Filter size={16} />
                Categories:
              </span>
              <button
                onClick={() => handleCategoryFilter("")}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${!categoryFilter
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${categoryFilter === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Summary */}
        {products.length > 0 && (
          <div className="mb-6 text-sm text-gray-600">
            Showing {products.length} of {pagination.total || 0} products
            {searchQuery && ` for "${searchQuery}"`}
            {categoryFilter && ` in ${categoryFilter}`}
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <div>
            <div className="product_grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {products.map((product, idx) => (
                <ProductCard key={product._id} p={product} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className='flex my-8 justify-center items-center gap-3'>
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className={`px-4 py-2 rounded-lg border transition-colors ${currentPage <= 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  Previous
                </button>

                <div className="count flex gap-1">
                  {Array.from({ length: pagination.pages }, (item, i) => (
                    <button
                      onClick={() => goToPage(i + 1)}
                      key={i}
                      className={`px-3 py-2 rounded-lg border transition-colors ${currentPage === i + 1
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}>
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= pagination.pages}
                  className={`px-4 py-2 rounded-lg border transition-colors ${currentPage >= pagination.pages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl text-gray-500 mb-2">No products found</h3>
            <p className="text-gray-400">
              {searchQuery || categoryFilter
                ? `Try adjusting your search or filter criteria`
                : `No products available at the moment`
              }
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductsPage