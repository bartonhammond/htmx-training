//View a particular contact
routerAdd("post", "/contact/{id}/delete", (e) => {
  let id = e.request.pathValue("id");

  console.log(`GET /contact/{id}/delete id: ${id}`);

  let record = $app.findRecordById("contacts", id);
  $app.delete(record);
  e.redirect(302, "/contacts/?msg=Contact deleted!");
});
