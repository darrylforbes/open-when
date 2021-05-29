FROM python:3.9 AS builder

WORKDIR /app
EXPOSE 8000
ENTRYPOINT ["./entrypoint.sh"]

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

FROM builder AS dev
VOLUME /app
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0"]

FROM builder AS prod
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
