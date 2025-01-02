$app.rootCmd.addCommand(
    new Command({
        use: 'createContacts',
        run: (cmd, args) => {
            let firstNames = ["Buddy", "Marilyn", "Charles", "Emily", "Neufy", "Felina", "Karen", "Erma", "Randy", "Lisa", "Joe"]
            let lastNames = ["Hammond", "Perez", "Tank", "Smith", "Jones", "Jackson", "Irv", "Besome", "Hart", "Love"]
            
            for (let first = 0; first < firstNames.length; first++) {
                for (let last = 0; last < lastNames.length; last++) {
                    let collection = $app.findCollectionByNameOrId('contacts')
            
                    let record = new Record(collection)
        
                    let _first = firstNames[first]
                    let _last = lastNames[last]
                
                    record.set('first', _first)
                    record.set('last', _last)
                    record.set('email', `${_first}@${_last}.com`)
                    record.set('phone', "888-123-3343")
        
                    try {
                        $app.save(record)
                        console.log(`added ${_first} ${_last}` )
                    } catch (e) {
                        console.log(`${e}`)
                    }
                }
            }
            
        },
    })
)
