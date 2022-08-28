import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe(
  "pk_test_51La4HADZC98dTivt6hch36yFmynDCqVM4kVsl78LAJelGnJS6TYpIWqiKNUCSDSvJgyDrGl21RYDkTPMrYrUqlHd00mbumF7Ct"
);

export default function CheckoutWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
