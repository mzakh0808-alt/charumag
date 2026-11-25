export const formatPrice = (kopecks: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(kopecks / 100);

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Moscow",
  }).format(new Date(`${value}T12:00:00+03:00`));

export const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Moscow",
  }).format(new Date(value));

export const teaTypeLabels: Record<string, string> = {
  black: "Чёрный",
  green: "Зелёный",
  white: "Белый",
  oolong: "Улун",
  puer: "Пуэр",
  herbal: "Травяной",
};

export const orderStatusLabels: Record<string, string> = {
  new: "Новый",
  confirmed: "Подтверждён",
  ready: "Готов к выдаче",
  completed: "Завершён",
  cancelled: "Отменён",
};

export const bookingStatusLabels: Record<string, string> = {
  new: "Новая",
  confirmed: "Подтверждена",
  completed: "Проведена",
  cancelled: "Отменена",
};
