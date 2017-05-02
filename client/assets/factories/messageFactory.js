app.factory('messageFactory', function($http){ 
    factory = {};
    
    factory.mymessages = [];
    factory.inbox = [];
    factory.unreadListeners = [];
    

    factory.sendMessage = function(message, callback){
        $http.post('/api/sendmessage', message).then(function(returned_data){
            if (returned_data.err){
                callback(returned_data.err);
            }
            else{
            factory.mymessages.push(returned_data.data.message);
            callback(returned_data.data.message);
            }
        })
    };

    factory.getMyMessages = function(myinfo, callback){
        $http.post('/api/inbox', myinfo).then(function(returned_data){
            if (returned_data.err){
                callback(returned_data.err);
            }
            else{
                factory.inbox = returned_data.data;
                callback(returned_data.data.inbox);
            }
        })
    }

    factory.getConversation = function(conversation, callback){
        $http.post('/api/messages', conversation).then(function(convo){
            factory.mymessages = convo.data.conversation;
            callback(convo.data.conversation);
        })
    }

    factory.getUnread = function(myinfo, callback){
        $http.post('/api/unread', myinfo).then(function(returned_data){
            if (returned_data.err){
                callback(returned_data.err);
            }
            else{
                var unreadlength = returned_data.data.length;
                factory.unread = unreadlength;
                callback(returned_data.data.messages);
            }
        })
        this.doUnreadChange();
    }

    factory.onUnreadChange = function(callback){
        this.unreadListeners.push(callback);
    };

    factory.doUnreadChange = function(){
        for (var callback of this.unreadListeners){
            callback(this.unread);
        }
    }
    return factory;
})