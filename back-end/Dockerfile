FROM python:3.12-alpine3.17

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "uvicorn", "main:app", "--reload", "--host", "0.0.0.0" ]