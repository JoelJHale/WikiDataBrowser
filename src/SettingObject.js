async function GetSiteBasics(site)
{
    var uri = "https://siteinfoaccess.azurewebsites.net/api/GetFandomSiteInfo?site="+site
    return await (await fetch(uri)).json()
}
class Settings{
    link
    title
    options = {}
    static async Create(link)
    {
        var siteInfo = await GetSiteBasics(link)
        if (!siteInfo.exists) throw new URIError("Supplied link doesn't seem to have a fandom site. " + link);
        //if (siteInfo.hasPage) throw new 

        var setting = new Settings(link, siteInfo.siteinfo.sitename)
        
        return setting
    }
    constructor(link, title)
    {
        this.link = link
        this.title = title
    }
    SetTitle(title) {this.title = title}
    CreateOption(name)
    {
        this.options[name] = new Options
    }
    MoveOption(source, location)
    {
        if (this.options[source] == undefined) return false
        this.options[location] = this.options[source]
        delete this.options[source]
        return true
    }
    DeleteOption(source)
    {
        if (this.options[source] == undefined) return false
        delete this.options[source]
        return true
    }
    GetOption(id)
    {
        return this.options[id]
    }
    async SetOptionPage(optionID, page)
    {
        var option = this.GetOption(optionID)
        option.source_page = page
        if (page.includes("Category:")) option.source_type = "Category"
        else option.source_type = "Page_Links"
    }
    async SetOptionType(optionID, type)
    {
        var option = this.GetOption(optionID)
        option.source_type = type
        if (type == "Category" && !option.source_page.includes("Category:")) option.source_page = "Category:" + option.source_page

    }
    RemoveOptionPoint(optionID, point)
    {
        var option = this.GetOption(optionID)
        if (option) option.DeleteDataPoint(point)   
    }
    EditDataPoint(optionID, oldPoint, newData)
    {
        console.log(newData)
        console.log(oldPoint)
        var option = this.GetOption(optionID)
        this.RemoveOptionPoint(optionID, oldPoint)
        var obj = new Data(newData);
        option.array_data[newData.locationType].push(obj)

    }
}
class Options{
    source_page
    source_type
    array_data = {"properties":[], "page_templates":[]}

    
    FindDataPoint(id)
    {
        for (var i in this.array_data)
        {
            if (this.array_data[i] == null) continue
            var val = this.array_data[i].find((obj) => obj.displayName == id)
            if (val) return val
        }
        return null
    }
    DeleteDataPoint(id)
    {
        for (var i in this.array_data)
        {
            var oldArray = this.array_data[i]
            if (oldArray == null) continue
            var newArray = []
            for (var j in oldArray)
            {
                var elem = oldArray[j]
                console.log(elem)
                if (elem.displayName != id) newArray.push(elem)
            }
            this.array_data[i] = newArray
        }
        return
    }
    
}
class Data{
    location
    type
    displayName
    required
    default
    constructor(data){
        this.location = data.location
        this.type = data.type
        this.displayName = data.displayName
        this.required = data.required
        this.default = data.default
    }
    Set(data){
        this.location = data.location
        this.type = data.type
        this.displayName = data.displayName
        this.required = data.required
        this.default = data.default
    }
}