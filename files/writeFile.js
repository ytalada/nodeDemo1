const path = require('path');
const fs = require('fs');

exports.writeFileAsync = (request, response) => {
    let filePathToWrite = request.body.filename;
    let contentToWrite = request.body.data;

    if (filePathToWrite === undefined) {
        response.status(400).send({error: 'Not a valid file path to write the contents !!'}).end();
    } else if(filePathToWrite.search(/\//) < 0) {
        filePathToWrite = path.join(__dirname, filePathToWrite);
    }

    if(filePathToWrite) {
        // Check if the file exists or not //
        fs.access(filePathToWrite, fs.constants.F_OK, (error) => {
            if(error) {
                // Create new file and write the contents into it //
                const dataToWrite = new Uint8Array(Buffer.from(contentToWrite));
                fs.writeFile(filePathToWrite, dataToWrite, (error) => {
                    if (error)
                        response.status(400).send({error: 'Error in writing file !!'}).end();

                    response.status(200).send({message: 'File saved Successfully !!'}).end();                    
                });
            } else {
                // Append the contents if the file is already Exists //
                const dataToWrite = new Uint8Array(Buffer.from(contentToWrite));
                fs.appendFile(filePathToWrite, dataToWrite, (error) => {
                    if (error)
                        response.status(400).send({error: 'Error in appending contents to file !!'}).end();

                    response.status(200).send({message: 'File updated Successfully !!'}).end();
                });
            }
        });
    }
};

exports.writeFileSync = (request, response) => {
    let filePathToWrite = request.body.filename;
    let contentToWrite = request.body.data;

    if (filePathToWrite === undefined) {
        response.status(400).send({error: `Not a valid file path to write the contents !!`}).end();
    } else if(filePathToWrite.search(/\//) < 0) {
        filePathToWrite = path.join(__dirname, filePathToWrite);
    }

    if(filePathToWrite) {
        try {
            // Check if the file exists or not //
            fs.access(filePathToWrite, fs.constants.F_OK);

            try {
                // Append the contents if the file is already Exists //
                const dataToWrite = new Uint8Array(Buffer.from(contentToWrite));
                fs.appendFile(filePathToWrite, dataToWrite);
                response.status(200).send({message: 'File updated Successfully !!'}).end();
            }  catch(error) {
                response.status(400).send({error: 'Error in appending contents to file !!'}).end();
            }
            
        } catch(error) {
            try {
                // Create new file and write the contents into it //
                const dataToWrite = new Uint8Array(Buffer.from(contentToWrite));
                fs.writeFile(filePathToWrite, dataToWrite);
                response.status(200).send({message: 'File saved Successfully !!'}).end(); 
            } catch(error) {
                response.status(400).send({error: 'Error in writing file !!'}).end();
            }    
        }
    }
};