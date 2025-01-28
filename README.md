# Create a form for touring bands!

## How to install

```
npm install
```

## Run application

```
npm start
```

Open `http://localhost:3000` on the browser.

## Run tests

```
npm test
```

## Notes

- Tailwindcss for styling
- Typescript
- Tests written in Jest
- Style is based on the [Tailwind UI](https://tailwindui.com/)
- Icons are from [Heroicons](https://heroicons.com/)
- Deployed on [Vercel](https://vercel.com/): [https://actblue-test.vercel.app/](https://actblue-test.vercel.app/)

## TODO

- Credit card information should not be submitted, it should call Stripe API to generate card token and submit with the order information.
- Validation on form elements.
- Tests for common components.
- Sanitize the band description(it's HTML code).
- Styling for band description.
- Update website title, meta tags
