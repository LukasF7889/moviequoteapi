# Movie Quotes API

A simple REST API to manage movies and their quotes — built to practice MongoDB, Express, and Mongoose.

---

## API Endpoints

### 1. Get all movies

- **Method:** GET  
- **Endpoint:** `/movies`  
- **Description:** Retrieves a list of all movies in the database.

---

### 2. Create a new movie with quotes

- **Method:** POST  
- **Endpoint:** `/movies`  
- **Body:** JSON object with:  
  - `name` (string): Name of the movie  
  - `quotes` (array of strings): List of quotes to associate with the movie  
- **Description:** Creates a new movie and adds the provided quotes linked to that movie.

---

### 3. Get a single movie by ID

- **Method:** GET  
- **Endpoint:** `/movies/:movieId`  
- **Description:** Retrieves details of a single movie specified by its ID.

---

### 4. Get all quotes for a specific movie

- **Method:** GET  
- **Endpoint:** `/movies/:movieId/quotes`  
- **Description:** Retrieves all quotes associated with the specified movie ID.

---

### 5. Add a quote to a specific movie

- **Method:** POST  
- **Endpoint:** `/movies/:movieId/quotes`  
- **Body:** JSON object with:  
  - `quote` (string): The quote text to add  
- **Description:** Adds a new quote linked to the specified movie.

---

### 6. Delete a movie and all its quotes

- **Method:** DELETE  
- **Endpoint:** `/movies/:movieId`  
- **Description:** Deletes the specified movie and all associated quotes.

---

### 7. Get a random quote

- **Method:** GET  
- **Endpoint:** `/quotes/`  
- **Description:** Retrieves a single random quote from the database, including its associated movie.

---

### 8. Get a single quote by ID

- **Method:** GET  
- **Endpoint:** `/quotes/:quoteId`  
- **Description:** Retrieves a single quote specified by its ID.

---

### 9. Delete a quote by ID

- **Method:** DELETE  
- **Endpoint:** `/quotes/:quoteId`  
- **Description:** Deletes the quote specified by its ID.

---

## Usage Notes

- All IDs are MongoDB ObjectIds.  
- For POST endpoints, include JSON bodies with `Content-Type: application/json`.  
- Proper error responses and status codes are used for invalid input or missing resources.

---

I used this API for practicing backend technologies and RESTful APIs
