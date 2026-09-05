# Dundee Movers Backend CRM

Administrative and Operations Dispatch CRM backend service for Dundee Movers.

## Overview
This service handles:
- **Quote Leads Management:** Ingest and track quotes generated from the website wizard.
- **Job Status Pipeline:** Update move stages (`new`, `quoted`, `confirmed`, `booked`, `completed`, `cancelled`).
- **Logistics & Crew Dispatch:** Vehicle and mover allocation based on volume, floor levels, and specialized stair equipment.

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status, uptime, and memory |
| `GET` | `/api/leads` | Retrieve all incoming move inquiries (supports `?status=` filter) |
| `GET` | `/api/leads/:id` | Retrieve single lead details |
| `POST` | `/api/leads` | Submit a new move inquiry manifest |
| `PATCH` | `/api/leads/:id/status` | Update a lead's pipeline status |

## Running Locally

From repository root:
```bash
npm run dev:crm
```

Or directly from this directory:
```bash
npm run dev
```
Default server port: `http://localhost:5000`
