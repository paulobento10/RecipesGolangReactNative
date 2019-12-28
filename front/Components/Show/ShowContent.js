import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';

function ShowContent(props) {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(5);
    const [spacing, setSpacing] = React.useState(2);

    return (
      <Container>
            {props.recipes && props.recipes.length > 0 && props.recipes.slice(minValue, maxValue).map(val => (
            <Card>
                <Text>{val.id} {val.label}</Text>
            </Card>
            ))}
      </Container>
    );
}

export default ShowContent;