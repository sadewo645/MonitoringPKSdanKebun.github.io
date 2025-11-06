import { useCallback, useEffect, useState } from 'react';

export function useSheetData(sheetName, fallback = []) {
  const [rows, setRows] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://script.google.com/macros/s/AKfycbzC_v1nuMxeM7TnyfPWAJzqt3ZIb_Wtx3ixbSsS6TBXCGY63YTh_oIX6asv1dcCZ7A/exec?sheet=${sheetName}`,
        { mode: 'cors' }
      );
      const data = await res.json();
      setRows(data);
      setUpdatedAt(new Date());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [sheetName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { rows, loading, error, updatedAt, refresh: fetchData };
}
