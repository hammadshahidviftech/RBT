import * as React from 'react';
import styles from './RBT.module.scss';
import { IRBTProps } from './IRBTProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse, IHttpClientOptions, SPHttpClientConfiguration, ISPHttpClientOptions } from '@microsoft/sp-http';
import './style.css';
import Modal from 'react-awesome-modal';
import {
  TextField,
  DefaultButton,
  Dropdown,
  MessageBar,
  MessageBarType,
  MessageBarButton,
  PrimaryButton
} from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';
import 'office-ui-fabric-react/dist/css/fabric.min.css';

const Award: string = require('../assets/awrd.png');
const Mail: string = require('../assets/mail.png');
const Msg: string = require('../assets/msg.png');

export interface IRBTState {
  rbts: any;
  ModelVisible: boolean;
  commentTxt: string;
  itemId: string;
}

export default class RBT extends React.Component<IRBTProps, IRBTState> {
  constructor(props) {
    super(props);

    this.state = {
      rbts: [],
      ModelVisible: false,
      commentTxt: '',
      itemId: ''

    };
  }

  public componentDidMount() {

    this.getItems().then((response) => {
      console.log("response", response);
      if (response.value.length != 0) {
        var data = [];
        response.value.forEach(element => {
          data.push({ Id: element.Id, Name: element.Name.Title, Email: element.Name.Email,Designation:element.Designation });
        });

        this.setState({ rbts: data });

      }

    });
  }

  public getItems(): Promise<any> {
    try {
      var requestUrl = this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('"+this.props.listName+"')/items?$select=Name/Title,Name/EMail,*&$expand=Name";
      console.log("requestUrl", requestUrl);

      return this.props.context.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            return response.json();
          }
        });

    } catch (error) {
      console.log("Error while getting items", error);
    }
  }



  
  public render(): React.ReactElement<IRBTProps> {
    initializeIcons();
    return (
      <div className={styles.awards}>
        <div className={styles.container}>
          
          <div className={styles.row}>
            {this.state.rbts.length > 0 ?
              this.state.rbts.map((item) => {
                var photo = `/_layouts/15/userphoto.aspx?size=L&username=${item.Email}`;
                return (
                  <div className="featured-block featured-slider" unselectable="on">
                    <div className="our-team">
                      <div className="picture"><img className="img-fluid" src={photo} data-themekey="#" alt="" /><br />
                      </div>
                      <div className="team-content">
                        <h2><b>{item.Name}</b></h2>
                      </div>
                      <div style={{color:'lightgray',fontSize:'12px',fontWeight:600}}>
                        <h2 style={{color:'gary',fontSize:'14px',fontWeight:'lighter'}}>{item.Designation}</h2>
                      </div>
                      {/* <div className="bottom-img">
                        <img className="img-fluid" src={Award} data-themekey="#" alt="" />
                      </div> */}
                      <button className="card-btn">Training</button>
                    </div>
                  </div>
                );
              }) : ""}
          </div>
        </div>
      </div>
    );
  }
}