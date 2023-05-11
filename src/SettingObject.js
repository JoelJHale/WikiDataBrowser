class Settings{
    link
    title
    options = {}
    static async Create(link)
    {
        var uri = "https://" + link + ".fandom.com"
        var siteFound = await fetch(uri)
        if (siteFound.status != 200) {
            console.error("Status: " + siteFound.status)
            throw new URIError("Supplied link doesn't seem to have a fandom site. " + uri)
        }

        var siteInfo = await (await fetch(uri+"/api.php?action=query&meta=siteinfo")).json()

        var setting = new Settings(link, siteInfo.query.general.sitename)
        
        return setting
    }
    constructor(link, title)
    {
        this.link = link
        this.title = title
    }
    SetTitle(title) {this.title = title}
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