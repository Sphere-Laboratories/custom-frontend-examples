import axios from "axios";

const API_URL = "https://api.spherepay.co/v1";
const API_KEY = "<YOUR_API_KEY>";
const config = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

(async () => {
  // 1. Create a Product
  const productResponse = await axios.post(
    `${API_URL}/product`,
    {
      name: "My Product",
    },
    config,
  );
  const product = productResponse.data.data.product;

  // 2. Create a Price
  const priceResponse = await axios.post(
    `${API_URL}/price`,
    {
      product: product.id,
      currency: "usdc",
      unitAmountDecimal: 1,
    },
    config,
  );
  const price = priceResponse.data.data.price;

  // 3. Create a PaymentLink
  const paymentLinkResponse = await axios.post(
    `${API_URL}/paymentLink`,
    {
      lineItems: [
        {
          price: price.id,
          quantity: 1,
          quantityMutable: false,
        },
      ],
    },
    config,
  );
  const paymentLink = paymentLinkResponse.data.data.paymentLink;

  console.log(`A Payment Link with id: ${paymentLink.id} was generated.`);
})();
