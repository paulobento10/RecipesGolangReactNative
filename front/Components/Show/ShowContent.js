import React, { useRef, useEffect, useState } from 'react';
import { Container, Header, Content, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View } from 'react-native';
import { Pagination} from '@ant-design/react-native';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Button, Left, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';


function ShowContent(props) {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(5);
    const [current, setCurrent] = useState(1);
    const [isError, setIsError] = useState(false);

    const handleChange = value => {
      setMinValue(((value-1)*5));
      setMaxValue(value * 5);
      setCurrent(value);
    };

    const locale = {
      prevText: 'Prev',
      nextText: 'Next',
    };

    const goToRecipe = (id) => {
      var prop={
        user_id: props.user_id,
        recipes: 1,
      }

      props.recipes.forEach(element => {
        if(element.recipe_id==id){
          prop={
            user_id: props.user_id,
            recipes: element,
          }
        }
      });
     
      

      Actions.recipe({propsRecipe: prop});
      
      //Actions para o Recipe e enviamos o id. Depois no Recipe, fazemos um get recipe com o id e obtemos toda a informação
    }

    return (
      <View style={{ paddingTop: 30 }}>
        {props.recipes && props.recipes.length > 0 && props.recipes.slice(minValue, maxValue).map(val => (
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text style={{fontWeight: 'bold'}}>{val.recipe_name}</Text>
                  <Text note>{val.category}</Text>
                </Body>
              </Left>
              <Right>
              <Button transparent onPress={() => goToRecipe(val.recipe_id)}>
                <Text style={{color: '#0000EE'}}>See More</Text>
              </Button>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: val.picture}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Body>
                <Text numberOfLines={2} style={{ width: 300 }}><Icon name='clock-o' style={{fontSize: 18}}/> {val.duration}m      <Icon name="bar-chart-o" style={{fontSize: 18}} /> {val.kcal}kcal</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
        ))}
        { props.recipes.length < 0 && <Text style={{color: '#ff0000', textAlign: 'center', fontWeight: 'bold', fontSize: 18,}}>No results.</Text> }
        { props.recipes.length > 0 && 
        <Pagination total={Math.ceil((props.recipes.length)/5)} current={current} locale={locale} onChange={handleChange}/>
        }
      </View>
    );
}

export default ShowContent;