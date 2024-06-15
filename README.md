# Hypervion - Fake News Detection System

## Backend Design:
We use a simple Request Response Architecture here. We  use REST API's to communicate with ML model. We have used Flask to create API endpoints. 

### API Endpoint:

#### POST : /predict
Request body: \
{\
   data: "news piece/headline"\
}

Response body:\
{\
    data: "news piece/headline",\
    response: "prediction of ML model"\
}

### Machine Learning Model Design Workflow
1. Collecting  necessary data.
2. Using the data to train various ML models.
3. Comparing the results of various models and decide which model to choose according to various metrics.
4. Deploying the mode.

### Machine Learning Model Design

![Screenshot 2024-06-15 143104](https://github.com/asquare004/Fake-News-Detection-System/assets/126737709/c7056600-b2a7-403d-9b33-358ba386cccf)
