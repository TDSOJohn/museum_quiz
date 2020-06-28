//utilities

module.exports =
{
    intParser: function(string_in)
    {
        const parsed = parseInt(string_in, 10);
        if(isNaN(parsed) && (parsed !== null))
        {
            return -1;
        }
        return parsed;
    }
}
