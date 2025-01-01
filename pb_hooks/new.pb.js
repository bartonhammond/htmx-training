routerAdd("get", "/contacts/new", (e) => {
  const html = $template
    .loadFiles(`${__hooks}/views/layout.html`, `${__hooks}/views/new.html`)
    .render({
      first: "",
      last: "",
      phone: "",
      email: "",
      errors: { email: "", first: "", last: "", phone: "" },
    });

  return e.html(200, html);
});

routerAdd("post", "/contacts/new", (e) => {
  let { first, last, email, phone } = e.requestInfo().body;
  console.log(
    `post contacts/new first: ${first} last: ${last} email: ${email} phone: ${phone}`
  );

  const errors = {
    first: "",
    last: "",
    email: "",
    phone: "",
  };
  const validator = require(`${__hooks}/../node_modules/validator`);

  if (validator.isEmpty(first)) {
    errors.last = "First name required";
  }

  if (validator.isEmpty(last)) {
    errors.last = "Last name required";
  }

  if (!validator.isEmail(email)) {
    errors.email = "Invalid email";
  }

  if (!validator.isMobilePhone(phone)) {
    errors.phone = "Invalid phone";
  }

  if (!errors.first && !errors.last && !errors.phone && !errors.email) {
    let collection = $app.findCollectionByNameOrId("contacts");

    let record = new Record(collection);

    record.set("first", first);
    record.set("last", last);
    record.set("email", email);
    record.set("phone", phone);

    $app.save(record);

    e.redirect(302, "/contacts/?msg=Contact created");
  }

  const html = $template
    .loadFiles(`${__hooks}/views/layout.html`, `${__hooks}/views/new.html`)
    .render({
      first: first,
      last: last,
      phone: phone,
      email: email,
      errors,
    });
  return e.html(200, html);
});
