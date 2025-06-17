# 🛠️ Base Operations API – Backend (NestJS)

This is the backend API for the Base Operations technical challenge, built with [NestJS](https://nestjs.com/) and connected to a PostgreSQL database.

---

## 🚀 How to Run

1. Clone the repository and navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run start:dev
```

5. Access the API at `http://localhost:3000`.

6. Documentation at `http://localhost:3000/api`.

<!-- 7. Recommended Indexes:

- Speeds up filtering by location
  CREATE INDEX idx_events_location_id ON events(location_id);

- Optimizes query for recent events ordered by date
  CREATE INDEX idx_events_location_date ON events(location_id, date DESC);

- Optional: Improves performance of monthly aggregation
  CREATE INDEX idx_events_date ON events(date);

- Optional: Useful for location search/autocomplete
  CREATE INDEX idx_locations_name ON locations(name); -->
