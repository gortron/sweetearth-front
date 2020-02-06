# Sweetearth

[Sweetearth](https://www.sweetearth.site) is an eCommerce platform for carbon offset projects, built with React and Rails.

![Imgur](https://i.imgur.com/XwOlzD6.gif)

## Motivation

- I couldn't find an easy, 3-click carbon offset donation app, so I built one.
- I wanted to explore the microservices architecture pattern. I identified Stripe & Auth0 as good candidates for services that met the needs of this project. 
- I was curious to learn more about the type of projects people are doing to take of our ecosystem. If you're also curious, [Drawdown](https://www.drawdown.org/solutions-summary-by-rank) is a great place to start.

## Stack

- React front-end, createContext and useReducer pattern for global state management
- Rails and PostgreSQL back-end, Fast_JSON serializers. [Back-end repo here.](https://github.com/gortron/sweetearth-back/)
- Auth0 implemented for handling authorization
- Stripe integration for payment handling
- Deployed through Netlify & Heroku

## Features

- Users can sign up / log in through Auth0, including social login through Google
- Users can select from 8 curated carbon offset projects to contribute to
- Users can checkout as a guest or registered user, if registered their email information pre-fills
- Users can make payments through Stripe
- Users receive a success animation on payment confirmation, which is animated with Lottie
- Users receive sign up and payment confirmation emails, handled in Auth0 and Stripe respectively
- If users are logged in, they can see a history of their transactions


## License

MIT © [@gortron](https://github.com/gortron)
