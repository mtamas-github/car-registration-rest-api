const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const {
    parseXmlString,
    getPlateNumbersFromBody,
    buildListRequestXml,
    buildDetailsRequestXml,
    buildRenewRequestXml,
    getPlateDetails,
    getRenewDetails} = require('./soapConnector');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(bodyParser.json());

const SOAP_API_URL = 'http://localhost:3000/carRegistration';

// Function to convert JavaScript object to SOAP-formatted XML string


// api docs with swagger
// Serve Swagger UI
const swaggerDocument = YAML.load('./CarRegRestAPI.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint to get available plates
app.get('/api/plates', async (req, res) => {
    try {
        const xmlRequest = buildListRequestXml({ 'tns:getAvailablePlates': {} });

        const response = await axios.post(SOAP_API_URL, xmlRequest, {
            headers: { 'Content-Type': 'text/xml' },
        });

        console.log(response.data);
        parseXmlString(response.data).then(
            (parsedData) => {
            console.log(parsedData['soap:Envelope']['soap:Body']);

            res.json(getPlateNumbersFromBody(parsedData['soap:Envelope']['soap:Body']));

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to get registration details
app.get('/api/details/:plateNumber', async (req, res) => {
    const { plateNumber } = req.params;
    const xmlRequest = buildDetailsRequestXml(plateNumber);

    const response = await axios.post(SOAP_API_URL, xmlRequest, {
        headers: { 'Content-Type': 'text/xml' },
    });

    console.log(response.data);
    parseXmlString(response.data).then(
        (parsedData) => {
            console.log(parsedData['soap:Envelope']['soap:Body']);

            res.json(getPlateDetails(parsedData['soap:Envelope']['soap:Body']));

        });
});

// Endpoint to renew registration
app.post('/api/renew/:plateNumber', async (req, res) => {
    const { plateNumber } = req.params;
    const xmlRequest = buildRenewRequestXml(plateNumber);

    const response = await axios.post(SOAP_API_URL, xmlRequest, {
        headers: { 'Content-Type': 'text/xml' },
    });

    console.log(response.data);
    parseXmlString(response.data).then(
        (parsedData) => {
            console.log(parsedData['soap:Envelope']['soap:Body']);

            res.json(getRenewDetails(parsedData['soap:Envelope']['soap:Body']));

        });
});

app.listen(port, () => {
    console.log(`REST API server listening on http://localhost:${port}`);
});
