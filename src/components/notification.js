import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import '../App.css';
import { Message } from 'semantic-ui-react'

export const MessagePopup = (props) => (
    <div style={{
        position:'absolute',
        zIndex:'999',
        width: '100%',
        top: 0
    }}>
        <Message
            icon='thumbs up'
            header={props.header}
            content={props.content}
            floating = {true}
            success = {true}
            onDismiss={props.dismiss}
            attached='top'
            error={props.error}
            hidden={props.hidden}
        />
    </div>
)