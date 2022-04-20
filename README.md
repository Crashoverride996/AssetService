# AssetService

AssetService is a Express RestApi for fetching historical Crypto price exchange rates.

## Installation and Start up

```bash
npm install
```

```bash
npm run startDev
```

## Usage

[GET] http://localhost:3000/v1/auth/register 

* Is used to generate a new user based on email sent in the payload. It generates apiKey which should be passed as a query parameter for other requests. All users have limited number of requests which is read from .env variable.

[GET] http://localhost:3000/v1/rates
* Is used to get exchange rate of specific currency. Mandatory query parameters are ***apiKey*** and ***currency*** and optional one is ***date*** which should be in the format "dd-mm-yyyy".

[GET] http://localhost:3000/v1/users
* Is used to get informations about the user email, requests left etc.

* I've included .env file, because it contains api keys for other services.

## License
[MIT](https://choosealicense.com/licenses/mit/)