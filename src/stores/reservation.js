import { defineStore } from "pinia";

export const useReservationStore = defineStore("reservation", {
  state: () => ({
    departurePlace: "",
    arrivalPlace: "",
    departureDate: "",
    arrivalDate: "",
  }),
  actions: {
    setReservation(data) {
      this.departurePlace = data.departurePlace;
      this.arrivalPlace = data.arrivalPlace;
      this.departureDate = data.departureDate;
      this.arrivalDate = data.arrivalDate;
    },
    setDeparturePlace(place) {
      this.departurePlace = place;
    },
    setArrivalPlace(place) {
      this.arrivalPlace = place;
    },
    setDepartureDate(date) {
      this.departureDate = date;
    },
    setArrivalDate(date) {
      this.arrivalDate = date;
    },
    clearReservation() {
      this.departurePlace = "";
      this.arrivalPlace = "";
      this.departureDate = "";
      this.arrivalDate = "";
    },
  },
});