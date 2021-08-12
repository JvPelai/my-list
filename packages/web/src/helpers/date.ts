import { format } from 'date-fns';

const formatDate = (date: string): string => {
  const dateToFormat = new Date(date);
  const formattedDate = format(dateToFormat, 'MM/dd/yyyy');
  return formattedDate;
};

export { formatDate };
