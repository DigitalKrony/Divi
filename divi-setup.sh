#!/bin/bash

set -e

echo "Starting Server Setup..."

echo "Requesting certificates from Let's Encrypt..."
docker compose -f docker-compose.prod.yml run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email adam@funedikly.com \
  --agree-tos \
  --no-eff-email \
  -d divi.funedikly.com \

PROJECT_DIR=$(pwd)

CRON_RENEWAL="0 0,12 * * * cd $PROJECT_DIR && docker compose -f docker-compose.prod.yml run --rm certbot renew --quiet && docker compose -f docker-compose.prod.yml exec nginx nginx -s reload"

CRON_RESTART="0 2 * * * cd $PROJECT_DIR && docker compose -f docker-compose.prod.yml restart"

echo "Configuring automatic SSL renewal schedule..."
if crontab -l 2>/dev/null | grep -F "$CRON_RENEWAL" > /dev/null; then
    echo "SSL renewal cron job already exists. Skipping insertion."
else
    (crontab -l 2>/dev/null; echo "$CRON_RENEWAL") | crontab -
    echo "SSL renewal cron job successfully added!"
fi

echo "Configuring daily container restart schedule..."
if crontab -l 2>/dev/null | grep -F "$CRON_RESTART" > /dev/null; then
    echo "Restart cron job already exists. Skipping insertion."
else
    (crontab -l 2>/dev/null; echo "$CRON_RESTART") | crontab -
    echo "Restart cron job successfully added!"
fi

echo "Setup Complete!"