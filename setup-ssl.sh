#!/bin/bash

set -e

echo "Starting SSL Setup..."

echo "Requesting certificates from Let's Encrypt..."
docker compose -f docker-compose.prod.yml run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email adam@funedikly.com \
  --agree-tos \
  --no-eff-email \
  -d divi.funedikly.com

PROJECT_DIR=$(pwd)
CRON_JOB="0 0,12 * * * cd $PROJECT_DIR && docker compose -f docker-compose.prod.yml run --rm certbot renew --quiet && docker compose -f docker-compose.prod.yml exec nginx nginx -s reload"

echo "Configuring automatic renewal schedule..."

if crontab -l 2>/dev/null | grep -F "$CRON_JOB" > /dev/null; then
  echo "Cron job already exists. Skipping insertion."
else
  # Append the new job to the existing cron table
  (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
  echo "Cron job successfully added!"
fi

echo "SSL Setup Complete! You can now uncomment the HTTPS block in your NGINX config and restart the proxy."