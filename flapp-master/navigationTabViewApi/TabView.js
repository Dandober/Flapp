import * as React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import NavigationTabEsport from './NavigationTabEsport'
import NavigationTabsNews from '../navigationNews/NavigationTabsNews'
import NavigationTabsVideo from '../NavigationTabsVideo/NavigationTabsVideo'
import { Icon, Text } from 'native-base';

const FirstRoute = () => (
    <NavigationTabsNews style={styles.scene} />
);

const SecondRoute = () => (
    <NavigationTabsVideo style={styles.scene} />
);

const ThirdRoute = () => (
    <NavigationTabEsport style={styles.scene} />
);

export default class TabViewExample extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Notícias', },
            { key: 'second', title: 'Vídeos', },
            { key: 'third', title: 'E-sports', },
        ],
    };

    render() {

        const getTabBarIcon = (props) => {

            const { route } = props
            const { color } = props
            const { focused } = props

            if (route.key === 'first') {

                return <Icon
                    name="md-clipboard"
                    style={{color:color , marginLeft:0}}
                />
            }
            if (route.key === 'second') {

                return <Icon
                    name='md-tv'
                    style={{color:color}}
                />
            }
            if (route.key === 'third') {

                return <Icon
                    name="md-heart-half"
                    style={{color:color}}
                />
            }
        }
        return (
            <TabView
                renderTabBar={props =>
                    <TabBar
                        color="white"
                        {...props}
                        renderIcon={
                            props => getTabBarIcon(props)
                        }
                        indicatorStyle={{ backgroundColor: 'white' }}
                        renderLabel={({ route, focused, color }) => (
                            <Text style={{ color, margin: 0, fontWeight: '300' }}>
                                {route.title}
                            </Text>
                        )}
                        style={{ backgroundColor: '#cc2229' }}
                    />
                }

                navigationState={this.state}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                    third: ThirdRoute,
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});