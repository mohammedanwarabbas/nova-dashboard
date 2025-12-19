import { useQuery } from '@tanstack/react-query';
import { fetchCreditCards } from '../services/api';

export const useCreditCards = () => {
  return useQuery({
    queryKey: ['credit-cards'],
    queryFn: async () => {
      const data = await fetchCreditCards();
      if (Array.isArray(data)) {
        return data;
      }
      return data.cards || data.items || data.data || data.results || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};