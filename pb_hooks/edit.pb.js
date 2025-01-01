//Show the contact edit form
routerAdd('get', '/contact/{id}/edit', (e) => {
    let id = e.request.pathValue('id')

    console.log(`GET /contact/{id}/edit id: ${id}`)

    if (id) {
        let record = $app.findRecordById('contacts', id)

        const html = $template
            .loadFiles(
                `${__hooks}/views/layout.html`,
                `${__hooks}/views/edit.html`
            )
            .render({
                id: id,
                first: record.get('first'),
                last: record.get('last'),
                email: record.get('email'),
                phone: record.get('phone'),
                errors: { email: '', first: '', last: '', phone: '' },
            })

        return e.html(200, html)
    }
})

//Update the contact edit form
routerAdd('post', '/contact/{id}/edit', (e) => {
    let id = e.request.pathValue('id')
    let { first, last, email, phone } = e.requestInfo().body
    console.log(
        `post contact/{id}/edit id: ${id} first: ${first} last: ${last} email: ${email} phone: ${phone}`
    )

    //const utils = require(`${__hooks}/utils.js`);
    //utils.hello("world");

    if (id) {
        let record = $app.findRecordById('contacts', id)
        record.set('first', first)
        record.set('last', last)
        record.set('email', email)
        record.set('phone', phone)

        $app.save(record)
        e.redirect(302, '/contacts/?msg=Contact updated')

        const html = $template
            .loadFiles(
                `${__hooks}/views/layout.html`,
                `${__hooks}/views/edit.html`
            )
            .render({
                first: record.get('first'),
                last: record.get('last'),
                email: record.get('email'),
                phone: record.get('phone'),
            })

        return e.html(200, html)
    }
})
