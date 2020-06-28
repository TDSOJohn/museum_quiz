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
    }
}
