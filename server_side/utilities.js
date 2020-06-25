//utilities

module.exports =
{
    intParser: function(string_in)
    {
        const parsed = parseInt(string_in);
        if(isNaN(parsed))
        {
            return -1;
        }
        return parsed;
    }
}
