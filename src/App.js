import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Training} from "./components/training";
import {Fights} from "./components/fights";
import {Stats} from "./components/stats";
import { Grid } from 'semantic-ui-react'
import {StartFight} from "./components/startFight";
import {MessagePopup} from './components/notification';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'notify' : {show: false, header: '', content: '', error: false}
        }
        this.notify = this.notify.bind(this);
        this.notifyDismiss = this.notifyDismiss.bind(this);
    }

    notify(_header, _content, _error) {
        this.setState({
            'notify': {show:true, header:_header, content:_content, error:_error}
        })

        setTimeout(this.notifyDismiss, 5000);
    }

    notifyDismiss() {
        this.setState({
            'notify': {show:false, header:"", content:""}
        })
    }

    render() {

        var mainContent = (
            <div style={{width: 752, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
                <Grid columns={2}>

                    <img src="https://i.gyazo.com/28fe340c7567c50a5a44fc5f52866113.png" style={{width: 752}}/>
                    <br/> <br/>

                    <Grid.Row>
                        <Grid.Column>
                            <Training notify={this.notify} />
                        </Grid.Column>
                        <Grid.Column>
                            <Fights/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Stats/>
                        </Grid.Column>

                        <Grid.Column>
                            <StartFight notify={this.notify} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );

        // if it needs to notify about something..

        mainContent = (
            <div>
                <MessagePopup header={this.state.notify.header} hidden={!this.state.notify.show} content={this.state.notify.content} dismiss={this.notifyDismiss} error={this.state.notify.error}/>
                {mainContent}
            </div>
        );


        return (
            <div>
                {mainContent}
            </div>
        );
    }
}
export default App;
