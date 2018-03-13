import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'



export class Fights extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'fights' : []
        }

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        this.updateState();
    }

    updateState() {

        fetch('https://www.nordicmafia.org/json/fightclub_get_matches.php', {
                // mode: 'no-cors',
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({fights: json})
                    this.updateState();
                });
            }
        });

    }

    render() {
        return (
            <div style={{width:330, marginRight: 10, marginBottom:20}}>
                <Table celled inverted selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign='center'>Spiller</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Beløp</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Vunnet/Tapt</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>#</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                            {this.state.fights.map(fight =>
                                <Table.Row key={fight.fight_id}>
                                    <Table.Cell textAlign='center'>{(fight.anonymous ? 'Anonym' : fight.fighter_name)}</Table.Cell>
                                    <Table.Cell textAlign='center'>{fight.price_nice_format}</Table.Cell>
                                    <Table.Cell textAlign='center'>{fight.win}/{fight.loss}</Table.Cell>
                                    <Table.Cell textAlign='center'><Button color='black'>Angrip</Button></Table.Cell>
                                </Table.Row>
                            )}

                    </Table.Body>
                </Table>
            </div>
        )
    }
}