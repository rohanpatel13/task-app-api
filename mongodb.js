// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: "Kapil",
    //     age: 22
    // })
    
    // db.collection('users').findOne({ _id: new ObjectID("5c1113239cbfe605241f9071") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ age: 27 }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').findOne({age:22}, (error, task) => {
    //     console.log(task)
    // })

    // db.collection('users').find({ age: 22 }).toArray((error, tasks) => {
    //     console.log(tasks)
    // })

    // db.collection('users').updateOne({
    //     name:"sss"
    // },{
    //    $set:{
    //     name:"sssa"
    //    }
    // },
    // ).then(
    //     (result)=>{
    //         console.log("wwww " + result.toString())

    //     }).catch((error)=>{
            
    //             console.log("sssss " + error)
            
    //     })

    // db.collection('users').deleteOne({
    //     name: "sssa"
    // },
    // (error,result)=>{
    //     if(error) return console.log("errrrrr")
    //     console.log(result)
    // }
    // )

    db.collection('users').deleteOne({
        name: "sssa"
    },
    ).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
    
})