
const newman = require('newman');

newman.run({
    collection: require('./collection/DMoney - Complete API Automation.postman_collection.json'),
    reporters: ['cli', 'htmlextra'],
    iterationCount: 1,
    reporter: {
        htmlextra: {
            export: './Reports/report.html',
        }
    }
}, function (err, summary) {
    if (err) {
        throw err;
    }

    console.log('Collection run complete!');
    console.log('HTML report generated at Reports/report.html');
});
