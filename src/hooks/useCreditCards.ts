import { useQuery } from '@tanstack/react-query';
import { fetchCreditCards } from '../services/api';

// Custom hook to fetch and manage credit card data
// Uses React Query for caching, stale time management, and automatic refetching
export const useCreditCards = () => {
  // useQuery hook manages the data fetching lifecycle
  return useQuery({
    // Unique key for caching - used to identify this query in the cache
    queryKey: ['credit-cards'],
    
    // Main function that fetches the data from the API
    queryFn: async () => {
      // Call the API service function to get credit card data
      const data = await fetchCreditCards();
      
      // Handle different possible response structures from the API
      // Some APIs return arrays directly, others wrap data in objects
      if (Array.isArray(data)) {
        // If response is already an array, return it directly
        return data;
      }
      
      // Try common property names that APIs might use to wrap arrays
      // This makes the hook more resilient to API response format changes
      return data.cards || data.items || data.data || data.results || [];
    },
    
    // Time in milliseconds before data is considered "stale" and eligible for refetching
    // 5 minutes = 300,000 milliseconds
    staleTime: 5 * 60 * 1000,
    
    // Time in milliseconds before unused data is garbage collected from cache
    // 10 minutes = 600,000 milliseconds
    gcTime: 10 * 60 * 1000,
    
    // Number of retry attempts if the query fails
    retry: 2,
  });
};