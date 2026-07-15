#!/bin/bash

set -e

echo "Starting database migrations..."
alembic upgrade head

echo "Migrations complete!"

echo "Starting the API server..."
uvicorn main:app --host 0.0.0.0 --port 8000
