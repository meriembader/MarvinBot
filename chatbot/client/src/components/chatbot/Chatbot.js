import React, { Component, createRef } from 'react';
import axios from 'axios/index';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';


import Message from './Message';
import Card from './Card';
import QuickReplies from './QuickReplies';

const cookies = new Cookies();




class Chatbot extends Component {
    messagesEnd;
    constructor(props) {
        super(props);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);
        this.talkInput = React.createRef();
        this.state = {
            messages: []
        }
        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' });
        }

    }

    async df_text_query(queryText) {
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: queryText
                }
            }
        }
        this.setState({ messages: [...this.state.messages, says] });
        const res = await axios.post('/api/df_text_query', { text: queryText, userID: cookies.get('userID') });

        for (let msg of res.data.fulfillmentMessages) {
            // console.log(JSON.stringify(msg));
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says] });
        }
    }

    async df_event_query(eventName) {
        const res = await axios.post('/api/df_event_query', { event: eventName, userID: cookies.get('userID') });
        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'me',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says] });
        }

    }
    componentDidMount() {
        this.df_event_query('welcome');
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView(true);
        if (this.talkInput.current) {
            this.talkInput.current.focus();//callback ref for focus
        
        }
    }

    _handleQuickReplyPayload(event, payload, text) {
        event.preventDefault();
        event.stopPropagation();

        switch (payload) { 
            case 'flight_masterclass':
                this.df_event_query('MASTERCLASS');
            default:
               // this.df_text_query(text); 
                break;
        }
       // this.df_text_query(text);
    }


    renderCards(cards) {
        return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
    }


    renderOnemessage(message, i) {
        if (message.msg && message.msg.text && message.msg.text.text) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
        } else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.cards) {
            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{ overflow: 'hidden' }}>
                        <div className="col s2">
                            <a href="/" className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a>
                        </div>

                        <div style={{  overflowY: 'auto' }}>
                            <div style={{ height: 300, width: message.msg.payload.fields.cards.listValue.values.length * 270 }}>
                                {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } else if (message.msg &&
            message.msg.payload &&
            message.msg.payload.fields &&
            message.msg.payload.fields.quick_replies){
            return <QuickReplies
                text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
                key={i}
                replyClick={this._handleQuickReplyPayload}
                speaks={message.speaks}
                payload={message.msg.payload.fields.quick_replies.listValue.values}/>;
        }
    }

    renderMessage(stateMessages) {
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                //get message
                 console.log(JSON.stringify(message));

                 
                return this.renderOnemessage(message, i);
            });
        } else {
            return null;
        }
    }

    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }

    }

    render() {
        
        return (
            <div style={{ height: 400, width: 400, position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgray' }}>
                <nav>
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo"> Chat</a>
                    </div>
                </nav>

                <div id="chatbot" style={{ height: 388, width: '100%', overflow: 'auto' }}>
                    {this.renderMessage(this.state.messages)}
                    <div ref={(el) => { this.messagesEnd = el; }}
                        style={{ float: 'left', clear: "both" }}>
                    </div>
                </div>
                <div className="col s12">
                    <input style={{margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%'}} placeholder="type a message:"  type="text" ref={this.talkInput} onKeyPress={this._handleInputKeyPress} />
                </div>
            </div>
        )
       

    }
}


export default Chatbot;