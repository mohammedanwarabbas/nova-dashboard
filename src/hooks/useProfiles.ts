import { useQuery } from '@tanstack/react-query';
import { fetchProfiles } from '../services/api';

export const useProfiles = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const data = await fetchProfiles();
      // Handle different API response formats
      if (Array.isArray(data)) {
        return data;
      }
      // If object, extract array from common keys
      return data.profiles || data.items || data.data || data.results || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};