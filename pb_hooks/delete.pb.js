//View a particular contact
routerAdd("delete", "/contact/{id}/", (e) => {
  let id = e.request.pathValue("id");

  console.log(`delete /contact/{id}id: ${id}`);

  let record = $app.findRecordById("contacts", id);
  $app.delete(record);
  e.redirect(303, "/contacts/?msg=Contact deleted!");
});
