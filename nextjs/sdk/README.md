## Sphere Labs

<div align="center">
    <a>
        <img alt="Sphere" src="https://avatars.githubusercontent.com/u/109333730?s=200&v=4" width="95"/>
    </a>
  <h1 style="margin-top:20px;">Custom Frontend - React SDK</h1>
</div>

# Overview

This is an example Next.js app, demonstrating how to use the React SDK to embed a Sphere payment button into your app.

Specifically, it shows how to orchestrate payments in your own frontend via a series of easy-to-use React hooks.

This repository will be useful to you if you:

1. Want to build your own custom payment pages, or embed a pay button into your application.
1. Don't want to use Sphere's pre-built checkout pages.
1. Want to minimize dependencies by foregoing use of the `@spherelabs/react` library.

# Setup

First, create a payment method (e.g., payment link) via the Sphere API or dashboard.

Export the paymentLink_id as an environment variable, as shown below, to connect the payment button to your Sphere account:

```bash
export NEXT_PUBLIC_PAYMENT_LINK_ID="paymentLink_51ae9e9aa1684340ae969bc1b23f540d"
```

# Installation

Run once to install dependencies:

```bash
yarn
```

# Development

To start the server on port 3000 run:

```bash
yarn run dev
```

Navigating to `http://localhost:3000` will give:

<div align="center">
<img src="../../assets/nestjs-react.png" width="800" height="550"/>
</div>
