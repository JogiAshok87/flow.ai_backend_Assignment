# Personal Expense Tracker

This is a RESTful API for managing personal financial records. Users can record income and expenses, retrieve transactions, and get summaries by category or time period.

---

## **Setup and Run Instructions**

1. **Clone the repository:**
   
   git clone https://github.com/JogiAshok87/flow.ai_backend_Assignment.git
   cd flow.ai_backend_Assignment
   
2. **Install dependencies:**
   npm install
   Set up environment variables: Create a .env file in the root directory and add the following:
   PORT=8000
   MONGO_URL



3.**Run the server:**
   npm start
   The server will be running at http://localhost:8000.

**Postman screenshots demonstrating each API call **

 POST /transactions: Adds a new transaction (income or expense)
 ![WhatsApp Image 2024-10-23 at 08 07 25_ad925a58](https://github.com/user-attachments/assets/b93c3251-3cb8-48bf-a75d-6d9a4b1fe95c)

 GET /transactions: Retrieves all transactions.
![WhatsApp Image 2024-10-23 at 08 08 55_225d0e72](https://github.com/user-attachments/assets/ce85146f-1dd3-4c9a-addf-5e75c574077d)

GET /transactions/:id: Retrieves a transaction by ID.
![WhatsApp Image 2024-10-23 at 08 10 15_6ad8a99a](https://github.com/user-attachments/assets/24ddd5fb-b590-4061-adbe-06f8a834df4b)

PUT /transactions/:id: Updates a transaction by ID.
![WhatsApp Image 2024-10-23 at 08 12 39_ee4213b3](https://github.com/user-attachments/assets/eb7a4531-513b-4852-8b70-368e9ae7b6d9)

DELETE /transactions/:id: Deletes a transaction by ID.
![WhatsApp Image 2024-10-23 at 08 17 10_87051057](https://github.com/user-attachments/assets/83df15be-5b1a-4240-b550-98d4889d62bb)

GET /summary: Retrieves a summary of transactions, such as total income, total expenses, and balance. Optionally, this can be filtered by date range or category.
![WhatsApp Image 2024-10-23 at 08 18 30_1b2c5592](https://github.com/user-attachments/assets/5a7e3289-f975-4e15-88d8-38384431e1d2)


