var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import styles from './RBT.module.scss';
import { SPHttpClient } from '@microsoft/sp-http';
import './style.css';
import { initializeIcons } from '@uifabric/icons';
import 'office-ui-fabric-react/dist/css/fabric.min.css';
var Award = require('../assets/awrd.png');
var Mail = require('../assets/mail.png');
var Msg = require('../assets/msg.png');
var RBT = /** @class */ (function (_super) {
    __extends(RBT, _super);
    function RBT(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            rbts: [],
            ModelVisible: false,
            commentTxt: '',
            itemId: ''
        };
        return _this;
    }
    RBT.prototype.componentDidMount = function () {
        var _this = this;
        this.getItems().then(function (response) {
            console.log("response", response);
            if (response.value.length != 0) {
                var data = [];
                response.value.forEach(function (element) {
                    data.push({ Id: element.Id, Name: element.Name.Title, Email: element.Name.Email, Designation: element.Designation });
                });
                _this.setState({ rbts: data });
            }
        });
    };
    RBT.prototype.getItems = function () {
        try {
            var requestUrl = this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('" + this.props.listName + "')/items?$select=Name/Title,Name/EMail,*&$expand=Name";
            console.log("requestUrl", requestUrl);
            return this.props.context.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1)
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            });
        }
        catch (error) {
            console.log("Error while getting items", error);
        }
    };
    RBT.prototype.render = function () {
        initializeIcons();
        return (React.createElement("div", { className: styles.awards },
            React.createElement("div", { className: styles.container },
                React.createElement("div", { className: styles.row }, this.state.rbts.length > 0 ?
                    this.state.rbts.map(function (item) {
                        var photo = "/_layouts/15/userphoto.aspx?size=L&username=" + item.Email;
                        return (React.createElement("div", { className: "featured-block featured-slider", unselectable: "on" },
                            React.createElement("div", { className: "our-team" },
                                React.createElement("div", { className: "picture" },
                                    React.createElement("img", { className: "img-fluid", src: photo, "data-themekey": "#", alt: "" }),
                                    React.createElement("br", null)),
                                React.createElement("div", { className: "team-content" },
                                    React.createElement("h2", null,
                                        React.createElement("b", null, item.Name))),
                                React.createElement("div", { style: { color: 'lightgray', fontSize: '12px', fontWeight: 600 } },
                                    React.createElement("h2", { style: { color: 'gary', fontSize: '14px', fontWeight: 'lighter' } }, item.Designation)),
                                React.createElement("button", { className: "card-btn" }, "Training"))));
                    }) : ""))));
    };
    return RBT;
}(React.Component));
export default RBT;
//# sourceMappingURL=RBT.js.map