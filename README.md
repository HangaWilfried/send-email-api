# NODE MAILER FOR FAST-RELAYS MARKETPLACE

# Environment variables
```
PORT=3000
NODE_ENV=development

#Email provider variables
RESEND_API_KEY=xxxxxxxxx
```

# STEP TO BUILD DOCKER IMAGE

```shell
docker buildx build -t mailer_service:0.0.2 .
```

```shell
docker tag mailer_service:0.0.2 fopsi/mailer_service:0.0.2
```

```shell
docker push fopsi/mailer_service:0.0.2
```
