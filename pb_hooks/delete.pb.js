//View a particular contact
routerAdd("delete", "/contact/{id}/", (e) => {
  let id = e.request.pathValue("id");
  //where did the event get triggerd?  In the Edit page?
  let deleteBtn = e.request.header.get('HX-Trigger')

  console.log(`delete /contact/{id}id: ${id} deleteBtn: ${deleteBtn}`);

  let record = $app.findRecordById("contacts", id);
  $app.delete(record);

  e.response.header().set("Hx-Redirect", "/contacts")
  
});

//Delete multiple contacts
routerAdd("delete", "/contacts", (e) => {
  
  let uri = e.request.requestURI
  //"/contacts?selected_contact_ids=2171j5og0228nfa&selected_contact_ids=ey98cruxz5fk8i6" 
  let parts = uri.split('?')
  console.log(`parts: ${parts}`)

  let keys = parts[1].split('&')
  console.log((`keys: ${keys}`))
  for (let key = 0; key < keys.length; key++) {
    let values = keys[key].split("=")
    console.log(`key: ${values[0]} = ${values[1]}`)
    let record = $app.findRecordById("contacts", values[1]);
    $app.delete(record);
  }
  e.response.header().set("Hx-Redirect", "/contacts")
  
})