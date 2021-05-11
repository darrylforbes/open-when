FROM python:3.9 AS builder
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt

FROM builder AS dev
EXPOSE 8000
VOLUME /usr/src/app
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0"]

FROM builder AS prod
CMD ["uvicorn", "main:app", "--reload"]
