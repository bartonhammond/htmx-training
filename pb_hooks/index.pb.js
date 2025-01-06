routerAdd('get', '/contacts/', (e) => {
    let search = e.request.url.query().get('q')
    let msg = e.request.url.query().get('msg')
    let page = e.request.url.query().get('page')
    let activeSearch = e.request.header.get('HX-Trigger')
    let count = $app.countRecords("contacts")

    console.log(
        `GET /contacts search: ${search} msg: ${msg} page: ${page} activeSearch: ${activeSearch}`
    )

    if (!page) {
        page = 0
    } else {
        page = parseInt(page, 10)
    }

    let offset = calculateOffset(page)

    let records = searchData(search, offset)

    let contacts = convertRecords(records)

    const next = page + 1

    if (activeSearch) {
        renderContacts(contacts, count)
    } else {
        renderFullPage(contacts, search, msg, page, next, count)
    }

    /**
     * Only send the HTML of the rows of contacts
     * @param {*} contacts 
     * @returns 
     */
    function renderContacts(contacts, count) {
        console.log(`renderContacts`)
        try {
        const html = $template
            .loadFiles(
                `${__hooks}/views/rows.htmx.html`
            )
            .render({
                contacts: contacts,
                count: count
            })
        return e.html(200, html)
        } catch (e) {
            console.log(`renderContacts error: ${e}`)
        }
    }
    function renderFullPage(contacts, search, msg, page, next, count) {
        const html = $template
            .loadFiles(
                `${__hooks}/views/layout.html`,
                `${__hooks}/views/index.html`,
                `${__hooks}/views/rows.html`
            )
            .render({
                contacts: contacts,
                search: search,
                msg: msg,
                page: page,
                next: next,
                count: count

            })

        return e.html(200, html)
    }

    /**
     * Records are in PB style, need in JSON
     * @param {*} records
     * @returns
     */
    function convertRecords(records) {
        return records.map((x) => ({
            id: x.id,
            first: x.first,
            last: x.last,
            email: x.email,
            phone: x.phone,
        }))
    }
    /**
     * Calculate the offest for the page
     * @param {*} page
     * @returns
     */
    function calculateOffset(page) {
        if (page === undefined || page === null || page == '') {
            page = 0
        } else {
            page = parseInt(page, 10)
        }
        return page * 10
    }
    /**
     * Get the data using search
     * @param {*} search
     * @param {*} offset
     * @returns
     */
    function searchData(search, offset) {
        let records = arrayOf(
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
                .all(records)
        }
        return records
    }
})
