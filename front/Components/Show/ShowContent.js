import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Header, Content, Body } from 'native-base';
import { Text, View } from 'react-native';
import { Pagination} from '@ant-design/react-native';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Button, Icon, Left, Right } from 'native-base';
import { func } from 'prop-types';



function ShowContent(props) {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(5);
    const [spacing, setSpacing] = React.useState(2);

    const handleChange = value => {
      setMinValue(((value-1)*5));
      setMaxValue(value * 5);
    };

    const locale = {
      prevText: 'Prev',
      nextText: 'Next',
    };

    const goToRecipe = (id) => {
      console.log(id); 
      //<Recipe e enviamos no props o id> Depois no Recipe, fazemos um get recipe com o id e obtemos toda a informação
    }

    return (
      <View style={{ paddingTop: 30 }}>
            {props.recipes && props.recipes.length > 0 && props.recipes.slice(minValue, maxValue).map(val => (
            <Content>
              <Card>
                <CardItem>
                  <Left>
                    <Body>
                      <Text style={{fontWeight: 'bold'}}>Recipe Name</Text>
                      <Text note>Type of recipe (breakfast/lunch/etc)</Text>
                    </Body>
                  </Left>
                  <Right>
                  <Button transparent onPress={() => goToRecipe(val.id)}>
                    <Text style={{color: '#0000EE'}}>See More</Text>
                  </Button>
                  </Right>
                </CardItem>
                <CardItem cardBody>
                  <Image source={{uri: 'https://www.diabetes.org/sites/default/files/styles/crop_large/public/2019-06/Healthy%20Food%20Made%20Easy%20-min.jpg'}} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text numberOfLines={2} style={{ width: 300 }}>Description of recipe that will be limited or the time it takes to finish the recipe</Text>
                  </Body>
                </CardItem>
              </Card>
            </Content>
            ))}
            <Pagination total={Math.ceil((props.recipes.length)/maxValue)} current={1} locale={locale} onChange={handleChange}/>
      </View>
    );
}

export default ShowContent;