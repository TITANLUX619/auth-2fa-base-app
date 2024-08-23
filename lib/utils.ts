import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const defaultAuthFormValues = {
  firstName: "",
  lastName: "",
  address1: "",
  city: "",
  state: "",
  postalCode: "",
  dateOfBirth: "1990-05-17",
  ssn: "",
  email: "",
  password: "",
}
