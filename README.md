## Local Development

Copy file `.env.example` to `.env` and adjust configuration.

Run locally

```bash
docker compose up -d --build
```

Launch in web browser: `https://localhost/ui/`

### NestJS CLI

In `services/backend` directory:

```bash
./bin/nest.sh
```

### Postgres CLI

In `services/backend` directory:

```bash
./bin/psql.sh
```

## Deploy to Production

Generate DH params

```sh
openssl dhparam -out ./services/reverse-proxy/ssl/dh-params.pem 2048
```

Generate Self signed cert

```sh
openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout ./services/reverse-proxy/ssl/self-signed/key.pem -out ./services/reverse-proxy/ssl/self-signed/cert.pem
```

Copy file `.env.example` to `.env` and adjust configuration.

Run services in prod mode:

```bash
./bin/prod-run.sh
```
