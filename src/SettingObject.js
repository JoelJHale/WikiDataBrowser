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
}
class Options{
    source_page
    source_type
    array_data = {"properties":null, "page_templates":null}
    
}
class Data{
    location
    type
    displayName
    required
    default
}