//utilities

module.exports =
{
//  Sanitizes string_in checking for ints. Warning: 11fxoifS => 11, a11b => NaN
    intParser: function(string_in)
    {
        const parsed = parseInt(string_in, 10);
        if(isNaN(parsed) && (parsed !== null))
        {
            return -1;
        }
        return parsed;
    },

    errorHandler: function(err_in, response_in)
    {
        if(err_in.code === 'ENOENT')
        {
            response_in.statusCode = 404;
            response_in.setHeader('Content-Type', 'text/plain');
            response_in.write('404 - file not found!');
        }
        else if(err_in.code === 'EACCES')
        {
            response_in.statusCode = 403;
            response_in.setHeader('Content-Type', 'text/plain');
            response_in.write('403 - file reading permission denied!');
        }
        else
        {
            console.log(err_in);
        }
    }
};
