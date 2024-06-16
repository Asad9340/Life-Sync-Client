import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Fetch the client secret from your backend when the component mounts
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1000 }), // amount in cents
    })
      .then(response => response.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: error.message,
      });
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      console.error(confirmError);
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: confirmError.message,
      });
    } else {
      console.log('Payment successful:', paymentIntent);
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Your payment was successful!',
        footer: `<pre>${JSON.stringify(paymentIntent, null, 2)}</pre>`,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="card-element"
              className="block text-sm font-medium text-gray-700"
            >
              Card Details
            </label>
            <div className="mt-1">
              <CardElement
                id="card-element"
                className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#32325d',
                      '::placeholder': {
                        color: '#a0aec0',
                      },
                    },
                    invalid: {
                      color: '#fa755a',
                    },
                  },
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={!stripe}
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
