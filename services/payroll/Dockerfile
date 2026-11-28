FROM python:3.12-slim
WORKDIR /app
COPY services/payroll/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY services/payroll/app ./app
EXPOSE 8000
CMD ["sh","-c","uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
