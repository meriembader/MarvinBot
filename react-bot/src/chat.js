import React, { Component } from 'react';

class KommunicateChat extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        (function (d, m) {
            var kommunicateSettings = { "appId": "2cd393fcd95368ff194f58ccbb2b5ec7",
             "popupWidget": true,
              "automaticChatOpenOnNavigation": true,
            
            "onInit": function(){
                var events = {
                    'onMessageReceived': function(resp){
                        console.log(resp);
                    },
                    'onMessageSent': function (resp) {
                        console.log(resp);
                        //called when the message is sent
                        }
                };
              //  Kommunicate.subscribeToEvents(events);
            }
            
            
            
            };

            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});


    }

    render() {
        return (

            <div></div>
        )
    }
}

export default KommunicateChat;