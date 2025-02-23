import { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
const stripePromise = loadStripe("publishableKey"); //create stripe account first

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const response = await fetch(
      "http://localhost:3000/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ amount: 1000, currency: "usd" }),
      }
    );
    const { clientSecret } = await response.json();
    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
    } else {
      alert(`Payment Successful ID: ${paymentIntent.id}`);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "processing payment" : "pay"}
      </button>
      {error && <div className="text-red-500 font-bold">{error}</div>}
    </form>
  );
};

const Payment = () => {
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>;
};

export default Payment;
