import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

export class Training extends Component {
    constructor(props) {
        super(props);
        this.doPullups = this.doPullups.bind(this);
        this.doBenkpress = this.doBenkpress.bind(this);
        this.doPushups = this.doPushups.bind(this);
        this.postTraining = this.postTraining.bind(this);

    }



    postTraining(type){
        fetch('https://www.nordicmafia.org/json/post/fightclub_train.php?trening='+type, {
            method: 'GET',
        })
    }


    doPullups() {
        this.postTraining(1);
        this.props.notify('Trening Vellykket', "Du utførte 11 pullups", false);
    }
    doBenkpress() {
        this.postTraining(2);
        this.props.notify('Trening Vellykket', "Du utførte 5 benkpress", false);
    }
    doPushups() {
        this.postTraining(3);
        this.props.notify('Trening Vellykket', "Du utførte 25 pushups", false);
    }


    render() {
        return (
            <div style={{width:330, marginLeft: 10, marginBottom:20}}>
                <Table celled inverted selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign='center'>Trening</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Effekt</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Hviletid</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>#</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell textAlign='center'>11 pullups</Table.Cell>
                            <Table.Cell textAlign='center'>14%</Table.Cell>
                            <Table.Cell textAlign='center'>11 min</Table.Cell>
                            <Table.Cell textAlign='center'><Button onClick={this.doPullups} color='black'>Utfør treningen</Button></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell textAlign='center'>5 benkpress</Table.Cell>
                            <Table.Cell textAlign='center'>8%</Table.Cell>
                            <Table.Cell textAlign='center'>5 min</Table.Cell>
                            <Table.Cell textAlign='center'><Button onClick={this.doBenkpress} color='black'>Utfør treningen</Button></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell textAlign='center'>25 pushups</Table.Cell>
                            <Table.Cell textAlign='center'>5%</Table.Cell>
                            <Table.Cell textAlign='center'>2 min</Table.Cell>
                            <Table.Cell textAlign='center'><Button onClick={this.doPushups} color='black'>Utfør treningen</Button></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        )
    }
}