/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    View
} from 'react-native';
import { Root } from "native-base";
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';

import RouterMain from './src/Route/RouterMain';

export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={Store}>
            	<Root>
                	<RouterMain />
                </Root>
            </Provider>
        );
    }
}

