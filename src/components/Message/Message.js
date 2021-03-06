import React, { Component } from 'react';
import { withAuthorization, AuthUserContext, } from '../Session/Session';

import { withFirebase } from '../Firebase';


const MessageList = ({ authUser, messages, onRemoveMessage, onEditMessage }) => (
    <ul>
        {messages.map(message => (
            <MessageItem
                authUser={authUser}
                key={message.uid}
                message={message}
                onRemoveMessage={onRemoveMessage}
                onEditMessage={onEditMessage} />
        ))}
    </ul>
);


class MessageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            editText: this.props.message.text,
        };
    }

    onToggleEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
            editText: this.props.message.text,
        }));
    };

    onChangeEditText = event => {
        this.setState({editText: event.target.value});
    };

    onSaveEditText = () => {
        this.props.onEditMessage(this.props.message, this.state.editText);
        this.setState({editMode: false});
    };

    render() {

        const { authUser, message, onRemoveMessage } = this.props;
        const {editMode, editText} = this.state;

        return (
            <li>
                {authUser.uid === message.userId && (
                    <span>

                        {editMode ? (
                            <input
                                type="text"
                                value={editText}
                                onChange={this.onChangeEditText} />
                        ) : (
                            <span>
                                <strong>{message.userId}</strong> {message.text}
                                {message.editedAt && <span>(edytowano {message.editedAt} )</span>}
                            </span>
                        )}

                        {editMode ? (
                            <span>
                                <button onClick={this.onSaveEditText} className="smallButton">zapisz</button>
                                <button onClick={this.onToggleEditMode} className="smallButton">reset</button>
                            </span>
                        ) : (
                            <button onClick={this.onToggleEditMode} className="smallButton__edit">edycja</button>
                        )}

                    </span>
                )}

                {!editMode && (<button type="button" onClick={() => onRemoveMessage(message.uid) } className="smallButton__delete">usuń</button>)}
            </li>
        )
    }
}


class MessagesBase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            messages: [],
            text: '',
            limit: 5,
        };
    }

    onChangeText = event => {
        this.setState({ text: event.target.value });
    };

    onCreateMessage = (event, authUser)=> {
        this.props.firebase.messages().push({
            text: this.state.text,
            userId: authUser.uid,
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
        });
        this.setState({ text: '' });
        event.preventDefault();
    };

    onRemoveMessage = uid => {
        this.props.firebase.message(uid).remove();
    };

    onEditMessage = (message, text) => {
        const { uid, ...messageSnapshot } = message;
        this.props.firebase.message(message.uid).set({
            ...messageSnapshot,
            text,
            editedAt: this.props.firebase.serverValue.TIMESTAMP,
        });
    };

    componentDidMount() {
        this.onListenForMessages();
    }

    onListenForMessages() {
        this.setState({ loading: true });

        this.props.firebase
            .messages()
            .orderByChild('createdAt')
            .limitToLast(this.state.limit)
            .on('value', snapshot => {

                // convert messages list from snapshot
                const messageObject = snapshot.val();
                if (messageObject) {
                    const messageList = Object.keys(messageObject).map(key => ({
                        ...messageObject[key],
                        uid: key,
                    }));
                    this.setState({
                        messages: messageList,
                        loading: false });
                } else {
                    this.setState({ messages: null, loading: false });
                }
            });
    }

    componentWillUnmount() {
        this.props.firebase.messages().off();
    }

    onNextPage = () => {
        this.setState(
            state => ({ limit: state.limit + 5 }),
            this.onListenForMessages,
        );
    };


    render() {
        const { text, messages, loading } = this.state;
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <>
                        <div>
                            {loading && <div>Loading ...</div>}
                            {messages ? (
                                <MessageList
                                    authUser={authUser}
                                    messages={messages}
                                    onEditMessage={this.onEditMessage}
                                    onRemoveMessage={this.onRemoveMessage}/>
                            ) : (
                                <div>Nie ma żadnych wiadomości ...</div>
                            )}
                        </div>
                        {!loading && messages && (<button type="button" onClick={this.onNextPage} className="smallButton">załaduj więcej</button>)}
                        <div className="signForms--container">
                            <form onSubmit={event => this.onCreateMessage(event, authUser)} className="signForms">
                                <textarea
                                    // type="text"
                                    value={text}
                                    onChange={this.onChangeText}
                                />
                                <button type="submit" className="submitButton">wyślij</button>
                            </form>

                        </div>
                    </>
                )}
            </AuthUserContext.Consumer>
        );
    }
}


const Messages = withFirebase(MessagesBase);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(Messages);