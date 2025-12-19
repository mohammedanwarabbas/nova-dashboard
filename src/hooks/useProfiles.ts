import { useQuery } from '@tanstack/react-query';
import { fetchProfiles } from '../services/api';

// Hook for fetching profile data from the API
// Uses React Query to handle loading, error, and caching automatically
export const useProfiles = () => {
  return useQuery({
    // Unique key for React Query cache - helps identify and reuse cached data
    queryKey: ['profiles'],
    
    // Function that actually fetches the data from the API
    queryFn: async () => {
      // Call the API service to get profile data
      const data = await fetchProfiles();
      
      // Check if the response is already an array (some APIs return arrays directly)
      if (Array.isArray(data)) {
        return data;
      }
      
      // If the API returns an object instead of array, try to extract the array
      // We check common property names that APIs use to wrap their data
      return data.profiles || data.items || data.data || data.results || [];
    },
    
    // How long the data stays "fresh" before being marked as stale
    // 5 minutes = 300,000 milliseconds
    staleTime: 5 * 60 * 1000,
    
    // How long inactive data stays in cache before being removed
    // 10 minutes = 600,000 milliseconds  
    gcTime: 10 * 60 * 1000,
    
    // How many times to retry if the API call fails
    retry: 2,
  });
};