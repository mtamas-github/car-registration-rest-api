// soapConnector.js
const xml2js = require('xml2js');

// Function to parse XML string and convert it to a JavaScript object
const parseXmlString = (xmlString) => {
    return new Promise((resolve, reject) => {
        const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
        parser.parseString(xmlString, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

function getValueFromNestedObject(obj, keys) {
    return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

const getPlateNumbersFromBody = (bodyString) => {
    // xml structure:
    //"tns:getAvailablePlatesResponse":
    //    "tns:plateNumbers":
    //        "plateNumbers":
    const levels = [
        "tns:getAvailablePlatesResponse",
        "tns:plateNumbers",
        "plateNumbers"]
    return getValueFromNestedObject(bodyString, levels)
}

const getPlateDetails = (bodyString) => {
    const levels = ['tns:getRegistrationDetailsResponse']
    return getValueFromNestedObject(bodyString, levels)
}

const getRenewDetails = (bodyString) => {
    const levels = ['tns:renewRegistrationResponse']
    return getValueFromNestedObject(bodyString, levels)
}
const buildListRequestXml = (obj) => {
    // after several failed attempt to build up xml for the sake of testing I am using text version
    // this can be replaced with a more sophisticated code

    return '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://example.com/car-registration">\
        <soapenv:Header/>\
        <soapenv:Body>\
        <web:getAvailablePlates/>\
        </soapenv:Body>\
        </soapenv:Envelope>';
    // const builder = new xml2js.Builder({
    //     rootName: 'soap:Envelope',
    //     headless: true,
    //     renderOpts: {
    //         'soap:Envelope': {
    //             attributes: {
    //                 'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
    //                 'xmlns:tns': 'http://localhost:3000/car-registration',
    //             },
    //         },
    //         'soap:Body': { // Added to wrap the entire body
    //             attributes: {},
    //         },
    //     },
    // });

    // return builder.buildObject(obj);
};

const buildDetailsRequestXml = (regNumber) => {

    return '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://example.com/car-registration">\n' +
        '    <soapenv:Header/>\n' +
        '    <soapenv:Body>\n' +
        '        <web:getRegistrationDetails>\n' +
        '            <web:plateNumber>'+ regNumber +'</web:plateNumber>\n' +
        '        </web:getRegistrationDetails>\n' +
        '    </soapenv:Body>\n' +
        '</soapenv:Envelope> ';
}

const buildRenewRequestXml = (regNumber) => {
    return '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://example.com/car-registration">\n' +
        '    <soapenv:Header/>\n' +
        '    <soapenv:Body>\n' +
        '        <web:renewRegistration>\n' +
        '            <web:plateNumber>' + regNumber + '</web:plateNumber>\n' +
        '        </web:renewRegistration>\n' +
        '    </soapenv:Body>\n' +
        '</soapenv:Envelope> '
}


module.exports = {
    parseXmlString,
    getPlateNumbersFromBody,
    buildListRequestXml,
    buildDetailsRequestXml,
    buildRenewRequestXml,
    getPlateDetails,
    getRenewDetails};
