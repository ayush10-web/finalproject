## Full-Stack Application with Kubernetes
# Overview
This repository contains a full-stack application deployed using Kubernetes. The stack includes:

Frontend: Nginx serving static files.
Backend: Node.js application connected to MongoDB.
Database: MongoDB.
Directory Structure
fullstack-app/
│
├── frontend/
│   ├── Dockerfile
│   ├── static/
│   │   └── index.html
│   └── nginx-configmap.yaml
│
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   └── .env
│
├── kubernetes/
│   ├── mongo-pv-pvc.yaml
│   ├── mongo-configmap.yaml
│   ├── mongo-secret.yaml
│   ├── mongo-deployment.yaml
│   ├── node-configmap.yaml
│   ├── node-deployment.yaml
│   ├── nginx-configmap.yaml
│   └── nginx-deployment.yaml
│───────docker-compose.yaml
└── README.md



## 1. Build and Push Docker Images
# Frontend
Navigate to the frontend directory:

cd frontend

Build the Docker image:

``` bash
docker build -t your-dockerhub-username/nginx-frontend:latest .

Push the Docker image to Docker Hub:

docker push your-dockerhub-username/nginx-frontend:latest
```
# Backend
Navigate to the backend directory:

Build the Docker image:
``` bash
cd ../backend

docker build -t your-dockerhub-username/node-backend:latest .

docker push your-dockerhub-username/node-backend:latest
```

Alternatively you can straightly deploy docker-compose.yaml as:
docker-compose up -d

then link the image as:
docker tag <username>/node-backend:latest <username>/node-backend-f:latest
docker tag <username>/nginx-frontend:latest <username>/nginx-backend-f:latest

then push it to the docker hub as 
docker push <username>/node-backend-f:latest
docker push <username>/nginx-frontend-f:latest

Create the namespace:
kubectl create namespace fullstack-app

Then deploy all the kubernetes files as:
Kubectl apply -f kubernetes/mongo-configmap.yaml
Kubectl apply -f kubernetes/mongo-deployment.yaml
Kubectl apply -f kubernetes/mongo-pv-pvc.yaml
Kubectl apply -f kubernetes/mongo-secret.yaml
Kubectl apply -f kubernetes/nginx-configmap.yaml
Kubectl apply -f kubernetes/nginx-deployment.yaml
Kubectl apply -f kubernetes/node-configmap.yaml
Kubectl apply -f kubernetes/node-deployment.yaml

Then frontend nginx url can be obtained as:
minikube service nginx-frontend -n fullstack-app --url


You can check the deployment as:
kubectl describe pod <pod-name> -n <namespace>

Then the resources can be cleaned as:
Kubectl delete -f kubernetes/mongo-configmap.yaml
Kubectl delete -f kubernetes/mongo-deployment.yaml
Kubectl delete -f kubernetes/mongo-pv-pvc.yaml
Kubectl delete -f kubernetes/mongo-secret.yaml
Kubectl delete -f kubernetes/nginx-configmap.yaml
Kubectl delete -f kubernetes/nginx-deployment.yaml
Kubectl delete -f kubernetes/node-configmap.yaml
Kubectl delete -f kubernetes/node-deployment.yaml

minikube delete
