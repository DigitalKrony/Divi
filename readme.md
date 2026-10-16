# #MyFriends Sheet

An app to replaces "The Sheet | THE DAMAGE"

---

Activate the virtual Environment then install your requirements:

```cmd
source .venv/bin/activate

pip install -r apps/middleware/requirements.txt

```

---

Run on production server:

```cmd
docker compose -f docker-compose.prod.yml up -d
```

Run a local development environment:

```cmd
docker compose up --build -d
```

To shutdown the Container:
*(When on Ubuntu, you need to name the Container to get it to shutdown as expected)*

```cmd
docker compose -p divi-dashboard-prod down -v
```
