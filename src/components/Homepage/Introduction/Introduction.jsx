import React from 'react'
import styled from 'styled-components'
import IntroText from './IntroText'
import Slider from './Slider'

const Introduction = () => {
    return (
        <Container>
            <Slider  />
            <IntroText />
        </Container>

    )
}

export default Introduction;

const Container = styled.div`
width:75vw;
margin:0 auto;
padding-top:65px;
`