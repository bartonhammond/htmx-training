routerAdd("get", "/contacts", (e) => {


    
    const contacts=[{"id": 2, "first": "Carson", "last": "Gross", "phone": "123-456-7890", "email": "carson@example.comz", "errors": {}}, {"id": 3, "first": "", "last": "", "phone": "", "email": "joe@example.com", "errors": {}}, {"id": 4, "first": "", "last": "", "phone": "", "email": "carson@example.com", "errors": {}}]

      const html = $template.loadFiles(
        `${__hooks}/views/layout.html`,
        `${__hooks}/views/index.html`,
    ).render({
	"contacts": contacts
    })
    return e.html(200, html)
})
