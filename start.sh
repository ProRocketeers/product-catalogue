#!/bin/sh

FE_PORT=${FRONTEND_PORT:-3000}
BE_PORT=${PORT:-3002}

# Start backend
cd /app/backend
PORT=$BE_PORT node dist/main.js &

# Wait for backend to be ready
echo "Waiting for backend to start..."
until wget -qO- "http://localhost:$BE_PORT/health" > /dev/null 2>&1; do
  sleep 1
done
echo "Backend is ready."

# Seed database if empty
echo "Checking if database needs seeding..."
node dist/database/seeds/run-seed.js

# Start frontend
cd /app/frontend
PORT=$FE_PORT node build/index.js &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
