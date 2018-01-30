import React, {Component} from 'react';
var {StyleSheet, ListView, View, Text, ActivityIndicator} = require('react-native');
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';

class Home extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            ds: ds
        };
    }

    componentDidMount() {
        this
            .props
            .getData(); //call our action
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator
                        animating={true}
                        style={[{
                            height: 80
                        }
                    ]}
                        size="small"/>
                </View>
            );
        } else {
            return (
                <View
                    style={{
                    flex: 1,
                    backgroundColor: '#F5F5F5',
                    paddingTop: 20
                }}>
                    <ListView
                        enableEmptySections={true}
                        dataSource={this
                        .state
                        .ds
                        .cloneWithRows(this.props.data)}
                        renderRow={this
                        .renderRow
                        .bind(this)}/>
                </View>
            );
        }
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <View
                style={{
                borderBottomWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                backgroundColor: rowData.hex
            }}>
                <Text style={styles.name}>
                    {rowData.name}
                </Text>
                <Text style={styles.hex}>
                    {rowData.hex}
                </Text>
            </View>
        )
    }
};


function mapStateToProps(state, props) {
    return {loading: state.dataReducer.loading, data: state.dataReducer.data}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

var styles = StyleSheet.create({
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    name: {
        fontSize: 15,
        fontWeight: "600",
        backgroundColor: "#fff",
        color: "#000",
        width: 150,
        textAlign: "center"
    },
    hex: {
        fontSize: 14,
        backgroundColor: "#fff",
        color: "#000",
        width: 150,
        textAlign: "center"
    }
});