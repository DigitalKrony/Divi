FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

COPY start.sh /start.sh

RUN chmod +x /start.sh

CMD ["/start.sh"]