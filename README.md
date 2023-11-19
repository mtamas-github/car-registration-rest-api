# Car Registration REST API

This is not a real project. Just a quick exercise to show some skills.
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mtamas5/car-registration-rest-api.git
   ```

2. Navigate to the directory:

    ```bash
    cd car-registration-rest-api
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the server
    The rest API depends on a running SOAP api so please run that first.
2. 
    ```bash
   npm start 
    ```

   The server will be accessible at: http://localhost:4000/
   
   API documentation is available at: http://localhost:4000/api-docs/

## API Endpoints

    - GET method: Get available plates: http://localhost:4000/api/plates

    - GET method Get Registration number details: http://localhost:4000/api/details/ABC123

    - POST method Renew the registration date (simply add a year to the expiration date) http://localhost:4000/api/renew/ABC123
```
