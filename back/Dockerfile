# build backend
FROM python:3.7-slim
WORKDIR /

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000
CMD ["python", "proxy/run.py"]

