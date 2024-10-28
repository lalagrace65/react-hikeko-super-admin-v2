import React from 'react';
import Sidebar from '../components/Sidebar';

export default function CategoryPage() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="mb-4 text-xl font-semibold">Category Page</h1>

        {/* Card form wrapper */}
        <div className="max-w-lg bg-white shadow-lg rounded-lg p-6">
          <form>
            <div className="mb-4">
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter category name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter category description"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
