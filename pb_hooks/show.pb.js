//View a particular contact
routerAdd("get", "/contact/{id}", (e) => {
  let id = e.request.pathValue("id");

  console.log(`GET /contact/{id} id: ${id}`);

  if (id) {
    let record = $app.findRecordById("contacts", id);

    const html = $template
      .loadFiles(`${__hooks}/views/layout.html`, `${__hooks}/views/show.html`)
      .render({
        id: id,
        first: record.get("first"),
        last: record.get("last"),
        email: record.get("email"),
        phone: record.get("phone"),
      });

    return e.html(200, html);
  }
});
