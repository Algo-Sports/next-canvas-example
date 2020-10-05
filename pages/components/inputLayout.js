import {Component, useState, useCallback} from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputLayout = ({}) => {
    const [value, setValue] = useState('');

    const onChangeValue = useCallback((e) => {
        setValue(e.target.value);
    });

    return(
        <div>
            <Form>
                <input type="text" value = {value} onChange= {onChangeValue}>

                </input>
            </Form>
        </div>
    )
}

export default InputLayout;