import React, {Component} from 'react';
import {Table} from 'semantic-ui-react'
import {Button, Progress} from 'semantic-ui-react'

export class Stats extends Component {

    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this);

        this.state = {
            'stats': []
        }
    }

    componentDidMount() {
        this.updateState()
    }

    updateState() {
        fetch('https://www.nordicmafia.org/json/fightclub_get_stats.php', {
                // mode: 'no-cors',
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({stats: json})
                    this.updateState();
                });
            }
        });
    }


    render() {
        return (
            <div style={{width: 330, float: 'left', marginLeft: 10, marginBottom: 20}}>
                <Table celled inverted selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign='center'>

                            </Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>
                                Din statestikk
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {this.state.stats.map(stat =>
                        <Table.Body>
                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>Spillernavn</Table.HeaderCell>
                                <Table.Cell textAlign='center'>{stat.name}</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>Vunnet/tapt</Table.HeaderCell>
                                <Table.Cell textAlign='center'>{stat.won}/{stat.loss}</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>Treningsnivå</Table.HeaderCell>
                                <Table.Cell textAlign='center'>{stat.level}</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>Progresjon</Table.HeaderCell>
                                <Progress percent={stat.percent} inverted indicating progress/>
                            </Table.Row>

                            <Table.Row>
                            </Table.Row>
                        </Table.Body>
                    )}
                </Table>
            </div>
        )
    }
}

