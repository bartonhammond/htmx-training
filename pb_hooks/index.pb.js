routerAdd('get', '/contacts/', (e) => {
    let search = e.request.url.query().get('q')
    let msg = e.request.url.query().get('msg')
    let page = e.request.url.query().get('page')

    console.log(`GET /contacts search: ${search} msg: ${msg} page: ${page}`)

    if (page === undefined || page === null || page == '') {
      page = 0
    } else {
      page = parseInt(page, 10)
    }
    let offset = page * 10

    let records

    records = arrayOf(
        new DynamicModel({
            // describe the shape of the data (used also as initial values)
            id: '',
            first: '',
            last: '',
            email: '',
            phone: '',
        })
    )

    if (!search) {
        $app.db()
            .select('id', 'first', 'last', 'email', 'phone')
            .from('contacts')
            .limit(10)
            .offset(offset)
            .orderBy('first ASC', 'last ASC')
            .all(records)
    } else {
        $app.db()
            .select('id', 'first', 'last', 'email', 'phone')
            .from('contacts')
            .limit(10)
            .offset(offset)
            .where($dbx.like('first', search))
            .orWhere($dbx.like('last', search))
            .orWhere($dbx.like('email', search))
            .orWhere($dbx.like('phone', search))
            .orderBy('first ASC', 'last ASC')
            .all(records) // throw an error on db failurew
    }
    let contacts = records.map((x) => ({
        id: x.id,
        first: x.first,
        last: x.last,
        email: x.email,
        phone: x.phone,
    }))
    
    console.log(`calc page: ${page}`);
    const next = page + 1
    let prev = page - 1
    console.log(`calc-pre: ${prev}`)
    if (page === 0) {
      prev = 0
      console.log(`calc-pre eq 0: ${prev}`)
    }
    console.log(`prev: ${prev} next: ${next}`)
    const html = $template
        .loadFiles(
            `${__hooks}/views/layout.html`,
            `${__hooks}/views/index.html`
        )
        .render({
            contacts: contacts,
            search: search,
            msg: msg,
            page: page,
            next: next,
            prev: prev
        })

    return e.html(200, html)
})
