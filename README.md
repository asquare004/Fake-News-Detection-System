# Fake News Detection System

## Backend Design:
We use a simple Request Response Architecture here. We will use REST API's to communicate with ML model. Here we have used Flask to create API endpoints. 

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

