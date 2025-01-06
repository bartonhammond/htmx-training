//View a particular contact
routerAdd("delete", "/contact/{id}/", (e) => {
  let id = e.request.pathValue("id");
  //where did the event get triggerd?  In the Edit page?
  let deleteBtn = e.request.header.get('HX-Trigger')

  console.log(`delete /contact/{id}id: ${id} deleteBtn: ${deleteBtn}`);

  let record = $app.findRecordById("contacts", id);
  $app.delete(record);

  if (deleteBtn) {
     e.response.header().set("Hx-Redirect", "/contacts")
  } else {
    return e.string(200, "")
  }
});
