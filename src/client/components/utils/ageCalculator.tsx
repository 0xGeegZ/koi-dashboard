import {
  format,
  differenceInCalendarMonths,
  differenceInMonths,
} from "date-fns";

export const getCurrentAgeText = (
  birthDate: string,
  referenceDate = new Date()
) => {
  const newBirthDate = new Date(birthDate);
  const ageInMonths = differenceInCalendarMonths(referenceDate, newBirthDate);
  if (ageInMonths < 15) {
    return "Tosai";
  } else if (ageInMonths < 27) {
    return "Nisai";
  } else if (ageInMonths < 39) {
    return "Sansai";
  } else if (ageInMonths < 51) {
    return "Yonsai";
  } else if (ageInMonths < 63) {
    return "Gosai";
  } else if (63 <= ageInMonths) {
    return "Rokusai +";
  }
};

export const getFormattedDate = (date: string) => {
  const newDate = new Date(date);
  return format(newDate, "dd/MM/yyyy");
};
export const getHistoryFormattedDate = (date: string) => {
  const newDate = new Date(date);
  return format(newDate, "do MMMM yyyy");
};

export const getAgeDifferenceDate = (birthDate: string, date: string) => {
  const newBirthDate = new Date(birthDate);
  const newDate = new Date(date);
  const age = differenceInMonths(newDate, newBirthDate);
  return age;
};

export const getCurrentAgeInMonths = (birthDate: string) => {
  const newBirthDate = new Date(birthDate);
  const ageInMonths = differenceInCalendarMonths(new Date(), newBirthDate);
  return ageInMonths;
};
