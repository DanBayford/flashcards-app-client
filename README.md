This client is the frontend for the Flashcards API

To run in Docker, use the below files at the common root.

## Root Docker Compose

```yaml
# compose.prod.yml
services:
  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    environment:
      ASPNETCORE_ENVIRONMENT: Production
      ConnectionStrings__DefaultConnection: "Data Source=/app/data/Flashcards.db"
      Jwt__Key: "yes-i-know-this-should-be-an-env-var"
      Jwt__Issuer: "Flashcards.Api"
      Jwt__Audience: "Flashcards.Client"
    expose:
      - 5000
    volumes:
      - ./api/src/Flashcards.Api/Persistence/Flashcards.db:/app/data/Flashcards.db
    restart: unless-stopped

  web:
    build:
      context: ./client
      dockerfile: Dockerfile
    ports:
      - 8002:80
    depends_on:
      - api
    restart: unless-stopped
```

## .dockerignore

```
api/src/Flashcards.Api/Persistence/Flashcards.db
```
