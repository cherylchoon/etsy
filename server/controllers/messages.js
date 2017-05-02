var mongoose = require('mongoose');
var User = mongoose.model("User");
var Message = mongoose.model("Message");

module.exports.sendmessage = function(request, response){

    var message = new Message(request.body);

    message.save(function(err, message){
        if (err){
            response.json({err: err})
        }
        else{
            console.log(message);
            response.json({message: message})
        }
    })
}

module.exports.getconversation = function(request, response){

    data = request.body;

    Message.update({_sender: data.you, _recipient: data.me}, {$set: {unread: false}}, {multi: true}, function(err, msgs){
        if (err){
            console.log("ERROR")
            console.log(err);
        }
        else{
            console.log("MSGS")
            console.log(msgs);
        }
    });

    Message.find({ $or: 
        [{_sender: data.me, _recipient: data.you }, 
        {_sender: data.you, _recipient: data.me}]
        }).populate('_sender _recipient').exec(function(err, conversation){
            if (err){
                response.json({err:err});
            }
            else{
                response.json({conversation: conversation});
            }
    })

}

module.exports.inbox = function(request, response){

    data = request.body;
    
    Message.aggregate(
    [
        // Matching pipeline, similar to find
        { 
            "$match": 
            { $or: 
                [
                    {"_recipient": mongoose.Types.ObjectId(request.body.me)},
                    {'_sender': mongoose.Types.ObjectId(request.body.me)}
                ]}
        },
        // Sorting pipeline
        { 
            "$sort": { 
                "createdAt": -1 
            } 
        },
        // // Grouping pipeline BROKEN
        { 
            "$group": {
                "_id": { '_sender': '$_sender',
                '_recipient': '$_recipient'},
                "content": {
                    "$first": "$content" 
                },
                "createdAt": {
                    "$first": "$createdAt" 
                }
            }
        },
        // BROKEN
        // // Project pipeline, similar to select
        {
             "$project": { 
                "_id": 0,
                "_sender": '$_id._sender',
                "_recipient": "$_id._recipient",
                "content": 1,
                "createdAt": 1
            }
        }
    ],
    function(err, messages) {
        Message.populate(messages, [{'path': '_sender'},{'path':'_recipient'}], function(err, inbox){
            if (err) {
            return response.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            response.json(inbox)
        }}
    )}
)}

module.exports.allunread = function(request,response){
    Message.find({
        '_recipient': request.body.me, 
        'unread': true }).exec(function(err, messages){
            if (err){
                console.log(err);
            }
            else{
                response.json(messages)
            }
        })
}