### Scripts

---

When starting the APi for the first time in Dev mode or after making changes to DB run:

```cmd

docker-compose exec api python seed.py
```

---

After making updates to the DB, run two scripts the below:

```cmd
docker-compose exec api alembic revision --autogenerate -m "[DESCRIPTIVE TEXT]"
```

```cmd
docker-compose exec api alembic upgrade head
```
