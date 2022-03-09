FROM python:3.7.3-slim
WORKDIR /code
COPY requirements.txt /code
RUN pip install -r /code/requirements.txt
ENV DATABASE_URL="sqlite:///../main.db"
EXPOSE 5000
COPY . .