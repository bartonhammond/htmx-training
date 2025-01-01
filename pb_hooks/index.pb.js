routerAdd("get", "/contacts", (e) => {
  let search = e.request.url.query().get("q");
  console.log(`search: ${search}`);
  let records;

  records = arrayOf(
    new DynamicModel({
      // describe the shape of the data (used also as initial values)
      id: "",
      first: "",
      last: "",
      email: "",
      phone: "",
    })
  );

  if (!search) {
    $app
      .db()
      .select("id", "first", "last", "email", "phone")
      .from("contacts")
      .limit(100)
      .orderBy("first ASC", "last ASC")
      .all(records);
  } else {
    $app
      .db()
      .select("id", "first", "last", "email", "phone")
      .from("contacts")
      .limit(100)
      .where($dbx.like("first", search))
      .orWhere($dbx.like("last", search))
      .orWhere($dbx.like("email", search))
      .orWhere($dbx.like("phone", search))
      .orderBy("first ASC", "last ASC")
      .all(records); // throw an error on db failurew
  }
  let contacts = records.map((x) => ({
    id: x.id,
    first: x.first,
    last: x.last,
    email: x.email,
    phone: x.phone,
  }));

  const html = $template
    .loadFiles(`${__hooks}/views/layout.html`, `${__hooks}/views/index.html`)
    .render({
      contacts: contacts,
      search: search,
    });

  return e.html(200, html);
});
