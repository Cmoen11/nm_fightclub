import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import { Button, Progress, Checkbox } from 'semantic-ui-react'
import { Input, Icon } from 'semantic-ui-react'

export class StartFight extends Component {

    constructor(props) {
        super(props);

        this.state = {
            price: 100,
            anon : 0,
            notify: {
                text : "",
                success: ""
                },
            timers : {add_fight_timer : 0, active_game : false},
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleAnonChange = this.handleAnonChange.bind(this);
        this.timer = this.timer.bind(this);

    }

    componentDidMount() {
        setInterval(this.timer, 1000);
    }

    timer() {
        fetch('http://www.nordicmafia.org/json/get/fightclub_get_timers.php', {
                // mode: 'no-cors',
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({timers: json[0]})
                    this.timer();
                });
            }else {
                console.log("error");

            }
        });
    }

    handlePriceChange(event) {
        this.setState({price: event.target.value});
        event.preventDefault();
    }

    handleAnonChange(event) {
        this.setState({ anon: !this.state.anon })
        event.preventDefault();
    }

    handleSubmit(event) {

        var anon = (this.state.anon) ? 1 : 0;

        fetch('https://www.nordicmafia.org/json/post/fightclub_add_fight.php?price=' + this.state.price + '&anonymous='+anon, {
            method: 'GET',
        }).then(response => {
            if (response.ok) {
                response.text().then(html => {

                    let raw = html;
                    let _success = (raw == "Success!");

                    let _text = raw;

                    this.setState({notify: {
                        text : _text,
                        success: _success

                    }})

                    if (this.state.notify.success) {
                        this.props.notify("Vellykket", "Du er lagt ut for kamp!", false);
                    }else {
                        this.props.notify("Mislykket", this.state.notify.text, true);
                    }


                    console.log(html);
                });
            }
        });

        event.preventDefault();
    }

    render() {
        return (
            <div style={{width:330, marginRight: 30, marginBottom:20, float:"right"}}>
                <Table celled inverted selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign='center'>
                                <Icon name="clock"/> {this.state.timers.add_fight_timer}
                            </Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>
                                Legg deg selv ut
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.HeaderCell textAlign='center'><Icon name="money"/> Beløp</Table.HeaderCell>
                            <Table.Cell textAlign='center'>
                                <Input
                                    label={{ basic: true, content: 'Kr' }}
                                    labelPosition='right'
                                    placeholder='Tast inn beløp' inverted
                                    onChange={this.handlePriceChange}
                                    value={this.state.price}

                                />
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.HeaderCell textAlign='center'>Anonym</Table.HeaderCell>
                            <Table.Cell textAlign='center'><Checkbox onChange={this.handleAnonChange} checked={this.state.anon} toggle inverted /></Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.HeaderCell textAlign='center'></Table.HeaderCell>
                            <Table.Cell textAlign='center'><Button disabled={this.state.timers.active_game || this.state.timers.add_fight_timer != 0} onClick={this.handleSubmit} color='black'>Legg meg ut</Button></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

