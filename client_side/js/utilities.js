//  client_side utilities

//  Sanitizes string_in checking for ints. Warning: 11fxoifS => 11, a11b => NaN
export function intParser(string_in)
{
    const parsed = parseInt(string_in, 10);
    if(isNaN(parsed) && (parsed !== null))
    {
        return 1;
    }
    return parsed;
}

//  Simple utility that returns a query with type specified in "variable"
export function getQueryVariable(variable_in)
{
    var query   = window.location.search.substring(1);
    var vars    = query.split('&');
    for (var i  = 0; i < vars.length; i++)
    {
        var pair= vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable_in)
        {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable_in);
    return null;
}

export function LSsanityCheck()
{
    //  create empty saveData_temp variable
    let saveData_temp   = new Object;
    //  get id from URL query
    let id_temp         = intParser(getQueryVariable('id'));

    //  set default id if id == null
    if(id_temp == null)
        id_temp = 1;

    //  Try to read localStorage save for given id
    try {
        saveData_temp   = JSON.parse(localStorage.getItem(`id${id_temp}`));
    } catch (e)
    //  catch and log error
    {
        console.log(e);
    } finally
    {
        //  if saveData_temp is null return null
        if(saveData_temp == null)
        {
            console.log("no data found!");
            saveData_temp               = new Object;
            saveData_temp.quiz_id       = id_temp;
            saveData_temp.mission_id    = 0;
            saveData_temp.first_time    = true;
        }
        else
        {
            //  if id is missing, not a number or null, set id to id_temp
            if((saveData_temp.quiz_id == null) || (isNaN(saveData_temp.quiz_id)) || (saveData_temp.quiz_id == undefined))
                saveData_temp.quiz_id = id_temp;

            if((saveData_temp.first_time == null) || (isNaN(saveData_temp.first_time)) || (saveData_temp.first_time == undefined))
                saveData_temp.first_time = (saveData_temp.mission_id == 0);

            //  if mission id is missing, not a number or null, set mission id to 0 (restart quiz)
            if( (saveData_temp.mission_id == null) ||
                (isNaN(saveData_temp.mission_id)) ||
                (saveData_temp.mission_id == undefined) ||
                (saveData_temp.mission_id < 0) ||
                (saveData_temp.mission_id >= 10))
            {
                saveData_temp.mission_id = 0;
                saveData_temp.first_time = true;
            }

        }
    }

    return saveData_temp;
}
