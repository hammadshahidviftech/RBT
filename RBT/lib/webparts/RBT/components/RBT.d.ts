import * as React from 'react';
import { IRBTProps } from './IRBTProps';
import './style.css';
import 'office-ui-fabric-react/dist/css/fabric.min.css';
export interface IRBTState {
    rbts: any;
    ModelVisible: boolean;
    commentTxt: string;
    itemId: string;
}
export default class RBT extends React.Component<IRBTProps, IRBTState> {
    constructor(props: any);
    componentDidMount(): void;
    getItems(): Promise<any>;
    render(): React.ReactElement<IRBTProps>;
}
//# sourceMappingURL=RBT.d.ts.map