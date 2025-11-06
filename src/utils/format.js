export const toNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  const cleaned = String(value).replace(/[^0-9,.-]/g, '').replace(/,(?=\d{3}(?:\D|$))/g, '');
  const normalized = cleaned.replace(',', '.');
  const number = Number(normalized);
  return Number.isNaN(number) ? 0 : number;
};

export const formatNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  const number = Number(value);
  if (Number.isNaN(number)) {
    return value;
  }

  if (number >= 1_000_000_000) {
    return `${(number / 1_000_000_000).toFixed(1)}M`;
  }

  if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(1)}J`;
  }

  if (number >= 1_000) {
    return `${(number / 1_000).toFixed(1)}K`;
  }

  if (Number.isInteger(number)) {
    return number.toLocaleString('id-ID');
  }

  return number.toLocaleString('id-ID', { maximumFractionDigits: 2 });
};

export const formatDateTime = (date) => {
  if (!date) return '-';
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
