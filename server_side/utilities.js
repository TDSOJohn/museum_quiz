//  server_side utilities

module.exports =
{
//  Sanitizes string_in checking for ints. Warning: "11fxoifS" => 11, "a11b" => NaN
//  Convert to hex and find first char that is number. Delete everything else
    intParser: function(string_in)
    {
        const parsed = parseInt(string_in, 10);
        if(isNaN(parsed) && (parsed !== null))
        {
            return -1;
        }
        return parsed;
    },

//  Error Handler works if file not found or file reading not permitted (errors 403 and 404)
    errorHandler: function(err_in, response_in)
    {
        if(err_in.code === 'ENOENT')
        {
            response_in.statusCode = 404;
            response_in.setHeader('Content-Type', 'text/plain');
            response_in.write('404 - file not found');
        }
        else if(err_in.code === 'EACCES')
        {
            response_in.statusCode = 403;
            response_in.setHeader('Content-Type', 'text/plain');
            response_in.write('403 - file reading permission denied');
        }
        else
        {
//  Default generic server error
            console.log(err_in);
            response_in.statusCode = 500;
            response_in.setHeader('Content-Type', 'text/plain');
            response_in.write('500 - Internal Server Error');
        }
    }
};
