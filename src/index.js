
import { Divider, Button, Grid, Icon, MenuButton, Paragraph, ResponsiveGrid, Shell, Upload, TreeSelect } from '@alifd/next';

import '@alifd/next/lib/button/style';
import React from 'react';
import ReactDOM from "react-dom";
import _ from 'lodash';

require('./index.css');
require('./index.scss');



new Promise((resolve, reject)=> {
    console.log(123)
})


async function fun() {

}
fun()
let a = 2; 



console.log(456)
a =_.clamp(-10, -5, 5)
console.log(789)
console.log(92035)

const rootElement = document.getElementById("root");
  

ReactDOM.render(
    <div>
        <Divider />
        <Icon type="success" />
        {/* <Grid />
        <MenuButton />
        <Paragraph />
        <ResponsiveGrid />
        <Shell />
        <Upload />
        <TreeSelect /> */}
        123 1
        <Button type="normal">Normal</Button>
        <Button type="primary">Prirmary</Button>
        <Button type="secondary">Secondary</Button>
    </div>,
    rootElement
  );